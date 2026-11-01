"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { streamAgentReply, type AgentMessage } from "./client";

const GREETING: AgentMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi, I'm Tala AI. Tell me about a process that eats your team's time, and I'll show you how an agent could handle it. (I speak Arabic too.)",
};

/**
 * Conversation state lives with the always-mounted widget, so closing the
 * window keeps the thread and CTAs can send a message before it opens.
 */
export function useAgentChat() {
  const [messages, setMessages] = useState<AgentMessage[]>([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef(messages);
  const busyRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content || busyRef.current) return;
    busyRef.current = true;

    const userMessage: AgentMessage = { id: crypto.randomUUID(), role: "user", content };
    const replyId = crypto.randomUUID();
    // The greeting is UI-only; the server prompt already sets context.
    const history = [...messagesRef.current, userMessage]
      .filter((m) => m.id !== GREETING.id)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let started = false;
      await streamAgentReply(
        history,
        (token) => {
          if (!started) {
            started = true;
            setIsLoading(false);
            setMessages((prev) => [...prev, { id: replyId, role: "assistant", content: token }]);
            return;
          }
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, content: m.content + token } : m)),
          );
        },
        controller.signal,
      );
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      busyRef.current = false;
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, error, send };
}
