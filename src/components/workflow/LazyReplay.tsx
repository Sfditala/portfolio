"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";

const skeleton = "min-h-[520px] rounded-2xl border border-border bg-surface xl:min-h-[640px]";

const WorkflowReplay = dynamic(() => import("./WorkflowReplay"), {
  ssr: false,
  loading: () => <div aria-hidden className={`${skeleton} animate-pulse`} />,
});

/** Loads the replay code and data only when it nears the viewport. */
export default function LazyReplay({ projectSlug }: { projectSlug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "400px 0px" });

  return (
    <div ref={ref}>
      {near ? <WorkflowReplay projectSlug={projectSlug} /> : <div aria-hidden className={skeleton} />}
    </div>
  );
}
