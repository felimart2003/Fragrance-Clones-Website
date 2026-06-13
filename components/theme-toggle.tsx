"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass glass-edge grid h-10 w-10 place-items-center rounded-full text-fg transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      {/* Render nothing theme-specific until mounted to avoid hydration mismatch. */}
      {mounted ? (
        <span className="relative block h-5 w-5">
          <Sun
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </span>
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
