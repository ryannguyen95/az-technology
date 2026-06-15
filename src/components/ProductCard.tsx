import Link from "next/link";
import type { CatalogEntry } from "@/lib/types";
import { entryHref } from "@/lib/routing";
import { Icon } from "./Icon";
import { PriceTag } from "./PriceTag";
import { RatingStars } from "./RatingStars";
import { QuoteButton } from "./QuoteButton";
import { stripHtml } from "@/lib/strip";

const TONE_GRAD: Record<string, string> = {
  blue: "from-primary-600 to-cyan-500",
  cyan: "from-cyan-500 to-primary-600",
  green: "from-emerald-500 to-cyan-500",
  navy: "from-navy to-primary-600",
  red: "from-rose-500 to-primary-600",
};

// Branded placeholder for image-less entries (design review Pass 4) —
// a subtle brand gradient + the category icon + AZ wordmark. NOT icon-in-a-circle.
function Thumb({ entry }: { entry: CatalogEntry }) {
  const grad = TONE_GRAD[entry.tone ?? "blue"];
  return (
    <div className={`relative flex h-40 items-center justify-center overflow-hidden rounded-t-xl2 bg-gradient-to-br ${grad}`}>
      <div className="absolute inset-0 az-dots opacity-40" />
      <Icon name={entry.icon} className="h-14 w-14 text-white/90" />
      <span className="absolute bottom-2 right-3 text-[11px] font-bold tracking-wide text-white/70">
        AZ Technology
      </span>
      {entry.badge && (
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-primary shadow">
          {entry.badge}
        </span>
      )}
    </div>
  );
}

export function ProductCard({ entry }: { entry: CatalogEntry }) {
  const href = entryHref(entry.kind, entry.slug);
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition hover:shadow-cardHover">
      <Link href={href} aria-label={entry.title}>
        <Thumb entry={entry} />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={href} className="line-clamp-2 font-bold text-navy hover:text-primary">
          {entry.title}
        </Link>
        {entry.summary && <p className="mt-1 line-clamp-2 text-sm text-ink/60">{stripHtml(entry.summary)}</p>}
        <div className="mt-2"><RatingStars rating={entry.rating ?? 5} reviews={entry.reviews} /></div>
        <div className="mt-auto pt-3"><PriceTag entry={entry} /></div>
        <div className="mt-3 flex gap-2">
          <Link href={href}
            className="flex-1 rounded-lg border border-primary/30 px-3 py-2 text-center text-sm font-semibold text-primary transition hover:bg-primary-50">
            Xem chi tiết
          </Link>
          <QuoteButton interest={entry.title}
            className="flex-1 rounded-lg az-grad px-3 py-2 text-center text-sm font-semibold text-white transition hover:opacity-95">
            Nhận báo giá
          </QuoteButton>
        </div>
      </div>
    </div>
  );
}
