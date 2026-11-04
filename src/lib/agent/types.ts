/** Details the agent has collected. Sent back by the client on each turn. */
export type Lead = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  problem?: string;
  current_tools?: string;
  timeline?: string;
  timezone?: string;
  /** Set only for the client, to pre-fill the booking form. */
  preferred_time?: string;
};

export type ToolStatus = "running" | "done" | "error";

/** One line of the newline-delimited JSON stream from /api/agent. */
export type AgentEvent =
  | { type: "text"; text: string }
  | { type: "tool"; id: string; name: string; status: ToolStatus }
  | { type: "lead"; lead: Lead }
  | { type: "booking"; status: "confirmed" | "fallback" }
  | { type: "error"; message: string };
