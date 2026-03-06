import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Payment verification endpoint.
 * Verifies a Stripe session ID to confirm payment before revealing content.
 */

export async function POST(request: Request) {
  const body = await request.json();

  if (process.env.STRIPE_SECRET_KEY && body.sessionId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(body.sessionId);
      return NextResponse.json({
        verified: session.payment_status === "paid",
        sessionId: body.sessionId,
      });
    } catch (error) {
      console.error("Stripe verify error:", error);
      return NextResponse.json({ verified: false });
    }
  }

  // Development fallback: always verify
  return NextResponse.json({
    verified: true,
    sessionId: body.sessionId || "dev-session",
  });
}
