"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import type { Lead } from "@/lib/agent/types";
import { buttonClasses } from "@/components/ui/Button";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-accent/60 focus:outline-none";

/** Fallback when the agent or webhook is unavailable, so no lead is ever lost. */
export default function BookingForm({
  lead,
  onBooked,
  onCancel,
}: {
  lead: Lead;
  onBooked: () => void;
  onCancel: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) throw new Error("EmailJS is not configured");
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: data.get("name"),
          email: data.get("email"),
          message: `Discovery call request\n\nProblem: ${data.get("problem")}\nPreferred time: ${data.get("time")}`,
        },
        PUBLIC_KEY,
      );
      onBooked();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-2.5 self-stretch rounded-xl border border-border bg-surface-2 p-3.5"
    >
      <p className="font-mono text-xs text-text-muted">Book a 20-min discovery call</p>
      <label className="block">
        <span className="sr-only">Your name</span>
        <input name="name" required maxLength={200} defaultValue={lead.name} placeholder="Your name" autoComplete="name" dir="auto" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Your email</span>
        <input name="email" type="email" required maxLength={200} defaultValue={lead.email} placeholder="Your email" autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">What would you like to automate?</span>
        <textarea name="problem" required rows={2} maxLength={1000} defaultValue={lead.problem} placeholder="What would you like to automate?" dir="auto" className={`${field} resize-none`} />
      </label>
      <label className="block">
        <span className="sr-only">Preferred time</span>
        <input name="time" required maxLength={200} placeholder="Preferred time and timezone" dir="auto" className={field} />
      </label>

      {status === "error" && (
        <p role="alert" className="text-xs text-text-muted">
          That didn&apos;t send. Please email{" "}
          <a href={`mailto:${site.email}`} className="text-text underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex items-center justify-between gap-2 pt-1">
        <button type="button" onClick={onCancel} className="rounded-md px-1 text-xs text-text-dim transition-colors hover:text-text">
          Cancel
        </button>
        <button type="submit" disabled={status === "sending"} className={buttonClasses("primary", "sm")}>
          {status === "sending" ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}
