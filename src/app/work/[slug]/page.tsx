import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import AgentButton from "@/components/ui/AgentButton";
import { buttonClasses } from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/Section";
import ProjectCover from "@/components/work/ProjectCover";
import ArchitectureDiagram from "@/components/workflow/ArchitectureDiagram";
import LazyReplay from "@/components/workflow/LazyReplay";
import { projectBySlug, projects, projectUrl } from "@/content/projects";
import { scenarioForProject } from "@/content/workflows";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: projectUrl(slug) },
  };
}

/** One stop on the page's connector rail. */
function Stop({ label, title, children }: { label: string; title?: string; children: ReactNode }) {
  return (
    <section className="relative pl-7 md:pl-10">
      <span
        aria-hidden
        className="absolute top-1 left-0 size-[11px] rounded-full border border-accent bg-bg"
      />
      <p className="font-mono text-xs tracking-[0.16em] text-text-dim uppercase">{label}</p>
      {title && <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">{title}</h2>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const scenario = scenarioForProject(slug);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  // Without a replay, the first screenshot is already the page cover.
  const gallery = (scenario ? project.screenshots : project.screenshots?.slice(1)) ?? [];
  const prose = "max-w-2xl text-lg leading-relaxed text-pretty text-text-muted";

  return (
    <article className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[480px] mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]"
      />
      <Container className="relative">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs text-text-dim transition-colors hover:text-text"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> All work
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs text-text-dim">{project.label}</p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-text md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-text-muted md:text-xl">{project.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {scenario && (
              <a href="#replay" className={buttonClasses("primary", "md")}>
                Watch it run
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses(scenario ? "outline" : "primary", "md")}
              >
                Visit live site <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </header>

        {project.note && (
          <p className="mt-8 max-w-3xl rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-pretty text-text-muted">
            {project.note}
          </p>
        )}

        {!scenario && (project.image || project.screenshots?.length) && (
          <div className="group mt-12 overflow-hidden rounded-2xl border border-border">
            <ProjectCover project={project} sizes="(min-width: 1152px) 1104px, 100vw" className="aspect-[21/9]" />
          </div>
        )}

        {/* The page reads as a workflow: each section is a stop on one connector. */}
        <div className="relative mt-16 space-y-16 md:mt-24 md:space-y-24">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-linear-to-b from-accent/70 via-border to-border"
          />

          <Stop label="Problem">
            <p className={prose}>{project.problem}</p>
          </Stop>

          <Stop label="Solution">
            <p className={prose}>{project.solution}</p>
          </Stop>

          {scenario && (
            <Stop label="Architecture">
              <ArchitectureDiagram scenario={scenario} />
            </Stop>
          )}

          {scenario && (
            <div id="replay" className="scroll-mt-24">
              <Stop label="Live replay" title={scenario.title}>
                <LazyReplay projectSlug={slug} />
              </Stop>
            </div>
          )}

          <Stop label="What it does">
            <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
              {project.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="rounded-xl border border-border bg-surface px-4 py-3.5 text-sm leading-relaxed text-text-muted"
                >
                  {capability}
                </li>
              ))}
            </ul>
          </Stop>

          <Stop label="Results">
            {project.results.length > 0 ? (
              <>
                <ul className="max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-pretty text-text-muted marker:text-accent-bright">
                  {project.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
                {project.resultsNote && (
                  <p className="mt-3 font-mono text-xs text-text-dim">{project.resultsNote}</p>
                )}
              </>
            ) : (
              // TODO(tala): real results for this project.
              <Placeholder>[[TALA: real results]]</Placeholder>
            )}
          </Stop>

          {project.challenges && (
            <Stop label="Challenges and fixes">
              <ul className="grid max-w-5xl gap-3 md:grid-cols-2">
                {project.challenges.map(({ challenge, solution }) => (
                  <li key={challenge} className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed">
                    <p className="text-text-muted">{challenge}</p>
                    <p className="mt-2 text-text">
                      <span aria-hidden className="mr-1.5 font-mono text-success">→</span>
                      {solution}
                    </p>
                  </li>
                ))}
              </ul>
            </Stop>
          )}

          {(project.demoVideo || gallery.length > 0 || !project.screenshots?.length) && (
          <Stop label="In action">
            {project.demoVideo || gallery.length > 0 ? (
              <div className="space-y-4">
                {project.demoVideo && (
                  <video
                    controls
                    preload="none"
                    poster={project.screenshots?.[0]?.src}
                    src={project.demoVideo}
                    className="aspect-video w-full rounded-2xl border border-border bg-surface"
                  />
                )}
                {gallery.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {gallery.map((shot) => (
                      <figure key={shot.src}>
                        <a
                          href={shot.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative block aspect-[7/3] overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-white/20"
                        >
                          <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-contain" />
                          <span className="sr-only">(opens the full image)</span>
                        </a>
                        <figcaption className="mt-2 text-xs leading-relaxed text-text-dim">{shot.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // TODO(tala): screenshots and a demo video for this project.
              <Placeholder>[[TALA: screenshots, demo video]]</Placeholder>
            )}
          </Stop>
          )}

          <Stop label="Stack">
            {project.stack.length === 0 && (
              // TODO(tala): the stack for this project.
              <Placeholder>[[TALA: tech stack]]</Placeholder>
            )}
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <li key={tool} className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted">
                  {tool}
                </li>
              ))}
            </ul>
          </Stop>

          <Stop label="My role">
            {project.role ? (
              <p className={prose}>{project.role}</p>
            ) : (
              // TODO(tala): your role on this project.
              <Placeholder>[[TALA: your role on this project]]</Placeholder>
            )}
          </Stop>

          {project.nextSteps && (
            <Stop label="What I'd add next">
              <ul className="max-w-2xl list-disc space-y-1.5 pl-5 text-base text-text-muted marker:text-text-dim">
                {project.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </Stop>
          )}
        </div>

        <div className="mt-20 grid gap-4 md:mt-28 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-text">Want this for your business?</h2>
            <AgentButton
              className="mt-5"
              message={`I'm interested in something like your ${project.title}. Could it work for my business?`}
            >
              Talk to my agent
            </AgentButton>
          </div>
          <Link
            href={projectUrl(next.slug)}
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-white/20 sm:p-8"
          >
            <span className="font-mono text-xs tracking-[0.16em] text-text-dim uppercase">Next project</span>
            <span className="flex items-center justify-between gap-4 text-xl font-semibold tracking-tight text-text">
              {next.title}
              <ArrowRight className="size-5 shrink-0 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-accent-bright" />
            </span>
          </Link>
        </div>
      </Container>
    </article>
  );
}
