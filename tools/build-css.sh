#!/usr/bin/env bash
# Rebuilds the Tailwind stylesheet that is inlined into index.html.
# Run this after adding or changing utility classes in the app, then commit index.html.
set -euo pipefail
cd "$(dirname "$0")"
npm install --no-audit --no-fund >/dev/null
npx tailwindcss -c tailwind.config.js -i input.css -o build.css --minify
node inline-css.js
echo "index.html stylesheet rebuilt"
