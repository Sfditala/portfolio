import { Bot, DatabaseZap, Volume2, Wrench, type LucideIcon } from "lucide-react";
import {
  siElevenlabs,
  siGooglecalendar,
  siGooglegemini,
  siGooglesheets,
  siGoogletasks,
  siModelcontextprotocol,
  siSupabase,
  siTelegram,
  type SimpleIcon,
} from "simple-icons";

const brand: Record<string, SimpleIcon> = {
  telegram: siTelegram,
  sheets: siGooglesheets,
  tasks: siGoogletasks,
  calendar: siGooglecalendar,
  supabase: siSupabase,
  gemini: siGooglegemini,
  elevenlabs: siElevenlabs,
  mcp: siModelcontextprotocol,
};

const generic: Record<string, LucideIcon> = {
  bot: Bot,
  // Pinecone has no mark in simple-icons.
  vector: DatabaseZap,
  tool: Wrench,
  speaker: Volume2,
};

/** Renders as a nested <svg>, so it works inside the canvas and in plain HTML. */
export function NodeIcon({
  name,
  size,
  x,
  y,
}: {
  name: string;
  size: number;
  x?: number;
  y?: number;
}) {
  const icon = brand[name];
  if (icon) {
    return (
      <svg aria-hidden x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = generic[name] ?? Wrench;
  return <Icon aria-hidden x={x} y={y} width={size} height={size} />;
}
