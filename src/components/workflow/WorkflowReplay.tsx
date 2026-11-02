"use client";

import { useSyncExternalStore } from "react";
import Placeholder from "@/components/ui/Placeholder";
import { scenarioForProject } from "@/content/workflows";
import type { WorkflowScenario } from "@/content/workflows/types";
import Inspector from "./Inspector";
import ReplayControls from "./ReplayControls";
import StepList from "./StepList";
import { useReplay } from "./useReplay";
import WorkflowCanvas from "./WorkflowCanvas";

// Matches Tailwind's lg breakpoint. This component only renders on the client.
const DESKTOP = "(min-width: 1024px)";
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );

function ReplayPlayer({ scenario }: { scenario: WorkflowScenario }) {
  const replay = useReplay(scenario);
  const isDesktop = useIsDesktop();

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <ReplayControls replay={replay} />
        {scenario._placeholder ? (
          // TODO(tala): replace with a real n8n execution; the label then becomes "Replay of a real run".
          <Placeholder>Sample data · [[TALA: real n8n export]]</Placeholder>
        ) : (
          <p className="flex items-center gap-2 font-mono text-[0.68rem] tracking-wider text-text-dim uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            Replay of a real run
          </p>
        )}
      </div>

      <p dir="auto" className="border-b border-border bg-bg/60 px-4 py-2.5 text-sm text-text-muted">
        <span aria-hidden className="mr-2 font-mono text-accent-bright">
          ›
        </span>
        {scenario.prompt}
      </p>

      {isDesktop ? (
        <div className="grid xl:grid-cols-[1fr_320px]">
          <WorkflowCanvas scenario={scenario} replay={replay} />
          {/* Absolute inside the row so the canvas alone sets its height at xl. */}
          <div className="relative h-80 border-t border-border xl:h-auto xl:border-t-0 xl:border-l">
            <div className="absolute inset-0">
              <Inspector scenario={scenario} replay={replay} />
            </div>
          </div>
        </div>
      ) : (
        <StepList scenario={scenario} replay={replay} />
      )}

      <p aria-live="polite" className="sr-only">
        {replay.announcement}
      </p>
    </div>
  );
}

export default function WorkflowReplay({ projectSlug }: { projectSlug: string }) {
  const scenario = scenarioForProject(projectSlug);
  if (!scenario) return null;
  return <ReplayPlayer key={scenario.id} scenario={scenario} />;
}
