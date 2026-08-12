#!/bin/bash
# Launches the Next.js standalone server with env from ./.env (PM2 entrypoint).
cd "$(dirname "$0")"
set -a
[ -f .env ] && . ./.env
set +a
# nginx now sits in front (reverse proxy) and is the only thing that should be
# reachable from outside — bind Next to loopback only, not 0.0.0.0.
export HOSTNAME=127.0.0.1
exec node server.js
