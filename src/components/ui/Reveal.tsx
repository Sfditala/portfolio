import type { ReactNode } from "react";

/**
 * Fades content up as it scrolls into view. CSS only (see the `reveal` utility),
 * so it adds no JavaScript and content stays visible where it isn't supported.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
