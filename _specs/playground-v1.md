---
name: ainative-lab-2 / playground v1 design
description: Single-page B&W shaper-style context-engineering playground for s3 w1 workshop
type: prd
date: 2026-05-06
lab: s3
status: shipped
---

# Context Playground v1 — design record

Created during s3 w1 workshop preparation (2026-05-06). Shipped same day, seed of `ai-mindset-org/ainative-lab-2`.

## decision

Build a single-file shaper-style B&W HTML artifact as companion to the dragon deck (ain-ws01-dragon). Distribute via new GitHub repo + new Netlify site (not sibling URL of deck).

Spec written inline because the user explicitly bypassed the brainstorming sub-gates ("напиши и всё сделаю, больше не спрашивай") after design v2 was presented and approved by repo-name selection.

## non-goals (v1)

- LLM/OpenRouter integration (no live model calls)
- Auth or shared multi-user state
- Knowledge graph visualization
- Speakers/participants page
- LMS API hooks

## visual DNA

| | |
|---|---|
| palette | `#000`, `#fff`, single dim `#bdbdbd`. nothing else. |
| typeface | `JetBrains Mono` 400/500. `ui-monospace` fallback. |
| case | lowercase by default; proper nouns kept |
| frames | 1px solid `#000` everywhere; no shadows, no rounded corners |
| callouts | `fig.1`–`fig.4` and `①②③④⑤` |
| accent | exactly one inverted block (white-on-black) for active readout band |

ban list: tailwind, gradients, shadows, rounded corners, color, multi-typeface stacks beyond mono.

## structure (top → bottom)

1. header band: title, subtitle, lab + date + speaker
2. fig.1 layer builder — five textareas: source · signal · ask · output · evidence
3. fig.2 artifact chain — five numbered cards: workcase canvas · context seed · agent passport · guardrail checklist · evidence note. each has sub-fields list and one free-notes textarea
4. fig.3 readiness check — 12 boolean toggles, live `score: N/12`, four-band readout (raw / forming / closed loop / mature) with inverted active band
5. fig.4 outbound — 4 link cards: lms s3, dragon deck, s2 archive, vault research note (obsidian:// uri)
6. footer — version line, four buttons: save · export .md · print · reset

## state

- localStorage key: `ain-ws01-playground-v1`
- autosave on `blur` (textareas) + `change` (checkboxes)
- export .md → frontmatter + sections + 12 binary lines
- print → `window.print()`, A4 portrait, buttons hidden via `@media print`
- reset → confirm prompt + `localStorage.removeItem` + reload

## distribution

- canonical: `/tmp/ainative-lab-2/playground.html` → repo `ai-mindset-org/ainative-lab-2` → netlify
- public url: `https://ainative-lab-2.netlify.app/playground.html` (final url subject to netlify default name)
- vault mirror: `Labs/s3 – ai-native vol2/playground/playground.html` for archival + offline print

## risks tracked

| risk | mitigation |
|------|-----------|
| codex parallel-edits dragon deck `index.html` | playground is separate file in different repo — zero collision |
| chrome headless print clips bottom (memory 2026-04-28) | use browser-side print, explicit `@page A4 portrait`, manual test before deploy |
| jetbrains mono not loaded | system mono fallback in font-family chain |
| 17:00 cet deadline | scope frozen, no extra features post-presentation |

## hand-off

next iteration owner: alex. backlog in repo `README.md` roadmap section. build patterns reusable for w2-w4 — same shaper aesthetic, same file naming, same deploy target.
