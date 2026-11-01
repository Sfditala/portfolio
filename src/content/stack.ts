import {
  siElevenlabs,
  siFastapi,
  siGooglegemini,
  siGooglesheets,
  siHuggingface,
  siModelcontextprotocol,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTelegram,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type StackItem = {
  name: string;
  /** Brand icon; tools without one in simple-icons render as a mono wordmark. */
  icon?: SimpleIcon;
};

export const stackGroups: { label: string; items: StackItem[] }[] = [
  {
    label: "agents & automation",
    items: [
      { name: "n8n", icon: siN8n },
      { name: "MCP", icon: siModelcontextprotocol },
      { name: "Telegram", icon: siTelegram },
      { name: "Google Sheets", icon: siGooglesheets },
    ],
  },
  {
    label: "models & voice",
    items: [
      { name: "OpenAI" },
      { name: "Gemini", icon: siGooglegemini },
      { name: "Groq" },
      { name: "ElevenLabs", icon: siElevenlabs },
      { name: "Hugging Face", icon: siHuggingface },
    ],
  },
  {
    label: "data & rag",
    items: [
      { name: "Pinecone" },
      { name: "Supabase", icon: siSupabase },
      { name: "PostgreSQL", icon: siPostgresql },
    ],
  },
  {
    label: "build",
    items: [
      { name: "Python", icon: siPython },
      { name: "FastAPI", icon: siFastapi },
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
  },
];
