# ainative-lab-2

ai-native sprint vol2 · s3 · 2 may – 25 may 2026
ai mindset org

live: https://ainative-lab-2.netlify.app

`ainative-lab-2` is a **context observatory** for the current AI-native lab. It connects the deck narrative, participant context, naming convention, public rules, Compass, and a living knowledge graph into one navigable artifact.

Successor to `ai-mindset-org/ainative-lab` (s2). S2 data was stripped, infrastructure was cherry-picked, and content now focuses on the s3 cohort.

Visual language: **dragon-dna** – teal `#5cdacc` on dark navy `#07090d`, Space Grotesk + IBM Plex Mono + JetBrains Mono. The graph, playground, and deck should feel like one lab surface, not separate microsites.

---

## what's here (v0.4 – 2026-05-07 context graph release)

- **`index.html`** – hub for the lab as a context observatory: session focus, modern stack, artifacts, pages, roadmap.
- **`playground.html`** – **context pack compiler**: 16 free-text fields → portable markdown context pack for an agent workflow and team stack.
- **`knowledge-graph.html`** – force graph of speakers, weeks, themes, artifacts, pages, organization, and modern stack nodes. It now includes Compass, Graph Lab, context engine, graph memory, governed loop, evidence, MCP interfaces, and team stack.
- **`naming.html`** – copyable s3 example filenames + formula visual + project codes + content types.
- **`rules.html`** – six zones around the operating harness: context, memory, guardrail, review, naming, communication.
- **`rules-public/`** – anonymized public rule pages that replace private vault links in source maps.
- **`templates/`** – portable starter templates for personal/team operating systems.
- **`_scripts/`** – sanity checks, vault extraction helpers, deploy helpers.

---

## operating model

The lab is not just a page set. It is a small **closed loop**:

```text
source -> signal -> context pack -> action -> evidence -> review -> graph update
```

- **source** – participant notes, workshop transcript, Telegram/LMS signals, GitHub artifacts.
- **signal** – selected facts, roles, workflows, constraints, questions.
- **context pack** – portable brief that can be given to a person or agent.
- **action** – a workcase, prototype, dashboard, agent, or process change.
- **evidence** – trace that proves what happened and why the decision was made.
- **review** – human and AI pass over the result.
- **graph update** – the knowledge graph learns from the next evidence layer.

Compass adds the social layer: people become navigable context nodes, not CRM rows.

---

## modern stack frame

- **Context engine** – runtime context, short-term state, persistent store, retrieval, trimming, tool selection.
- **Graph memory** – temporal relations across people, artifacts, workflows, roles, and decisions.
- **Governed loop** – agent passport, tool rights, guardrails, policy, expiry, human review.
- **Evidence layer** – traces, eval notes, replay links, review decisions.
- **MCP interfaces** – GitHub, Obsidian, LMS, Telegram, calendar, Netlify, OpenRouter.
- **Team stack** – Personal OS of participants connected into Company OS through shared workflow artifacts.

---

## roadmap

- [x] playground v1 -> v4 context pack compiler
- [x] naming.html copyable cards
- [x] rules.html diagram of zones
- [x] knowledge-graph.html graph with stack layer
- [x] Compass linked as social context engine
- [x] `/rules-public/` – 12 anonymized pages
- [x] dragon-dna across all pages
- [x] unified nav across all pages
- [ ] participant explorer from Compass and lab graph
- [ ] Graph Lab sync from GitHub/vault artifacts
- [ ] weeks/w1.html through w4.html – materials for each week
- [ ] research source map visible from graph nodes
- [ ] GitHub Actions auto-deploy
- [ ] OG images (dragon-dna 1200x630)
- [ ] Netlify function bridge for graph rationale and context pack generation

---

## deploy

```bash
# manual deploy from local
netlify deploy --prod --dir=.

# repo push
git push origin main
```

Site config lives in `netlify.toml`. Publish dir = repo root, no build step. Site id `f77d3724-3ed2-48f3-845e-fa4e391557b8`, account slug `apowall`.

---

## naming convention

`{project} {type} description – yyyy-mm-dd.md`

- date at the end, en dash `–`, lowercase description
- no interface suffix (`– claude code`, `– cursor`, `– codex`)
- live tool: [naming.html](./naming.html)

---

## links

- live lab: https://ainative-lab-2.netlify.app
- knowledge graph: https://ainative-lab-2.netlify.app/knowledge-graph
- playground: https://ainative-lab-2.netlify.app/playground
- Compass: https://aim-ain02-compass.netlify.app
- live deck: https://ainative-lab-deck.netlify.app
- ai mindset: https://aimindset.org
- bot deep link: `?start=s3` on @aimindset_lab_bot
- github: https://github.com/ai-mindset-org/ainative-lab-2

---

## license

unset. internal artifact for ai mindset team and lab participants.
