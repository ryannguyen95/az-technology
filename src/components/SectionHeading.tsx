import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeading({
  kicker,
  title,
  viewAll,
  center,
  light,
}: {
  kicker?: string;
  title: string;
  viewAll?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${center ? "flex-col items-center text-center" : ""}`}>
      <div>
        {kicker && (
          <div
            className={`text-xs font-extrabold tracking-[.18em] uppercase mb-2 ${light ? "text-cyan-300" : "text-cyan-600"}`}
          >
            {kicker}
          </div>
        )}
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${light ? "text-white" : "text-navy"}`}>
          {title}
        </h2>
      </div>
      {viewAll && (
        <Link
          href={viewAll}
          className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
        >
          Xem tất cả <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
