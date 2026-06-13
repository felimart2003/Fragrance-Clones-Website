import Link from "next/link";
import type { Fragrance } from "@/lib/fragrances";
import { retailPrice, savingsPercent } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import { BottleGlyph } from "@/components/bottle-glyph";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function FragranceCard({ f }: { f: Fragrance }) {
  const price = retailPrice(f.baseCost);
  const savings = savingsPercent(f.baseCost, f.original.retail);

  return (
    <article className="group glass glass-edge relative flex flex-col overflow-hidden rounded-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Art */}
      <div
        className="relative aspect-[5/4] overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${f.accentFrom}, ${f.accentTo})`,
        }}
      >
        <BottleGlyph className="absolute left-1/2 top-1/2 h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />

        <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
          {f.category}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {f.matchScore}% match
        </span>
        <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
          {f.original.house}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Smells like
        </p>
        <h3 className="mt-1 text-lg font-semibold leading-tight tracking-tight">
          <Link
            href={`/fragrances/${f.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {f.original.name}
          </Link>
        </h3>
        <p className="text-sm text-muted">
          {f.original.house}
          {f.original.year ? ` · ${f.original.year}` : ""}
        </p>

        <p className="mt-3 line-clamp-1 text-xs text-muted">
          <span className="text-fg/80">Our clone:</span> {f.clone.house}{" "}
          {f.clone.name}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold tracking-tight tabular-nums">
              {formatPrice(price)}
            </p>
            <p className="text-xs text-muted">
              <span className="line-through">{formatPrice(f.original.retail)}</span>{" "}
              original
            </p>
          </div>
          {savings > 0 && (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400">
              Save {savings}%
            </span>
          )}
        </div>

        <AddToCartButton slug={f.slug} className="mt-4 w-full" />
      </div>
    </article>
  );
}
