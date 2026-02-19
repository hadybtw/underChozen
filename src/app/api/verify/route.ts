import { NextResponse } from "next/server";

/**
 * Payment verification endpoint placeholder.
 *
 * In production, verify the Stripe session ID to confirm payment
 * before revealing the negotiation pack.
 */

export async function POST(request: Request) {
  const body = await request.json();

  // --- Uncomment for production ---
  // import Stripe from "stripe";
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.retrieve(body.sessionId);
  // const paid = session.payment_status === "paid";
  // return NextResponse.json({ verified: paid });
  // --- End production code ---

  return NextResponse.json({
    verified: true,
    sessionId: body.sessionId,
  });
}
