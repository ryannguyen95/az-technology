"use strict";

/**
 * @typedef {{ documentId: string, title: string, slug: string, order: number }} TreeNode
 * @typedef {TreeNode & { products: TreeNode[] }} CategoryNode
 * @typedef {TreeNode & { children: CategoryNode[] }} ParentNode
 * @typedef {{ parents: ParentNode[], orphanCategories: CategoryNode[], orphanProducts: TreeNode[] }} TreeResponse
 *
 * Task 10 khai lại đúng các type này ở `admin/src/api.ts` — admin bundle
 * không import được từ `server/`.
 */

const FIELDS = ["documentId", "title", "slug", "order"];
const byOrder = (a, b) => a.order - b.order || a.title.localeCompare(b.title, "vi");

// ⚠️ Đã kiểm thật (script độc lập, boot Strapi trực tiếp, xem task-8-report.md
// "Fix round 1"): `strapi.documents(uid).findMany()` ở Strapi 5.48 KHÔNG tôn
// trọng `pagination` dưới bất kỳ hình thức nào — `{page,pageSize}`,
// `{start,limit}`, và cả khi bỏ hẳn tham số `pagination` — cả 3 cách đều trả
// về TOÀN BỘ document khớp filter (đã test với 140 sản phẩm: page 1 pageSize
// 100 → vẫn trả về đủ 140, không cắt). Type declaration cho phép truyền
// `pagination` không có nghĩa runtime tôn trọng nó.
//
// Hệ quả: KHÔNG dùng `pagination` (no-op, chỉ gây hiểu lầm "có giới hạn"),
// và TUYỆT ĐỐI KHÔNG lặp trang kiểu `page++` cho tới khi "hết dữ liệu" — nếu
// pagination bị bỏ qua thì mọi trang trả về y hệt toàn bộ tập kết quả, vòng
// lặp không bao giờ dừng (bug thật đã tự bắt được lúc test trước khi ship —
// CPU strapi develop chạy 100% không phản hồi).
//
// Thay vào đó: fetch toàn bộ 1 lần rồi ĐỐI CHIẾU với `count()` (đã kiểm hoạt
// động đúng, trả đúng tổng số document). Lệch — dù hiện tại chưa lệch, có thể
// lệch nếu một bản Strapi sau này bắt đầu tôn trọng pagination/áp trần mặc
// định — thì throw ngay, không im lặng trả về một cây thiếu dữ liệu.
async function fetchAllVerified(strapi, uid, params) {
  const [items, total] = await Promise.all([
    strapi.documents(uid).findMany({ ...params }),
    strapi.documents(uid).count({ filters: params.filters, status: params.status }),
  ]);
  if (items.length !== total) {
    throw new Error(
      `sort-manager: ${uid} findMany() trả về ${items.length} document nhưng count() báo tổng ${total} — cây Sắp xếp có thể đang bị cắt bớt, dừng lại thay vì trả về dữ liệu không đầy đủ.`
    );
  }
  return items;
}

// Đọc cây 3 cấp cho trang Sắp xếp. Chỉ lấy field cần thiết — không kéo
// description/media, một cây vài trăm node phải nhẹ.
// status: "draft" vì bản draft là bản editor đang làm việc; bản published
// được đồng bộ khi lưu (xem service reorder — Task sau).
//
// @param {import("@strapi/strapi").Core.Strapi} strapi
// @returns {Promise<TreeResponse>}
async function getTree(strapi) {
  const [parents, categories, products] = await Promise.all([
    fetchAllVerified(strapi, "api::parent-category.parent-category", {
      fields: [...FIELDS],
      status: "draft",
    }),
    fetchAllVerified(strapi, "api::category.category", {
      fields: [...FIELDS],
      populate: { parent: { fields: ["documentId"] } },
      status: "draft",
    }),
    fetchAllVerified(strapi, "api::product.product", {
      fields: [...FIELDS],
      populate: { category: { fields: ["documentId"] } },
      status: "draft",
    }),
  ]);

  const productsByCategory = new Map();
  const orphanProducts = [];
  for (const p of products) {
    const node = { documentId: p.documentId, title: p.title, slug: p.slug ?? "", order: p.order ?? 0 };
    const key = p.category?.documentId;
    if (!key) {
      orphanProducts.push(node);
      continue;
    }
    const list = productsByCategory.get(key);
    if (list) list.push(node);
    else productsByCategory.set(key, [node]);
  }

  // Tập documentId của các danh mục cha THẬT SỰ tồn tại — dùng để phát hiện
  // cả 2 trường hợp danh mục con mồ côi: (a) chưa từng gán cha, và (b) từng
  // gán nhưng cha đã bị xoá (tham chiếu treo). Cả hai đều phải lộ ra, không
  // được rơi mất — category schema không bắt buộc `parent`, nên trạng thái
  // này có thật.
  const parentIds = new Set(parents.map((p) => p.documentId));

  const categoriesByParent = new Map();
  const orphanCategories = [];
  for (const c of categories) {
    const node = {
      documentId: c.documentId,
      title: c.title,
      slug: c.slug ?? "",
      order: c.order ?? 0,
      products: (productsByCategory.get(c.documentId) ?? []).sort(byOrder),
    };
    const key = c.parent?.documentId;
    if (!key || !parentIds.has(key)) {
      orphanCategories.push(node);
      continue;
    }
    const list = categoriesByParent.get(key);
    if (list) list.push(node);
    else categoriesByParent.set(key, [node]);
  }

  return {
    parents: parents
      .map((p) => ({
        documentId: p.documentId,
        title: p.title,
        slug: p.slug ?? "",
        order: p.order ?? 0,
        children: (categoriesByParent.get(p.documentId) ?? []).sort(byOrder),
      }))
      .sort(byOrder),
    // Danh mục con chưa gán cha (hoặc cha đã bị xoá). Không hiển thị thì
    // editor không bao giờ kéo được chúng — kèm theo cả sản phẩm bên trong —
    // vào đâu cả; chúng sẽ biến mất khỏi tầm mắt.
    orphanCategories: orphanCategories.sort(byOrder),
    // Sản phẩm chưa gán danh mục con. Không hiển thị chúng thì editor không
    // bao giờ kéo được chúng vào đâu — chúng sẽ biến mất khỏi tầm mắt.
    orphanProducts: orphanProducts.sort(byOrder),
  };
}

module.exports = { getTree };
