export type AgentMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

/**
 * Sends the conversation to /api/agent and calls onToken for each streamed
 * text chunk. Throws with a user-facing message on non-2xx responses.
 */
export async function streamAgentReply(
  messages: Pick<AgentMessage, "role" | "content">[],
  onToken: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!res.ok || !res.body) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Something went wrong. Please try again.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    onToken(decoder.decode(value, { stream: true }));
  }
}
