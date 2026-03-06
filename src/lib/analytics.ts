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
  | "privacy_view"
  | "scroll_depth"
  | "section_view"
  | "cta_click"
  | "page_exit"
  | "faq_toggle"
  | "promo_apply";

export function trackEvent(
  event: FunnelEvent,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  if (localStorage.getItem("uc_cookie_consent") !== "accepted") return;

  const sessionId = getSessionId();

  // Merge UTM attribution params + device metadata into every event
  const meta: Record<string, string | number | boolean> = {};
  try {
    meta.userAgent = navigator.userAgent;
    meta.referrer = document.referrer || "";
    meta.screenWidth = window.innerWidth;
    meta.pathname = window.location.pathname;
  } catch {
    // SSR guard
  }

  const enrichedProperties = { ...meta, ...properties, ...getUtm() };

  // Fire and forget — don't block UI
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties: enrichedProperties, sessionId }),
  }).catch(() => {
    // Silently fail — analytics should never break the app
  });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%).
 * Each milestone fires once per page load.
 * Returns a cleanup function.
 */
export function trackScrollDepth(): () => void {
  if (typeof window === "undefined") return () => {};

  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);

    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        trackEvent("scroll_depth", { depth: m });
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/**
 * Track when key sections enter the viewport using IntersectionObserver.
 * Pass CSS selectors mapped to section names.
 * Returns a cleanup function.
 */
export function trackSectionViews(
  sections: Record<string, string>
): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return () => {};

  const observed = new Set<string>();
  const observers: IntersectionObserver[] = [];

  for (const [selector, sectionName] of Object.entries(sections)) {
    const el = document.querySelector(selector);
    if (!el) continue;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !observed.has(sectionName)) {
            observed.add(sectionName);
            trackEvent("section_view", { section: sectionName });
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    observers.push(observer);
  }

  return () => {
    for (const obs of observers) obs.disconnect();
  };
}

/**
 * Track time on page. Fires page_exit with duration on visibilitychange (hidden) and beforeunload.
 * Returns a cleanup function.
 */
export function trackTimeOnPage(): () => void {
  if (typeof window === "undefined") return () => {};

  const entryTime = Date.now();
  let fired = false;

  function fireExit() {
    if (fired) return;
    fired = true;
    const duration = Math.round((Date.now() - entryTime) / 1000);
    trackEvent("page_exit", { duration, page: window.location.pathname });
  }

  function onVisChange() {
    if (document.visibilityState === "hidden") fireExit();
  }

  document.addEventListener("visibilitychange", onVisChange);
  window.addEventListener("beforeunload", fireExit);

  return () => {
    document.removeEventListener("visibilitychange", onVisChange);
    window.removeEventListener("beforeunload", fireExit);
  };
}
