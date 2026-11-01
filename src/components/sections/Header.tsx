"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AgentButton from "@/components/ui/AgentButton";
import { nav, site } from "@/content/site";

/** Logo: two nodes and a connector. */
function Mark() {
  return (
    <svg aria-hidden viewBox="0 0 28 16" className="h-4 w-7">
      <circle cx="4" cy="8" r="3" className="fill-none stroke-text-muted" strokeWidth="1.5" />
      <path d="M7 8 C13 8 15 8 21 8" className="stroke-accent" strokeWidth="1.5" />
      <circle cx="24" cy="8" r="3" className="fill-accent" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-[background-color,border-color] duration-300 sm:px-5 ${
          scrolled || open ? "border-border bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Mark />
          <span className="font-heading text-[0.95rem] font-semibold tracking-tight text-text">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <AgentButton size="sm">Talk to my agent</AgentButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-lg text-text-muted hover:text-text md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-bg/95 p-2 backdrop-blur-xl md:hidden"
        >
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-text-muted hover:bg-surface hover:text-text"
                >
                  {item.label}
                  <span aria-hidden className="size-1.5 rounded-full border border-text-dim" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-2 sm:hidden">
            <AgentButton className="w-full">Talk to my agent</AgentButton>
          </div>
        </nav>
      )}
    </header>
  );
}
