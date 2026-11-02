export type ProjectCategory = "automation" | "ai-product" | "client-work";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  label: string;
  summary: string;
  stack: string[];
  /** English and Arabic terms the agent matches against a visitor's problem. */
  keywords: string[];
  liveUrl?: string;
  /** Logo cover on a white background; shown inverted until screenshots exist. */
  image?: string;
  /** Real screenshots, in /public/projects/<slug>/. The first also becomes the cover. */
  screenshots?: { src: string; alt: string }[];
  /** Demo video, in /public/projects/<slug>/. */
  demoVideo?: string;
  // Case study page.
  problem: string;
  solution: string;
  capabilities: string[];
  /** Only real outcomes. Empty shows a [[TALA]] placeholder. */
  results: string[];
  /** Null shows a [[TALA]] placeholder. */
  role: string | null;
};

export const categories: { id: ProjectCategory; title: string; description: string }[] = [
  {
    id: "automation",
    title: "Automation case studies",
    description: "Agents and workflows you can watch run, node by node.",
  },
  {
    id: "ai-product",
    title: "AI products",
    description: "Full products with AI at the core.",
  },
  {
    id: "client-work",
    title: "Client work",
    description: "Full-stack builds for clients.",
  },
];

// TODO(tala): review the problem, solution and role copy (drafted only from the brief),
// then add real results, screenshots and demo videos per project.
export const projects: Project[] = [
  {
    slug: "ai-marketing-team",
    title: "AI Marketing Team",
    category: "automation",
    label: "Automation · Multi-agent",
    summary:
      "A multi-agent marketing team for a café, built in n8n. An Orchestrator Agent delegates to Content, Calendar and Analyst agents, with RAG over brand knowledge, Google Sheets as the content calendar and Telegram as the interface.",
    stack: ["n8n", "Gemini", "Pinecone", "Google Sheets", "Telegram", "Voice agent"],
    keywords: ["marketing","content","social media","instagram","posts","campaign","brand","cafe","café","تسويق","محتوى","سوشال","انستغرام","انستجرام","منشورات","بوستات","حملات","مقهى","كافيه"],
    problem:
      "Marketing a café means repeating the same cycle every week: deciding what to post, writing it in the brand's voice, and keeping a content calendar up to date. It's steady work that takes time away from running the café.",
    solution:
      "A team of agents in n8n that you talk to through Telegram. An Orchestrator Agent decides who does what, with no IF or Switch routing, and delegates to specialist agents. RAG over brand knowledge keeps the work in the café's voice, and the plan lands in a Google Sheet.",
    capabilities: [
      "Takes requests in plain language through Telegram, plus a voice agent",
      "Orchestrator Agent delegates by reasoning, not hard-coded routing",
      "Content, Calendar and Analyst agents each handle their own part",
      "RAG over brand knowledge in Pinecone, with Gemini as the model",
      "Google Sheets as the shared content calendar",
    ],
    results: [],
    role: "Designed and built the full system: agents, prompts, knowledge base and integrations.",
  },
  {
    slug: "telegram-ai-assistant",
    title: "AI Personal Assistant (Telegram)",
    category: "automation",
    label: "Automation · Personal assistant",
    summary:
      "A conversational Telegram assistant. A main agent routes to Tasks and Calendar sub-agents, stores tasks in Supabase synced to Google Tasks, and sends a morning schedule and a weekly report.",
    stack: ["n8n", "Supabase", "Google Tasks", "Google Calendar", "Telegram"],
    keywords: ["assistant","tasks","task","reminder","remind","schedule","calendar","meeting","telegram","productivity","مساعد","مهام","مهمة","تذكير","جدول","مواعيد","موعد","اجتماع","تلغرام","تيليجرام","تلجرام"],
    problem:
      "Tasks and meetings live in separate apps, and adding one means stopping what you're doing to open them. Most bots don't help much, because they make you learn slash commands.",
    solution:
      "An assistant you simply message, with no commands to learn. A main agent understands the request and routes it to a Tasks agent or a Calendar agent, so one message can create a task and book a meeting at the same time.",
    capabilities: [
      "Fully conversational, with no slash commands",
      "List, add, complete, rename and delete tasks",
      "Tasks stored in Supabase and synced to Google Tasks",
      "A Calendar agent working on Google Calendar",
      "A morning schedule and a weekly report, sent automatically",
      "Replies in Palestinian Arabic",
    ],
    results: [],
    role: "Designed and built the full system: agents, prompts, database and integrations.",
  },
  {
    slug: "restaurant-voice-agent",
    title: "Restaurant Voice Agent",
    category: "automation",
    label: "Automation · Voice",
    summary:
      "A bilingual (AR/EN) voice agent that takes takeaway orders for restaurants and cafés, reading the menu and writing orders through an n8n MCP server.",
    stack: ["ElevenLabs", "n8n MCP Server", "Google Sheets"],
    keywords: ["voice","phone","call","calls","order","orders","restaurant","booking","bookings","reservation","takeaway","customer support","صوت","صوتي","تلفون","هاتف","مكالمات","طلبات","طلب","مطعم","مطاعم","حجز","حجوزات","خدمة العملاء","دعم العملاء"],
    problem:
      "Takeaway orders arrive by phone, often when staff are busiest. Every call needs someone to answer it, go through the menu and write the order down correctly.",
    solution:
      "A voice agent that answers the call in Arabic or English, checks the live menu, takes the order and confirms it out loud. ElevenLabs handles the conversation, and an n8n MCP Server Trigger gives it tools to read the menu and write the order to Google Sheets.",
    capabilities: [
      "Takes takeaway orders by voice, in Arabic or English",
      "Built for Italian and British restaurants and cafés",
      "Reads the menu through a get_menu tool",
      "Writes orders through a create_order tool",
      "Google Sheets as the menu and the order log",
    ],
    results: [],
    role: "Designed and built the full system: voice agent, tools and integrations.",
  },
  {
    slug: "shadow-ai-detector",
    title: "Shadow AI Detector",
    category: "ai-product",
    label: "AI Product · Built solo",
    summary:
      "A security platform and browser extension with a custom-trained ML model that detects sensitive data being exposed to AI tools.",
    stack: ["Next.js", "FastAPI", "Python", "Hugging Face"],
    keywords: ["security","sensitive","data leak","privacy","compliance","machine learning","browser extension","أمن","أمان","حساسة","تسريب","خصوصية","تعلم آلي"],
    liveUrl: "https://shadowai-frontend-beta.vercel.app/",
    image: "/shadow.png",
    problem:
      "People paste work into AI tools every day, and sensitive data can leave with it without anyone noticing.",
    solution:
      "A security platform paired with a browser extension. A custom-trained ML model detects sensitive data being exposed to AI tools.",
    capabilities: [
      "Browser extension that works where people use AI tools",
      "Custom-trained ML model for detecting sensitive data",
      "Security platform built with Next.js, FastAPI and Python",
    ],
    results: [],
    role: "Built solo.",
  },
  {
    slug: "modavi",
    title: "Modavi",
    category: "ai-product",
    label: "AI Product · Client project",
    summary:
      "An AI stylist platform with personalized outfit coordination and style profiling.",
    stack: ["Next.js", "Supabase", "Clerk", "Cloudinary"],
    keywords: ["fashion","style","stylist","outfit","clothes","recommendation","موضة","أزياء","ستايل","ملابس","توصيات"],
    liveUrl: "https://modavi.vercel.app/",
    image: "/modavi.png",
    problem: "Deciding what to wear and what goes together is personal, and generic advice rarely fits.",
    solution: "An AI stylist platform that learns a person's style and coordinates outfits around it.",
    capabilities: ["Personalized outfit coordination", "Style profiling"],
    results: [],
    role: null,
  },
  {
    slug: "maha-store",
    title: "Maha Store",
    category: "client-work",
    label: "Client Work",
    summary: "A full e-commerce store with admin dashboards.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    keywords: ["store","shop","e-commerce","ecommerce","admin","dashboard","متجر","تجارة","لوحة تحكم"],
    liveUrl: "https://mahastore-ecommerce.vercel.app/",
    image: "/Maha.png",
    problem: "An online store needs both a shop for customers and a way to run it behind the scenes.",
    solution: "A full e-commerce store with admin dashboards for managing it.",
    capabilities: ["Full e-commerce storefront", "Admin dashboards"],
    results: [],
    role: null,
  },
];

export const projectUrl = (slug: string) => `/work/${slug}`;

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
