# AZ Technology

B2B IT-solutions website for AZ IT Solutions & Services. Two apps:

- **Frontend** (`/`) — Next.js (App Router) + TypeScript + Tailwind. Quote-driven, no cart.
- **CMS** (`/cms`) — Strapi v5 (headless), unified `CatalogEntry` model + Dynamic Zone.

## Requirements

- **Frontend:** Node 20+ (works on 25) or Bun. Uses `bun`/`npm`.
- **Strapi:** Node **20–24 only** (does NOT run on Node 25+). Use `nvm use 22`.

## Run the frontend

```bash
bun install
bun run dev          # http://localhost:3000
```

Data source is controlled by `DATA_SOURCE` (see `.env.example`):
- `seed` (default) — local taxonomy in `src/lib/data/seed.ts`, runs without Strapi.
- `strapi` — live CMS. Set `STRAPI_URL` (and `STRAPI_API_TOKEN` for prod). Create `.env.local`:
  ```
  DATA_SOURCE=strapi
  STRAPI_URL=http://localhost:1337
  ```

The data layer (`src/lib/data/index.ts`) is the only seam between the two sources;
components never see Strapi shapes (adapter in `src/lib/data/strapi.ts`).

## Run the CMS (Strapi)

```bash
cd cms
nvm use 22           # REQUIRED — Strapi rejects Node 25+
npm install
npm run develop      # http://localhost:1337/admin
```

On first boot the bootstrap (`cms/src/index.ts`):
- sets **public read** permissions (published content only),
- makes **QuoteRequest create-only** (not listable — it holds PII),
- **seeds** the real taxonomy from `cms/src/seed/data.ts` (idempotent, by slug).

Set `SEED=false` to skip seeding. First run prompts you to create an admin user.

## Content model (Strapi)

One **CatalogEntry** type with `kind` (category | solution | service | software |
product), composable `body` Dynamic Zone (rich-text, feature-list, spec-accordion,
process-steps, faq, cta), per-entry `priceMode` (show | contact), and a `brands`
relation. Plus Brand, Banner, News, QuoteRequest, and SiteSettings (single type).

## Lead pipeline

Quote modal → `POST /api/quote` → **email-first** (lead never lost), then Strapi
best-effort. Spam defense: honeypot + submit-timestamp. Set `RESEND_API_KEY` +
`LEAD_TO_EMAIL` for real email.

## Deploy (later)

Frontend → Vercel/Node host. Strapi + DB (Postgres in prod) → managed host or VPS.
See the design doc in `~/.gstack/projects/az-technology/` for the full plan.
