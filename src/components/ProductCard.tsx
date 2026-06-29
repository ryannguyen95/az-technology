"use client";

import { useRouter } from "next/navigation";
import type { CardProduct } from "@/lib/card";
import { ProductImage } from "./ProductImage";
import { RatingStars } from "./RatingStars";
import { useQuote } from "./QuoteModal";

export function ProductCard({ product }: { product: CardProduct }) {
  const router = useRouter();
  const { openQuote } = useQuote();
  const go = () => router.push(product.href);
  return (
    <div
      onClick={go}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") go();
      }}
      className="az-card group cursor-pointer bg-white rounded-2xl border border-slate-200/80 hover:border-primary-200 shadow-card hover:shadow-cardHover flex flex-col overflow-hidden"
    >
      <div className="relative">
        <ProductImage product={product} className="aspect-[4/3] bg-slate-50" />
        {product.badge && (
          <span
            className={`absolute top-2.5 right-2.5 text-[11px] font-extrabold px-2 py-1 rounded-lg whitespace-nowrap ${
              product.badge.startsWith("-") ? "bg-sale text-white" : "bg-cyan-400 text-navy"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] font-bold tracking-wide text-cyan-600 uppercase mb-1.5">{product.cat}</div>
        <h3 className="font-bold text-navy text-[15px] leading-snug clamp-2 group-hover:text-primary transition-colors min-h-[42px]">
          {product.name}
        </h3>
        <div className="mt-2 mb-4">
          <RatingStars value={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-auto flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              go();
            }}
            className="flex-1 border border-slate-200 text-navy text-[12.5px] font-bold rounded-lg py-2.5 hover:border-primary hover:text-primary transition-colors"
          >
            Xem chi tiết
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuote({ mode: "quick", product: product.name });
            }}
            className="flex-1 bg-primary text-white text-[12.5px] font-bold rounded-lg py-2.5 hover:bg-primary-700 transition-colors"
          >
            Nhận báo giá
          </button>
        </div>
      </div>
    </div>
  );
}
