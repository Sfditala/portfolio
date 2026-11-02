import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import CertificateList from "@/components/ui/CertificateList";
import Placeholder, { isPlaceholder } from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { about, site } from "@/content/site";

export default function AboutTeaser() {
  return (
    <Section id="about">
      <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          {/* Photo framed as a workflow node */}
          <figure className="relative mx-auto max-w-xs rounded-2xl border border-border bg-surface p-2 lg:mx-0">
            <span aria-hidden className="absolute top-1/2 -right-[5.5px] size-2.5 rounded-full border border-accent bg-bg" />
            <div className="flex items-center justify-between px-2 pt-1 pb-2.5 font-mono text-[0.68rem] text-text-dim">
              <span>tala.safadi</span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-1.5 rounded-full bg-success" /> human in the loop
              </span>
            </div>
            <Image
              src="/profile.jpg"
              alt="Portrait of Tala Safadi"
              width={480}
              height={640}
              sizes="320px"
              className="aspect-[4/5] w-full rounded-xl object-cover object-top grayscale-[25%]"
            />
          </figure>
        </Reveal>

        <div>
          <SectionHeading index="05" label="About" title="Hi, I'm Tala." />
          <Reveal className="-mt-6 space-y-5 text-lg leading-relaxed text-pretty text-text-muted md:-mt-10">
            {about.teaser.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="mt-8 space-y-3 font-mono text-xs text-text-dim">
            <p className="flex items-start gap-2.5">
              <GraduationCap className="size-4 shrink-0" /> {about.education}
            </p>
            <p className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0" />
              {isPlaceholder(site.location) ? <Placeholder>{site.location}</Placeholder> : site.location}
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <p className="mb-3 font-mono text-[0.68rem] tracking-[0.16em] text-text-dim uppercase">Certificates</p>
            <CertificateList />
          </Reveal>

          <Reveal className="mt-10">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-accent-bright"
            >
              More about me
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
