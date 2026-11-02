import { CANVAS, type WorkflowScenario } from "@/content/workflows/types";
import { edgeGeometry } from "./geometry";
import { NodeIcon } from "./icons";

const { width: W, height: H, nodeWidth: NW, nodeHeight: NH } = CANVAS;

/** The workflow's structure, server-rendered with no JavaScript. Scrolls sideways on phones. */
export default function ArchitectureDiagram({ scenario }: { scenario: WorkflowScenario }) {
  const byId = new Map(scenario.nodes.map((n) => [n.id, n]));
  const description = scenario.nodes.map((n) => `${n.label} (${n.kind})`).join(", ");

  return (
    <div>
      <div className="relative overflow-x-auto rounded-2xl border border-border bg-surface">
        <div aria-hidden className="dot-grid absolute inset-0 min-w-[720px]" />
        <svg
          role="img"
          aria-label={`Architecture diagram with these nodes: ${description}`}
          viewBox={`0 0 ${W} ${H}`}
          className="relative block h-auto w-full min-w-[720px]"
        >
          {scenario.edges.map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const { d, mx, my } = edgeGeometry(a, b);
            return (
              <g key={`${edge.from}->${edge.to}`}>
                <path d={d} fill="none" strokeWidth={1.5} className="stroke-white/25" />
                {edge.label && (
                  <text
                    x={mx}
                    y={my - 7}
                    textAnchor="middle"
                    strokeWidth={4}
                    className="fill-text-dim stroke-surface font-mono text-[10.5px] [paint-order:stroke]"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
  
          {scenario.nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.position.x} ${node.position.y})`}>
              <rect width={NW} height={NH} rx={14} strokeWidth={1.5} className="fill-surface-2 stroke-white/20" />
              <rect x={12} y={14} width={36} height={36} rx={9} className="fill-white/5" />
              <g className="text-text-muted">
                <NodeIcon name={node.icon} size={20} x={20} y={22} />
              </g>
              <text x={58} y={29} className="fill-text font-heading text-[13.5px] font-medium">
                {node.label}
              </text>
              <text x={58} y={46} className="fill-text-dim font-mono text-[11px]">
                {node.kind}
              </text>
              <circle cx={0} cy={NH / 2} r={4} className="fill-bg stroke-text-dim" strokeWidth={1.5} />
              <circle cx={NW} cy={NH / 2} r={4} className="fill-bg stroke-text-dim" strokeWidth={1.5} />
            </g>
          ))}
      </svg>
      </div>
      <p aria-hidden className="mt-2 font-mono text-[0.68rem] text-text-dim md:hidden">Scroll sideways to see the full workflow →</p>
    </div>
  );
}
