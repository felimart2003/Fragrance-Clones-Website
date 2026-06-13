import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getFragrance } from "@/lib/fragrances";
import { retailPrice } from "@/lib/pricing";

export const runtime = "nodejs";

interface IncomingLine {
  slug: string;
  qty: number;
}

/** Countries you're willing to ship to. Edit as your supplier coverage grows. */
const SHIP_TO = ["US", "CA", "GB", "AU"] as const;

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Payments aren't configured yet. Add STRIPE_SECRET_KEY to .env.local to enable checkout.",
      },
      { status: 503 },
    );
  }

  let body: { lines?: IncomingLine[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Build line items from the server-side catalog so prices can't be tampered with.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const line of lines) {
    const f = getFragrance(line.slug);
    const qty = Math.max(1, Math.min(Number(line.qty) || 1, 99));
    if (!f) continue;
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(retailPrice(f.baseCost) * 100),
        product_data: {
          name: `${f.clone.house} ${f.clone.name}`,
          description: `Clone of ${f.original.house} ${f.original.name} · ${f.clone.sizeMl}ml EDP`,
          metadata: { slug: f.slug, source: f.source },
        },
      },
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: "None of the cart items are available." },
      { status: 400 },
    );
  }

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Shipping is baked into each price, so we collect the address but charge $0.
      shipping_address_collection: { allowed_countries: [...SHIP_TO] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        order: JSON.stringify(
          lines
            .filter((l) => getFragrance(l.slug))
            .map((l) => `${l.slug}x${l.qty}`),
        ).slice(0, 500),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
