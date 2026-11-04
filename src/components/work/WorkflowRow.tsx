import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NodeIcon } from "@/components/workflow/icons";
import { projectUrl, type Project } from "@/content/projects";
import { scenarioForProject } from "@/content/workflows";
import ProjectCover from "./ProjectCover";

/** A full-width row for an automation, with its nodes as a chain of icons. */
export default function WorkflowRow({ project, index }: { project: Project; index: number }) {
  const scenario = scenarioForProject(project.slug);
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-white/20 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <ProjectCover
        project={project}
        thumbnail
        sizes="(min-width: 768px) 380px, 100vw"
        className="aspect-[16/10] border-b border-border md:aspect-auto md:min-h-full md:border-r md:border-b-0"
      />
      <div className="min-w-0 p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-xs text-text-dim">
            <span className="text-accent-bright">0{index + 1}</span> · {project.label}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text">
            <Link href={projectUrl(project.slug)} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-text-muted">{project.summary}</p>
        </div>
        <ArrowRight
          aria-hidden
          className="mt-1 hidden size-5 shrink-0 text-text-dim transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-accent-bright sm:block"
        />
      </div>

      {scenario && (
        <div aria-hidden className="mt-6 flex flex-wrap items-center gap-y-2">
          {scenario.nodes.map((node, i) => (
            <Fragment key={node.id}>
              {i > 0 && <span className="h-px w-3 bg-text-dim/50 sm:w-5" />}
              <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-muted">
                <NodeIcon name={node.icon} size={15} />
              </span>
            </Fragment>
          ))}
        </div>
      )}
      </div>
    </article>
  );
}
