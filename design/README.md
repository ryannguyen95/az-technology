# AZ Technology — Design (SOURCE OF TRUTH)

Design chính thức của dự án nằm trên **Claude Design** và là **nguồn chân lý tuyệt đối** cho UI (chuẩn nghiệm thu: "giống 100%").

- **Project:** `AZ-technology backup`
- **URL:** https://claude.ai/design/p/3a3417eb-ccf0-4835-b4c6-51e0da11521a?file=index.html
- **Import qua Claude Design MCP** (`https://api.anthropic.com/v1/design/mcp`, auth bằng `/design-login`).

## Đã mirror về local (design-system core)

Đây là phần nền tảng nhất — token, style, content, và primitive components — dùng để đối chiếu implement:

| File | Nội dung |
|---|---|
| `js/tw-config.js` | **Design tokens** đầy đủ: `primary`/`cyan`/`navy`, shadows (`card`/`cardHover`/`mega`/`pop`), radius, font `Manrope`, animations. **Map 1:1 sang `tailwind.config.ts` của Next.** |
| `assets/styles.css` | Utilities/gradients thật (`az-grad`, `az-text-grad`, `az-mesh`, reveal-on-scroll, card hover tint, focus ring cyan, marquee…). |
| `js/data.js` | Toàn bộ **content/catalog/nav**: company info, mega-menu, partners, category tiles, whyAZ, products (featured/software/solutions/services/hardware). |
| `js/common.jsx` | **Primitive components** với class Tailwind chính xác: `Icon`(+ICONS set), `Button`(variants: primary/cyan/inverted/outline/ghost/white/soft × sizes sm/md/lg), `ProductImage`(TONES), `Breadcrumb`, `SectionHeading`, `Tabs`, `Accordion`. |

## CHƯA mirror — pull-on-demand theo feature

Các file page-specific + ảnh chưa kéo về (để tránh phình repo/token). **Đầu mỗi feature, sync đúng phần cần** từ Claude Design MCP:

- **Pages (HTML):** `index.html`, `category.html`, `contact.html`, `about.html`, `product-datacenter.html`, `product-laptop.html`, `product-m365.html`, `product-migrate.html`, `spa.html` (+ các bản export trùng: `index-standalone/-print`, `Full Website*`, `Trang chu`, `Laptop … (standalone)`).
- **Page JSX:** `js/{home,header,footer,cards,modal,detail,router,about,category,contact,product-datacenter,product-laptop,product-m365,product-migrate,tweaks-app,tweaks-panel}.jsx`.
- **CSS:** `assets/tw-compiled.css` (bản Tailwind compiled cho các trang standalone).
- **JS:** `image-slot.js`.
- **Ảnh (binary):** `assets/banners/banner-{1,2,3}.png`, `uploads/pasted-*.png` (~15 ảnh), `screenshots/*` (ảnh reference dev).

### Cách pull thêm 1 file (từ agent có `DesignSync`)

```
DesignSync({ method: "get_file",
  projectId: "3a3417eb-ccf0-4835-b4c6-51e0da11521a",
  path: "js/home.jsx" })   // → { content, isBase64 }  → Write vào design/<path>
```

- File text (`isBase64:false`): ghi `content` thẳng ra `design/<path>`.
- File ảnh (`isBase64:true`): ghi base64 ra `.b64` rồi `base64 -d`.
- **Lưu ý:** `DesignSync` chỉ dùng được ở **session chính** (không reach được từ subagent).

## Xem prototype đầy đủ

Để soi full-page pixel: mở trực tiếp URL Claude Design ở trên, **hoặc** pull đủ dep của trang cần xem về `design/` rồi `cd design && python3 -m http.server 8899` → `http://localhost:8899/index.html` (cần internet: prototype dùng React/Babel/Tailwind qua CDN).
