import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export default function Section({
  id,
  children,
  className = "",
  grid = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds the n8n dot grid, faded at the edges. */
  grid?: boolean;
}) {
  return (
    <section id={id} className={`lazy-render relative scroll-mt-24 py-24 md:py-32 ${className}`}>
      {grid && (
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      )}
      <Container className="relative">{children}</Container>
    </section>
  );
}

/** Divider drawn as a connector between two sections, with a node in the middle. */
export function SectionDivider() {
  return (
    <Container>
      <div aria-hidden className="flex items-center gap-0">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
        <span className="size-2.5 rounded-full border border-text-dim bg-bg" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
      </div>
    </Container>
  );
}
