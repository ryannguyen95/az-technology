import { Icon } from "./Icon";

export function RatingStars({ rating = 5, reviews }: { rating?: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-ink/60">
      <span className="flex text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400" : "fill-none text-ink/20"}`} />
        ))}
      </span>
      {reviews != null && <span>({reviews})</span>}
    </div>
  );
}
