import type { CatalogEntry, Tone } from "./types";
import { entryHref } from "./routing";
import { brands as ALL_BRANDS } from "./data/seed";
import { stripHtml } from "./strip";

// Normalized shape the design's ProductCard / detail components consume.
export interface CardProduct {
  id: string;
  name: string;
  cat: string;
  brand?: string;
  badge?: string;
  tone: Tone;
  icon?: string;
  href: string;
  coverImage?: string | null;
  gallery?: string[];
}

const KIND_LABEL: Record<string, string> = {
  software: "Phần mềm",
  solution: "Giải pháp",
  service: "Dịch vụ",
  category: "Danh mục", // fallback; danh mục con hiển thị tên nhóm cha (e.parentTitle)
  product: "Sản phẩm",
};

const brandName = (slug?: string) =>
  slug ? ALL_BRANDS.find((b) => b.slug === slug)?.name ?? slug : undefined;

// Derive the small uppercase eyebrow line ("Cloud · Microsoft" style) from
// whatever the CMS entry actually has: kind label + first brand.
function catLine(e: CatalogEntry): string {
  const bn = brandName(e.brandSlugs?.[0]);
  // Danh mục con: eyebrow = nhóm cha thật (Phần mềm/Phần cứng/…), KHÔNG hardcode theo kind.
  if (e.kind === "category") return e.parentTitle ?? KIND_LABEL.category;
  const kind = KIND_LABEL[e.kind] ?? "Sản phẩm";
  return bn ? `${kind} · ${bn}` : kind;
}

export function toCard(e: CatalogEntry): CardProduct {
  return {
    id: e.slug,
    name: e.title,
    cat: catLine(e),
    brand: brandName(e.brandSlugs?.[0]),
    badge: e.badge,
    tone: (e.tone as Tone) ?? "blue",
    icon: e.icon,
    href: entryHref(e.kind, e.slug),
    coverImage: e.coverImage ?? null,
    gallery: e.gallery,
  };
}

export { stripHtml };
