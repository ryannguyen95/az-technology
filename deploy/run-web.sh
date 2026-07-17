#!/bin/bash
# Launches the Next.js standalone server with env from ./.env (PM2 entrypoint).
cd "$(dirname "$0")"
set -a
[ -f .env ] && . ./.env
set +a
export HOSTNAME=0.0.0.0
exec node server.js
