"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Bot, Check, Cpu, DatabaseZap, Loader2, RotateCcw } from "lucide-react";
import { siGooglesheets, siTelegram } from "simple-icons";
import BrandIcon from "@/components/ui/BrandIcon";
import { useInViewOnce, useReducedMotionPreference } from "@/lib/motion";

/*
 * Hero teaser of the Workflow Replay (full version in Phase 2).
 * Coordinates live in a 160×100 space so the SVG edges and the
 * percentage-positioned nodes line up at any width.
 * TODO(tala): replace with data from a real AI Marketing Team execution.
 */

type Status = "idle" | "running" | "success";

// step: 0 idle · 1 trigger · 2 agent · 3 sheets · 4 reply · 5 done
const LAST_STEP = 5;
const STEP_MS = [500, 700, 1900, 900, 900];

const LOG: Record<number, string> = {
  0: "waiting for trigger…",
  1: "telegram_trigger · message received",
  2: "orchestrator · content agent (rag) → calendar agent",
  3: "google_sheets · slot free · added after approval",
  4: "telegram · send confirmation",
  5: "run finished · 4 nodes · success",
};

const statusFor = (order: number, step: number): Status =>
  step > order ? "success" : step === order ? "running" : "idle";

function StatusBadge({ status }: { status: Status }) {
  if (status === "idle") return null;
  return (
    <span
      className={`absolute -top-[18%] -right-[18%] flex size-[2.6cqw] min-h-3.5 min-w-3.5 items-center justify-center rounded-full ${
        status === "success" ? "bg-success text-bg" : "bg-surface-2 text-accent-bright"
      }`}
    >
      {status === "success" ? (
        <Check className="size-[70%]" strokeWidth={3} />
      ) : (
        <Loader2 className="size-[80%] animate-spin" strokeWidth={3} />
      )}
    </span>
  );
}

const ring: Record<Status, string> = {
  idle: "border-border text-text-dim",
  running: "border-accent text-text shadow-[0_0_0_4px] shadow-accent/20 animate-pulse",
  success: "border-success/50 text-text",
};

function SquareNode({
  status,
  icon,
  label,
  position,
}: {
  status: Status;
  icon: ReactNode;
  label: string;
  position: string;
}) {
  return (
    <div className={`absolute aspect-square w-[10%] ${position}`}>
      <div
        className={`relative flex size-full items-center justify-center rounded-[22%] border bg-surface-2 transition-[border-color,color,box-shadow] duration-300 ${ring[status]}`}
      >
        {icon}
        <StatusBadge status={status} />
      </div>
      <p className="absolute top-full left-1/2 mt-[0.8cqw] w-[180%] -translate-x-1/2 text-center font-mono text-[max(8px,1.45cqw)] leading-tight text-balance text-text-muted">
        {label}
      </p>
    </div>
  );
}

function SubNode({ active, icon, label, position }: { active: boolean; icon: ReactNode; label: string; position: string }) {
  return (
    <div className={`absolute aspect-square w-[6.875%] ${position}`}>
      <div
        className={`flex size-full items-center justify-center rounded-full border bg-surface-2 transition-colors duration-300 ${
          active ? "border-accent/70 text-text" : "border-border text-text-dim"
        }`}
      >
        {icon}
      </div>
      <p className="absolute top-full left-1/2 mt-[0.6cqw] -translate-x-1/2 font-mono text-[max(8px,1.3cqw)] whitespace-nowrap text-text-dim">
        {label}
      </p>
    </div>
  );
}

function Edge({ d, drawn, dashed = false }: { d: string; drawn: boolean; dashed?: boolean }) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        className="stroke-white/15"
        strokeWidth={1.25}
        strokeDasharray={dashed ? "3 3" : undefined}
        vectorEffect="non-scaling-stroke"
      />
      {/* pathLength=1 lets the dash offset draw the line from start to end. */}
      <path
        d={d}
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={drawn ? 0 : 1}
        strokeWidth={1.75}
        className={`stroke-accent transition-[stroke-dashoffset] duration-500 ease-in-out ${drawn ? "" : "opacity-0"}`}
      />
    </g>
  );
}

export default function HeroWorkflow() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>("0px 0px -25% 0px");
  const reduce = useReducedMotionPreference();
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);

  // Advance one step at a time once the canvas is visible.
  useEffect(() => {
    if (reduce || !inView || step >= LAST_STEP) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS[step]);
    return () => clearTimeout(t);
  }, [inView, reduce, step, runId]);

  const s = reduce ? LAST_STEP : step;
  const done = s === LAST_STEP;

  const replay = () => {
    setStep(0);
    setRunId((n) => n + 1);
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/60"
    >
      {/* Canvas header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </span>
          <span className="truncate font-mono text-xs text-text-dim">ai-marketing-team.workflow</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[0.65rem] tracking-wider text-text-dim uppercase sm:inline">
            Replay preview
          </span>
          <button
            type="button"
            onClick={replay}
            disabled={!done || reduce}
            aria-label="Replay workflow"
            className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[0.65rem] text-text-muted transition-colors hover:border-text-dim hover:text-text disabled:opacity-40"
          >
            <RotateCcw className="size-3" /> Replay
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="@container relative aspect-[16/10] w-full">
        <div aria-hidden className="dot-grid absolute inset-0" />

        <svg aria-hidden viewBox="0 0 160 100" className="absolute inset-0 size-full">
          <Edge d="M24 42 L40 42" drawn={s >= 2} />
          <Edge d="M52 50 L52 64.5" drawn={s >= 2} dashed />
          <Edge d="M76 50 L76 64.5" drawn={s >= 2} dashed />
          <Edge d="M88 42 C95 42 93 26 100 26" drawn={s >= 3} />
          <Edge d="M116 26 C125 26 123 50 132 50" drawn={s >= 4} />
        </svg>

        {/* Trigger message */}
        {s >= 1 && (
          <div className="absolute animate-[rise_0.3s_var(--ease-out-expo)_both] top-[7%] left-[3%] max-w-[36%] rounded-lg rounded-bl-sm border border-border bg-surface-2 px-[1.4cqw] py-[1cqw] text-[max(9px,1.55cqw)] leading-snug text-text-muted"
            >
            Write a post about the Cold Brew and schedule it Saturday at 11
          </div>
        )}

        <SquareNode
          status={statusFor(1, s)}
          position="top-[34%] left-[5%]"
          label="Telegram Trigger"
          icon={<BrandIcon icon={siTelegram} className="size-[46%]" />}
        />

        {/* AI Agent node (wide, n8n style) */}
        <div className="absolute top-[34%] left-[25%] h-[16%] w-[30%]">
          <div
            className={`relative flex size-full items-center gap-[1.4cqw] rounded-[1.4cqw] border bg-surface-2 px-[1.6cqw] transition-[border-color,color,box-shadow] duration-300 ${ring[statusFor(2, s)]}`}
          >
            <Bot className="size-[5cqw] shrink-0" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[max(9px,1.8cqw)] font-medium text-text">AI Agent</p>
              <p className="truncate font-mono text-[max(8px,1.35cqw)] text-text-dim">orchestrator</p>
            </div>
            <StatusBadge status={statusFor(2, s)} />
          </div>
        </div>

        <SubNode
          active={s === 2}
          position="top-[64.5%] left-[29.06%]"
          label="OpenAI"
          icon={<Cpu className="size-[50%]" />}
        />
        <SubNode
          active={s === 2}
          position="top-[64.5%] left-[44.06%]"
          label="Pinecone"
          icon={<DatabaseZap className="size-[50%]" />}
        />

        <SquareNode
          status={statusFor(3, s)}
          position="top-[18%] left-[62.5%]"
          label="Google Sheets"
          icon={<BrandIcon icon={siGooglesheets} className="size-[44%]" />}
        />
        <SquareNode
          status={statusFor(4, s)}
          position="top-[42%] left-[82.5%]"
          label="Send Reply"
          icon={<BrandIcon icon={siTelegram} className="size-[46%]" />}
        />

        {/* Result */}
        {done && (
          <div className="absolute animate-[rise_0.3s_var(--ease-out-expo)_both] right-[3%] bottom-[5%] w-[40%] rounded-lg rounded-br-sm border border-accent/30 bg-accent/10 px-[1.6cqw] py-[1.2cqw] text-[max(9px,1.5cqw)] leading-snug text-text"
            >
              <p className="mb-[0.4cqw] font-mono text-[max(8px,1.3cqw)] text-accent-bright">✓ post scheduled</p>
              {/* Narrow canvases only have room for the summary line. */}
              <span className="hidden @md:inline">
                Instagram · Cold Brew
                <br />
                Saturday · 11:00
                <br />
              </span>
              <span className="text-text-dim">
                <span className="@md:hidden">Sat 11:00 · </span>
                                approved by the owner
              </span>
          </div>
        )}
      </div>

      {/* Execution log */}
      <div className="flex items-center gap-2 border-t border-border bg-bg/60 px-4 py-2.5 font-mono text-[0.7rem]">
        <span
          aria-hidden
          className={`size-1.5 shrink-0 rounded-full ${done ? "bg-success" : s > 0 ? "bg-accent" : "bg-text-dim"}`}
        />
        <p aria-live="polite" className="truncate text-text-muted">
          <span className="text-text-dim">› </span>
          {LOG[s]}
        </p>
      </div>
    </div>
  );
}
