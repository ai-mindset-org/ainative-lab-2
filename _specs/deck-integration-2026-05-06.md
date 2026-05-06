---
name: dragon deck → ainative-lab-2 v0.3 paste-pack
description: Single-stop pack of every URL, JSON snippet, and chat text to paste into the dragon deck for today's W1 workshop
type: prompt
date: 2026-05-06
lab: s3
status: ready-for-paste
version: v0.3
---

# dragon deck → ainative-lab-2 v0.3 — paste pack

one document, every snippet. open → copy → paste. no thinking required.

dragon deck source: `/Users/alex/Documents/_code/_decks/ainative-deck/decks/ain-ws01-dragon/index.html`
ainative-lab-2 live: `https://ainative-lab-2.netlify.app`

---

## A. live URLs (paste anywhere)

```
https://ainative-lab-2.netlify.app                        — hub
https://ainative-lab-2.netlify.app/playground.html        — prompt compiler
https://ainative-lab-2.netlify.app/naming.html            — naming convention
https://ainative-lab-2.netlify.app/rules.html             — rules & skills
https://ainative-lab-2.netlify.app/knowledge-graph.html   — knowledge graph

shortcuts:
https://ainative-lab-2.netlify.app/play   → /playground.html
https://ainative-lab-2.netlify.app/lab    → /

rule pages (all 12 anonymized):
/rules-public/agent-passport.html
/rules-public/auto-eval.html
/rules-public/claude-context-window.html
/rules-public/communication-frame.html
/rules-public/context-seed.html
/rules-public/evidence-over-logs.html
/rules-public/guardrails-blast-radius.html
/rules-public/human-review-signal.html
/rules-public/memory-scopes.html
/rules-public/one-workflow-first.html
/rules-public/replay-ability.html
/rules-public/template-before-dashboard.html
```

---

## B. slide-specific enrichments

### slide 28 (`context-versioning`) · L.1948 в index.html

paste this `links:` block into the slide object:

```javascript
links: [
  { label: "replay rule", href: "https://ainative-lab-2.netlify.app/rules-public/replay-ability.html" },
  { label: "context window protocol", href: "https://ainative-lab-2.netlify.app/rules-public/claude-context-window.html" }
]
```

### slide 60 (`context-versioning`) — secondary instance

same as slide 28 — same chips.

### slide 61 (`guardrail`) · L.2030

```javascript
links: [
  { label: "blast radius rule", href: "https://ainative-lab-2.netlify.app/rules-public/guardrails-blast-radius.html" },
  { label: "fill your guardrail", href: "https://ainative-lab-2.netlify.app/playground.html" }
]
```

### slide 62 (`compensation`) · L.2052

```javascript
links: [
  { label: "human review rule", href: "https://ainative-lab-2.netlify.app/rules-public/human-review-signal.html" }
]
```

### **slide 63 (`passport`) · L.2072 — KEY HANDOFF SLIDE**

```javascript
links: [
  { label: "agent passport rule", href: "https://ainative-lab-2.netlify.app/rules-public/agent-passport.html" },
  { label: "fill your passport", href: "https://ainative-lab-2.netlify.app/playground.html" },
  { label: "see in graph", href: "https://ainative-lab-2.netlify.app/knowledge-graph.html" }
]
```

### slide 64 (`human-passport`) · L.2952

```javascript
links: [
  { label: "human review", href: "https://ainative-lab-2.netlify.app/rules-public/human-review-signal.html" }
]
```

### slide 65 (`shadow`) · L.2092

```javascript
links: [
  { label: "see graph", href: "https://ainative-lab-2.netlify.app/knowledge-graph.html" }
]
```

### slide 66 (`harness`) · L.2111 — concept anchor

```javascript
links: [
  { label: "open the lab", href: "https://ainative-lab-2.netlify.app" },
  { label: "rules of harness", href: "https://ainative-lab-2.netlify.app/rules.html" }
]
```

---

## C. end-of-deck handoff slide (insert at the end of the slides array)

paste full slide object:

```javascript
{
  key: "artifacts-handoff",
  eyebrow: "ARTIFACTS",
  title: "Заберите контур с собой.",
  body: "Один URL · пять страниц · двенадцать анонимных правил. Заполни prompt-compiler, посмотри связи в графе, скопируй naming примеры, открой rules-зоны.",
  bullets: [
    "playground — твой контекст превращается в готовый prompt",
    "rules — 6 зон harness'a, 13 правил с фильтрацией",
    "graph — спикеры × темы × артефакты, ask the graph через openrouter",
    "naming — целый шаблон файла, copy-all"
  ],
  chips: ["s3", "harness", "transfer", "v0.3"],
  links: [
    { label: "ainative-lab-2.netlify.app", href: "https://ainative-lab-2.netlify.app" },
    { label: "→ playground", href: "https://ainative-lab-2.netlify.app/playground.html" },
    { label: "→ rules", href: "https://ainative-lab-2.netlify.app/rules.html" },
    { label: "→ graph", href: "https://ainative-lab-2.netlify.app/knowledge-graph.html" },
    { label: "→ naming", href: "https://ainative-lab-2.netlify.app/naming.html" }
  ],
  visual: "evidence",
  prompt: "Dark dragon-dna handoff card with five page links and a single hub url at the top.",
  notes: "Открыть в финале лекции. Дать 30 секунд на скриншот URL. Постить ссылку в чат лабы синхронно."
}
```

---

## D. block library entry (alternative — gated through `blocks` mode)

paste at the end of the array returned by `blockLibrary()` in `index.html` (around line 4235):

```javascript
{
  key: "lab-2-handoff",
  title: "ainative-lab-2 Handoff",
  body: "5 страниц + 12 анонимных правил + один граф. Один URL для участников.",
  slide: {
    key: "block-lab2-" + Date.now(),
    eyebrow: "LAB-2",
    title: "Один URL · пять страниц · контур забирается.",
    body: "ainative-lab-2.netlify.app — hub нашей лабы. prompt-compiler, naming examples, rules diagram, knowledge graph, и 12 страниц правил. Всё в одной dragon-dna эстетике с этим деком.",
    bullets: [
      "playground — заполни и скачай свой prompt",
      "rules — диаграмма зон вокруг harness",
      "graph — спикеры × темы × артефакты",
      "naming — целый шаблон файла"
    ],
    chips: ["lab-2", "harness", "handoff"],
    visual: "evidence",
    prompt: "Patent-style dark dragon-dna handoff card with 4 page links.",
    notes: "Открыть на финале лекции, дать 30 секунд на скриншот, отправить ссылку в чат лабы синхронно."
  }
}
```

---

## E. dragon-guide / Live Vox knowledge update

append to deck's dragon-guide system prompt (or knowledge file, if separate):

```
если участник спрашивает про artifact-chain, шаблоны, naming, граф,
passport, или harness-зоны — открой `ainative-lab-2.netlify.app`.
там 5 страниц + 12 анонимных правил.

навигация по запросам:
- «дай шаблон» / «как назвать файл» → /naming.html
- «правила» / «harness» / «zones» → /rules.html
- «собери prompt» / «компилятор» → /playground.html
- «связи» / «спикеры» / «граф» → /knowledge-graph.html
- «paspport» / «owner» / «scope» → /rules-public/agent-passport.html
- «evidence» / «логи» → /rules-public/evidence-over-logs.html

рамка одна — dragon-dna, тот же визуальный язык, что у нас в деке.
не используй старый s2-хаб ai-mindset-org.github.io/ainative-lab — он архив.
```

---

## F. telegram chat post (16:55 CET в `AI-native orgs {sprint}`)

text to paste (lowercase, en dash, no emoji per AIM voice):

```
hub лабы со всеми материалами — https://ainative-lab-2.netlify.app

там пять страниц:
– playground — собери свой контекст в готовый prompt в realtime
– rules — 6 зон harness'a, 13 правил
– graph — спикеры, темы, артефакты, можно спросить через openrouter
– naming — целый шаблон personal os, copy-all
– twelve анонимных страниц правил под /rules-public/

dragon-dna — тот же визуальный язык, что в деке. собрано параллельно с
сегодняшним workshop'ом. заполняй во время и после.

воркшоп через 5 минут.
```

(attach: screenshot of `/` first-fold for visual preview)

---

## G. checklist 16:30–17:00 cet

- [ ] **16:30** — открой все 5 урлов в браузере, screenshot first-fold каждой
- [ ] **16:40** — прогон prompt-compiler своим контекстом, проверь export .md, проверь openrouter с реальным ключом
- [ ] **16:45** — открой knowledge graph, проверь modal «ask the graph»
- [ ] **16:50** — финальный проход naming.html copy-all → вставь в Obsidian → проверь рендер
- [ ] **16:55** — пост в `AI-native orgs {sprint}` (текст из §F)
- [ ] **17:00** — старт workshop. в момент slide 63 (passport) — упомяни link на /rules-public/agent-passport.html
- [ ] **17:00+мid-workshop** — в момент «выберите один workflow» — открой /playground.html на демо

---

## H. backlog (НЕ сегодня — vNext)

- speaker covers (real PNG via x26-banners URL pattern) — после w1
- weeks/w1.html через w4.html
- custom subdomain `s3.aimindset.org` или `harness.aimindset.org`
- github actions auto-deploy
- og images (1200×630 dragon-dna)
- netlify function `/api/rationale` (mirror AIN02 Compass) — для centralized OpenRouter без участницкого ключа
- og image generation на основе hero первой страницы
- tooltip-tour первого захода (одноразовый)
