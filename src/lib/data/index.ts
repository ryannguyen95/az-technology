import type { Brand, CatalogEntry, EntryKind } from "@/lib/types";
import { PREFIX_KINDS } from "@/lib/routing";
import { brands, entries, settings, nav, heroSlides, categoryTiles, whyAZ, footerLinks } from "./seed";

/* Data access layer. Today: local seed (DATA_SOURCE=seed).
   Swap to Strapi by implementing the same functions against the REST API +
   an adapter (Strapi DTO -> CatalogEntry) — components never change. */

export { settings, nav, heroSlides, categoryTiles, whyAZ, footerLinks, brands };

export async function getAllEntries(): Promise<CatalogEntry[]> {
  return entries;
}

export async function getEntriesByKind(kind: EntryKind): Promise<CatalogEntry[]> {
  return entries.filter((e) => e.kind === kind);
}

export async function getFeatured(): Promise<CatalogEntry[]> {
  return entries.filter((e) => e.featured);
}

export async function getChildren(parentSlug: string): Promise<CatalogEntry[]> {
  return entries.filter((e) => e.parentSlug === parentSlug);
}

// Resolve an entry under a route prefix, filtering by the kinds that prefix allows.
export async function getEntryForPrefix(
  prefix: string,
  slug: string,
): Promise<CatalogEntry | null> {
  const kinds = PREFIX_KINDS[prefix] ?? [];
  return entries.find((e) => e.slug === slug && kinds.includes(e.kind)) ?? null;
}

export async function getEntriesForPrefix(prefix: string): Promise<CatalogEntry[]> {
  const kinds = PREFIX_KINDS[prefix] ?? [];
  return entries.filter((e) => kinds.includes(e.kind));
}

export function getBrands(slugs?: string[]): Brand[] {
  if (!slugs?.length) return brands.filter((b) => b.showInPartnerStrip);
  return slugs.map((s) => brands.find((b) => b.slug === s)).filter(Boolean) as Brand[];
}
