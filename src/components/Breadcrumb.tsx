import Link from "next/link";
import { Icon } from "./Icon";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-slate-500 flex-wrap">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Icon name="chevronRight" className="w-3.5 h-3.5 text-slate-300" />}
          {it.href && i < items.length - 1 ? (
            <Link href={it.href} className="hover:text-primary transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? "text-navy font-semibold" : ""}>{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
