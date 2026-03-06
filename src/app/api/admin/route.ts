import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const EMAILS_FILE = path.join(process.cwd(), ".data", "emails.json");
const ANALYTICS_FILE = path.join(process.cwd(), ".data", "analytics.json");
const PAYMENTS_FILE = path.join(process.cwd(), ".data", "payments.json");

interface EmailEntry {
  email: string;
  source: string;
  jobTitle?: string;
  city?: string;
  percentile?: number;
  timestamp: string;
}

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
  sessionId: string;
}

interface PaymentEntry {
  sessionId?: string;
  email?: string;
  amount?: number;
  currency?: string;
  tier?: string;
  timestamp: string;
  [key: string]: unknown;
}

async function readJson<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function dateKey(iso: string): string {
  return iso.slice(0, 10); // "YYYY-MM-DD"
}

function hourKey(iso: string): number {
  return new Date(iso).getHours();
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseDevice(ua?: string): "desktop" | "mobile" | "tablet" {
  if (!ua) return "desktop";
  const lower = ua.toLowerCase();
  if (/tablet|ipad/.test(lower)) return "tablet";
  if (/mobile|iphone|android(?!.*tablet)/.test(lower)) return "mobile";
  return "desktop";
}

function parseBrowser(ua?: string): string {
  if (!ua) return "Unknown";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Other";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const adminKey = process.env.ADMIN_KEY || "admun";

  if (key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const emails = await readJson<EmailEntry>(EMAILS_FILE);
  const events = await readJson<AnalyticsEvent>(ANALYTICS_FILE);
  const payments = await readJson<PaymentEntry>(PAYMENTS_FILE);

  // === Funnel metrics ===
  const funnelStages = [
    "page_view",
    "form_start",
    "form_complete",
    "results_view",
    "unlock_click",
    "payment_complete",
  ];

  const funnel: Record<string, number> = {};
  for (const stage of funnelStages) {
    funnel[stage] = 0;
  }
  for (const e of events) {
    if (e.event in funnel) {
      funnel[e.event]++;
    } else {
      funnel[e.event] = (funnel[e.event] || 0) + 1;
    }
  }

  // === Revenue ===
  const revenue = payments.reduce((sum, p) => sum + (p.amount || 29), 0);

  // === Conversion rate ===
  const conversionRate =
    funnel.page_view > 0
      ? ((funnel.payment_complete / funnel.page_view) * 100).toFixed(1)
      : "0.0";

  // === Time-series: daily (last 30 days) ===
  const thirtyDaysAgo = daysAgo(30);
  const dailyData: Record<string, { views: number; emails: number; payments: number; revenue: number; sessions: Set<string> }> = {};

  // Initialize all 30 days
  for (let i = 29; i >= 0; i--) {
    const d = daysAgo(i);
    const dk = d.toISOString().slice(0, 10);
    dailyData[dk] = { views: 0, emails: 0, payments: 0, revenue: 0, sessions: new Set() };
  }

  for (const e of events) {
    const d = new Date(e.timestamp);
    if (d >= thirtyDaysAgo) {
      const dk = dateKey(e.timestamp);
      if (dailyData[dk]) {
        if (e.event === "page_view") dailyData[dk].views++;
        dailyData[dk].sessions.add(e.sessionId);
      }
    }
  }

  for (const em of emails) {
    const dk = dateKey(em.timestamp);
    if (dailyData[dk]) dailyData[dk].emails++;
  }

  for (const p of payments) {
    const dk = dateKey(p.timestamp);
    if (dailyData[dk]) {
      dailyData[dk].payments++;
      dailyData[dk].revenue += p.amount || 29;
    }
  }

  const timeSeries = Object.entries(dailyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, d]) => ({
      date,
      views: d.views,
      emails: d.emails,
      payments: d.payments,
      revenue: d.revenue,
      sessions: d.sessions.size,
    }));

  // === Hourly distribution (last 24 hours) ===
  const hourlyViews: number[] = Array(24).fill(0);
  const oneDayAgo = new Date(Date.now() - 86400000);
  for (const e of events) {
    if (e.event === "page_view" && new Date(e.timestamp) >= oneDayAgo) {
      hourlyViews[hourKey(e.timestamp)]++;
    }
  }

  // === Today stats ===
  const todayKey = new Date().toISOString().slice(0, 10);
  const yesterdayDate = daysAgo(1);
  const yesterdayKey = yesterdayDate.toISOString().slice(0, 10);
  const todayViews = dailyData[todayKey]?.views || 0;
  const yesterdayViews = dailyData[yesterdayKey]?.views || 0;
  const todaySessions = dailyData[todayKey]?.sessions.size || 0;

  // === Traffic sources ===
  const sourceMap: Record<string, number> = {};
  const mediumMap: Record<string, number> = {};
  for (const e of events) {
    const src = e.properties?.utm_source;
    const med = e.properties?.utm_medium;
    if (src && typeof src === "string") {
      sourceMap[src] = (sourceMap[src] || 0) + 1;
    }
    if (med && typeof med === "string") {
      mediumMap[med] = (mediumMap[med] || 0) + 1;
    }
  }
  const topSources = Object.entries(sourceMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const topMediums = Object.entries(mediumMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  // === Top pages ===
  const pageMap: Record<string, number> = {};
  for (const e of events) {
    if (e.event === "page_view") {
      const page = (e.properties?.pathname as string) || "/";
      pageMap[page] = (pageMap[page] || 0) + 1;
    }
  }
  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  // === Device / browser breakdown ===
  const deviceMap: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
  const browserMap: Record<string, number> = {};
  const sessionsWithUA = new Set<string>();

  for (const e of events) {
    const ua = e.properties?.userAgent as string | undefined;
    if (ua && !sessionsWithUA.has(e.sessionId)) {
      sessionsWithUA.add(e.sessionId);
      const device = parseDevice(ua);
      deviceMap[device]++;
      const browser = parseBrowser(ua);
      browserMap[browser] = (browserMap[browser] || 0) + 1;
    }
  }

  const devices = Object.entries(deviceMap).map(([name, count]) => ({ name, count }));
  const browsers = Object.entries(browserMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // === Session analytics ===
  const sessionEvents: Record<string, number> = {};
  for (const e of events) {
    sessionEvents[e.sessionId] = (sessionEvents[e.sessionId] || 0) + 1;
  }
  const sessionCounts = Object.values(sessionEvents);
  const totalSessions = sessionCounts.length;
  const avgEventsPerSession =
    totalSessions > 0
      ? (sessionCounts.reduce((a, b) => a + b, 0) / totalSessions).toFixed(1)
      : "0";
  const bounceSessions = sessionCounts.filter((c) => c === 1).length;
  const bounceRate =
    totalSessions > 0 ? ((bounceSessions / totalSessions) * 100).toFixed(1) : "0.0";

  // === Top cities from emails ===
  const cityMap: Record<string, number> = {};
  for (const em of emails) {
    if (em.city) {
      cityMap[em.city] = (cityMap[em.city] || 0) + 1;
    }
  }
  const topCities = Object.entries(cityMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([city, count]) => ({ city, count }));

  // === Email capture rate ===
  const emailCaptureRate =
    funnel.page_view > 0
      ? ((emails.length / funnel.page_view) * 100).toFixed(1)
      : "0.0";

  // === Revenue by source ===
  const revenueBySource: Record<string, number> = {};
  for (const p of payments) {
    // Find the session's UTM source
    const sessionEvts = events.filter((e) => e.sessionId === p.sessionId);
    let src = "direct";
    for (const se of sessionEvts) {
      if (se.properties?.utm_source && typeof se.properties.utm_source === "string") {
        src = se.properties.utm_source;
        break;
      }
    }
    revenueBySource[src] = (revenueBySource[src] || 0) + (p.amount || 29);
  }
  const revenueSourceList = Object.entries(revenueBySource)
    .sort((a, b) => b[1] - a[1])
    .map(([source, amount]) => ({ source, amount }));

  // === Average order value ===
  const avgOrderValue =
    payments.length > 0 ? (revenue / payments.length).toFixed(2) : "0.00";

  // === Recent emails (last 10) ===
  const recentEmails = emails
    .slice(-10)
    .reverse()
    .map((em) => ({
      email: em.email,
      source: em.source,
      jobTitle: em.jobTitle || "",
      city: em.city || "",
      timestamp: em.timestamp,
    }));

  // === Recent payments (last 10) ===
  const recentPayments = payments
    .slice(-10)
    .reverse()
    .map((p) => ({
      email: p.email || "",
      amount: p.amount || 29,
      tier: p.tier || "standard",
      timestamp: p.timestamp,
    }));

  // === Recent events (last 50) ===
  const recentEvents = events
    .slice(-50)
    .reverse()
    .map((e) => ({
      timestamp: e.timestamp,
      event: e.event,
      properties: e.properties || {},
      sessionId: e.sessionId,
    }));

  // === Behavior: Scroll depth distribution ===
  const scrollSessions = new Map<string, Set<number>>();
  for (const e of events) {
    if (e.event === "scroll_depth" && e.properties?.depth) {
      if (!scrollSessions.has(e.sessionId)) scrollSessions.set(e.sessionId, new Set());
      scrollSessions.get(e.sessionId)!.add(Number(e.properties.depth));
    }
  }
  const scrollTotal = scrollSessions.size || 1;
  const scrollDepth: Record<number, number> = { 25: 0, 50: 0, 75: 0, 100: 0 };
  for (const depths of scrollSessions.values()) {
    for (const d of [25, 50, 75, 100]) {
      if (depths.has(d)) scrollDepth[d]++;
    }
  }
  const scrollDepthPct = Object.fromEntries(
    Object.entries(scrollDepth).map(([k, v]) => [k, Math.round((v / scrollTotal) * 100)])
  );

  // === Behavior: Section engagement ===
  const sectionViews: Record<string, number> = {};
  for (const e of events) {
    if (e.event === "section_view" && e.properties?.section) {
      const s = String(e.properties.section);
      sectionViews[s] = (sectionViews[s] || 0) + 1;
    }
  }
  const sectionEngagement = Object.entries(sectionViews)
    .sort((a, b) => b[1] - a[1])
    .map(([section, count]) => ({ section, count }));

  // === Behavior: Avg time on page ===
  const exitDurations: number[] = [];
  for (const e of events) {
    if (e.event === "page_exit" && typeof e.properties?.duration === "number") {
      exitDurations.push(e.properties.duration as number);
    }
  }
  const avgTimeOnPage =
    exitDurations.length > 0
      ? Math.round(exitDurations.reduce((a, b) => a + b, 0) / exitDurations.length)
      : 0;

  // === Behavior: CTA click rankings ===
  const ctaClicks: Record<string, number> = {};
  for (const e of events) {
    if (e.event === "cta_click" && e.properties?.cta) {
      const cta = String(e.properties.cta);
      ctaClicks[cta] = (ctaClicks[cta] || 0) + 1;
    }
  }
  const ctaClickRanking = Object.entries(ctaClicks)
    .sort((a, b) => b[1] - a[1])
    .map(([cta, count]) => ({ cta, count }));

  // === Behavior: FAQ engagement ===
  const faqOpens: Record<string, number> = {};
  for (const e of events) {
    if (e.event === "faq_toggle" && e.properties?.action === "open" && e.properties?.question) {
      const q = String(e.properties.question);
      faqOpens[q] = (faqOpens[q] || 0) + 1;
    }
  }
  const faqEngagement = Object.entries(faqOpens)
    .sort((a, b) => b[1] - a[1])
    .map(([question, count]) => ({ question, count }));

  // === Behavior: Exit intent stats ===
  const exitIntentShown = events.filter((e) => e.event === "exit_intent_shown").length;
  const exitIntentConverted = events.filter(
    (e) => e.event === "email_capture" && e.properties?.source === "exit_intent"
  ).length;

  // === Behavior: Promo code stats ===
  const promoAttempts = events.filter((e) => e.event === "promo_apply").length;
  const promoSuccesses = events.filter(
    (e) => e.event === "promo_apply" && e.properties?.valid === true
  ).length;

  return NextResponse.json({
    // Core metrics
    totalEmails: emails.length,
    totalPayments: payments.length,
    revenue,
    conversionRate,
    funnel,
    funnelStages,
    totalEvents: events.length,

    // Today
    todayViews,
    yesterdayViews,
    todaySessions,

    // Time series
    timeSeries,
    hourlyViews,

    // Traffic
    topSources,
    topMediums,
    topPages,

    // Device / browser
    devices,
    browsers,

    // Sessions
    totalSessions,
    avgEventsPerSession,
    bounceRate,

    // Audience
    topCities,
    emailCaptureRate,
    recentEmails,

    // Revenue
    revenueSourceList,
    avgOrderValue,
    recentPayments,

    // Events
    recentEvents,

    // Behavior
    scrollDepthPct,
    sectionEngagement,
    avgTimeOnPage,
    ctaClickRanking,
    faqEngagement,
    exitIntentShown,
    exitIntentConverted,
    promoAttempts,
    promoSuccesses,
  });
}
