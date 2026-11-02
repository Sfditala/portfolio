import Image from "next/image";
import type { Project } from "@/content/projects";

/** The first screenshot if there is one; otherwise the white logo cover, inverted for the dark UI. */
export default function ProjectCover({
  project,
  sizes,
  className = "",
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  const screenshot = project.screenshots?.[0];
  if (!screenshot && !project.image) return null;
  return (
    <div className={`relative overflow-hidden bg-bg ${className}`}>
      <Image
        src={screenshot?.src ?? (project.image as string)}
        alt={screenshot?.alt ?? `${project.title} logo`}
        fill
        sizes={sizes}
        className={`transition-[opacity,transform] duration-300 ${
          screenshot
            ? "object-cover object-top group-hover:scale-[1.02]"
            : "scale-110 object-cover object-[50%_38%] opacity-80 invert hue-rotate-180 group-hover:scale-[1.13] group-hover:opacity-100"
        }`}
      />
    </div>
  );
}
