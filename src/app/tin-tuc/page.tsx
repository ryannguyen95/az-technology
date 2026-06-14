import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { QuoteButton } from "@/components/QuoteButton";

export const metadata: Metadata = { title: "Tin tức", description: "Tin công nghệ, chia sẻ và thủ thuật từ AZ Technology." };

export default function NewsPage() {
  // Empty-at-launch state (design review Pass 2) — warm, with a primary action.
  return (
    <div className="az-container py-10">
      <h1 className="text-3xl font-extrabold text-navy">Tin tức</h1>
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl2 border border-dashed border-ink/15 bg-white py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
          <Icon name="mail" className="h-8 w-8" />
        </span>
        <p className="mt-4 text-lg font-bold text-navy">Nội dung đang được cập nhật</p>
        <p className="mt-1 max-w-md text-ink/60">
          AZ Technology sẽ sớm chia sẻ tin công nghệ, thủ thuật và tin công ty tại đây.
          Trong lúc chờ, cần tư vấn giải pháp CNTT?
        </p>
        <QuoteButton className="mt-5 rounded-lg az-grad px-6 py-3 font-bold text-white shadow-cardHover hover:opacity-95">
          Nhận tư vấn ngay
        </QuoteButton>
      </div>
    </div>
  );
}
