# AZ Technology — Contabo staging deploy (PM2)

Build **locally**, rsync artifacts to the Contabo VPS, run with **PM2** (no Docker,
no nginx). Access by IP.

> Docker (`docker-compose.yml` + `Dockerfile.dev`) is kept for **local development
> only** — it is not used for this deploy.

## Server

| | |
|---|---|
| Host | `root@167.86.107.70` (Ubuntu 24.04, 4 vCPU, 7.8GB RAM, 145GB) |
| SSH key | `~/.ssh/id_rsa` (creds in `deploy/.env.contabo`, gitignored) |
| Web | Next.js standalone, PM2 `az-web`, port **80** → http://167.86.107.70 |
| CMS | Strapi, PM2 `az-cms`, port **1337** → http://167.86.107.70:1337/admin |
| DB | **SQLite** (`cms/.tmp/data.db`, persisted) — no Postgres process |
| Media | **Cloudflare R2** |

## Deploy

```bash
bash deploy/build.sh      # local: Next standalone + Strapi admin/dist
bash deploy/deploy.sh     # rsync → server, bootstrap runtime, pm2 start both
```

`remote-start.sh` auto-installs Node 20 + pnpm + pm2 on first run.

## Server commands

```bash
ssh -i ~/.ssh/id_rsa root@167.86.107.70
pm2 logs az-web        # frontend logs
pm2 logs az-cms        # strapi logs
pm2 restart az-cms
pm2 list
```

## Notes

- Reseed CMS: set `SEED=force` in `cms/.env.staging`, redeploy.
- First CMS boot seeds the catalog + Vietnamese admin labels (SQLite).
- If ports aren't reachable, check the Contabo firewall (VPS usually open by
  default): `ufw status` — allow 80 and 1337 if ufw is active.
- Secrets (`.env.staging`, `cms/.env.staging`, `deploy/.env.contabo`, `*.pem`)
  are gitignored.
