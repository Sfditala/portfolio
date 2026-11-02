import type { MetadataRoute } from "next";
import { projects, projectUrl } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/about", ...projects.map((p) => projectUrl(p.slug))];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
