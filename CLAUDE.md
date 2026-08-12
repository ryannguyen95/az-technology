# AZ Technology — Context dự án (đọc trước khi làm gì)

Website B2B của công ty IT solutions & services Việt Nam (software, hardware, Data Center,
IT services). Site **quote-driven, KHÔNG cart/checkout** — mọi CTA mở modal tư vấn/báo giá.

---

# 1. Quản lý task / scope / feature — GitHub Project

> Requirement, scope, feature, task, decision → quản lý bằng `gh` CLI trên **GitHub Project v2**.
> KHÔNG ghi file report/progress/spec trong repo.

- **Project:** AZ technology — https://github.com/users/ryannguyen95/projects/3
- **Owner:** `ryannguyen95` · **Project number:** `3` · **Project ID:** `PVT_kwHOD3x6I84Bd-cG`
- **Repo:** `ryannguyen95/az-technology`

## Cơ chế
- **1 feature / 1 requirement / 1 bug = 1 GitHub Issue** (title rõ, body = mô tả + acceptance criteria + decision). Add issue vào Project #3.
- **Task con** = sub-issue hoặc checklist trong body issue (việc nhỏ), hoặc issue riêng link tới issue cha (việc lớn).
- **Trạng thái** dùng field Status: `Backlog` → `Ready` → `In progress` → `In review` → `Done`.
- **Decision** ghi thẳng vào body/comment của issue liên quan (không file `decision-log.md`).

## Lệnh `gh` hay dùng
```bash
# Tạo issue rồi add vào project
gh issue create --repo ryannguyen95/az-technology --title "..." --body "..."
gh project item-add 3 --owner ryannguyen95 --url <issue-url>

# Thêm draft item nhanh (khi chưa cần issue repo)
gh project item-create 3 --owner ryannguyen95 --title "..." --body "..."

# Xem / cập nhật status
gh project item-list 3 --owner ryannguyen95
gh project item-edit --project-id PVT_kwHOD3x6I84Bd-cG --id <item-id> \
  --field-id PVTSSF_lAHOD3x6I84Bd-cGzhYcCag --single-select-option-id <option-id>
gh issue comment <n> --repo ryannguyen95/az-technology --body "decision: ..."
```
Field IDs: Status `PVTSSF_lAHOD3x6I84Bd-cGzhYcCag` · Priority `PVTSSF_lAHOD3x6I84Bd-cGzhYcCfU` (P0/P1/P2) · Size `PVTSSF_lAHOD3x6I84Bd-cGzhYcCfY` (XS…XL). Lấy option-id qua `gh project field-list 3 --owner ryannguyen95 --format json`.

## Contract kỹ thuật = code, KHÔNG phải file riêng
- Data/API contract BE ↔ FE = **type dùng chung trong `src/lib/types.ts`** (+ shape route handler, + schema Zod nếu có) — đó là **nguồn chân lý**.
- **KHÔNG viết `api-contract.md` / `data-contract.md`.**

---

# 2. Stack & cấu trúc

- **Frontend:** Next.js 15 App Router + TypeScript + **Tailwind** (RSC/SSG/ISR + on-demand revalidation). KHÔNG Redux/styled-components/Storybook/Vite.
- **CMS/Backend:** **Strapi v5** (`cms/`) + Postgres/SQLite + S3/CDN media. "Backend" chủ yếu = content-type modeling + component + dynamic zone + controller/service/lifecycle override + import script.
- **Data model:** MỘT type **CatalogEntry** thống nhất với `kind` enum (`category|solution|service|software|product`) + Dynamic Zone body; per-entry `priceMode` (show|contact). Có: `entry-kind`, `brand`, `banner`, `news`, `quote-request` (PII, create-only), `site-setting`, `home-page` (single-type, Dynamic Zone sections). **Ưu tiên 1 model mở rộng bằng enum/dynamic-zone** thay vì đẻ nhiều type bespoke.
- **Data abstraction:** `src/lib/data/{index,seed,strapi}.ts` — nguồn qua env `DATA_SOURCE=seed|strapi`. `src/lib/types.ts` là contract chung 2 nguồn.
- **Lead pipeline:** email-first (Resend) / Strapi best-effort. PII/PDPD consent bắt buộc ở v1.
- **Package manager:** web dùng **bun**; cms dùng **npm** (qua `scripts/strapi-dev.sh`).

## Ranh giới thư mục
- **Backend / data:** `cms/**`, `src/lib/data/**`, `src/lib/types.ts`, `src/app/api/**`.
- **Frontend:** `src/app/**` (trừ `api/`), `src/components/**`, `tailwind.config.ts`, `src/app/globals.css`, helper trình bày thuần UI trong `src/lib/`.
- **Test E2E:** `e2e/**` + config test.

---

# 3. Nguồn design — Claude Design MCP (SOURCE OF TRUTH tuyệt đối)

UI nghiệm thu chuẩn **giống 100%** design, KHÔNG "gần giống".
```text
Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
https://claude.ai/design/p/3a3417eb-ccf0-4835-b4c6-51e0da11521a?file=index.html
```
- Đầu mỗi feature: sync design mới nhất từ MCP → lưu vào `design/` ở root. Chạy prototype trong `design/` trên browser (`cd design && python3 -m http.server <port design prototype trong Registry>`) để hiểu UX thật.
- Không mở/import được → báo User chạy `/design-login`, KHÔNG bịa.
- Ràng buộc bắt buộc: cyan **#00D1FF chỉ trang trí** (WCAG — không dùng cho text/contrast quan trọng); consent PDPD ở form báo giá.
- Softvn.vn / pacisoft.vn chỉ là cảm hứng, **KHÔNG phải nguồn design**.

---

# 4. Port

> **Nguồn chân lý = sổ cái chung `~/Documents/Rynex/rynex-process/ports-registry.md`.**
> KHÔNG tự chế port, KHÔNG kill port dự án khác. Cần port mới / va chạm → tra sổ, chọn port
> trống, pin vào file config thật, rồi **ghi ngay vào sổ**.

| Service | Port | Pin ở đâu |
|---|---|---|
| web (Next.js) | **3004** | `package.json` dev script `next dev -p 3004` + `.env.local` `NEXT_PUBLIC_SITE_URL` + `playwright.config.ts` `baseURL` |
| cms (Strapi) | **1337** | `bash scripts/strapi-dev.sh` (Node 22 qua nvm), admin `http://localhost:1337/admin` |
| cms admin Vite (port ẩn) | **1338** | `cms/src/admin/vite.config.ts` — `strictPort`, cấm auto-increment |
| design prototype | **8899** | `cd design && python3 -m http.server 8899` |
| CDP debug (Chrome do User mở) | **9222** | `--user-data-dir=/tmp/az-chrome` |

⚠️ **`3001` KHÔNG còn là AZ web** — đã dời sang `3004` ngày 2026-08-06 vì `3001` bị
`scriptserve-backend-api-1` chiếm thật. Ghi chú cũ nào còn nói "AZ web = 3001" đều lỗi thời.

Đổi schema Strapi → **restart Strapi** để regenerate types/API.

**Worktree:** port = port gốc **+10** (worktree thứ hai +20), theo mục "Dải worktree" của sổ
cái. Cây chính không có ngoại lệ.

Kiểm bằng máy chứ đừng bằng trí nhớ:
`python3 ~/Documents/Rynex/rynex-process/tools/check-ports.py`, rồi
`lsof -iTCP -sTCP:LISTEN -P -n` để lộ cả port ẩn.

⚠️ Bảng trên là bản chép tay cho tiện tra — **sổ cái mới là nguồn chân lý**. Đã có sự cố thật
(2026-08-07): một agent đọc bảng port trong `CLAUDE.md` của dự án rồi start luôn, cướp port
đang tranh chấp. Bảng lệch thì lệch im lặng; nghi ngờ thì mở sổ.

---

# 5. 🔴 LUẬT DoD — OBSERVED-IN-BROWSER (bất khả xâm phạm)

**KHÔNG được báo User "done"** cho bất kỳ thay đổi nào có mặt hiển thị (trang public HOẶC
admin/CMS) khi **chưa tự mở browser thật nhìn thấy nó chạy đúng**. Bằng chứng gián tiếp
(schema/DB/typecheck/log/"giống tiền lệ") **KHÔNG đủ** — phải quan sát chính bề mặt render.
**Cấm đẩy verify cơ bản sang User.** Bug cơ bản (mở lên phát thấy ngay) lọt tới User = lỗi của bạn.

**2 đường mở browser thật** — thứ tự ưu tiên do luật chung `~/.claude/brain/agentic-rules/browser-testing.md` quyết định: **Ryan bảo mở browser để test → dùng Chrome thật của Ryan, không tự chọn headless.**
- **(a) Headless Playwright tự launch** — `chromium.launch({ headless: true })` (đã xác nhận chạy được trong repo, KHÔNG cần Chrome User, KHÔNG cướp focus). **Chỉ dùng khi Ryan nói rõ là được**, hoặc khi tự kiểm nội bộ lúc Ryan không ngồi xem; điều khiển bằng script Node qua Bash, chụp screenshot làm bằng chứng.
- **(b) CDP attach** vào Chrome debug do User mở (`:9222`, `--user-data-dir=/tmp/az-chrome`) — khi cần **nhìn trạng thái đã đăng nhập** (admin/CMS `:1337/admin`), so pixel design, hoặc thao tác trên phiên thật.
- Bề mặt **admin/CMS cần đăng nhập:** headless verify cần **credential admin test** (xin User cấp + lưu env, **KHÔNG hardcode/commit**), hoặc User mở Chrome debug `:9222` đã đăng nhập sẵn để attach CDP. Chưa có 1 trong 2 → verify admin bị chặn, **raise User**, KHÔNG báo done bằng suy luận schema/DB.

---

# 6. 🔎 SEO là yêu cầu bậc nhất (cân nhắc MỌI feature đụng page/content)

Site marketing B2B — SEO là kênh tăng trưởng chính:
- **Metadata:** title (≤60), description (≤160), OG/OG image, `lang="vi"`, `alternates.canonical`.
- **Heading:** đúng 1 `<h1>`/trang, `h2/h3` không nhảy cấp; **semantic HTML**.
- **Slug tiếng Việt sạch** (không dấu, kebab-case, ổn định — đổi slug phải redirect).
- **JSON-LD:** `Product`/`Service`/`BreadcrumbList`/`Organization` đúng theo `kind`.
- **sitemap.xml + robots.txt** cập nhật khi thêm route/entry (`app/sitemap.ts`, `app/robots.ts`).
- **Internal linking** (breadcrumb, related, category ↔ entry) bằng `next/link`.
- **Core Web Vitals** — ưu tiên **SSG/ISR** (`generateStaticParams`, `revalidate`), KHÔNG đẩy nội dung SEO xuống client.
- **Ảnh** `next/image` + `alt`; host CDN phải nằm trong `next.config.mjs > images.remotePatterns`.

Requirement mâu thuẫn SEO → **RAISE với User**, ghi decision vào ticket.

---

# 7. Severity khi review (loop fix theo thứ tự)

- **Blocker** — phải fix trước ship: sai spec/vỡ contract, leak PII, secret hardcode, injection/XSS, migration không reversible/phá data cũ, build/typecheck fail, flow chính gãy, thiếu hẳn state bắt buộc, responsive vỡ không dùng được.
- **Major** — nên fix trước merge: vi phạm convention/SOLID đáng kể, N+1 rõ, error handling thiếu ở luồng chính, lệch chuẩn/token design rõ, dùng sai/không nhất quán component, WCAG contrast fail, 1 nhánh chức năng sai.
- **Minor** — nice-to-have: refactor nhỏ, naming, lệch pixel/cosmetic không chặn flow.

Thứ tự fix: **Blocker > Major > Minor.** Còn Blocker thì chưa được coi là xong.

---

# 8. Workflow khi nhận feature mới

1. **Confirm requirement với User** — hỏi hết ambiguity. Tạo/cập nhật **GitHub Issue** (mục 1).
2. **Chốt nguồn design** (sync Claude Design MCP → `design/`). Không được → báo User, không bịa.
3. **Mở app thật trên browser** (`:3004`), tương tác trực tiếp UI liên quan, chạy đủ user flow — không chỉ đọc code/screenshot.
4. Gap Design ↔ Requirement → quay lại thảo luận User. Ghi decision vào issue.
5. **Chốt shape data** trong `src/lib/types.ts` (không file contract riêng). Ticket → `In progress`.
6. Làm BE (`cms/**`, `src/lib/data/**`, `src/app/api/**`) và FE (`src/app/**`, `src/components/**`).
7. **Chuẩn bị môi trường verify:** servers lên (web + cms + seed) + đường browser (headless hoặc CDP `:9222`) sẵn sàng.
8. Review theo severity (mục 7) → fix Blocker > Major > Minor. Ticket → `In review`.
9. **Verify cuối OBSERVED-IN-BROWSER** (mục 5) → cập nhật ticket `Done` → báo cáo User.

## Rules chung
- **Không tự quyết business** khi User chưa xác nhận.
- **Luôn chốt design** trước khi phân tích/làm Feature; không được thì báo User, không bịa.
- **Luôn review app bằng browser thật** trước khi chốt spec và trước khi báo done.
- **Cân quy trình theo kích thước việc** — việc nhỏ rõ ràng (typo, tra cứu, trả lời về code, 1 page tĩnh) thì làm thẳng, đừng dựng quy trình feature đầy đủ. Full quy trình chỉ cho feature có business logic thật (pipeline nghiệp vụ, migration, revalidation, import…).
- **Không bắt đầu code khi Design còn điểm chưa chốt.**
