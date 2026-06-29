import { Icon } from "./Icon";

export function RatingStars({
  value = 5,
  reviews,
  size = "w-4 h-4",
  showCount = true,
}: {
  value?: number;
  reviews?: number;
  size?: string;
  showCount?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name="star"
            filled={i <= Math.round(value)}
            stroke={1.4}
            className={`${size} ${i <= Math.round(value) ? "text-amber-400" : "text-slate-300"}`}
          />
        ))}
      </div>
      {showCount && reviews != null && (
        <span className="text-xs text-slate-500 font-medium">({reviews})</span>
      )}
    </div>
  );
}
