declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function hasConsent(): boolean {
  try {
    return localStorage.getItem("uc_cookie_consent") === "accepted";
  } catch {
    return false;
  }
}

function safeFbq(...args: unknown[]): void {
  try {
    if (hasConsent() && typeof window !== "undefined" && window.fbq) {
      window.fbq(...args);
    }
  } catch {
    // fire-and-forget
  }
}

function safeGtag(...args: unknown[]): void {
  try {
    if (hasConsent() && typeof window !== "undefined" && window.gtag) {
      window.gtag(...args);
    }
  } catch {
    // fire-and-forget
  }
}

export function pixelPageView(): void {
  safeFbq("track", "PageView");
  safeGtag("event", "page_view");
}

export function pixelLead(data: Record<string, string>): void {
  safeFbq("track", "Lead", data);
  safeGtag("event", "generate_lead", data);
}

export function pixelPurchase(value: number, currency: string): void {
  safeFbq("track", "Purchase", { value, currency });
  safeGtag("event", "purchase", { value, currency });
}

export function pixelInitiateCheckout(value: number): void {
  safeFbq("track", "InitiateCheckout", { value });
  safeGtag("event", "begin_checkout", { value });
}

export {};
