"use strict";

/**
 * @typedef {{ documentId: string, order: number }} ParentReorderItem
 * @typedef {{ documentId: string, order: number, parentDocumentId: string }} CategoryReorderItem
 * @typedef {{ documentId: string, order: number, categoryDocumentId: string }} ProductReorderItem
 * @typedef {{ parents?: ParentReorderItem[], categories?: CategoryReorderItem[], products?: ProductReorderItem[] }} ReorderPayload
 * @typedef {{ updated: { parents: number, categories: number, products: number }, revalidated: boolean }} ReorderResult
 *
 * Task 10 khai lại đúng `ReorderPayload` ở `admin/src/api.ts` — admin bundle
 * không import được từ `server/`.
 */

const isInt = (n) => typeof n === "number" && Number.isInteger(n) && n >= 0;
const isId = (s) => typeof s === "string" && s.length > 0;

// Không tin client: validate trước khi mở transaction. Chặn cả trường hợp UI
// có bug lẫn ai đó gọi thẳng API (route type: "admin" nhưng vẫn không tin dữ
// liệu vào). UI (Task 10) validate lại là tiện lợi, không phải bảo vệ.
//
// @param {ReorderPayload} payload
function assertValid(payload) {
  for (const p of payload.parents ?? []) {
    if (!isId(p.documentId) || !isInt(p.order)) {
      throw new Error("parents: documentId phải là chuỗi, order phải là số nguyên ≥ 0");
    }
  }
  for (const c of payload.categories ?? []) {
    if (!isId(c.documentId) || !isInt(c.order) || !isId(c.parentDocumentId)) {
      throw new Error("categories: thiếu documentId / order / parentDocumentId hợp lệ");
    }
  }
  for (const p of payload.products ?? []) {
    if (!isId(p.documentId) || !isInt(p.order) || !isId(p.categoryDocumentId)) {
      throw new Error("products: thiếu documentId / order / categoryDocumentId hợp lệ");
    }
  }
  const total = (payload.parents?.length ?? 0) + (payload.categories?.length ?? 0) + (payload.products?.length ?? 0);
  if (total === 0) throw new Error("Không có thay đổi nào để lưu");
}

// Strapi v5 giữ HAI bản trên cùng documentId: draft và published. Chỉ update
// bản draft thì frontend (đọc published qua REST API công khai) sẽ KHÔNG
// thấy thứ tự mới — sắp xong mà ngoài site y nguyên, rất dễ bị tưởng nhầm là
// lỗi cache. Vì vậy: luôn update draft; nếu document đang CÓ bản published
// thì publish lại để đẩy thay đổi sang bản đó. Document chỉ-có-draft (chưa
// từng được editor publish) giữ nguyên trạng thái draft — không tự publish
// hộ editor, đó không phải quyết định của tính năng sắp xếp.
//
// Đã tự kiểm chứng (không tin brief): `strapi.documents(uid).findOne({
// documentId, status: "published" })` ở Strapi 5.48 trả về `null` cho document
// chỉ có bản draft, và trả về entry thật khi document đã publish — đúng như
// brief mô tả, dùng được nguyên văn.
//
// ⚠️ LỆCH BRIEF — đã tự kiểm chứng và brief sai ở điểm này: brief giả định
// `strapi.documents(uid).update({ documentId, ... })` sẽ THROW khi
// `documentId` không tồn tại, và transaction sẽ tự rollback. Thực tế ở
// 5.48 (`@strapi/core/dist/services/document-service/repository.js`, hàm
// `update`) — khi không tìm thấy entry theo `documentId`, nó set
// `updatedDraft = null` rồi `return updatedDraft` — KHÔNG throw. Đã tự kiểm
// bằng request thật: PUT reorder với 1 documentId giả giữa 2 documentId thật
// trả về `200 {updated:{products:3}}` và 2 sản phẩm thật vẫn bị đổi order —
// không hề rollback. Vì vậy phải tự throw khi `update()` trả về falsy để
// transaction có cái để rollback theo.
//
// @param {import("@strapi/strapi").Core.Strapi} strapi
// @param {"api::parent-category.parent-category"|"api::category.category"|"api::product.product"} uid
// @param {string} documentId
// @param {Record<string, unknown>} data
async function updateBoth(strapi, uid, documentId, data) {
  const updatedDraft = await strapi.documents(uid).update({ documentId, data, status: "draft" });
  if (!updatedDraft) {
    throw new Error(`${uid}: không tìm thấy documentId "${documentId}" — không có gì để cập nhật`);
  }

  const published = await strapi.documents(uid).findOne({ documentId, status: "published", fields: ["documentId"] });
  if (published) {
    await strapi.documents(uid).publish({ documentId });
  }
}

// Đẩy thay đổi lên site ngay sau khi lưu. Lỗi ở bước này KHÔNG được làm hỏng
// thao tác lưu — dữ liệu đã ghi xong rồi (transaction đã commit), cùng lắm
// site chậm cập nhật (vẫn còn revalidate = 3600 theo giờ của từng page).
//
// @param {import("@strapi/strapi").Core.Strapi} strapi
// @returns {Promise<boolean>}
async function revalidateWeb(strapi) {
  const webUrl = process.env.WEB_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!webUrl || !secret) return false;
  try {
    const res = await fetch(`${webUrl}/api/revalidate`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ tags: ["parent-categories", "categories", "products"] }),
    });
    return res.ok;
  } catch (err) {
    strapi.log.warn(`sort-manager: revalidate call to ${webUrl}/api/revalidate failed: ${err?.message ?? err}`);
    return false;
  }
}

// @param {import("@strapi/strapi").Core.Strapi} strapi
// @param {ReorderPayload} payload
// @returns {Promise<ReorderResult>}
async function reorder(strapi, payload) {
  assertValid(payload);

  const parents = payload.parents ?? [];
  const categories = payload.categories ?? [];
  const products = payload.products ?? [];

  // Một transaction cho toàn bộ: một documentId không tồn tại (hoặc lỗi DB
  // bất kỳ) giữa chừng thì KHÔNG được để lại thứ tự nửa vời — mọi update
  // trước đó trong cùng request phải rollback theo.
  await strapi.db.transaction(async () => {
    for (const p of parents) {
      await updateBoth(strapi, "api::parent-category.parent-category", p.documentId, { order: p.order });
    }
    for (const c of categories) {
      await updateBoth(strapi, "api::category.category", c.documentId, {
        order: c.order,
        parent: c.parentDocumentId,
      });
    }
    for (const p of products) {
      await updateBoth(strapi, "api::product.product", p.documentId, {
        order: p.order,
        category: p.categoryDocumentId,
      });
    }
  });

  const revalidated = await revalidateWeb(strapi);

  return {
    updated: { parents: parents.length, categories: categories.length, products: products.length },
    revalidated,
  };
}

module.exports = { reorder, assertValid };
