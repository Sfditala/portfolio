"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { streamAgentReply } from "./client";
import type { AgentEvent, Lead, ToolStatus } from "./types";

export type ChatItem =
  | { id: string; kind: "message"; role: "user" | "assistant"; content: string }
  | { id: string; kind: "tool"; name: string; status: ToolStatus }
  | { id: string; kind: "booked" };

const GREETING: ChatItem = {
  id: "greeting",
  kind: "message",
  role: "assistant",
  content:
    "Hi, I'm Tala AI. Tell me about a process that eats your team's time, and I'll show you how an agent could handle it. (I speak Arabic too.)",
};

/**
 * Conversation state lives with the always-mounted widget, so closing the
 * window keeps the thread and CTAs can send a message before it opens.
 */
export function useAgentChat() {
  const [items, setItems] = useState<ChatItem[]>([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState<Lead>({});
  const [formOpen, setFormOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const itemsRef = useRef(items);
  const leadRef = useRef(lead);
  const busyRef = useRef(false);
  const startedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    itemsRef.current = items;
    leadRef.current = lead;
  }, [items, lead]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const markBookingStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("booking_started");
  }, []);

  const markBooked = useCallback(() => {
    trackEvent("booking_completed");
    setBooked(true);
    setFormOpen(false);
    setItems((prev) => [...prev, { id: crypto.randomUUID(), kind: "booked" }]);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busyRef.current) return;
      busyRef.current = true;

      const userItem: ChatItem = { id: crypto.randomUUID(), kind: "message", role: "user", content };
      // The greeting is UI-only; the server prompt already sets context.
      const history = [...itemsRef.current, userItem].flatMap((item) =>
        item.kind === "message" && item.id !== GREETING.id
          ? [{ role: item.role, content: item.content }]
          : [],
      );

      setItems((prev) => [...prev, userItem]);
      setError(null);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      // Text after a tool chip starts a new bubble, so the order stays true to the run.
      let replyId: string | null = null;

      const onEvent = (event: AgentEvent) => {
        switch (event.type) {
          case "text": {
            setIsLoading(false);
            if (!replyId) {
              const id = crypto.randomUUID();
              replyId = id;
              setItems((prev) => [...prev, { id, kind: "message", role: "assistant", content: event.text }]);
            } else {
              const id = replyId;
              setItems((prev) =>
                prev.map((item) =>
                  item.id === id && item.kind === "message"
                    ? { ...item, content: item.content + event.text }
                    : item,
                ),
              );
            }
            break;
          }
          case "tool": {
            replyId = null;
            setIsLoading(true);
            const { id, name, status } = event;
            if (name === "qualify_lead" || name === "book_discovery_call") markBookingStarted();
            setItems((prev) =>
              prev.some((item) => item.id === id)
                ? prev.map((item) => (item.id === id && item.kind === "tool" ? { ...item, status } : item))
                : [...prev, { id, kind: "tool", name, status }],
            );
            break;
          }
          case "lead":
            setLead(event.lead);
            break;
          case "booking":
            if (event.status === "confirmed") markBooked();
            else setFormOpen(true);
            break;
          case "error":
            // No lead is ever lost: a failure always offers the form.
            setError(event.message);
            setFormOpen(true);
            break;
        }
      };

      try {
        await streamAgentReply(history, leadRef.current, onEvent, controller.signal);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
          setFormOpen(true);
        }
      } finally {
        busyRef.current = false;
        setIsLoading(false);
      }
    },
    [markBooked, markBookingStarted],
  );

  return {
    items,
    isLoading,
    error,
    lead,
    formOpen,
    booked,
    send,
    markBooked,
    markBookingStarted,
    openForm: () => setFormOpen(true),
    closeForm: () => setFormOpen(false),
  };
}

export type AgentChat = ReturnType<typeof useAgentChat>;
