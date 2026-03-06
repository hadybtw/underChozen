import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Analytics event tracking API route.
 * Tracks funnel events: page_view → form_start → form_complete →
 * results_view → unlock_click → payment_complete → pdf_download
 */

const DATA_FILE = path.join(process.cwd(), ".data", "analytics.json");

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
  sessionId: string;
}

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function appendEvent(event: AnalyticsEvent) {
  await ensureDataDir();
  let events: AnalyticsEvent[] = [];
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    events = JSON.parse(data);
  } catch {
    // File doesn't exist yet
  }
  events.push(event);

  // Keep only last 10,000 events to prevent unbounded growth
  if (events.length > 10000) {
    events = events.slice(-10000);
  }

  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, properties, sessionId } = body;

    if (!event || !sessionId) {
      return NextResponse.json(
        { error: "Missing event or sessionId" },
        { status: 400 }
      );
    }

    await appendEvent({
      event,
      properties,
      sessionId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return basic funnel metrics
  let events: AnalyticsEvent[] = [];
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    events = JSON.parse(data);
  } catch {
    // No events yet
  }

  const funnel: Record<string, number> = {};
  for (const e of events) {
    funnel[e.event] = (funnel[e.event] || 0) + 1;
  }

  return NextResponse.json({
    totalEvents: events.length,
    funnel,
  });
}
