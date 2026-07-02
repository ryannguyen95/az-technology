import type { Metadata } from "next";
import { Listing } from "@/components/Listing";
import { getAllEntries, getBrands } from "@/lib/data";
import { searchEntries } from "@/lib/search";

export const dynamic = "force-dynamic"; // results depend on the ?q= query

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const term = (q ?? "").trim();
  return {
    title: term ? `Tìm kiếm: ${term}` : "Tìm kiếm",
    robots: { index: false }, // search result pages shouldn't be indexed
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const term = (q ?? "").trim();
  const results = term ? searchEntries(await getAllEntries(), term) : [];

  return (
    <Listing
      title="Tìm kiếm"
      query={term}
      searchable={false}
      entries={results}
      brands={getBrands()}
      crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tìm kiếm" }]}
    />
  );
}
