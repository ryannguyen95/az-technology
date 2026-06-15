import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/EntryDetail";
import { Listing } from "@/components/Listing";
import {
  getEntriesByKind, getEntryForPrefix, getChildren, getBrands,
} from "@/lib/data";
import { entryHref } from "@/lib/routing";
import { stripHtml } from "@/lib/strip";

export const revalidate = 3600; // time-based ISR backstop (eng review T2)

export async function generateStaticParams() {
  const cats = await getEntriesByKind("category");
  return [{ slug: "phan-mem" }, ...cats.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "phan-mem") return { title: "Phần mềm bản quyền" };
  const e = await getEntryForPrefix("danh-muc", slug);
  if (!e) return {};
  return { title: e.seo?.metaTitle ?? e.title, description: e.seo?.metaDescription ?? stripHtml(e.summary) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brands = getBrands();

  // Virtual "phan-mem" group → list all software
  if (slug === "phan-mem") {
    const software = await getEntriesByKind("software");
    return <Listing title="Phần mềm bản quyền" entries={software} brands={brands} />;
  }

  const entry = await getEntryForPrefix("danh-muc", slug);
  if (!entry) notFound();

  const children = await getChildren(slug);
  if (children.length) {
    return <Listing title={entry.title} entries={children} brands={brands} />;
  }

  const crumbs = [
    { label: "Sản phẩm", href: "/danh-muc/thiet-bi-van-phong" },
    ...(entry.parentSlug ? [{ label: entry.parentSlug, href: entryHref("category", entry.parentSlug) }] : []),
    { label: entry.title },
  ];
  return <EntryDetail entry={entry} crumbs={crumbs} />;
}
