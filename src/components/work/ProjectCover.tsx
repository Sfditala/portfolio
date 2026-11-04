import Image from "next/image";
import type { Project } from "@/content/projects";

/** A designed thumbnail, the first screenshot, or the white logo cover inverted for the dark UI. */
export default function ProjectCover({
  project,
  sizes,
  thumbnail = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  thumbnail?: boolean;
  className?: string;
}) {
  if (thumbnail) {
    return (
      <div className={`relative overflow-hidden bg-bg ${className}`}>
        <Image
          src={`/projects/covers/${project.slug}.webp`}
          alt=""
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }
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
