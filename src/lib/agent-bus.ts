/**
 * Lets any CTA open the global agent widget without sharing React state.
 * The widget subscribes in AgentWidget; callers just call openAgent().
 */
export const AGENT_OPEN_EVENT = "tala:agent-open";

export type AgentOpenDetail = {
  /** Sent as the visitor's first message (booking mode). */
  message?: string;
};

export function openAgent(detail: AgentOpenDetail = {}) {
  window.dispatchEvent(new CustomEvent<AgentOpenDetail>(AGENT_OPEN_EVENT, { detail }));
}
