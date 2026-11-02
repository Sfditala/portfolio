"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { openAgent } from "@/lib/agent-bus";
import { bookingPrompt, finalCta, site } from "@/content/site";

const MAX_CHARS = 600;

export default function FinalCta() {
  const [text, setText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const described = text.trim();
    openAgent({
      message: described
        ? `Here's a process I'd like to automate: ${described}`
        : bookingPrompt,
      booking: !described,
    });
    setText("");
  };

  return (
    <Section id="contact" grid>
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[900px] -translate-1/2 glow-accent"
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-text-dim uppercase">
          <span className="text-accent-bright">{"//"}</span> Your workflow, next
        </p>
        <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-text md:text-6xl">
          {finalCta.title} <span className="text-accent-bright">{finalCta.accent}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-text-muted">
          Describe it in a sentence. My agent will ask a few questions and help you book a 20-minute discovery call.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface/90 p-2 text-left shadow-2xl shadow-black/50 transition-colors focus-within:border-accent/50"
        >
          <label htmlFor="cta-process" className="sr-only">
            Describe the process you want to automate
          </label>
          <div className="flex items-start gap-3 px-3 pt-3">
            <span aria-hidden className="pt-0.5 font-mono text-sm text-accent-bright">
              &gt;
            </span>
            <textarea
              id="cta-process"
              dir="auto"
              rows={2}
              maxLength={MAX_CHARS}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={finalCta.placeholder}
              className="min-h-14 flex-1 resize-none bg-transparent text-base text-text placeholder:text-text-dim focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border px-3 pt-2.5 pb-1">
            <span className="hidden items-center gap-1.5 font-mono text-[0.68rem] text-text-dim sm:flex">
              <CornerDownLeft className="size-3" /> enter to send · AR / EN
            </span>
            <button type="submit" className={buttonClasses("primary", "md", "ml-auto")}>
              {text.trim() ? "Send to my agent" : "Book a discovery call"}
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-text-dim">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline">
            {site.email}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
