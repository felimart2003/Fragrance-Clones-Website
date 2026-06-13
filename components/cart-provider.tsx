"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fragrances, getFragrance } from "@/lib/fragrances";
import { retailPrice } from "@/lib/pricing";

export interface CartLine {
  slug: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "fragrance-clones-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        // Drop any lines whose product no longer exists in the catalog.
        const valid = parsed.filter((l) => getFragrance(l.slug));
        setLines(valid);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add: CartContextValue["add"] = (slug, qty = 1) => {
    if (!getFragrance(slug)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        );
      }
      return [...prev, { slug, qty: Math.min(qty, 99) }];
    });
    setIsOpen(true);
  };

  const setQty: CartContextValue["setQty"] = (slug, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  };

  const remove: CartContextValue["remove"] = (slug) =>
    setLines((prev) => prev.filter((l) => l.slug !== slug));

  const clear = () => setLines([]);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const f = getFragrance(line.slug);
      if (!f) continue;
      c += line.qty;
      s += retailPrice(f.baseCost) * line.qty;
    }
    return { count: c, subtotal: Math.round(s * 100) / 100 };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    add,
    setQty,
    remove,
    clear,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

/** Helper re-export so cart UI can resolve product details. */
export { fragrances, getFragrance };
