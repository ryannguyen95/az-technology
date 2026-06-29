import Link from "next/link";
import type { CardProduct } from "@/lib/card";
import type { CategoryTile as CategoryTileType, Tone } from "@/lib/types";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import { TONES } from "./ProductImage";

export function AZLogo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="AZ Technology - Trang chủ">
      <span className="relative grid place-items-center w-11 h-11 rounded-xl az-grad shadow-[0_8px_18px_-8px_rgba(0,86,179,.8)] overflow-hidden">
        <span className="absolute inset-0 az-dots opacity-40" />
        <span className="relative font-extrabold text-white text-lg tracking-tight">AZ</span>
      </span>
      <span className="leading-tight">
        <span className={`block font-extrabold text-[19px] tracking-tight ${light ? "text-white" : "text-navy"}`}>
          AZ<span className="az-text-grad">Technology</span>
        </span>
        <span className={`block text-[10px] font-semibold tracking-wide ${light ? "text-cyan-200" : "text-slate-400"}`}>
          Software · Hardware · Cloud
        </span>
      </span>
    </Link>
  );
}

export function CategoryTile({ tile }: { tile: CategoryTileType }) {
  return (
    <Link
      href={tile.href}
      className="az-card group bg-white rounded-2xl border border-slate-200/80 hover:border-primary-200 shadow-card hover:shadow-cardHover p-4 flex flex-col items-center text-center gap-3"
    >
      <span className="w-14 h-14 rounded-2xl bg-primary-50 text-primary grid place-items-center group-hover:az-grad group-hover:text-white transition-all duration-300">
        <Icon name={tile.icon} className="w-7 h-7" stroke={1.6} />
      </span>
      <span className="text-[13px] font-bold text-navy leading-tight">{tile.label}</span>
    </Link>
  );
}

export function PartnerLogo({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div className={`shrink-0 grid place-items-center h-14 px-6 rounded-xl bg-white border border-slate-200/80 ${className}`}>
      <span className="font-extrabold text-navy/60 tracking-tight text-lg whitespace-nowrap">{name}</span>
    </div>
  );
}

export function SubBanner({
  kicker,
  title,
  desc,
  cta,
  href,
  tone = "blue",
  icon,
}: {
  kicker: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  tone?: Tone;
  icon?: string;
}) {
  const t = TONES[tone] || TONES.blue;
  return (
    <Link
      href={href}
      className="az-card group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[180px] border border-slate-200/80 shadow-card hover:shadow-cardHover bg-white"
    >
      <div className={`absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-gradient-to-br ${t.g} opacity-[0.12] group-hover:opacity-20 transition-opacity`} />
      <div className={`absolute right-5 top-5 w-12 h-12 rounded-xl bg-gradient-to-br ${t.g} text-white grid place-items-center shadow-lg`}>
        <Icon name={icon} className="w-6 h-6" stroke={1.6} />
      </div>
      <div>
        <div className="text-[11px] font-extrabold tracking-widest uppercase text-cyan-600 mb-2">{kicker}</div>
        <h3 className="text-lg font-extrabold text-navy leading-snug max-w-[80%]">{title}</h3>
        <p className="text-sm text-slate-500 mt-1.5 max-w-[88%] leading-relaxed">{desc}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
        {cta} <Icon name="arrowRight" className="w-4 h-4" />
      </span>
    </Link>
  );
}

export function CardRow({ products }: { products: CardProduct[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
