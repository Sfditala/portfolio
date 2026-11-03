import aiMarketingTeam from "./ai-marketing-team.json";
import clinicAiReceptionist from "./clinic-ai-receptionist.json";
import telegramAiAssistant from "./telegram-ai-assistant.json";
import type { WorkflowScenario } from "./types";

// JSON imports widen literal unions to string, so the shape is asserted here
// and checked by `npm run replay:check`.
export const scenarios = [
  aiMarketingTeam,
  clinicAiReceptionist,
  telegramAiAssistant,
] as unknown as WorkflowScenario[];

export const scenarioForProject = (slug: string) =>
  scenarios.find((s) => s.projectSlug === slug);
