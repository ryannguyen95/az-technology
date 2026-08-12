# AZ Technology — deploy (staging / prod, PM2 + nginx)

Build **locally**, rsync artifacts to the server, run with **PM2** (no
Docker), fronted by **nginx** (reverse proxy + TLS via certbot). Mỗi môi
trường (`staging` | `prod`) có bộ env riêng; script nhận `<env>` làm tham số.

> Docker (`docker-compose.yml` + `Dockerfile.dev`) chỉ dùng cho **local dev** —
> không dùng cho deploy này.

## Kiến trúc

```
Internet ──443/80──▶ nginx ──▶ 127.0.0.1:3000  Next.js standalone (PM2 az-web)
                       │
                       └────▶ 127.0.0.1:1337  Strapi              (PM2 az-cms)
```

- `az-technology.vn` và `www.az-technology.vn` → nginx → Next (`:3000`).
- `admin.az-technology.vn` → nginx → Strapi (`:1337`).
- Next và Strapi **không** còn expose trực tiếp ra ngoài trên cổng chuẩn:
  Next bind `127.0.0.1` (xem `run-web.sh`); Strapi vẫn `HOST=0.0.0.0` — xem
  giải thích ở mục "Vì sao Strapi vẫn HOST=0.0.0.0" bên dưới. nginx là thứ
  duy nhất nên public trên `80`/`443`.
- Một cert Let's Encrypt duy nhất bao cả 3 tên (apex + `www` + `admin`), cấp
  qua `certbot --nginx`.

## Lệnh deploy

```bash
npm run deploy:staging          # = bash deploy/build.sh staging && bash deploy/deploy.sh staging
npm run deploy:prod             # = bash deploy/build.sh prod    && bash deploy/deploy.sh prod

# hoặc tách bước:
bash deploy/build.sh  <env>     # build local: Next standalone + Strapi admin/dist
bash deploy/deploy.sh <env>     # rsync → server, bootstrap runtime, pm2 start cả hai, cấu hình nginx
bash deploy/setup-ssl.sh <env>  # (lần đầu / khi có domain mới) certbot cấp SSL cho 3 tên
```

⚠️ **`build.sh` cần một Strapi đang chạy** (đọc content CMS để prerender SSG).
Bật local trước khi build: `bash scripts/strapi-dev.sh` (SQLite) hoặc
`docker compose up -d cms db`. `build.sh` sẽ báo lỗi rõ nếu `STRAPI_URL`
(mặc định `http://localhost:1337`) không phản hồi.

`remote-start.sh` tự cài Node 20 + pnpm + pm2 trên server lần đầu.
`deploy.sh` tự cài + cấu hình nginx (idempotent — chạy lại nhiều lần không
hỏng, và **không bao giờ ghi đè** cấu hình mà certbot đã chèn sẵn SSL vào).

## Thứ tự bắt buộc khi lên domain lần đầu

1. **Tạo DNS trước** — 3 bản ghi A trỏ về IP server (xem bảng ở dưới).
2. **`bash deploy/build.sh prod && bash deploy/deploy.sh prod`** — build,
   rsync, khởi động PM2, cài + cấu hình nginx (HTTP-only, cổng 80). Sau bước
   này site đã chạy được qua `http://<domain>` (chưa có HTTPS).
3. Chờ DNS propagate (`dig <domain>` phải trả đúng IP — script bước 4 tự
   kiểm giúp).
4. **`bash deploy/setup-ssl.sh prod`** — kiểm DNS, cài certbot, cấp 1 cert
   SAN cho cả 3 tên, bật redirect HTTP→HTTPS, bật `certbot.timer` (auto
   renew). Chỉ chạy bước này sau khi bước 2 đã chạy xong ít nhất 1 lần
   (certbot cần nginx vhost tồn tại sẵn để chèn block `:443` vào).
5. Deploy lại sau đó (`deploy.sh` chạy lần 2 trở đi) sẽ **giữ nguyên** phần
   SSL certbot đã chèn — chỉ bỏ qua bước ghi file nginx nếu phát hiện dấu
   hiệu `managed by Certbot`.

## Env theo môi trường (tất cả GITIGNORED)

| Mục đích | staging | prod |
|---|---|---|
| SSH/host/domain server (source bởi `deploy.sh` + `setup-ssl.sh`) | `deploy/.env.staging` | `deploy/.env.prod` |
| Web runtime (→ `web/.env` trên server) | `.env.staging` | `.env.prod` |
| CMS runtime (→ `cms/.env` trên server) | `cms/.env.staging` | `cms/.env.prod` |

`deploy/.env.<env>` khai báo (chấp nhận cả `DEPLOY_*` lẫn `CONTABO_*`):
`DEPLOY_SSH` (`user@host`, bắt buộc) · `DEPLOY_HOST` (host/IP, để in URL và
đối chiếu `dig`) · `DEPLOY_KEY` (ssh key, mặc định `~/.ssh/id_rsa`) ·
`REMOTE_DIR` (mặc định `/root/az-app`) · `DOMAIN` / `ADMIN_DOMAIN` (domain
web/admin — thiếu thì `deploy.sh` bỏ qua bước nginx, `setup-ssl.sh` báo lỗi
và dừng) · `LETSENCRYPT_EMAIL` (bắt buộc cho `setup-ssl.sh`).
`NEXT_PUBLIC_SITE_URL` trong `.env.<env>` được **build.sh bake vào client lúc build**.

## Server hiện có — PROD (Contabo)

| | |
|---|---|
| Host | `root@167.86.107.70` (Ubuntu 24.04, 4 vCPU, 7.8GB RAM) |
| Web | Next.js standalone, PM2 `az-web`, `127.0.0.1:3000` → nginx → `https://az-technology.vn` |
| CMS | Strapi, PM2 `az-cms`, `:1337` → nginx → `https://admin.az-technology.vn` |
| DB | **SQLite** (`cms/.tmp/data.db`, giữ lại trên server) — no Postgres |
| Media | **Cloudflare R2** |

> Đây **là cùng một server** trước đây chạy staging — Ryan quyết định server
> này trở thành prod thẳng, không dựng server prod riêng. Staging hiện **bỏ
> trống** (`deploy/.env.staging`, `.env.staging`, `cms/.env.staging` là
> template rỗng, điền lại khi có server staging thật).

### Bản ghi DNS cần tạo (trỏ về `167.86.107.70`)

| Loại | Name | Value |
|---|---|---|
| A | `az-technology.vn` (apex) | `167.86.107.70` |
| A | `www.az-technology.vn` | `167.86.107.70` |
| A | `admin.az-technology.vn` | `167.86.107.70` |

### Vì sao Strapi vẫn `HOST=0.0.0.0`

Next (`run-web.sh`) đã đổi sang bind `127.0.0.1` vì nó chắc chắn đứng sau
nginx (cổng 80 giờ do nginx giữ). Strapi thì **cố ý giữ nguyên**
`HOST=0.0.0.0`: đổi sang loopback sẽ chặn hẳn truy cập trực tiếp qua
`http://167.86.107.70:1337` — hữu ích khi debug hoặc khi DNS/SSL cho
`admin.az-technology.vn` chưa xong — và vì `ufw` trên server hiện **inactive**
nên việc "chặn" này chỉ có tác dụng thật khi bật `ufw` kèm rule đóng `1337`
ra ngoài. Không có ufw, đổi `HOST` không tăng thêm bảo mật thực sự, chỉ đổi
hành vi mà chưa kiểm chứng được. Khuyến nghị: **bật `ufw` (allow 80,443,22;
deny 1337,3000 from ngoài)** như một bước riêng, làm chủ động (không nằm
trong các script này) — sau đó có thể cân nhắc siết `HOST=127.0.0.1` cho
Strapi luôn.

## Lệnh trên server

```bash
ssh -i <key> <user>@<host>       # key/host theo deploy/.env.<env>
pm2 logs az-web                  # frontend logs
pm2 logs az-cms                  # strapi logs
pm2 restart az-cms
pm2 list
nginx -t && systemctl reload nginx
certbot certificates             # xem cert + ngày hết hạn
systemctl status certbot.timer   # auto-renew (Ubuntu: certbot.timer, KHÔNG phải certbot-renew.timer)
```

## Notes

- Reseed CMS: đặt `SEED=force` trong `cms/.env.<env>`, redeploy.
- First CMS boot seeds catalog + nhãn admin tiếng Việt (SQLite).
- `ufw status` hiện **inactive** trên server — cân nhắc bật kèm rule mở
  `80,443,22` (xem mục Strapi `HOST` ở trên) như một việc làm riêng, có ý
  thức, không tự động qua script deploy.
- Secret (`.env.*`, `cms/.env.*`, `deploy/.env.*`, `*.pem`, `*.pem.pub`) đều gitignored.

## Content-edit revalidation webhook (manual per-environment setup)

Category/product/parent-category order is now reordered via native Strapi
relations (drag-and-drop on the Relations field in the admin), not a custom
plugin. Every other content edit (create/update/delete/publish) still needs
to reach the frontend's `/api/revalidate` to show up before the page's
`revalidate = 3600` ISR window expires — and that wiring is **entirely
manual, configured once per environment through the Strapi admin UI**, not
through env vars:

1. In the CMS admin, go to **Settings → Webhooks → Create new webhook**.
2. URL: `<web base URL>/api/revalidate` (e.g.
   `https://az-technology.vn/api/revalidate` for prod).
3. Headers: `x-revalidate-secret` = the same value as the web app's
   `REVALIDATE_SECRET` (root `.env.<env>`).
4. Events: select the content types to watch (Entry create/update/delete/
   publish/unpublish) for parent-category, category, product, brand, banner,
   site-setting, home-page.
5. Save, then trigger a test event (e.g. edit and save any entry) and confirm
   the webhook shows a `200` in its delivery log.

`WEB_URL` / `REVALIDATE_SECRET` still exist as **CMS-side** env vars
(`cms/.env.<env>`), but they're used for a narrower purpose now: the
relation-order backfill that runs on every Strapi boot (`cms/src/index.ts`)
calls `/api/revalidate` once, right after it fills in any NULL
category/product relation-order link, so the corrected order shows up
immediately instead of waiting on ISR. If either var is missing, the backfill
still runs (the DB is the source of truth either way) — only that one
revalidate call is skipped, logged as a warning. Set them the same way as any
other CMS runtime secret: in the gitignored `cms/.env.<env>` file (see the
`## Env theo môi trường` section above), matching the same
`REVALIDATE_SECRET` value used for the webhook in step 3.
