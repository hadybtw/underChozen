import { NextResponse } from "next/server";

/**
 * Stripe Checkout API route placeholder.
 *
 * To enable real payments:
 * 1. npm install stripe
 * 2. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID to .env.local
 * 3. Uncomment the Stripe logic below
 */

export async function POST(request: Request) {
  const body = await request.json();

  // --- Uncomment for production Stripe integration ---
  // import Stripe from "stripe";
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   payment_method_types: ["card"],
  //   line_items: [
  //     {
  //       price: process.env.STRIPE_PRICE_ID,
  //       quantity: 1,
  //     },
  //   ],
  //   success_url: `${request.headers.get("origin")}/analysis?${new URLSearchParams(body.params).toString()}&unlocked=true`,
  //   cancel_url: `${request.headers.get("origin")}/analysis?${new URLSearchParams(body.params).toString()}`,
  // });
  //
  // return NextResponse.json({ url: session.url });
  // --- End Stripe integration ---

  // MVP: return mock success for development
  return NextResponse.json({
    url: null,
    message: "Stripe not configured. Unlock simulated.",
    params: body.params,
  });
}
