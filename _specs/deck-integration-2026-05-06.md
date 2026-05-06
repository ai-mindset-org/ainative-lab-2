---
name: dragon deck → ainative-lab-2 integration map
description: Slide-by-slide enrichment recommendations for the dragon deck, linking to ainative-lab-2 pages and rules-public sub-sites
type: prompt
date: 2026-05-06
lab: s3
status: ready-for-codex
---

# dragon deck → ainative-lab-2 integration map

per slide inspection, the dragon deck has 81 total slides organized into a governance arc (slides 60–66). below is the enrichment map per slide where ainative-lab-2 pages, rules, or artifacts add direct support material.

## key insertion: post-passport handoff

**slide 63 — `passport` · «у агента должен быть паспорт»** (line 2072 in `index.html`)

this slide opens the agent identity discussion. enrichment pattern: add 2-3 chip-style sub-links pointing to:
- `/rules-public/agent-passport.html` — full rule explanation, anonymized
- `/playground.html#passport` — the field where participant fills their own passport
- `/knowledge-graph.html` — see how passport connects to guardrails, evidence, owner

paste-ready chips block (insert into slide 63 `links` field if it exists, or append to body):

```javascript
links: [
  { label: "agent passport rule", href: "https://ainative-lab-2.netlify.app/rules-public/agent-passport.html" },
  { label: "fill your passport", href: "https://ainative-lab-2.netlify.app/playground.html" },
  { label: "see in graph", href: "https://ainative-lab-2.netlify.app/knowledge-graph.html" }
]
```

## per-slide enrichment cross-walk

| slide # | key | dragon deck topic | ainative-lab-2 link |
|---------|-----|-------------------|---------------------|
| 28 | context-versioning | versioned context | /rules-public/replay-ability.html |
| 60 | context-versioning | versioned context = replayable | /rules-public/replay-ability.html, /rules-public/claude-context-window.html |
| 61 | guardrail | guardrail layer | /rules-public/guardrails-blast-radius.html |
| 62 | compensation | guardrail как compensation | /rules-public/human-review-signal.html |
| **63** | **passport** | **agent passport** | **/rules-public/agent-passport.html + /playground.html** |
| 64 | human-passport | паспорт нужен и человеку | /rules-public/human-review-signal.html |
| 65 | shadow | shadow agents → registry | /knowledge-graph.html (visualizes the registry) |
| 66 | harness | harness = bounded autonomy | / (the lab itself) |

## end-of-deck handoff slide (recommended insertion)

after the last narrative slide, append a single «artifacts» slide with the 4 lab-2 page links as link-cards:

```javascript
{
  key: "artifacts-handoff",
  eyebrow: "ARTIFACTS",
  title: "Заберите контур с собой.",
  body: "Четыре страницы и одна папка анонимных правил. Заполни свой prompt-compiler, посмотри связи в графе, скопируй naming примеры, открой rules-зоны.",
  links: [
    { label: "prompt compiler", href: "https://ainative-lab-2.netlify.app/playground.html" },
    { label: "rules diagram", href: "https://ainative-lab-2.netlify.app/rules.html" },
    { label: "knowledge graph", href: "https://ainative-lab-2.netlify.app/knowledge-graph.html" },
    { label: "naming convention", href: "https://ainative-lab-2.netlify.app/naming.html" }
  ],
  chips: ["s3", "harness", "transfer"],
  notes: "Это последний слайд handoff — даём участникам один URL и 4 артефакта. Не показывай старый ainative-lab (S2)."
}
```

## block library entry (alternative — gated through blocks mode)

paste into `blockLibrary()` array in `ain-ws01-dragon/index.html` around line 4235:

```javascript
{
  key: "lab-2-handoff",
  title: "ainative-lab-2 Handoff",
  body: "5 страниц, 12 анонимных правил, один граф. URL для участников.",
  slide: {
    key: "block-lab2-" + Date.now(),
    eyebrow: "LAB-2",
    title: "Один URL · пять страниц · контур забирается.",
    body: "ainative-lab-2.netlify.app — hub нашей лабы. prompt-compiler, naming examples, rules diagram, knowledge graph, и 12 страниц правил. Всё в одной эстетике с этим деком.",
    bullets: [
      "playground — заполни и скачай свой prompt",
      "rules — диаграмма зон вокруг harness",
      "graph — спикеры × недели × темы × артефакты",
      "naming — копируемые примеры под s3"
    ],
    chips: ["lab-2", "harness", "handoff"],
    visual: "evidence",
    prompt: "Patent-style dark dragon-dna handoff card with 4 page links.",
    notes: "Открыть на финале лекции, дать 30 секунд на скриншот URL, отправить ссылку в чат лабы синхронно."
  }
}
```

## live vox / dragon-guide knowledge update

append to deck's `dragon-guide` system prompt or knowledge file:

> «если участник спрашивает про artifact-chain, шаблоны, naming, граф, или passport — открой `ainative-lab-2.netlify.app`. там 5 страниц + 12 анонимных правил. для passport — `/rules-public/agent-passport.html`. для prompt-сборки — `/playground.html`. naming — `/naming.html`. рамка вся одна — dragon-dna, тот же визуальный язык что у нас в деке. не используй старый s2-хаб ai-mindset-org.github.io/ainative-lab — он архив.»

## how to share with participants (15:00 cet checklist)

1. ~16:00 — open all 5 urls in browser, screenshot first-fold of each
2. ~16:30 — final qa: run through prompt-compiler with personal context, verify export .md works
3. ~16:45 — post `https://ainative-lab-2.netlify.app/` in `AI-native orgs {sprint}` chat with caption «hub лабы · prompt compiler внутри. dragon-dna, та же визуальная связка что в деке. заполняй на воркшопе и после.»
4. ~17:00 — start workshop. mid-workshop reference the playground url at the «один workflow» moment
