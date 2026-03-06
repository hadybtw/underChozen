"use client";

import { useEffect } from "react";
import { trackEvent, type FunnelEvent } from "@/lib/analytics";

export function PageTracker({
  event = "page_view",
  properties,
}: {
  event?: FunnelEvent;
  properties?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    trackEvent(event, properties);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
