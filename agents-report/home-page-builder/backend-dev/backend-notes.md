# Backend notes — Home Page Builder

## Content model changes (Strapi)

1. **New components** (`cms/src/components/sections/`):
   - `sections.product-list` — `title` (string, required), `products` (manyToMany
     manyWay → `api::product.product`), `subsections` (repeatable `home.subsection`),
     `parentCategory` (oneToOne oneWay → `api::parent-category.parent-category`).
   - `sections.category-list` — `title` (string, required), `categories` (manyToMany
     manyWay → `api::category.category`).
2. **`home.subsection.products`**: `oneToMany` → **`manyToMany` (manyWay)**. This is a
   schema-level relation-type change on an existing component.
3. **New single-type** `api::home-page.home-page` (`cms/src/api/home-page/**`, mirrors
   `site-setting`'s controller/route/service factory pattern) — one field, `sections`
   (dynamic zone: `["sections.product-list", "sections.category-list"]`).
   `draftAndPublish: false` (same as site-setting — no draft workflow needed for a
   single config-like page).
4. **Removed collection** `api::home-section.home-section` (`cms/src/api/home-section/**`
   deleted entirely).

## Migration strategy

- No hand-written SQL / DB migration. Strapi's schema sync (on restart) creates the new
  component tables + the `home_page` singleType table and their relation join tables;
  it does **not** touch `product`, `category`, `parent-category`, `brand` tables at all
  (data preserved).
- The old `home_sections` (+ its component join tables) sqlite tables become orphaned
  (Strapi does not auto-drop tables for removed content-types) — harmless, just dead
  rows in `cms/.tmp/data.db`. Not cleaned up as part of this task (out of scope: no
  destructive DB operations were requested); flag to agent-lead if a cleanup pass is
  wanted later.
- `home.subsection.products` relation-type change (`oneToMany` → `manyToMany`): this repo
  had **no production data** yet in this relation for existing rows to lose (the
  `home-section` collection — which owned `subsection` component data — is being wiped
  in this same change since it moves under the new `home-page` single-type). If this
  were applied to a repo with live editor content already in `home-section`, that data
  would need re-entry — not the case here.
- Seed (`cms/src/index.ts` `ensureHomePage`):
  - Runs on every bootstrap. Skips (no-op) if the `home-page` singleton already has
    `sections.length > 0`, unless `SEED=force`.
  - Builds `sections` = `[category-list, ...product-list sections]` by resolving slugs
    (from `cms/src/seed/data.ts` — reused existing `HOME_SECTIONS` for the 3
    product-list rows + new `HOME_CATEGORY_LIST` for the category-list) to `documentId`s,
    then either `update()`s the existing singleton or `create()`s it. **Idempotent** —
    re-running with `SEED=force` updates in place (verified: no duplicate `home-page`
    rows, no duplicate products/categories after a forced reseed).
  - `HOME_CATEGORY_LIST.categorySlugs` (in `cms/src/seed/data.ts`) was chosen to exactly
    reproduce the previous `getCategoryTiles()` default output: categories under
    `phan-cung`/`phan-mem` sorted by `order`, first 10 — i.e. the 8 `phan-cung`
    categories (order 1–8: máy tính, màn hình, máy in, họp trực tuyến, thiết bị mạng,
    lưu trữ, bảo mật, data center) + the first 2 `phan-mem` categories by order
    (microsoft, adobe). This preserves the exact tile grid the homepage showed before.
- Public permissions: `api::home-section.home-section.*` removed from
  `PUBLIC_FIND`/wanted actions; `api::home-page.home-page.find` added (singleType only
  has `find`, no `findOne`).
- Vietnamese admin labels (`VI_LABELS`/`COMPONENT_LABELS` in `cms/src/index.ts`): removed
  `home-section` entry, added `home-page` + `sections.product-list` +
  `sections.category-list` entries; kept `home.subsection` entry as-is (fields unchanged,
  just the relation type under the hood).

## Data layer changes

- `src/lib/types.ts`: `HomeSection` is now a **discriminated union** on `type`
  (`"product-list" | "category-list"`) — see `data-contract.md` for the full shape. This
  is a **breaking type change** for any consumer that destructured the old flat
  `{ title, products, subsections, moreHref }` shape without narrowing on `type` first.
- `src/lib/data/strapi.ts`: `getHomeSections()` now fetches `/home-page` (was
  `/home-sections`) with Strapi v5 dynamic-zone-by-`__component` populate syntax
  (`populate[sections][on][sections.product-list][populate]...` /
  `[on][sections.category-list][populate][categories]...`). Returns an internal
  `RawHomeSection` union (slug-only) — not exported to UI code, only consumed by
  `src/lib/data/index.ts`.
- `src/lib/data/index.ts`: `getHomeSections()` maps the raw union into the public
  `HomeSection` union for **both** modes:
  - strapi mode: resolves `productSlugs`/`categorySlugs` against `getAllEntries()`
    (`bySlug` map, already used elsewhere in this file) into full `CatalogEntry[]` /
    `CategoryTile[]`.
  - seed mode: prepends a `category-list` section (title "Khám phá theo nhóm giải
    pháp", `tiles: categoryTiles` — reusing the existing static `categoryTiles` array
    already defined in `src/lib/data/seed.ts`, which was previously exported but
    **unused dead code**; it's now live again) ahead of the existing 3 hardcoded
    product-list sections (unchanged content, just wrapped with `type: "product-list"`).
  - `getCategoryTiles()` (separate function, previously used by the standalone
    `CategoryTilesSection` component) is **left unchanged** — not deleted, since
    frontend-dev may still reference it or remove its only call site
    (`HomeSections.tsx`) as part of folding it into `category-list`.
- `src/lib/data/seed.ts`: **no changes needed** — its existing `categoryTiles` const
  already had the exact `CategoryTile[]` shape needed for the seed-mode default.

## Breaking changes / what frontend-dev needs to do

- `HomeSection` is now a union — `bun run typecheck` currently fails **only** in
  `src/components/HomeSections.tsx` (7 errors, all "Property X does not exist on type
  HomeCategoryListSection") because that file still destructures the old flat shape.
  This is expected and matches the feature-spec breakdown ("frontend-dev:
  `src/components/HomeSections.tsx` render theo `section.type`"). **Not fixed by
  backend-dev** — out of scope (no touching `src/components/**`).
- `src/app/page.tsx` still calls `<CategoryTilesSection />` directly before
  `<HomeSections sections={sections} />` — frontend-dev should remove that hardcoded
  call once `category-list` is folded into the `HomeSections` switch, per spec.
- Revalidation: no webhook route currently exists in this repo
  (`grep REVALIDATE_SECRET` across `src/app/api` and `cms` found nothing) — this predates
  this task and wasn't added, since it wasn't asked for. `src/lib/data/strapi.ts`'s
  `sFetch` already tags the `/home-page` fetch with `["strapi", "home-page"]` (Next
  `fetch` cache tags) so if/when a revalidation webhook is added later, tagging
  `strapi` or `home-page` will work as-is.

## Verify results

- Strapi restart: healthy (`GET /_health` → 204), no schema errors in
  `/tmp/az-strapi.log` (only pre-existing unrelated warnings: sendmail provider,
  Tailwind content config).
- Seed log: `[seed] home page created with 4 sections` (first boot after schema change);
  re-running with `SEED=force` produced `[seed] 4 parent categories, 23 categories, 140
  products, 31 brands` + `[seed] home page sections updated (4)` — confirmed **no
  duplicate** `home-page` document (`id: 1` both times) and **no duplicate**
  products/categories (140 products / 23 categories via `/api/products` and
  `/api/categories` pagination meta, matching the seed data counts).
- `GET /api/home-page` with dynamic-zone populate-by-`__component` returns both
  component types correctly, `__component: "sections.category-list"` with resolved
  `categories[]` (slug/title/icon) and `__component: "sections.product-list"` with
  resolved `products[]`/`subsections[].products[]`/`parentCategory`.
- `bun run typecheck`: clean except the 7 pre-existing/expected errors in
  `src/components/HomeSections.tsx` (frontend-dev's file — see "Breaking changes"
  above). All backend-owned files (`src/lib/types.ts`, `src/lib/data/index.ts`,
  `src/lib/data/strapi.ts`, `src/lib/data/seed.ts`) compile cleanly.
