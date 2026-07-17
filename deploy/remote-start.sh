#!/bin/bash
# =============================================================================
# remote-start.sh — runs ON the Contabo server (Ubuntu, root). Bootstraps the
# runtime (Node 20, pnpm, pm2) if missing, installs CMS deps, then (re)starts
# both PM2 processes. No Docker, no nginx. Invoked by deploy.sh.
# =============================================================================
set -e
APP=/root/az-app
WEB=$APP/web
CMS=$APP/cms

echo "[remote] $(uname -sm); RAM: $(free -h | awk 'NR==2{print $7" free"}')"

# --- Node 20 ---
if ! command -v node >/dev/null 2>&1; then
  echo "[remote] installing Node 20…"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
  apt-get install -y nodejs >/dev/null 2>&1
fi
echo "[remote] node $(node -v)"

# --- pnpm (via corepack) — pin to a Node-20-compatible version (pnpm 10/11 need Node 22+) ---
corepack enable >/dev/null 2>&1 || npm i -g pnpm@9.15.9 >/dev/null 2>&1
corepack prepare pnpm@9.15.9 --activate >/dev/null 2>&1 || true

# --- pm2 ---
if ! command -v pm2 >/dev/null 2>&1; then
  echo "[remote] installing pm2…"
  npm i -g pm2 >/dev/null 2>&1
fi

# --- CMS runtime deps (pnpm, prod, flat layout for Strapi) ---
echo "[remote] installing CMS deps (pnpm)…"
cd "$CMS"
export NODE_ENV=production
pnpm install --prod --shamefully-hoist --config.confirmModulesPurge=false

# --- start Strapi (:1337) ---
echo "[remote] (re)starting Strapi → az-cms :1337"
pm2 delete az-cms >/dev/null 2>&1 || true
NODE_ENV=production pm2 start pnpm --name az-cms --cwd "$CMS" -- start

# --- start Next (:80) ---
echo "[remote] (re)starting Next → az-web :80"
chmod +x "$WEB/run-web.sh"
pm2 delete az-web >/dev/null 2>&1 || true
pm2 start "$WEB/run-web.sh" --name az-web --cwd "$WEB"

# --- persist across reboots ---
pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true
pm2 save >/dev/null 2>&1 || true

echo "[remote] ✅ up:"
pm2 list | grep -E "az-cms|az-web" || true
