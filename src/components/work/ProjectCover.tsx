import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * Current images are white logo covers, inverted to sit on the dark UI.
 * TODO(tala): real product screenshots (then drop invert/hue-rotate).
 */
export default function ProjectCover({
  project,
  sizes,
  className = "",
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  if (!project.image) return null;
  return (
    <div className={`relative overflow-hidden bg-bg ${className}`}>
      <Image
        src={project.image}
        alt={`${project.title} logo`}
        fill
        sizes={sizes}
        className="scale-110 object-cover object-[50%_38%] opacity-80 invert hue-rotate-180 transition-[opacity,transform] duration-300 group-hover:scale-[1.13] group-hover:opacity-100"
      />
    </div>
  );
}
