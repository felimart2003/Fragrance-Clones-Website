"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  slug,
  className,
  label = "Add to cart",
  size = "md",
}: {
  slug: string;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const sizes = {
    sm: "px-3 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2",
  } as const;

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add(slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handle}
      className={cn(
        "relative z-10 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
        sizes[size],
        className,
      )}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}
