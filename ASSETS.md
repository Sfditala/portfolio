# Assets and content still needed

Everything below shows as a red dashed `[[TALA: …]]` box on the site until it is filled in. Search the code for `TODO(tala)` to find every spot.

Paths under `public/` become site URLs: `public/projects/modavi/home.png` is written as `/projects/modavi/home.png`.

## AI Rank

Done: URL, screenshots, pitch, features and tech stack. They live in `aiRank` in `src/content/site.ts` and the `ai-rank` entry in `src/content/projects.ts`.

## About you

File: `src/content/site.ts`

| What | Field |
|---|---|
| Certificates: 5 added. New ones go in `about.certificates`, with the PDF in `public/certificates/` | `about.certificates` |

Newer photo: replace `public/profile.jpg`, keeping the filename. If the crop looks off, adjust the avatar in `src/components/sections/Hero.tsx`.

## Per project

File: `src/content/projects.ts`. Put files in `public/projects/<slug>/`.

Slugs: `ai-rank`, `wejhet-ashwas`, `ai-marketing-team`, `clinic-ai-receptionist`, `telegram-ai-assistant`, `shadow-ai-detector`, `modavi`, `maha-store`.

| What | Field | Example |
|---|---|---|
| Real results only | `results` | `["…"]` |
| Screenshots; the first also becomes the card cover | `screenshots` | `[{ src: "/projects/modavi/home.png", alt: "Modavi home page" }]` |
| Demo video, MP4 | `demoVideo` | `"/projects/modavi/demo.mp4"` |
| Review the drafted story | `problem`, `solution`, `capabilities` | |

Keep videos small: Vercel serves files from `public/`, and large files load slowly. For anything over about 20 MB, compress it first.

## Workflow Replays

Full steps: `src/content/workflows/README.md`.

| What | Where |
|---|---|
| Real runs: **done** for `ai-marketing-team` (execution #89) and `clinic-ai-receptionist` (#99). Still sample data for `telegram-ai-assistant`: its structure matches the exported workflow, but its n8n account is suspended and the exports hold no execution data | Convert with `npm run replay:convert`, then replace the JSON in `src/content/workflows/` |

Removing `"_placeholder": true` from a scenario changes its label from "Sample data" to "Replay of a real run". Only do that for a real run. **Read every value first: real executions can contain customer data.**

The Hero's mini canvas in `src/components/sections/HeroWorkflow.tsx` has its own sample text. Update it to match the real run, and update the caption in `Hero.tsx`.

## Connections to set up

| What | Where |
|---|---|
| n8n booking workflow | Set `N8N_BOOKING_WEBHOOK_URL` and `N8N_BOOKING_WEBHOOK_SECRET`. See "Booking webhook" in `README.md` |
| New Groq key | `GROQ_API_KEY`. The old key was public on the live site, so it must be replaced |
| Environment variables on Vercel | See "Environment variables" in `README.md` |
