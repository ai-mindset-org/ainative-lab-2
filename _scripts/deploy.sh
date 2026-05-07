#!/usr/bin/env bash
# Manual Netlify deploy helper for ainative-lab-2.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== tests =="
bash _scripts/test.sh

echo
echo "== netlify deploy =="
if ! command -v netlify >/dev/null 2>&1; then
  echo "Netlify CLI is not installed or not on PATH."
  echo "Install/use it manually, then run: netlify deploy --prod --dir=."
  exit 1
fi

netlify deploy --prod --dir=.
