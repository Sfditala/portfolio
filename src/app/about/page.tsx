import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import Process from "@/components/sections/Process";
import StackStrip from "@/components/sections/StackStrip";
import AgentButton from "@/components/ui/AgentButton";
import CertificateList from "@/components/ui/CertificateList";
import Placeholder, { isPlaceholder } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/Section";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tala Safadi is an AI Engineer and the co-founder & CEO of AI Rank, building AI agents and automations that solve real business problems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]"
        />
        <Container className="relative grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.18em] text-text-dim uppercase">
              <span className="text-accent-bright">{"//"}</span> About
            </p>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-text md:text-6xl">
              Hi, I&apos;m Tala. I build agents that do the work.
            </h1>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-pretty text-text-muted">
              {about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 space-y-3 font-mono text-xs text-text-muted">
              <p className="flex items-start gap-2.5">
                <GraduationCap aria-hidden className="size-4 shrink-0" /> {about.education}
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin aria-hidden className="size-4 shrink-0" />
                {isPlaceholder(site.location) ? <Placeholder>{site.location}</Placeholder> : site.location}
              </p>
            </div>
            <AgentButton size="lg" className="mt-10">
              Talk to my agent
            </AgentButton>
          </div>

          <figure className="mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto">
            <Image
              src="/tala-safadi.jpg"
              alt="Portrait of Tala Safadi with her red pixel robot"
              width={640}
              height={640}
              priority
              sizes="(min-width: 1024px) 320px, 90vw"
              className="aspect-square w-full rounded-full border-[6px] border-accent-solid object-cover"
            />
          </figure>
        </Container>

        <Container className="relative mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-text md:text-3xl">Certificates</h2>
          <CertificateList />
        </Container>
      </div>

      <StackStrip />
      <Process />
    </>
  );
}
