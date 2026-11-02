import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siGithub, siInstagram } from "simple-icons";
import BrandIcon from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Section";
import { nav, site } from "@/content/site";

// simple-icons dropped LinkedIn's mark; a minimal "in" glyph stands in.
function LinkedInGlyph() {
  return (
    <span aria-hidden className="flex size-4 items-center justify-center rounded-[3px] bg-current">
      <span className="font-sans text-[0.6rem] leading-none font-bold text-bg">in</span>
    </span>
  );
}

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: <LinkedInGlyph /> },
  { label: "GitHub", href: site.socials.github, icon: <BrandIcon icon={siGithub} className="size-4" /> },
  { label: "Instagram", href: site.socials.instagram, icon: <BrandIcon icon={siInstagram} className="size-4" /> },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="lazy-render relative overflow-hidden border-t border-border pt-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-heading text-xl font-semibold text-text">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">{site.positioning}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-text transition-colors hover:text-accent-bright"
            >
              <Mail className="size-4" /> {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-[0.68rem] tracking-[0.16em] text-text-dim uppercase">Navigate</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-text-muted transition-colors hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-mono text-[0.68rem] tracking-[0.16em] text-text-dim uppercase">Connect</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {s.icon}
                    {s.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border py-6 font-mono text-[0.68rem] text-text-dim sm:flex-row">
          <p>© {year} {site.name}</p>
          <p>{site.title}</p>
        </div>
      </Container>

      {/* Giant wordmark, cropped by the page edge */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] text-center font-heading text-[17vw] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_var(--color-border)] bg-linear-to-b from-white/[0.06] to-transparent bg-clip-text"
      >
        TALA SAFADI
      </p>
    </footer>
  );
}
