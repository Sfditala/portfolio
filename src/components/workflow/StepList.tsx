"use client";

import { Check, Loader2, X } from "lucide-react";
import type { WorkflowScenario } from "@/content/workflows/types";
import { NodeIcon } from "./icons";
import { StepDetails } from "./Inspector";
import ResultView from "./ResultView";
import type { Replay } from "./useReplay";

/** The phone layout: same data and states as the canvas, as a vertical list. */
export default function StepList({
  scenario,
  replay,
}: {
  scenario: WorkflowScenario;
  replay: Replay;
}) {
  const { cursor, status, inspected, isLive } = replay;

  return (
    <div className="p-4">
      <ol>
        {scenario.steps.map((step, i) => {
          const node = scenario.nodes.find((n) => n.id === step.nodeId);
          const finished = i < cursor;
          const running = i === cursor && status !== "done";
          const failed = finished && step.status === "error";
          const open = inspected === i;
          const last = i === scenario.steps.length - 1;

          return (
            <li key={i} className="relative pb-3 last:pb-0">
              {!last && (
                <span
                  aria-hidden
                  className={`absolute top-10 bottom-0 left-[19px] w-px transition-colors duration-300 ${finished ? "bg-accent" : "bg-white/15"}`}
                />
              )}
              <button
                type="button"
                disabled={!finished}
                aria-expanded={open}
                onClick={() => replay.pin(i)}
                className="relative flex w-full items-center gap-3 rounded-lg text-left"
              >
                <span
                  className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl border bg-surface-2 transition-colors duration-200 ${
                    failed
                      ? "border-accent text-text"
                      : finished
                        ? "border-success/60 text-text"
                        : running
                          ? "animate-pulse border-accent text-text"
                          : "border-white/15 text-text-dim"
                  }`}
                >
                  <NodeIcon name={node?.icon ?? "tool"} size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-sm font-medium ${finished || running ? "text-text" : "text-text-muted"}`}>
                    {node?.label ?? step.nodeId}
                  </span>
                  <span className="block truncate font-mono text-[0.7rem] text-text-dim">
                    {finished || running ? (step.log ?? node?.kind) : node?.kind}
                  </span>
                </span>
                {running && <Loader2 aria-hidden className="size-4 shrink-0 animate-spin text-accent-bright" />}
                {finished && !failed && <Check aria-hidden className="size-4 shrink-0 text-success" />}
                {failed && <X aria-hidden className="size-4 shrink-0 text-accent-bright" />}
              </button>

              {open && (
                <div className="mt-3 ml-13 rounded-xl border border-border bg-surface-2 p-3.5">
                  <StepDetails scenario={scenario} index={i} typing={isLive} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {status === "done" && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-3 font-mono text-[0.65rem] tracking-[0.14em] text-text-dim uppercase">Result</p>
          <ResultView result={scenario.result} />
        </div>
      )}
    </div>
  );
}
