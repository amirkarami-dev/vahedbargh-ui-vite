#!/usr/bin/env bash
#
# Build the production bundle and assemble the deploy folder.
# Output: ./deploy  (upload this whole folder to the server)
#
#   deploy/
#     build/               <- vite production output (from .env.production)
#     docker-compose.yml
#     nginx.conf
#
# On the server, inside the uploaded deploy folder:
#   docker compose up -d
#
set -euo pipefail

cd "$(dirname "$0")"

OUT="deploy"

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Building (mode=production, uses .env.production)"
pnpm run build

echo "==> Assembling ./$OUT"
rm -rf "$OUT"
mkdir -p "$OUT"

# vite outputs to dist/ ; docker-compose mounts ./build
cp -r dist "$OUT/build"
cp docker-compose.yml "$OUT/docker-compose.yml"
cp nginx.conf "$OUT/nginx.conf"

echo ""
echo "Done. Upload the ./$OUT folder to the server, then run:"
echo "  docker compose up -d"
