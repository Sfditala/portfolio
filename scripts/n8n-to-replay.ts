/**
 * First-pass conversion of an n8n execution into a replay scenario.
 *
 *   npm run replay:convert -- execution.json --project ai-marketing-team --out out.json
 *   npm run replay:check
 *
 * See src/content/workflows/README.md. Review the output before publishing it.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CANVAS } from "../src/content/workflows/types.ts";
import type {
  NodeKind,
  ReplayEdge,
  ReplayNode,
  ReplayStep,
  StepView,
  WorkflowScenario,
} from "../src/content/workflows/types.ts";

type N8nNode = { name: string; type: string; position: [number, number] };
type N8nConnections = Record<string, Record<string, { node: string }[][]>>;
type N8nRun = {
  startTime: number;
  executionTime: number;
  executionStatus?: string;
  error?: unknown;
  inputOverride?: Record<string, { json: unknown }[][]>;
  data?: Record<string, { json: unknown }[][]>;
};
type N8nExecution = {
  data?: { resultData?: { runData?: Record<string, N8nRun[]> } } | string;
  workflowData?: { nodes: N8nNode[]; connections: N8nConnections };
};

const SECRET_KEY = /token|secret|password|api.?key|authorization|credential|cookie|chat_?id/i;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const PHONE = /\+?\d[\d\s().-]{7,}\d/g;

/** Masks obvious secrets and contact details. It is a safety net, not a guarantee. */
function redact(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(EMAIL, "<email>").replace(PHONE, "<phone>");
  }
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, SECRET_KEY.test(k) ? "<redacted>" : redact(v)]),
    );
  }
  return value;
}

function kindOf(type: string, name: string): NodeKind {
  const t = `${type} ${name}`.toLowerCase();
  if (t.includes("trigger") || t.includes("webhook")) return "trigger";
  if (t.includes("agent")) return "agent";
  if (t.includes("lmchat") || t.includes("languagemodel")) return "llm";
  if (t.includes("vectorstore") || t.includes("pinecone")) return "rag";
  if (t.includes("elevenlabs")) return "voice";
  if (/supabase|postgres|googlesheets|mongo|redis/.test(t)) return "db";
  if (t.includes("telegram") || t.includes("respond")) return "output";
  return "tool";
}

function iconOf(type: string, kind: NodeKind): string {
  const t = type.toLowerCase();
  for (const [needle, icon] of [
    ["telegram", "telegram"],
    ["googlesheets", "sheets"],
    ["googletasks", "tasks"],
    ["googlecalendar", "calendar"],
    ["supabase", "supabase"],
    ["gemini", "gemini"],
    ["elevenlabs", "elevenlabs"],
    ["mcp", "mcp"],
    ["pinecone", "vector"],
  ]) {
    if (t.includes(needle)) return icon;
  }
  return kind === "agent" || kind === "llm" ? "bot" : "tool";
}

const firstItems = (ports?: Record<string, { json: unknown }[][]>) =>
  ports ? (Object.values(ports)[0]?.[0] ?? []).map((item) => item.json) : [];

const unwrap = (items: unknown[]) => (items.length === 1 ? items[0] : items);

function toOutput(items: unknown[]): { output: unknown; view: StepView } {
  const flat = items.every(
    (i) => i && typeof i === "object" && Object.values(i).every((v) => typeof v !== "object"),
  );
  if (items.length > 1 && flat) {
    const columns = Object.keys(items[0] as object);
    const rows = items.map((i) => columns.map((c) => String((i as Record<string, unknown>)[c] ?? "")));
    return { output: { columns, rows }, view: "table" };
  }
  const single = unwrap(items);
  if (single && typeof single === "object" && !Array.isArray(single)) {
    const text = (single as Record<string, unknown>).output ?? (single as Record<string, unknown>).text;
    if (typeof text === "string") return { output: text, view: "text" };
  }
  return { output: single, view: "json" };
}

function findPrompt(output: unknown): string {
  const o = output as { text?: string; chatInput?: string; message?: { text?: string } } | null;
  return o?.message?.text ?? o?.text ?? o?.chatInput ?? "[[TALA: trigger message]]";
}

function convert(execution: N8nExecution, projectSlug: string): WorkflowScenario {
  if (typeof execution.data === "string") {
    throw new Error("This export stores data in a compressed form. Fetch it from the n8n API with ?includeData=true (see README).");
  }
  const runData = execution.data?.resultData?.runData;
  const workflow = execution.workflowData;
  if (!runData || !workflow) {
    throw new Error("Expected data.resultData.runData and workflowData in the export.");
  }

  const executed = workflow.nodes.filter((n) => runData[n.name]);
  const ids = new Map(executed.map((n, i) => [n.name, `n${i + 1}`]));

  // Fit n8n's coordinates inside the canvas, keeping room for the node itself.
  const xs = executed.map((n) => n.position[0]);
  const ys = executed.map((n) => n.position[1]);
  const [minX, minY] = [Math.min(...xs), Math.min(...ys)];
  const spanX = Math.max(...xs) - minX || 1;
  const spanY = Math.max(...ys) - minY || 1;
  const margin = 16;
  const usableX = CANVAS.width - CANVAS.nodeWidth - margin * 2;
  const usableY = CANVAS.height - CANVAS.nodeHeight - margin * 2;

  const nodes: ReplayNode[] = executed.map((n) => {
    const kind = kindOf(n.type, n.name);
    return {
      id: ids.get(n.name) as string,
      label: n.name,
      kind,
      icon: iconOf(n.type, kind),
      position: {
        x: Math.round(margin + ((n.position[0] - minX) / spanX) * usableX),
        y: Math.round(margin + ((n.position[1] - minY) / spanY) * usableY),
      },
    };
  });

  const edges: ReplayEdge[] = [];
  for (const [from, ports] of Object.entries(workflow.connections)) {
    for (const [port, outputs] of Object.entries(ports)) {
      for (const target of outputs.flat()) {
        const a = ids.get(from);
        const b = ids.get(target.node);
        if (!a || !b) continue;
        // n8n points ai_* connections from the sub-node to its agent; flip them.
        edges.push(port.startsWith("ai_") ? { from: b, to: a } : { from: a, to: b });
      }
    }
  }

  const steps: ReplayStep[] = Object.entries(runData)
    .flatMap(([name, runs]) => runs.map((run) => ({ name, run })))
    .filter(({ name }) => ids.has(name))
    .sort((a, b) => a.run.startTime - b.run.startTime)
    .map(({ name, run }) => {
      const { output, view } = toOutput(firstItems(run.data));
      const input = firstItems(run.inputOverride);
      const failed = run.executionStatus === "error" || Boolean(run.error);
      return {
        nodeId: ids.get(name) as string,
        // Real timings vary too much to watch; keep the replay readable.
        durationMs: Math.min(Math.max(run.executionTime, 500), 1800),
        ...(input.length ? { input: redact(unwrap(input)) } : {}),
        output: redact(output),
        view,
        log: `${run.executionTime} ms`,
        ...(failed ? { status: "error" as const } : {}),
      };
    });

  const last = steps[steps.length - 1];
  return {
    id: projectSlug,
    projectSlug,
    title: "[[TALA: scenario title]]",
    prompt: findPrompt(steps[0]?.output),
    nodes,
    edges,
    steps,
    result: { type: "text", data: last?.output ?? "" },
  };
}

function check(path: string): string[] {
  const s = JSON.parse(readFileSync(path, "utf8")) as WorkflowScenario;
  const problems: string[] = [];
  const ids = new Set(s.nodes.map((n) => n.id));
  if (ids.size !== s.nodes.length) problems.push("duplicate node ids");
  for (const n of s.nodes) {
    const { x, y } = n.position;
    if (x < 0 || y < 0 || x + CANVAS.nodeWidth > CANVAS.width || y + CANVAS.nodeHeight > CANVAS.height) {
      problems.push(`node ${n.id} is outside the canvas`);
    }
  }
  for (const e of s.edges) {
    if (!ids.has(e.from) || !ids.has(e.to)) problems.push(`edge ${e.from}->${e.to} references a missing node`);
  }
  s.steps.forEach((step, i) => {
    if (!ids.has(step.nodeId)) problems.push(`step ${i} references missing node ${step.nodeId}`);
    if (!(step.durationMs > 0)) problems.push(`step ${i} needs a positive durationMs`);
  });
  if (!s.steps.length) problems.push("no steps");
  if (!s.result) problems.push("no result");
  return problems;
}

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

if (args[0] === "--check") {
  const dir = "src/content/workflows";
  const files = args.length > 1
    ? args.slice(1)
    : readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => join(dir, f));
  let failed = false;
  for (const file of files) {
    const problems = check(file);
    console.log(`${problems.length ? "FAIL" : "ok  "} ${file}`);
    for (const problem of problems) console.log(`     ${problem}`);
    failed ||= problems.length > 0;
  }
  process.exit(failed ? 1 : 0);
}

const inputPath = args[0];
const project = flag("--project");
if (!inputPath || !project) {
  console.error("Usage: n8n-to-replay <execution.json> --project <slug> [--out <file>]");
  process.exit(1);
}

const scenario = convert(JSON.parse(readFileSync(inputPath, "utf8")) as N8nExecution, project);
const json = `${JSON.stringify(scenario, null, 2)}\n`;
const out = flag("--out");
if (out) {
  writeFileSync(out, json);
  console.log(`Wrote ${out}: ${scenario.nodes.length} nodes, ${scenario.steps.length} steps. Review it before publishing.`);
} else {
  process.stdout.write(json);
}
