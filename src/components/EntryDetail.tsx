import type { CatalogEntry, SiteSettings } from "@/lib/types";
import { toCard } from "@/lib/card";
import { getEntriesByKind, getSettings } from "@/lib/data";
import { Icon } from "./Icon";
import { Breadcrumb } from "./Breadcrumb";
import { SectionHeading } from "./SectionHeading";
import { EntryGallery } from "./EntryGallery";
import { DetailActions } from "./DetailActions";
import { DetailTabs } from "./DetailTabs";
import { InlineQuoteForm } from "./InlineQuoteForm";
import { CTAStrip } from "./CTAStrip";
import { ProductCard } from "./ProductCard";

// Same 3 marketing badges for every product (design decision — not from the CMS).
const BADGES = ["Miễn phí tư vấn", "Miễn phí triển khai cho số lượng lớn", "Vô vàn ưu đãi"];
const BADGE_COLORS = [
  "bg-cyan-50 text-cyan-700 border-cyan-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
];

function CommitmentBox({ settings }: { settings: SiteSettings }) {
  const tel = settings.hotline.replace(/\s/g, "");
  const items = [
    "Sản phẩm chính hãng 100%",
    "Xuất hóa đơn VAT đầy đủ",
    "Hỗ trợ kỹ thuật trong suốt quá trình sử dụng",
    "Tư vấn miễn phí, báo giá nhanh trong ngày",
  ];
  return (
    <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="badge" className="w-5 h-5 text-primary" stroke={1.6} />
        <span className="font-extrabold text-navy text-[15px]">Cam kết từ AZ Technology</span>
      </div>
      <ul className="space-y-2.5 text-[13.5px]">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-600">
            <Icon name="check" className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" stroke={2} />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-primary-200/50 flex flex-col gap-2">
        <a href={`tel:${tel}`} className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-700 transition-colors">
          <Icon name="phone" className="w-4 h-4" />
          {settings.hotline} (Hotline)
        </a>
        <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors">
          <Icon name="mail" className="w-4 h-4" />
          {settings.email}
        </a>
      </div>
    </div>
  );
}

function WhyLicensed({ hardware }: { hardware: boolean }) {
  const items = hardware
    ? [
        { icon: "badge", t: "Thiết bị chính hãng", d: "Nguồn gốc rõ ràng, có tem nhãn và giấy tờ kiểm định theo hãng." },
        { icon: "receipt", t: "Hóa đơn VAT đầy đủ", d: "Xuất hóa đơn điện tử hợp lệ, phục vụ kế toán doanh nghiệp." },
        { icon: "truck", t: "Bảo hành chính hãng", d: "Thời gian bảo hành theo nhà sản xuất, có trung tâm bảo hành uy tín." },
        { icon: "headset", t: "Hỗ trợ kỹ thuật", d: "Đội ngũ kỹ thuật viên hỗ trợ cài đặt, cấu hình và vận hành." },
      ]
    : [
        { icon: "badge", t: "Bản quyền hợp pháp", d: "Tuân thủ pháp lý, tránh rủi ro kiểm tra vi phạm bản quyền." },
        { icon: "shield", t: "Bảo mật & cập nhật", d: "Nhận bản vá bảo mật và nâng cấp tính năng định kỳ." },
        { icon: "headset", t: "Hỗ trợ chính hãng", d: "Được hưởng hỗ trợ kỹ thuật từ nhà sản xuất và đại lý." },
        { icon: "receipt", t: "Hóa đơn VAT hợp lệ", d: "Kê khai và khấu trừ thuế đúng quy định cho doanh nghiệp." },
      ];
  return (
    <section className="py-12 bg-mist border-t border-slate-200">
      <div className="max-w-site mx-auto px-4">
        <SectionHeading kicker="Tại sao nên chọn" title="Sử dụng giải pháp bản quyền chính hãng" />
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((w, i) => (
            <div key={i} className="reveal bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3">
              <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary grid place-items-center">
                <Icon name={w.icon} className="w-6 h-6" stroke={1.6} />
              </span>
              <h3 className="font-extrabold text-navy text-[14.5px] leading-snug">{w.t}</h3>
              <p className="text-[12.5px] text-slate-500 leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function EntryDetail({
  entry,
  crumbs,
}: {
  entry: CatalogEntry;
  crumbs: { label: string; href?: string }[];
}) {
  const card = toCard(entry);
  const settings = await getSettings();
  const images = [entry.coverImage, ...(entry.gallery ?? [])].filter((u): u is string => !!u);
  const siblings = await getEntriesByKind(entry.kind);
  const related = siblings.filter((e) => e.slug !== entry.slug).slice(0, 4).map(toCard);
  const brandName = card.brand;

  return (
    <>
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-site mx-auto px-4 py-3">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, ...crumbs]} />
        </div>
      </div>

      {/* Top 2-col */}
      <section className="bg-mist py-10">
        <div className="max-w-site mx-auto px-4">
          <div className="grid lg:grid-cols-[420px_1fr] gap-9 items-start">
            <div className="reveal">
              <EntryGallery images={images} icon={entry.icon} title={entry.title} badge={entry.badge} />
            </div>
            <div className="reveal space-y-5" style={{ transitionDelay: "80ms" }}>
              {brandName && (
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-card">
                  <span className="font-extrabold text-lg text-navy">{brandName}</span>
                </div>
              )}
              <h1 className="text-3xl lg:text-4xl font-extrabold text-navy leading-tight">{entry.headline || entry.title}</h1>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="space-y-2.5 text-[14px] text-slate-700">
                  {entry.highlights.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary-50 text-primary grid place-items-center shrink-0 mt-0.5">
                        <Icon name="check" className="w-3 h-3" stroke={2.2} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              <DetailActions productName={entry.title} />
              <div className="flex flex-wrap gap-2">
                {BADGES.map((b, i) => (
                  <span key={i} className={`text-[12px] font-bold px-3 py-1.5 rounded-xl border ${BADGE_COLORS[i % BADGE_COLORS.length]}`}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Commitment — full-width below the 2-col block */}
          <div className="reveal mt-7">
            <CommitmentBox settings={settings} />
          </div>
        </div>
      </section>

      {/* Tabs (description + specs), full-width */}
      <section className="py-10 bg-mist">
        <div className="max-w-site mx-auto px-4">
          <DetailTabs description={entry.description} specs={entry.specs} />
        </div>
      </section>

      <WhyLicensed hardware={entry.kind === "category"} />

      {/* Inline quote */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-site mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeading kicker="Liên hệ" title="Nhận báo giá / Đăng ký tư vấn" center />
            <div className="mt-7">
              <InlineQuoteForm product={entry.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-mist border-t border-slate-200">
          <div className="max-w-site mx-auto px-4">
            <SectionHeading kicker="Gợi ý" title="Sản phẩm & giải pháp liên quan" />
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTAStrip />
    </>
  );
}
