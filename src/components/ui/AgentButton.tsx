"use client";

import type { ReactNode } from "react";
import { openAgent } from "@/lib/agent-bus";
import { bookingPrompt } from "@/content/site";
import { buttonClasses } from "./Button";

/** A button that opens the global agent in booking mode. */
export default function AgentButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  message = bookingPrompt,
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "inline";
  className?: string;
  message?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => openAgent({ message })}
      aria-haspopup="dialog"
      className={buttonClasses(variant, size, className)}
    >
      {children}
    </button>
  );
}
