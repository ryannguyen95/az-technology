import Link from "next/link";
import type { Brand, CatalogEntry, CategoryTile } from "@/lib/types";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import { QuoteButton } from "./QuoteButton";

export function CategoryGrid({ tiles }: { tiles: CategoryTile[] }) {
  return (
    <section className="az-container -mt-10 relative z-10">
      <div className="grid grid-cols-2 gap-3 rounded-xl2 bg-white p-4 shadow-card sm:grid-cols-4 lg:grid-cols-8">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href}
            className="group flex flex-col items-center gap-2 rounded-lg p-3 text-center transition hover:bg-primary-50">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition group-hover:az-grad group-hover:text-white">
              <Icon name={t.icon} className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold text-navy">{t.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionRail({
  title, entries, href,
}: { title: string; entries: CatalogEntry[]; href?: string }) {
  if (!entries.length) return null;
  return (
    <section className="az-container mt-14">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
        {href && (
          <Link href={href} className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2">
            Xem tất cả <Icon name="arrow" className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {entries.slice(0, 4).map((e) => <ProductCard key={`${e.kind}-${e.slug}`} entry={e} />)}
      </div>
    </section>
  );
}

export function TrustStrip({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="az-container mt-16">
      <div className="grid gap-4 rounded-xl2 az-grad-soft p-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-card">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <div>
              <div className="font-bold text-navy">{it.title}</div>
              <div className="text-sm text-ink/60">{it.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PartnerStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="az-container mt-16">
      <h2 className="mb-5 text-center text-xl font-bold text-navy">Đối tác & hãng cung cấp</h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {brands.map((b) => (
          <span key={b.slug}
            className="rounded-lg border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/60 transition hover:border-primary/30 hover:text-primary">
            {b.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="az-container mt-16">
      <div className="relative overflow-hidden rounded-xl2 az-grad-navy p-10 text-center text-white">
        <div className="absolute inset-0 az-dots opacity-40" />
        <div className="relative">
          <h2 className="text-2xl font-extrabold md:text-3xl">Cần tư vấn giải pháp CNTT cho doanh nghiệp?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            Đội ngũ AZ Technology sẵn sàng khảo sát và đề xuất giải pháp phù hợp — phản hồi trong vòng 24 giờ.
          </p>
          <QuoteButton className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-bold text-primary shadow-cardHover hover:bg-cyan-50">
            Nhận tư vấn ngay <Icon name="arrow" className="h-4 w-4" />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
