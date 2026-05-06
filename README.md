# ainative-lab-2

ai-native sprint vol2 · s3 · 2 may – 25 may 2026
ai mindset org

successor to `ai-mindset-org/ainative-lab` (s2). seeded fresh — s2 data stripped, infrastructure cherry-picked, content focused on s3 cohort.

live: https://ainative-lab-2.netlify.app

aesthetic: **dragon-dna** (teal `#5cdacc` on dark navy `#07090d`, space grotesk + ibm plex mono + jetbrains mono). matches the ai-native dragon deck visual language so artifacts and presentation share one flow.

---

## what's here (v0.2 — 2026-05-06 evening release)

- **`index.html`** — hub landing with all 13 s3 speakers + 4-week structure + artifact toolkit + real roadmap
- **`playground.html`** — **prompt compiler**: 13 free-text fields → real-time markdown prompt in lecture tonality (harness · контур · evidence · replay · passport)
- **`naming.html`** — 8 copyable s3 example filenames + formula visual + 4-rule grid + project codes + content types
- **`rules.html`** — diagram of 6 zones (context · memory · guardrail · review · naming · communication) around central «harness», each clickable, expanding 13 rule cards
- **`knowledge-graph.html`** — 38-node force-graph: speakers × weeks × themes × artifacts × pages × org. 6 categories, 80 edges, search + filter + side panel
- **`rules-public/`** — 12 anonymized public rule pages, each a single readable url that replaces vault paths in source-map (e.g. `/rules-public/agent-passport.html`)
- **`_scripts/`** — vault → json extract, netlify deploy, participants parser
- **`_specs/`** — design records + deck-integration paste-ready json

---

## roadmap

- [x] playground v1 → v2 prompt-compiler (today)
- [x] naming.html copyable cards
- [x] rules.html diagram of zones
- [x] knowledge-graph.html minimalist port
- [x] /rules-public/ — 12 anonymized pages
- [x] dragon-dna across all pages
- [ ] w1 evidence collection (после workshop 6 may)
- [ ] speaker cards с фото — после w1
- [ ] participants explorer (~160) — после w2 alumni showcase
- [ ] weeks/w1.html через w4.html — материалы каждой недели
- [ ] custom subdomain (`s3.aimindset.org` или `harness.aimindset.org`)
- [ ] github actions auto-deploy
- [ ] og images (dragon-dna 1200×630)
- [ ] prompt-compiler с openrouter мостом — vNext

---

## deploy

```bash
# manual deploy from local
netlify deploy --prod --dir=.

# subsequent commits push to github but Netlify is NOT auto-linked yet
git push origin main
```

site config in `netlify.toml`. publish dir = repo root, no build step. site id `f77d3724-3ed2-48f3-845e-fa4e391557b8`, account slug `apowall`.

---

## naming convention

`{project} {type} description – yyyy-mm-dd.md`

- date at the end, en dash `–`, lowercase description
- no interface suffix (`– claude code` / `– cursor` deprecated с 2026-02-20)
- live tool: [naming.html](./naming.html)

---

## seed from s2

cherry-picked into `_scripts/`:
- `extract.js` — vault → json (parametric via `_scripts/config.json`)
- `deploy.sh` — netlify helper
- `parse-participants.mjs` — vault parser
- `test.sh` — sanity checks

stripped (not ported): all s2 data/*.json, weeks/, participants/, sessions/, stories/, results/, speakers-page/, speakers/*.jpg, dashboard-workshop.html, knowledge-graph s2 data.

---

## links

- live deck: https://ainative-lab-deck.netlify.app
- ai mindset: https://aimindset.org
- bot deep link: `?start=s3` on @aimindset_lab_bot
- github: https://github.com/ai-mindset-org/ainative-lab-2

---

## license

unset. internal artifact for ai mindset team and lab participants.
