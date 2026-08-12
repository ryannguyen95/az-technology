# AZ Technology — deploy (staging / prod, PM2)

Build **locally**, rsync artifacts to the server, run with **PM2** (no Docker,
no nginx). Mỗi môi trường (`staging` | `prod`) có bộ env riêng; script nhận
`<env>` làm tham số.

> Docker (`docker-compose.yml` + `Dockerfile.dev`) chỉ dùng cho **local dev** —
> không dùng cho deploy này.

## Lệnh deploy

```bash
npm run deploy:staging          # = bash deploy/build.sh staging && bash deploy/deploy.sh staging
npm run deploy:prod             # = bash deploy/build.sh prod    && bash deploy/deploy.sh prod

# hoặc tách bước:
bash deploy/build.sh  <env>     # build local: Next standalone + Strapi admin/dist
bash deploy/deploy.sh <env>     # rsync → server, bootstrap runtime, pm2 start cả hai
```

⚠️ **`build.sh` cần một Strapi đang chạy** (đọc content CMS để prerender SSG).
Bật local trước khi build: `bash scripts/strapi-dev.sh` (SQLite) hoặc
`docker compose up -d cms db`. `build.sh` sẽ báo lỗi rõ nếu `STRAPI_URL`
(mặc định `http://localhost:1337`) không phản hồi.

`remote-start.sh` tự cài Node 20 + pnpm + pm2 trên server lần đầu.

## Env theo môi trường (tất cả GITIGNORED)

| Mục đích | staging | prod |
|---|---|---|
| SSH/host server (source bởi `deploy.sh`) | `deploy/.env.staging` | `deploy/.env.prod` |
| Web runtime (→ `web/.env` trên server) | `.env.staging` | `.env.prod` |
| CMS runtime (→ `cms/.env` trên server) | `cms/.env.staging` | `cms/.env.prod` |

`deploy/.env.<env>` khai báo (chấp nhận cả `DEPLOY_*` lẫn `CONTABO_*`):
`DEPLOY_SSH` (`user@host`, bắt buộc) · `DEPLOY_HOST` (host/IP để in URL) ·
`DEPLOY_KEY` (ssh key, mặc định `~/.ssh/id_rsa`) · `REMOTE_DIR` (mặc định `/root/az-app`).
`NEXT_PUBLIC_SITE_URL` trong `.env.<env>` được **build.sh bake vào client lúc build**.

## Server hiện có — staging (Contabo)

| | |
|---|---|
| Host | `root@167.86.107.70` (Ubuntu 24.04, 4 vCPU, 7.8GB RAM) |
| Web | Next.js standalone, PM2 `az-web`, port **80** → http://167.86.107.70 |
| CMS | Strapi, PM2 `az-cms`, port **1337** → http://167.86.107.70:1337/admin |
| DB | **SQLite** (`cms/.tmp/data.db`, giữ lại trên server) — no Postgres |
| Media | **Cloudflare R2** |

> **prod chưa có server** — `deploy/.env.prod`, `.env.prod`, `cms/.env.prod` đang là
> template (điền `DEPLOY_SSH`, domain, R2 khi có hạ tầng prod). Secret Strapi trong
> `cms/.env.prod` đã sinh sẵn (riêng cho prod).

## Lệnh trên server

```bash
ssh -i <key> <user>@<host>       # key/host theo deploy/.env.<env>
pm2 logs az-web                  # frontend logs
pm2 logs az-cms                  # strapi logs
pm2 restart az-cms
pm2 list
```

## Notes

- Reseed CMS: đặt `SEED=force` trong `cms/.env.<env>`, redeploy.
- First CMS boot seeds catalog + nhãn admin tiếng Việt (SQLite).
- Port không thông → kiểm firewall: `ufw status` — mở 80 và 1337 nếu ufw active.
- Secret (`.env.*`, `cms/.env.*`, `deploy/.env.*`, `*.pem`, `*.pem.pub`) đều gitignored.

## Sort-manager revalidation webhook (manual per-environment setup)

The sort-manager plugin (`cms/src/plugins/sort-manager/server/src/services/reorder.js`)
calls the frontend's `/api/revalidate` directly after every save, using two env
vars read on the CMS side: `WEB_URL` (base URL of the web app) and
`REVALIDATE_SECRET` (must match the same value configured on the web app —
see `src/app/api/revalidate/route.ts`). If either is missing, the call
silently no-ops and the admin falls back to "may take up to an hour to
update" for every save.

These two vars are **not tracked in git** — they live in the gitignored
`cms/.env.<env>` file that `deploy.sh` copies to the server as `cms/.env`, so
adding them to `cms/.env.example` does **not** propagate to an
already-deployed environment. Set them by hand whenever provisioning or
rotating secrets for `staging`/`prod`:

1. Open `cms/.env.<env>` (create from `cms/.env.example` if it doesn't exist yet).
2. Set `WEB_URL` to the environment's public web URL (e.g. `http://167.86.107.70`
   for staging, or the prod domain once it exists).
3. Set `REVALIDATE_SECRET` to the **same value** already configured in
   `.env.<env>` (root, web runtime) for that environment. Generate a fresh
   random value once per environment if one doesn't exist yet, then copy it
   into both files — they must match exactly.
4. Redeploy (`bash deploy/deploy.sh <env>`) or `pm2 restart az-cms` if the
   files were edited directly on the server.
5. Verify: save a reorder in `/admin/plugins/sort-manager` and confirm the
   success message says "Đã lưu và cập nhật lên website." rather than the
   "may take up to an hour" fallback.
