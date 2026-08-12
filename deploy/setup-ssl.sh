#!/bin/bash
# =============================================================================
# setup-ssl.sh — Install Certbot and obtain a single SSL cert covering the
# apex, www and admin subdomains (one cert, 3 SANs).
# Run this AFTER deploy.sh (nginx must already be serving the HTTP vhosts)
# AND after DNS for all three names points at the server.
# Usage (locally): bash deploy/setup-ssl.sh [prod|staging]
# =============================================================================
set -e

ENV=${1:-prod}

if [[ "$ENV" != "prod" && "$ENV" != "staging" ]]; then
  echo "❌ Environment must be 'prod' or 'staging'. Usage: bash deploy/setup-ssl.sh [prod|staging]"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SSH_ENV="$ROOT_DIR/deploy/.env.$ENV"
[ -f "$SSH_ENV" ] || { echo "❌ thiếu $SSH_ENV — config server cho môi trường '$ENV'"; exit 1; }
# shellcheck disable=SC1090
source "$SSH_ENV"

HOST="${DEPLOY_SSH:-$CONTABO_SSH}"
HOST_ADDR="${DEPLOY_HOST:-$CONTABO_HOST}"
KEY="${DEPLOY_KEY:-${CONTABO_KEY:-$HOME/.ssh/id_rsa}}"
DOMAIN="${DOMAIN:-}"
ADMIN_DOMAIN="${ADMIN_DOMAIN:-}"
WWW_DOMAIN="www.$DOMAIN"

[ -n "$HOST" ]               || { echo "❌ thiếu DEPLOY_SSH/CONTABO_SSH trong $SSH_ENV"; exit 1; }
[ -n "$HOST_ADDR" ]          || { echo "❌ thiếu DEPLOY_HOST/CONTABO_HOST trong $SSH_ENV (cần IP để đối chiếu DNS)"; exit 1; }
[ -n "$DOMAIN" ]             || { echo "❌ thiếu DOMAIN trong $SSH_ENV"; exit 1; }
[ -n "$ADMIN_DOMAIN" ]       || { echo "❌ thiếu ADMIN_DOMAIN trong $SSH_ENV"; exit 1; }
[ -n "$LETSENCRYPT_EMAIL" ]  || { echo "❌ thiếu LETSENCRYPT_EMAIL trong $SSH_ENV — Let's Encrypt cần email thật, không tự bịa"; exit 1; }
[ -f "$KEY" ]                || { echo "❌ ssh key $KEY not found"; exit 1; }

SSH="ssh -i $KEY -o StrictHostKeyChecking=accept-new"

echo "=============================="
echo " Checking DNS for $DOMAIN / $WWW_DOMAIN / $ADMIN_DOMAIN"
echo "=============================="

DNS_OK=1
for NAME in "$DOMAIN" "$WWW_DOMAIN" "$ADMIN_DOMAIN"; do
  RESOLVED_IP="$(dig +short "$NAME" | tail -1)"
  if [ "$RESOLVED_IP" == "$HOST_ADDR" ]; then
    echo "✅ $NAME → $RESOLVED_IP"
  else
    echo "⚠️  $NAME → '${RESOLVED_IP:-<no answer>}' (expected $HOST_ADDR)"
    DNS_OK=0
  fi
done

if [ "$DNS_OK" -ne 1 ]; then
  echo ""
  echo "DNS chưa trỏ đúng — tạo/sửa các bản ghi A sau rồi chạy lại script này:"
  echo "   A   $DOMAIN         →  $HOST_ADDR"
  echo "   A   $WWW_DOMAIN     →  $HOST_ADDR"
  echo "   A   $ADMIN_DOMAIN   →  $HOST_ADDR"
  echo ""
  echo "Không gọi certbot khi DNS chưa sẵn sàng — Let's Encrypt có rate limit theo"
  echo "domain, fail nhiều lần liên tiếp sẽ bị khoá tạm."
  exit 1
fi

echo ""
echo "=============================="
echo " Requesting certificate (SAN: $DOMAIN, $WWW_DOMAIN, $ADMIN_DOMAIN)"
echo "=============================="

$SSH "$HOST" bash << ENDSSH
set -e

echo "[1/3] Installing Certbot..."
apt-get update -y
apt-get install -y certbot python3-certbot-nginx

echo "[2/3] Obtaining SSL certificate..."
certbot --nginx \
  -d "$DOMAIN" -d "$WWW_DOMAIN" -d "$ADMIN_DOMAIN" \
  --non-interactive \
  --agree-tos \
  --email "$LETSENCRYPT_EMAIL" \
  --redirect

echo "[3/3] Enabling auto-renewal..."
# Ubuntu's certbot .deb package ships a "certbot.timer" systemd unit (NOT
# "certbot-renew.timer" — that name is the Amazon Linux/EPEL package layout).
systemctl enable --now certbot.timer

echo ""
echo "SSL certificate installed!"
certbot certificates

echo ""
echo "Nginx status:"
systemctl status nginx --no-pager | head -20
ENDSSH

echo ""
echo "=============================="
echo " SSL setup complete! ($ENV)"
echo " 🔒 https://$DOMAIN"
echo " 🔒 https://$WWW_DOMAIN"
echo " 🔒 https://$ADMIN_DOMAIN"
echo "=============================="
