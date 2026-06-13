"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { fragrances, allAccords, type Category, type Gender } from "@/lib/fragrances";
import { retailPrice, savingsPercent } from "@/lib/pricing";
import { FragranceCard } from "@/components/fragrance-card";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | Category;
type GenderFilter = "all" | Gender;
type Sort = "match" | "price-asc" | "price-desc" | "savings";

const SORTS: { value: Sort; label: string }[] = [
  { value: "match", label: "Best match" },
  { value: "savings", label: "Biggest savings" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function FragranceBrowser() {
  const sp = useSearchParams();
  const urlCategory = (sp.get("category") as CategoryFilter) || "all";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(urlCategory);
  const [gender, setGender] = useState<GenderFilter>("all");
  const [sort, setSort] = useState<Sort>("match");
  const [accords, setAccords] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Keep category in sync with deep links (e.g. nav "Designer"/"Niche").
  useEffect(() => {
    const c = (sp.get("category") as CategoryFilter) || "all";
    setCategory(c);
  }, [sp]);

  const accordList = useMemo(() => allAccords(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = fragrances.filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (gender !== "all" && f.gender !== gender) return false;
      if (accords.length && !accords.some((a) => f.accords.includes(a))) return false;
      if (q) {
        const hay = [
          f.original.name,
          f.original.house,
          f.clone.name,
          f.clone.house,
          ...f.accords,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return retailPrice(a.baseCost) - retailPrice(b.baseCost);
        case "price-desc":
          return retailPrice(b.baseCost) - retailPrice(a.baseCost);
        case "savings":
          return (
            savingsPercent(b.baseCost, b.original.retail) -
            savingsPercent(a.baseCost, a.original.retail)
          );
        default:
          return b.matchScore - a.matchScore;
      }
    });
    return list;
  }, [query, category, gender, sort, accords]);

  const toggleAccord = (a: string) =>
    setAccords((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );

  const hasFilters =
    query || category !== "all" || gender !== "all" || accords.length > 0;

  const reset = () => {
    setQuery("");
    setCategory("all");
    setGender("all");
    setAccords([]);
  };

  return (
    <div>
      {/* Search + sort bar */}
      <div className="glass glass-edge sticky top-[88px] z-30 flex flex-col gap-3 rounded-glass p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by original, house, or note…"
            className="w-full rounded-full bg-[var(--glass-strong)] py-3 pl-11 pr-4 text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort"
            className="rounded-full bg-[var(--glass-strong)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/50"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:hidden",
              showFilters ? "bg-gradient-to-br from-accent to-accent-2 text-white" : "bg-[var(--glass-strong)]",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={cn("mt-4 space-y-4", !showFilters && "hidden sm:block")}>
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            label="Category"
            value={category}
            onChange={(v) => setCategory(v as CategoryFilter)}
            options={[
              { value: "all", label: "All" },
              { value: "designer", label: "Designer" },
              { value: "niche", label: "Niche" },
            ]}
          />
          <Segmented
            label="For"
            value={gender}
            onChange={(v) => setGender(v as GenderFilter)}
            options={[
              { value: "all", label: "All" },
              { value: "masculine", label: "Masc" },
              { value: "feminine", label: "Fem" },
              { value: "unisex", label: "Unisex" },
            ]}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {accordList.map((a) => {
            const active = accords.includes(a);
            return (
              <button
                key={a}
                onClick={() => toggleAccord(a)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  active
                    ? "border-transparent bg-gradient-to-br from-accent to-accent-2 text-white"
                    : "border-[var(--glass-border)] bg-[var(--glass)] text-muted hover:text-fg",
                )}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results header */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>
        {hasFilters && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
          >
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((f) => (
            <FragranceCard key={f.slug} f={f} />
          ))}
        </div>
      ) : (
        <div className="glass glass-edge mt-4 rounded-glass px-6 py-20 text-center">
          <p className="text-lg font-semibold">No matches found</p>
          <p className="mt-1 text-sm text-muted">
            Try a different search or clear your filters.
          </p>
          <button
            onClick={reset}
            className="mt-5 rounded-full bg-gradient-to-br from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

function Segmented({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <div className="glass-edge inline-flex rounded-full border border-[var(--glass-border)] bg-[var(--glass)] p-1">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              value === o.value
                ? "bg-gradient-to-br from-accent to-accent-2 text-white shadow"
                : "text-muted hover:text-fg",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
