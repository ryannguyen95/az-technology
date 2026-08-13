#!/bin/bash
# =============================================================================
# deploy.sh <env>  — Push locally-built artifacts to a server, run them with
# PM2 (no Docker), fronted by nginx (reverse proxy, no TLS termination here —
# see setup-ssl.sh for certbot). env: staging | prod (default: staging).
#
# Reads server/SSH config từ deploy/.env.<env> (gitignored), gồm:
#   DEPLOY_SSH   (hoặc CONTABO_SSH)   user@host   — bắt buộc
#   DEPLOY_HOST  (hoặc CONTABO_HOST)  host/IP     — để in URL
#   DEPLOY_KEY   (hoặc CONTABO_KEY)   ssh key     — mặc định ~/.ssh/id_rsa
#   REMOTE_DIR                        thư mục app  — mặc định /root/az-app
#   DOMAIN / ADMIN_DOMAIN             domain web/admin — optional, nginx step
#                                      bị bỏ qua nếu thiếu (vd staging trống)
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
# Domains for the nginx reverse proxy (deploy/nginx.conf placeholders). Optional —
# when unset, the nginx step below is skipped (e.g. staging currently has no domain).
DOMAIN="${DOMAIN:-}"
ADMIN_DOMAIN="${ADMIN_DOMAIN:-}"

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
echo " Deploying AZ → $HOST_ADDR ($ENV, PM2 + nginx)"
echo " web  127.0.0.1:3000   (Next, behind nginx)"
echo " cms  127.0.0.1:1337   (Strapi, behind nginx)"
echo "=============================="

echo "[1/6] Remote dirs…"
$SSH "$HOST" "mkdir -p $REMOTE/web/.next/static $REMOTE/web/public $REMOTE/cms"

echo "[2/6] Frontend (standalone)…"
rsync -az --delete -e "$RSYNC_E" .next/standalone/ "$HOST:$REMOTE/web/"
rsync -az --delete -e "$RSYNC_E" .next/static/     "$HOST:$REMOTE/web/.next/static/"
[ -d public ] && rsync -az --delete -e "$RSYNC_E" public/ "$HOST:$REMOTE/web/public/"
$SCP "$WEB_ENV"        "$HOST:$REMOTE/web/.env"
$SCP deploy/run-web.sh "$HOST:$REMOTE/web/run-web.sh"

echo "[3/6] CMS (dist + source; node_modules & sqlite preserved on server)…"
rsync -az --delete -e "$RSYNC_E" \
  --exclude 'node_modules' --exclude '.tmp' --exclude '.cache' \
  --exclude '.git' --exclude '.env' \
  cms/ "$HOST:$REMOTE/cms/"
$SCP "$CMS_ENV" "$HOST:$REMOTE/cms/.env"

echo "[4/6] remote-start…"
$SCP deploy/remote-start.sh "$HOST:/tmp/az-remote-start.sh"

echo "[5/6] Bootstrap + start on server…"
$SSH "$HOST" "chmod +x /tmp/az-remote-start.sh && bash /tmp/az-remote-start.sh"

echo "[6/6] Nginx reverse proxy…"
if [ -z "$DOMAIN" ] || [ -z "$ADMIN_DOMAIN" ]; then
  echo "  ⚠️  thiếu DOMAIN/ADMIN_DOMAIN trong $SSH_ENV — bỏ qua cấu hình nginx"
  echo "     (web/cms vẫn chỉ nghe nội bộ 127.0.0.1 trên server, không truy cập"
  echo "     trực tiếp qua IP được cho tới khi có domain + nginx)"
else
  $SSH "$HOST" "command -v nginx >/dev/null 2>&1 || (apt-get update -y && apt-get install -y nginx)"

  TMP_NGINX_CONF="$(mktemp)"
  trap 'rm -f "$TMP_NGINX_CONF"' EXIT
  # ADMIN_DOMAIN_PLACEHOLDER must be substituted FIRST: it contains
  # DOMAIN_PLACEHOLDER as a substring, so the reverse order turns
  # "ADMIN_DOMAIN_PLACEHOLDER" into "ADMIN_<domain>" and the admin vhost
  # silently never matches (nginx answers 404 from the default server).
  sed -e "s/ADMIN_DOMAIN_PLACEHOLDER/$ADMIN_DOMAIN/g" -e "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" \
    deploy/nginx.conf > "$TMP_NGINX_CONF"

  # Certbot rewrites /etc/nginx/sites-available/az in place to add the :443
  # server blocks once setup-ssl.sh has run. Never overwrite that — redeploying
  # our plain-:80 template afterwards would silently drop HTTPS.
  IS_CERTBOT_MANAGED="$($SSH "$HOST" "grep -q 'managed by Certbot' /etc/nginx/sites-available/az 2>/dev/null && echo yes || echo no")"
  if [ "$IS_CERTBOT_MANAGED" == "yes" ]; then
    echo "  ℹ️  /etc/nginx/sites-available/az đã có SSL do Certbot quản lý — giữ nguyên, không ghi đè."
  else
    $SCP "$TMP_NGINX_CONF" "$HOST:/etc/nginx/sites-available/az"
    $SSH "$HOST" "ln -sf /etc/nginx/sites-available/az /etc/nginx/sites-enabled/az && rm -f /etc/nginx/sites-enabled/default"
  fi
  $SSH "$HOST" "nginx -t && systemctl reload nginx"
fi

echo ""
echo "=============================="
echo " ✅ Deploy ($ENV) complete"
if [ -n "$DOMAIN" ] && [ -n "$ADMIN_DOMAIN" ]; then
  echo " 🌐 web : http://$DOMAIN (https sau khi chạy setup-ssl.sh)"
  echo " 🛠  cms : http://$ADMIN_DOMAIN/admin (https sau khi chạy setup-ssl.sh)"
else
  echo " 🌐 web : chưa có domain — cấu hình DOMAIN/ADMIN_DOMAIN trong $SSH_ENV rồi deploy lại"
fi
echo "=============================="
