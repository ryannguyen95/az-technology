"use strict";

/**
 * @typedef {{ documentId: string, title: string, slug: string, order: number }} TreeNode
 * @typedef {TreeNode & { products: TreeNode[] }} CategoryNode
 * @typedef {TreeNode & { children: CategoryNode[] }} ParentNode
 * @typedef {{ parents: ParentNode[], orphanProducts: TreeNode[] }} TreeResponse
 *
 * Task 10 khai lại đúng các type này ở `admin/src/api.ts` — admin bundle
 * không import được từ `server/`.
 */

const FIELDS = ["documentId", "title", "slug", "order"];
const byOrder = (a, b) => a.order - b.order || a.title.localeCompare(b.title, "vi");

// Đọc cây 3 cấp cho trang Sắp xếp. Chỉ lấy field cần thiết — không kéo
// description/media, một cây vài trăm node phải nhẹ.
// status: "draft" vì bản draft là bản editor đang làm việc; bản published
// được đồng bộ khi lưu (xem service reorder — Task sau).
//
// @param {import("@strapi/strapi").Core.Strapi} strapi
// @returns {Promise<TreeResponse>}
async function getTree(strapi) {
  const [parents, categories, products] = await Promise.all([
    strapi.documents("api::parent-category.parent-category").findMany({
      fields: [...FIELDS],
      status: "draft",
      pagination: { pageSize: 200 },
    }),
    strapi.documents("api::category.category").findMany({
      fields: [...FIELDS],
      populate: { parent: { fields: ["documentId"] } },
      status: "draft",
      pagination: { pageSize: 500 },
    }),
    strapi.documents("api::product.product").findMany({
      fields: [...FIELDS],
      populate: { category: { fields: ["documentId"] } },
      status: "draft",
      pagination: { pageSize: 2000 },
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

  const categoriesByParent = new Map();
  for (const c of categories) {
    const node = {
      documentId: c.documentId,
      title: c.title,
      slug: c.slug ?? "",
      order: c.order ?? 0,
      products: (productsByCategory.get(c.documentId) ?? []).sort(byOrder),
    };
    const key = c.parent?.documentId;
    if (!key) continue;
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
    // Sản phẩm chưa gán danh mục con. Không hiển thị chúng thì editor không
    // bao giờ kéo được chúng vào đâu — chúng sẽ biến mất khỏi tầm mắt.
    orphanProducts: orphanProducts.sort(byOrder),
  };
}

module.exports = { getTree };
