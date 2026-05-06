---
name: dragon deck → playground integration
description: Paste-ready JSON to add a playground link slide to ain-ws01-dragon
type: prompt
date: 2026-05-06
lab: s3
status: ready-for-codex
---

# dragon deck → playground integration

per slide-28 inspection, recommended insertion point in `ain-ws01-dragon/index.html`:

**index 38** — between slide 37 (change management) and slide 38 (leadership shift). this lands the playground handoff right at the moment narrative pivots from "redesign participation" to "live practice".

## option A — block library entry (preferred, lets Alex add via blocks mode)

paste into `blockLibrary()` array around line 3953 in `ain-ws01-dragon/index.html`, after the existing items:

```javascript
{
  key: "playground-link",
  title: "Context Playground",
  body: "Внешний artefact-chain для живого заполнения. Открывается отдельной страницей.",
  slide: {
    key: "block-playground-" + Date.now(),
    eyebrow: "PLAYGROUND",
    title: "Один URL · пять полей · один экспорт.",
    body: "Открой playground в новой вкладке и заполни layer builder под свой workflow. Скачай evidence как .md, перенеси в vault. Это первый внешний артефакт, который покидает дек.",
    bullets: [
      "source · signal · ask · output · evidence",
      "пять переносимых шаблонов",
      "12-пункт readiness check",
      "export .md / print"
    ],
    chips: ["playground", "harness", "transfer"],
    visual: "evidence",
    prompt: "Single-page artifact instrument with five layer fields and five chain templates.",
    notes: "На воркшопе показать URL, оставить ~3 минуты на заполнение seed-поля, снять руку. Дальше evidence уходит в их vault."
  }
}
```

## option B — direct slide insertion (if Alex wants it always-present, not gated through blocks mode)

splice into `slides` array at index 38:

```javascript
{
  key: "playground-handoff",
  eyebrow: "PLAYGROUND",
  title: "Один URL · пять полей · один экспорт.",
  body: "Все шаблоны harness'a — workcase, seed, passport, guardrail, evidence — лежат в одной странице. Заполняешь, скачиваешь, переносишь в vault. URL ниже.",
  bullets: [
    "ainative-lab-2.netlify.app/playground",
    "5 layer полей + 5 artifact-chain шаблонов",
    "12-пункт readiness check (0–12 score)",
    "export .md, print, vault-archival"
  ],
  chips: ["s3", "harness", "transfer"],
  visual: "evidence",
  prompt: "Patent-style B&W playground page, five layer fields and five chain templates as fillable cards.",
  notes: "Открыть URL в браузере на демонстрации. Дать 3 минуты на заполнение source/signal/ask. Не push'ить — это инструмент после-воркшопа."
}
```

## URLs to paste anywhere in deck

```
https://ainative-lab-2.netlify.app/
https://ainative-lab-2.netlify.app/playground.html (or /play short)
https://ainative-lab-2.netlify.app/naming.html
https://ainative-lab-2.netlify.app/rules.html
```

## chip styling note

shaper-style page already exists and is monochrome. dragon deck has teal-on-dark. these intentionally **don't match** — the playground reads as "instrument that lives outside the deck", which is the point. don't try to harmonize visually.

## deck dragon-guide bot popup

if you want the deck's `dragon-guide` to know about the playground, append to its system prompt or knowledge file:

> "Если участник спрашивает про artifact-chain или templates — скажи: открой playground.html на ainative-lab-2.netlify.app, там 5 шаблонов, evidence экспортируется в .md."
