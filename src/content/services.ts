export type Service = {
  id: string;
  title: string;
  outcome: string;
  tools: string[];
};

export const services: Service[] = [
  {
    id: "agents",
    title: "AI Agents & Assistants",
    outcome: "Agents that answer, decide and act inside your tools.",
    tools: ["OpenAI", "Gemini", "Groq", "MCP"],
  },
  {
    id: "automation",
    title: "Workflow Automation",
    outcome: "n8n pipelines that connect your apps and remove manual work.",
    tools: ["n8n", "Google Workspace", "Telegram", "Supabase"],
  },
  {
    id: "voice",
    title: "Voice Agents",
    outcome:
      "Phone or web voice assistants that take orders and bookings (bilingual AR/EN).",
    tools: ["ElevenLabs", "n8n", "MCP"],
  },
  {
    id: "rag",
    title: "RAG Knowledge Assistants",
    outcome: "Assistants grounded in your own documents and data.",
    tools: ["Pinecone", "pgvector", "Supabase"],
  },
  {
    id: "web-apps",
    title: "AI-Powered Web Apps",
    outcome: "Full-stack products with AI at the core.",
    tools: ["Next.js", "FastAPI", "Python", "Hugging Face"],
  },
];
