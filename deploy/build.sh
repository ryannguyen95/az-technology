#!/bin/bash
# =============================================================================
# build.sh <env>  — Build AZ frontend + CMS locally for one environment.
#   env: staging | prod   (default: staging)
#   Frontend → Next.js standalone (.next/standalone)
#   CMS      → Strapi admin + compiled dist (cms/dist)
#
# Reads NEXT_PUBLIC_SITE_URL from .env.<env> (baked into the client at build).
# The build prerenders SSG pages from live CMS content, so a Strapi must be
# reachable at STRAPI_URL (default http://localhost:1337) while building.
# Usage: bash deploy/build.sh staging   |   npm run deploy:staging
# =============================================================================
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV="${1:-staging}"
case "$ENV" in staging|prod) ;; *) echo "❌ env không hợp lệ: '$ENV' (dùng: staging | prod)"; exit 1 ;; esac

WEB_ENV="$ROOT_DIR/.env.$ENV"
[ -f "$WEB_ENV" ] || { echo "❌ thiếu $WEB_ENV — tạo env cho môi trường '$ENV' trước"; exit 1; }

# NEXT_PUBLIC_* được inline lúc BUILD → lấy site URL từ file env của môi trường.
SITE_URL="$(grep -E '^NEXT_PUBLIC_SITE_URL=' "$WEB_ENV" | head -1 | cut -d= -f2-)"
SITE_URL="${SITE_URL%\"}"; SITE_URL="${SITE_URL#\"}"       # bỏ nháy kép nếu có
SITE_URL="${SITE_URL%\'}"; SITE_URL="${SITE_URL#\'}"       # bỏ nháy đơn nếu có
SITE_URL="$(printf '%s' "$SITE_URL" | xargs)"              # trim khoảng trắng
[ -n "$SITE_URL" ] || { echo "❌ thiếu NEXT_PUBLIC_SITE_URL trong $WEB_ENV"; exit 1; }

# Build đọc content CMS thật để prerender SSG → cần Strapi trả lời tại STRAPI_URL.
STRAPI_BUILD_URL="${STRAPI_URL:-http://localhost:1337}"
if ! curl -sf -o /dev/null --max-time 4 "$STRAPI_BUILD_URL/_health"; then
  echo "❌ Strapi không phản hồi tại $STRAPI_BUILD_URL"
  echo "   Build cần CMS chạy để prerender trang. Bật Strapi local trước, ví dụ:"
  echo "     bash scripts/strapi-dev.sh        # SQLite dev (content trong cms/.tmp/data.db)"
  echo "     # hoặc: docker compose up -d cms db"
  echo "   (hoặc trỏ STRAPI_URL sang một Strapi đang chạy: STRAPI_URL=... bash deploy/build.sh $ENV)"
  exit 1
fi

echo "=============================="
echo " Building AZ ($ENV)"
echo " site  $SITE_URL"
echo " cms   $STRAPI_BUILD_URL (build-time data)"
echo "=============================="

echo "[1/2] Frontend (Next standalone)…"
DATA_SOURCE=strapi \
NEXT_PUBLIC_SITE_URL="$SITE_URL" \
STRAPI_URL="$STRAPI_BUILD_URL" \
  npm run build
[ -f .next/standalone/server.js ] || { echo "❌ standalone server.js missing"; exit 1; }

echo "[2/2] CMS (Strapi admin + dist)…"
( cd cms && NODE_ENV=production yarn build )
[ -d cms/dist/build ] || { echo "❌ cms/dist/build (admin) missing"; exit 1; }

echo "✅ Build ($ENV) complete. Next: bash deploy/deploy.sh $ENV"
