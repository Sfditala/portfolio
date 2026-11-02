import { OG_SIZE, renderOgImage } from "@/lib/og";
import { projectBySlug, projects } from "@/content/projects";

export const alt = "Case study by Tala Safadi";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return renderOgImage({
    eyebrow: project?.label ?? "Case study",
    title: project?.title ?? "Case study",
  });
}
