"use client";

import type { WorkflowScenario } from "@/content/workflows/types";
import { JsonView, StepOutput } from "./OutputViews";
import ResultView from "./ResultView";
import type { Replay } from "./useReplay";

const label = "mb-2 font-mono text-[0.65rem] tracking-[0.14em] text-text-dim uppercase";

/** Input, output and log for one finished step. Shared with the mobile list. */
export function StepDetails({
  scenario,
  index,
  typing,
}: {
  scenario: WorkflowScenario;
  index: number;
  typing: boolean;
}) {
  const step = scenario.steps[index];
  return (
    <div className="space-y-4">
      {step.input !== undefined && (
        <div>
          <p className={label}>Input</p>
          {typeof step.input === "string" ? (
            <p dir="auto" className="text-sm text-text-muted">
              {step.input}
            </p>
          ) : (
            <JsonView value={step.input} />
          )}
        </div>
      )}
      <div>
        <p className={label}>Output</p>
        <StepOutput key={index} step={step} typing={typing} audioSrc={scenario.result.audioSrc} />
      </div>
    </div>
  );
}

export default function Inspector({
  scenario,
  replay,
}: {
  scenario: WorkflowScenario;
  replay: Replay;
}) {
  const { inspected, status, isLive } = replay;
  const step = typeof inspected === "number" ? scenario.steps[inspected] : undefined;
  const node = step && scenario.nodes.find((n) => n.id === step.nodeId);

  return (
    <aside aria-label="Node inspector" className="flex h-full min-h-0 flex-col bg-surface-2">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <p className="min-w-0 truncate font-mono text-xs text-text-muted">
          {inspected === "result" ? "result" : node ? node.label : "inspector"}
          {node && <span className="text-text-dim"> · {node.kind}</span>}
        </p>
        {status === "done" && inspected !== "result" && (
          <button
            type="button"
            onClick={() => replay.pin("result")}
            className="shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-text-muted transition-colors hover:border-text-dim hover:text-text"
          >
            View result
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {inspected === "result" ? (
          <ResultView result={scenario.result} />
        ) : step ? (
          <>
            {step.log && <p className="mb-4 font-mono text-xs text-text-muted">› {step.log}</p>}
            <StepDetails scenario={scenario} index={inspected as number} typing={isLive} />
          </>
        ) : (
          <p className="text-sm leading-relaxed text-text-dim">
            Press Run. Each node&apos;s input and output will appear here as it finishes.
          </p>
        )}
      </div>
    </aside>
  );
}
