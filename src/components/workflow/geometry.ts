import { CANVAS, type ReplayNode } from "@/content/workflows/types";

const { nodeWidth: NW, nodeHeight: NH } = CANVAS;

/** Curved edge between handles: horizontal between columns, vertical within one. */
export function edgeGeometry(a: ReplayNode, b: ReplayNode) {
  const ax = a.position.x;
  const ay = a.position.y;
  const bx = b.position.x;
  const by = b.position.y;

  if (bx >= ax + NW) {
    const [x1, y1, x2, y2] = [ax + NW, ay + NH / 2, bx, by + NH / 2];
    const c = Math.max((x2 - x1) / 2, 24);
    return { d: `M${x1} ${y1} C${x1 + c} ${y1} ${x2 - c} ${y2} ${x2} ${y2}`, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 };
  }
  const down = by > ay;
  const [x1, y1, x2, y2] = [ax + NW / 2, down ? ay + NH : ay, bx + NW / 2, down ? by : by + NH];
  const c = (y2 - y1) / 2;
  return { d: `M${x1} ${y1} C${x1} ${y1 + c} ${x2} ${y2 - c} ${x2} ${y2}`, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 };
}
