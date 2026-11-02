import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projectUrl, type Project } from "@/content/projects";
import ProjectCover from "./ProjectCover";

/** Compact card: the whole card opens the case page, and the live link sits above it. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-white/20">
      <ProjectCover
        project={project}
        sizes="(min-width: 768px) 360px, 100vw"
        className="aspect-[16/10] border-b border-border"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.7rem] text-text-dim">{project.label}</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-text">
          <Link href={projectUrl(project.slug)} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-pretty text-text-muted">{project.summary}</p>
        <p className="mt-5 font-mono text-[0.68rem] text-text-dim">{project.stack.join(" · ")}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm font-medium">
          <span className="inline-flex items-center gap-1.5 text-text transition-colors group-hover:text-accent-bright">
            Read more
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-text-muted transition-colors hover:text-text"
            >
              Live
              <ArrowUpRight className="size-4" />
              <span className="sr-only">(opens {project.title} in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
