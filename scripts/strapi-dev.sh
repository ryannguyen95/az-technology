#!/usr/bin/env bash
# Launch Strapi with Node 20-24 (Strapi rejects Node 25+). Used by .claude/launch.json.
set -e

# Prefer nvm's Node 22; fall back to a pinned path, then whatever `node` is on PATH.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm use 22 >/dev/null 2>&1 || nvm use 20 >/dev/null 2>&1 || true
fi
[ -d "$HOME/.nvm/versions/node/v22.20.0/bin" ] && export PATH="$HOME/.nvm/versions/node/v22.20.0/bin:$PATH"

cd "$(dirname "$0")/../cms"
echo "Starting Strapi with node $(node -v) in $(pwd)"
exec npm run develop
