import { Check, Play } from "lucide-react";
import AgentButton from "@/components/ui/AgentButton";
import Placeholder from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

const automations = projects.filter((p) => p.category === "automation");

/** The workflow as a chain of n8n-style nodes (Phase 2 swaps in the full replay). */
function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol>
      {steps.map((step, i) => {
        const first = i === 0;
        const last = i === steps.length - 1;
        return (
          <li key={step} className="relative flex items-center gap-3 pb-2.5 last:pb-0">
            {/* Vertical connector to the next node */}
            {!last && <span aria-hidden className="absolute top-7 bottom-0 left-[13px] w-px bg-text-dim/40" />}
            <span
              aria-hidden
              className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md border bg-surface-2 font-mono text-[0.6rem] ${
                last ? "border-success/50 text-success" : first ? "border-accent/60 text-accent" : "border-border text-text-dim"
              }`}
            >
              {last ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span
              className={`font-mono text-xs ${first || last ? "text-text" : "text-text-muted"}`}
            >
              {step}
            </span>
            {first && (
              <span className="rounded border border-accent/30 px-1.5 font-mono text-[0.6rem] text-accent">trigger</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function AutomationWork() {
  return (
    <Section id="work">
      <SectionHeading
        index="02"
        label="Agents in action"
        title="Automations I designed, built and shipped."
        description="Real architectures, not mock-ups. Each one replaces a chain of manual steps with agents that hand work to each other."
      />

      <div className="space-y-5">
        {automations.map((project, i) => (
          <Reveal key={project.slug}>
            <article className="grid overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col p-6 sm:p-8">
                <p className="font-mono text-xs text-text-dim">
                  <span className="text-accent">0{i + 1}</span> · {project.label}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-text-muted">{project.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((tool) => (
                    <li key={tool} className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.68rem] text-text-dim">
                      {tool}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <AgentButton
                    variant="ghost"
                    size="inline"
                    message={`I'm interested in something like your ${project.title}. Could it work for my business?`}
                  >
                    Want this for your business? <span className="text-accent">Talk to my agent →</span>
                  </AgentButton>
                </div>
              </div>

              <div className="relative flex flex-col justify-between gap-8 border-t border-border bg-bg/50 p-6 sm:p-8 lg:border-t-0 lg:border-l">
                <div aria-hidden className="dot-grid absolute inset-0" />
                <div className="relative flex items-center justify-between font-mono text-[0.68rem] tracking-wider text-text-dim uppercase">
                  <span>workflow · {project.slug}</span>
                  <span className="flex items-center gap-1.5">
                    <Play className="size-3" /> replay
                  </span>
                </div>
                {project.pipeline && (
                  <div className="relative">
                    <Pipeline steps={project.pipeline} />
                  </div>
                )}
                <div className="relative">
                  {/* TODO(tala): Phase 2 mounts the interactive Workflow Replay here. */}
                  <Placeholder>[[Live Workflow Replay · Phase 2]]</Placeholder>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
