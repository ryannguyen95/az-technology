"use strict";

const { getTree } = require("../services/tree");

module.exports = {
  // `strapi` is a real global here — @strapi/core (`dist/index.js`) sets
  // `global.strapi = strapi` on boot, and it's how the rest of Strapi's own
  // core controllers (e.g. content-type-builder) reference it too.
  async tree(ctx) {
    ctx.body = await getTree(strapi);
  },
};
