import type { Brand, CatalogEntry, EntryKind, HeroBanner, SiteSettings } from "@/lib/types";

/* Strapi v5 adapter. Reads three content shapes — Danh mục cha (parent-category),
   Danh mục con (category) and Sản phẩm (product) — and maps them into the internal
   CatalogEntry shape the components already consume. The `kind` (category/software/
   product/service/solution) is DERIVED from the category tree, so the editor never
   sets it. Active when DATA_SOURCE=strapi. */

const URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const PUBLIC_URL = process.env.STRAPI_PUBLIC_URL ?? URL;
const TOKEN = process.env.STRAPI_API_TOKEN;

// Cache CMS reads for an hour in production (with tags for on-demand purging),
// but never cache in dev so content edits show up on the next request without
// clearing .next/cache.
const CACHE_TTL = process.env.NODE_ENV === "production" ? 3600 : 0;

async function sFetch(path: string, tags: string[] = []) {
  const res = await fetch(`${URL}/api${path}`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate: CACHE_TTL, tags: ["strapi", ...tags] },
  });
  if (!res.ok) throw new Error(`Strapi ${path} -> ${res.status}`);
  return res.json();
}

function absolute(url: string) {
  return url.startsWith("http") ? url : `${PUBLIC_URL}${url}`;
}

// Top-level category slug → entry kind (drives URL prefix + card label).
const TOP_KIND: Record<string, EntryKind> = {
  "phan-mem": "software",
  "phan-cung": "product",
  "dich-vu-it": "service",
  "giai-phap": "solution",
};

// Danh mục cha — the 4 top-level groups (no parent).
async function fetchParentCategories(): Promise<CatalogEntry[]> {
  const json = await sFetch(
    `/parent-categories?pagination[pageSize]=50&sort=order:asc`,
    ["parent-categories"],
  );
  return (json.data ?? []).map((c: any) => ({
    kind: "category" as EntryKind,
    slug: c.slug,
    title: c.title,
    parentSlug: undefined,
    order: c.order ?? undefined,
    icon: c.icon ?? undefined,
    summary: c.summary ?? undefined,
  }));
}

// Danh mục con — each belongs to one parent category; may carry rich `description`.
async function fetchCategories(): Promise<CatalogEntry[]> {
  const json = await sFetch(
    `/categories?pagination[pageSize]=200&sort=order:asc&populate[parent][fields][0]=slug`,
    ["categories"],
  );
  return (json.data ?? []).map((c: any) => ({
    kind: "category" as EntryKind,
    slug: c.slug,
    title: c.title,
    parentSlug: c.parent?.slug ?? undefined,
    order: c.order ?? undefined,
    icon: c.icon ?? undefined,
    summary: c.summary ?? undefined,
    description: c.description ?? undefined,
  }));
}

const PRODUCT_POPULATE =
  "populate[category][fields][0]=slug" +
  "&populate[coverImage][fields][0]=url&populate[gallery][fields][0]=url" +
  "&populate[brands][fields][0]=slug&populate[highlights]=true&populate[seo]=true";

async function fetchProducts(catParent: Map<string, string | undefined>): Promise<CatalogEntry[]> {
  const json = await sFetch(`/products?pagination[pageSize]=500&sort=order:asc&${PRODUCT_POPULATE}`, ["products"]);
  const topOf = (slug?: string) => {
    let s = slug;
    while (s && catParent.get(s)) s = catParent.get(s);
    return s;
  };
  return (json.data ?? []).map((p: any): CatalogEntry => {
    const catSlug: string | undefined = p.category?.slug;
    const kind = TOP_KIND[topOf(catSlug) ?? ""] ?? "product";
    return {
      kind,
      slug: p.slug,
      title: p.title,
      headline: p.headline ?? undefined,
      parentSlug: catSlug,
      order: p.order ?? undefined,
      icon: p.icon ?? undefined,
      tone: p.tone ?? undefined,
      badge: p.badge ?? undefined,
      summary: p.summary ?? undefined,
      highlights: (p.highlights ?? []).map((h: any) => h.text).filter(Boolean),
      coverImage: p.coverImage?.url ? absolute(p.coverImage.url) : null,
      gallery: (p.gallery ?? []).map((m: any) => absolute(m.url)),
      brandSlugs: (p.brands ?? []).map((b: any) => b.slug),
      description: p.description ?? undefined,
      specs: p.specs ?? undefined,
      seo: p.seo ? { metaTitle: p.seo.metaTitle, metaDescription: p.seo.metaDescription } : undefined,
    };
  });
}

export async function getAllEntries(): Promise<CatalogEntry[]> {
  const [parents, cats] = await Promise.all([fetchParentCategories(), fetchCategories()]);
  // con -> cha, plus cha -> (none); lets fetchProducts walk to the top ancestor.
  const catParent = new Map<string, string | undefined>([
    ...parents.map((p) => [p.slug, undefined] as [string, undefined]),
    ...cats.map((c) => [c.slug, c.parentSlug] as [string, string | undefined]),
  ]);
  const prods = await fetchProducts(catParent);
  return [...parents, ...cats, ...prods];
}

export async function getBanners(): Promise<HeroBanner[]> {
  const json = await sFetch(
    `/banners?filters[active][$eq]=true&sort=order:asc&pagination[pageSize]=20&populate[image][fields][0]=url`,
    ["banners"],
  );
  return (json.data ?? []).map((b: any) => ({
    id: b.documentId ?? String(b.id),
    title: b.title,
    image: b.image?.url ? absolute(b.image.url) : null,
    ctaLabel: b.ctaLabel ?? undefined,
    ctaHref: b.ctaHref ?? undefined,
  }));
}

// Home page (single-type, dynamic zone `sections`). Two component types:
// `sections.product-list` (curated product list + optional sub-sections + a
// "Xem thêm" parent-category link) and `sections.category-list` (a grid of
// category tiles). Slugs only — the caller (src/lib/data/index.ts) already
// holds the full catalog and resolves slug → CatalogEntry / tile.
export type RawHomeSection =
  | {
      type: "product-list";
      title: string;
      productSlugs: string[];
      moreParentSlug?: string; // "Xem thêm" → parent-category page
      subsections: { title: string; productSlugs: string[]; moreParentSlug?: string }[];
    }
  | {
      type: "category-list";
      title: string;
      categorySlugs: string[]; // ordered — one tile per category
    };

const HOME_PAGE_POPULATE =
  "populate[sections][on][sections.product-list][populate][products][fields][0]=slug" +
  "&populate[sections][on][sections.product-list][populate][parentCategory][fields][0]=slug" +
  "&populate[sections][on][sections.product-list][populate][subsections][populate][products][fields][0]=slug" +
  "&populate[sections][on][sections.product-list][populate][subsections][populate][parentCategory][fields][0]=slug" +
  "&populate[sections][on][sections.category-list][populate][categories][fields][0]=slug";

export async function getHomeSections(): Promise<RawHomeSection[]> {
  const json = await sFetch(`/home-page?${HOME_PAGE_POPULATE}`, ["home-page"]);
  const slugs = (rel: any[]) => (rel ?? []).map((x: any) => x.slug).filter(Boolean);
  const sections = json.data?.sections ?? [];
  return sections.map((s: any): RawHomeSection => {
    if (s.__component === "sections.category-list") {
      return { type: "category-list", title: s.title, categorySlugs: slugs(s.categories) };
    }
    return {
      type: "product-list",
      title: s.title,
      productSlugs: slugs(s.products),
      moreParentSlug: s.parentCategory?.slug ?? undefined,
      subsections: (s.subsections ?? []).map((ss: any) => ({
        title: ss.title,
        productSlugs: slugs(ss.products),
        moreParentSlug: ss.parentCategory?.slug ?? undefined,
      })),
    };
  });
}

export async function getSettings(): Promise<Partial<SiteSettings>> {
  const json = await sFetch(`/site-setting`, ["site-setting"]);
  const d = json.data ?? {};
  return {
    company: d.company, shortName: d.shortName, slogan: d.slogan, hotline: d.hotline,
    email: d.email, address: d.address, zaloUrl: d.zaloUrl, mapUrl: d.mapUrl,
  };
}

export async function getBrandsRaw(): Promise<Brand[]> {
  const json = await sFetch(`/brands?pagination[pageSize]=200`, ["brands"]);
  return (json.data ?? []).map((b: any) => ({ slug: b.slug, name: b.name }));
}
