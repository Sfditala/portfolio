"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

const MAX_CHARS = 2_000;

export default function ChatInput({
  onSend,
  disabled = false,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState("");
  const canSend = !disabled && message.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 transition-colors focus-within:border-accent/40"
    >
      <label htmlFor="agent-input" className="sr-only">
        Message Tala AI
      </label>
      <input
        id="agent-input"
        type="text"
        dir="auto"
        autoComplete="off"
        maxLength={MAX_CHARS}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about automating your work…"
        className="flex-1 bg-transparent py-0.5 text-sm text-text placeholder:text-text-dim focus:outline-none"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="flex items-center rounded-md p-1 text-accent-bright transition-colors disabled:text-text-dim"
      >
        <Send size={17} />
      </button>
    </form>
  );
}
