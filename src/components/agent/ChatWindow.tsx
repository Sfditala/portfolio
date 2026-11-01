"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { AgentMessage } from "@/lib/agent/client";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const TYPING_DOT_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:150ms]",
  "[animation-delay:300ms]",
];

type ChatWindowProps = {
  messages: AgentMessage[];
  isLoading: boolean;
  error: string | null;
  send: (text: string) => void;
  onClose: () => void;
};

export default function ChatWindow({
  messages,
  isLoading,
  error,
  send,
  onClose,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  return (
    <section
      aria-label="Chat with Tala AI"
      className="flex h-[min(520px,calc(100dvh-7rem))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/70"
    >
      <header className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-text"
          >
            T
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-text uppercase">
              Tala AI
            </p>
            <p className="flex items-center gap-1.5 font-mono text-[0.65rem] text-text-dim">
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              Online
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-md p-1 text-text-dim transition-colors hover:text-text"
        >
          <X size={16} />
        </button>
      </header>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-bg p-4"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m.content} isUser={m.role === "user"} />
        ))}

        {isLoading && (
          <div
            aria-label="Tala AI is typing"
            className="flex gap-1 self-start rounded-xl rounded-tl-sm border border-border bg-surface-2 px-3.5 py-3"
          >
            {TYPING_DOT_DELAYS.map((delayClass) => (
              <span
                key={delayClass}
                className={`size-1.5 animate-bounce rounded-full bg-text-dim ${delayClass}`}
              />
            ))}
          </div>
        )}

        {error && (
          <p role="alert" className="self-center text-center font-mono text-xs text-accent">
            {error}
          </p>
        )}
      </div>

      <div className="border-t border-border bg-surface px-3.5 py-3">
        <ChatInput onSend={send} disabled={isLoading} />
        <p className="mt-2 text-center font-mono text-[0.6rem] text-text-dim">
          AI assistant · may make mistakes
        </p>
      </div>
    </section>
  );
}
