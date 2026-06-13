import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Sparkles, Truck } from "lucide-react";
import { allSlugs, fragrances, getFragrance } from "@/lib/fragrances";
import { retailPrice, savingsPercent } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import { BottleGlyph } from "@/components/bottle-glyph";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { FragranceCard } from "@/components/fragrance-card";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = getFragrance(slug);
  if (!f) return { title: "Not found" };
  return {
    title: `${f.original.name} clone — ${f.clone.house} ${f.clone.name}`,
    description: `${f.clone.house} ${f.clone.name} is the community-favorite clone of ${f.original.house} ${f.original.name}. ${f.description}`,
  };
}

export default async function FragranceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFragrance(slug);
  if (!f) notFound();

  const price = retailPrice(f.baseCost);
  const savings = savingsPercent(f.baseCost, f.original.retail);
  const related = fragrances
    .filter((x) => x.category === f.category && x.slug !== f.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-3 py-8 sm:px-5">
      <Link
        href="/fragrances"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Art */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            className="glass-edge relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px]"
            style={{
              background: `linear-gradient(150deg, ${f.accentFrom}, ${f.accentTo})`,
            }}
          >
            <BottleGlyph className="h-[68%] w-auto drop-shadow-2xl" />
            <span className="absolute left-5 top-5 rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
              {f.category}
            </span>
            <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
              {f.matchScore}% match
            </span>
            <span className="absolute bottom-5 left-5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              {f.original.house}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip>{f.gender}</Chip>
            {f.accords.slice(0, 3).map((a) => (
              <Chip key={a}>{a}</Chip>
            ))}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Smells like
          </p>
          <h1 className="mt-1 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {f.original.name}
          </h1>
          <p className="mt-1.5 text-lg text-muted">
            {f.original.house}
            {f.original.year ? ` · ${f.original.year}` : ""}
          </p>

          <p className="mt-5 leading-relaxed text-muted">{f.description}</p>

          {/* Purchase card */}
          <div className="glass glass-edge mt-7 rounded-glass p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              What you&apos;ll receive
            </p>
            <p className="mt-1 text-lg font-semibold">
              {f.clone.house} {f.clone.name}
            </p>
            <p className="text-sm text-muted">
              {f.clone.sizeMl} ml · Eau de Parfum
            </p>

            <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
              <span className="text-4xl font-bold tracking-tight tabular-nums">
                {formatPrice(price)}
              </span>
              <span className="pb-1 text-sm text-muted line-through">
                {formatPrice(f.original.retail)}
              </span>
              {savings > 0 && (
                <span className="mb-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400">
                  Save {savings}%
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton slug={f.slug} size="lg" className="flex-1" label="Add to cart" />
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400" /> Free shipping —
                included in the price
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Secure checkout via
                Stripe
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" /> Sourced from{" "}
                {f.source}
              </li>
            </ul>
          </div>

          {/* Match meter */}
          <div className="mt-7">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Community match score</span>
              <span className="font-semibold tabular-nums">{f.matchScore}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--glass-strong)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                style={{ width: `${f.matchScore}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              Based on the &quot;reminds me of&quot; consensus for this scent.
              Verify before purchase if an exact match matters to you.
            </p>
          </div>

          {/* Notes */}
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <NoteColumn title="Top" notes={f.topNotes} />
            <NoteColumn title="Heart" notes={f.heartNotes} />
            <NoteColumn title="Base" notes={f.baseNotes} />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            More {f.category} clones
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <FragranceCard key={r.slug} f={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-3 py-1 text-xs font-medium capitalize text-muted">
      {children}
    </span>
  );
}

function NoteColumn({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div className="glass glass-edge rounded-2xl p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {notes.map((n) => (
          <li key={n} className="text-sm">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
