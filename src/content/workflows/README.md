# Workflow Replay scenarios

Each JSON file here is one recorded run. The replay plays it back with no calls to n8n or any LLM. The shape is defined in `types.ts`.

While a scenario has `"_placeholder": true`, the UI labels it **Sample data**. Remove that field only when the file holds a real execution; the label then becomes **Replay of a real run**.

## Replace sample data with a real run

### 1. Export the execution

Run the workflow in n8n, then fetch the execution from the API. `includeData=true` is required:

```bash
curl -H "X-N8N-API-KEY: $N8N_API_KEY" "https://YOUR-N8N/api/v1/executions/EXECUTION_ID?includeData=true" -o execution.json
```

The file must contain `data.resultData.runData` and `workflowData`. The script stops with an error if `data` is a compressed string.

### 2. Convert it

Requires Node 22.18 or newer, which runs TypeScript directly.

```bash
npm run replay:convert -- execution.json --project ai-marketing-team --out converted.json
```

### 3. Review it by hand

The script gives you a first pass, not a finished scenario.

- **Privacy comes first.** Real executions hold customer data. The script masks emails, phone numbers and keys that look like secrets, but it can't catch names, addresses or message contents. Read every value.
- Fix `id`, `title` and `prompt`.
- Shorten `label`s to about 14 characters so they fit a node.
- Tidy `position`s. The canvas is 1040 × 520, and a node is 156 × 64.
- Trim long outputs, and choose a `view` per step: `json`, `chat`, `table`, `text` or `audio`.
- Set `result`:
  - `telegram`: `{ "bot", "messages": [{ "from": "user" | "bot", "text" }] }`
  - `sheet`: `{ "sheet", "columns", "rows" }`
  - `order`: `{ "orderId", "items": [{ "qty", "name" }], "orderType", "pickup", "language", "transcript" }`
  - `text`: a string
- For voice, put the clip in `public/audio/` and set `result.audioSrc`, e.g. `"/audio/order.mp3"`.

### 4. Check and publish

Copy the file over the scenario it replaces, keeping its filename, then run:

```bash
npm run replay:check
```

This verifies that every edge and step points to a real node and that all nodes fit on the canvas.

## Add a new scenario

1. Add the JSON file here and include it in `index.ts`.
2. Set `projectSlug` to a slug from `src/content/projects.ts`.
3. New icons go in `src/components/workflow/icons.tsx`.
