"use client";

import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { SPEEDS, type Replay } from "./useReplay";

const secondary =
  "flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 font-mono text-xs text-text-muted transition-colors hover:border-text-dim hover:text-text disabled:pointer-events-none disabled:opacity-40";

export default function ReplayControls({ replay }: { replay: Replay }) {
  const { status, speed } = replay;
  const running = status === "running";
  const primaryLabel = running ? "Pause" : status === "paused" ? "Resume" : status === "done" ? "Run again" : "Run";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={running ? replay.pause : replay.run}
        className="flex h-9 items-center gap-1.5 rounded-lg bg-accent-solid px-3.5 text-sm font-medium text-text transition-transform active:scale-[0.97]"
      >
        {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={replay.step}
        disabled={status === "done"}
        aria-label="Step to the next node"
        className={secondary}
      >
        <StepForward className="size-3.5" /> Step
      </button>
      <button
        type="button"
        onClick={replay.replay}
        disabled={status === "idle"}
        aria-label="Replay from the start"
        className={secondary}
      >
        <RotateCcw className="size-3.5" /> Replay
      </button>
      <div role="radiogroup" aria-label="Playback speed" className="flex h-9 items-center rounded-lg border border-border p-0.5">
        {SPEEDS.map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={speed === value}
            onClick={() => replay.setSpeed(value)}
            className={`h-full rounded-md px-2 font-mono text-xs transition-colors ${
              speed === value ? "bg-white/10 text-text" : "text-text-dim hover:text-text"
            }`}
          >
            {value}×
          </button>
        ))}
      </div>
    </div>
  );
}
