# Data Contract — Home Page Builder

Owner: backend-dev. Consumers: frontend-dev (`src/components/HomeSections.tsx`, `src/app/page.tsx`).

## `HomeSection` (discriminated union) — `src/lib/types.ts`

```ts
export interface HomeSubsection {
  title: string;
  products: CatalogEntry[];
  moreHref?: string; // "Xem thêm" -> a chosen parent-category page
}

export interface HomeProductListSection {
  type: "product-list";
  title: string;
  moreHref?: string;          // from parentCategory.slug (may be undefined)
  products: CatalogEntry[];   // resolved, in CMS-picked order
  subsections: HomeSubsection[];
}

export interface HomeCategoryListSection {
  type: "category-list";
  title: string;
  tiles: CategoryTile[];      // { label, icon, href } — one per linked category
}

export type HomeSection = HomeProductListSection | HomeCategoryListSection;
```

`CategoryTile` (already existing, unchanged):
```ts
export interface CategoryTile { label: string; icon: string; href: string; }
```

## `getHomeSections(): Promise<HomeSection[]>` — `src/lib/data/index.ts`

- Array order = dynamic-zone order in the CMS (editor drag-and-drop). Both `strapi` and
  `seed` modes return the same union shape.
- **`product-list`**: `products`/`subsections[].products` are resolved `CatalogEntry[]`
  (looked up by slug from `getAllEntries()`), same as before this task.
  `moreHref` is built from the section's `parentCategory` relation (Strapi) via
  `entryHref("category", slug)`, e.g. `/danh-muc/phan-mem`.
- **`category-list`**: `tiles` is built from the section's `categories` relation —
  `label = category.title`, `icon = category.icon ?? "cpu"`, `href = entryHref("category", category.slug)`
  (e.g. `/danh-muc/may-tinh`).
- Sections whose relations resolve to nothing still come back (empty `products`/`tiles`) —
  existing component logic in `HomeSections.tsx` already filters "empty" product-list
  sections; frontend-dev should apply the same idea for an empty `category-list.tiles`.

### Example (matches the current homepage, after seed)

```json
[
  {
    "type": "category-list",
    "title": "Khám phá theo nhóm giải pháp",
    "tiles": [
      { "label": "Máy tính", "icon": "laptop", "href": "/danh-muc/may-tinh" },
      { "label": "Màn hình & Hiển thị", "icon": "monitor", "href": "/danh-muc/man-hinh-hien-thi" },
      "... 8 more (may-in-scan, hop-truc-tuyen, thiet-bi-mang, luu-tru, bao-mat, data-center, microsoft, adobe)"
    ]
  },
  {
    "type": "product-list",
    "title": "SẢN PHẨM NỔI BẬT",
    "products": [],
    "moreHref": undefined,
    "subsections": [
      { "title": "Phần mềm", "products": ["... CatalogEntry[]"], "moreHref": "/danh-muc/phan-mem" },
      { "title": "Phần cứng", "products": ["... CatalogEntry[]"], "moreHref": "/danh-muc/phan-cung" }
    ]
  },
  {
    "type": "product-list",
    "title": "GIẢI PHÁP DOANH NGHIỆP",
    "products": ["... CatalogEntry[]"],
    "moreHref": "/danh-muc/giai-phap",
    "subsections": []
  },
  {
    "type": "product-list",
    "title": "DỊCH VỤ IT",
    "products": ["... CatalogEntry[]"],
    "moreHref": "/danh-muc/dich-vu-it",
    "subsections": []
  }
]
```

This is the exact seed default (`DATA_SOURCE` either mode reproduces this layout/order) —
`getHomeSections()` in strapi mode reads it live from the `home-page` single-type;
`DATA_SOURCE=seed` mode hardcodes the same 4 sections in `src/lib/data/index.ts`.

## Frontend consumption (for `HomeSections.tsx`)

`src/app/page.tsx` currently does:
```tsx
<CategoryTilesSection />
<HomeSections sections={sections} />
```
Frontend-dev's job (per feature-spec breakdown, not done by backend-dev):
- Fold `CategoryTilesSection`'s tile-grid markup into a `case "category-list":` branch
  inside `HomeSections` (or a sibling component), driven by `section.tiles`.
- `page.tsx` should stop calling `<CategoryTilesSection />` directly — it becomes just
  another entry in the `sections` array (first, per the seed default) rendered by the
  same `switch (section.type)` loop as `product-list`.
- `src/lib/data/index.ts` still exports `getCategoryTiles()` unchanged (kept for backward
  compatibility / in case it's still wired somewhere) — but it is no longer the source of
  the homepage's category grid; `getHomeSections()` is.

## Strapi API shape (raw, for reference — NOT what FE consumes; `src/lib/data/strapi.ts` maps this)

`GET /api/home-page` with dynamic-zone populate-by-`__component`:

```
/api/home-page
  ?populate[sections][on][sections.product-list][populate][products][fields][0]=slug
  &populate[sections][on][sections.product-list][populate][parentCategory][fields][0]=slug
  &populate[sections][on][sections.product-list][populate][subsections][populate][products][fields][0]=slug
  &populate[sections][on][sections.product-list][populate][subsections][populate][parentCategory][fields][0]=slug
  &populate[sections][on][sections.category-list][populate][categories][fields][0]=slug
```

Response `data.sections[]` items carry `__component: "sections.product-list" | "sections.category-list"`.
`src/lib/data/strapi.ts` `getHomeSections()` returns `RawHomeSection[]` (slug-only,
internal — not exported to components) which `src/lib/data/index.ts` resolves into the
public `HomeSection[]` above.

## Relation / CMS editing notes

- `sections.product-list.products` and `home.subsection.products`: **manyToMany, manyWay**
  (no `inversedBy`) → the same product can be picked into multiple sections/sub-sections
  without "moving" it. No reverse field appears on the Product content-type.
- `sections.category-list.categories`: **manyToMany, manyWay** — same reasoning, a
  category can appear in the tile grid and still be part of the normal category tree.
- `sections.product-list.parentCategory` / `home.subsection.parentCategory`: **oneToOne,
  oneWay** → parent-category, used only to build the "Xem thêm" link.
- Admin: single-type **"Trang chủ"** (`api::home-page.home-page`) → field **"Các khối
  trang chủ"** is the dynamic zone; editor picks `sections.product-list` or
  `sections.category-list`, fills `title` + relations, and drags to reorder.
- Public read: `GET /api/home-page` is granted to the `public` role (`find` action only —
  singleType has no `findOne`).
