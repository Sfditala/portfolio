import { AppWindow, AudioLines, Bot, FileSearch, Workflow, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, type Service } from "@/content/services";

const icons: Record<Service["id"], LucideIcon> = {
  agents: Bot,
  automation: Workflow,
  voice: AudioLines,
  rag: FileSearch,
  "web-apps": AppWindow,
};

// Bento: two wide cards, then three.
const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

function Handle({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-text-dim bg-bg transition-colors duration-200 group-hover:border-accent group-hover:bg-accent ${
        side === "left" ? "-left-[5.5px]" : "-right-[5.5px]"
      }`}
    />
  );
}

export default function Services() {
  return (
    <Section id="services" grid>
      <SectionHeading
        index="01"
        label="What I build"
        title="Five kinds of systems. One goal: less manual work."
        description="Every build is a node in your business: something comes in, the system does the work, and a result comes out where your team already lives."
      />

      <div className="grid gap-4 md:grid-cols-6">
        {services.map((service, i) => {
          const Icon = icons[service.id];
          return (
            <Reveal key={service.id} delay={i * 0.05} className={spans[i]}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-white/20 md:p-7">
                <Handle side="left" />
                <Handle side="right" />

                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-muted transition-colors duration-200 group-hover:border-accent/50 group-hover:text-accent">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-text-dim">0{i + 1}</span>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-text">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-text-muted">{service.outcome}</p>

                <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 rounded-lg border border-border bg-bg/60 px-3.5 py-3 font-mono text-xs">
                  <dt className="text-text-dim">in</dt>
                  <dd className="text-text-muted">{service.io.in}</dd>
                  <dt className="text-accent">out</dt>
                  <dd className="text-text">{service.io.out}</dd>
                </dl>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {service.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.68rem] text-text-dim"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
