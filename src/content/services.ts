export type Service = {
  id: "agents" | "automation" | "voice" | "rag" | "web-apps";
  title: string;
  outcome: string;
  /** A concrete example of what goes in and what comes out. */
  io: { in: string; out: string };
  tools: string[];
};

export const services: Service[] = [
  {
    id: "agents",
    title: "AI Agents & Assistants",
    outcome: "Agents that answer, decide and act inside your tools.",
    io: { in: "a customer message", out: "an answer + the action, done" },
    tools: ["OpenAI", "Gemini", "Groq", "MCP"],
  },
  {
    id: "automation",
    title: "Workflow Automation",
    outcome: "n8n pipelines that connect your apps and remove manual work.",
    io: { in: "a new order email", out: "a row in Sheets + a team alert" },
    tools: ["n8n", "Google Workspace", "Telegram", "Supabase"],
  },
  {
    id: "voice",
    title: "Voice Agents",
    outcome:
      "Phone or web voice assistants that take orders and bookings (bilingual AR/EN).",
    io: { in: "a phone call", out: "a logged order" },
    tools: ["ElevenLabs", "n8n", "MCP"],
  },
  {
    id: "rag",
    title: "RAG Knowledge Assistants",
    outcome: "Assistants grounded in your own documents and data.",
    io: { in: "your docs & data", out: "grounded answers" },
    tools: ["Pinecone", "pgvector", "Supabase"],
  },
  {
    id: "web-apps",
    title: "AI-Powered Web Apps",
    outcome: "Full-stack products with AI at the core.",
    io: { in: "an idea", out: "a shipped product" },
    tools: ["Next.js", "FastAPI", "Python", "Hugging Face"],
  },
];
