// Generates the project covers in public/projects/covers. Run: node scripts/make-covers.mjs
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const W = 1280;
const H = 800;
const BOX = { x: 72, y: 250, w: W - 144 };
const OUT = "public/projects/covers";

const covers = [
  {
    slug: "ai-marketing-team",
    label: "AUTOMATION · MULTI-AGENT",
    title: "AI Marketing Team",
    sub: "An orchestrator with content, calendar and analyst agents",
    shot: "public/projects/ai-marketing-team/agents.png",
  },
  {
    slug: "clinic-ai-receptionist",
    label: "AUTOMATION · RAG",
    title: "AI Receptionist",
    sub: "Answers by text and voice, only from approved clinic information",
    shot: "public/projects/clinic-ai-receptionist/agent.png",
  },
  {
    slug: "telegram-ai-assistant",
    label: "AUTOMATION · PERSONAL ASSISTANT",
    title: "AI Personal Assistant",
    sub: "Tasks and calendar, handled from one Telegram message",
  },
  {
    slug: "ai-rank",
    label: "AI PRODUCT · CO-FOUNDER & CEO",
    title: "AI Rank",
    sub: "Discover, compare and rate 600 AI tools, Arabic first",
    shot: "public/projects/ai-rank/home.png",
  },
  {
    slug: "shadow-ai-detector",
    label: "AI PRODUCT · NATIONAL FINALIST",
    title: "Shadow AI Detector",
    sub: "Warns you before sensitive data reaches an AI tool",
    shot: "public/projects/shadow-ai-detector/home.png",
  },
  {
    slug: "modavi",
    label: "AI PRODUCT · CLIENT PROJECT",
    title: "Modavi",
    sub: "An AI stylist for the clothes you already own",
    shot: "public/projects/modavi/outfits.png",
  },
  {
    slug: "wejhet-ashwas",
    label: "PRODUCT · STUDY PLATFORM",
    title: "Wejhet Ashwas",
    sub: "An offline-first study companion for Tawjihi students",
    shot: "public/projects/wejhet-ashwas/pomodoro.png",
  },
  {
    slug: "maha-store",
    label: "CLIENT WORK · E-COMMERCE",
    title: "Maha Store",
    sub: "A women's fashion store with admin dashboards",
    shot: "public/projects/maha-store/home.png",
  },
];

const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");

function background({ label, title, sub }) {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="88%" cy="0%" r="75%">
        <stop offset="0%" stop-color="#e63946" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="#e63946" stop-opacity="0"/>
      </radialGradient>
      <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.6" fill="#ffffff" fill-opacity="0.09"/>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="#0a0a0a"/>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <text x="72" y="82" font-family="Consolas" font-size="23" letter-spacing="3" fill="#a1a1a1"><tspan fill="#ef5a66">//</tspan> ${escape(label)}</text>
    <text x="70" y="160" font-family="Segoe UI" font-weight="600" font-size="70" letter-spacing="-1.5" fill="#f5f5f5">${escape(title)}</text>
    <text x="72" y="212" font-family="Segoe UI" font-size="29" fill="#a1a1a1">${escape(sub)}</text>
  </svg>`;
}

function roundedTopMask(w, h, radius) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><path d="M0 ${h}V${radius}Q0 0 ${radius} 0H${w - radius}Q${w} 0 ${w} ${radius}V${h}Z" fill="#fff"/></svg>`,
  );
}

function windowFrame(w, h) {
  const r = 18;
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 ${h}V${r}Q1 1 ${r} 1H${w - r}Q${w - 1} 1 ${w - 1} ${r}V${h}" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
      <circle cx="30" cy="24" r="6.5" fill="#e63946"/>
      <circle cx="52" cy="24" r="6.5" fill="#ffffff" fill-opacity="0.2"/>
      <circle cx="74" cy="24" r="6.5" fill="#ffffff" fill-opacity="0.2"/>
    </svg>`,
  );
}

const BAR = 48;

async function screenshotWindow(file, w, h) {
  const shot = await sharp(file)
    .resize({ width: w, height: h - BAR, fit: "cover", position: "top" })
    .toBuffer();
  const panel = await sharp({ create: { width: w, height: h, channels: 4, background: "#171717" } })
    .composite([
      { input: shot, left: 0, top: BAR },
      { input: windowFrame(w, h), left: 0, top: 0 },
      { input: roundedTopMask(w, h, 18), blend: "dest-in" },
    ])
    .png()
    .toBuffer();
  return panel;
}

// The assistant has no screenshot, so this draws the real workflow's main path.
function workflowWindow(w, h) {
  const nodes = [
    { x: 56, y: 170, label: "Telegram", kind: "trigger", on: false },
    { x: 354, y: 170, label: "AI Agent", kind: "agent", on: true },
    { x: 652, y: 76, label: "tasks_agent", kind: "agent", on: false },
    { x: 652, y: 264, label: "calendar_agent", kind: "agent", on: false },
  ];
  const nw = 240;
  const nh = 88;
  const link = (a, b) => {
    const x1 = a.x + nw;
    const y1 = a.y + nh / 2;
    const x2 = b.x;
    const y2 = b.y + nh / 2;
    const mid = (x1 + x2) / 2;
    return `<path d="M${x1} ${y1}C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}" fill="none" stroke="#ef5a66" stroke-width="3" stroke-opacity="0.75"/>`;
  };
  const box = (node) => `
    <rect x="${node.x}" y="${node.y}" width="${nw}" height="${nh}" rx="16" fill="#1a1a1a" stroke="${node.on ? "#e63946" : "#ffffff"}" stroke-opacity="${node.on ? 1 : 0.22}" stroke-width="2"/>
    <text x="${node.x + 24}" y="${node.y + 40}" font-family="Segoe UI" font-weight="600" font-size="25" fill="#f5f5f5">${node.label}</text>
    <text x="${node.x + 24}" y="${node.y + 68}" font-family="Consolas" font-size="19" fill="#858585">${node.kind}</text>`;
  const outputs = [
    { y: 58, label: "Supabase" },
    { y: 112, label: "Google Tasks" },
    { y: 246, label: "Google Calendar" },
    { y: 300, label: "Morning brief" },
  ];
  const chips = outputs
    .map(
      (o) => `<rect x="924" y="${o.y}" width="172" height="42" rx="21" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.5"/>
      <text x="1010" y="${o.y + 27}" text-anchor="middle" font-family="Consolas" font-size="16" fill="#a1a1a1">${o.label}</text>`,
    )
    .join("");
  return Buffer.from(
    `<svg width="${w}" height="${h - BAR}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#111111"/>
      ${link(nodes[0], nodes[1])}${link(nodes[1], nodes[2])}${link(nodes[1], nodes[3])}
      ${nodes.map(box).join("")}
      ${chips}
    </svg>`,
  );
}

async function drawnWindow(w, h) {
  const drawing = await sharp(workflowWindow(w, h)).png().toBuffer();
  return sharp({ create: { width: w, height: h, channels: 4, background: "#171717" } })
    .composite([
      { input: drawing, left: 0, top: BAR },
      { input: windowFrame(w, h), left: 0, top: 0 },
      { input: roundedTopMask(w, h, 18), blend: "dest-in" },
    ])
    .png()
    .toBuffer();
}

mkdirSync(OUT, { recursive: true });
for (const cover of covers) {
  const height = H - BOX.y;
  const panel = cover.shot ? await screenshotWindow(cover.shot, BOX.w, height) : await drawnWindow(BOX.w, height);
  await sharp(Buffer.from(background(cover)))
    .composite([{ input: panel, left: BOX.x, top: BOX.y }])
    .webp({ quality: 86 })
    .toFile(`${OUT}/${cover.slug}.webp`);
  console.log(cover.slug);
}
