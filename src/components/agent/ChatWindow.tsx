"use client";

import { useEffect, useRef } from "react";
import { Check, Loader2, Settings2, X } from "lucide-react";
import { bookingPrompt } from "@/content/site";
import type { AgentChat } from "@/lib/agent/useAgentChat";
import type { ToolStatus } from "@/lib/agent/types";
import BookingForm from "./BookingForm";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const TYPING_DOT_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:150ms]",
  "[animation-delay:300ms]",
];

const QUICK_REPLIES = [
  { label: "Automate my customer support", message: "I want to automate my customer support." },
  { label: "I need a voice agent", message: "I need a voice agent for my business." },
  { label: "Book a call", message: bookingPrompt },
];

/** Tool activity is part of the demo: it shows the agent actually working. */
function ToolChip({ name, status }: { name: string; status: ToolStatus }) {
  return (
    <p className="flex max-w-full items-center gap-1.5 self-start rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.68rem] text-text-dim">
      {status === "running" ? (
        <Loader2 aria-hidden className="size-3 shrink-0 animate-spin" />
      ) : (
        <Settings2 aria-hidden className="size-3 shrink-0" />
      )}
      <span className="truncate">{name}</span>
      <span className={status === "done" ? "text-success" : status === "error" ? "text-accent" : ""}>
        · {status === "running" ? "running" : status === "done" ? "done" : "needs input"}
      </span>
    </p>
  );
}

function BookedCard() {
  return (
    <p className="flex items-start gap-2 self-stretch rounded-xl border border-success/40 bg-success/5 p-3 text-sm text-text">
      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
      Request received. Tala will confirm the time by email.
    </p>
  );
}

export default function ChatWindow({ chat, onClose }: { chat: AgentChat; onClose: () => void }) {
  const { items, isLoading, error, lead, formOpen, booked, send, markBooked, openForm, closeForm } = chat;
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasConversation = items.length > 1;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items, isLoading, error, formOpen]);

  return (
    <section
      aria-label="Chat with Tala AI"
      className="flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/70"
    >
      <header className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full bg-accent-solid font-mono text-sm font-semibold text-text"
          >
            T
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-text uppercase">Tala AI</p>
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
        {items.map((item) => {
          if (item.kind === "tool") return <ToolChip key={item.id} name={item.name} status={item.status} />;
          if (item.kind === "booked") return <BookedCard key={item.id} />;
          return <MessageBubble key={item.id} message={item.content} isUser={item.role === "user"} />;
        })}

        {!hasConversation && (
          <div className="flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply.label}
                type="button"
                onClick={() => send(reply.message)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent/50 hover:text-text"
              >
                {reply.label}
              </button>
            ))}
          </div>
        )}

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
          <p role="alert" className="self-center text-center font-mono text-xs text-text-muted">
            {error}
          </p>
        )}

        {formOpen && !booked && <BookingForm lead={lead} onBooked={markBooked} onCancel={closeForm} />}
      </div>

      <div className="border-t border-border bg-surface px-3.5 py-3">
        <ChatInput onSend={send} disabled={isLoading} />
        <p className="mt-2 flex items-center justify-between gap-2 font-mono text-[0.6rem] text-text-dim">
          <span>AI assistant · may make mistakes</span>
          {!formOpen && !booked && (
            <button type="button" onClick={openForm} className="underline underline-offset-2 transition-colors hover:text-text">
              Use a form instead
            </button>
          )}
        </p>
      </div>
    </section>
  );
}
