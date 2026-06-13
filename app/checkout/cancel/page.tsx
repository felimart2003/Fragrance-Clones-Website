import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout canceled",
  robots: { index: false },
};

export default function CancelPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-[var(--glass-strong)] text-muted">
        <XCircle className="h-11 w-11" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Checkout canceled</h1>
      <p className="mt-3 text-muted">
        No worries — your cart is still saved. Pick up right where you left off
        whenever you&apos;re ready.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/fragrances"
          className="glass glass-edge rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
        >
          Keep browsing
        </Link>
        <Link
          href="/"
          className="rounded-full bg-gradient-to-br from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02]"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
