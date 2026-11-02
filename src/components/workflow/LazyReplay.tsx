"use client";

import dynamic from "next/dynamic";
import { useInViewOnce } from "@/lib/motion";

const skeleton = "min-h-[520px] rounded-2xl border border-border bg-surface xl:min-h-[640px]";

const WorkflowReplay = dynamic(() => import("./WorkflowReplay"), {
  ssr: false,
  loading: () => <div aria-hidden className={`${skeleton} animate-pulse`} />,
});

/** Loads the replay code and data only when it nears the viewport. */
export default function LazyReplay({ projectSlug }: { projectSlug: string }) {
  const [ref, near] = useInViewOnce<HTMLDivElement>("400px 0px");

  return (
    <div ref={ref}>
      {near ? <WorkflowReplay projectSlug={projectSlug} /> : <div aria-hidden className={skeleton} />}
    </div>
  );
}
