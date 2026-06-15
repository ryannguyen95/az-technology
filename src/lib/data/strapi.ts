import type { Block, Brand, CatalogEntry, EntryKind } from "@/lib/types";

/* Strapi v5 adapter. Maps the flat v5 response shape (no data.attributes nesting,
   documentId-based) to the internal CatalogEntry the components already consume.
   Active when DATA_SOURCE=strapi. Components never see Strapi shapes. */

const URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;

async function sFetch(path: string, tags: string[] = []) {
  const res = await fetch(`${URL}/api${path}`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate: 3600, tags: ["strapi", ...tags] },
  });
  if (!res.ok) throw new Error(`Strapi ${path} -> ${res.status}`);
  return res.json();
}

// ── mappers (Strapi DTO -> internal view model) ──
type RawBlock = Record<string, unknown> & { __component: string };

function mapBlock(b: RawBlock): Block | null {
  switch (b.__component) {
    case "blocks.rich-text":
      return { type: "richText", heading: b.heading as string | undefined, html: String(b.html ?? "") };
    case "blocks.spec-accordion":
      return { type: "specAccordion", title: b.title as string | undefined,
        rows: ((b.rows as { label: string; value: string }[]) ?? []) };
    case "blocks.faq":
      return { type: "faq", title: b.title as string | undefined,
        items: ((b.items as { q: string; a: string }[]) ?? []) };
    default:
      return null;
  }
}

type RawEntry = Record<string, any>;
function mapEntry(e: RawEntry): CatalogEntry {
  return {
    kind: e.kind,
    slug: e.slug,
    title: e.title,
    parentSlug: e.parent?.slug,
    order: e.order ?? undefined,
    icon: e.icon ?? undefined,
    tone: e.tone ?? undefined,
    badge: e.badge ?? undefined,
    summary: e.summary ?? undefined,
    coverImage: e.coverImage?.url ? absolute(e.coverImage.url) : null,
    gallery: (e.gallery ?? []).map((m: any) => absolute(m.url)),
    brandSlugs: (e.brands ?? []).map((b: any) => b.slug),
    featured: !!e.featured,
    priceMode: e.priceMode ?? "contact",
    priceOld: e.priceOld ?? null,
    priceNew: e.priceNew ?? null,
    priceFromLabel: e.priceFromLabel ?? undefined,
    rating: e.rating ?? undefined,
    reviews: e.reviews ?? undefined,
    body: (e.body ?? []).map(mapBlock).filter(Boolean) as Block[],
    seo: e.seo ? { metaTitle: e.seo.metaTitle, metaDescription: e.seo.metaDescription } : undefined,
  };
}

function absolute(url: string) {
  return url.startsWith("http") ? url : `${URL}${url}`;
}

const POPULATE =
  "populate[brands][fields][0]=slug&populate[parent][fields][0]=slug" +
  "&populate[coverImage][fields][0]=url&populate[gallery][fields][0]=url" +
  "&populate[seo]=true&populate[body][populate]=*";

export async function getAllEntries(): Promise<CatalogEntry[]> {
  const json = await sFetch(`/catalog-entries?pagination[pageSize]=200&${POPULATE}`, ["catalog-entries"]);
  return (json.data ?? []).map(mapEntry);
}

export async function getEntriesByKind(kind: EntryKind): Promise<CatalogEntry[]> {
  const json = await sFetch(`/catalog-entries?filters[kind][$eq]=${kind}&pagination[pageSize]=200&${POPULATE}`, ["catalog-entries"]);
  return (json.data ?? []).map(mapEntry);
}

export async function getBrandsRaw(): Promise<Brand[]> {
  const json = await sFetch(`/brands?pagination[pageSize]=200&populate[logo][fields][0]=url`, ["brands"]);
  return (json.data ?? []).map((b: any) => ({
    slug: b.slug, name: b.name, logo: b.logo?.url ? absolute(b.logo.url) : null,
    showInPartnerStrip: !!b.showInPartnerStrip, website: b.website ?? undefined,
  }));
}
