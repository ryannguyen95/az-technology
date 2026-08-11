"use strict";

const { getTree } = require("../services/tree");
const { reorder } = require("../services/reorder");

module.exports = {
  // `strapi` is a real global here — @strapi/core (`dist/index.js`) sets
  // `global.strapi = strapi` on boot, and it's how the rest of Strapi's own
  // core controllers (e.g. content-type-builder) reference it too.
  async tree(ctx) {
    ctx.body = await getTree(strapi);
  },

  async reorder(ctx) {
    try {
      ctx.body = await reorder(strapi, ctx.request.body ?? {});
    } catch (err) {
      // Lỗi client (payload sai hình dạng/kiểu) mới được lộ `.message` ra
      // response và trả 400 — đó là góp ý cho editor sửa payload. Mọi lỗi
      // khác (DB, Document Service, exception lập trình) là lỗi HỆ THỐNG:
      // không lộ message thật (có thể chứa tên bảng/cột/thông điệp driver)
      // ra ngoài, trả 500 với thông điệp chung, và log message thật ở server
      // để còn debug được (arch-review round 1 bắt được: trước đây 2 loại
      // lỗi này bị gộp chung một 400 kèm nguyên văn `.message`).
      if (err?.isReorderValidationError) {
        ctx.status = 400;
        ctx.body = { error: err.message };
        return;
      }
      strapi.log.error(`sort-manager: reorder failed unexpectedly: ${err?.stack ?? err?.message ?? err}`);
      ctx.status = 500;
      ctx.body = { error: "Lưu thứ tự thất bại do lỗi hệ thống, vui lòng thử lại" };
    }
  },
};
