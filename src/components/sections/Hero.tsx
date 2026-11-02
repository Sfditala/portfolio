import Image from "next/image";
import { ArrowDown, MessageSquareText } from "lucide-react";
import AgentButton from "@/components/ui/AgentButton";
import { ButtonLink } from "@/components/ui/Button";
import Placeholder, { isPlaceholder } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/Section";
import { hero, site } from "@/content/site";
import HeroWorkflow from "./HeroWorkflow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-accent-deep/25 blur-[140px]"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1fr_1.08fr] lg:gap-12">
        <div>
          <p className="mb-6 font-mono text-[0.7rem] tracking-[0.16em] text-text-dim sm:text-xs">
            <span className="text-accent">{"//"}</span>
            {hero.eyebrow.replace("//", "")}
          </p>

          <h1 className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-text sm:text-6xl lg:text-[4.6rem]">
            {hero.title}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {hero.titleAccent}
              {/* Connector underline ending in a node, the site's motif */}
              <span aria-hidden className="absolute -bottom-1.5 left-0 flex w-full items-center">
                <span className="h-0.5 flex-1 origin-left animate-[draw_0.8s_0.3s_cubic-bezier(0.16,1,0.3,1)_both] bg-linear-to-r from-accent/0 via-accent/70 to-accent" />
                <span className="size-2.5 animate-[pop_0.3s_1s_both] rounded-full border-2 border-accent bg-bg" />
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-text-muted">{hero.sub}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <AgentButton size="lg">
              <MessageSquareText className="size-4.5" />
              {hero.primaryCta}
            </AgentButton>
            <ButtonLink href="#replay" variant="outline" size="lg">
              {hero.secondaryCta}
              <ArrowDown className="size-4 transition-transform group-hover/btn:translate-y-0.5" />
            </ButtonLink>
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-border pt-6">
            {/* The photo is full-length; zoom toward the face for the avatar. */}
            <div className="size-12 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src="/profile.jpg"
                alt="Tala Safadi"
                width={240}
                height={320}
                priority
                className="size-full origin-[50%_24%] scale-[2.4] object-cover grayscale-[35%]"
              />
            </div>
            <div className="min-w-0 text-sm leading-snug">
              <p className="font-medium text-text">{site.name}</p>
              <p className="font-mono text-xs text-text-dim">
                {isPlaceholder(site.location) ? (
                  // TODO(tala): confirm location line.
                  <Placeholder className="mt-1">{site.location}</Placeholder>
                ) : (
                  site.location
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <HeroWorkflow />
          <p className="mt-3 text-center font-mono text-[0.68rem] text-text-dim">
            A real architecture with sample data. Full replays below.
          </p>
        </div>
      </Container>
    </section>
  );
}
