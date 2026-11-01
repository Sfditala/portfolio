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

export const aiRank = {
  name: "AI Rank",
  role: "Co-founder & CEO",
  pitch: "A platform for comparing AI tools and choosing the best tool for a given task.",
  // TODO(tala): AI Rank URL, screenshot(s) and 2–3 key features.
  url: "",
} as const;
