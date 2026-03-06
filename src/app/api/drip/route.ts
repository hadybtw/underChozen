import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { dripDay1 } from "@/emails/drip-day1";
import { dripDay3 } from "@/emails/drip-day3";
import { dripDay5 } from "@/emails/drip-day5";

/**
 * Drip email management API.
 *
 * POST — Queue a drip email for a user.
 * GET  — Return all drip entries (admin/analytics).
 *
 * Emails are logged to .data/drips.json. When an email provider (Resend,
 * SendGrid, etc.) is configured, swap the "queue" step for an actual send.
 */

const DRIPS_FILE = path.join(process.cwd(), ".data", "drips.json");

interface DripEntry {
  email: string;
  day: 1 | 3 | 5;
  subject: string;
  jobTitle: string;
  city: string;
  gap: number;
  percentile: number;
  status: "queued" | "sent" | "failed";
  timestamp: string;
}

const templates = {
  1: dripDay1,
  3: dripDay3,
  5: dripDay5,
} as const;

async function ensureDataDir() {
  const dir = path.dirname(DRIPS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readDrips(): Promise<DripEntry[]> {
  try {
    const data = await fs.readFile(DRIPS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeDrips(entries: DripEntry[]) {
  await ensureDataDir();
  await fs.writeFile(DRIPS_FILE, JSON.stringify(entries, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, day, jobTitle, city, gap, percentile, name } = body;

    // Validate required fields
    if (!email || !day || !jobTitle || !city || gap === undefined || percentile === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: email, day, jobTitle, city, gap, percentile" },
        { status: 400 },
      );
    }

    const validDays = [1, 3, 5] as const;
    if (!validDays.includes(day)) {
      return NextResponse.json(
        { error: "Invalid day. Must be 1, 3, or 5." },
        { status: 400 },
      );
    }

    // Generate email content from the template
    const templateFn = templates[day as 1 | 3 | 5];
    const { subject, html } = templateFn({ name, jobTitle, city, gap, percentile });

    // Check for duplicate (same email + same day)
    const drips = await readDrips();
    const duplicate = drips.some((d) => d.email === email && d.day === day);
    if (duplicate) {
      return NextResponse.json(
        { message: "Drip already queued for this email and day", duplicate: true },
        { status: 200 },
      );
    }

    const entry: DripEntry = {
      email: email.trim().toLowerCase(),
      day: day as 1 | 3 | 5,
      subject,
      jobTitle,
      city,
      gap,
      percentile,
      status: "queued",
      timestamp: new Date().toISOString(),
    };

    drips.push(entry);
    await writeDrips(drips);

    // TODO: When an email provider is configured, send the email here
    // using `html` as the body and `subject` as the subject line.
    // On success, update entry.status to "sent".

    console.log(`[drip] Queued day ${day} email for ${email}: "${subject}"`);

    return NextResponse.json({ success: true, subject, day });
  } catch (error) {
    console.error("Drip API error:", error);
    return NextResponse.json(
      { error: "Failed to process drip request" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const drips = await readDrips();

  // Group by email for a cleaner overview
  const byEmail: Record<string, DripEntry[]> = {};
  for (const drip of drips) {
    if (!byEmail[drip.email]) {
      byEmail[drip.email] = [];
    }
    byEmail[drip.email].push(drip);
  }

  return NextResponse.json({
    total: drips.length,
    uniqueEmails: Object.keys(byEmail).length,
    drips,
  });
}
