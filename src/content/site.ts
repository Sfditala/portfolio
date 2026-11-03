export const site = {
  name: "Tala Safadi",
  title: "AI Engineer",
  positioning:
    "AI Engineer · I build AI agents & automations that solve real business problems",
  description:
    "Tala Safadi, AI Engineer and Co-founder & CEO of AI Rank. I design and ship AI agents, voice assistants and automation workflows that take repetitive work off your team.",
  // TODO(tala): confirm the location line.
  location: "[[TALA: location line]]",
  email: "safaditalaworksp@gmail.com",
  socials: {
    github: "https://github.com/sfditala",
    linkedin: "https://www.linkedin.com/in/talasfdi/",
    instagram: "https://www.instagram.com/talasafadyy/",
  },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
] as const;

export const hero = {
  eyebrow: "// AI ENGINEER · CO-FOUNDER & CEO @ AI RANK",
  title: "I build AI agents that",
  titleAccent: "do the work.",
  sub: "I design and ship AI agents, voice assistants and automation workflows that take repetitive work off your team, from the first workflow to production.",
  primaryCta: "Talk to my AI agent",
  secondaryCta: "Watch an agent run",
} as const;

/** First message sent when a CTA opens the agent in booking mode. */
export const bookingPrompt =
  "Hi! I'd like to explore automating part of my business and book a discovery call.";

export const aiRank = {
  name: "AI Rank",
  role: "Co-founder & CEO",
  pitch:
    "An Arabic-first platform for discovering, comparing and rating AI tools, so choosing the right one takes minutes, not weeks.",
  url: "https://airanktools.com/",
  screenshot: "/projects/ai-rank/home.png",
  features: [
    "A directory of 600 rated AI tools, with filters by category and price",
    "Side-by-side comparisons across 6 criteria, including Arabic support",
    "AI Matchmaker: describe your need and get the 3 best-matched tools",
  ],
} as const;

// TODO(tala): review the story copy; it is a draft built only from the brief.
export const about: {
  story: string[];
  teaser: string[];
  university: string;
  education: string;
  certificates: { name: string; issuer: string; year: string; url?: string }[];
} = {
  story: [
    "I'm an AI Engineer and the co-founder & CEO of AI Rank, a platform for comparing AI tools and choosing the best tool for a given task. I've spent the last 2+ years building real software products, first for the web, and now with AI at the core.",
    "Today I focus on one thing: finding the work a team repeats every week and handing it to agents that do it reliably. That means multi-agent systems, voice assistants, RAG over a company's own data, and automation workflows that connect the tools people already use.",
    "I care about systems that are clear to read, easy to hand over, and boring to run. You should be able to see exactly what an agent did and why, which is why the work on this site is shown running, node by node.",
  ],
  university: "University College of Applied Sciences (UCAS)",
  teaser: [
    "I'm Tala, an AI Engineer and the co-founder & CEO of AI Rank. I've spent the last 2+ years building real software products, first for the web, and now with AI at the core.",
    "Today I focus on one thing: finding the work your team repeats every week and handing it to agents that do it reliably. I care about systems that are clear to read, easy to hand over, and boring to run.",
  ],
  education: "AI & Data Science Engineering · University College of Applied Sciences (UCAS)",
  // TODO(tala): certificates (name, issuer, year, link).
  certificates: [
    // Add url: "https://…" to make a certificate link out.
    { name: "[[TALA: certificate]]", issuer: "[[issuer]]", year: "[[year]]" },
    { name: "[[TALA: certificate]]", issuer: "[[issuer]]", year: "[[year]]" },
    { name: "[[TALA: certificate]]", issuer: "[[issuer]]", year: "[[year]]" },
  ],
};

export const finalCta = {
  title: "Have a process that eats your team's time?",
  accent: "Let's automate it.",
  placeholder: "e.g. We copy every new order from email into a spreadsheet by hand…",
} as const;
