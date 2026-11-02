import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import Placeholder, { isPlaceholder } from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import TrackedLink from "@/components/ui/TrackedLink";
import { aiRank } from "@/content/site";

// Abstract stand-in for the product screenshot: a ranking, one row chosen.
const SKELETON_ROWS = ["w-[82%]", "w-[68%]", "w-[57%]", "w-[44%]"];

function ScreenshotStandIn() {
  return (
    <div className="relative flex aspect-[16/10] flex-col justify-center gap-3 px-[8%]">
      <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />
      {SKELETON_ROWS.map((width, i) => (
        <div
          key={width}
          className={`relative flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
            i === 0 ? "border-accent/50 bg-accent/10" : "border-border bg-surface-2/80"
          }`}
        >
          <span className={`font-mono text-xs ${i === 0 ? "text-accent-bright" : "text-text-dim"}`}>0{i + 1}</span>
          <span className="size-5 rounded-md bg-white/10" />
          <span className="h-1.5 flex-1 rounded-full bg-white/5">
            <span className={`block h-full rounded-full ${width} ${i === 0 ? "bg-accent" : "bg-white/20"}`} />
          </span>
        </div>
      ))}
      <div className="absolute inset-0 flex items-end justify-center pb-4">
        {/* TODO(tala): AI Rank screenshot(s) */}
        <Placeholder>[[TALA: AI Rank screenshot]]</Placeholder>
      </div>
    </div>
  );
}

export default function AiRankFeature() {
  return (
    <Section id="ai-rank">
      <Reveal>
        <article className="relative overflow-hidden rounded-3xl border border-border bg-surface">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-64 -left-48 size-[800px] glow-accent"
          />
          <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
            <div>
              <p className="mb-6 font-mono text-xs tracking-[0.18em] text-text-dim uppercase">
                <span className="text-accent-bright">{"//"}</span> Featured product
              </p>
              <h2 className="text-5xl font-semibold tracking-[-0.03em] text-text md:text-6xl">{aiRank.name}</h2>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-text-muted">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {aiRank.role}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-pretty text-text-muted">{aiRank.pitch}</p>

              <ul className="mt-8 space-y-3">
                {aiRank.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-muted">
                    <span aria-hidden className="h-px w-4 bg-border" />
                    <span aria-hidden className="size-2 shrink-0 rounded-full border border-accent" />
                    {isPlaceholder(feature) ? <Placeholder>{feature}</Placeholder> : feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                {aiRank.url ? (
                  <TrackedLink
                    event="ai_rank_click"
                    href={aiRank.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses("primary", "lg")}
                  >
                    Try AI Rank
                    <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </TrackedLink>
                ) : (
                  <>
                    <span aria-disabled className={buttonClasses("primary", "lg", "opacity-50")}>
                      Try AI Rank <ArrowUpRight className="size-4" />
                    </span>
                    {/* TODO(tala): AI Rank URL */}
                    <Placeholder>[[TALA: AI Rank URL]]</Placeholder>
                  </>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl shadow-black/50">
              <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
                <span aria-hidden className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                </span>
                <span className="flex-1 truncate rounded-md bg-surface-2 px-3 py-1 font-mono text-[0.68rem] text-text-dim">
                  {aiRank.url || "airank · compare AI tools"}
                </span>
              </div>
              {aiRank.screenshot ? (
                <Image
                  src={aiRank.screenshot}
                  alt="AI Rank interface"
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              ) : (
                <ScreenshotStandIn />
              )}
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
