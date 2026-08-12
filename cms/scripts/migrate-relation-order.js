"use strict";

/**
 * Backfills the existing `order` field into the relation-order columns
 * Strapi auto-generates on the join tables once `category.parent` and
 * `product.category` became manyToOne/oneToMany (needed for drag-and-drop
 * reordering in the admin Relations field):
 *
 *   - categories_parent_lnk.category_ord  (order of a category among its
 *     parent-category's "categories" list)
 *   - products_category_lnk.product_ord   (order of a product among its
 *     category's "products" list)
 *
 * Without this, every relation link starts with `_ord = NULL` and the admin
 * falls back to insertion order, silently discarding the sequence editors
 * already curated via the `order` field.
 *
 * Handles BOTH draft and published rows — each has its own row in the join
 * table (linking draft category -> draft parent, published -> published),
 * and this script updates every row regardless of publish state.
 *
 * Idempotent: always overwrites `_ord` from the current `order` value, so
 * re-running (e.g. after a reseed) is safe and just re-applies the same
 * mapping.
 *
 * No new dependency: goes through Strapi's own programmatic API so it works
 * against whatever DB engine is configured (sqlite locally, postgres in
 * prod) via `strapi.db.connection` (knex), same as `config/database.ts`.
 *
 * Usage (run from cms/, with the Strapi dev server STOPPED to avoid two
 * processes fighting over the same sqlite file):
 *   node scripts/migrate-relation-order.js
 */

const { compileStrapi, createStrapi } = require("@strapi/strapi");

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  const knex = app.db.connection;

  try {
    const categoryRows = await knex("categories_parent_lnk as lnk")
      .join("categories as c", "c.id", "lnk.category_id")
      .whereNotNull("lnk.category_id")
      .select("lnk.id as lnkId", "c.order as order");

    for (const row of categoryRows) {
      await knex("categories_parent_lnk").where({ id: row.lnkId }).update({ category_ord: row.order ?? 0 });
    }

    const productRows = await knex("products_category_lnk as lnk")
      .join("products as p", "p.id", "lnk.product_id")
      .whereNotNull("lnk.product_id")
      .select("lnk.id as lnkId", "p.order as order");

    for (const row of productRows) {
      await knex("products_category_lnk").where({ id: row.lnkId }).update({ product_ord: row.order ?? 0 });
    }

    // eslint-disable-next-line no-console
    console.log(`[migrate-relation-order] categories_parent_lnk: ${categoryRows.length} rows updated (category_ord)`);
    // eslint-disable-next-line no-console
    console.log(`[migrate-relation-order] products_category_lnk: ${productRows.length} rows updated (product_ord)`);
  } finally {
    await app.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("[migrate-relation-order] failed:", err);
    process.exit(1);
  });
