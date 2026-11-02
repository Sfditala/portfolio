export type ProjectCategory = "automation" | "ai-product" | "client-work";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  label: string;
  summary: string;
  stack: string[];
  liveUrl?: string;
  image?: string;
};

// TODO(tala): results, screenshots and demo videos per project.
export const projects: Project[] = [
  {
    slug: "ai-marketing-team",
    title: "AI Marketing Team",
    category: "automation",
    label: "Automation · Multi-agent",
    summary:
      "A multi-agent marketing team for a café, built in n8n. An Orchestrator Agent delegates to Content, Calendar and Analyst agents, with RAG over brand knowledge, Google Sheets as the content calendar and Telegram as the interface.",
    stack: ["n8n", "Gemini", "Pinecone", "Google Sheets", "Telegram"],
  },
  {
    slug: "telegram-ai-assistant",
    title: "AI Personal Assistant (Telegram)",
    category: "automation",
    label: "Automation · Personal assistant",
    summary:
      "A conversational Telegram assistant. A main agent routes to Tasks and Calendar sub-agents, stores tasks in Supabase synced to Google Tasks, and sends a morning schedule and a weekly report.",
    stack: ["n8n", "Supabase", "Google Tasks", "Google Calendar", "Telegram"],
  },
  {
    slug: "restaurant-voice-agent",
    title: "Restaurant Voice Agent",
    category: "automation",
    label: "Automation · Voice",
    summary:
      "A bilingual (AR/EN) voice agent that takes takeaway orders for restaurants and cafés, reading the menu and writing orders through an n8n MCP server.",
    stack: ["ElevenLabs", "n8n MCP Server", "Google Sheets"],
  },
  {
    slug: "shadow-ai-detector",
    title: "Shadow AI Detector",
    category: "ai-product",
    label: "AI Product · Built solo",
    summary:
      "A security platform and browser extension with a custom-trained ML model that detects sensitive data being exposed to AI tools.",
    stack: ["Next.js", "FastAPI", "Python", "Hugging Face"],
    liveUrl: "https://shadowai-frontend-beta.vercel.app/",
    image: "/shadow.png",
  },
  {
    slug: "modavi",
    title: "Modavi",
    category: "ai-product",
    label: "AI Product · Client project",
    summary:
      "An AI stylist platform with personalized outfit coordination and style profiling.",
    stack: ["Next.js", "Supabase", "Clerk", "Cloudinary"],
    liveUrl: "https://modavi.vercel.app/",
    image: "/modavi.png",
  },
  {
    slug: "maha-store",
    title: "Maha Store",
    category: "client-work",
    label: "Client Work",
    summary: "A full e-commerce store with admin dashboards.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    liveUrl: "https://mahastore-ecommerce.vercel.app/",
    image: "/Maha.png",
  },
];

export const projectUrl = (slug: string) => `/work/${slug}`;
