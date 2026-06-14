import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/EntryDetail";
import { getEntriesByKind, getEntryForPrefix } from "@/lib/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const list = await getEntriesByKind("solution");
  return list.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntryForPrefix("giai-phap", slug);
  if (!e) return {};
  return { title: e.seo?.metaTitle ?? e.title, description: e.seo?.metaDescription ?? e.summary };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryForPrefix("giai-phap", slug);
  if (!entry) notFound();
  return <EntryDetail entry={entry} crumbs={[{ label: "Giải pháp", href: "/giai-phap/ha-tang-data-center" }, { label: entry.title }]} />;
}
