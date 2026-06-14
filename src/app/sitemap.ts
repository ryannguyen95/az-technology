import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/data";
import { entryHref } from "@/lib/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://az-technology.vn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllEntries();
  const staticRoutes = ["", "/danh-muc/phan-mem", "/lien-he", "/ve-az", "/tin-tuc", "/chinh-sach-bao-mat"];
  return [
    ...staticRoutes.map((p) => ({ url: `${SITE}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.6 })),
    ...entries.map((e) => ({ url: `${SITE}${entryHref(e.kind, e.slug)}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
