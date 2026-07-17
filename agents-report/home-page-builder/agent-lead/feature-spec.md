# Feature Spec — Home Page Builder (Dynamic Zone)

**Task-slug:** `home-page-builder`
**Ngày:** 2026-07-17
**Lead:** agent-lead

## Mục tiêu

Chuyển trang chủ từ compose cứng sang **page-builder cấu hình từ CMS**: một **single-type `Trang chủ` (home-page)** chứa danh sách section **kéo-thả sắp xếp thứ tự**, mỗi section có **loại (type)** và link tới collection tương ứng. Editor tự thêm/xoá/sắp xếp/đặt title cho section.

## Scope (chốt với User)

**LÀM** — đúng 2 loại section:
- **`product-list`** — danh sách sản phẩm (giữ cả sub-sections như hiện tại).
- **`category-list`** — lưới danh mục (thay khối "Khám phá theo nhóm giải pháp" hiện đang tự-suy/hardcode).

**KHÔNG (giữ hardcode):** Hero (banners), Partner strip, CTA, Footer.

## Mô hình dữ liệu (Strapi v5)

### Component `sections.product-list`
| Field | Kiểu | Ghi chú |
|---|---|---|
| `title` | string (required) | tiêu đề section |
| `products` | relation **manyToMany → api::product.product** (manyWay, KHÔNG inversedBy) | cho phép 1 product dùng lại ở nhiều section |
| `subsections` | component repeatable `home.subsection` | giữ như hiện tại (đổi relation products của nó sang manyToMany) |
| `parentCategory` | relation oneToOne (oneWay) → parent-category | dùng dựng link "Xem thêm" |

### Component `sections.category-list`
| Field | Kiểu | Ghi chú |
|---|---|---|
| `title` | string (required) | tiêu đề section |
| `categories` | relation **manyToMany → api::category.category** (manyWay) | mỗi category = 1 ô tile; label/icon/href lấy từ chính category |

### Single-type `home-page`
- `sections`: **dynamiczone** gồm `["sections.product-list", "sections.category-list"]`.
- Scaffolding: schema + controller/route/service factory (mirror `site-setting`).

### Đổi relation sang manyWay (chốt với User)
- `home.subsection.products`: `oneToMany` → **`manyToMany`** (để product dùng lại nhiều nơi).

## Data Contract (backend-dev sở hữu — `src/lib/types.ts`)

`getHomeSections()` trả `HomeSection[]` là **discriminated union theo `type`**:

```ts
export type HomeSection =
  | {
      type: "product-list";
      title: string;
      moreHref?: string;                 // từ parentCategory.slug
      products: CatalogEntry[];          // đã resolve
      subsections: { title: string; products: CatalogEntry[]; moreHref?: string }[];
    }
  | {
      type: "category-list";
      title: string;
      tiles: { label: string; icon: string; href: string }[];  // từ categories đã link
    };
```

- Thứ tự phần tử mảng = thứ tự trong dynamic zone (editor kéo-thả).
- **strapi mode:** đọc `/home-page` populate DZ theo `__component`, map sang union trên.
- **seed mode:** default = tái tạo trang chủ hiện tại (2–3 section product-list + 1 category-list ở đầu). Không được để trang chủ trống.

## Migration

- Thay **collection `home-section`** bằng single-type `home-page`. Gỡ collection `home-section` + api của nó + mọi tham chiếu trong `cms/src/index.ts` (seed/permissions/labels).
- Seed `cms/src/index.ts`: seed **home-page** với default sections (map từ default cũ: "SẢN PHẨM NỔI BẬT" có subsections Phần mềm/Phần cứng, "GIẢI PHÁP DOANH NGHIỆP", "DỊCH VỤ IT", + 1 `category-list` "Khám phá theo nhóm giải pháp" trỏ các category dưới phan-mem/phan-cung). Idempotent (chỉ seed khi trống, `SEED=force` để reseed).
- Public permissions: cấp `find` cho `home-page` (bỏ `home-section`).

## Acceptance Criteria

1. **Trang chủ nhìn KHÔNG đổi** so với hiện tại (product rows + khối tiles danh mục) — layout/thứ tự y như cũ sau seed.
2. Trong Strapi Admin: có single-type **"Trang chủ"** với dynamic zone; **thêm section**, chọn loại (`product-list`/`category-list`), **kéo-thả đổi thứ tự**, đặt title, link products/categories.
3. Đổi thứ tự / title / danh sách trong CMS → sau revalidate, trang chủ phản ánh đúng.
4. `category-list` render tiles từ categories đã chọn (label = category.title, icon = category.icon, link = trang category).
5. `DATA_SOURCE=seed` vẫn chạy (default sections), `DATA_SOURCE=strapi` đọc từ home-page.
6. **SEO không hồi quy:** trang chủ vẫn SSG/ISR, 1 `<h1>` (Hero), section title là `<h2>`, HTML render sẵn cho crawler.

## Out of scope / lưu ý

- Không đụng Hero/Partner/CTA/Footer (giữ nguyên).
- Không thêm business logic mới ngoài compose trang chủ.
- Revalidation: đổi home-page → revalidate route `/` (tag `strapi`).

## Breakdown

- **backend-dev:** toàn bộ mục "Mô hình dữ liệu" + "Migration" + "Data Contract" (types.ts, strapi.ts, index.ts seed, seed.ts default). Restart Strapi, verify API `/api/home-page` trả DZ đúng. Ghi `data-contract.md`.
- **frontend-dev:** `src/components/HomeSections.tsx` render theo `section.type` (switch product-list/category-list; gộp logic CategoryTiles vào category-list), `src/app/page.tsx` bỏ `CategoryTilesSection` cứng (giờ là 1 section type). Verify trang chủ nhìn y cũ + đổi thứ tự trong CMS phản ánh đúng.
