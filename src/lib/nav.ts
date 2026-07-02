import type { Tone } from "./types";

// Static design content (mega-menu, tiles, why-AZ, hero) ported from the handoff
// data.js, with hrefs mapped to this app's real routes.

export interface MegaLink {
  label: string;
  href: string;
}
export interface MegaColumn {
  heading: string;
  href?: string;
  items: MegaLink[];
}
export interface MegaFeatured {
  tag: string;
  title: string;
  desc: string;
  href: string;
}
export interface MegaItem {
  key: string;
  label: string;
  href: string;
  columns?: MegaColumn[];
  featured?: MegaFeatured;
}

// The four catalog menus (PHẦN MỀM, PHẦN CỨNG, DỊCH VỤ IT, GIẢI PHÁP) are now
// built live from the CMS catalog in getMegaNav() (src/lib/data). These are only
// the static tail links appended after them.
export const NAV_STATIC_TAIL: MegaItem[] = [
  { key: "ve-az", label: "VỀ AZ", href: "/ve-az" },
  { key: "doi-tac", label: "ĐỐI TÁC", href: "/ve-az#partners" },
  { key: "lien-he", label: "LIÊN HỆ", href: "/lien-he" },
];

export const PARTNERS = [
  "Microsoft", "Adobe", "Cisco", "Dell", "HP", "Lenovo", "VMware", "Veeam", "Kaspersky", "Symantec",
  "Aruba", "IBM", "Apple", "Epson", "Canon", "Logitech", "Oracle", "ESET", "Bitdefender", "PRTG",
];

export interface HomeTile {
  label: string;
  icon: string;
  href: string;
}
export const CATEGORY_TILES: HomeTile[] = [
  { label: "Phần mềm", icon: "code", href: "/danh-muc/phan-mem" },
  { label: "Phần cứng", icon: "cpu", href: "/danh-muc/phan-cung" },
  { label: "Data Center", icon: "server", href: "/giai-phap/ha-tang-data-center" },
  { label: "Dịch vụ IT", icon: "wrench", href: "/dich-vu/dich-vu-it-co-ban" },
  { label: "Giải pháp", icon: "layers", href: "/giai-phap/ha-tang-data-center" },
  { label: "Bảo mật", icon: "shield", href: "/giai-phap/bao-mat-attt" },
  { label: "Cloud", icon: "cloud", href: "/giai-phap/dich-vu-migrate" },
  { label: "An ninh", icon: "camera", href: "/giai-phap/bao-mat-attt" },
  { label: "Đào tạo", icon: "cap", href: "/dich-vu/dao-tao-it" },
  { label: "Họp trực tuyến", icon: "video", href: "/giai-phap/ha-tang-data-center" },
];

export interface WhyItem {
  icon: string;
  title: string;
  desc: string;
}
export const WHY_AZ: WhyItem[] = [
  { icon: "badge", title: "Bản quyền chính hãng 100%", desc: "Cam kết phần mềm & thiết bị nguồn gốc rõ ràng, đầy đủ giấy tờ." },
  { icon: "receipt", title: "Xuất hóa đơn VAT", desc: "Hóa đơn điện tử hợp lệ cho mọi đơn hàng doanh nghiệp." },
  { icon: "truck", title: "Triển khai nhanh toàn quốc", desc: "Đội ngũ kỹ thuật hỗ trợ tận nơi trên khắp Việt Nam." },
  { icon: "headset", title: "Hỗ trợ kỹ thuật lâu dài", desc: "Đồng hành cùng doanh nghiệp suốt vòng đời sản phẩm." },
];

export interface HeroSlideDesign {
  kicker: string;
  title: [string, string, string];
  desc: string;
  icon: string;
  href: string;
  cta: string;
}
export const HERO_SLIDES: HeroSlideDesign[] = [
  { kicker: "Giải pháp CNTT toàn diện", title: ["Hạ tầng số ", "vững chắc", " cho mọi quy mô"], desc: "Phần mềm bản quyền · Phần cứng chính hãng · Hạ tầng Data Center · Dịch vụ IT & Cloud — tất cả trong một đối tác duy nhất.", icon: "server", href: "/giai-phap/ha-tang-data-center", cta: "Xem giải pháp Data Center" },
  { kicker: "Microsoft 365 · Azure · Windows 365", title: ["Làm việc ", "mọi lúc", " trên nền tảng Cloud"], desc: "Triển khai và migrate lên Microsoft 365 an toàn, nhanh chóng. Đào tạo người dùng và quản trị hệ thống bài bản.", icon: "cloud", href: "/danh-muc/microsoft", cta: "Khám phá Microsoft 365" },
  { kicker: "Bảo mật & An toàn thông tin", title: ["Bảo vệ ", "dữ liệu", " doanh nghiệp của bạn"], desc: "Giải pháp DLP, sao lưu, tường lửa và giám sát 24/7 — giữ cho hệ thống của bạn luôn an toàn và liên tục.", icon: "shield", href: "/giai-phap/bao-mat-attt", cta: "Xem giải pháp bảo mật" },
];
