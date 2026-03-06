import { NextResponse } from "next/server";
import Stripe from "stripe";
import { validateDiscount } from "@/lib/discounts";

/**
 * Stripe Checkout API route.
 * Creates a checkout session for the Negotiation Blueprint ($29).
 * Falls back to dev simulation when Stripe keys aren't configured.
 */

// Map discount codes to Stripe coupon env var names
const stripeCouponEnvMap: Record<string, string> = {
  REFER10: "STRIPE_COUPON_REFER10",
  WELCOME20: "STRIPE_COUPON_WELCOME20",
  LAUNCH15: "STRIPE_COUPON_LAUNCH15",
};

export async function POST(request: Request) {
  const body = await request.json();
  const origin = request.headers.get("origin") || "http://localhost:3000";
  const params = new URLSearchParams(body.params).toString();

  const tier = body.params?.tier || "blueprint";
  const discountCode = body.params?.discountCode || null;
  const priceId = tier === "premium"
    ? (process.env.STRIPE_PREMIUM_PRICE_ID || process.env.STRIPE_PRICE_ID)
    : process.env.STRIPE_PRICE_ID;

  // Validate discount code server-side
  const validatedDiscount = discountCode ? validateDiscount(discountCode) : null;

  if (process.env.STRIPE_SECRET_KEY && priceId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const sessionOptions: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}&${params}`,
        cancel_url: `${origin}/analysis?${params}`,
        metadata: {
          jobTitle: body.params?.jobTitle || "",
          city: body.params?.city || "",
          tier,
          ...(body.params?.utm_source && { utm_source: body.params.utm_source }),
          ...(body.params?.utm_medium && { utm_medium: body.params.utm_medium }),
          ...(body.params?.utm_campaign && { utm_campaign: body.params.utm_campaign }),
          ...(validatedDiscount && {
            discountCode: validatedDiscount.code,
            discountPercent: String(validatedDiscount.percent),
          }),
        },
      };

      // Apply Stripe coupon if configured, otherwise discount is noted in metadata
      if (validatedDiscount) {
        const couponEnvKey = stripeCouponEnvMap[validatedDiscount.code];
        const stripeCouponId = couponEnvKey ? process.env[couponEnvKey] : undefined;

        if (stripeCouponId) {
          sessionOptions.discounts = [{ coupon: stripeCouponId }];
        }
      }

      const session = await stripe.checkout.sessions.create(sessionOptions);

      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      return NextResponse.json(
        { error: "Payment processing failed. Please try again." },
        { status: 500 }
      );
    }
  }

  // Development fallback: simulate checkout
  const devUrl = `${origin}/success?session_id=dev-session&tier=${tier}&${params}`;
  return NextResponse.json({ url: devUrl });
}
