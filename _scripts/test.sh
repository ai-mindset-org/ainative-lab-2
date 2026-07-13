#!/usr/bin/env bash
# ainative-lab-2 static sanity checks.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PAGES=(
  "index.html"
  "playground.html"
  "knowledge-graph.html"
  "naming.html"
  "rules.html"
  "templates/personal-os-starter.html"
  "rules-public/agent-passport.html"
  "rules-public/guardrails-blast-radius.html"
  "rules-public/evidence-over-logs.html"
)

REQUIRED_STRINGS=(
  "context observatory"
  "context pack"
  "Compass"
  "knowledge graph"
  "OpenRouter"
  "agent passport"
  "naming convention"
)

ok=0
fail=0

echo "== pages =="
for page in "${PAGES[@]}"; do
  if [[ ! -f "$page" ]]; then
    echo "  MISS $page"
    fail=$((fail+1))
    continue
  fi

  if ! grep -qi "<!doctype html>" "$page"; then
    echo "  FAIL $page (missing doctype)"
    fail=$((fail+1))
    continue
  fi

  echo "  ok   $page"
  ok=$((ok+1))
done

echo
echo "== content markers =="
for marker in "${REQUIRED_STRINGS[@]}"; do
  if rg -q "$marker" index.html playground.html knowledge-graph.html README.md; then
    echo "  ok   $marker"
    ok=$((ok+1))
  else
    echo "  MISS $marker"
    fail=$((fail+1))
  fi
done

echo
echo "== javascript parse =="
for page in playground.html knowledge-graph.html; do
  node - "$page" <<'NODE'
const fs = require('fs');
const page = process.argv[2];
const html = fs.readFileSync(page, 'utf8');
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1].trim())
  .filter(Boolean);
for (const code of scripts) {
  try {
    new Function(code);
  } catch (err) {
    console.error(`${page}: ${err.message}`);
    process.exit(1);
  }
}
NODE
  echo "  ok   $page"
  ok=$((ok+1))
done

echo
echo "-- summary: $ok ok, $fail missing/invalid --"
if [[ "$fail" -gt 0 ]]; then
  exit 1
fi
