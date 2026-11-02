"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import AgentButton from "@/components/ui/AgentButton";
import type { Project } from "@/content/projects";
import LazyReplay from "./LazyReplay";

/** One stage for all automation projects: pick a tab, press Run. */
export default function ReplayStage({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + projects.length) % projects.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div id="replay" className="scroll-mt-24 xl:-mx-8">
      <div
        role="tablist"
        aria-label="Choose a workflow"
        onKeyDown={onKeyDown}
        className="mb-6 flex flex-wrap gap-2"
      >
        {projects.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`replay-tab-${p.slug}`}
            aria-selected={i === active}
            aria-controls="replay-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
              i === active
                ? "border-accent/60 bg-accent/10 text-text"
                : "border-border text-text-muted hover:border-white/20 hover:text-text"
            }`}
          >
            <span className={`font-mono text-xs ${i === active ? "text-accent" : "text-text-dim"}`}>0{i + 1}</span>
            {p.title}
          </button>
        ))}
      </div>

      <div id="replay-panel" role="tabpanel" aria-labelledby={`replay-tab-${project.slug}`}>
        <div className="mb-6 grid gap-x-10 gap-y-4 lg:min-h-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs text-text-dim">{project.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-pretty text-text-muted md:text-base">{project.summary}</p>
          </div>
          <ul className="flex flex-wrap gap-1.5 lg:justify-end">
            {project.stack.map((tool) => (
              <li key={tool} className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.68rem] text-text-dim">
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <LazyReplay projectSlug={project.slug} />

        <div className="mt-5">
          <AgentButton
            variant="ghost"
            size="inline"
            message={`I'm interested in something like your ${project.title}. Could it work for my business?`}
          >
            Want this for your business? <span className="text-accent">Talk to my agent →</span>
          </AgentButton>
        </div>
      </div>
    </div>
  );
}
