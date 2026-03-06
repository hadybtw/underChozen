/**
 * UTM capture and attribution utility.
 * Reads UTM params from the URL on first call and persists them
 * in sessionStorage so they survive navigation within the session.
 */

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const STORAGE_KEY = "uc_utm";
const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

/**
 * Call on page load to capture UTM params from the current URL.
 * Only captures once per session — subsequent calls are no-ops
 * if params are already stored.
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;

  // Don't overwrite if already captured this session
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const search = new URLSearchParams(window.location.search);
  const params: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) {
      params[key] = value;
    }
  }

  // Only store if at least one UTM param is present
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  }
}

/**
 * Returns the stored UTM params, or an empty object if none were captured.
 */
export function getUtm(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
