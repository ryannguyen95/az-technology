"use client";

import { Button } from "./Button";
import { useQuote } from "./QuoteModal";
import { useSettings } from "./SettingsProvider";

// Site quote-driven, không có giỏ hàng: 3 CTA = mở form báo giá, gọi thẳng,
// và chat Zalo. Số hotline + link Zalo lấy từ CMS (site-setting).
export function DetailActions({ productName }: { productName: string }) {
  const { openQuote } = useQuote();
  const settings = useSettings();
  const tel = settings.hotline.replace(/\s/g, "");
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" size="lg" icon="chart" onClick={() => openQuote({ mode: "full", product: productName })}>
        NHẬN BÁO GIÁ
      </Button>
      <Button variant="outline" size="lg" icon="phone" as="a" href={`tel:${tel}`}>
        GỌI CHO TÔI
      </Button>
      {settings.zaloUrl && (
        <Button
          variant="inverted"
          size="lg"
          icon="zalo"
          as="a"
          href={settings.zaloUrl}
          target="_blank"
          ariaLabel="Chat Zalo với AZ Technology"
        >
          ZALO
        </Button>
      )}
    </div>
  );
}
