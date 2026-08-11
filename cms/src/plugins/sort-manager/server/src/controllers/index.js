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
      ctx.status = 400;
      ctx.body = { error: err?.message ?? "Lưu thứ tự thất bại" };
    }
  },
};
