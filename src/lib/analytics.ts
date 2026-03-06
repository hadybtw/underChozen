/**
 * Client-side analytics tracking utility.
 * Tracks funnel events and sends them to the analytics API.
 */

import { getUtm } from "./utm";

function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let id = sessionStorage.getItem("uc_session_id");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("uc_session_id", id);
  }
  return id;
}

export type FunnelEvent =
  | "page_view"
  | "form_start"
  | "form_step2"
  | "form_complete"
  | "results_view"
  | "unlock_click"
  | "payment_complete"
  | "pdf_download"
  | "share_click"
  | "email_capture"
  | "exit_intent_shown"
  | "whatif_used"
  | "methodology_view"
  | "terms_view"
  | "privacy_view";

export function trackEvent(
  event: FunnelEvent,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  if (localStorage.getItem("uc_cookie_consent") !== "accepted") return;

  const sessionId = getSessionId();

  // Merge UTM attribution params into every event
  const enrichedProperties = { ...properties, ...getUtm() };

  // Fire and forget — don't block UI
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties: enrichedProperties, sessionId }),
  }).catch(() => {
    // Silently fail — analytics should never break the app
  });
}
