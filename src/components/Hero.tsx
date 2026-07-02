"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroBanner } from "@/lib/types";
import { Icon } from "./Icon";

// Image-only banner carousel (matches the prototype: each slide is just an image).
// When a banner has no uploaded image, we render a neutral placeholder instead of
// an error or any marketing copy.

function Placeholder({ title }: { title?: string }) {
  return (
    <div className="absolute inset-0 az-grad-navy grid place-items-center">
      <div className="absolute inset-0 az-dots opacity-30" />
      <div className="relative flex flex-col items-center gap-3 text-white/90">
        <span className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur grid place-items-center">
          <Icon name="quote" className="w-8 h-8 text-cyan-300" stroke={1.5} />
        </span>
        {title && <span className="text-sm font-semibold text-white/70">{title}</span>}
      </div>
    </div>
  );
}

export function Hero({ banners }: { banners?: HeroBanner[] }) {
  // Show every banner; a missing image falls back to the placeholder above.
  const slides: HeroBanner[] = banners && banners.length
    ? banners
    : [{ id: "placeholder", title: "AZ Technology", image: null }];

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const i2 = Math.min(i, slides.length - 1);
  const go = (next: number) => setI((next + slides.length) % slides.length);

  return (
    <section className="pt-7 pb-3">
      <div className="max-w-site mx-auto px-4">
        <div
          className="reveal group relative overflow-hidden rounded-[24px] shadow-card bg-mist select-none"
          style={{ aspectRatio: "1920 / 640" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((b, k) => {
            const inner = b.image ? (
              <Image
                src={b.image}
                alt={b.title}
                fill
                priority={k === 0}
                sizes="(min-width: 1240px) 1240px, 100vw"
                className="object-cover"
              />
            ) : (
              <Placeholder title={b.title} />
            );
            return (
              <div
                key={b.id}
                aria-hidden={k !== i2}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: k === i2 ? 1 : 0, pointerEvents: k === i2 ? "auto" : "none" }}
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
            <>
              <button
                onClick={() => go(i2 - 1)}
                aria-label="Banner trước"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 grid place-items-center rounded-full bg-white/85 backdrop-blur text-navy shadow-card opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
              >
                <Icon name="chevronLeft" className="w-5 h-5" />
              </button>
              <button
                onClick={() => go(i2 + 1)}
                aria-label="Banner kế tiếp"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 grid place-items-center rounded-full bg-white/85 backdrop-blur text-navy shadow-card opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
              >
                <Icon name="chevronRight" className="w-5 h-5" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-5 z-20 flex gap-2">
                {slides.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`Chuyển tới banner ${k + 1}`}
                    className={`h-1.5 rounded-full transition-all ${k === i2 ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
