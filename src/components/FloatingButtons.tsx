"use client";

import { useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/types";
import { Icon } from "./Icon";
import { useQuote } from "./QuoteModal";

export function FloatingButtons({ settings }: { settings: SiteSettings }) {
  const { openQuote } = useQuote();
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const btn = "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-pop transition hover:scale-105";
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <button onClick={() => openQuote()} aria-label="Tư vấn nhanh" className={`${btn} az-grad animate-floaty`}>
        <Icon name="chat" className="h-6 w-6" />
      </button>
      <a href={`tel:${settings.hotline.replace(/\s/g, "")}`} aria-label="Gọi hotline" className={`${btn} bg-emerald-500`}>
        <Icon name="phone" className="h-6 w-6" />
      </a>
      <a href={settings.zaloUrl} aria-label="Chat Zalo" className={`${btn} bg-primary`}>
        <Icon name="zalo" className="h-6 w-6" />
      </a>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Lên đầu trang"
          className={`${btn} bg-navy`}>
          <Icon name="arrow" className="h-5 w-5 -rotate-90" />
        </button>
      )}
    </div>
  );
}
