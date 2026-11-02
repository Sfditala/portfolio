import "server-only";
import type Groq from "groq-sdk";
import { services } from "@/content/services";
import { projects, projectUrl } from "@/content/projects";
import { createMemoryRateLimiter } from "@/lib/rate-limit";
import type { AgentEvent, Lead } from "./types";

const LEAD_FIELDS = ["name", "email", "company", "role", "problem", "current_tools", "timeline", "timezone"] as const;
const REQUIRED_FIELDS = ["name", "email", "problem"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WEBHOOK_TIMEOUT_MS = 8_000;
const MAX_SLOTS = 5;

// The webhook creates real calendar events and emails, so it gets its own, stricter limit.
const bookingLimiter = createMemoryRateLimiter({ limit: 3, windowMs: 60 * 60_000 });

const leadProperties = {
  name: { type: "string" },
  email: { type: "string" },
  company: { type: "string" },
  role: { type: "string" },
  problem: {
    type: "string",
    description: "The process the visitor wants to automate, summarised from the whole conversation",
  },
  current_tools: { type: "string" },
  timeline: { type: "string" },
  timezone: { type: "string" },
};

export const toolDefinitions: Groq.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_services",
      description: "List the services Tala offers.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "find_relevant_case_study",
      description: "Find Tala's project most relevant to the visitor's problem. Returns titles and page links.",
      parameters: {
        type: "object",
        properties: { problem: { type: "string", description: "The visitor's problem, in their own words" } },
        required: ["problem"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "qualify_lead",
      description: "Validate and save details the visitor has shared. Call it whenever they share new details.",
      parameters: { type: "object", properties: leadProperties },
    },
  },
  {
    type: "function",
    function: {
      name: "book_discovery_call",
      description:
        "Request a 20-minute discovery call. Only call this after the visitor has given their name, email, problem and preferred times, and has agreed to book.",
      parameters: {
        type: "object",
        properties: {
          ...leadProperties,
          preferred_slots: {
            type: "array",
            items: { type: "string" },
            description: "Times the visitor prefers, including date and timezone where known",
          },
        },
        required: ["name", "email", "problem", "preferred_slots"],
      },
    },
  },
];

/** Keeps known string fields only. Used for model output and for client-sent state. */
export function sanitizeLead(value: unknown): Lead {
  if (!value || typeof value !== "object") return {};
  const lead: Lead = {};
  for (const field of LEAD_FIELDS) {
    const raw = (value as Record<string, unknown>)[field];
    if (typeof raw !== "string") continue;
    const clean = raw.trim().slice(0, field === "problem" ? 1_000 : 200);
    if (clean) lead[field] = clean;
  }
  return lead;
}

const missingFields = (lead: Lead) => REQUIRED_FIELDS.filter((f) => !lead[f]);
const invalidFields = (lead: Lead) => (lead.email && !EMAIL.test(lead.email) ? ["email"] : []);

/** Scores projects by keyword hits in the visitor's words, which may be Arabic or English. */
function findCaseStudies(problem: string) {
  const text = problem.toLowerCase();
  return projects
    .map((project) => ({
      project,
      score: project.keywords.filter((keyword) => text.includes(keyword.toLowerCase())).length,
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ project }) => ({
      title: project.title,
      path: projectUrl(project.slug),
      summary: project.summary,
    }));
}

async function postToWebhook(payload: object): Promise<boolean> {
  const url = process.env.N8N_BOOKING_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": process.env.N8N_BOOKING_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[agent] booking webhook returned ${res.status}`);
    return res.ok;
  } catch (error) {
    console.error("[agent] booking webhook failed:", error instanceof Error ? error.name : "unknown");
    return false;
  }
}

export type ToolOutcome = {
  result: unknown;
  /** Extra events for the client, such as the updated lead. */
  events: AgentEvent[];
  lead: Lead;
  failed?: boolean;
};

export async function runTool(
  name: string,
  rawArgs: string,
  lead: Lead,
  clientKey: string,
): Promise<ToolOutcome> {
  let args: Record<string, unknown>;
  try {
    args = JSON.parse(rawArgs || "{}") as Record<string, unknown>;
  } catch {
    return { result: { error: "Arguments were not valid JSON." }, events: [], lead, failed: true };
  }

  switch (name) {
    case "get_services":
      return {
        result: services.map(({ title, outcome, tools }) => ({ title, outcome, tools })),
        events: [],
        lead,
      };

    case "find_relevant_case_study": {
      const matches = findCaseStudies(String(args.problem ?? ""));
      return {
        result: matches.length
          ? { matches }
          : { matches: [], note: "No close match. Don't force one; use the services list instead." },
        events: [],
        lead,
      };
    }

    case "qualify_lead": {
      const merged = { ...lead, ...sanitizeLead(args) };
      const invalid = invalidFields(merged);
      // An invalid value is reported back to be corrected, never saved.
      if (invalid.includes("email")) delete merged.email;
      return {
        result: { saved: merged, missing: missingFields(merged), invalid },
        events: [{ type: "lead", lead: merged }],
        lead: merged,
      };
    }

    case "book_discovery_call": {
      const merged = { ...lead, ...sanitizeLead(args) };
      const slots = Array.isArray(args.preferred_slots)
        ? args.preferred_slots
            .filter((slot): slot is string => typeof slot === "string" && slot.trim().length > 0)
            .slice(0, MAX_SLOTS)
            .map((slot) => slot.trim().slice(0, 120))
        : [];
      const missing = [...missingFields(merged), ...(slots.length ? [] : ["preferred_slots"])];
      const invalid = invalidFields(merged);
      if (missing.length || invalid.length) {
        return {
          result: { booked: false, missing, invalid },
          events: [{ type: "lead", lead: merged }],
          lead: merged,
          failed: true,
        };
      }

      const { success } = await bookingLimiter.limit(clientKey);
      const booked =
        success &&
        (await postToWebhook({
          ...merged,
          preferred_slots: slots,
          source: "portfolio-agent",
          submitted_at: new Date().toISOString(),
        }));

      return {
        result: booked
          ? { booked: true, note: "Request sent. Tala will confirm the time by email." }
          : { booked: false, fallback: true, note: "Booking is unavailable right now. A short form has appeared in the chat." },
        events: [
          { type: "lead", lead: merged },
          { type: "booking", status: booked ? "confirmed" : "fallback" },
        ],
        lead: merged,
      };
    }

    default:
      return { result: { error: `Unknown tool: ${name}` }, events: [], lead, failed: true };
  }
}
