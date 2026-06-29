import type { CardProduct } from "@/lib/card";

function fmtVnd(n?: number | null) {
  if (n == null) return "";
  return n.toLocaleString("vi-VN") + "₫";
}

// Matches the design's PriceTag: contact / "from" / old+new variants.
export function PriceTag({ product, size = "md" }: { product: CardProduct; size?: "md" | "lg" }) {
  const big = size === "lg";
  if (product.contact)
    return (
      <div className={`font-extrabold text-primary ${big ? "text-2xl" : "text-lg"}`}>Liên hệ báo giá</div>
    );
  if (product.from)
    return (
      <div className="flex items-baseline gap-2">
        <span className={`font-extrabold text-primary ${big ? "text-2xl" : "text-lg"}`}>{product.from}</span>
      </div>
    );
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-extrabold text-primary ${big ? "text-3xl" : "text-lg"}`}>
        {fmtVnd(product.priceNew)}
      </span>
      {product.priceOld && (
        <span className={`text-slate-400 line-through font-medium ${big ? "text-base" : "text-sm"}`}>
          {fmtVnd(product.priceOld)}
        </span>
      )}
    </div>
  );
}

export { fmtVnd };
