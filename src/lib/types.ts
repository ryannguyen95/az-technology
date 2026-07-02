// Unified content model (eng + design review decision 2026-06-14).
// One CatalogEntry type with a `kind` discriminator + a composable block body.

export type EntryKind = "category" | "solution" | "service" | "software" | "product";
export type Tone = "blue" | "cyan" | "green" | "red" | "navy";

// Dynamic-zone blocks — each entry composes only what it needs.
export type Block =
  | { type: "richText"; heading?: string; html: string }
  | { type: "specAccordion"; title?: string; rows: { label: string; value: string }[] }
  | { type: "faq"; title?: string; items: { q: string; a: string }[] }
  | { type: "brandStrip"; title?: string; brandSlugs: string[] };

export interface CatalogEntry {
  kind: EntryKind;
  slug: string;
  title: string;
  headline?: string; // long display title for the detail page H1 (falls back to title)
  parentSlug?: string; // hierarchy: group -> sub-entry
  order?: number;
  icon?: string;
  tone?: Tone;
  badge?: string;
  summary?: string;
  highlights?: string[]; // ✓ feature bullets shown as a checklist under the title
  coverImage?: string | null;
  gallery?: string[];
  brandSlugs?: string[];
  // detail content — two tabs: description (HTML) + specs/system requirements (HTML)
  description?: string;
  specs?: string;
  body?: Block[]; // legacy/unused — kept for backward compatibility
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

// Image-only hero banner: one uploaded image + a CTA link (managed in the CMS).
export interface HeroBanner {
  id: string;
  title: string;
  image: string | null;
  ctaLabel?: string;
  ctaHref?: string;
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

// Configurable homepage sections (CMS-driven). Each section / sub-section is one
// ordered product list; the homepage shows the first 5 and reveals the rest inline.
export interface HomeSubsection {
  title: string;
  products: CatalogEntry[];
  moreHref?: string; // "Xem thêm" links to a chosen parent-category page
}
export interface HomeSection {
  title: string;
  products: CatalogEntry[];
  subsections: HomeSubsection[];
  moreHref?: string; // "Xem thêm" links to a chosen parent-category page
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
