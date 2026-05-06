---
tags:
  - type/prompt
  - context-lab
  - chats
date: 2025-12-24
---

# Анализ чатов и переписок

---

## Как экспортировать

**Telegram Desktop:**
Settings → Advanced → Export Chat History → выбери 3-5 ключевых чатов → JSON или HTML

**WhatsApp:**
Открой чат → Menu → More → Export chat → Without media

---

## Промпт

```
Вот экспорт моих чатов за 2025:

[вставь JSON или текст]

Проанализируй:

1. Топ-10 контактов (по количеству сообщений)
   - с кем общался чаще всего?
   - как менялась активность по месяцам?

2. Топ-5 тем обсуждений
   - topic modeling
   - какие темы recurring?

3. Эмоциональная динамика по кварталам:
   - Q1: общий tone (positive/neutral/negative)
   - Q2: ...
   - Q3: ...
   - Q4: ...

4. Новые vs старые контакты:
   - кто появился в 2025?
   - кто ушёл из регулярного общения?

5. Dead conversations:
   - с кем переписка прекратилась?

Особенно найди:
- Recurring questions (что часто спрашивал)
- Moments of excitement (восклицательные знаки, эмодзи)
- Support moments (кто был рядом в сложные моменты)
```

---

## Дополнительно: relationship mapping

```
На основе чатов создай relationship map:

1. Work collaborators (с кем про работу)
2. Personal friends (с кем про личное)
3. Hybrid (и то и то)

Для каждого:
- Frequency (как часто)
- Topics (о чем)
- Support layer (был ли рядом в сложные моменты)
- Energy (даёт энергию vs забирает)

| Person | Frequency | Topics | Support | Energy |
```

---

**Privacy:** храни экспорт локально, шарь только insights

---

*Источник: Context Lab W26*
