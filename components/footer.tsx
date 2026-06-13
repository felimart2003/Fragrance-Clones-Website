import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="px-3 pb-4 pt-12 sm:px-5">
      <div className="glass glass-edge mx-auto max-w-6xl rounded-glass px-6 py-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">
                {siteConfig.name.charAt(0)}
              </span>
              <span className="text-base font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-3 font-semibold">Browse</p>
              <ul className="space-y-2 text-muted">
                <li>
                  <Link className="transition-colors hover:text-fg" href="/fragrances?category=designer">
                    Designer
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-fg" href="/fragrances?category=niche">
                    Niche
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-fg" href="/fragrances">
                    All clones
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold">Company</p>
              <ul className="space-y-2 text-muted">
                <li>
                  <Link className="transition-colors hover:text-fg" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-fg" href="/about#how-it-works">
                    How it works
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--glass-hairline)] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Clones are independent products — not affiliated with or endorsed by the
            original houses.
          </p>
        </div>
      </div>
    </footer>
  );
}
