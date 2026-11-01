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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
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
  pitch: "A platform for comparing AI tools and choosing the best tool for a given task.",
  // TODO(tala): AI Rank URL, screenshot(s) and 2–3 key features.
  url: "",
  screenshot: "",
  features: [
    "[[TALA: key feature 1]]",
    "[[TALA: key feature 2]]",
    "[[TALA: key feature 3]]",
  ],
} as const;

// TODO(tala): review the story copy; it is a draft built only from the brief.
export const about = {
  teaser: [
    "I'm Tala, an AI Engineer and the co-founder & CEO of AI Rank. I've spent the last 2+ years building real software products, first for the web, and now with AI at the core.",
    "Today I focus on one thing: finding the work your team repeats every week and handing it to agents that do it reliably. I care about systems that are clear to read, easy to hand over, and boring to run.",
  ],
  education: "AI & Data Science Engineering · University College of Applied Sciences (UCAS)",
  // TODO(tala): certificates (name, issuer, year, link).
  certificates: [
    { name: "[[TALA: certificate]]", issuer: "[[issuer]]", year: "[[year]]" },
    { name: "[[TALA: certificate]]", issuer: "[[issuer]]", year: "[[year]]" },
    { name: "[[TALA: certificate]]", issuer: "[[issuer]]", year: "[[year]]" },
  ],
} as const;

export const finalCta = {
  title: "Have a process that eats your team's time?",
  accent: "Let's automate it.",
  placeholder: "e.g. We copy every new order from email into a spreadsheet by hand…",
} as const;
