"use client";

import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** An external link that records an analytics event when clicked. */
export default function TrackedLink({
  event,
  ...props
}: ComponentProps<"a"> & { event: AnalyticsEvent }) {
  return <a {...props} onClick={() => trackEvent(event)} />;
}
