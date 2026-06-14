import type { Brand, CatalogEntry, EntryKind } from "@/lib/types";
import { PREFIX_KINDS } from "@/lib/routing";
import {
  brands, entries as seedEntries, settings, nav, heroSlides, categoryTiles, whyAZ, footerLinks,
} from "./seed";
import * as strapi from "./strapi";

/* Data access layer — the seam between the site and its content source.
   DATA_SOURCE=strapi → live CMS; otherwise the local taxonomy seed.
   Catalog ENTRIES are the editable content (CMS-driven). The brand reference
   list stays static (stable vendor names/logos) so the sync getBrands() lookup
   used inside components keeps working in both modes. */

const USE_STRAPI = process.env.DATA_SOURCE === "strapi";

export { settings, nav, heroSlides, categoryTiles, whyAZ, footerLinks, brands };

export async function getAllEntries(): Promise<CatalogEntry[]> {
  return USE_STRAPI ? strapi.getAllEntries() : seedEntries;
}

export async function getEntriesByKind(kind: EntryKind): Promise<CatalogEntry[]> {
  if (USE_STRAPI) return strapi.getEntriesByKind(kind);
  return seedEntries.filter((e) => e.kind === kind);
}

export async function getFeatured(): Promise<CatalogEntry[]> {
  return (await getAllEntries()).filter((e) => e.featured);
}

export async function getChildren(parentSlug: string): Promise<CatalogEntry[]> {
  return (await getAllEntries()).filter((e) => e.parentSlug === parentSlug);
}

export async function getEntryForPrefix(prefix: string, slug: string): Promise<CatalogEntry | null> {
  const kinds = PREFIX_KINDS[prefix] ?? [];
  return (await getAllEntries()).find((e) => e.slug === slug && kinds.includes(e.kind)) ?? null;
}

export async function getEntriesForPrefix(prefix: string): Promise<CatalogEntry[]> {
  const kinds = PREFIX_KINDS[prefix] ?? [];
  return (await getAllEntries()).filter((e) => kinds.includes(e.kind));
}

// Brand reference list (static, both modes) — stable vendor names for sync lookup.
export function getBrands(slugs?: string[]): Brand[] {
  if (!slugs?.length) return brands.filter((b) => b.showInPartnerStrip);
  return slugs.map((s) => brands.find((b) => b.slug === s)).filter(Boolean) as Brand[];
}
