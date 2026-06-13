import Link from "next/link";
import { ArrowRight, Search, Sparkles, Truck, BadgeCheck } from "lucide-react";
import { fragrances } from "@/lib/fragrances";
import { FragranceCard } from "@/components/fragrance-card";
import { BottleGlyph } from "@/components/bottle-glyph";

export default function Home() {
  const featured = fragrances.slice(0, 8);
  const designerCount = fragrances.filter((f) => f.category === "designer").length;
  const nicheCount = fragrances.filter((f) => f.category === "niche").length;
  const maxSavings = Math.max(
    ...fragrances.map((f) => Math.round((1 - 60 / f.original.retail) * 100)),
  );

  return (
    <div className="px-3 sm:px-5">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto mt-4 max-w-6xl">
        <div className="glass glass-edge relative overflow-hidden rounded-[28px] px-6 py-16 sm:px-12 sm:py-24">
          {/* decorative bottles */}
          <BottleGlyph className="pointer-events-none absolute -right-6 top-8 hidden h-64 w-auto rotate-12 opacity-20 sm:block" />
          <BottleGlyph className="pointer-events-none absolute -left-10 bottom-0 hidden h-48 w-auto -rotate-12 opacity-10 lg:block" />

          <div className="relative max-w-2xl animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-strong)] px-3.5 py-1.5 text-xs font-medium text-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Community-vetted designer &amp; niche dupes
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              Iconic scents.
              <br />
              <span className="text-gradient">A fraction of the price.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We hunt down the clone that the fragrance community says smells
              closest to the originals you love — then ship it to your door for up
              to {maxSavings}% less.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/fragrances"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Browse all clones
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about#how-it-works"
                className="glass glass-edge inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
              >
                How it works
              </Link>
            </div>

            {/* trust row */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent" /> Free shipping
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-accent" /> Vetted matches
              </span>
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4 text-accent" /> Secure Stripe checkout
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="mx-auto mt-4 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: `${fragrances.length}`, label: "Clones cataloged" },
          { value: `${maxSavings}%`, label: "Max savings" },
          { value: `${designerCount}`, label: "Designer dupes" },
          { value: `${nicheCount}`, label: "Niche dupes" },
        ].map((s) => (
          <div
            key={s.label}
            className="glass glass-edge rounded-glass px-5 py-6 text-center"
          >
            <p className="text-gradient text-3xl font-bold tracking-tight tabular-nums">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ---------------- Category split ---------------- */}
      <section className="mx-auto mt-16 max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2">
          <CategoryCard
            href="/fragrances?category=designer"
            title="Designer"
            blurb="Sauvage, Bleu de Chanel, Good Girl — the everyday icons, decoded."
            count={designerCount}
            from="#5b54f0"
            to="#19b6e6"
          />
          <CategoryCard
            href="/fragrances?category=niche"
            title="Niche"
            blurb="Aventus, Baccarat Rouge 540, Layton — the grails, made attainable."
            count={nicheCount}
            from="#a8410f"
            to="#7a1233"
          />
        </div>
      </section>

      {/* ---------------- Featured grid ---------------- */}
      <section className="mx-auto mt-16 max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Trending clones
            </h2>
            <p className="mt-1 text-sm text-muted">
              The matches people can&apos;t stop buying.
            </p>
          </div>
          <Link
            href="/fragrances"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((f) => (
            <FragranceCard key={f.slug} f={f} />
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto mt-16 max-w-6xl">
        <div className="glass glass-edge relative overflow-hidden rounded-[28px] px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Find your signature scent for less.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Every clone is matched to its original by community consensus and
            priced fairly — shipping included.
          </p>
          <Link
            href="/fragrances"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          >
            Start browsing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  href,
  title,
  blurb,
  count,
  from,
  to,
}: {
  href: string;
  title: string;
  blurb: string;
  count: number;
  from: string;
  to: string;
}) {
  return (
    <Link
      href={href}
      className="group glass glass-edge relative flex min-h-44 flex-col justify-between overflow-hidden rounded-glass p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
        style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {count} fragrances
        </p>
        <h3 className="mt-2 text-3xl font-bold tracking-tight">{title}</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">{blurb}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Explore {title.toLowerCase()}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
