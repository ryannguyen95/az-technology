#!/bin/bash
# =============================================================================
# deploy.sh — Push locally-built artifacts to the Contabo server and run them
# with PM2 (no Docker, no nginx). Web serves on :80, Strapi on :1337, by IP.
# Usage: bash deploy/deploy.sh
# =============================================================================
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# shellcheck disable=SC1091
source "$ROOT_DIR/deploy/.env.contabo"
KEY="${CONTABO_KEY:-$HOME/.ssh/id_rsa}"
HOST="$CONTABO_SSH"
REMOTE="/root/az-app"

SSH="ssh -i $KEY -o StrictHostKeyChecking=accept-new"
SCP="scp -i $KEY -o StrictHostKeyChecking=accept-new"
RSYNC_E="ssh -i $KEY -o StrictHostKeyChecking=accept-new"

[ -f "$KEY" ]                     || { echo "❌ ssh key $KEY not found"; exit 1; }
[ -f .next/standalone/server.js ] || { echo "❌ run deploy/build.sh first (web)"; exit 1; }
[ -d cms/dist/build ]             || { echo "❌ run deploy/build.sh first (cms)"; exit 1; }
[ -f .env.staging ]              || { echo "❌ .env.staging missing"; exit 1; }
[ -f cms/.env.staging ]          || { echo "❌ cms/.env.staging missing"; exit 1; }

echo "=============================="
echo " Deploying AZ → $CONTABO_HOST (PM2)"
echo " web  http://$CONTABO_HOST        (Next :80)"
echo " cms  http://$CONTABO_HOST:1337   (Strapi)"
echo "=============================="

echo "[1/5] Remote dirs…"
$SSH "$HOST" "mkdir -p $REMOTE/web/.next/static $REMOTE/web/public $REMOTE/cms"

echo "[2/5] Frontend (standalone)…"
rsync -az --delete -e "$RSYNC_E" .next/standalone/ "$HOST:$REMOTE/web/"
rsync -az --delete -e "$RSYNC_E" .next/static/     "$HOST:$REMOTE/web/.next/static/"
[ -d public ] && rsync -az --delete -e "$RSYNC_E" public/ "$HOST:$REMOTE/web/public/"
$SCP .env.staging      "$HOST:$REMOTE/web/.env"
$SCP deploy/run-web.sh "$HOST:$REMOTE/web/run-web.sh"

echo "[3/5] CMS (dist + source; node_modules & sqlite preserved on server)…"
rsync -az --delete -e "$RSYNC_E" \
  --exclude 'node_modules' --exclude '.tmp' --exclude '.cache' \
  --exclude '.git' --exclude '.env' \
  cms/ "$HOST:$REMOTE/cms/"
$SCP cms/.env.staging "$HOST:$REMOTE/cms/.env"

echo "[4/5] remote-start…"
$SCP deploy/remote-start.sh "$HOST:/tmp/az-remote-start.sh"

echo "[5/5] Bootstrap + start on server…"
$SSH "$HOST" "chmod +x /tmp/az-remote-start.sh && bash /tmp/az-remote-start.sh"

echo ""
echo "=============================="
echo " ✅ Deploy complete"
echo " 🌐 web : http://$CONTABO_HOST"
echo " 🛠  cms : http://$CONTABO_HOST:1337/admin"
echo "=============================="
