import Link from "next/link";
import { settings } from "@/lib/data";
import { Icon } from "./Icon";
import { AZLogo } from "./Cards";

const tel = settings.hotline.replace(/\s/g, "");

const COLS: { title: string; links: string[] }[] = [
  { title: "Tin công ty", links: ["Giới thiệu công ty", "Tin tuyển dụng", "Liên hệ – góp ý", "Hóa đơn điện tử", "Bán hàng số lượng lớn", "Bản đồ"] },
  { title: "Chính sách", links: ["Chính sách bảo mật", "Bảo hành – bảo trì", "Chính sách đổi trả", "Điều khoản sử dụng"] },
  { title: "Hướng dẫn", links: ["Hướng dẫn mua hàng", "Câu hỏi thường gặp", "Tài liệu kỹ thuật", "Liên hệ hỗ trợ"] },
];

function linkFor(label: string): string {
  if (label.includes("Bản đồ")) return "/lien-he#map";
  if (label.includes("bảo mật")) return "/chinh-sach-bao-mat";
  if (label.includes("Giới thiệu")) return "/ve-az";
  return "/lien-he";
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="max-w-site mx-auto px-4 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8">
          <div className="col-span-2 lg:col-span-1">
            <AZLogo light />
            <p className="text-[13px] mt-4 leading-relaxed text-white/65 max-w-xs">{settings.address}</p>
            <div className="mt-4 space-y-2 text-[13.5px]">
              <a href={`tel:${tel}`} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Icon name="phone" className="w-4 h-4 text-cyan-400" /> {settings.hotline}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Icon name="mail" className="w-4 h-4 text-cyan-400" /> {settings.email}
              </a>
              <Link href="/lien-he" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Icon name="location" className="w-4 h-4 text-cyan-400" /> Liên hệ AZ Technology
              </Link>
            </div>
          </div>
          {COLS.map((c, i) => (
            <div key={i}>
              <h4 className="font-extrabold text-white text-[14px] mb-3.5 tracking-wide">{c.title}</h4>
              <ul className="space-y-2.5 text-[13.5px]">
                {c.links.map((l, j) => (
                  <li key={j}>
                    <Link href={linkFor(l)} className="text-white/65 hover:text-cyan-300 transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-site mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-white/55">
          <span>© 2026 AZ IT Solutions &amp; Services. Bảo lưu mọi quyền.</span>
          <span className="flex items-center gap-1.5">
            <Icon name="lock" className="w-3.5 h-3.5" /> Thông tin khách hàng được bảo mật tuyệt đối.
          </span>
        </div>
      </div>
    </footer>
  );
}
