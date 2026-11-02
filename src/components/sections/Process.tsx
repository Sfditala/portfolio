"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";
import { useInViewOnce } from "@/lib/motion";

// One per step, so each node lights up as the connector reaches it.
const STEP_DELAYS = ["delay-200", "delay-[450ms]", "delay-[700ms]", "delay-[950ms]"];

export default function Process() {
  const [ref, seen] = useInViewOnce<HTMLOListElement>("0px 0px -120px 0px");

  return (
    <Section id="process" grid>
      <SectionHeading
        index="04"
        label="How we work"
        title="From one call to a running system."
        description="Four steps, no surprises. You see the workflow before anything is built."
      />

      <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        {/* The connector: horizontal on desktop, vertical on mobile */}
        <span
          aria-hidden
          className={`absolute top-5 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-linear-to-r from-accent via-accent/60 to-success/70 transition-[scale] duration-1000 ease-out-expo md:block ${
            seen ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <span
          aria-hidden
          className={`absolute top-5 bottom-5 left-5 w-px origin-top bg-linear-to-b from-accent via-accent/60 to-success/70 transition-[scale] duration-1000 ease-out-expo md:hidden ${
            seen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {processSteps.map((step, i) => {
          const last = i === processSteps.length - 1;
          return (
            <li
              key={step.title}
              className={`relative flex gap-5 transition-[opacity,translate] duration-400 ease-out-expo md:flex-col md:items-center md:text-center ${STEP_DELAYS[i]} ${
                seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span
                className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-bg font-mono text-sm ${
                  last ? "border-success/60 text-success" : "border-accent/60 text-accent-bright"
                }`}
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text md:mt-6">{step.title}</h3>
                <p className="mt-2 max-w-60 text-sm leading-relaxed text-pretty text-text-muted md:mx-auto">{step.line}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
