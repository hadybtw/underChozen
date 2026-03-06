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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const adminKey = process.env.ADMIN_KEY || "underchozen-admin";

  if (key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const emails = await readJson<EmailEntry>(EMAILS_FILE);
  const events = await readJson<AnalyticsEvent>(ANALYTICS_FILE);
  const payments = await readJson<PaymentEntry>(PAYMENTS_FILE);

  // Funnel metrics
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

  // Revenue calculation
  const revenue = payments.reduce((sum, p) => sum + (p.amount || 29), 0);

  // Conversion rate: payment_complete / page_view
  const conversionRate =
    funnel.page_view > 0
      ? ((funnel.payment_complete / funnel.page_view) * 100).toFixed(1)
      : "0.0";

  // Recent events (last 20)
  const recentEvents = events
    .slice(-20)
    .reverse()
    .map((e) => ({
      timestamp: e.timestamp,
      event: e.event,
      properties: e.properties || {},
      sessionId: e.sessionId,
    }));

  return NextResponse.json({
    totalEmails: emails.length,
    totalPayments: payments.length,
    revenue,
    conversionRate,
    funnel,
    funnelStages,
    recentEvents,
    totalEvents: events.length,
  });
}
