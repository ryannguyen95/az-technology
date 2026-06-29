"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroBanner } from "@/lib/types";
import { Icon } from "./Icon";

function FallbackHero() {
  // Shown until an editor uploads at least one banner image in the CMS.
  return (
    <section className="pt-7 pb-3">
      <div className="max-w-site mx-auto px-4">
        <div className="relative overflow-hidden rounded-[28px] az-grad-soft border border-primary-100 shadow-card px-8 py-14 lg:py-20 text-center">
          <div className="absolute inset-0 az-dots-ink opacity-50" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-primary-100 rounded-full px-3.5 py-1.5 text-[12px] font-extrabold text-primary mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Giải pháp CNTT toàn diện
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-[44px] font-extrabold leading-[1.08] tracking-tight text-navy">
              Hạ tầng số <span className="az-text-grad">vững chắc</span> cho mọi quy mô
            </h1>
            <p className="mt-4 text-[14.5px] sm:text-base text-slate-600 max-w-xl mx-auto">
              Phần mềm bản quyền · Phần cứng chính hãng · Hạ tầng Data Center · Dịch vụ IT &amp; Cloud.
            </p>
            <Link
              href="/danh-muc/phan-mem"
              className="mt-7 inline-flex items-center gap-2 bg-primary text-white font-bold text-sm rounded-full pl-5 pr-4 py-3 shadow-[0_10px_24px_-8px_rgba(0,86,179,.7)] hover:bg-primary-700 transition-all"
            >
              Khám phá sản phẩm <Icon name="arrowRight" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero({ banners }: { banners?: HeroBanner[] }) {
  const slides = (banners ?? []).filter((b) => b.image);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return <FallbackHero />;

  const i2 = Math.min(i, slides.length - 1);

  return (
    <section className="pt-7 pb-3">
      <div className="max-w-site mx-auto px-4">
        <div className="relative overflow-hidden rounded-[28px] shadow-card">
          {slides.map((b, k) => {
            const inner = (
              <Image
                src={b.image as string}
                alt={b.title}
                fill
                priority={k === 0}
                sizes="(min-width: 1240px) 1240px, 100vw"
                className="object-cover"
              />
            );
            return (
              <div
                key={b.id}
                className={`relative h-[200px] sm:h-[300px] lg:h-[380px] transition-opacity duration-500 ${k === i2 ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}
              >
                {b.ctaHref ? (
                  <Link href={b.ctaHref} aria-label={b.ctaLabel || b.title} className="block w-full h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </div>
            );
          })}

          {slides.length > 1 && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 flex gap-2">
              {slides.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Banner ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${k === i2 ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
