import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, ThumbsUp, Tag, PackageCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `How ${siteConfig.name} finds the best fragrance clones and prices them fairly.`,
};

const steps = [
  {
    icon: Search,
    title: "We scout the originals",
    body: "We start with the fragrances people actually want — the designer staples and the niche grails that blow up on Fragrantica and TikTok.",
  },
  {
    icon: ThumbsUp,
    title: "The community picks the clone",
    body: "On each original's Fragrantica page, the “reminds me of” section is a popularity contest. The clone with the best upvote-to-downvote ratio wins — that's the one we list.",
  },
  {
    icon: Tag,
    title: "We price it fairly",
    body: "We source the clone from FragranceBuy (or JomaShop), then mark it up just enough to cover shipping and a small margin. Shipping is baked in, so checkout says “free.”",
  },
  {
    icon: PackageCheck,
    title: "You order, we ship",
    body: "You check out securely with Stripe. We place the order with our supplier and send the bottle straight to your door.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-5">
      {/* Intro */}
      <section className="glass glass-edge rounded-[28px] px-6 py-14 sm:px-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          About {siteConfig.name}
        </span>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Great taste shouldn&apos;t cost a{" "}
          <span className="text-gradient">small fortune.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {siteConfig.name} started with a simple obsession: smelling incredible
          without dropping $300 a bottle. The fragrance community has already done
          the hard work of finding which affordable clones nail the icons — we
          just curate the best of them, price them honestly, and ship them to you.
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-16 scroll-mt-28">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <p className="mt-2 text-muted">
          A transparent, four-step method behind every listing.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <div key={s.title} className="glass glass-edge rounded-glass p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-muted">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency */}
      <section className="mt-16">
        <div className="glass glass-edge rounded-glass p-7">
          <h2 className="text-xl font-bold tracking-tight">A note on transparency</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Clones are independent fragrances inspired by the originals — they are
            not produced, affiliated with, or endorsed by the original houses, and
            we never claim they&apos;re identical. Match scores reflect community
            consensus, not a lab analysis. We think honest dupes are a great way to
            explore scent; we&apos;ll always tell you exactly what you&apos;re
            buying.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <Link
          href="/fragrances"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02]"
        >
          Browse the catalog <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
