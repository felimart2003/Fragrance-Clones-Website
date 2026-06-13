# SILLAGE — Fragrance Clones Store

A modern, glassmorphic storefront for browsing designer & niche fragrances and
buying the community-favorite **clone** of each one. Built as a dropshipping
front end: customers order here, you fulfill from your supplier
(FragranceBuy / JomaShop), and prices are marked up to cover shipping + margin.

- **Dark/light themes** with an iOS-style frosted-glass UI
- **Searchable, filterable catalog** (designer vs niche, gender, accords, sort)
- **OG ↔ clone detail pages** with notes pyramid, community match score, savings
- **Cart + Stripe Checkout** via a serverless API route
- Fast, responsive, statically generated, deployable free on Vercel

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-based theme tokens) |
| Theming | `next-themes` (class-based dark mode) |
| Icons / Font | `lucide-react` · Geist |
| Payments | Stripe Checkout (`stripe` SDK, serverless route) |

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

> **Note:** the npm scripts set `NEXT_TELEMETRY_DISABLED=1` (via `cross-env`) to
> avoid a Windows-specific telemetry file-write error on this machine. Harmless
> everywhere else.

---

## Payments / Stripe setup

Checkout is wired up but disabled until you add a key. Until then, the
**Checkout** button returns a friendly "not configured" message.

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Put your **test** secret key in `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```
   Get it from <https://dashboard.stripe.com/apikeys>.
3. Restart `npm run dev`. Click **Checkout** — you'll be redirected to Stripe's
   hosted payment page. Use test card `4242 4242 4242 4242`, any future expiry,
   any CVC.

### How checkout works

`app/api/checkout/route.ts` builds the Stripe line items **server-side from the
catalog** (so prices can't be tampered with in the browser), then creates a
Checkout Session that:

- collects the customer's **shipping address**, email, and phone,
- advertises **free shipping** (shipping is baked into each item's price),
- supports promo codes,
- redirects to `/checkout/success` or `/checkout/cancel`.

### Fulfilling orders (the dropship loop)

When a customer pays, the order shows up in your **Stripe Dashboard → Payments**
with their shipping address and the item list. The session also stores a compact
`order` string in metadata (e.g. `["creed-aventus x2","pdm-layton x1"]`). Use
that to place the matching order with your supplier and ship it out.

> For automated order recording, add a Stripe **webhook** later (see Roadmap).

### Going live

1. Swap in your **live** key (`sk_live_...`) in your host's env vars.
2. Set `NEXT_PUBLIC_SITE_URL` to your real domain (used for success/cancel URLs).
3. Edit the allowed shipping countries in `app/api/checkout/route.ts` (`SHIP_TO`).

---

## Pricing model

All markup logic lives in **`lib/pricing.ts`** — three knobs:

```ts
export const PRICING = {
  supplierShipping: 9,   // what you pay to ship one order to yourself (baked per item)
  marginRate: 0.35,      // 35% profit on top of landed cost
  charmPricing: true,    // round to a .99 ending
};
```

The retail price a customer pays is:

```
retail = ceil((baseCost + supplierShipping) * (1 + marginRate)) - 0.01
```

Example: a clone that costs you **$35** → landed **$44** → ×1.35 = **$59.40** →
shown as **$59.99**. Your profit ≈ `$59.99 − $35 − $9 = $15.99` per bottle.
Helpers `unitProfit()` and `savingsPercent()` are there if you want to surface
margins or "save X%" badges.

> Shipping is **baked into each item**, so multi-item orders earn extra margin
> (you pay one $9 supplier shipment but charged shipping per line). Tune the
> knobs to taste.

---

## Managing the catalog

The entire catalog is a typed array in **`lib/fragrances.ts`**. To add a
fragrance, append an object:

```ts
{
  slug: "tom-ford-oud-wood",                 // unique, kebab-case (the URL)
  original: { name: "Oud Wood", house: "Tom Ford", year: 2007, retail: 280 },
  clone:    { name: "Oud Mood", house: "Lattafa", sizeMl: 100 },
  category: "niche",                          // "designer" | "niche"
  gender:   "unisex",                         // "masculine" | "feminine" | "unisex"
  accords:  ["woody", "oud", "spicy"],
  topNotes: ["..."], heartNotes: ["..."], baseNotes: ["..."],
  description: "One or two punchy sentences.",
  baseCost: 32,                               // your supplier price (before shipping)
  source: "FragranceBuy",                     // "FragranceBuy" | "JomaShop"
  matchScore: 85,                             // community "reminds me of" confidence 0–100
  accentFrom: "#6b4a2a", accentTo: "#2a1a0e", // card gradient colors
}
```

Everything else — pricing, savings, the detail page, search, filters, static
generation — updates automatically.

### The sourcing methodology (and an honest caveat)

The intended workflow per the original brief:

1. Find a popular fragrance on **Fragrantica**.
2. In its **"reminds me of"** section, the entry with the best upvote/downvote
   ratio is the community-chosen clone → list that as the clone.
3. Price the clone from **FragranceBuy**, or **JomaShop** if it's not there.

⚠️ **The shipped data is curated seed data.** Live-scraping Fragrantica isn't
reliable (Cloudflare protection) and supplier prices drift, so `matchScore` and
`baseCost` values are starting estimates. **Verify each pairing and price before
selling.** The dataset is shaped so a future importer (manual CSV refresh or a
scraper, if you build one) can populate the same fields.

---

## Project structure

```
app/
  layout.tsx                 # fonts, providers, aurora bg, navbar, footer, cart drawer
  page.tsx                   # home (hero, stats, categories, trending, CTA)
  fragrances/page.tsx        # browse shell (Suspense → browser)
  fragrances/[slug]/page.tsx # detail (OG ↔ clone, notes, match, buy)
  about/page.tsx             # story + "how it works"
  checkout/success|cancel/   # post-Stripe pages
  api/checkout/route.ts      # Stripe Checkout Session (serverless)
  globals.css                # theme tokens, glass utilities, aurora
components/                  # navbar, cart, cards, theme toggle, etc.
lib/
  fragrances.ts              # the catalog (edit this to manage products)
  pricing.ts                 # markup knobs
  site.ts                    # brand name / nav
  utils.ts                   # cn(), formatPrice()
```

To **rename the store**, change `name` in `lib/site.ts`.

---

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Add env vars: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`.
4. Deploy. (No build config needed — it's a standard Next.js app.)

---

## Roadmap ideas

- **Stripe webhook** (`/api/webhook`) to record paid orders to a DB / email / sheet.
- **Admin** page to add fragrances through the UI instead of editing the file.
- Real **product photos** (currently each card uses a generated gradient + bottle).
- **CSV import** to refresh the catalog in bulk.

---

## Disclaimer

Clones are independent fragrances inspired by the originals — not produced by,
affiliated with, or endorsed by the original houses. Match scores reflect
community consensus, not lab analysis.
