# ainative-lab-2

ai-native sprint vol2 · s3 · 4 may – 25 may 2026
ai mindset org

successor to [ai-mindset-org/ainative-lab](https://github.com/ai-mindset-org/ainative-lab) (s2). seeded fresh — s2 data stripped, infrastructure cherry-picked, content focused on s3 cohort.

live: https://ainative-lab-2.netlify.app

---

## what's here

- **`index.html`** — hub landing for s3 participants
- **`playground.html`** — context engineering layer builder + artifact chain + readiness check (today's primary, w1 workshop 2026-05-06)
- **`naming.html`** — interactive filename builder, s3-adapted
- **`rules.html`** — rules & skills explorer, filtered for s3 audience
- **`_scripts/`** — vault → json extract, netlify deploy, participants parser
- **`_specs/`** — design specs

aesthetic: shaper-style b&w, jetbrains mono, 1px frames, lowercase, fig.n callouts. single-file html each. no tailwind, no cdn beyond google fonts css.

---

## roadmap

- [x] playground v1 (today, 2026-05-06)
- [x] index.html / hub landing
- [x] naming.html (s3-adapted, interactive)
- [x] rules.html (s3 cards explorer, 13 rules)
- [ ] knowledge graph v2 (s3 nodes from vault)
- [ ] speakers page (s3 co-curators + invited)
- [ ] participants explorer (~160, no s2 data shown)
- [ ] weeks/w1.html through w4.html
- [ ] custom subdomain (s3.aimindset.org? harness.aimindset.org?)
- [ ] knowledge-graph integration with playground state

---

## deploy

```bash
# first time
netlify init
netlify link --name ainative-lab-2

# subsequent
netlify deploy --prod --dir=.
```

site config in `netlify.toml`. publish dir = repo root, no build step.

---

## naming convention

`{project} {type} description – yyyy-mm-dd.md`

- date at the end, en dash `–`, lowercase description
- no interface suffix (`– claude code`, `– cursor` deprecated since 2026-02-20)
- live tool: `./naming.html`

full canonical rule: vault `rules/{rule} file naming convention for Obsidian.md`

---

## seed from s2

cherry-picked from `ai-mindset-org/ainative-lab`:
- `_scripts/extract.js` — vault → json (parametric)
- `_scripts/deploy.sh` — netlify helper
- `_scripts/parse-participants.mjs` — vault parser

stripped (not ported): all s2 `data/*.json`, weeks/, participants/, sessions/, stories/, results/, speakers-page/, speakers/*.jpg, dashboard-workshop.html, knowledge-graph.html with s2 graph data.

---

## links

- live deck: https://ainative-lab-deck.netlify.app
- s2 archive (read-only): https://ai-mindset-org.github.io/ainative-lab
- ai mindset: https://aimindset.org
- bot deep link: `?start=s3` on @aimindset_lab_bot

---

## license

unset. internal artifact for ai mindset team and lab participants.
