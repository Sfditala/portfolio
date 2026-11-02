import Link from "next/link";
import type { ReactNode } from "react";

// The model is told to write bare paths, but may prefix the site's origin.
const SITE_PATH = /(?:https?:\/\/[^\s/]+)?(\/work(?:\/[a-z0-9-]+)?|\/about)\b/g;

/**
 * Turns site paths into in-app links, which keep the chat open. Only the path
 * is used, so model output can never produce a link to another site.
 */
function linkify(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(SITE_PATH)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <Link key={match.index} href={match[1]} className="break-all underline underline-offset-2 hover:text-text">
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

export default function MessageBubble({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) {
  return (
    <div
      dir="auto"
      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? "self-end rounded-tr-sm bg-accent-solid text-text"
          : "self-start rounded-tl-sm border border-border bg-surface-2 text-text-muted"
      }`}
    >
      {isUser ? message : linkify(message)}
    </div>
  );
}
