import { NextResponse } from "next/server";
import Stripe from "stripe";
import { promises as fs } from "fs";
import path from "path";

/**
 * Stripe Webhook handler.
 * Verifies incoming webhook signatures and logs successful payments
 * to .data/payments.json. Falls back to skipping signature verification
 * when STRIPE_WEBHOOK_SECRET is not set (dev mode).
 */

export const runtime = "nodejs";

const PAYMENTS_DIR = path.join(process.cwd(), ".data");
const PAYMENTS_FILE = path.join(PAYMENTS_DIR, "payments.json");

interface PaymentRecord {
  sessionId: string;
  tier: string;
  amount: number;
  email: string;
  jobTitle: string;
  city: string;
  timestamp: string;
}

async function readPayments(): Promise<PaymentRecord[]> {
  try {
    const data = await fs.readFile(PAYMENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function appendPayment(record: PaymentRecord): Promise<void> {
  await fs.mkdir(PAYMENTS_DIR, { recursive: true });
  const payments = await readPayments();
  payments.push(record);
  await fs.writeFile(PAYMENTS_FILE, JSON.stringify(payments, null, 2), "utf-8");
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Production: verify webhook signature
    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header." },
        { status: 400 }
      );
    }

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return NextResponse.json(
        { error: "Webhook signature verification failed." },
        { status: 400 }
      );
    }
  } else {
    // Development fallback: skip signature verification
    console.warn("STRIPE_WEBHOOK_SECRET not set — skipping signature verification.");
    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const record: PaymentRecord = {
      sessionId: session.id,
      tier: session.metadata?.tier || "blueprint",
      amount: session.amount_total ?? 0,
      email: session.customer_details?.email || "",
      jobTitle: session.metadata?.jobTitle || "",
      city: session.metadata?.city || "",
      timestamp: new Date().toISOString(),
    };

    try {
      await appendPayment(record);
      console.log("Payment recorded:", record.sessionId);
    } catch (error) {
      console.error("Failed to write payment record:", error);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
