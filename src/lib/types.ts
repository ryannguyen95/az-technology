// Unified content model (eng + design review decision 2026-06-14).
// One CatalogEntry type with a `kind` discriminator + a composable block body.

export type EntryKind = "category" | "solution" | "service" | "software" | "product";
export type PriceMode = "show" | "contact";
export type Tone = "blue" | "cyan" | "green" | "red" | "navy";

// Dynamic-zone blocks — each entry composes only what it needs.
export type Block =
  | { type: "richText"; html: string }
  | { type: "featureList"; title?: string; items: { title: string; text?: string }[] }
  | { type: "specAccordion"; title?: string; rows: { label: string; value: string }[] }
  | { type: "processSteps"; title?: string; steps: { title: string; text?: string }[] }
  | { type: "faq"; title?: string; items: { q: string; a: string }[] }
  | { type: "brandStrip"; title?: string; brandSlugs: string[] }
  | { type: "cta"; heading: string; sub?: string };

export interface CatalogEntry {
  kind: EntryKind;
  slug: string;
  title: string;
  parentSlug?: string; // hierarchy: group -> sub-entry
  order?: number;
  icon?: string;
  tone?: Tone;
  badge?: string;
  summary?: string;
  coverImage?: string | null;
  gallery?: string[];
  brandSlugs?: string[];
  featured?: boolean;
  // pricing
  priceMode: PriceMode; // "show" -> render price block; "contact" -> "Liên hệ báo giá"
  priceOld?: number | null;
  priceNew?: number | null;
  priceFromLabel?: string;
  rating?: number;
  reviews?: number;
  // detail body
  body?: Block[];
  // seo
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface Brand {
  slug: string;
  name: string;
  logo?: string | null;
  showInPartnerStrip?: boolean;
  website?: string;
}

export interface HeroSlide {
  id: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  tone?: Tone;
}

export interface CategoryTile {
  label: string;
  icon: string;
  href: string;
}

export interface SiteSettings {
  company: string;
  shortName: string;
  slogan: string;
  hotline: string;
  email: string;
  address: string;
  zaloUrl: string;
  mapUrl: string;
}

export interface NavColumn {
  heading: string;
  links: { label: string; href: string }[];
}
export interface NavItem {
  label: string;
  href: string;
  columns?: NavColumn[];
}

export interface QuoteRequestInput {
  name: string;
  phone: string;
  email: string;
  company?: string;
  interest?: string;
  message?: string;
  consentGiven: boolean;
  sourcePage?: string;
  // honeypot — must be empty
  website?: string;
}
