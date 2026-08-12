"use strict";

/**
 * Plain-Node regression test for `getTree()`'s `fetchAllVerified()` guard
 * (see the big comment above `fetchAllVerified` in ./tree.js).
 *
 * `cms/` has no test runner installed (no jest/vitest — see repo CLAUDE.md,
 * which forbids adding new deps for this fix). This file uses only Node's
 * built-in `assert` and mocks Strapi's `documents(uid).{findMany,count}`
 * directly, so it needs nothing beyond a plain `node` invocation.
 *
 * Run:
 *   node cms/src/plugins/sort-manager/server/src/services/tree.test.js
 *
 * Exits 0 with "ALL PASS" on success, non-zero with a failure summary
 * otherwise — safe to wire into CI later without extra tooling.
 */

const assert = require("node:assert/strict");
const { getTree } = require("./tree");

const PARENT_UID = "api::parent-category.parent-category";
const CATEGORY_UID = "api::category.category";
const PRODUCT_UID = "api::product.product";

// Builds a minimal mock of the `strapi` object `getTree()` touches: only
// `strapi.documents(uid).findMany(params)` and `.count(params)`.
function makeMockStrapi(fixtures) {
  return {
    documents(uid) {
      const fixture = fixtures[uid];
      if (!fixture) throw new Error(`makeMockStrapi: no fixture registered for uid "${uid}"`);
      return {
        async findMany() {
          return fixture.items;
        },
        async count() {
          return fixture.count;
        },
      };
    },
  };
}

// A consistent, 1-parent / 1-category / 1-product tree where findMany().length
// always equals count() — the case that must NOT throw.
function consistentFixtures() {
  return {
    [PARENT_UID]: {
      items: [{ documentId: "p1", title: "Phần mềm", slug: "phan-mem", order: 0 }],
      count: 1,
    },
    [CATEGORY_UID]: {
      items: [
        { documentId: "c1", title: "Microsoft", slug: "microsoft", order: 0, parent: { documentId: "p1" } },
      ],
      count: 1,
    },
    [PRODUCT_UID]: {
      items: [
        { documentId: "pr1", title: "Windows 11 Pro", slug: "windows-11-pro", order: 0, category: { documentId: "c1" } },
      ],
      count: 1,
    },
  };
}

const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}

test("getTree() builds the expected shape when findMany().length === count() for every entity", async () => {
  const tree = await getTree(makeMockStrapi(consistentFixtures()));

  assert.equal(tree.parents.length, 1);
  assert.equal(tree.parents[0].documentId, "p1");
  assert.equal(tree.parents[0].children.length, 1);
  assert.equal(tree.parents[0].children[0].documentId, "c1");
  assert.equal(tree.parents[0].children[0].products.length, 1);
  assert.equal(tree.parents[0].children[0].products[0].documentId, "pr1");
  assert.equal(tree.orphanCategories.length, 0);
  assert.equal(tree.orphanProducts.length, 0);
});

// The regression this file exists for: Strapi 5.48's `documents().findMany()`
// was verified to ignore `pagination` entirely (see the comment in tree.js).
// If a future Strapi version starts respecting it — or applies a default cap
// — `findMany()` would silently return fewer rows than `count()` reports.
// `fetchAllVerified()` must throw in that case instead of handing the admin a
// tree that's silently missing categories/products.
for (const [uid, label] of [
  [PARENT_UID, "parent-category"],
  [CATEGORY_UID, "category"],
  [PRODUCT_UID, "product"],
]) {
  test(`getTree() throws when findMany() under-returns vs count() for ${label}`, async () => {
    const fixtures = consistentFixtures();
    // Simulate a cut-off findMany(): count() still reports the true total,
    // but findMany() returned one fewer row than that.
    fixtures[uid] = { ...fixtures[uid], count: fixtures[uid].count + 1 };

    await assert.rejects(
      () => getTree(makeMockStrapi(fixtures)),
      (err) => {
        assert.match(err.message, /sort-manager/);
        assert.match(err.message, new RegExp(uid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
        assert.match(err.message, /count\(\) báo tổng/);
        return true;
      },
    );
  });
}

async function main() {
  let failed = 0;
  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`  ok - ${name}`);
    } catch (err) {
      failed += 1;
      console.error(`  FAIL - ${name}`);
      console.error(err);
    }
  }
  console.log("");
  if (failed > 0) {
    console.error(`${failed}/${tests.length} test(s) FAILED`);
    process.exit(1);
  }
  console.log(`ALL PASS (${tests.length}/${tests.length})`);
}

main();
