import type { EntryKind } from "./types";

// Single source of truth: kind -> URL path. Reused by cards, breadcrumbs,
// mega-menu, and the sitemap so URLs never drift (eng review T8).
const KIND_PREFIX: Record<EntryKind, string> = {
  category: "/danh-muc",
  solution: "/giai-phap",
  service: "/dich-vu",
  software: "/san-pham",
  product: "/san-pham",
};

export function entryHref(kind: EntryKind, slug: string): string {
  return `${KIND_PREFIX[kind]}/${slug}`;
}

// Which kinds resolve under a given route prefix (per-kind route filtering).
export const PREFIX_KINDS: Record<string, EntryKind[]> = {
  "danh-muc": ["category"],
  "giai-phap": ["solution"],
  "dich-vu": ["service"],
  "san-pham": ["software", "product"],
};
