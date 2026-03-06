import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { dripDay1 } from "@/emails/drip-day1";

/**
 * Email capture API route.
 * Stores captured emails to a JSON file. Designed to be easily swapped
 * to Resend, SendGrid, or any email service.
 *
 * On new email capture, also queues a Day 1 drip entry in .data/drips.json.
 */

const DATA_FILE = path.join(process.cwd(), ".data", "emails.json");
const DRIPS_FILE = path.join(process.cwd(), ".data", "drips.json");

interface EmailEntry {
  email: string;
  source: string;
  jobTitle?: string;
  city?: string;
  percentile?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  timestamp: string;
}

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

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

async function readEmails(): Promise<EmailEntry[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeEmails(entries: EmailEntry[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source, jobTitle, city, percentile, utm_source, utm_medium, utm_campaign } = body;

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const entry: EmailEntry = {
      email: email.trim().toLowerCase(),
      source: source || "unknown",
      ...(jobTitle && { jobTitle }),
      ...(city && { city }),
      ...(percentile !== undefined && { percentile }),
      ...(utm_source && { utm_source }),
      ...(utm_medium && { utm_medium }),
      ...(utm_campaign && { utm_campaign }),
      timestamp: new Date().toISOString(),
    };

    const emails = await readEmails();

    // Prevent duplicates
    const exists = emails.some((e) => e.email === entry.email);
    if (!exists) {
      emails.push(entry);
      await writeEmails(emails);

      // Queue Day 1 drip if we have enough context
      if (jobTitle && city) {
        try {
          const gap = body.gap ?? 0;
          const pct = percentile ?? 0;
          const { subject } = dripDay1({ jobTitle, city, gap, percentile: pct });

          const drips = await readDrips();
          drips.push({
            email: entry.email,
            day: 1,
            subject,
            jobTitle,
            city,
            gap,
            percentile: pct,
            status: "queued",
            timestamp: new Date().toISOString(),
          });
          await writeDrips(drips);
          console.log(`[drip] Auto-queued day 1 for ${entry.email}`);
        } catch (dripErr) {
          // Non-fatal — email was still captured
          console.error("Failed to queue day 1 drip:", dripErr);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple endpoint to check email count (for admin/analytics)
  const emails = await readEmails();
  return NextResponse.json({ count: emails.length });
}
