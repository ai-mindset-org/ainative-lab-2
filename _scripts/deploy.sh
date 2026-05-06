#!/usr/bin/env bash
# ---------------------------------------------------------------
# AI-Native Lab — deploy helper
# Runs tests, shows status, then commits and pushes to main.
# GitHub Pages auto-publishes on push to main.
# ---------------------------------------------------------------
set -e
cd "$(dirname "$0")"

echo "== running tests =="
if ! ./test.sh; then
  echo
  echo "Tests failed. Aborting deploy."
  exit 1
fi

echo
echo "== git status =="
git add -A
git status
echo "---"
echo "Review above. Press Enter to commit and push, Ctrl-C to abort."
read -r

git commit -m "deploy: rebuild sprint hub" || {
  echo "Nothing to commit. Aborting."
  exit 1
}
git push origin main

echo
echo "Pushed. GitHub Pages will update in ~1-2 min."
echo "Live: https://ai-mindset-org.github.io/ainative-lab/"
