"use client";

import { useMemo, useState } from "react";
import type { Brand, CatalogEntry } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { QuoteButton } from "./QuoteButton";
import { Icon } from "./Icon";

export function Listing({
  title, entries, brands,
}: { title: string; entries: CatalogEntry[]; brands: Brand[] }) {
  const [brand, setBrand] = useState<string | null>(null);
  const filtered = useMemo(
    () => (brand ? entries.filter((e) => e.brandSlugs?.includes(brand)) : entries),
    [brand, entries],
  );
  const availableBrands = useMemo(() => {
    const set = new Set(entries.flatMap((e) => e.brandSlugs ?? []));
    return brands.filter((b) => set.has(b.slug));
  }, [entries, brands]);

  return (
    <div className="az-container py-8">
      <h1 className="text-2xl font-extrabold text-navy md:text-3xl">{title}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-4">
          {availableBrands.length > 0 && (
            <div className="rounded-xl2 border border-ink/10 bg-white p-4">
              <p className="mb-2 text-sm font-bold text-navy">Lọc theo hãng</p>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                <button onClick={() => setBrand(null)}
                  className={`rounded-lg px-3 py-1.5 text-sm ${!brand ? "az-grad font-semibold text-white" : "text-ink/60 hover:text-primary"}`}>
                  Tất cả
                </button>
                {availableBrands.map((b) => (
                  <button key={b.slug} onClick={() => setBrand(b.slug)}
                    className={`rounded-lg px-3 py-1.5 text-sm ${brand === b.slug ? "az-grad font-semibold text-white" : "text-ink/60 hover:text-primary"}`}>
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="rounded-xl2 az-grad-soft p-4 text-center">
            <p className="text-sm font-semibold text-navy">Không tìm thấy thứ cần tìm?</p>
            <QuoteButton className="mt-2 w-full rounded-lg az-grad px-3 py-2 text-sm font-bold text-white">Liên hệ tư vấn</QuoteButton>
          </div>
        </aside>

        <div>
          {filtered.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((e) => <ProductCard key={`${e.kind}-${e.slug}`} entry={e} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-ink/15 bg-white py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary">
                <Icon name="search" className="h-7 w-7" />
              </span>
              <p className="mt-4 font-bold text-navy">Chưa có mục nào khớp bộ lọc</p>
              <p className="mt-1 max-w-sm text-sm text-ink/60">
                Thử bỏ bộ lọc, hoặc để AZ Technology tư vấn đúng giải pháp cho bạn.
              </p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setBrand(null)} className="rounded-lg border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-50">Xóa bộ lọc</button>
                <QuoteButton className="rounded-lg az-grad px-4 py-2 text-sm font-bold text-white">Liên hệ tư vấn</QuoteButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
