/**
 * Pricing model for the dropship business.
 *
 * Flow: a customer orders on this site -> you order the clone from the supplier
 * (FragranceBuy / JomaShop) -> you ship it to the customer. So the retail price
 * shown here must cover: the clone's base cost + your supplier shipping ($9) +
 * a profit margin. Shipping is baked into each item's price so the storefront
 * can advertise "free shipping" while you still come out ahead.
 *
 * Tune the three knobs below to change your margins globally.
 */
export const PRICING = {
  /** What you pay the supplier to ship one order to you (USD). Baked per item. */
  supplierShipping: 9,
  /** Profit margin applied on top of your landed cost (0.35 = 35%). */
  marginRate: 0.35,
  /** Round retail prices to a charm-priced .99 ending. */
  charmPricing: true,
} as const;

/**
 * Given the supplier base cost of a clone, return the marked-up retail price
 * the customer pays. retail = (baseCost + shipping) * (1 + margin), charm-rounded.
 */
export function retailPrice(baseCost: number): number {
  const landed = baseCost + PRICING.supplierShipping;
  let price = landed * (1 + PRICING.marginRate);
  if (PRICING.charmPricing) {
    price = Math.max(0, Math.ceil(price) - 0.01);
  }
  return Math.round(price * 100) / 100;
}

/** Your gross profit per bottle at the current retail price. */
export function unitProfit(baseCost: number): number {
  return (
    Math.round(
      (retailPrice(baseCost) - baseCost - PRICING.supplierShipping) * 100,
    ) / 100
  );
}

/**
 * Percentage saved versus the original designer/niche bottle's retail price.
 * Returns a whole number, e.g. 87 for "save 87%".
 */
export function savingsPercent(baseCost: number, originalRetail: number): number {
  if (originalRetail <= 0) return 0;
  const pct = (1 - retailPrice(baseCost) / originalRetail) * 100;
  return Math.max(0, Math.round(pct));
}
