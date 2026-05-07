---
name: ctrl-dashboard-build
description: Use when any user wants to build their own CTRL personal dashboard from scratch — stripped of Alex-specific data, configurable with their own vault path, Linear key, calendar, Telegram session, and buddy companion. Triggers on "build ctrl", "ctrl dashboard for me", "my own ctrl", "personal dashboard", "dashboard from scratch", "personal OS dashboard", "vox dashboard", "buddy dashboard", "сделай мне ctrl", "свой dashboard". Generic version (NOT AIN02-specific) for personal use or community distribution.
---

# CTRL Dashboard Builder

Generic, community-distributable version of [pos-playground CTRL dashboard](file:///Users/alex/Documents/_code/_dashboards/pos-playground/) — stripped of all Alex-specific hardcoded data, configurable via env, includes dual VOX/SHEP persona, session-router, and buddy companion block.

**Differs from [AIM-ain-dashboard](file:///Users/alex/Library/CloudStorage/Dropbox/notes/AI%20mindset%20%7Bshared%7D/ai-mindset-2026/aim-rules/skills/AIM-ain-dashboard/SKILL.md):** no AIN02 cohort blocks (Sprint Progress, Cohort Chat, Mentor Pings) and no batch-mode for distributing to many participants. This is for **one person at a time** to build their own.

**Differs from [pos-dashboard-gen](file:///Users/alex/.claude/skills/pos-dashboard-gen/SKILL.md):** that one is a snapshot of POS context. This one is a **full live dashboard** with FastAPI server option, Linear/Calendar integration, dual assistants, terminal-aesthetic UX.

---

## STEP 0 — Choose delivery mode

```
Delivery mode?
  [A] static HTML — drag into Chrome, no install (default, recommended)
  [B] FastAPI + index.html — `python server.py` for live calendar/Linear/vault
  [C] Netlify-hosted — public subdomain ctrl-<slug>.netlify.app
```

Default = **A**. Most users don't want to manage a Python process.

---

## STEP 1 — Interview (8 questions, conversational)

Ask one at a time. Skip on any.

```
Q1  Display name? (e.g. "Ivan P." — shown in header)
Q2  Folder slug? (e.g. ivan-petrov — used for output folder + Netlify subdomain; defaults to lowercased git config user.name)
Q3  Obsidian vault path? (absolute / skip — Skills + Documents blocks degraded if skipped)
Q4  Linear API key? (paste / skip — Tasks block becomes localStorage kanban)
Q5  Google Calendar? (oauth flow / skip)
Q6  Telegram? (paste your own Telethon session path / skip — never share Alex's)
Q7  GitHub repo URL? (for "My Artifact" block / skip)
Q8  Buddy? (paste /buddy ASCII / generate now / skip — defaults to Pebble snail)
```

Save answers to `config.json` for incremental re-runs.

---

## STEP 2 — Strip & Generate (5 parallel sub-agents)

Same lane map as AIM-ain-dashboard, with rules adapted for generic use:

```
Lane A: html-stripper      Lane B: server-slimmer
Lane C: readme-writer      Lane D: env-scaffolder
Lane E: buddy-injector
```

### Lane A — strip targets

Remove from [index.html](file:///Users/alex/Documents/_code/_dashboards/pos-playground/index.html) and friends:

| Source ref | Replace with |
|------------|--------------|
| `VAULT_NOTES = "/Users/alex/..."` | `os.getenv("CTRL_VAULT_PATH", "")` |
| `TG_API_ID = 611335` + `TG_API_HASH` | env vars, never in source |
| `TG_SESSION_PATH = "~/.config/telegram-mcp/ctrl-dashboard"` | env |
| `TG_MONITOR_CHATS` (full AIM team list, 21 chats) | empty `[]` with comment |
| `TG_CHAT_GROUPS` AIN02 groupings | scaffold `{"work": [], "personal": []}` |
| `EXA_API_KEY_FALLBACK` | removed, user provides via env |
| `LINEAR_CACHE` hardcoded path | `os.getenv("CTRL_LINEAR_CACHE", "~/.ctrl/linear-cache.json")` |
| `TIMELINE_DIR`, `POS_PLAYGROUND_DIR` | env-parametrized |
| Any `aimindset` Linear workspace ref | empty / user-configurable |

Remove blocks specific to AI Mindset:
- Sprint Progress block (AIN02-only)
- Cohort Chat block
- Mentor Pings block
- `/AIM-*` command buttons in header

### Lane A — keep (generic core)

- Full CSS design system: JetBrains Mono, `--accent: #55aa88`, dark/light toggle
- VOX face + SHEP dog avatar (pixel-art SVG, both personas — generic)
- Dual VOX/SHEP tab switcher
- Session-router terminal chip + cycle (reads `~/.config/session-router/config.json`)
- Focus / Calendar / Tasks / Skills / Sessions blocks
- Buddy block (Lane E injects)

### Lane B — server-slimmer

```python
# Required env vars in slim server
VAULT_PATH = os.getenv("CTRL_VAULT_PATH", "")
LINEAR_KEY = os.getenv("CTRL_LINEAR_KEY", "")
TG_API_ID = os.getenv("CTRL_TG_API_ID", "")
TG_API_HASH = os.getenv("CTRL_TG_API_HASH", "")
TG_SESSION_PATH = os.getenv("CTRL_TG_SESSION", "")
OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY", "")
```

### Lane C — README writer

Sections: what is this · quickstart (drag into Chrome) · optional server mode · setting up own Telegram · integrating Linear · update later · buddy customization

### Lane D — env-scaffolder

- `.env.example` — all keys documented, zero real values
- `config.json` — `{"slug","name","buddy":null,"version":"ctrl-2026-05-07"}`
- `config.js` — browser-loadable config

### Lane E — buddy-injector

Same as AIM-ain-dashboard Agent E, but speech rotation rules generic (no AIN02 cohort references). Default = Pebble snail.

---

## STEP 3 — Validate output

```bash
# Ensure no Alex-private leaks
grep -rn "alex\|/Users/alex\|TG_API_HASH\|611335\|aimindset\|AIN02\|ain02\|d524b414d21f4d37" \
  ~/Documents/ctrl-dashboard/<slug>/ | grep -v ".env.example" | grep -v "README.md"

# Visual smoke via Playwright
playwright open ~/Documents/ctrl-dashboard/<slug>/index.html
# screenshot → verify VOX panel + Buddy block render + dual tabs visible
```

Any hits → flag user, abort write.

---

## STEP 4 — Optional Netlify deploy

```bash
cd ~/Documents/ctrl-dashboard/<slug>
netlify deploy --prod --dir . --site-name ctrl-<slug>
# → https://ctrl-<slug>.netlify.app
```

---

## STEP 5 — Deliver

```
~/Documents/ctrl-dashboard/<slug>/

  ctrl dashboard generated

  path:   ~/Documents/ctrl-dashboard/<slug>/
  mode:   static
  buddy:  Pebble (snail, common)
  panels: focus · calendar · tasks · skills · sessions · buddy · vox · shep

  → open ~/Documents/ctrl-dashboard/<slug>/index.html
```

---

## GitHub distribution plan

**Target repo:** [`ai-mindset-org/ainative-lab-2`](https://github.com/ai-mindset-org/ainative-lab-2) (live at https://ainative-lab-2.netlify.app/)

**Subfolder:** `templates/ctrl-dashboard/`

```
ainative-lab-2/
└── templates/
    └── ctrl-dashboard/
        ├── README.md          ← quickstart + screenshots + buddy docs
        ├── index.html         ← stripped CTRL (no Alex data)
        ├── vox.js             ← verbatim copy
        ├── vox-ui.js          ← verbatim copy
        ├── server.py          ← slim FastAPI fork
        ├── buddy.js           ← buddy renderer (Lane E output)
        ├── config.json.example
        ├── .env.example
        └── screenshots/
            ├── ctrl-dark.png
            ├── ctrl-light.png
            ├── vox-shep-tabs.png
            └── buddy-block.png
```

**Commit message:**
```
add templates/ctrl-dashboard — self-serve personal dashboard

stripped fork of pos-playground CTRL dashboard:
- zero hardcoded personal data (env-parametrized)
- dual VOX/SHEP persona + session-router
- buddy companion block (Pebble snail default)
- static · server · Netlify modes
- build wizard via /ctrl-dashboard-build skill

🤖 Generated with Claude Code
```

**Push command (DO NOT execute without explicit user confirmation):**

```bash
cd /Users/alex/Documents/_code/_dashboards/ainative-lab-2
git checkout main || git checkout -b add-ctrl-dashboard-template
mkdir -p templates/ctrl-dashboard
# (run skill output here to populate)
git add templates/ctrl-dashboard
git commit -F /tmp/ctrl-dashboard-commit.txt
git push origin add-ctrl-dashboard-template
gh pr create --title "add ctrl-dashboard template" --body "$(cat README.md)"
```

---

## Edge cases

| Situation | Handling |
|-----------|----------|
| **No Linear key** | Tasks block = localStorage kanban; Linear filter hidden |
| **No Telegram setup** | Telegram block hidden; no error |
| **No vault path** | Skills + Documents show setup instructions |
| **No buddy** | Default Pebble snail with prompt to customize |
| **Updating** | `config.json` `version` field — future runs diff and patch |

---

## Reuse from AIM-ain-dashboard

| Component | Reuse | Adapt | Drop |
|-----------|-------|-------|------|
| Mode selector (A/B/C) | ✓ 1:1 | | |
| Conversational interview | ✓ 1:1 | Q3-Q7 reframed for personal | |
| 5-lane parallel generation | ✓ 1:1 | | |
| Lane A strip | | adapt: drop AIN02 add list | |
| Lane B server slimmer | ✓ 1:1 | | |
| Lane C README | | drop AIN02 schedule | |
| Lane D config | | drop `cohort` field | |
| Lane E buddy | | speech rules generic | |
| Validate grep | | drop ain02 patterns | |
| Netlify deploy | ✓ 1:1 | | |
| Batch CSV mode | | | ✗ drop |
| Telegram cohort DM | | | ✗ drop |

---

## Files the skill creates

| File | Description |
|------|-------------|
| `<slug>/index.html` | Stripped CTRL (no Alex data, no AIN02 blocks) |
| `<slug>/vox.js` | Verbatim copy with dual VOX/SHEP persona |
| `<slug>/vox-ui.js` | Verbatim copy |
| `<slug>/buddy.js` | Buddy renderer + speech rotation |
| `<slug>/server.py` | Slim FastAPI (mode B/C only) |
| `<slug>/config.json` | User identity + buddy stub |
| `<slug>/config.js` | Browser-loadable config |
| `<slug>/.env.example` | All keys documented |
| `<slug>/README.md` | Setup, integrations, update path |

---

## Reference skills

- [AIM-ain-dashboard](file:///Users/alex/Library/CloudStorage/Dropbox/notes/AI%20mindset%20%7Bshared%7D/ai-mindset-2026/aim-rules/skills/AIM-ain-dashboard/SKILL.md) — AIN02 cohort version
- [AIM-product-factory](file:///Users/alex/.claude/skills/AIM-product-factory/SKILL.md) — Netlify deploy + parallel agent pattern
- [pos-dashboard-gen](file:///Users/alex/.claude/skills/pos-dashboard-gen/SKILL.md) — simpler snapshot variant
- [pos-companions](file:///Users/alex/Documents/_code/_dashboards/pos-companions/) — buddy/companion source

---

**Status:** v1 (2026-05-07). Tooling ready (CTRL source live at port 49153). Implementation when first user requests `/ctrl-dashboard-build`.

**Triggered by:** lecture-prep request 2026-05-07 — "скилл для того чтобы ты мог такую же штуку собирать для себя".
