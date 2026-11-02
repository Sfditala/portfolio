import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import AgentButton from "@/components/ui/AgentButton";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/work/ProjectCard";
import WorkflowRow from "@/components/work/WorkflowRow";
import { categories, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI agents, automations and products by Tala Safadi: multi-agent marketing, a Telegram assistant, a restaurant voice agent and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]"
      />
      <Container className="relative">
        <header className="max-w-3xl">
          <p className="mb-5 font-mono text-xs tracking-[0.18em] text-text-dim uppercase">
            <span className="text-accent">{"//"}</span> Work
          </p>
          <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-text md:text-6xl">
            Agents, automations and products I&apos;ve built.
          </h1>
        </header>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {categories.map((category) => {
            const items = projects.filter((p) => p.category === category.id);
            const isAutomation = category.id === "automation";
            return (
              <section key={category.id} aria-labelledby={`group-${category.id}`}>
                <Reveal className="mb-8 border-b border-border pb-5">
                  <h2 id={`group-${category.id}`} className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                    {category.title}
                  </h2>
                  <p className="mt-2 text-text-muted">{category.description}</p>
                </Reveal>
                {isAutomation ? (
                  <div className="space-y-4">
                    {items.map((project, i) => (
                      <Reveal key={project.slug}>
                        <WorkflowRow project={project} index={i} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((project) => (
                      <Reveal key={project.slug}>
                        <ProjectCard project={project} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <Reveal className="mt-20 rounded-2xl border border-border bg-surface p-8 text-center md:mt-28 md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-text md:text-3xl">
            Have a process that eats your team&apos;s time?
          </h2>
          <AgentButton size="lg" className="mt-6">
            Talk to my agent
          </AgentButton>
        </Reveal>
      </Container>
    </div>
  );
}
