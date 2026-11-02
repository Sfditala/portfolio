"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import {
  animate,
  motion,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { Check, Loader2, X } from "lucide-react";
import { CANVAS, type ReplayNode, type WorkflowScenario } from "@/content/workflows/types";
import { edgeGeometry } from "./geometry";
import { NodeIcon } from "./icons";
import type { NodeStatus, Replay } from "./useReplay";

const { width: W, height: H, nodeWidth: NW, nodeHeight: NH } = CANVAS;

/** The data packet: follows the edge path, driven by a pausable animation. */
function Packet({
  d,
  reverse,
  durationMs,
  paused,
}: {
  d: string;
  reverse: boolean;
  durationMs: number;
  paused: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const length = path.getTotalLength();
    controls.current = animate(0, 1, {
      duration: durationMs / 1000,
      ease: "easeInOut",
      onUpdate: (p) => {
        const point = path.getPointAtLength((reverse ? 1 - p : p) * length);
        dot.setAttribute("cx", String(point.x));
        dot.setAttribute("cy", String(point.y));
        dot.setAttribute("opacity", "1");
      },
      onComplete: () => dot.setAttribute("opacity", "0"),
    });
    return () => controls.current?.stop();
  }, [d, reverse, durationMs]);

  useEffect(() => {
    if (paused) controls.current?.pause();
    else controls.current?.play();
  }, [paused]);

  return (
    <g aria-hidden>
      <path ref={pathRef} d={d} fill="none" />
      <circle ref={dotRef} r={6} opacity={0} className="fill-accent stroke-bg" strokeWidth={2} />
    </g>
  );
}

const frameByStatus: Record<NodeStatus, string> = {
  idle: "stroke-white/15",
  running: "stroke-accent",
  success: "stroke-success/60",
  error: "stroke-accent",
};

function StatusBadge({ status }: { status: NodeStatus }) {
  if (status === "idle") return null;
  const cx = NW - 2;
  const cy = 2;
  return (
    <g aria-hidden>
      <circle
        cx={cx}
        cy={cy}
        r={10}
        className={status === "success" ? "fill-success" : status === "error" ? "fill-accent" : "fill-surface-2 stroke-accent"}
      />
      {status === "running" ? (
        <g className="origin-center animate-spin text-accent [transform-box:fill-box]">
          <Loader2 x={cx - 7} y={cy - 7} width={14} height={14} strokeWidth={3} />
        </g>
      ) : status === "success" ? (
        <Check x={cx - 7} y={cy - 7} width={14} height={14} strokeWidth={3.5} className="text-bg" />
      ) : (
        <X x={cx - 7} y={cy - 7} width={14} height={14} strokeWidth={3.5} className="text-text" />
      )}
    </g>
  );
}

function CanvasNode({
  node,
  status,
  selected,
  onOpen,
}: {
  node: ReplayNode;
  status: NodeStatus;
  selected: boolean;
  onOpen: (id: string) => void;
}) {
  const openable = status === "success" || status === "error";
  const onKeyDown = (e: KeyboardEvent) => {
    if (openable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpen(node.id);
    }
  };

  return (
    <g
      transform={`translate(${node.position.x} ${node.position.y})`}
      role="button"
      tabIndex={openable ? 0 : -1}
      aria-disabled={!openable}
      aria-pressed={selected}
      aria-label={`${node.label}, ${node.kind}, ${status === "idle" ? "waiting" : status}${openable ? ". Open its output" : ""}`}
      onClick={() => openable && onOpen(node.id)}
      onKeyDown={onKeyDown}
      className={`group outline-none ${openable ? "cursor-pointer" : ""}`}
    >
      {status === "running" && (
        <rect x={-5} y={-5} width={NW + 10} height={NH + 10} rx={18} strokeWidth={5} className="animate-pulse fill-none stroke-accent/30" />
      )}
      <rect
        width={NW}
        height={NH}
        rx={14}
        strokeWidth={selected ? 2.25 : 1.5}
        className={`fill-surface-2 transition-[stroke] duration-200 group-focus-visible:stroke-text ${
          selected ? "stroke-text" : frameByStatus[status]
        }`}
      />
      <rect x={12} y={14} width={36} height={36} rx={9} className="fill-white/5" />
      <g className={status === "idle" ? "text-text-dim" : "text-text"}>
        <NodeIcon name={node.icon} size={20} x={20} y={22} />
      </g>
      <text x={58} y={29} className={`font-heading text-[13.5px] font-medium ${status === "idle" ? "fill-text-muted" : "fill-text"}`}>
        {node.label}
      </text>
      <text x={58} y={46} className="fill-text-dim font-mono text-[11px]">
        {node.kind}
      </text>
      <circle cx={0} cy={NH / 2} r={4} aria-hidden className="fill-bg stroke-text-dim" strokeWidth={1.5} />
      <circle cx={NW} cy={NH / 2} r={4} aria-hidden className="fill-bg stroke-text-dim" strokeWidth={1.5} />
      <StatusBadge status={status} />
    </g>
  );
}

export default function WorkflowCanvas({
  scenario,
  replay,
}: {
  scenario: WorkflowScenario;
  replay: Replay;
}) {
  const reduce = useReducedMotion() ?? false;
  const byId = new Map(scenario.nodes.map((n) => [n.id, n]));
  const inspectedNode =
    typeof replay.inspected === "number" ? scenario.steps[replay.inspected]?.nodeId : null;

  const edges = scenario.edges.flatMap((edge) => {
    const a = byId.get(edge.from);
    const b = byId.get(edge.to);
    return a && b ? [{ ...edge, key: `${edge.from}->${edge.to}`, ...edgeGeometry(a, b) }] : [];
  });

  const active = replay.activeEdge
    ? edges.find((e) => e.key === replay.activeEdge?.key)
    : undefined;
  const packetMs = replay.current ? Math.min(replay.current.durationMs * 0.6, 500) / replay.speed : 0;

  return (
    <div className="relative">
      <div aria-hidden className="dot-grid absolute inset-0" />
      <svg
        role="group"
        aria-label={`Workflow diagram: ${scenario.title}`}
        viewBox={`0 0 ${W} ${H}`}
        className="relative block h-auto w-full"
      >
        {edges.map((edge) => {
          const crossed = replay.traversed.has(edge.key);
          return (
            <g key={edge.key} aria-hidden>
              <path d={edge.d} fill="none" strokeWidth={1.5} className="stroke-white/15" />
              <motion.path
                d={edge.d}
                fill="none"
                strokeWidth={2}
                className="stroke-accent"
                initial={false}
                animate={{ pathLength: crossed ? 1 : 0, opacity: crossed ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : packetMs / 1000 || 0.3, ease: "easeInOut" }}
              />
              {edge.label && (
                <text
                  x={edge.mx}
                  y={edge.my - 7}
                  textAnchor="middle"
                  strokeWidth={4}
                  className="fill-text-dim stroke-bg font-mono text-[10.5px] [paint-order:stroke]"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {!reduce && active && replay.activeEdge && (
          <Packet
            key={`${active.key}-${replay.cursor}`}
            d={active.d}
            reverse={replay.activeEdge.reverse}
            durationMs={packetMs}
            paused={replay.status === "paused"}
          />
        )}

        {scenario.nodes.map((node) => (
          <CanvasNode
            key={node.id}
            node={node}
            status={replay.nodeStatus.get(node.id) ?? "idle"}
            selected={inspectedNode === node.id}
            onOpen={replay.openNode}
          />
        ))}
      </svg>
    </div>
  );
}
