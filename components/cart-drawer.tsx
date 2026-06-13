"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, getFragrance } from "@/components/cart-provider";
import { retailPrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal={isOpen}
        className={`glass-strong fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col border-l border-[var(--glass-border)] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            {count > 0 && (
              <span className="text-sm font-normal text-muted">({count})</span>
            )}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 pb-20 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--glass-strong)]">
                <ShoppingBag className="h-7 w-7 text-muted" />
              </div>
              <div>
                <p className="font-medium">Your cart is empty</p>
                <p className="mt-1 text-sm text-muted">
                  Find your signature scent for less.
                </p>
              </div>
              <button
                onClick={close}
                className="rounded-full bg-gradient-to-br from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Browse fragrances
              </button>
            </div>
          ) : (
            <ul className="space-y-3 pb-4">
              {lines.map((line) => {
                const f = getFragrance(line.slug);
                if (!f) return null;
                const price = retailPrice(f.baseCost);
                return (
                  <li
                    key={line.slug}
                    className="glass glass-edge flex gap-3 rounded-2xl p-3"
                  >
                    <div
                      className="h-20 w-16 shrink-0 rounded-xl"
                      style={{
                        background: `linear-gradient(150deg, ${f.accentFrom}, ${f.accentTo})`,
                      }}
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/fragrances/${f.slug}`}
                        onClick={close}
                        className="truncate text-sm font-semibold leading-tight hover:underline"
                      >
                        {f.clone.house} {f.clone.name}
                      </Link>
                      <p className="truncate text-xs text-muted">
                        Clone of {f.original.house} {f.original.name}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full border border-[var(--glass-border)] p-0.5">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatPrice(price * line.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => remove(line.slug)}
                      className="self-start text-muted transition-colors hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer / checkout */}
        {lines.length > 0 && (
          <div className="border-t border-[var(--glass-hairline)] px-5 py-5">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>Shipping</span>
              <span className="font-medium text-emerald-400">Free</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            {error && (
              <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}
            <button
              onClick={checkout}
              disabled={loading}
              className="mt-4 w-full rounded-full bg-gradient-to-br from-accent to-accent-2 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? "Redirecting to Stripe…" : "Checkout"}
            </button>
            <div className="mt-3 flex items-center justify-between text-xs text-muted">
              <button onClick={clear} className="transition-colors hover:text-fg">
                Clear cart
              </button>
              <span>Secure checkout via Stripe</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
