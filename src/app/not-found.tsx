import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <div aria-hidden className="dot-grid absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-xs text-accent-bright">error · node not found · 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-text md:text-5xl">
          This workflow has no such step.
        </h1>
        <p className="mt-4 text-text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/work" variant="outline">
            See my work
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
