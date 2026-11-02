import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "agent_open"
  | "booking_started"
  | "booking_completed"
  | "replay_run"
  | "ai_rank_click";

/** Never pass visitor details here; event names and project slugs only. */
export function trackEvent(name: AnalyticsEvent, properties?: Record<string, string>) {
  track(name, properties);
}
