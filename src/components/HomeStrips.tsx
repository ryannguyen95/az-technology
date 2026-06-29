import { WHY_AZ, PARTNERS } from "@/lib/nav";
import { Icon } from "./Icon";
import { PartnerLogo } from "./Cards";

export function WhyAZ({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? "py-10" : "py-14"} bg-white border-y border-slate-200`}>
      <div className="max-w-site mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_AZ.map((w, i) => (
            <div key={i} className="reveal flex items-start gap-3.5" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary grid place-items-center">
                <Icon name={w.icon} className="w-6 h-6" stroke={1.6} />
              </span>
              <div>
                <h3 className="font-extrabold text-navy text-[14.5px] leading-snug">{w.title}</h3>
                <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerMarquee({ title = "Đối tác & hãng phân phối" }: { title?: string }) {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <section className="py-12 bg-mist">
      <div className="max-w-site mx-auto px-4">
        <div className="text-center mb-7">
          <div className="text-xs font-extrabold tracking-[.18em] uppercase text-cyan-600 mb-2">Tin cậy bởi</div>
          <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
        </div>
      </div>
      <div className="az-marquee-wrap overflow-hidden">
        <div className="az-marquee px-6">
          {list.map((p, i) => (
            <PartnerLogo key={i} name={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
