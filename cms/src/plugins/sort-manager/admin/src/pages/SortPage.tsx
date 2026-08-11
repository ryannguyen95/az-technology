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

// Slug danh mục CHA quyết định prefix URL của danh mục con và sản phẩm bên trong.
// Nguồn: src/lib/data/strapi.ts TOP_KIND + src/lib/routing.ts KIND_PREFIX.
// Hai cây phải khớp nhau — đổi một bên thì đổi cả bên kia.
const PARENT_SLUG_PREFIX: Record<string, string> = {
  "phan-mem": "/san-pham",
  "phan-cung": "/san-pham",
  "dich-vu-it": "/dich-vu",
  "giai-phap": "/giai-phap",
};

type UrlChange = { title: string; from: string; to: string };

// So cây gốc (vừa tải) với cây đang sửa, liệt kê mọi URL đổi prefix.
function diffUrls(before: TreeResponse, after: TreeResponse): UrlChange[] {
  const prefixOf = (tree: TreeResponse, categoryId: string): string | undefined => {
    const parent = tree.parents.find((p) => p.children.some((c) => c.documentId === categoryId));
    return parent ? PARENT_SLUG_PREFIX[parent.slug] : undefined;
  };

  const changes: UrlChange[] = [];
  for (const p of after.parents) {
    for (const cat of p.children) {
      const oldPrefix = prefixOf(before, cat.documentId);
      const newPrefix = PARENT_SLUG_PREFIX[p.slug];
      if (!oldPrefix || !newPrefix || oldPrefix === newPrefix) continue;

      changes.push({ title: cat.title, from: `${oldPrefix}/${cat.slug}`, to: `${newPrefix}/${cat.slug}` });
      for (const prod of cat.products) {
        changes.push({ title: prod.title, from: `${oldPrefix}/${prod.slug}`, to: `${newPrefix}/${prod.slug}` });
      }
    }
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

  // Chỉ cho kéo trong cùng một danh sách (cùng cha/cùng danh mục). Chuyển cha
  // hoặc chuyển danh mục làm bằng select "Thuộc" trên từng dòng — kéo ngang
  // giữa các nhánh gộp/mở là nguồn lỗi lớn (nhánh đích đang đóng thì không có
  // drop target) và không cần thiết cho thao tác hằng ngày.
  const onDragEnd = (event: DragEndEvent, listId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !tree) return;
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
      } else if (listId === "orphan-categories") {
        const ids = next.orphanCategories.map((c) => c.documentId);
        next.orphanCategories = arrayMove(
          next.orphanCategories,
          ids.indexOf(String(active.id)),
          ids.indexOf(String(over.id)),
        );
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

  const payload: ReorderPayload = useMemo(() => {
    if (!tree) return {};
    const allCategoriesFlat = [
      ...tree.parents.flatMap((p) => p.children),
      ...tree.orphanCategories,
    ];
    return {
      parents: tree.parents.map((p, i) => ({ documentId: p.documentId, order: i })),
      categories: tree.parents.flatMap((p) =>
        p.children.map((c, i) => ({ documentId: c.documentId, order: i, parentDocumentId: p.documentId })),
      ),
      // Sản phẩm bên trong danh mục mồ côi vẫn cần lưu được thứ tự/danh mục —
      // reorder chỉ cần categoryDocumentId hợp lệ, không đòi category đó phải
      // có cha. Danh mục mồ côi chỉ vào payload `categories` sau khi được gán
      // cha (lúc đó nó đã nằm trong `tree.parents[].children`).
      products: allCategoriesFlat.flatMap((c) =>
        c.products.map((pr, i) => ({ documentId: pr.documentId, order: i, categoryDocumentId: c.documentId })),
      ),
    };
  }, [tree]);

  const onSave = async () => {
    setSaving(true);
    try {
      const res = await saveOrder(payload);
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, `category:${cat.documentId}`)}>
      <SortableContext items={cat.products.map((p) => p.documentId)} strategy={verticalListSortingStrategy}>
        {cat.products.map((prod) => (
          <Row key={prod.documentId} id={prod.documentId} label={prod.title} depth={2}>
            <div style={{ paddingLeft: 72, marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ fontSize: 12, color: "#666687" }}>Thuộc danh mục:</label>
              <select value={cat.documentId} onChange={(e) => moveProduct(prod.documentId, e.target.value)}>
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
          <strong>⚠️ {urlChanges.length} đường dẫn sẽ đổi khi bạn lưu</strong>
          <p style={{ margin: "4px 0 8px", color: "#666687" }}>
            Đường dẫn cũ sẽ trả lỗi 404 và mất thứ hạng tìm kiếm đã có. Không có chuyển hướng tự động.
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
        {message && <span style={{ color: message.startsWith("Lưu thất bại") ? "#d02b20" : "#328048" }}>{message}</span>}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, "parents")}>
        <SortableContext items={tree.parents.map((p) => p.documentId)} strategy={verticalListSortingStrategy}>
          {tree.parents.map((parent) => (
            <Row key={parent.documentId} id={parent.documentId} label={`${expanded.has(parent.documentId) ? "▾" : "▸"} ${parent.title}`} depth={0}>
              <button onClick={() => toggle(parent.documentId)} style={{ marginLeft: 24, marginBottom: 4, background: "none", border: 0, color: "#4945ff", cursor: "pointer" }}>
                {expanded.has(parent.documentId) ? "Thu gọn" : `Mở (${parent.children.length} danh mục con)`}
              </button>
              {expanded.has(parent.documentId) && (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, `parent:${parent.documentId}`)}>
                  <SortableContext items={parent.children.map((c) => c.documentId)} strategy={verticalListSortingStrategy}>
                    {parent.children.map((cat) => (
                      <Row key={cat.documentId} id={cat.documentId} label={cat.title} depth={1}>
                        <div style={{ paddingLeft: 48, marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
                          <label style={{ fontSize: 12, color: "#666687" }}>Thuộc:</label>
                          <select value={parent.documentId} onChange={(e) => moveCategory(cat.documentId, e.target.value)}>
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
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e, "orphan-categories")}>
            <SortableContext items={tree.orphanCategories.map((c) => c.documentId)} strategy={verticalListSortingStrategy}>
              {tree.orphanCategories.map((cat) => (
                <Row key={cat.documentId} id={cat.documentId} label={cat.title} depth={0}>
                  <div style={{ paddingLeft: 24, marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
                    <label style={{ fontSize: 12, color: "#666687" }}>Gán vào cha:</label>
                    <select defaultValue="" onChange={(e) => e.target.value && moveCategory(cat.documentId, e.target.value)}>
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
                </Row>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      {tree.orphanProducts.length > 0 && (
        <div style={{ marginTop: 24, padding: 16, border: "1px solid #f5c0b8", borderRadius: 4, background: "#fcecea" }}>
          <strong>{tree.orphanProducts.length} sản phẩm chưa có danh mục</strong>
          {tree.orphanProducts.map((p) => (
            <div key={p.documentId} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
              <span>{p.title}</span>
              <select defaultValue="" onChange={(e) => e.target.value && moveProduct(p.documentId, e.target.value)}>
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
