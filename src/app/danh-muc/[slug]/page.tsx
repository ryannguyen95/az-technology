import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/EntryDetail";
import { Listing } from "@/components/Listing";
import { getEntriesByKind, getEntryForPrefix, getChildren, getBrands, getBreadcrumb } from "@/lib/data";
import { stripHtml } from "@/lib/strip";

export const revalidate = 3600; // time-based ISR backstop (eng review T2)

export async function generateStaticParams() {
  const cats = await getEntriesByKind("category");
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntryForPrefix("danh-muc", slug);
  if (!e) return {};
  return { title: e.seo?.metaTitle ?? e.title, description: e.seo?.metaDescription ?? stripHtml(e.summary) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brands = getBrands();

  const entry = await getEntryForPrefix("danh-muc", slug);
  if (!entry) notFound();

  const trail = await getBreadcrumb(entry); // Danh mục cha › Danh mục con

  // A category lists its children (sub-categories or products).
  const children = await getChildren(slug);
  if (children.length) {
    return (
      <Listing
        title={entry.title}
        entries={children}
        brands={brands}
        crumbs={[{ label: "Trang chủ", href: "/" }, ...trail]}
      />
    );
  }

  // Empty category (e.g. a Giải pháp / Dịch vụ con) → render its own intro.
  return <EntryDetail entry={entry} crumbs={trail} />;
}
