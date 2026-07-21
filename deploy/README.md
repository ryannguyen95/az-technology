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
