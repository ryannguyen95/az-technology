# Backend-dev progress — home-page-builder

## 15:22:35 Bắt đầu
- Đọc feature-spec.md xong.
- Review content model hiện tại: `cms/src/api/home-section/**` (collectionType cũ), `cms/src/components/home/subsection.json`, `cms/src/api/site-setting/**` (mirror pattern cho singleType).
- Review `src/lib/data/{index,strapi,seed}.ts` + `src/lib/types.ts` để nắm `HomeSection` hiện tại và cách `getHomeSections()`/`getCategoryTiles()` hoạt động ở cả 2 mode.
- Review `cms/src/seed/data.ts`: `HOME_SECTIONS` (product-list cũ), `CATEGORIES`/`PARENT_CATEGORIES` (để build category-list mặc định trùng khớp `getCategoryTiles()` hiện tại: 8 category `phan-cung` (order 1-8) + 2 đầu `phan-mem` (microsoft, adobe) = 10 tiles).
- Review `cms/src/index.ts` bootstrap/seed (idempotent, `SEED=force` để reseed) — sẽ gỡ mọi tham chiếu `home-section`, thêm seed `home-page`.

Kế hoạch:
1. `cms/src/components/sections/product-list.json` + `category-list.json` (mới).
2. Đổi `home.subsection.products` sang manyToMany (manyWay).
3. `cms/src/api/home-page/**` (singleType, mirror site-setting) — gỡ `cms/src/api/home-section/**`.
4. Sửa `cms/src/index.ts`: bỏ home-section refs, thêm seed home-page (category-list đầu tiên + 3 product-list y cũ).
5. Data layer: `types.ts` (HomeSection union), `strapi.ts` (getHomeSections đọc /home-page populate DZ theo __component), `index.ts` (map union cả 2 mode), `seed.ts` (default nếu cần thêm field).
6. Restart Strapi, verify API, typecheck.

## 15:23–15:25 Content model
- Tạo `cms/src/components/sections/product-list.json` (title, products manyToMany-manyWay → product, subsections repeatable home.subsection, parentCategory oneToOne-oneWay → parent-category).
- Tạo `cms/src/components/sections/category-list.json` (title, categories manyToMany-manyWay → category).
- Sửa `cms/src/components/home/subsection.json`: `products` oneToMany → manyToMany (manyWay, không inversedBy).
- Tạo `cms/src/api/home-page/**` (schema singleType `sections` dynamiczone [sections.product-list, sections.category-list] + controller/route/service mirror `site-setting`, `draftAndPublish:false`).
- `rm -rf cms/src/api/home-section` (gỡ hoàn toàn collection cũ).

## 15:25–15:27 `cms/src/index.ts`
- Import thêm `HOME_CATEGORY_LIST` từ `./seed/data`.
- VI_LABELS: bỏ `api::home-section.home-section`, thêm `api::home-page.home-page` (`sections: "Các khối trang chủ"`).
- COMPONENT_LABELS: thêm `sections.product-list`, `sections.category-list` (giữ `home.subsection` nguyên).
- PUBLIC_FIND: bỏ `home-section`; thêm `api::home-page.home-page.find` vào `wanted` (singleType chỉ có `find`, không `findOne`).
- Thay `ensureHomeSections()` → `ensureHomePage()`: build `sections = [category-list, ...product-list theo HOME_SECTIONS]`, resolve slug→documentId, `update()` nếu đã có singleton, `create()` nếu chưa — idempotent, `SEED=force` để rebuild.
- Thêm `cms/src/seed/data.ts`: export `HOME_CATEGORY_LIST` (title "Khám phá theo nhóm giải pháp" + 10 category slug đúng thứ tự cũ của `getCategoryTiles()`: máy tính, màn hình, máy in, họp trực tuyến, thiết bị mạng, lưu trữ, bảo mật, data-center, microsoft, adobe).

## 15:27 Restart Strapi lần 1 — OK
- `lsof -ti :1337 | xargs -r kill` → `nohup bash scripts/strapi-dev.sh` → health 204, không lỗi schema trong log.
- Log seed: `[seed] home page created with 4 sections`.
- Verify `GET /api/home-page` với populate DZ theo `__component` (product-list + category-list) — trả đúng cả 2 loại section, relations resolve đúng (products/categories/parentCategory).

## 15:28 Regression check: SEED=force
- Restart với `SEED=force` → log `4 parent categories, 23 categories, 140 products, 31 brands` + `home page sections updated (4)` (update in-place, KHÔNG tạo document trùng — vẫn `id: 1`).
- Xác nhận `/api/products` (140) và `/api/categories` (23) không bị nhân đôi.
- Restart lại bình thường (không force) để trả môi trường về trạng thái ổn định — health 204, log "skipped (280 products already exist...)" (seed collection-level bỏ qua vì đã có data).

## 15:29–15:30 Data layer
- `src/lib/types.ts`: `HomeSection` → union `HomeProductListSection | HomeCategoryListSection` theo đúng shape trong feature-spec; `HomeSubsection` giữ nguyên.
- `src/lib/data/strapi.ts`: `getHomeSections()` đổi fetch `/home-sections` → `/home-page`, populate DZ theo `__component` (`sections.product-list`, `sections.category-list`); trả `RawHomeSection` union (nội bộ, slug-only).
- `src/lib/data/index.ts`: `getHomeSections()` map raw union → public union (resolve slug→CatalogEntry/CategoryTile ở cả strapi + seed mode). Seed mode: thêm category-list đầu tiên dùng lại `categoryTiles` (static, có sẵn trong `seed.ts`, trước đó là dead code) + giữ nguyên 3 product-list mặc định (chỉ bọc thêm `type: "product-list"`).
- `src/lib/data/seed.ts`: không cần sửa (categoryTiles đã đúng shape `CategoryTile[]`).
- `getCategoryTiles()` (hàm riêng, cũ) giữ nguyên — không xoá, để frontend-dev tự quyết định có còn dùng không.

## 15:30 Verify cuối
- `bun run typecheck`: sạch với mọi file backend sở hữu (`types.ts`, `data/index.ts`, `data/strapi.ts`, `data/seed.ts`). 7 lỗi còn lại đều nằm trong `src/components/HomeSections.tsx` (file của frontend-dev, đúng như breakdown trong feature-spec — chưa sửa vì ngoài phạm vi).
- Ghi `data-contract.md` + `backend-notes.md`.
- HOÀN THÀNH phần backend-dev. Không có blocker.
