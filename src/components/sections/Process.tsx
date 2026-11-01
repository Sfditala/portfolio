"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const reduce = useReducedMotion();
  // With reduced motion the hidden state equals the shown state: no movement.
  const hidden = (props: TargetAndTransition) => (reduce ? {} : props);

  return (
    <Section id="process" grid>
      <SectionHeading
        index="04"
        label="How we work"
        title="From one call to a running system."
        description="Four steps, no surprises. You see the workflow before anything is built."
      />

      <motion.ol
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-120px" }}
        className="relative grid gap-10 md:grid-cols-4 md:gap-6"
      >
        {/* The connector: horizontal on desktop, vertical on mobile */}
        <motion.span
          aria-hidden
          variants={{ hidden: hidden({ scaleX: 0 }), shown: { scaleX: 1 } }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-linear-to-r from-accent via-accent/60 to-success/70 md:block"
        />
        <motion.span
          aria-hidden
          variants={{ hidden: hidden({ scaleY: 0 }), shown: { scaleY: 1 } }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute top-5 bottom-5 left-5 w-px origin-top bg-linear-to-b from-accent via-accent/60 to-success/70 md:hidden"
        />

        {processSteps.map((step, i) => {
          const last = i === processSteps.length - 1;
          return (
            <motion.li
              key={step.title}
              variants={{ hidden: hidden({ opacity: 0, y: 12 }), shown: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.22, ease: EASE }}
              className="relative flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <span
                className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-bg font-mono text-sm ${
                  last ? "border-success/60 text-success" : "border-accent/60 text-accent"
                }`}
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text md:mt-6">{step.title}</h3>
                <p className="mt-2 max-w-60 text-sm leading-relaxed text-pretty text-text-muted md:mx-auto">{step.line}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </Section>
  );
}
