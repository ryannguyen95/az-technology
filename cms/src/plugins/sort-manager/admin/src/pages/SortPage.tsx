import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  fetchTree,
  saveOrder,
  type TreeResponse,
  type TreeNode,
  type CategoryNode,
  type ReorderPayload,
} from "../api";

// Slug danh mục CHA quyết định prefix URL của SẢN PHẨM bên trong (qua TOP_KIND
// ở src/lib/data/strapi.ts, walk lên tới danh mục cha rồi tra KIND_PREFIX ở
// src/lib/routing.ts). Danh mục CON thì KHÔNG — mọi danh mục con luôn ra
// `/danh-muc/<slug>` bất kể cha là gì (strapi.ts gán cứng `kind: "category"`
// cho mọi danh mục con, và KIND_PREFIX.category = "/danh-muc"). Ba cái này
// (PARENT_SLUG_PREFIX, TOP_KIND, KIND_PREFIX) phải khớp nhau — đổi một bên thì
// đổi cả các bên còn lại.
const PARENT_SLUG_PREFIX: Record<string, string> = {
  "phan-mem": "/san-pham",
  "phan-cung": "/san-pham",
  "dich-vu-it": "/dich-vu",
  "giai-phap": "/giai-phap",
};
// Fallback đúng bằng `TOP_KIND[...] ?? "product"` ở strapi.ts (rồi
// KIND_PREFIX.product = "/san-pham") — dùng khi cha là slug lạ không có trong
// bảng trên, hoặc khi sản phẩm/danh mục không có cha (mồ côi). KHÔNG được bỏ
// qua (continue) những trường hợp này — url thật của chúng vẫn là
// "/san-pham", im lặng bỏ qua sẽ lại bịa ra chuyện "không đổi" trong khi nó
// đổi thật.
const DEFAULT_PRODUCT_PREFIX = "/san-pham";

type UrlChange = { title: string; from: string; to: string };

// Prefix URL của TỪNG SẢN PHẨM trong cây, suy từ danh mục cha của danh mục
// chứa nó (không phải từ chính danh mục — xem ghi chú PARENT_SLUG_PREFIX).
function productPrefixMap(tree: TreeResponse): Map<string, string> {
  const map = new Map<string, string>();
  for (const p of tree.parents) {
    const prefix = PARENT_SLUG_PREFIX[p.slug] ?? DEFAULT_PRODUCT_PREFIX;
    for (const cat of p.children) {
      for (const prod of cat.products) map.set(prod.documentId, prefix);
    }
  }
  // Danh mục mồ côi (chưa gán cha) và sản phẩm mồ côi (chưa có danh mục) đều
  // rơi vào fallback "product" ở `topOf()`/TOP_KIND của strapi.ts.
  for (const cat of tree.orphanCategories) {
    for (const prod of cat.products) map.set(prod.documentId, DEFAULT_PRODUCT_PREFIX);
  }
  for (const prod of tree.orphanProducts) map.set(prod.documentId, DEFAULT_PRODUCT_PREFIX);
  return map;
}

function allProductNodes(tree: TreeResponse): TreeNode[] {
  return [
    ...tree.parents.flatMap((p) => p.children.flatMap((c) => c.products)),
    ...tree.orphanCategories.flatMap((c) => c.products),
    ...tree.orphanProducts,
  ];
}

// So cây gốc (vừa tải) với cây đang sửa, liệt kê mọi URL SẢN PHẨM đổi prefix.
// Cố ý tính ở cấp sản phẩm, không phải cấp danh mục: URL danh mục con không
// bao giờ đổi (luôn `/danh-muc/<slug>`), nên báo "danh mục X sẽ đổi URL" là
// bịa. Tính theo tổ tiên cấp cha của MỖI sản phẩm thì bắt được cả hai đường
// đổi URL thật: (a) chuyển thẳng một sản phẩm sang danh mục khác nhóm, và (b)
// chuyển cả danh mục (kéo theo mọi sản phẩm trong đó) sang cha khác nhóm.
function diffUrls(before: TreeResponse, after: TreeResponse): UrlChange[] {
  const beforePrefix = productPrefixMap(before);
  const afterPrefix = productPrefixMap(after);

  const changes: UrlChange[] = [];
  for (const prod of allProductNodes(after)) {
    const oldPrefix = beforePrefix.get(prod.documentId);
    const newPrefix = afterPrefix.get(prod.documentId);
    if (!oldPrefix || !newPrefix || oldPrefix === newPrefix) continue;
    changes.push({ title: prod.title, from: `${oldPrefix}/${prod.slug}`, to: `${newPrefix}/${prod.slug}` });
  }
  return changes;
}

function Row({
  id,
  label,
  depth,
  children,
}: {
  id: string;
  label: string;
  depth: number;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        paddingLeft: depth * 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          border: "1px solid #eaeaef",
          borderRadius: 4,
          background: "#fff",
          marginBottom: 4,
        }}
      >
        <span {...attributes} {...listeners} style={{ cursor: "grab", userSelect: "none" }} aria-label={`Kéo để sắp xếp ${label}`}>
          ⠿
        </span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

// Dùng cho danh sách KHÔNG cho kéo (danh mục con mồ côi — xem ghi chú ở chỗ
// dùng). Cùng khung nhìn với `Row` nhưng không có handle/useSortable, để
// không tạo cảm giác "kéo được" cho một thao tác không lưu được gì.
function StaticRow({ label, depth, children }: { label: string; depth: number; children?: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: depth * 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          border: "1px solid #eaeaef",
          borderRadius: 4,
          background: "#fff",
          marginBottom: 4,
        }}
      >
        <span style={{ width: 16, display: "inline-block" }} />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

// Vị trí một item đang nằm ở đâu — dùng để so cây gốc với cây đang sửa và chỉ
// gửi lên server những gì thật sự đổi (Important 1, fix round 1).
type Loc = { containerId: string; index: number };
const ORPHAN_CONTAINER = "__orphan__";

function categoryLocations(t: TreeResponse): Map<string, Loc> {
  const map = new Map<string, Loc>();
  for (const p of t.parents) {
    p.children.forEach((c, i) => map.set(c.documentId, { containerId: p.documentId, index: i }));
  }
  // Danh mục mồ côi không có container thật — nhóm chung một khoá giả để so
  // sánh "vẫn còn mồ côi hay đã được gán cha" là đủ, index ở đây không dùng.
  t.orphanCategories.forEach((c) => map.set(c.documentId, { containerId: ORPHAN_CONTAINER, index: -1 }));
  return map;
}

function productLocations(t: TreeResponse): Map<string, Loc> {
  const map = new Map<string, Loc>();
  const allCats = [...t.parents.flatMap((p) => p.children), ...t.orphanCategories];
  for (const c of allCats) {
    c.products.forEach((pr, i) => map.set(pr.documentId, { containerId: c.documentId, index: i }));
  }
  t.orphanProducts.forEach((pr) => map.set(pr.documentId, { containerId: ORPHAN_CONTAINER, index: -1 }));
  return map;
}

export default function SortPage() {
  const [tree, setTree] = useState<TreeResponse | null>(null);
  const [original, setOriginal] = useState<TreeResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  // Trong lúc `saving`, không sensor nào được kích hoạt kéo — DndContext
  // nhận mảng rỗng thì không còn cách nào bắt đầu một thao tác kéo (Major,
  // fix round 2). Xem ghi chú đầy đủ ở `onSave`/`onDragEnd`.
  const dndSensors = saving ? [] : sensors;

  const load = async () => {
    try {
      const fresh = await fetchTree();
      setTree(fresh);
      setOriginal(structuredClone(fresh));
      setDirty(false);
      setMessage(null);
      setLoadError(null);
    } catch {
      setLoadError("Không tải được cây danh mục. Thử tải lại trang.");
    }
  };
  useEffect(() => {
    void load();
  }, []);

  // Cảnh báo trước khi rời trang/đóng tab khi còn thay đổi chưa lưu (Important
  // 3, fix round 1). Chỉ đăng ký handler khi `dirty` — trình duyệt tự bỏ qua
  // `beforeunload` không có `dirty` gì để hỏi.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Chỉ cho kéo trong cùng một danh sách (cùng cha/cùng danh mục). Chuyển cha
  // hoặc chuyển danh mục làm bằng select "Thuộc" trên từng dòng — kéo ngang
  // giữa các nhánh gộp/mở là nguồn lỗi lớn (nhánh đích đang đóng thì không có
  // drop target) và không cần thiết cho thao tác hằng ngày.
  const onDragEnd = (event: DragEndEvent, listId: string) => {
    const { active, over } = event;
    // Chặn mọi chỉnh sửa trong lúc một lần lưu đang bay (Major, fix round 2):
    // `onSave` là closure async bắt `tree` tại thời điểm gọi — sửa cây trong
    // lúc `await saveOrder()` chưa xong làm mất đúng phần sửa đó (không nằm
    // trong payload đang gửi, rồi bị `setOriginal`/`setDirty(false)` của lần
    // lưu đó ghi đè lên, dập luôn cả `beforeunload` đang bảo vệ nó). `sensors`
    // đã bị rút hết khi `saving` nên nhánh này chủ yếu là phòng thủ kép.
    if (saving || !over || active.id === over.id || !tree) return;
    setTree((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev) as TreeResponse;
      if (listId === "parents") {
        const ids = next.parents.map((p) => p.documentId);
        next.parents = arrayMove(next.parents, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
      } else if (listId.startsWith("parent:")) {
        const parent = next.parents.find((p) => p.documentId === listId.slice("parent:".length))!;
        const ids = parent.children.map((c) => c.documentId);
        parent.children = arrayMove(parent.children, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
      } else {
        const catId = listId.slice("category:".length);
        const allCats = [...next.parents.flatMap((p) => p.children), ...next.orphanCategories];
        const cat = allCats.find((c) => c.documentId === catId)!;
        const ids = cat.products.map((p) => p.documentId);
        cat.products = arrayMove(cat.products, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
      }
      return next;
    });
    setDirty(true);
  };

  const moveCategory = (categoryId: string, toParentId: string) => {
    // Cùng lý do với `onDragEnd` ở trên — chặn khi đang lưu (Major, fix round 2).
    if (saving) return;
    setTree((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev) as TreeResponse;
      let moved: CategoryNode | undefined;
      for (const p of next.parents) {
        const idx = p.children.findIndex((c) => c.documentId === categoryId);
        if (idx >= 0) {
          moved = p.children.splice(idx, 1)[0];
          break;
        }
      }
      if (!moved) {
        const idx = next.orphanCategories.findIndex((c) => c.documentId === categoryId);
        if (idx >= 0) moved = next.orphanCategories.splice(idx, 1)[0];
      }
      if (moved) next.parents.find((p) => p.documentId === toParentId)?.children.push(moved);
      return next;
    });
    setDirty(true);
  };

  const moveProduct = (productId: string, toCategoryId: string) => {
    // Cùng lý do với `onDragEnd` ở trên — chặn khi đang lưu (Major, fix round 2).
    if (saving) return;
    setTree((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev) as TreeResponse;
      const allCats = [...next.parents.flatMap((p) => p.children), ...next.orphanCategories];
      let moved: TreeNode | undefined;
      for (const c of allCats) {
        const idx = c.products.findIndex((p) => p.documentId === productId);
        if (idx >= 0) {
          moved = c.products.splice(idx, 1)[0];
          break;
        }
      }
      if (!moved) {
        const idx = next.orphanProducts.findIndex((p) => p.documentId === productId);
        if (idx >= 0) moved = next.orphanProducts.splice(idx, 1)[0];
      }
      if (moved) allCats.find((c) => c.documentId === toCategoryId)?.products.push(moved);
      return next;
    });
    setDirty(true);
  };

  const urlChanges = useMemo(() => (tree && original ? diffUrls(original, tree) : []), [tree, original]);

  // Chỉ gửi lên server những bản ghi có vị trí/nhóm cha thật sự đổi so với
  // `original` (Important 1, fix round 1). Trước đây payload luôn liệt kê lại
  // TOÀN BỘ cây (mọi parent/category/product, đánh số 0..n) mỗi lần lưu — kéo
  // một hàng tốn tới ~167 update + republish trên một catalog cỡ này, chạm
  // `updatedAt` của hàng loạt bản ghi không hề đổi.
  const payload: ReorderPayload = useMemo(() => {
    if (!tree || !original) return {};

    const origParentIndex = new Map(original.parents.map((p, i) => [p.documentId, i]));
    const parents: NonNullable<ReorderPayload["parents"]> = [];
    tree.parents.forEach((p, i) => {
      if (origParentIndex.get(p.documentId) !== i) parents.push({ documentId: p.documentId, order: i });
    });

    const origCatLoc = categoryLocations(original);
    const categories: NonNullable<ReorderPayload["categories"]> = [];
    for (const p of tree.parents) {
      p.children.forEach((c, i) => {
        const prev = origCatLoc.get(c.documentId);
        if (!prev || prev.containerId !== p.documentId || prev.index !== i) {
          categories.push({ documentId: c.documentId, order: i, parentDocumentId: p.documentId });
        }
      });
    }

    // Sản phẩm bên trong danh mục mồ côi vẫn cần lưu được thứ tự/danh mục —
    // reorder chỉ cần categoryDocumentId hợp lệ, không đòi category đó phải
    // có cha. Danh mục mồ côi chỉ vào payload `categories` sau khi được gán
    // cha (lúc đó nó đã nằm trong `tree.parents[].children`).
    const origProdLoc = productLocations(original);
    const allCategoriesFlat = [...tree.parents.flatMap((p) => p.children), ...tree.orphanCategories];
    const products: NonNullable<ReorderPayload["products"]> = [];
    for (const c of allCategoriesFlat) {
      c.products.forEach((pr, i) => {
        const prev = origProdLoc.get(pr.documentId);
        if (!prev || prev.containerId !== c.documentId || prev.index !== i) {
          products.push({ documentId: pr.documentId, order: i, categoryDocumentId: c.documentId });
        }
      });
    }

    return { parents, categories, products };
  }, [tree, original]);

  const changeCount =
    (payload.parents?.length ?? 0) + (payload.categories?.length ?? 0) + (payload.products?.length ?? 0);

  const onSave = async () => {
    if (!tree) return;
    if (changeCount === 0) {
      // Không có gì để gửi (vd kéo đi rồi kéo về chỗ cũ) — dọn luôn `dirty`
      // thay vì để nút Lưu tiếp tục sáng và `beforeunload` tiếp tục armed cho
      // một thay đổi không còn tồn tại (Minor, fix round 2).
      setMessage("Không có thay đổi nào để lưu.");
      setDirty(false);
      return;
    }
    setSaving(true);
    try {
      const res = await saveOrder(payload);
      // Cây vừa gửi đã là trạng thái mới trên server — chốt nó thành baseline
      // mới (Important 2, fix round 1). Không làm bước này thì banner cảnh
      // báo URL vẫn diff với baseline CŨ và tiếp tục hiện "sẽ đổi khi bạn lưu"
      // cho một thay đổi đã lưu xong rồi.
      //
      // `tree` ở đây là closure bắt tại lần render tạo ra `onSave` này. An
      // toàn để dùng trực tiếp (không cần chụp snapshot riêng) CHỈ VÌ
      // `onDragEnd`/`moveCategory`/`moveProduct` đều tự chặn khi `saving`
      // (xem các hàm đó) — nên không có sửa đổi nào xen được vào giữa lúc
      // `await saveOrder(payload)` đang bay. Bỏ khoá đó đi thì dòng này sẽ
      // chốt nhầm baseline vào một `tree` đã cũ so với những gì người dùng
      // vừa sửa thêm (Major, fix round 2 — leader race: sửa cây trong lúc
      // save bay làm mất việc chưa lưu VÀ tắt luôn `beforeunload`).
      setOriginal(structuredClone(tree));
      setDirty(false);
      setMessage(res.revalidated ? "Đã lưu và cập nhật lên website." : "Đã lưu. Website có thể mất tới 1 tiếng để cập nhật.");
    } catch (err: any) {
      // Contract lỗi (Task 9): chỉ lỗi validate trả 400 kèm thông điệp dành
      // cho người dùng trong `error`. Mọi lỗi khác trả 500 với thông điệp
      // chung chung — không cố đọc chi tiết không có, tự viết thông báo chung.
      if (err?.status === 400) {
        setMessage(`Lưu thất bại: ${err?.response?.data?.error ?? "dữ liệu không hợp lệ"}`);
      } else {
        setMessage("Lưu thất bại do lỗi hệ thống, vui lòng thử lại.");
      }
    } finally {
      setSaving(false);
    }
  };

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (loadError) return <div style={{ padding: 32, color: "#d02b20" }}>{loadError}</div>;
  if (!tree) return <div style={{ padding: 32 }}>Đang tải cây danh mục…</div>;

  const allParents = tree.parents.map((p) => ({ id: p.documentId, title: p.title }));
  const allCategories = [
    ...tree.parents.flatMap((p) => p.children.map((c) => ({ id: c.documentId, title: `${p.title} › ${c.title}` }))),
    ...tree.orphanCategories.map((c) => ({ id: c.documentId, title: `(chưa gán cha) ${c.title}` })),
  ];

  const renderProducts = (cat: CategoryNode) => (
    <DndContext sensors={dndSensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, `category:${cat.documentId}`)}>
      <SortableContext items={cat.products.map((p) => p.documentId)} strategy={verticalListSortingStrategy}>
        {cat.products.map((prod) => (
          <Row key={prod.documentId} id={prod.documentId} label={prod.title} depth={2}>
            <div style={{ paddingLeft: 72, marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
              <label htmlFor={`prod-cat-${prod.documentId}`} style={{ fontSize: 12, color: "#666687" }}>
                Thuộc danh mục:
              </label>
              <select
                id={`prod-cat-${prod.documentId}`}
                aria-label={`Đổi danh mục cho ${prod.title}`}
                value={cat.documentId}
                disabled={saving}
                onChange={(e) => moveProduct(prod.documentId, e.target.value)}
              >
                {allCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </Row>
        ))}
      </SortableContext>
    </DndContext>
  );

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Sắp xếp danh mục & sản phẩm</h1>
      <p style={{ color: "#666687", marginBottom: 16 }}>
        Kéo biểu tượng ⠿ để đổi thứ tự trong cùng một nhóm. Đổi nhóm cha/danh mục bằng ô chọn bên phải mỗi dòng.
      </p>

      {urlChanges.length > 0 && (
        <div style={{ marginBottom: 16, padding: 16, border: "1px solid #f5c0b8", borderRadius: 4, background: "#fcecea" }}>
          <strong>⚠️ {urlChanges.length} đường dẫn sản phẩm sẽ đổi khi bạn lưu</strong>
          <p style={{ margin: "4px 0 8px", color: "#666687" }}>
            Đường dẫn cũ sẽ trả lỗi 404 và mất thứ hạng tìm kiếm đã có. Không có chuyển hướng tự động.
            Đường dẫn danh mục (<code>/danh-muc/…</code>) không đổi theo danh mục cha — chỉ sản phẩm
            bên trong mới đổi URL khi danh mục chứa nó chuyển sang nhóm khác.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, maxHeight: 200, overflowY: "auto" }}>
            {urlChanges.map((c) => (
              <li key={c.from}>
                <span>{c.title}: </span>
                <code>{c.from}</code> → <code>{c.to}</code>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        <button
          onClick={onSave}
          disabled={!dirty || saving}
          style={{
            padding: "8px 16px",
            background: dirty ? "#4945ff" : "#dcdce4",
            color: "#fff",
            border: 0,
            borderRadius: 4,
            cursor: dirty ? "pointer" : "default",
          }}
        >
          {saving ? "Đang lưu…" : "Lưu"}
        </button>
        <button onClick={() => void load()} disabled={saving} style={{ padding: "8px 16px", background: "#fff", border: "1px solid #dcdce4", borderRadius: 4 }}>
          Hoàn tác
        </button>
        {message && (
          <span
            style={{
              color: message.startsWith("Lưu thất bại")
                ? "#d02b20"
                : message.startsWith("Không có thay đổi")
                  ? "#666687"
                  : "#328048",
            }}
          >
            {message}
          </span>
        )}
      </div>

      <DndContext sensors={dndSensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, "parents")}>
        <SortableContext items={tree.parents.map((p) => p.documentId)} strategy={verticalListSortingStrategy}>
          {tree.parents.map((parent) => (
            <Row key={parent.documentId} id={parent.documentId} label={`${expanded.has(parent.documentId) ? "▾" : "▸"} ${parent.title}`} depth={0}>
              <button onClick={() => toggle(parent.documentId)} style={{ marginLeft: 24, marginBottom: 4, background: "none", border: 0, color: "#4945ff", cursor: "pointer" }}>
                {expanded.has(parent.documentId) ? "Thu gọn" : `Mở (${parent.children.length} danh mục con)`}
              </button>
              {expanded.has(parent.documentId) && (
                <DndContext sensors={dndSensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, `parent:${parent.documentId}`)}>
                  <SortableContext items={parent.children.map((c) => c.documentId)} strategy={verticalListSortingStrategy}>
                    {parent.children.map((cat) => (
                      <Row key={cat.documentId} id={cat.documentId} label={cat.title} depth={1}>
                        <div style={{ paddingLeft: 48, marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
                          <label htmlFor={`cat-parent-${cat.documentId}`} style={{ fontSize: 12, color: "#666687" }}>
                            Thuộc:
                          </label>
                          <select
                            id={`cat-parent-${cat.documentId}`}
                            aria-label={`Đổi danh mục cha cho ${cat.title}`}
                            value={parent.documentId}
                            disabled={saving}
                            onChange={(e) => moveCategory(cat.documentId, e.target.value)}
                          >
                            {allParents.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.title}
                              </option>
                            ))}
                          </select>
                          <button onClick={() => toggle(cat.documentId)} style={{ background: "none", border: 0, color: "#4945ff", cursor: "pointer" }}>
                            {expanded.has(cat.documentId) ? "Thu gọn" : `Mở (${cat.products.length} sản phẩm)`}
                          </button>
                        </div>
                        {expanded.has(cat.documentId) && renderProducts(cat)}
                      </Row>
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </Row>
          ))}
        </SortableContext>
      </DndContext>

      {tree.orphanCategories.length > 0 && (
        <div style={{ marginTop: 24, padding: 16, border: "1px solid #f5c0b8", borderRadius: 4, background: "#fcecea" }}>
          <strong>{tree.orphanCategories.length} danh mục con chưa gán cha</strong>
          {/* Không cho kéo trong khối này (fix round 1, Minor): danh mục mồ
              côi không có cha thật để gửi `parentDocumentId`, nên payload
              luôn bỏ qua thứ tự kéo ở đây — kéo mà không lưu được là một thao
              tác giả vờ thành công. Gán cha bằng select rồi mới sắp xếp được
              trong nhóm cha đó. */}
          {tree.orphanCategories.map((cat) => (
            <StaticRow key={cat.documentId} label={cat.title} depth={0}>
              <div style={{ paddingLeft: 24, marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
                <label htmlFor={`orphan-cat-parent-${cat.documentId}`} style={{ fontSize: 12, color: "#666687" }}>
                  Gán vào cha:
                </label>
                <select
                  id={`orphan-cat-parent-${cat.documentId}`}
                  aria-label={`Gán danh mục cha cho ${cat.title}`}
                  defaultValue=""
                  disabled={saving}
                  onChange={(e) => e.target.value && moveCategory(cat.documentId, e.target.value)}
                >
                  <option value="">— Chọn danh mục cha —</option>
                  {allParents.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
                <button onClick={() => toggle(cat.documentId)} style={{ background: "none", border: 0, color: "#4945ff", cursor: "pointer" }}>
                  {expanded.has(cat.documentId) ? "Thu gọn" : `Mở (${cat.products.length} sản phẩm)`}
                </button>
              </div>
              {expanded.has(cat.documentId) && renderProducts(cat)}
            </StaticRow>
          ))}
        </div>
      )}

      {tree.orphanProducts.length > 0 && (
        <div style={{ marginTop: 24, padding: 16, border: "1px solid #f5c0b8", borderRadius: 4, background: "#fcecea" }}>
          <strong>{tree.orphanProducts.length} sản phẩm chưa có danh mục</strong>
          {tree.orphanProducts.map((p) => (
            <div key={p.documentId} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
              <span>{p.title}</span>
              <select
                aria-label={`Chọn danh mục cho ${p.title}`}
                defaultValue=""
                disabled={saving}
                onChange={(e) => e.target.value && moveProduct(p.documentId, e.target.value)}
              >
                <option value="">— Chọn danh mục —</option>
                {allCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
