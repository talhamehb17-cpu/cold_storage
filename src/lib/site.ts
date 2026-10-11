/**
 * Site-wide content constants.
 *
 * Only verifiable information is stored here. Anything not supplied by the
 * business is intentionally flagged as `null` so the UI can render a neutral
 * placeholder instead of inventing details (certifications, statistics,
 * customer logos, coverage claims, exact product temperatures, etc.).
 */

export const COMPANY = {
  name: "Tahseen Jaber Cold Storage & Logistics",
  shortName: "Tahseen Jaber",
  tagline: "Cold Storage & Logistics",
  address: {
    area: "Uuayrij Industrial Area",
    city: "Baghdad",
    country: "Iraq",
    display: "Uuayrij Industrial Area, Baghdad, Iraq",
  },
  /** Not supplied by the business — do not invent. */
  phone: null as string | null,
  email: null as string | null,
  hours: "Operations monitored continuously",
} as const;

export type NavItem = { label: string; href: string; id: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Cold Chain", href: "#cold-chain", id: "cold-chain" },
  { label: "Solutions", href: "#solutions", id: "solutions" },
  { label: "Facility", href: "#facility", id: "facility" },
  { label: "Security", href: "#security", id: "security" },
  { label: "Logistics", href: "#logistics", id: "logistics" },
  { label: "Contact", href: "#contact", id: "contact" },
];

/** Section anchors observed by the scroll-spy (nav item order). */
export const SPY_SECTIONS = [
  "top",
  "cold-chain",
  "temperature",
  "products",
  "facility",
  "inventory",
  "security",
  "logistics",
  "solutions",
  "trust",
  "contact",
] as const;

export const PRODUCT_TYPES = [
  "Fruits & Vegetables",
  "Meat & Chicken",
  "Seafood",
  "Pharmaceuticals",
  "Mixed / Multi-category",
  "Other",
] as const;

export const STORAGE_REQUIREMENTS = [
  "Short-term storage",
  "Long-term storage",
  "Temperature-controlled transport",
  "Storage + logistics",
  "Not sure yet — advise me",
] as const;

/** Social links are only rendered when a real URL is configured. */
export const SOCIAL_LINKS: { label: string; href: string }[] = [];
