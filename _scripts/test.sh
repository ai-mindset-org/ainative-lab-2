#!/usr/bin/env bash
# ---------------------------------------------------------------
# AI-Native Lab — site structure verification
# Usage: ./test.sh
# Exit 0 if all expected pages + data files are present and valid.
# ---------------------------------------------------------------
set -u
cd "$(dirname "$0")"

PAGES=(
  "index.html"
  "graph/index.html"
  "weeks/index.html"
  "weeks/w1.html"
  "weeks/w2.html"
  "weeks/w3.html"
  "sessions/index.html"
  "speakers-page/index.html"
  "participants/index.html"
  "stories/index.html"
  "results/index.html"
)

DATA=(
  "lms-data.json"
  "data/sessions.json"
  "data/speakers.json"
  "data/stories.json"
  "data/participants.json"
)

SHARED=(
  "shared/site.css"
  "shared/nav.html"
)

missing=0
ok=0

echo "== pages =="
for p in "${PAGES[@]}"; do
  if [[ -f "$p" ]]; then
    if grep -qi "<!DOCTYPE html>" "$p"; then
      echo "  ok   $p"
      ok=$((ok+1))
    else
      echo "  FAIL $p (no <!DOCTYPE html>)"
      missing=$((missing+1))
    fi
  else
    echo "  MISS $p"
    missing=$((missing+1))
  fi
done

echo
echo "== data =="
for d in "${DATA[@]}"; do
  if [[ -f "$d" ]]; then
    if python3 -c "import json,sys; json.load(open('$d'))" 2>/dev/null; then
      echo "  ok   $d"
      ok=$((ok+1))
    else
      echo "  FAIL $d (invalid JSON)"
      missing=$((missing+1))
    fi
  else
    echo "  MISS $d"
    missing=$((missing+1))
  fi
done

echo
echo "== shared =="
for s in "${SHARED[@]}"; do
  if [[ -f "$s" ]]; then
    echo "  ok   $s"
    ok=$((ok+1))
  else
    echo "  MISS $s"
    missing=$((missing+1))
  fi
done

echo
echo "-- summary: $ok ok, $missing missing/invalid --"
if [[ $missing -gt 0 ]]; then
  exit 1
fi
exit 0
