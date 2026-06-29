import Image from "next/image";
import type { CardProduct } from "@/lib/card";
import type { Tone } from "@/lib/types";
import { Icon } from "./Icon";

export const TONES: Record<Tone, { g: string; soft: string }> = {
  blue: { g: "from-primary-600 to-primary-400", soft: "bg-primary-50 text-primary" },
  cyan: { g: "from-cyan-500 to-cyan-300", soft: "bg-cyan-50 text-cyan-600" },
  navy: { g: "from-navy to-primary-700", soft: "bg-navy/5 text-navy" },
  green: { g: "from-emerald-600 to-teal-400", soft: "bg-emerald-50 text-emerald-600" },
  red: { g: "from-rose-600 to-orange-400", soft: "bg-rose-50 text-rose-600" },
};

// Design's gradient-icon placeholder; shows the real coverImage when the CMS has one.
export function ProductImage({
  product,
  className = "",
  big = false,
}: {
  product: CardProduct;
  className?: string;
  big?: boolean;
}) {
  const tone = TONES[product.tone] || TONES.blue;
  if (product.coverImage) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image src={product.coverImage} alt={product.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain p-4" />
        {product.brand && (
          <div className="absolute top-2.5 left-2.5 text-[10px] font-extrabold tracking-wide text-navy/70 bg-white/80 backdrop-blur px-2 py-0.5 rounded-md">
            {product.brand}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${tone.g} opacity-[0.07]`} />
      <div className="absolute inset-0 az-dots-ink opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`rounded-2xl bg-gradient-to-br ${tone.g} text-white grid place-items-center shadow-lg ${big ? "w-28 h-28" : "w-16 h-16"}`}
        >
          <Icon name={product.icon || "cpu"} className={big ? "w-14 h-14" : "w-8 h-8"} stroke={1.5} />
        </div>
      </div>
      {product.brand && (
        <div className="absolute top-2.5 left-2.5 text-[10px] font-extrabold tracking-wide text-navy/70 bg-white/80 backdrop-blur px-2 py-0.5 rounded-md">
          {product.brand}
        </div>
      )}
    </div>
  );
}
