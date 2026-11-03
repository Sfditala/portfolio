import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/work/ProjectCard";
import { projects } from "@/content/projects";

// AI Rank has its own featured section on the home page.
const products = projects.filter((p) => p.category !== "automation" && p.slug !== "ai-rank");

export default function ProductsWork() {
  return (
    <Section id="products" className="pt-0 md:pt-0">
      <SectionHeading index="03" label="AI products & client work" title="Products and client builds." />

      <div className="grid gap-5 md:grid-cols-3">
        {products.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-accent-bright"
        >
          See all work
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
