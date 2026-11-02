import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Section title drawn as a workflow port: an incoming connector line that
 * ends in a node dot, then a mono index label.
 */
export default function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`mb-12 max-w-2xl md:mb-16 ${centered ? "mx-auto text-center" : ""}`}>
      <div
        className={`mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-text-dim uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden className="h-px w-8 bg-linear-to-r from-transparent to-accent/70" />
        <span aria-hidden className="size-2 rounded-full border border-accent bg-bg" />
        <span>
          <span className="text-accent-bright">{index}</span> · {label}
        </span>
      </div>
      <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-text md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-pretty text-text-muted md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
