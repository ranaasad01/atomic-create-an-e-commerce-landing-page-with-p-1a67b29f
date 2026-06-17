// ─── Brand constants ────────────────────────────────────────────────────────
export const BRAND_NAME = "Lumière";
export const BRAND_TAGLINE = "Curated for the way you live.";

// ─── Navigation (single source of truth) ────────────────────────────────────
// All hrefs are on-page anchors — no separate routes exist yet.
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Shop", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

// ─── Shared product type ─────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  isNew?: boolean;
}

// ─── Shared category type ────────────────────────────────────────────────────
export interface Category {
  id: string;
  label: string;
}