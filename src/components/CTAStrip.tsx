"use client";

import { Button } from "./Button";
import { useQuote } from "./QuoteModal";
import { useSettings } from "./SettingsProvider";

export function CTAStrip() {
  const { openQuote } = useQuote();
  const settings = useSettings();
  const tel = settings.hotline.replace(/\s/g, "");
  return (
    <section className="relative overflow-hidden az-grad-navy text-white">
      <div className="absolute inset-0 az-mesh" />
      <div className="absolute inset-0 az-dots opacity-30" />
      <div className="relative max-w-site mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-8 justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <div className="text-xs font-extrabold tracking-[.18em] uppercase text-cyan-300 mb-3">Tư vấn miễn phí</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Cần tư vấn giải pháp CNTT cho doanh nghiệp?</h2>
          <p className="text-white/75 mt-3 text-[15px] leading-relaxed">
            Đội ngũ AZ Technology sẵn sàng khảo sát, tư vấn và báo giá giải pháp phù hợp nhất cho doanh nghiệp của bạn.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Button variant="cyan" size="lg" icon="send" onClick={() => openQuote({ mode: "full" })}>
            Nhận báo giá ngay
          </Button>
          <Button variant="white" size="lg" icon="phone" as="a" href={`tel:${tel}`}>
            {settings.hotline}
          </Button>
        </div>
      </div>
    </section>
  );
}
