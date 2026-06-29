"use client";

import { useMemo, useState } from "react";
import type { Brand, CatalogEntry } from "@/lib/types";
import { toCard } from "@/lib/card";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { Breadcrumb } from "./Breadcrumb";
import { ProductCard } from "./ProductCard";
import { CTAStrip } from "./CTAStrip";
import { useQuote } from "./QuoteModal";

const SORT_OPTS = [
  { v: "hot", l: "Phổ biến nhất" },
  { v: "price-asc", l: "Giá thấp → cao" },
  { v: "price-desc", l: "Giá cao → thấp" },
  { v: "rating", l: "Đánh giá cao" },
];

export function Listing({
  title,
  entries,
  brands,
  crumbs,
}: {
  title: string;
  entries: CatalogEntry[];
  brands: Brand[];
  crumbs: { label: string; href?: string }[];
}) {
  const { openQuote } = useQuote();
  const [brand, setBrand] = useState<string[]>([]);
  const [sort, setSort] = useState("hot");
  const [search, setSearch] = useState("");

  const availableBrands = useMemo(() => {
    const set = new Set(entries.flatMap((e) => e.brandSlugs ?? []));
    return brands.filter((b) => set.has(b.slug));
  }, [entries, brands]);

  const toggleBrand = (s: string) => setBrand((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const filtered = useMemo(() => {
    let list = entries;
    if (brand.length) list = list.filter((e) => e.brandSlugs?.some((b) => brand.includes(b)));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(q));
    }
    const arr = [...list];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => (a.priceNew || 9e9) - (b.priceNew || 9e9));
      case "price-desc":
        return arr.sort((a, b) => (b.priceNew || 0) - (a.priceNew || 0));
      case "rating":
        return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviews || 0) - (a.reviews || 0));
      default:
        return arr;
    }
  }, [entries, brand, sort, search]);

  const cards = filtered.map(toCard);

  return (
    <>
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-site mx-auto px-4 py-3">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      {/* Page header */}
      <div className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-site mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-extrabold tracking-[.18em] uppercase text-cyan-600 mb-1.5">{filtered.length} kết quả</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">{title}</h1>
            </div>
            <div className="w-full sm:w-72">
              <div className="relative">
                <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm trong danh mục..."
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-sm text-navy outline-none focus:border-primary bg-slate-50"
                />
              </div>
            </div>
          </div>
          {brand.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {brand.map((b) => {
                const bn = availableBrands.find((x) => x.slug === b)?.name ?? b;
                return (
                  <span key={b} onClick={() => toggleBrand(b)} className="flex items-center gap-1.5 bg-primary-50 text-primary text-[12.5px] font-bold px-3 py-1 rounded-full cursor-pointer hover:bg-primary-100 transition-colors">
                    {bn} <Icon name="x" className="w-3 h-3" />
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-site mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-7">
          <aside className="w-full lg:w-[240px] shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card divide-y divide-slate-100 sticky top-[72px]">
              <div className="p-5">
                <h3 className="font-extrabold text-navy text-[14px] mb-3 uppercase tracking-wide">Sắp xếp</h3>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-navy bg-slate-50 outline-none focus:border-primary">
                  {SORT_OPTS.map((o) => (
                    <option key={o.v} value={o.v}>{o.l}</option>
                  ))}
                </select>
              </div>
              {availableBrands.length > 0 && (
                <div className="p-5">
                  <h3 className="font-extrabold text-navy text-[14px] mb-3.5 uppercase tracking-wide">Thương hiệu</h3>
                  <ul className="space-y-2">
                    {availableBrands.map((b) => (
                      <li key={b.slug}>
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input type="checkbox" checked={brand.includes(b.slug)} onChange={() => toggleBrand(b.slug)} className="w-4 h-4 rounded border-slate-300 accent-primary" />
                          <span className={`text-[13.5px] ${brand.includes(b.slug) ? "text-primary font-bold" : "text-slate-600 group-hover:text-navy"} transition-colors`}>{b.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="p-5">
                <p className="text-[12.5px] text-slate-500 mb-3">Không tìm thấy giải pháp phù hợp?</p>
                <Button variant="primary" size="sm" className="w-full" icon="headset" onClick={() => openQuote({ mode: "callback" })}>
                  Tư vấn ngay
                </Button>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {cards.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Icon name="search" className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="font-bold text-navy">Không tìm thấy kết quả phù hợp</p>
                <p className="text-sm mt-1">Hãy thử bỏ bớt bộ lọc hoặc liên hệ AZ để được tư vấn.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {cards.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CTAStrip />
    </>
  );
}
