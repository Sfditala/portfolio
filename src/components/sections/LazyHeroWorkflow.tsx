"use client";

import dynamic from "next/dynamic";

// Keeps the canvas out of hydration. Same footprint as the real card, so nothing shifts.
const HeroWorkflow = dynamic(() => import("./HeroWorkflow"), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="h-[49px] border-b border-border" />
      <div className="dot-grid aspect-[16/10] w-full" />
      <div className="h-[38px] border-t border-border" />
    </div>
  ),
});

export default HeroWorkflow;
