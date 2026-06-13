"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/components/cart-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { count, toggle } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={cn(
          "glass glass-edge mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-glass px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled && "shadow-lg",
        )}
      >
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
            {siteConfig.name.charAt(0)}
          </span>
          <span className="text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("?")[0]) &&
                  item.href !== "/fragrances";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-fg",
                    active && "text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open cart"
            onClick={toggle}
            className="glass glass-edge relative grid h-10 w-10 place-items-center rounded-full text-fg transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="glass glass-edge grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-rise glass glass-edge mx-auto mt-2 max-w-6xl rounded-glass p-2 md:hidden">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-fg transition-colors hover:bg-[var(--glass-strong)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
