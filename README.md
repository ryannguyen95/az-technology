# AZ Technology

B2B IT-solutions website for AZ IT Solutions & Services. Two apps:

- **Frontend** (`/`) — Next.js (App Router) + TypeScript + Tailwind. Quote-driven, no cart.
- **CMS** (`/cms`) — Strapi v5 (headless), unified `CatalogEntry` model + Dynamic Zone.

## Requirements

- **Frontend:** Node 20+ (works on 25) or Bun. Uses `bun`/`npm`.
- **Strapi:** Node **20–24 only** (does NOT run on Node 25+). Use `nvm use 22`.

## Run everything with Docker (recommended)

Starts the whole stack — Postgres, Strapi CMS, and the Next.js frontend — with one command. Only Docker Desktop is required (no Node/Bun/yarn on the host).

```bash
docker compose up --build      # first run (builds images, then starts)
docker compose up              # subsequent runs
```

Services:

| URL | What |
| --- | --- |
| http://localhost:3000 | Frontend |
| http://localhost:1337/admin | Strapi admin (first run prompts you to create an admin user) |
| localhost:5432 | Postgres (`strapi`/`strapi`/`strapi`) |

Boot order is handled automatically: Postgres starts first, Strapi waits until the
DB is healthy, then the frontend starts. **Hot reload** is on — edits to frontend or
CMS source reload live.

Common commands:

```bash
docker compose up -d              # start in the background
docker compose logs -f web        # follow frontend logs (or: cms, db)
docker compose down               # stop (data persists in volumes)
docker compose down -v            # stop AND wipe the database + uploads
docker compose up --build         # rebuild after changing dependencies
```

By default the frontend serves local seed data (`DATA_SOURCE=seed`). To render live
Strapi content instead, see the integration note at the bottom of `docker-compose.yml`.

---

The sections below run each app directly on your host instead (without Docker).

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
yarn install
yarn develop         # http://localhost:1337/admin
```

On first boot the bootstrap (`cms/src/index.ts`):
- sets **public read** permissions (published content only),
- makes **QuoteRequest create-only** (not listable — it holds PII),
- **seeds** the real taxonomy from `cms/src/seed/data.ts` (idempotent, by slug).

Set `SEED=false` to skip seeding. First run prompts you to create an admin user.

## Local dev accounts (test credentials)

> ⚠️ **LOCAL DEV ONLY** — SQLite (`cms/.tmp/data.db`). Do NOT reuse these in staging/prod.
> Documented here so we stop forgetting. Update this table whenever an account changes.

| System | URL | Email | Password |
| --- | --- | --- | --- |
| Strapi admin | http://localhost:1337/admin | `devphuc@gmail.com` | `AzTech@2026` |

Reset the Strapi admin password (needs Node 22 — native `better-sqlite3` is built for it):

```bash
cd cms
nvm use 22
node_modules/.bin/strapi admin:reset-user-password --email "devphuc@gmail.com" --password "<new-password>"
```

Then update the table above.


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
