import Link from "next/link";
import type { Block, CatalogEntry } from "@/lib/types";
import { getBrands } from "@/lib/data";
import { Icon } from "./Icon";
import { PriceTag } from "./PriceTag";
import { RatingStars } from "./RatingStars";
import { QuoteButton } from "./QuoteButton";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink/50">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:text-primary">Trang chủ</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="opacity-40">/</span>
            {it.href ? <Link href={it.href} className="hover:text-primary">{it.label}</Link> : <span className="text-ink/70">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "richText":
      return <div className="prose max-w-none text-ink/80" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "featureList":
      return (
        <div>
          {block.title && <h3 className="mb-3 text-lg font-bold text-navy">{block.title}</h3>}
          <div className="grid gap-3 sm:grid-cols-2">
            {block.items.map((it, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-ink/10 bg-white p-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-semibold text-navy">{it.title}</div>
                  {it.text && <div className="text-sm text-ink/60">{it.text}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "processSteps":
      return (
        <div>
          {block.title && <h3 className="mb-3 text-lg font-bold text-navy">{block.title}</h3>}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {block.steps.map((s, i) => (
              <div key={i} className="rounded-xl2 border border-ink/10 bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full az-grad font-bold text-white">{i + 1}</span>
                <div className="mt-2 font-semibold text-navy">{s.title}</div>
                {s.text && <div className="text-sm text-ink/60">{s.text}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    case "specAccordion":
      return (
        <div>
          {block.title && <h3 className="mb-3 text-lg font-bold text-navy">{block.title}</h3>}
          <dl className="overflow-hidden rounded-xl2 border border-ink/10">
            {block.rows.map((r, i) => (
              <div key={i} className={`grid grid-cols-3 gap-4 p-3 text-sm ${i % 2 ? "bg-mist" : "bg-white"}`}>
                <dt className="font-medium text-ink/60">{r.label}</dt>
                <dd className="col-span-2 text-navy">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "faq":
      return (
        <div>
          {block.title && <h3 className="mb-3 text-lg font-bold text-navy">{block.title}</h3>}
          <div className="space-y-2">
            {block.items.map((f, i) => (
              <details key={i} className="rounded-lg border border-ink/10 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-navy">{f.q}</summary>
                <p className="mt-2 text-sm text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      );
    case "brandStrip": {
      const bs = getBrands(block.brandSlugs);
      if (!bs.length) return null;
      return (
        <div>
          {block.title && <h3 className="mb-3 text-lg font-bold text-navy">{block.title}</h3>}
          <div className="flex flex-wrap gap-2">
            {bs.map((b) => (
              <span key={b.slug} className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm font-semibold text-ink/60">{b.name}</span>
            ))}
          </div>
        </div>
      );
    }
    case "cta":
      return (
        <div className="rounded-xl2 az-grad-soft p-6 text-center">
          <h3 className="text-xl font-extrabold text-navy">{block.heading}</h3>
          {block.sub && <p className="mt-1 text-ink/60">{block.sub}</p>}
          <QuoteButton className="mt-4 inline-flex rounded-lg az-grad px-6 py-3 font-bold text-white shadow-cardHover hover:opacity-95">
            Gửi yêu cầu tư vấn
          </QuoteButton>
        </div>
      );
  }
}

export function EntryDetail({ entry, crumbs }: { entry: CatalogEntry; crumbs: { label: string; href?: string }[] }) {
  return (
    <div className="az-container py-8">
      <Breadcrumb items={crumbs} />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: visual */}
        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl2 az-grad md:h-80">
          <div className="absolute inset-0 az-dots opacity-40" />
          <Icon name={entry.icon} className="h-24 w-24 text-white/90" />
        </div>
        {/* Right: summary + CTA */}
        <div>
          {entry.badge && <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary">{entry.badge}</span>}
          <h1 className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{entry.title}</h1>
          <div className="mt-2"><RatingStars rating={entry.rating ?? 5} reviews={entry.reviews} /></div>
          {entry.summary && <p className="mt-3 text-ink/70">{entry.summary}</p>}
          <div className="mt-4 rounded-xl2 border border-ink/10 bg-white p-4">
            <PriceTag entry={entry} />
            <p className="mt-1 text-xs text-ink/50">Giá trên website mang tính tham khảo. Vui lòng liên hệ để nhận báo giá chính xác — giá tùy cấu hình / số lượng.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <QuoteButton interest={entry.title} className="rounded-lg az-grad px-4 py-2.5 text-center text-sm font-bold text-white hover:opacity-95">NHẬN BÁO GIÁ</QuoteButton>
              <QuoteButton interest={entry.title} className="rounded-lg border border-primary/30 px-4 py-2.5 text-center text-sm font-bold text-primary hover:bg-primary-50">GỌI CHO TÔI</QuoteButton>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/60">
            <span className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-emerald-500" /> Bản quyền chính hãng</span>
            <span className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-emerald-500" /> Hóa đơn VAT</span>
            <span className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-emerald-500" /> Triển khai toàn quốc</span>
          </div>
        </div>
      </div>
      {/* Body blocks */}
      {entry.body?.length ? (
        <div className="mt-10 space-y-8">
          {entry.body.map((b, i) => <BlockView key={i} block={b} />)}
        </div>
      ) : null}

      {/* Brand strip from the entry's brand relation (both seed + Strapi modes) */}
      {entry.brandSlugs?.length ? (
        <div className="mt-10">
          <BlockView block={{ type: "brandStrip", title: "Hãng cung cấp", brandSlugs: entry.brandSlugs }} />
        </div>
      ) : null}
    </div>
  );
}
