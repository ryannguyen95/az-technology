import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/EntryDetail";
import { getEntriesByKind, getEntryForPrefix } from "@/lib/data";
import { stripHtml } from "@/lib/strip";

export const revalidate = 3600;

export async function generateStaticParams() {
  const list = await getEntriesByKind("service");
  return list.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntryForPrefix("dich-vu", slug);
  if (!e) return {};
  return { title: e.seo?.metaTitle ?? e.title, description: e.seo?.metaDescription ?? stripHtml(e.summary) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryForPrefix("dich-vu", slug);
  if (!entry) notFound();
  return <EntryDetail entry={entry} crumbs={[{ label: "Dịch vụ", href: "/dich-vu/dich-vu-it-co-ban" }, { label: entry.title }]} />;
}
