#!/bin/bash
# =============================================================================
# deploy.sh <env>  — Push locally-built artifacts to a server and run them with
# PM2 (no Docker, no nginx). env: staging | prod (default: staging).
#
# Reads server/SSH config từ deploy/.env.<env> (gitignored), gồm:
#   DEPLOY_SSH   (hoặc CONTABO_SSH)   user@host   — bắt buộc
#   DEPLOY_HOST  (hoặc CONTABO_HOST)  host/IP     — để in URL
#   DEPLOY_KEY   (hoặc CONTABO_KEY)   ssh key     — mặc định ~/.ssh/id_rsa
#   REMOTE_DIR                        thư mục app  — mặc định /root/az-app
# Env runtime copy lên server: .env.<env> → web/.env ; cms/.env.<env> → cms/.env
# Usage: bash deploy/deploy.sh staging   |   npm run deploy:staging
# =============================================================================
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV="${1:-staging}"
case "$ENV" in staging|prod) ;; *) echo "❌ env không hợp lệ: '$ENV' (dùng: staging | prod)"; exit 1 ;; esac

SSH_ENV="$ROOT_DIR/deploy/.env.$ENV"
[ -f "$SSH_ENV" ] || { echo "❌ thiếu $SSH_ENV — config SSH server cho môi trường '$ENV'"; exit 1; }
# shellcheck disable=SC1090
source "$SSH_ENV"

HOST="${DEPLOY_SSH:-$CONTABO_SSH}"
HOST_ADDR="${DEPLOY_HOST:-${CONTABO_HOST:-$HOST}}"
KEY="${DEPLOY_KEY:-${CONTABO_KEY:-$HOME/.ssh/id_rsa}}"
REMOTE="${REMOTE_DIR:-/root/az-app}"
WEB_ENV="$ROOT_DIR/.env.$ENV"
CMS_ENV="$ROOT_DIR/cms/.env.$ENV"

SSH="ssh -i $KEY -o StrictHostKeyChecking=accept-new"
SCP="scp -i $KEY -o StrictHostKeyChecking=accept-new"
RSYNC_E="ssh -i $KEY -o StrictHostKeyChecking=accept-new"

[ -n "$HOST" ]                    || { echo "❌ thiếu DEPLOY_SSH/CONTABO_SSH trong $SSH_ENV"; exit 1; }
[ -f "$KEY" ]                     || { echo "❌ ssh key $KEY not found"; exit 1; }
[ -f .next/standalone/server.js ] || { echo "❌ chạy 'bash deploy/build.sh $ENV' trước (web)"; exit 1; }
[ -d cms/dist/build ]             || { echo "❌ chạy 'bash deploy/build.sh $ENV' trước (cms)"; exit 1; }
[ -f "$WEB_ENV" ]                 || { echo "❌ thiếu $WEB_ENV"; exit 1; }
[ -f "$CMS_ENV" ]                 || { echo "❌ thiếu $CMS_ENV"; exit 1; }

echo "=============================="
echo " Deploying AZ → $HOST_ADDR ($ENV, PM2)"
echo " web  http://$HOST_ADDR        (Next :80)"
echo " cms  http://$HOST_ADDR:1337   (Strapi)"
echo "=============================="

echo "[1/5] Remote dirs…"
$SSH "$HOST" "mkdir -p $REMOTE/web/.next/static $REMOTE/web/public $REMOTE/cms"

echo "[2/5] Frontend (standalone)…"
rsync -az --delete -e "$RSYNC_E" .next/standalone/ "$HOST:$REMOTE/web/"
rsync -az --delete -e "$RSYNC_E" .next/static/     "$HOST:$REMOTE/web/.next/static/"
[ -d public ] && rsync -az --delete -e "$RSYNC_E" public/ "$HOST:$REMOTE/web/public/"
$SCP "$WEB_ENV"        "$HOST:$REMOTE/web/.env"
$SCP deploy/run-web.sh "$HOST:$REMOTE/web/run-web.sh"

echo "[3/5] CMS (dist + source; node_modules & sqlite preserved on server)…"
rsync -az --delete -e "$RSYNC_E" \
  --exclude 'node_modules' --exclude '.tmp' --exclude '.cache' \
  --exclude '.git' --exclude '.env' \
  cms/ "$HOST:$REMOTE/cms/"
$SCP "$CMS_ENV" "$HOST:$REMOTE/cms/.env"

echo "[4/5] remote-start…"
$SCP deploy/remote-start.sh "$HOST:/tmp/az-remote-start.sh"

echo "[5/5] Bootstrap + start on server…"
$SSH "$HOST" "chmod +x /tmp/az-remote-start.sh && bash /tmp/az-remote-start.sh"

echo ""
echo "=============================="
echo " ✅ Deploy ($ENV) complete"
echo " 🌐 web : http://$HOST_ADDR"
echo " 🛠  cms : http://$HOST_ADDR:1337/admin"
echo "=============================="
