---
tags:
  - type/prompt
  - context-lab
  - correlations
date: 2025-12-24
---

# Поиск корреляций между источниками

---

## Идея

Отдельные данные интересны. Магия — в пересечениях.

Совмещаем несколько слоёв и находим connections.

---

## Промпт: Multi-Layer Timeline

```
У меня данные за 2025 по нескольким категориям:

Календарь: [события по месяцам]
Здоровье: [шаги, сон]
Эмоции: [из дневника или воспоминаний]
Финансы: [категории трат]
Чаты: [активность, тональность]

Создай multi-layer timeline:

Для каждого месяца покажи:
- Плотность календаря
- Health metrics
- Emotional state
- Social activity
- Financial patterns

Найди correlations:

1. Когда busy calendar → stress?
2. Когда мало шагов → плохое настроение?
3. Когда импульсивные траты → что происходило?
4. Когда high productivity + good health + positive mood?
```

---

## Пример формата

```
March 2025:
├─ календарь: 15 meetings/week
├─ здоровье: sleep 6.2h, HRV dropped
├─ creative: commits +80%
├─ emotional: "устал", "надо доделать"
├─ social: messaging -40%
└─ финансы: impulse +30%

Insight: High output через health sacrifice.
Не sustainable.
```

---

## Гипотезы для тестирования

1. **Сон ↔ Продуктивность**
   Когда спал < 7ч, что было на следующий день?

2. **Шаги ↔ Настроение**
   < 5000 шагов = mood drop?
   > 15000 шагов = anxiety?

3. **Календарь ↔ Стресс**
   Плотный месяц → burnout через 2-4 недели?

4. **Траты ↔ Состояние**
   Импульсивные покупки = stress relief?

---

## Формат гипотезы

```
Hypothesis: Steps baseline
"8,000-12,000 steps/day коррелирует с better mood.
< 5000 = warning signal.
> 15000 = check anxiety."

Test в 2026: track daily steps + mood, verify correlation.
```

---

*Источник: Context Lab W26 (Seregina methodology)*
