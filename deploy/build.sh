#!/bin/bash
# =============================================================================
# build.sh — Build AZ frontend + CMS locally (heavy work stays off the server).
#   Frontend → Next.js standalone (.next/standalone)
#   CMS      → Strapi admin + compiled dist (cms/dist)
# Usage: bash deploy/build.sh
# =============================================================================
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "=============================="
echo " Building AZ (local)"
echo "=============================="

echo "[1/2] Frontend (Next standalone)…"
DATA_SOURCE=strapi \
NEXT_PUBLIC_SITE_URL="http://167.86.107.70" \
  npm run build
[ -f .next/standalone/server.js ] || { echo "❌ standalone server.js missing"; exit 1; }

echo "[2/2] CMS (Strapi admin + dist)…"
( cd cms && NODE_ENV=production yarn build )
[ -d cms/dist/build ] || { echo "❌ cms/dist/build (admin) missing"; exit 1; }

echo "✅ Build complete. Next: bash deploy/deploy.sh"
