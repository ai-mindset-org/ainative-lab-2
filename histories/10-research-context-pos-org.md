---
tags:
  - type/research
  - context-lab
  - ain02
  - s3
  - personal-os
  - organization
date: 2026-05-06
---

# Контекст для AI-Native: Personal OS + организация

> Адаптация гайда контекстной лабы W26 (декабрь 2025) под аудиторию и запрос AI-Native Sprint vol2. Не replacement, а второй виток.

---

## Зачем перепаковывать

Контекстная лаба декабря 2025 учила собирать **личный** годовой след — календарь, чаты, фотки, голосовые. Цель — увидеть прожитый год и собрать operating principles на следующий.

AI-Native Sprint vol2 идёт с другим запросом. Срез на старте спринта (161 участник, 138 заполненных профилей):

| Паттерн | Доля от 161 | Что говорят |
|---|---:|---|
| team / company context | 62% | про отделы, компанию, людей — не только личный стек |
| dev / coding stack | 50% | Claude Code, Cursor, Codex, vibe-coding, MCP |
| ops / process automation | 48% | CRM, отчёты, delivery, support, регламенты |
| agents / agent systems | 42% | хотят перейти от чата к агентным системам |
| knowledge / context layer | 30% | базы знаний, Obsidian, RAG, документы, правила |
| human adoption | 26% | сопротивление, переобучение, новая рабочая культура |

Главный тезис из intro context AIN02:

> «Люди пришли не за списком моделей. Они уже используют Claude, GPT, Cursor, Codex, Perplexity и агенты точечно. Их общий запрос — сделать компанию читаемой для AI: где живёт контекст, кто владеет процессом, как проверяется результат, как команда принимает новый способ работы.»

Личный контекст в этой картине — это **первый слой**. Второй — организационный. Без второго AI остаётся в личной чашке Петри. Без первого второй некуда приземлять.

---

## Два слоя контекста

```
Personal OS  →  Team OS  →  Company OS
   (ты)        (твой круг)    (вся компания)
```

Каркас Степана Гершуни из W1 лекции «Why AI Transformation» — три слоя архитектуры. Каждый слой это:

- **Источники** — откуда вытащить данные
- **Артефакты** — где они живут после извлечения (markdown, Obsidian, RAG, vector DB)
- **Контракты** — как агент с этим работает (что читает, что пишет, что менять не имеет права)

Строится снизу-вверх: личное → команда → компания. В обратную сторону работает редко: нельзя сделать «AI на всю компанию», если у фаундера нет личного POS, на котором калибруются решения.

---

## Layer 1 — Personal OS (короткая версия)

Полный inventory (12 категорий, 4 уровня сложности) — в `01-guide-context-sources.md`.

Минимум для участника AIN02 в W1:

| Шаг | Время | Что даёт |
|-----|-------|----------|
| 1. Календарь — экспорт + просмотр пиков 90 дней | 30 мин | Куда уходит время; топ-10 людей по встречам |
| 2. Voice dump «расскажи последний рабочий месяц» | 10 мин | Темы, эмоции, повторы, что застряло |
| 3. Telegram export одного важного рабочего чата | 10 мин | Реальные обсуждения с командой |
| 4. Daily check-in 7 дней (1 цифра энергии + 1 эмоция + 1 факт) | 5 мин/день | Базовый rhythm tracking |
| 5. Транскрипты 5 ключевых звонков последнего месяца (Granola/Krisp) | 30 мин | Что обещал, что решил, повторяющиеся вопросы |

После этого — **первый рабочий dataset Personal OS**. Markdown-папка с реальными данными, не воображаемая структура.

---

## Layer 2 — Organization context (новое для AIN02)

Здесь начинается специфика AI-Native Sprint vol2. **8 категорий источников**, аналогичных personal map, но в плоскости компании.

### 1. Process Documentation
**Что:** SOPs, runbooks, регламенты, internal wiki (Notion / Confluence / Obsidian).
**Как извлечь:** export → markdown. Notion: `Settings → Settings & Members → Export all workspace content`. Confluence: Atlassian Cloud Export.
**Что искать:** какие процессы описаны явно, какие живут только в головах. Где «дыры» (process exists, doc absent).

### 2. Owner Map / Org Knowledge
**Что:** кто за что отвечает. Кому эскалация. Кто принимает решения какого уровня.
**Как извлечь:** через 1-on-1s + retros + Slack-history. Ручной альтернативный путь — нарисовать карту и валидировать с командой.
**Что искать:** области без явного owner; bus factor = 1; конфликтующее ownership.

### 3. Customer Signal
**Что:** sales call transcripts (Gong/Chorus), support tickets (Intercom/Zendesk), NPS, churn interviews, survey raw data.
**Как извлечь:** API export → markdown. Intercom: `Settings → Export Conversations`.
**Что искать:** повторяющиеся возражения, slang клиентов, реальные use cases (vs. предполагаемые в roadmap).

### 4. Decision Log
**Что:** RFC docs, ADRs (Architecture Decision Records), committee minutes, board decks, retros.
**Как извлечь:** GitHub PRs с label `decision`, Notion database, Linear issue logs.
**Что искать:** какие гипотезы оказались верны/неверны, паттерны решений (твой «стиль» как лидера), решения, которые не задокументированы.

### 5. Tooling Metadata
**Что:** Slack workspace export, Linear/Jira tickets, GitHub commits, Google Drive structure, calendar shared events.
**Как извлечь:** официальные exports + own scripts через MCP (Linear, Notion, GitHub).
**Что искать:** реальный workflow vs предполагаемый; какие каналы живые, какие dead; топ-collaborator pairs.

### 6. KPIs & Dashboards
**Что:** все метрики, которые компания смотрит регулярно — Mixpanel, Amplitude, Looker, Google Sheets с финансами.
**Как извлечь:** screenshot + manual structured note OR API export.
**Что искать:** что мерим vs что игнорируем; latency между событием и его появлением в дашборде; кто реально смотрит.

### 7. Conversation Residue
**Что:** транскрипты 1-on-1s, retros, all-hands, planning sessions, customer interviews.
**Как извлечь:** Granola / Krisp / Otter export → markdown. Желательно с consent от участников.
**Что искать:** темы, которые приходят снова; ключевые квоты сотрудников; что не обсуждается явно (но висит в воздухе).

### 8. Adoption Signals
**Что:** кто из команды реально пользуется AI-инструментами, что они говорят про опыт, какие workarounds придумали.
**Как извлечь:** survey + interview round (5–10 человек по 30 минут).
**Что искать:** «champions» внутри команды; refused tools и почему; неожиданные паттерны.

---

## Bridge между двумя слоями

Personal OS даёт **калибровку** — твой собственный пример «как должно работать», на котором ты тестируешь идеи перед раскаткой.

Organization context даёт **рамки** — что компания позволит, какие процессы блокируют, какие данные приватны, кто будет первым пользователем.

**Две практики моста:**

1. **Hate List → Process Audit.** Личная hate list (10–15 задач, которые бесят) → выбрать 3 task, спросить: эти задачи только мои или они есть у всей команды? Если общие — это первый процесс для AI-агента в компании.

2. **Personal System Prompt → Team Agent Prompt.** Сначала пишешь system prompt для своего AI-помощника (себе). Потом, протестировав 2–3 недели, абстрагируешь общие части и делаешь shared agent for team.

---

## AI-промпты для organization context

Готовые для прогона через Claude Desktop / GPT (приватно, локально или с обезличенными данными).

### Process Audit
```
Ниже 5 регламентов / SOPs (markdown):
[paste]

Сделай аудит:
1. Какие шаги в каждом процессе можно убрать (дублирующие, рудиментарные)?
2. Какие шаги делают люди, но мог бы делать AI-агент?
3. Где между процессами есть «дыры» — действия, которые никто формально не владеет?
4. Какой 1 процесс самый высоковознаграждаемый для автоматизации первым? Обоснуй.
```

### Customer Voice Mining
```
Ниже 30 транскриптов support-тикетов и sales-звонков:
[paste]

1. Топ-5 повторяющихся возражений — дословные формулировки клиента
2. Какой язык использует клиент vs какой используем мы?
3. 3 use cases, которые упоминаются часто, но отсутствуют в нашем roadmap
4. Где наша коммуникация добавляет фрикции (длинные тексты, жаргон)?
```

### Decision Pattern Recognition
```
Ниже 20 решений за последний квартал (RFC / ADR docs):
[paste]

1. Какой паттерн решений у меня как у лидера?
2. Где я последовательно осторожен / последовательно агрессивен?
3. Какие 2–3 ключевых решения оказались переломными — что у них общего?
4. Какие гипотезы я ещё не проверил, но они уже видны в логе?
```

### Owner Map Gap Analysis
```
Ниже org structure + список наших ключевых процессов + кто за что отвечает:
[paste]

1. Где зоны без явного owner?
2. Где пересечение ответственности (двое отвечают за одно)?
3. Где bus factor = 1 (только один человек владеет процессом)?
4. Какие 3 owner-gap-а наиболее рискованны для бизнеса в ближайшие 90 дней?
```

### Adoption Pulse
```
Ниже ответы 8 человек из команды на вопросы про AI-инструменты:
[paste]

1. Кто champions, кто sceptics, кто refusers? Цитата по каждому.
2. 3 самые частые причины «не пользуюсь»
3. Какой паттерн в workarounds — что люди делают вместо?
4. С чего начать adoption rollout, чтобы champions подтянули остальных?
```

---

## Practices, адаптированные из W26 для организации

| Personal practice | Org adaptation |
|-------------------|----------------|
| **Buddy System** (парный рассказ года) | **Pair Architecture** — два менеджера рассказывают друг другу годовой workflow, ищут blind spots |
| **Hate List + 6T scoring** | **Process Pain Audit** — каждая команда даёт 10 задач, которые бесят, scoring по 6T → automation backlog |
| **Operating Principles** (личные) | **Team Operating Principles** — 5 правил, которые команда явно соблюдает (от первого лица «мы») |
| **System Prompt 2026** | **Team Agent Prompt** — shared prompt для AI-агентов команды, версионируется в repo |
| **Decision Journal** | **ADR habit** — каждое нетривиальное решение проходит через короткий ADR (1 страница) |
| **Personal Constitution** | **Team Constitution** — 1 страница: identity + mission + 5 rules + stop/start/keep |
| **Year Timeline** | **Quarter Timeline** — поквартальная карта компании: события, метрики, решения, релизы |
| **Daily Check-In** | **Weekly Pulse** — Slack-bot или ритуал: 1 цифра energy команды, 1 unblocker, 1 win недели |

---

## Privacy & Safety на org-уровне

В organization context фрикций больше, чем в personal. Защита нужна реальная, не декларативная.

**Перед извлечением данных из систем компании:**
- Сверить с employer NDA и data retention policy
- Снять PII (personally identifiable information) скриптом перед AI-обработкой
- Customer data — только агрегированно или явно anonymized
- Финансы — категориями, не суммами; revenue ranges, не точные числа

**AI-обработка:**
- Local-first: Claude Desktop, Ollama, MLX-модели вместо браузерных чатов
- Anthropic Workspace / OpenAI Enterprise если нужно облако (zero-data-retention контракт)
- Никогда не отправлять customer raw data в публичный chat-интерфейс

**Consent:**
- Транскрипты 1-on-1 → opt-in, не дефолт
- Adoption interviews → явное согласие на запись и AI-обработку
- Slack export → review с HR, особенно для команд 50+

**Role-based access:**
- Кто читает финансы — не обязательно тот, кто читает customer interviews
- Разделить vault на `public/`, `internal/`, `restricted/` ещё до того, как туда попали реальные данные
- Agent permissions проектировать как наименьший набор сразу, не «всё открыть и потом сужать»

---

## Quick wins для участника AIN02 — 5 шагов на W1

Не больше пяти. Не открывай этот файл снова, пока их не сделаешь.

1. **Personal calendar export** — 5 мин. Скачай .ics за последние 90 дней. Открой в одном md-файле.
2. **Voice dump «месяц работы»** — 10 мин. Голосом наговорить, во что упирался, кто в команде вытаскивал, что разочаровало.
3. **Один процесс компании в markdown** — 30 мин. Выбрать процесс, который ты лучше всего знаешь. Записать как SOP. Если не записывается ровно — это сигнал, что процесс размыт в реальности.
4. **5 коротких adoption-разговоров** — 30 мин × 5. Спросить каждого: «какой AI-инструмент пробовал последний раз и почему перестал/продолжил?»
5. **Один Hate List, один 6T scoring** — 20 мин. 10 задач компании, которые бесят. Прогнать через 6T (Tedious / Time-consuming / Terrible / Teachable / Terrifying / Tricky). Топ-3 кандидата на пилот W2/W3.

После этого у тебя есть **первый working dataset** для company-context. Не выгружать всю компанию в Obsidian — этого достаточно для одного processable артефакта Demo Day.

---

## Deliverables к Demo Day (25 мая)

Если идёшь по двум слоям параллельно, к концу спринта получаешь:

**Personal OS layer:**
- Markdown vault `~/{context}/personal/` — 4–6 источников
- Personal Operating Principles (3–5 правил)
- System Prompt 2026 в Claude / Cursor

**Organization layer:**
- 1 company function расписана: контекст + процесс + агент/пайплайн + evidence + owner + 90-day plan
- Process Pain Audit + Automation Backlog (10 пунктов с 6T)
- Adoption Pulse: 5–8 интервью + map (champions / sceptics / refusers)
- Один работающий пилот — агент или пайплайн, реально включённый в один процесс
- ADR на 3 ключевых решения спринта

**Bridge:**
- Доказательство, что Personal OS калибрует Org context: 1 пример, как личная практика (skill, prompt, workflow) перешла в team-shared.

---

## Связь с W1 фреймворком

Stepan Gershuni в W1 «Why AI Transformation» формулирует moat AI-native компании: **domain expert orchestrator с 10–20 годами контекста**.

Этот expert — носитель знания. Контекст-сбор — способ **извлечь** это знание из его головы и из системы компании, чтобы:

1. AI-агент мог опираться на него (не галлюцинировать)
2. Знание не уходило с человеком
3. Новые сотрудники онбордились в неделю, не в квартал

Personal OS = ваш собственный domain знаний. Organization context = знания компании. AI-Native компания возможна только когда оба слоя видимы и обновляемы.

---

## Связанные материалы в этом repo

- [01-guide-context-sources.md](01-guide-context-sources.md) — полный inventory личных источников
- [02-methodologies-overview.md](02-methodologies-overview.md) — обзор методологий, в которых это всё живёт
- [03-prompt-kontekstnyi-rentgen.md](03-prompt-kontekstnyi-rentgen.md) — основной x-ray промпт для personal context
- [04-prompt-correlations.md](04-prompt-correlations.md) — поиск кросс-источниковых корреляций
- [09-template-system-prompt.md](09-template-system-prompt.md) — шаблон system prompt, можно адаптировать под team agent

---

## Один шаг, если читаешь это в первый день W1

> Открой voice memos. 10 минут. Расскажи свой последний рабочий месяц — что застряло, кто вытащил, что обесценило, что зажгло. Не редактируй. Сохрани как markdown в `~/{context}/personal/dump-2026-05-06.md`.

Это первый камень в Personal OS. Все 8 категорий org context дальше встанут на этот камень.
