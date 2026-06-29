"use client";

import { Button } from "./Button";
import { useQuote } from "./QuoteModal";

export function DetailActions({ productName }: { productName: string }) {
  const { openQuote } = useQuote();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" size="lg" icon="send" onClick={() => openQuote({ mode: "full", product: productName })}>
        MUA NGAY
      </Button>
      <Button variant="outline" size="lg" icon="chart" onClick={() => openQuote({ mode: "quick", product: productName })}>
        NHẬN BÁO GIÁ
      </Button>
      <Button variant="inverted" size="md" icon="phone" onClick={() => openQuote({ mode: "callback", product: productName })}>
        GỌI CHO TÔI
      </Button>
    </div>
  );
}
