import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/agent/prompt";
import { runTool, sanitizeLead, toolDefinitions } from "@/lib/agent/tools";
import type { AgentEvent, Lead } from "@/lib/agent/types";
import { createMemoryRateLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Both support tool calling. Groq limits tokens per model, so the second takes over when the first is rate limited.
const PRIMARY_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const FALLBACK_MODEL = process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-20b";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_TOOL_ROUNDS = 5;

// 20 requests per IP per 10 minutes.
const limiter = createMemoryRateLimiter({ limit: 20, windowMs: 10 * 60_000 });

type ChatMessage = { role: "user" | "assistant"; content: string };
type CompletionMessage = Groq.Chat.Completions.ChatCompletionMessageParam;

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

type ToolCallDraft = { id: string; name: string; args: string };

/** One streamed model turn: forwards text and collects any tool calls. */
async function streamTurn(
  groq: Groq,
  model: string,
  messages: CompletionMessage[],
  allowTools: boolean,
  emit: (event: AgentEvent) => void,
  signal: AbortSignal,
) {
  const completion = await groq.chat.completions.create(
    {
      model,
      messages,
      temperature: 0.4,
      // Reasoning tokens count toward this budget, so keep effort low.
      reasoning_effort: "low",
      max_completion_tokens: 600,
      stream: true,
      tools: toolDefinitions,
      tool_choice: allowTools ? "auto" : "none",
    },
    { signal },
  );

  let text = "";
  const drafts: ToolCallDraft[] = [];
  for await (const chunk of completion) {
    const delta = chunk.choices[0]?.delta;
    if (delta?.content) {
      text += delta.content;
      emit({ type: "text", text: delta.content });
    }
    for (const call of delta?.tool_calls ?? []) {
      const draft = (drafts[call.index] ??= { id: "", name: "", args: "" });
      if (call.id) draft.id = call.id;
      if (call.function?.name) draft.name += call.function.name;
      if (call.function?.arguments) draft.args += call.function.arguments;
    }
  }
  return { text, toolCalls: drafts.filter(Boolean) };
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return jsonError("Agent is not configured.", 503);

  const clientKey = getClientIp(req.headers);
  const { success, reset } = await limiter.limit(clientKey);
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return jsonError("Too many messages. Please try again shortly.", 429, {
      "Retry-After": String(retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }
  const history = parseMessages(body);
  if (!history) return jsonError("Invalid request.", 400);

  let lead: Lead = sanitizeLead((body as { lead?: unknown }).lead);
  const groq = new Groq({ apiKey, maxRetries: 1 });
  const encoder = new TextEncoder();
  const abort = new AbortController();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: AgentEvent) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };
      const messages: CompletionMessage[] = [
        { role: "system", content: buildSystemPrompt(lead) },
        ...history,
      ];

      try {
        let model = PRIMARY_MODEL;
        let retried = false;
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          let turn;
          try {
            turn = await streamTurn(groq, model, messages, round < MAX_TOOL_ROUNDS, emit, abort.signal);
          } catch (error) {
            const status = error instanceof Groq.APIError ? error.status : undefined;
            if (status === 429 && model !== FALLBACK_MODEL) {
              model = FALLBACK_MODEL;
              round--;
              continue;
            }
            // Groq rejects a malformed tool call with a 400; the model usually gets it right on retry.
            if (status === 400 && !retried) {
              retried = true;
              round--;
              continue;
            }
            throw error;
          }
          if (turn.toolCalls.length === 0) break;

          messages.push({
            role: "assistant",
            content: turn.text,
            tool_calls: turn.toolCalls.map((call) => ({
              id: call.id,
              type: "function" as const,
              function: { name: call.name, arguments: call.args },
            })),
          });

          for (const call of turn.toolCalls) {
            emit({ type: "tool", id: call.id, name: call.name, status: "running" });
            const outcome = await runTool(call.name, call.args, lead, clientKey);
            lead = outcome.lead;
            outcome.events.forEach(emit);
            emit({
              type: "tool",
              id: call.id,
              name: call.name,
              status: outcome.failed ? "error" : "done",
            });
            messages.push({
              role: "tool",
              tool_call_id: call.id,
              content: JSON.stringify(outcome.result),
            });
          }
        }
      } catch (error) {
        if (!abort.signal.aborted) {
          console.error("[agent] request failed:", error instanceof Error ? error.message : "unknown");
          emit({ type: "error", message: "The agent is unavailable right now." });
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
