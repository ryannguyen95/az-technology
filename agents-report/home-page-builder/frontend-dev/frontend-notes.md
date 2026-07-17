# Frontend-dev notes — home-page-builder

## File đã đổi

- `src/components/HomeSections.tsx` — rewritten:
  - Xoá export `CategoryTilesSection` (component riêng lẻ) và import `getCategoryTiles`
    (không còn Server data-fetch riêng cho tiles — data giờ đến từ `HomeSection[]`
    do `page.tsx` truyền vào, đúng "1 nguồn dữ liệu, 1 vòng render").
  - `HomeSections({ sections })` giờ `switch`/`if` theo `section.type` trong 1 vòng
    `.map`:
    - `"category-list"` → markup y hệt `CategoryTilesSection` cũ: `<section className="py-14">`
      + `SectionHeading title={section.title}` + `grid grid-cols-3 sm:grid-cols-5 gap-4`
      các `<CategoryTile key={tile.href} tile={tile} />`. Không có `<div className="bg-white">`
      wrapper (giữ nền trong suốt/xám của page, y như bản cũ).
    - `"product-list"` → logic giữ nguyên 100% (subsections → nhiều `HomeProductExpander`;
      không sub → 1 `HomeProductExpander big`; `moreHref` "Xem thêm" + `Icon arrowRight`).
  - **Filter section rỗng**: `category-list` ẩn nếu `tiles.length === 0`; `product-list`
    ẩn nếu không có `products` lẫn `subsections[].products` (logic cũ, không đổi).
  - **Nền xen kẽ (quan trọng)**: dùng biến đếm riêng `productIndex` (bắt đầu `-1`,
    `+1` mỗi khi gặp section `product-list`) để quyết định `bg-white`, thay vì dùng
    index chung của mảng `visible`. Lý do: nếu dùng index chung, `category-list` đứng
    đầu mảng sẽ chiếm slot `i=0` (chẵn, không bg) và đẩy product-list đầu tiên sang
    `i=1` (lẻ → ăn `bg-white` nhầm) — lệch với bản cũ. Với `productIndex`, alternation
    tái tạo đúng y hệt bản cũ (product-list #1 trong suốt, #2 trắng, #3 trong suốt),
    còn `category-list` luôn trong suốt (không tính vào bộ đếm) — khớp 100% bản cũ.

- `src/app/page.tsx` — bỏ import + gọi `<CategoryTilesSection />` đứng riêng (giờ nó
  là 1 phần tử trong mảng `sections`, backend seed đặt đầu tiên). Còn lại:
  `Hero` → `HomeSections sections={sections}` → `WhyAZ` → `PartnerMarquee` → `CTAStrip`.

- Không đổi `src/lib/data/index.ts` (`getCategoryTiles()` vẫn export nguyên, theo
  data-contract — backend-dev giữ lại cho tương thích ngược, FE không còn gọi nó
  từ trang chủ nữa).

## Cách render union

```tsx
export function HomeSections({ sections }: { sections: HomeSection[] }) {
  const visible = sections.filter((s) =>
    s.type === "category-list" ? s.tiles.length : s.products.length || s.subsections.some((ss) => ss.products.length)
  );
  let productIndex = -1;
  return (
    <>
      {visible.map((s, i) => {
        if (s.type === "category-list") { /* SectionHeading + grid CategoryTile, no bg wrapper */ }
        productIndex += 1;
        /* ...product-list render y cũ..., bg = productIndex % 2 === 1 ? "bg-white" : "" */
      })}
    </>
  );
}
```

TypeScript đủ hẹp union sau `if (s.type === "category-list") return ...;` — nhánh
còn lại được TS narrow về `HomeProductListSection` tự động (không cần cast).

## Kết quả verify

- `bun run typecheck` — **sạch**, không lỗi (union đã khớp field access).
- `bun run lint` (`next lint`) — **không chạy được**: repo hiện KHÔNG có file cấu
  hình eslint nào (`.eslintrc*` / `eslint.config.*`) — kiểm bằng `find` xác nhận
  chưa từng tồn tại. `next lint` rơi vào wizard tương tác hỏi tạo config
  (Strict/Base), không cách nào chạy non-interactive được. Đây là tình trạng
  **có sẵn của repo**, không phải do thay đổi trong task này — không tự tạo
  eslint config (ngoài phạm vi/không rõ convention lead muốn), báo agent-lead
  nếu cần xử lý riêng.
- Dev server sẵn có ở `:3005` (`DATA_SOURCE=strapi`, Strapi `:1337` đang chạy).
  `curl -s http://localhost:3005` → HTTP 200; grep thấy đủ 4 title
  ("Khám phá theo nhóm giải pháp", "SẢN PHẨM NỔI BẬT", "GIẢI PHÁP DOANH NGHIỆP",
  "Máy tính"). Thứ tự `<h2>` trong HTML (SSR, không cần JS): category-list →
  SẢN PHẨM NỔI BẬT → GIẢI PHÁP DOANH NGHIỆP → DỊCH VỤ IT — đúng thứ tự
  dynamic-zone trong data-contract.
- **CDP `:9222` MỞ SẴN** → verify pixel bằng Playwright kết nối CDP (playwright-core
  lấy từ bun cache local vì project không cài `playwright` trực tiếp), dùng 1 tab
  cố định (marker `#azagent-fe`, không mở tab mới/không `bringToFront`).
  - `getComputedStyle` từng `section.py-14` → nền: category-list trong suốt
    (10 tiles), SẢN PHẨM NỔI BẬT trong suốt, GIẢI PHÁP DOANH NGHIỆP `rgb(255,255,255)`,
    DỊCH VỤ IT trong suốt — **khớp 100%** nhịp xen kẽ của bản cũ.
  - Screenshot full-page: layout y hệt bản cũ — lưới 2 hàng x 5 tile danh mục trên
    cùng (dưới Hero), rồi 3 hàng sản phẩm (Phần mềm/Phần cứng dạng sub-section,
    Giải pháp DN, Dịch vụ IT), WhyAZ/PartnerMarquee/CTAStrip/Footer phía dưới
    không đổi.

## Điểm còn tồn / chưa làm

- Chưa test "đổi thứ tự section trong CMS Strapi Admin → reload thấy đổi" — spec
  ghi rõ "không bắt buộc, nêu trong report nếu tốn thời gian". Bỏ qua vì rủi ro
  thấp: component chỉ render tuần tự theo mảng `sections` trả về từ
  `getHomeSections()` (backend-dev đã verify data layer trong data-contract.md),
  FE không có logic sắp xếp/cache riêng nào có thể làm sai thứ tự.
- `bun run lint` không dùng được do thiếu eslint config sẵn có trong repo — không
  phải regression từ task này, cần agent-lead quyết định có setup lint hay bỏ qua.
