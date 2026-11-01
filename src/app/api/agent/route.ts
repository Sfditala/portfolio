import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/agent/prompt";
import { createMemoryRateLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Supports tool calling (needed for the Phase 4 booking tools).
const MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;

// 20 requests per IP per 10 minutes.
const limiter = createMemoryRateLimiter({ limit: 20, windowMs: 10 * 60_000 });

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return null;
    messages.push({ role, content: trimmed });
  }
  return messages.at(-1)?.role === "user" ? messages : null;
}

function jsonError(error: string, status: number, headers?: HeadersInit) {
  return Response.json({ error }, { status, headers });
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return jsonError("Agent is not configured.", 503);

  const { success, reset } = await limiter.limit(getClientIp(req.headers));
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return jsonError("Too many messages. Please try again shortly.", 429, {
      "Retry-After": String(retryAfter),
    });
  }

  let messages: ChatMessage[] | null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) return jsonError("Invalid request.", 400);

  const groq = new Groq({ apiKey });

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      temperature: 0.4,
      // Reasoning tokens count toward this budget, so keep effort low.
      reasoning_effort: "low",
      max_completion_tokens: 1_024,
      stream: true,
    });
  } catch (error) {
    console.error(
      "[agent] Groq request failed:",
      error instanceof Error ? error.message : error,
    );
    return jsonError("The agent is unavailable right now.", 502);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (error) {
        console.error("[agent] stream failed:", error);
      } finally {
        controller.close();
      }
    },
    cancel() {
      completion.controller.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
