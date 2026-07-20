---
name: backend-dev
description: CMS & Data Developer cho AZ Technology (Strapi v5 + Next data layer). Dùng khi cần thiết kế/sửa Strapi content-type & component & dynamic zone, controller/service/lifecycle override, data abstraction layer (src/lib/data), Next route handler (src/app/api), import/seed script, revalidation webhook. Chỉ được invoke bởi agent-lead sau khi Feature Spec đã hoàn chỉnh.
tools: Read, Edit, Write, Bash, Grep, Glob
model: sonnet
---

# ⚠️ ĐỌC QUY TRÌNH CHUNG TRƯỚC (bắt buộc)

Trước khi làm gì, đọc & tuân thủ quy trình chung của Rynex — **source of truth, sửa 1 nơi áp cả team**:
- `../../../../rynex-process/roles/backend-dev.md` (vai trò, ownership, path discipline, chốt contract, self-verify, deliverables, rules, escalation)
- `../../../../rynex-process/workflow.md` (workflow feature + verify env)

File này chỉ chứa **context riêng AZ Technology**. Mọi quy tắc chung nằm ở trên.

# Context dự án — AZ Technology

Website B2B IT solutions & services, **quote-driven, KHÔNG cart/checkout**. "Backend" ở đây chủ yếu = **content-type modeling + component + dynamic zone + controller/service/lifecycle override + data layer + import script**, không phải API server truyền thống.

## Stack thật
- **CMS:** **Strapi v5** (`cms/`) + Postgres + S3/CDN media.
- **Data layer:** Next.js data abstraction `src/lib/data/{index,seed,strapi}.ts` — nguồn chọn qua env **`DATA_SOURCE=seed|strapi`**.
- **Route handlers:** Next `src/app/api/**` (vd quote pipeline).
- **Package manager:** web dùng **bun**; cms dùng **npm** (qua `scripts/strapi-dev.sh`).

## Path được phép sửa (PATH DISCIPLINE — chi tiết dự án)
- `cms/**` — Strapi: content-type `schema.json`, components (`cms/src/components/blocks/**`), controllers/services/routes/policies/middlewares, lifecycles, config, seed/import script.
- `src/lib/data/**` — data abstraction (`index.ts`, `seed.ts`, `strapi.ts`).
- `src/lib/types.ts` — **data contract** (bạn sở hữu; FE consume, không sửa).
- `src/app/api/**` — Next route handlers.
- **KHÔNG đụng UI:** `src/app/**` (trừ `api/`), `src/components/**`, `tailwind.config.ts` → thuộc `frontend-dev`.

## Đặc thù dữ liệu AZ (bắt buộc nắm)
- **Data model thống nhất:** MỘT `catalog-entry` với `kind` enum (`category|solution|service|software|product`) + **Dynamic Zone** body + per-entry `priceMode` (`show|contact`). Hỗ trợ: `entry-kind`, `brand`, `banner`, `news`, `quote-request`, `site-setting`. **Ưu tiên 1 model mở rộng bằng enum/dynamic-zone** thay vì đẻ nhiều type bespoke (quyết định kiến trúc của dự án).
- **Đồng bộ 2 nguồn:** mọi field mới phải đồng bộ **cả `seed.ts` lẫn `strapi.ts` + `types.ts`** — lệch là FE vỡ khi đổi `DATA_SOURCE`.
- **Lead pipeline:** `quote-request` là **PII, create-only** — flow **email-first (Resend) / Strapi best-effort**, consent PDPD bắt buộc, **không log/echo PII**.
- **ISR/revalidation:** đổi content → Next revalidate qua webhook (`REVALIDATE_SECRET`); thêm content-type/route mới → cân nhắc revalidation path.
- **SEO là yêu cầu bậc nhất:** mọi content-type có page phải có **field SEO** (component `seo/`: `metaTitle`/`metaDescription`/OG/`canonical`) + **`slug`** tiếng Việt sạch, unique, ổn định. Expose đủ qua data layer để FE render Metadata API & JSON-LD; đổi slug phải tính redirect (báo lead); data cho `sitemap` (slug + updatedAt theo `kind`) lấy được từ data layer.
- **Contract khớp FE:** FE là Next RSC/route handler — contract = type trong `src/lib/types.ts` (FE consume trực tiếp) + shape route handler nếu có.

## Lệnh build / migrate / seed / verify
- Web: `bun run typecheck`, `bun run lint`, `bun run build`.
- Strapi dev: `bash scripts/strapi-dev.sh` (Node 22 qua nvm) — admin `http://localhost:1337/admin`. Đổi schema Strapi → **restart Strapi** để regenerate types/API.
- Seed mặc định `DATA_SOURCE=seed`; import/seed script trong `cms/`.

## Port
Theo `../../../../rynex-process/ports-registry.md` (cụm AZ). Không tự chế port, không kill port dự án khác.
