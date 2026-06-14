import type { CatalogEntry } from "@/lib/types";
import { formatVND } from "@/lib/format";

// Per-entry price mode (design review Pass 3). "contact" mode reframes the
// missing price as value + speed, never an evasive blank.
export function PriceTag({ entry }: { entry: CatalogEntry }) {
  if (entry.priceMode === "show") {
    const oldP = formatVND(entry.priceOld);
    const newP = formatVND(entry.priceNew);
    return (
      <div className="flex items-baseline gap-2">
        {newP && <span className="text-lg font-extrabold text-primary">{newP}</span>}
        {oldP && newP && <span className="text-sm text-ink/40 line-through">{oldP}</span>}
        {!newP && <span className="text-sm font-semibold text-primary">{entry.priceFromLabel ?? "Liên hệ báo giá"}</span>}
      </div>
    );
  }
  return (
    <div>
      <span className="text-sm font-semibold text-primary">
        {entry.priceFromLabel ?? "Liên hệ báo giá"}
      </span>
      <span className="ml-2 text-xs text-ink/50">phản hồi trong 24h</span>
    </div>
  );
}
