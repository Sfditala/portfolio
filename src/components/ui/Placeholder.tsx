import type { ReactNode } from "react";

/** Visible stand-in for content Tala will provide. Never ship real-looking fakes. */
export default function Placeholder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-dashed border-accent/40 bg-accent/5 px-2 py-0.5 font-mono text-xs text-accent/90 ${className}`}
    >
      {children}
    </span>
  );
}

/** True for strings that are still a [[TALA: …]] placeholder. */
export const isPlaceholder = (value: string) => value.startsWith("[[");
