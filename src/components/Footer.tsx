import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { footerLinks } from "@/lib/data";
import { Icon } from "./Icon";

export function Footer({ settings }: { settings: SiteSettings }) {
  const cols: [string, { label: string; href: string }[]][] = [
    ["Tin công ty", footerLinks.company],
    ["Chính sách", footerLinks.policy],
    ["Hướng dẫn", footerLinks.guide],
  ];
  return (
    <footer className="az-grad-navy mt-20 text-white/80">
      <div className="az-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-lg font-extrabold text-white">AZ</span>
            <span className="text-lg font-extrabold text-white">AZ Technology</span>
          </div>
          <p className="text-sm">{settings.company}</p>
          <p className="mt-3 flex items-start gap-2 text-sm"><Icon name="map" className="mt-0.5 h-4 w-4 shrink-0" /> {settings.address}</p>
          <p className="mt-2 flex items-center gap-2 text-sm"><Icon name="phone" className="h-4 w-4" /> <a href={`tel:${settings.hotline.replace(/\s/g, "")}`} className="font-semibold text-white hover:text-cyan-200">{settings.hotline}</a></p>
          <p className="mt-2 flex items-center gap-2 text-sm"><Icon name="mail" className="h-4 w-4" /> <a href={`mailto:${settings.email}`} className="hover:text-cyan-200">{settings.email}</a></p>
        </div>
        {cols.map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-3 font-bold text-white">{title}</h3>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.label}><Link href={l.href} className="hover:text-cyan-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="az-container py-4 text-center text-xs text-white/60">
          © 2026 {settings.company}. {settings.slogan}.
        </div>
      </div>
    </footer>
  );
}
