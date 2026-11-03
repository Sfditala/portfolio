export type NodeKind = "trigger" | "agent" | "tool" | "llm" | "db" | "rag" | "output" | "voice";

export type ReplayNode = {
  id: string;
  label: string;
  kind: NodeKind;
  /** Key from the registry in components/workflow/icons.tsx. */
  icon: string;
  position: { x: number; y: number };
};

export type ReplayEdge = { from: string; to: string; label?: string };

export type StepView = "json" | "chat" | "table" | "audio" | "text";

export type ReplayStep = {
  nodeId: string;
  durationMs: number;
  input?: unknown;
  output: unknown;
  log?: string;
  view?: StepView;
  status?: "success" | "error";
};

export type ReplayResult = {
  type: "telegram" | "sheet" | "order" | "text";
  data: unknown;
  audioSrc?: string;
};

export type WorkflowScenario = {
  id: string;
  projectSlug: string;
  title: string;
  /** The user's trigger message. */
  prompt: string;
  /** English version, shown under a prompt in another language. */
  promptTranslation?: string;
  /** Where a real run came from, shown beside the replay. */
  runNote?: string;
  nodes: ReplayNode[];
  edges: ReplayEdge[];
  steps: ReplayStep[];
  result: ReplayResult;
  /** True until replaced by a real n8n execution; the UI labels it as sample data. */
  _placeholder?: boolean;
};

/** Logical canvas size. Node positions are in this coordinate space. */
export const CANVAS = { width: 1040, height: 520, nodeWidth: 156, nodeHeight: 64 } as const;
