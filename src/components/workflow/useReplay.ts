"use client";

import { useEffect, useMemo, useReducer } from "react";
import type { ReplayStep, WorkflowScenario } from "@/content/workflows/types";

export type ReplayStatus = "idle" | "running" | "paused" | "done";
export type NodeStatus = "idle" | "running" | "success" | "error";

export const SPEEDS = [1, 1.5, 2] as const;
export type Speed = (typeof SPEEDS)[number];

type State = {
  status: ReplayStatus;
  /** Index of the step in progress; every earlier step has finished. */
  cursor: number;
  speed: Speed;
  /** Step reopened by the visitor. Cleared when the next step finishes. */
  pinned: number | "result" | null;
};

type Action =
  | { type: "run" | "pause" | "replay" | "step" | "advance" }
  | { type: "speed"; speed: Speed }
  | { type: "pin"; target: number | "result" };

const makeReducer = (total: number) => {
  const advance = (state: State): State =>
    state.cursor >= total - 1
      ? { ...state, status: "done", cursor: total, pinned: null }
      : { ...state, cursor: state.cursor + 1, pinned: null };

  return (state: State, action: Action): State => {
    switch (action.type) {
      case "run":
        if (state.status === "paused") return { ...state, status: "running" };
        return { ...state, status: "running", cursor: 0, pinned: null };
      case "replay":
        return { ...state, status: "running", cursor: 0, pinned: null };
      case "pause":
        return state.status === "running" ? { ...state, status: "paused" } : state;
      case "advance":
        return state.status === "running" ? advance(state) : state;
      case "step":
        if (state.status === "done") return state;
        if (state.status === "idle") return { ...state, status: "paused", cursor: 0 };
        return advance({ ...state, status: "paused" });
      case "speed":
        return { ...state, speed: action.speed };
      case "pin":
        return { ...state, pinned: action.target };
    }
  };
};

/** Plays recorded steps on timers. Remount (via key) to switch scenario. */
export function useReplay(scenario: WorkflowScenario) {
  const { steps, nodes, edges } = scenario;
  const reducer = useMemo(() => makeReducer(steps.length), [steps.length]);
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    cursor: -1,
    speed: 1,
    pinned: null,
  } satisfies State);
  const { status, cursor, speed, pinned } = state;

  const current: ReplayStep | undefined = steps[cursor];

  useEffect(() => {
    if (status !== "running" || !current) return;
    const timer = setTimeout(() => dispatch({ type: "advance" }), current.durationMs / speed);
    return () => clearTimeout(timer);
  }, [status, current, speed, cursor]);

  const nodeStatus = useMemo(() => {
    const map = new Map<string, NodeStatus>();
    steps.slice(0, Math.max(cursor, 0)).forEach((step) => {
      map.set(step.nodeId, step.status === "error" ? "error" : "success");
    });
    if (current && status !== "done") map.set(current.nodeId, "running");
    return map;
  }, [steps, cursor, current, status]);

  // Edges crossed so far, and the one a packet is crossing right now.
  const { traversed, activeEdge } = useMemo(() => {
    const traversed = new Set<string>();
    let activeEdge: { key: string; reverse: boolean } | null = null;
    for (let i = 1; i <= Math.min(cursor, steps.length - 1); i++) {
      const a = steps[i - 1].nodeId;
      const b = steps[i].nodeId;
      const forward = edges.find((e) => e.from === a && e.to === b);
      const edge = forward ?? edges.find((e) => e.from === b && e.to === a);
      if (!edge) continue;
      const key = `${edge.from}->${edge.to}`;
      traversed.add(key);
      if (i === cursor) activeEdge = { key, reverse: !forward };
    }
    return { traversed, activeEdge };
  }, [steps, edges, cursor]);

  // Default view: the last finished step, then the result once the run ends.
  const lastFinished = Math.min(cursor, steps.length) - 1;
  const inspected: number | "result" | null =
    pinned ?? (status === "done" ? "result" : lastFinished >= 0 ? lastFinished : null);

  const labelOf = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;
  const announcement =
    status === "done"
      ? "Run finished."
      : status === "paused"
        ? `Paused at step ${cursor + 1} of ${steps.length}.`
        : status === "running" && current
          ? `Step ${cursor + 1} of ${steps.length}: ${labelOf(current.nodeId)}.`
          : "";

  const openNode = (nodeId: string) => {
    for (let i = lastFinished; i >= 0; i--) {
      if (steps[i].nodeId === nodeId) {
        dispatch({ type: "pin", target: i });
        return;
      }
    }
  };

  return {
    status,
    cursor,
    speed,
    current,
    nodeStatus,
    traversed,
    activeEdge,
    inspected,
    /** The inspector types out live output only, never reopened steps. */
    isLive: pinned === null,
    lastFinished,
    announcement,
    openNode,
    run: () => dispatch({ type: "run" }),
    pause: () => dispatch({ type: "pause" }),
    replay: () => dispatch({ type: "replay" }),
    step: () => dispatch({ type: "step" }),
    setSpeed: (value: Speed) => dispatch({ type: "speed", speed: value }),
    pin: (target: number | "result") => dispatch({ type: "pin", target }),
  };
}

export type Replay = ReturnType<typeof useReplay>;
