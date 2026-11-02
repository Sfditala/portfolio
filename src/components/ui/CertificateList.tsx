import { ArrowUpRight, Award } from "lucide-react";
import { about } from "@/content/site";
import Placeholder, { isPlaceholder } from "./Placeholder";

export default function CertificateList() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {about.certificates.map((cert, i) => (
        <li key={i} className="relative flex items-start gap-3 rounded-xl border border-border bg-surface p-3.5">
          <Award aria-hidden className="mt-0.5 size-4 shrink-0 text-text-dim" />
          <div className="min-w-0 space-y-1">
            {isPlaceholder(cert.name) ? (
              <Placeholder>{cert.name}</Placeholder>
            ) : cert.url ? (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-text after:absolute after:inset-0 hover:text-accent-bright"
              >
                {cert.name} <ArrowUpRight aria-hidden className="size-3.5 shrink-0" />
              </a>
            ) : (
              <p className="text-sm text-text">{cert.name}</p>
            )}
            <p className="font-mono text-[0.65rem] text-text-dim">
              {cert.issuer} · {cert.year}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
