"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";

/* Detail-page visual. Shows an image slider when the entry has images
   (coverImage + gallery), otherwise falls back to the icon-on-gradient panel. */
export function EntryGallery({
  images,
  icon,
  title,
}: {
  images: string[];
  icon?: string;
  title: string;
}) {
  const [active, setActive] = useState(0);

  // No images → keep the original icon panel.
  if (!images.length) {
    return (
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl2 az-grad md:h-80">
        <div className="absolute inset-0 az-dots opacity-40" />
        <Icon name={icon} className="h-24 w-24 text-white/90" />
      </div>
    );
  }

  const i = Math.min(active, images.length - 1);
  const multiple = images.length > 1;
  const go = (next: number) => setActive((next + images.length) % images.length);

  return (
    <div>
      <div className="group relative flex h-64 items-center justify-center overflow-hidden rounded-xl2 border border-ink/10 bg-white md:h-80">
        <Image
          key={images[i]}
          src={images[i]}
          alt={`${title} — ảnh ${i + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain p-4"
          priority={i === 0}
        />

        {multiple && (
          <>
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={() => go(i - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy shadow ring-1 ring-ink/10 transition hover:bg-white"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              onClick={() => go(i + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy shadow ring-1 ring-ink/10 transition hover:bg-white"
            >
              <ChevronRight />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((src, n) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Đến ảnh ${n + 1}`}
                  aria-current={n === i}
                  onClick={() => setActive(n)}
                  className={`h-1.5 rounded-full transition-all ${n === i ? "w-5 bg-primary" : "w-1.5 bg-ink/25 hover:bg-ink/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {multiple && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(n)}
              aria-label={`Xem ảnh ${n + 1}`}
              className={`relative h-16 w-16 flex-none overflow-hidden rounded-lg border bg-white transition ${
                n === i ? "border-primary ring-1 ring-primary" : "border-ink/10 hover:border-ink/30"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
