# CTRL Dashboard Template

Public builder for personal CTRL dashboard — 8-question wizard generates a packaged Claude Code skill + ready-to-deploy dashboard with VOX + SHEP assistants and a buddy companion.

**Live wizard:** https://ainative-lab-2.netlify.app/templates/ctrl-dashboard/

**Source dashboard:** stripped fork of `ai-mindset-org` POS playground CTRL dashboard. Same DNA, zero personal data.

## Files

| file | purpose |
|------|---------|
| `index.html` | the wizard (Q&A → JSZip-bundled skill download) |
| `SKILL.md` | `/ctrl-dashboard-build` skill orchestrator for Claude Code |

## Workflow

1. Visit the wizard, answer 8 questions:
   - name, slug, mode (static/server/Netlify), vault path, Linear key, Telegram session, GitHub repo, buddy
2. Click **download** → get `ctrl-dashboard-<slug>.zip` containing:
   - `config.json`, `config.js`, `.env.example` — your settings
   - `index.html`, `server.py` — placeholder dashboard (full version comes from running the skill in Claude Code)
   - `<slug>-ctrl-skill/SKILL.md` — your custom skill, copy to `~/.claude/skills/`
   - `README.md`, `INSTALL.md` — setup instructions
3. Run `/<slug>-ctrl` in Claude Code → orchestrates final dashboard generation

## What you get

- **VOX** assistant (Claude Sonnet 4 · day advisor)
- **SHEP** assistant (Claude Haiku 4.5 · task whip · 12× cheaper)
- **Buddy** companion (Pebble snail / Mottle cat / Griftax dragon / Jamble duck) with reactive speech rotation
- Session router (Warp / iTerm / cmux fallback chain)
- Focus + Calendar + Tasks + Skills + Sessions + Documents panels
- Static/server/Netlify deployment modes

## License

CC0 — drop into your AI Mindset cohort, fork, customize.

---

built via [CTRL Dashboard Builder skill](https://github.com/ai-mindset-org/ainative-lab-2/blob/main/templates/ctrl-dashboard/SKILL.md) · AI Mindset · 2026-05-07
