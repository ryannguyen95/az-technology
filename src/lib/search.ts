import type { CatalogEntry } from "./types";
import { brands as ALL_BRANDS } from "./data/seed";
import { stripHtml } from "./strip";

// Diacritic-insensitive normalize so "may chu" matches "Máy chủ" and "đ" ~ "d".
export function normalize(s?: string | null): string {
  return (s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

const brandName = (slug: string) => ALL_BRANDS.find((b) => b.slug === slug)?.name ?? slug;

// Everything an entry can be matched against (full-text over its real content).
function haystack(e: CatalogEntry): string {
  return normalize(
    [
      e.title,
      e.headline,
      e.summary,
      e.badge,
      e.parentSlug,
      stripHtml(e.description),
      stripHtml(e.specs),
      ...(e.highlights ?? []),
      ...(e.brandSlugs ?? []).map(brandName),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

// Full-text search across all entry fields. Every query token must appear
// somewhere in the entry; results are ranked with title matches weighted highest.
export function searchEntries(entries: CatalogEntry[], query: string): CatalogEntry[] {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: { e: CatalogEntry; score: number }[] = [];
  for (const e of entries) {
    const hay = haystack(e);
    if (!tokens.every((t) => hay.includes(t))) continue;

    const title = normalize(e.title);
    let score = 0;
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 60;
    else if (title.includes(q)) score += 35;
    for (const t of tokens) if (title.includes(t)) score += 6;
    score -= (e.order ?? 0) * 0.001; // stable tiebreak on curated order
    scored.push({ e, score });
  }

  return scored.sort((a, b) => b.score - a.score).map((s) => s.e);
}
