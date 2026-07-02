import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { QuoteButton } from "@/components/QuoteButton";

export const metadata: Metadata = { title: "Liên hệ", description: "Liên hệ AZ Technology để nhận tư vấn giải pháp CNTT cho doanh nghiệp." };

export default async function ContactPage() {
  const settings = await getSettings();
  const rows = [
    { icon: "phone", label: "Hotline", value: settings.hotline, href: `tel:${settings.hotline.replace(/\s/g, "")}` },
    { icon: "mail", label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: "map", label: "Địa chỉ", value: settings.address, href: settings.mapUrl },
    { icon: "zalo", label: "Zalo", value: settings.hotline, href: settings.zaloUrl },
  ];
  return (
    <div className="az-container py-10">
      <h1 className="text-3xl font-extrabold text-navy">Liên hệ AZ Technology</h1>
      <p className="mt-2 text-ink/60">Để lại thông tin hoặc liên hệ trực tiếp — chúng tôi phản hồi trong vòng 24 giờ.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {rows.map((r) => (
            <a key={r.label} href={r.href} className="flex items-start gap-3 rounded-xl2 border border-ink/10 bg-white p-4 hover:border-primary/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary"><Icon name={r.icon} className="h-5 w-5" /></span>
              <div><div className="text-sm text-ink/50">{r.label}</div><div className="font-semibold text-navy">{r.value}</div></div>
            </a>
          ))}
          <QuoteButton className="w-full rounded-lg az-grad px-6 py-3 font-bold text-white shadow-cardHover hover:opacity-95">
            Gửi yêu cầu tư vấn / báo giá
          </QuoteButton>
        </div>
        <div className="overflow-hidden rounded-xl2 border border-ink/10">
          <iframe
            title="Bản đồ AZ Technology"
            className="h-full min-h-[320px] w-full"
            src="https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
