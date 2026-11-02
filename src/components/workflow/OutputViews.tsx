"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import Placeholder from "@/components/ui/Placeholder";
import type { ReplayStep } from "@/content/workflows/types";

function useTypewriter(text: string, enabled: boolean) {
  const reduce = useReducedMotion();
  const animated = enabled && !reduce;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animated || count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 3), 16);
    return () => clearTimeout(timer);
  }, [animated, count, text.length]);

  return animated ? text.slice(0, count) : text;
}

const TOKEN = /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?/g;

export function JsonView({ value }: { value: unknown }) {
  const json = JSON.stringify(value, null, 2) ?? "";
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of json.matchAll(TOKEN)) {
    const index = match.index;
    parts.push(json.slice(last, index));
    const isKey = Boolean(match[2]);
    const isString = Boolean(match[1]);
    parts.push(
      <span key={index} className={isKey ? "text-text-dim" : isString ? "text-text" : "text-accent"}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  parts.push(json.slice(last));
  return (
    <pre className="overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-text-dim wrap-anywhere">
      {parts}
    </pre>
  );
}

type Table = { columns: string[]; rows: (string | number)[][] };
type ChatMessage = { from: "user" | "bot"; text: string };

const isTable = (v: unknown): v is Table =>
  typeof v === "object" && v !== null && "columns" in v && "rows" in v;
const chatMessages = (v: unknown): ChatMessage[] | null =>
  typeof v === "object" && v !== null && "messages" in v
    ? (v as { messages: ChatMessage[] }).messages
    : null;

export function TableView({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left font-mono text-xs">
        <thead className="bg-white/5 text-text-dim">
          <tr>
            {table.columns.map((column) => (
              <th key={column} scope="col" className="px-2.5 py-1.5 font-normal whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text-muted">
          {table.rows.map((row, r) => (
            <tr key={r} className="border-t border-border">
              {row.map((cell, c) => (
                <td key={c} className="px-2.5 py-1.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChatBubble({
  message,
  typing = false,
}: {
  message: ChatMessage;
  typing?: boolean;
}) {
  const text = useTypewriter(message.text, typing);
  const isBot = message.from === "bot";
  return (
    <p
      dir="auto"
      className={`max-w-[90%] rounded-xl px-3 py-2 text-[0.8rem] leading-relaxed whitespace-pre-wrap ${
        isBot ? "self-start rounded-tl-sm bg-white/5 text-text" : "self-end rounded-tr-sm bg-accent/15 text-text"
      }`}
    >
      {text}
    </p>
  );
}

function TextView({ text, typing }: { text: string; typing: boolean }) {
  const shown = useTypewriter(text, typing);
  return (
    <p dir="auto" className="text-sm leading-relaxed text-text-muted">
      {shown}
    </p>
  );
}

export function AudioView({ transcript, src }: { transcript?: string; src?: string }) {
  return (
    <div className="space-y-3">
      {src ? (
        <audio controls preload="none" src={src} className="h-10 w-full">
          <track kind="captions" />
        </audio>
      ) : (
        // TODO(tala): voice agent audio clip, set as result.audioSrc in the scenario JSON.
        <Placeholder>[[TALA: voice agent audio clip]]</Placeholder>
      )}
      {transcript && (
        <p dir="auto" className="text-[0.8rem] leading-relaxed text-text-muted">
          <span className="font-mono text-xs text-text-dim">transcript · </span>
          {transcript}
        </p>
      )}
    </div>
  );
}

/** Renders a step's output in its declared view, falling back to JSON. */
export function StepOutput({
  step,
  typing,
  audioSrc,
}: {
  step: ReplayStep;
  typing: boolean;
  audioSrc?: string;
}) {
  const { output, view } = step;

  if (view === "table" && isTable(output)) return <TableView table={output} />;
  if (view === "text" && typeof output === "string") return <TextView text={output} typing={typing} />;
  if (view === "audio") {
    const transcript = (output as { transcript?: string } | null)?.transcript;
    return <AudioView transcript={transcript} src={audioSrc} />;
  }
  if (view === "chat") {
    const messages = chatMessages(output);
    if (messages) {
      return (
        <div className="flex flex-col gap-2">
          {messages.map((message, i) => (
            <ChatBubble key={i} message={message} typing={typing && i === messages.length - 1} />
          ))}
        </div>
      );
    }
  }
  return <JsonView value={output} />;
}
