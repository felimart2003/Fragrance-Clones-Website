import { Suspense } from "react";
import type { Metadata } from "next";
import { FragranceBrowser } from "@/components/fragrance-browser";

export const metadata: Metadata = {
  title: "Browse clones",
  description:
    "Search and filter community-vetted designer and niche fragrance clones by house, note, and price.",
};

export default function FragrancesPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 py-10 sm:px-5">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          The clone catalog
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Every bottle here is the community&apos;s favorite match for an icon —
          sorted, searchable, and priced with shipping baked in.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="glass glass-edge rounded-glass px-6 py-20 text-center text-muted">
            Loading catalog…
          </div>
        }
      >
        <FragranceBrowser />
      </Suspense>
    </div>
  );
}
