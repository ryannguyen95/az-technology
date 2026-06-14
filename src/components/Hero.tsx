import Link from "next/link";
import type { HeroSlide } from "@/lib/types";
import { Icon } from "./Icon";
import { QuoteButton } from "./QuoteButton";

export function Hero({ slide }: { slide: HeroSlide }) {
  return (
    <section className="relative overflow-hidden az-grad text-white">
      <div className="absolute inset-0 az-mesh" />
      <div className="absolute inset-0 az-dots opacity-50" />
      <div className="az-container relative grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="animate-fadeUp">
          {slide.eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> {slide.eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            {slide.title} {slide.highlight && <span className="text-cyan-300">{slide.highlight}</span>}
            <br />cho mọi quy mô
          </h1>
          {slide.subtitle && <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">{slide.subtitle}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <QuoteButton className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-primary shadow-cardHover transition hover:bg-cyan-50">
              Tư vấn miễn phí <Icon name="arrow" className="h-4 w-4" />
            </QuoteButton>
            <Link href={slide.ctaHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              {slide.ctaLabel}
            </Link>
          </div>
          <div className="mt-9 flex gap-8">
            <div><div className="text-3xl font-extrabold">12+</div><div className="text-sm text-white/70">năm kinh nghiệm</div></div>
            <div><div className="text-3xl font-extrabold">1.500+</div><div className="text-sm text-white/70">doanh nghiệp tin dùng</div></div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="ml-auto w-[420px] rounded-xl2 bg-white/10 p-6 shadow-pop backdrop-blur animate-floaty">
            <div className="flex items-center gap-2 rounded-lg bg-white/90 p-3 text-navy">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><Icon name="check" className="h-5 w-5" /></span>
              <div><div className="text-sm font-bold">Bản quyền 100%</div><div className="text-xs text-ink/50">Xuất hóa đơn VAT</div></div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {["server", "cloud", "shield", "windows", "backup", "monitor"].map((ic) => (
                <div key={ic} className="flex h-16 items-center justify-center rounded-lg bg-white/15">
                  <Icon name={ic} className="h-7 w-7 text-white" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/90 p-3 text-navy">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-50 text-primary"><Icon name="phone" className="h-5 w-5" /></span>
              <div><div className="text-sm font-bold">Hỗ trợ 24/7</div><div className="text-xs text-ink/50">Toàn quốc</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
