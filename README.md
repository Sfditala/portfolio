# Tala Safadi: portfolio

Client-acquisition site for an AI Engineer. Next.js 16 (App Router), TypeScript, Tailwind CSS v4, deployed on Vercel.

- **Workflow Replay:** an n8n-style canvas that plays back recorded workflow runs.
- **Tala AI:** a global agent that qualifies leads and books discovery calls, using tools on the server.

## Setup

Requires Node 22.18 or newer.

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

| Command | What it does |
|---|---|
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run replay:check` | Validates the workflow scenarios |
| `npm run replay:convert` | Converts an n8n execution export into a scenario |

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `GROQ_API_KEY` | Yes | Server only. Never prefix it with `NEXT_PUBLIC_` |
| `GROQ_MODEL`, `GROQ_FALLBACK_MODEL` | No | Default to `openai/gpt-oss-120b` and `openai/gpt-oss-20b`. Both must support tool calling |
| `N8N_BOOKING_WEBHOOK_URL` | For booking | Without it, the agent falls back to the form |
| `N8N_BOOKING_WEBHOOK_SECRET` | For booking | Sent as the `X-Webhook-Secret` header |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_PUBLIC_KEY` | For the form | Public by design. The template receives `name`, `email` and `message` |
| `NEXT_PUBLIC_SITE_URL` | In production | Canonical URL for metadata, sitemap and JSON-LD |

On Vercel, also delete the old `NEXT_PUBLIC_GROQ_API_KEY` if it is still set.

## Project structure

```
src/
  app/                 Routes, API, metadata, OG images, sitemap, robots
  components/
    ui/                Primitives
    sections/          Page sections
    work/              Project cards and rows
    workflow/          Workflow Replay
    agent/             Chat widget
  content/             All copy and data: edit here, not in components
    workflows/         One JSON per replay scenario (see its README)
  lib/
    agent/             Prompt, tools, stream client, chat state
    analytics.ts, motion.ts, rate-limit.ts, og.tsx
scripts/               n8n converter
```

`ASSETS.md` lists every image, video and piece of content still to add.

## Add a project

Add an entry to `src/content/projects.ts`. The `/work` page, the case page, the sitemap, the OG image and the agent's knowledge all come from that file.

## Add a workflow scenario

See `src/content/workflows/README.md`.

## Booking webhook

`book_discovery_call` sends a `POST` with this body, and the `X-Webhook-Secret` header:

```json
{
  "name": "…",
  "email": "…",
  "problem": "…",
  "company": "optional",
  "role": "optional",
  "current_tools": "optional",
  "timeline": "optional",
  "timezone": "optional",
  "preferred_slots": ["Thursday 3pm Berlin time"],
  "source": "portfolio-agent",
  "submitted_at": "2026-11-02T07:34:51.940Z"
}
```

The n8n workflow should:

1. Check the secret header and reject anything that doesn't match.
2. Create the Google Calendar event, email the visitor and notify on Telegram.
3. Reply with any 2xx status. The site treats anything else, or no reply within 8 seconds, as a failure and shows the fallback form.

`preferred_slots` are free text in the visitor's own words, so a person or an LLM step needs to interpret them.

## Agent limits worth knowing

- **Rate limits** are held in memory, per serverless instance: 20 messages per 10 minutes and 3 bookings per hour, per IP. `src/lib/rate-limit.ts` has an interface for swapping in Upstash when real traffic arrives.
- **Groq's free tier** allows 8,000 tokens per minute per model, and each message uses roughly 2,000. The fallback model absorbs short bursts, and if both are limited the visitor sees the form. A paid tier removes this limit.

## Analytics

Vercel Analytics records `agent_open`, `booking_started`, `booking_completed`, `replay_run` and `ai_rank_click`. Enable Analytics in the Vercel project. Custom events depend on your Vercel plan, so check it if they don't appear.

## Design tokens

All colours live in `src/app/globals.css`. Three differ from or extend the original brief, to meet AA contrast:

- `--color-text-dim` is `#858585`, not `#6B6B6B`.
- `--color-accent-solid` (`#CF2D3B`) sits behind light text.
- `--color-accent-bright` (`#EF5A66`) is for small accent text.
