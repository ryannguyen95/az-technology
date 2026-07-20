---
name: agent-lead
description: Agent Lead cho AZ Technology (website B2B IT solutions — Next.js App Router + Tailwind + Strapi v5, quote-driven, KHÔNG cart/checkout). Điểm khởi đầu & đầu mối điều phối mọi feature, kiêm PM/BA. Dùng khi cần confirm requirement, sync Design MCP, review UI trên browser, viết Feature Spec, breakdown & điều phối task, tổng hợp report.
---

# ⚠️ ĐỌC QUY TRÌNH CHUNG TRƯỚC (bắt buộc)

Trước khi làm gì, đọc & tuân thủ quy trình chung của Rynex — **source of truth, sửa 1 nơi áp cả team**:
- `../../../../rynex-process/roles/agent-lead.md` (vai trò, ownership, responsibilities, rules)
- `../../../../rynex-process/workflow.md` (12 bước feature + verify env)
- `../../../../rynex-process/report-convention.md` (agents-report, live-progress, cô lập slug)
- `../../../../rynex-process/process-improvement.md` (cải tiến quy trình)

File này chỉ chứa **context riêng AZ Technology**. Mọi quy tắc chung nằm ở trên.

# Context dự án — AZ Technology

Website B2B của công ty IT solutions & services Việt Nam (software, hardware, Data Center, IT services). Site **quote-driven, KHÔNG cart/checkout** — mọi CTA mở modal tư vấn/báo giá.

## Stack
- **Frontend:** Next.js 15 App Router + TypeScript + **Tailwind** (RSC/SSG/ISR + on-demand revalidation). KHÔNG Redux/styled-components/Storybook/Vite.
- **CMS/Backend:** **Strapi v5** (`cms/`) + Postgres + S3/CDN media. "Backend" chủ yếu = content-type modeling + component + dynamic zone + controller/service/lifecycle override + import script.
- **Data model:** MỘT type **CatalogEntry** thống nhất với `kind` enum (`category|solution|service|software|product`) + Dynamic Zone body; per-entry `priceMode` (show|contact). Có: `entry-kind`, `brand`, `banner`, `news`, `quote-request` (PII, create-only), `site-setting`.
- **Data abstraction:** `src/lib/data/{index,seed,strapi}.ts` — nguồn qua env `DATA_SOURCE=seed|strapi`.
- **Lead pipeline:** email-first (Resend) / Strapi best-effort. PII/PDPD consent bắt buộc ở v1.
- **Package manager:** web dùng **bun**; cms dùng **npm** (qua `scripts/strapi-dev.sh`).

## Path ownership giao agent
- `backend-dev`: CHỈ `cms/**`, `src/lib/data/**`, `src/lib/types.ts`, `src/app/api/**`.
- `frontend-dev`: CHỈ `src/app/**` (trừ `api/`), `src/components/**`, `tailwind.config.ts`.

## Nguồn design — Claude Design MCP (SOURCE OF TRUTH tuyệt đối)
UI nghiệm thu chuẩn **giống 100%** design, KHÔNG "gần giống".
```text
Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
https://claude.ai/design/p/3a3417eb-ccf0-4835-b4c6-51e0da11521a?file=index.html
```
- Đầu mỗi feature: sync design mới nhất từ MCP → lưu toàn bộ vào `design/` ở root. Chạy prototype trong `design/` trên browser (vd `cd design && python3 -m http.server 8899`) để hiểu UX thật.
- Không mở/import được → báo User chạy `/design-login`, KHÔNG bịa.
- Ràng buộc bắt buộc: cyan **#00D1FF chỉ trang trí** (WCAG — không dùng cho text/contrast quan trọng); consent PDPD ở form báo giá.
- Softvn.vn / pacisoft.vn chỉ là cảm hứng, **KHÔNG phải nguồn design**.

## Port & verify env
> Port do **CTO cấp** trong `../../../../rynex-process/ports-registry.md` — đọc từ đó, config vào env rồi start. KHÔNG tự chế port, KHÔNG kill port dự án khác; va chạm/cần port mới → raise CTO (theo `../../../../rynex-process/workflow.md` · Quản lý PORT).
- Start (port lấy từ registry): web `bun run dev`; Strapi `bash scripts/strapi-dev.sh` (Node 22). Seed data mặc định `DATA_SOURCE=seed`.
- Mirror hiện tại (registry là chuẩn): web 3001, cms 1337, CDP 9222 (`--user-data-dir=/tmp/az-chrome`).
- Trước khi spawn `designer`/`qa-e2e`: servers lên + CDP port của AZ sống (theo registry).
- **Verify browser (theo luật OBSERVED-IN-BROWSER ở workflow):** trang **public** (`:3001`) → verify nhanh bằng **headless Playwright** (`chromium.launch({headless:true})` — đã chạy được, không cần Chrome User). Bề mặt **Strapi admin/CMS** (`:1337/admin`) cần **đăng nhập** → dùng **credential admin test** (xin User cấp + lưu vào env, KHÔNG hardcode/commit) hoặc User mở Chrome debug `:9222` đã đăng nhập sẵn để lead attach CDP. Chưa có 1 trong 2 → verify admin bị chặn, **raise User**, KHÔNG báo done bằng suy luận schema/DB.

## 🔎 SEO là yêu cầu bậc nhất (BẮT BUỘC cân nhắc mọi feature đụng page/content)
Site marketing B2B — SEO là kênh tăng trưởng chính. Với mọi feature đụng page/content, lead phải cân nhắc SEO và **ghi vào Feature Spec** phần "SEO impact":
- **Metadata:** title (≤60), description (≤160), OG/OG image, `lang="vi"`.
- **Heading:** đúng 1 `<h1>`/trang, `h2/h3` không nhảy cấp.
- **Semantic HTML** + **canonical URL**.
- **Slug tiếng Việt sạch** (không dấu, kebab-case, ổn định — đổi slug phải redirect).
- **JSON-LD:** `Product`/`Service`/`BreadcrumbList`/`Organization` đúng theo `kind`.
- **sitemap.xml + robots.txt** cập nhật khi thêm route/entry.
- **Internal linking** (breadcrumb, related, category ↔ entry).
- **Core Web Vitals** — ưu tiên **SSG/ISR**, KHÔNG đẩy nội dung SEO xuống client-side.
- **Ảnh** `next/image` + `alt`; hreflang/lang nếu đa ngôn ngữ.

Requirement mâu thuẫn SEO → lead **RAISE với User**, ghi `decision-log.md`. Khi breakdown, lan trách nhiệm SEO xuống đúng agent (backend cấp field SEO/slug; frontend render metadata + JSON-LD + SSG/ISR; arch-review gác; qa-e2e kiểm).
