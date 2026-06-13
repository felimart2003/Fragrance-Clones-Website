"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

/** Clears the cart once, on mount — used on the order success page. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
