import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/EntryDetail";
import { getBreadcrumb, getEntriesByKind, getEntryForPrefix } from "@/lib/data";
import { stripHtml } from "@/lib/strip";

export const revalidate = 3600;

export async function generateStaticParams() {
  const [sw, prod] = await Promise.all([getEntriesByKind("software"), getEntriesByKind("product")]);
  return [...sw, ...prod].map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntryForPrefix("san-pham", slug);
  if (!e) return {};
  return { title: e.seo?.metaTitle ?? e.title, description: e.seo?.metaDescription ?? stripHtml(e.summary) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryForPrefix("san-pham", slug);
  if (!entry) notFound();

  // Product JSON-LD (quote-driven: no price/rating).
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: entry.title,
    description: stripHtml(entry.summary),
  };

  const crumbs = await getBreadcrumb(entry);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <EntryDetail entry={entry} crumbs={crumbs} />
    </>
  );
}
