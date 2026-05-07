# context observatory update – 2026-05-07

## frame

`ainative-lab-2` is moving from a static hub into a **context observatory**:

```text
source -> signal -> context pack -> action -> evidence -> review -> graph update
```

The lab surface should connect:

- **Compass** – social context engine for participants, routes, pairs, clusters.
- **Graph Lab** – visible knowledge graph of speakers, themes, pages, artifacts, stack.
- **Playground** – context pack compiler for one workflow and team stack.
- **Rules/Naming** – portable operational constraints.
- **Deck** – narrative layer for live sessions.

## v0.4 changes

- Hub now frames the site as context observatory, not just harness toolkit.
- Playground is renamed to **context pack compiler** and includes `team stack / company os`.
- Knowledge Graph now has:
  - `stack` category;
  - Compass node;
  - Graph Lab self-node;
  - context engine;
  - graph memory;
  - governed loop;
  - agent registry;
  - observability / evidence;
  - MCP interfaces;
  - team stack.
- Ask-the-graph prompt now understands Compass, Graph Lab, team stack, context engine and evidence.
- Static sanity test now validates actual single-file site structure instead of old s2 paths.

## architecture

```text
participant profile
  -> Compass route
  -> context pack
  -> workcase / prototype
  -> evidence note
  -> graph memory update
  -> warmer next run
```

## next requirements

- Import real participant nodes from Compass export.
- Add source provenance to graph nodes.
- Add evidence notes from workshop transcripts.
- Add `export selected subgraph -> markdown context pack`.
- Add server-side OpenRouter/AI route via Netlify env, never hardcoded client key.
- Add `/api/rationale` to explain why two nodes are connected.
- Add Graph Lab sync from GitHub/vault artifacts.

## slide connection

Suggested slide sequence:

1. Context Engineering: как направлять дракона.
2. Дракон – не хаос, а способ думать о силе.
3. Context направляет. Harness ограничивает.
4. Modern stack: context engine, graph memory, governed loop.
5. Compass: people as context nodes.
6. Graph Lab: not content, but relations.
7. Playground: context pack as minimum portable artifact.
8. Team stack: Company OS grows from Personal OS.
9. One small workcase with low blast radius.
10. Next run should not start from zero.

