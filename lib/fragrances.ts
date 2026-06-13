/**
 * Curated fragrance "clone" catalog.
 *
 * Each entry pairs an ORIGINAL (the designer/niche fragrance people want) with a
 * CLONE we actually sell (an affordable house like Lattafa, Armaf, Maison
 * Alhambra, etc.). The pairing follows the methodology: the clone is the bottle
 * the community most often says "reminds me of" the original on Fragrantica, and
 * `baseCost` is the supplier price (FragranceBuy first, JomaShop as fallback).
 *
 * ⚠️ SEED DATA: match scores and prices are starting estimates. Verify each
 * pairing against Fragrantica's "reminds me of" votes and confirm current
 * supplier pricing before selling. Edit this file to manage the catalog.
 */

export type Gender = "masculine" | "feminine" | "unisex";
export type Category = "designer" | "niche";
export type Supplier = "FragranceBuy" | "JomaShop";

export interface Fragrance {
  /** URL slug, kebab-case, unique. */
  slug: string;
  /** The original fragrance being cloned (the "OG"). */
  original: {
    name: string;
    house: string;
    year?: number;
    /** Approximate retail price of the original bottle (USD), for savings math. */
    retail: number;
  };
  /** The affordable clone we actually sell and ship. */
  clone: {
    name: string;
    house: string;
    sizeMl: number;
  };
  /** Whether the ORIGINAL is a designer or niche fragrance. */
  category: Category;
  gender: Gender;
  /** Main accords, ordered by prominence. */
  accords: string[];
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  /** Supplier base cost of the clone (USD) — what you pay before shipping. */
  baseCost: number;
  source: Supplier;
  /** Community "reminds me of" confidence, 0–100. */
  matchScore: number;
  /** Gradient colors for the card / hero art. */
  accentFrom: string;
  accentTo: string;
}

export const fragrances: Fragrance[] = [
  {
    slug: "creed-aventus",
    original: { name: "Aventus", house: "Creed", year: 2010, retail: 445 },
    clone: { name: "Club de Nuit Intense Man", house: "Armaf", sizeMl: 105 },
    category: "niche",
    gender: "masculine",
    accords: ["fruity", "smoky", "fresh", "woody"],
    topNotes: ["Pineapple", "Bergamot", "Blackcurrant", "Apple"],
    heartNotes: ["Birch", "Jasmine", "Rose", "Patchouli"],
    baseNotes: ["Musk", "Oakmoss", "Ambergris", "Vanilla"],
    description:
      "The legendary pineapple-and-smoke powerhouse. Club de Nuit Intense Man is the most cited Aventus clone on the planet — bright fruity opening, smoky birch dry-down, and projection that genuinely rivals the original.",
    baseCost: 35,
    source: "FragranceBuy",
    matchScore: 92,
    accentFrom: "#3a6ea5",
    accentTo: "#1f2d3d",
  },
  {
    slug: "creed-silver-mountain-water",
    original: { name: "Silver Mountain Water", house: "Creed", year: 1995, retail: 445 },
    clone: { name: "Club de Nuit Sillage", house: "Armaf", sizeMl: 105 },
    category: "niche",
    gender: "unisex",
    accords: ["fresh", "aquatic", "citrus", "metallic"],
    topNotes: ["Bergamot", "Mandarin", "Green notes"],
    heartNotes: ["Tea", "Blackcurrant", "Galbanum"],
    baseNotes: ["Musk", "Sandalwood", "Petitgrain"],
    description:
      "A crisp, airy aquatic with a metallic tea shimmer. Club de Nuit Sillage delivers that clean Alpine-water freshness for a fraction of the price.",
    baseCost: 38,
    source: "FragranceBuy",
    matchScore: 84,
    accentFrom: "#6dd5ed",
    accentTo: "#2193b0",
  },
  {
    slug: "initio-oud-for-greatness",
    original: { name: "Oud for Greatness", house: "Initio", year: 2018, retail: 370 },
    clone: { name: "Oud for Glory", house: "Lattafa", sizeMl: 100 },
    category: "niche",
    gender: "unisex",
    accords: ["oud", "saffron", "woody", "aromatic"],
    topNotes: ["Saffron", "Nutmeg", "Lavender"],
    heartNotes: ["Oud", "Patchouli"],
    baseNotes: ["Musk", "Sandalwood", "Amber"],
    description:
      "Spicy saffron over a deep, animalic oud. Lattafa's Oud for Glory is the breakout clone that put budget oud on the map — bold, long-lasting, and shockingly close.",
    baseCost: 30,
    source: "FragranceBuy",
    matchScore: 88,
    accentFrom: "#c79a3c",
    accentTo: "#4a2c12",
  },
  {
    slug: "kilian-angels-share",
    original: { name: "Angels' Share", house: "Kilian", year: 2020, retail: 295 },
    clone: { name: "Khamrah", house: "Lattafa", sizeMl: 100 },
    category: "niche",
    gender: "unisex",
    accords: ["warm spicy", "boozy", "sweet", "vanilla"],
    topNotes: ["Cinnamon", "Nutmeg", "Bergamot"],
    heartNotes: ["Praline", "Dates", "Tuberose", "Mahogany"],
    baseNotes: ["Vanilla", "Tonka Bean", "Benzoin", "Amberwood"],
    description:
      "Cognac, cinnamon, and dates wrapped in creamy vanilla. Khamrah became a viral sensation as the cozy, gourmand cold-weather clone of Angels' Share.",
    baseCost: 33,
    source: "FragranceBuy",
    matchScore: 86,
    accentFrom: "#a8410f",
    accentTo: "#3a1505",
  },
  {
    slug: "mfk-baccarat-rouge-540",
    original: { name: "Baccarat Rouge 540", house: "Maison Francis Kurkdjian", year: 2015, retail: 325 },
    clone: { name: "Jean Lowe Immortal", house: "Maison Alhambra", sizeMl: 100 },
    category: "niche",
    gender: "unisex",
    accords: ["amber", "woody", "sweet", "saffron"],
    topNotes: ["Saffron", "Jasmine"],
    heartNotes: ["Amberwood", "Ambergris"],
    baseNotes: ["Fir Resin", "Cedar"],
    description:
      "That famous airy, sweet, jammy amberwood that took over the internet. Jean Lowe Immortal nails the BR540 signature — maple-saffron glow with serious projection.",
    baseCost: 28,
    source: "FragranceBuy",
    matchScore: 85,
    accentFrom: "#e0457b",
    accentTo: "#7a1233",
  },
  {
    slug: "pdm-layton",
    original: { name: "Layton", house: "Parfums de Marly", year: 2016, retail: 355 },
    clone: { name: "Layla", house: "Maison Alhambra", sizeMl: 100 },
    category: "niche",
    gender: "unisex",
    accords: ["sweet", "spicy", "vanilla", "fruity"],
    topNotes: ["Apple", "Bergamot", "Lavender"],
    heartNotes: ["Geranium", "Violet", "Jasmine"],
    baseNotes: ["Vanilla", "Cardamom", "Guaiac Wood", "Pepper"],
    description:
      "Crisp apple and creamy vanilla with a spicy heart — a crowd-pleasing 'compliment monster.' Maison Alhambra's Layla is an uncannily close, beautifully blended Layton clone.",
    baseCost: 30,
    source: "FragranceBuy",
    matchScore: 88,
    accentFrom: "#5b6cb5",
    accentTo: "#23284a",
  },
  {
    slug: "dior-sauvage",
    original: { name: "Sauvage EDT", house: "Dior", year: 2015, retail: 115 },
    clone: { name: "Tag-Him Pour Homme", house: "Armaf", sizeMl: 100 },
    category: "designer",
    gender: "masculine",
    accords: ["fresh spicy", "amber", "citrus"],
    topNotes: ["Bergamot", "Pepper"],
    heartNotes: ["Sichuan Pepper", "Lavender", "Geranium"],
    baseNotes: ["Ambroxan", "Cedar", "Labdanum"],
    description:
      "The ubiquitous blue-collar crowd-pleaser: fresh bergamot ripped open by peppery ambroxan. Armaf's Tag-Him is the go-to wallet-friendly Sauvage.",
    baseCost: 22,
    source: "FragranceBuy",
    matchScore: 80,
    accentFrom: "#4c7a9c",
    accentTo: "#1b2a33",
  },
  {
    slug: "dior-sauvage-elixir",
    original: { name: "Sauvage Elixir", house: "Dior", year: 2021, retail: 165 },
    clone: { name: "Asad", house: "Lattafa", sizeMl: 100 },
    category: "designer",
    gender: "masculine",
    accords: ["spicy", "sweet", "woody", "lavender"],
    topNotes: ["Cinnamon", "Nutmeg", "Grapefruit"],
    heartNotes: ["Lavender", "Licorice"],
    baseNotes: ["Amber", "Patchouli", "Vanilla"],
    description:
      "A dense, spicy-sweet lavender bomb. Lattafa Asad leans into the rich licorice-and-cinnamon character that made Sauvage Elixir a beast-mode favorite.",
    baseCost: 26,
    source: "FragranceBuy",
    matchScore: 82,
    accentFrom: "#7a4ea0",
    accentTo: "#241433",
  },
  {
    slug: "bleu-de-chanel",
    original: { name: "Bleu de Chanel EDP", house: "Chanel", year: 2014, retail: 135 },
    clone: { name: "Sketch Pour Homme", house: "Armaf", sizeMl: 100 },
    category: "designer",
    gender: "masculine",
    accords: ["citrus", "woody", "amber", "incense"],
    topNotes: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
    heartNotes: ["Ginger", "Nutmeg", "Jasmine"],
    baseNotes: ["Incense", "Cedar", "Sandalwood", "Labdanum"],
    description:
      "Sophisticated citrus-woods with a smoky incense backbone — the safe-blind-buy boardroom scent. Armaf Sketch tracks the Bleu de Chanel DNA closely.",
    baseCost: 25,
    source: "FragranceBuy",
    matchScore: 80,
    accentFrom: "#2c5f8a",
    accentTo: "#10202e",
  },
  {
    slug: "jpg-le-beau",
    original: { name: "Le Beau", house: "Jean Paul Gaultier", year: 2019, retail: 98 },
    clone: { name: "Le Beau Marc", house: "Maison Alhambra", sizeMl: 100 },
    category: "designer",
    gender: "masculine",
    accords: ["coconut", "warm spicy", "woody", "tonka"],
    topNotes: ["Bergamot", "Coconut"],
    heartNotes: ["Tonka Bean", "Cardamom"],
    baseNotes: ["Cedar", "Amberwood"],
    description:
      "Creamy coconut and tonka over warm woods — a flirty, tropical crowd-pleaser. Le Beau Marc is a faithful, well-priced take on Gaultier's Le Beau.",
    baseCost: 24,
    source: "FragranceBuy",
    matchScore: 82,
    accentFrom: "#2f8f6b",
    accentTo: "#12302a",
  },
  {
    slug: "ch-good-girl",
    original: { name: "Good Girl", house: "Carolina Herrera", year: 2016, retail: 128 },
    clone: { name: "Yara", house: "Lattafa", sizeMl: 100 },
    category: "designer",
    gender: "feminine",
    accords: ["sweet", "floral", "vanilla", "tuberose"],
    topNotes: ["Orchid", "Heliotrope", "Tuberose"],
    heartNotes: ["Jasmine", "Orange Blossom"],
    baseNotes: ["Vanilla", "Sandalwood", "Tonka Bean"],
    description:
      "A plush, sweet orchid-and-vanilla floral that radiates. Lattafa's wildly popular Yara captures the modern feminine sweetness in the Good Girl lane.",
    baseCost: 26,
    source: "FragranceBuy",
    matchScore: 74,
    accentFrom: "#c0497f",
    accentTo: "#3a1228",
  },
  {
    slug: "coco-mademoiselle",
    original: { name: "Coco Mademoiselle", house: "Chanel", year: 2001, retail: 135 },
    clone: { name: "Club de Nuit Women", house: "Armaf", sizeMl: 105 },
    category: "designer",
    gender: "feminine",
    accords: ["citrus", "rose", "patchouli", "musk"],
    topNotes: ["Orange", "Bergamot", "Mandarin"],
    heartNotes: ["Rose", "Jasmine", "Litchi"],
    baseNotes: ["Patchouli", "Vanilla", "White Musk", "Vetiver"],
    description:
      "The timeless elegant rose-patchouli that defined a generation. Armaf's Club de Nuit Women is the long-running, well-loved Coco Mademoiselle clone.",
    baseCost: 30,
    source: "FragranceBuy",
    matchScore: 82,
    accentFrom: "#d98b3a",
    accentTo: "#3d2410",
  },
  {
    slug: "dg-the-one-men",
    original: { name: "The One for Men", house: "Dolce & Gabbana", year: 2008, retail: 98 },
    clone: { name: "Fakhar Men", house: "Lattafa", sizeMl: 100 },
    category: "designer",
    gender: "masculine",
    accords: ["warm spicy", "tobacco", "amber", "ginger"],
    topNotes: ["Ginger", "Bergamot", "Coriander"],
    heartNotes: ["Cardamom", "Orange Blossom", "Tobacco"],
    baseNotes: ["Amber", "Cedar", "Tonka Bean"],
    description:
      "A warm, spicy, slightly sweet amber-tobacco — the classic date-night signature. Lattafa Fakhar Men is a smooth, dressed-up clone of The One.",
    baseCost: 24,
    source: "FragranceBuy",
    matchScore: 78,
    accentFrom: "#b07d2e",
    accentTo: "#352208",
  },
  {
    slug: "versace-eros",
    original: { name: "Eros", house: "Versace", year: 2012, retail: 98 },
    clone: { name: "Maze", house: "Lattafa", sizeMl: 100 },
    category: "designer",
    gender: "masculine",
    accords: ["fresh", "sweet", "minty", "vanilla"],
    topNotes: ["Mint", "Green Apple", "Lemon"],
    heartNotes: ["Geranium", "Ambroxan"],
    baseNotes: ["Vanilla", "Tonka Bean", "Cedar", "Vetiver"],
    description:
      "Icy mint and sweet apple over a vanilla-tonka base — the nightclub blue beast. Lattafa Maze offers a budget route to that fresh-sweet Eros vibe.",
    baseCost: 24,
    source: "FragranceBuy",
    matchScore: 72,
    accentFrom: "#2f6fb0",
    accentTo: "#0f2336",
  },
];

/** Look up a single fragrance by slug. */
export function getFragrance(slug: string): Fragrance | undefined {
  return fragrances.find((f) => f.slug === slug);
}

/** All slugs (for static generation). */
export function allSlugs(): string[] {
  return fragrances.map((f) => f.slug);
}

/** Unique, sorted list of accords across the catalog (for filters). */
export function allAccords(): string[] {
  const set = new Set<string>();
  fragrances.forEach((f) => f.accords.forEach((a) => set.add(a)));
  return Array.from(set).sort();
}
