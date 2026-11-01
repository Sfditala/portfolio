import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

const products = projects.filter((p) => p.category !== "automation");

export default function ProductsWork() {
  return (
    <Section id="products" className="pt-0 md:pt-0">
      <SectionHeading index="03" label="AI products & client work" title="Products with AI at the core." />

      <div className="grid gap-5 md:grid-cols-3">
        {products.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-white/20">
              {project.image && (
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg">
                  {/* Current images are white logo covers, inverted to sit on the dark UI.
                      TODO(tala): real product screenshots (then drop invert/hue-rotate). */}
                  <Image
                    src={project.image}
                    alt={`${project.title} logo`}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="scale-[1.35] object-cover object-center opacity-80 invert hue-rotate-180 transition-[opacity,transform] duration-300 group-hover:scale-[1.4] group-hover:opacity-100"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[0.7rem] text-text-dim">{project.label}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-text">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-text-muted">{project.summary}</p>
                <p className="mt-5 font-mono text-[0.68rem] text-text-dim">{project.stack.join(" · ")}</p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-text transition-colors hover:text-accent"
                  >
                    Visit live
                    <ArrowUpRight className="size-4" />
                    <span className="sr-only">(opens {project.title} in a new tab)</span>
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
