import type { Brand, CatalogEntry, EntryKind, HeroBanner, HomeSection, SiteSettings } from "@/lib/types";
import { PREFIX_KINDS, entryHref } from "@/lib/routing";
import { NAV_STATIC_TAIL, type MegaItem, type MegaColumn } from "@/lib/nav";
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
  const all = USE_STRAPI ? await strapi.getAllEntries() : seedEntries;
  // Điền tên nhóm cha (parentTitle) cho mỗi entry để card hiển thị nhóm THẬT
  // (Phần mềm/Phần cứng/Dịch vụ IT/Giải pháp) thay vì nhãn hardcode theo kind.
  const titleBySlug = new Map(all.map((e) => [e.slug, e.title]));
  return all.map((e) =>
    e.parentSlug && titleBySlug.has(e.parentSlug)
      ? { ...e, parentTitle: titleBySlug.get(e.parentSlug) }
      : e,
  );
}

export async function getEntriesByKind(kind: EntryKind): Promise<CatalogEntry[]> {
  // `kind` is derived in the adapter, so filter the full list (works in both modes).
  return (await getAllEntries()).filter((e) => e.kind === kind);
}

export async function getBanners(): Promise<HeroBanner[]> {
  return USE_STRAPI ? strapi.getBanners() : [];
}

// Site settings: live from the CMS (strapi mode), with the static `settings`
// object as defaults for any field the editor left blank. Falls back to the
// static defaults entirely if the CMS call fails.
export async function getSettings(): Promise<SiteSettings> {
  if (!USE_STRAPI) return settings;
  try {
    const cms = await strapi.getSettings();
    const filled = Object.fromEntries(Object.entries(cms).filter(([, v]) => v != null && v !== ""));
    return { ...settings, ...filled } as SiteSettings;
  } catch {
    return settings;
  }
}

export async function getChildren(parentSlug: string): Promise<CatalogEntry[]> {
  return (await getAllEntries()).filter((e) => e.parentSlug === parentSlug);
}

// Breadcrumb trail for a detail/listing page: walks parentSlug up to the root
// so a product reads Danh mục cha › Danh mục con › Sản phẩm, and a category
// reads Danh mục cha › Danh mục con. The caller prepends "Trang chủ".
export async function getBreadcrumb(entry: CatalogEntry): Promise<{ label: string; href?: string }[]> {
  const all = await getAllEntries();
  const bySlug = new Map(all.map((e) => [e.slug, e]));
  const chain: CatalogEntry[] = [];
  let cur = entry.parentSlug ? bySlug.get(entry.parentSlug) : undefined;
  const guard = new Set<string>();
  while (cur && !guard.has(cur.slug)) {
    guard.add(cur.slug);
    chain.unshift(cur);
    cur = cur.parentSlug ? bySlug.get(cur.parentSlug) : undefined;
  }
  return [...chain.map((c) => ({ label: c.title, href: entryHref(c.kind, c.slug) })), { label: entry.title }];
}

export async function getEntryForPrefix(prefix: string, slug: string): Promise<CatalogEntry | null> {
  const kinds = PREFIX_KINDS[prefix] ?? [];
  return (await getAllEntries()).find((e) => e.slug === slug && kinds.includes(e.kind)) ?? null;
}

export async function getEntriesForPrefix(prefix: string): Promise<CatalogEntry[]> {
  const kinds = PREFIX_KINDS[prefix] ?? [];
  return (await getAllEntries()).filter((e) => kinds.includes(e.kind));
}

// Mega-menu built LIVE from the catalog so it always matches the real taxonomy
// (categories + products) with working deep links. Falls back gracefully if a
// menu's data is missing. The PHẦN MỀM/PHẦN CỨNG menus drill category→product;
// DỊCH VỤ IT/GIẢI PHÁP list their actual service/solution entries.
const stripHtml = (s?: string) => (s ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export async function getMegaNav(): Promise<MegaItem[]> {
  const all = await getAllEntries();
  const bySlug = new Map(all.map((e) => [e.slug, e]));
  const byOrder = (a: CatalogEntry, b: CatalogEntry) => (a.order ?? 0) - (b.order ?? 0);
  const childrenOf = (slug: string) => all.filter((e) => e.parentSlug === slug).sort(byOrder);

  const link = (e: CatalogEntry) => ({ label: e.title, href: entryHref(e.kind, e.slug) });

  const menuItem = (menuSlug: string, label: string): MegaItem | null => {
    const menu = bySlug.get(menuSlug);
    if (!menu) return null;
    const children = childrenOf(menuSlug);
    if (!children.length) return null;
    const subCats = children.filter((c) => c.kind === "category");

    let columns: MegaColumn[];
    let firstProduct: CatalogEntry | undefined;
    if (subCats.length) {
      columns = subCats.map((c) => ({
        heading: c.title,
        href: entryHref(c.kind, c.slug),
        items: childrenOf(c.slug).slice(0, 8).map(link),
      }));
      firstProduct = childrenOf(subCats[0].slug)[0];
    } else {
      // flat menu: products listed directly (e.g. Dịch vụ IT, Giải pháp)
      const half = Math.ceil(children.length / 2);
      columns = children.length > 5
        ? [{ heading: menu.title, items: children.slice(0, half).map(link) }, { heading: " ", items: children.slice(half).map(link) }]
        : [{ heading: menu.title, items: children.map(link) }];
      firstProduct = children[0];
    }

    const item: MegaItem = { key: menuSlug, label, href: entryHref(menu.kind, menu.slug), columns };
    if (firstProduct) {
      item.featured = {
        tag: firstProduct.badge || "Nổi bật", title: firstProduct.title,
        desc: stripHtml(firstProduct.summary).slice(0, 110), href: entryHref(firstProduct.kind, firstProduct.slug),
      };
    }
    return item;
  };

  // Menu tabs = every top-level category (no parent), ordered by `order`.
  // Phần mềm / Phần cứng have sub-categories; Dịch vụ IT / Giải pháp list products
  // directly. Add/reorder a top category in the CMS → the menu bar updates.
  const topCategories = all
    .filter((e) => e.kind === "category" && e.parentSlug == null)
    .sort(byOrder);

  const items = topCategories
    .map((c) => menuItem(c.slug, c.title.toUpperCase()))
    .filter((x): x is MegaItem => x !== null);

  return [...items, ...NAV_STATIC_TAIL];
}

// Configurable homepage sections (CMS page builder). In strapi mode they're fully
// editor-driven (order, titles, section type, sub-sections, picked products/
// categories — a Strapi dynamic zone on the `home-page` single-type). In seed
// mode we build a sensible default. Slugs are resolved to full entries here so
// both modes hand components the same CatalogEntry[]/CategoryTile[] shape.
export async function getHomeSections(): Promise<HomeSection[]> {
  const all = await getAllEntries();
  const bySlug = new Map(all.map((e) => [e.slug, e]));
  const pick = (slugs: string[]) => slugs.map((s) => bySlug.get(s)).filter((e): e is CatalogEntry => !!e);

  if (USE_STRAPI) {
    // Parent categories render as kind "category" → /danh-muc/<slug>, same URL the
    // menu bar links to. Only build the href for a slug that actually exists.
    const moreHref = (slug?: string) =>
      slug && bySlug.has(slug) ? entryHref("category", slug) : undefined;
    const raw = await strapi.getHomeSections();
    return raw.map((s): HomeSection => {
      if (s.type === "category-list") {
        return {
          type: "category-list",
          title: s.title,
          tiles: pick(s.categorySlugs).map((c) => ({ label: c.title, icon: c.icon ?? "cpu", href: entryHref(c.kind, c.slug) })),
        };
      }
      return {
        type: "product-list",
        title: s.title,
        products: pick(s.productSlugs),
        moreHref: moreHref(s.moreParentSlug),
        subsections: s.subsections.map((ss) => ({
          title: ss.title,
          products: pick(ss.productSlugs),
          moreHref: moreHref(ss.moreParentSlug),
        })),
      };
    });
  }

  // seed-mode default — reproduces the pre-page-builder homepage: a category
  // tile grid ("Khám phá theo nhóm giải pháp") followed by the product-list rows.
  const byKind = (k: EntryKind, n?: number) => {
    const list = all.filter((e) => e.kind === k);
    return n ? list.slice(0, n) : list;
  };
  const catHref = (slug: string) => entryHref("category", slug);
  return [
    { type: "category-list", title: "Khám phá theo nhóm giải pháp", tiles: categoryTiles },
    {
      type: "product-list",
      title: "SẢN PHẨM NỔI BẬT",
      products: [],
      subsections: [
        { title: "Phần mềm", products: byKind("software", 12), moreHref: catHref("phan-mem") },
        { title: "Phần cứng", products: byKind("product", 12), moreHref: catHref("phan-cung") },
      ],
    },
    { type: "product-list", title: "GIẢI PHÁP DOANH NGHIỆP", products: byKind("solution"), subsections: [], moreHref: catHref("giai-phap") },
    { type: "product-list", title: "DỊCH VỤ IT", products: byKind("service"), subsections: [], moreHref: catHref("dich-vu-it") },
  ];
}

// Home category tiles — the real product sub-categories (under both menus),
// ordered, linking to their category pages. Driven by the catalog.
export async function getCategoryTiles(): Promise<{ label: string; icon: string; href: string }[]> {
  const all = await getAllEntries();
  const byOrder = (a: CatalogEntry, b: CatalogEntry) => (a.order ?? 0) - (b.order ?? 0);
  return all
    .filter((e) => e.kind === "category" && (e.parentSlug === "phan-cung" || e.parentSlug === "phan-mem"))
    .sort(byOrder)
    .slice(0, 10)
    .map((c) => ({ label: c.title, icon: c.icon ?? "cpu", href: entryHref(c.kind, c.slug) }));
}

// Footer link columns — products/solutions/services pulled from the catalog,
// plus a static support column.
export async function getFooterNav(): Promise<{ title: string; links: { label: string; href: string }[] }[]> {
  const all = await getAllEntries();
  const byOrder = (a: CatalogEntry, b: CatalogEntry) => (a.order ?? 0) - (b.order ?? 0);
  const link = (e: CatalogEntry) => ({ label: e.title, href: entryHref(e.kind, e.slug) });
  const subs = (menu: string) => all.filter((e) => e.kind === "category" && e.parentSlug === menu).sort(byOrder);
  return [
    {
      title: "Sản phẩm",
      links: [
        { label: "Phần mềm bản quyền", href: "/danh-muc/phan-mem" },
        ...subs("phan-mem").slice(0, 2).map(link),
        { label: "Phần cứng chính hãng", href: "/danh-muc/phan-cung" },
        ...subs("phan-cung").slice(0, 2).map(link),
      ],
    },
    { title: "Giải pháp & Dịch vụ", links: [...subs("giai-phap").slice(0, 5).map(link), ...subs("dich-vu-it").map(link)] },
    {
      title: "Hỗ trợ",
      links: [
        { label: "Về AZ Technology", href: "/ve-az" },
        { label: "Liên hệ – góp ý", href: "/lien-he" },
        { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
        { label: "Bản đồ", href: "/lien-he#map" },
      ],
    },
  ];
}

// Brand reference list (static, both modes) — stable vendor names for sync lookup.
export function getBrands(slugs?: string[]): Brand[] {
  if (!slugs?.length) return brands.filter((b) => b.showInPartnerStrip);
  return slugs.map((s) => brands.find((b) => b.slug === s)).filter(Boolean) as Brand[];
}
