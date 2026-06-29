import type { Tone } from "./types";

// Static design content (mega-menu, tiles, why-AZ, hero) ported from the handoff
// data.js, with hrefs mapped to this app's real routes.

export interface MegaColumn {
  heading: string;
  items: string[];
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

export const NAV: MegaItem[] = [
  {
    key: "phan-mem",
    label: "PHẦN MỀM",
    href: "/danh-muc/phan-mem",
    columns: [
      { heading: "Microsoft", items: ["Microsoft 365", "Windows 365", "Windows", "Office", "Azure", "Windows Server", "SQL Server", "Exchange"] },
      { heading: "Họp trực tuyến", items: ["Zoom Pro", "Zoom Business", "Zoom Enterprise", "Microsoft Teams", "Google Meet"] },
      { heading: "Đồ họa & Thiết kế", items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Acrobat", "Adobe Sign", "AutoDesk", "SketchUp"] },
      { heading: "Bảo mật / Diệt virus", items: ["Kaspersky", "Symantec", "McAfee", "Bitdefender", "BKAV", "ESET"] },
      { heading: "Backup & Giám sát", items: ["Veeam", "Veritas", "PRTG", "Solarwinds"] },
      { heading: "Khác", items: ["Oracle", "Minitab", "TeamViewer", "VMware"] },
    ],
    featured: { tag: "Bán chạy", title: "Microsoft 365 Business", desc: "Bộ ứng dụng văn phòng + email doanh nghiệp, bản quyền chính hãng.", href: "/san-pham/microsoft-365" },
  },
  {
    key: "phan-cung",
    label: "PHẦN CỨNG",
    href: "/danh-muc/thiet-bi-van-phong",
    columns: [
      { heading: "Thiết bị văn phòng", items: ["PC / Mini PC", "Laptop / Workstation", "Màn hình & Màn hình tương tác", "Máy chiếu", "Máy in / Máy Scan", "Máy scan hóa đơn–chứng từ", "Thiết bị họp trực tuyến", "Thiết bị Call Center"] },
      { heading: "Data Center", items: ["Máy chủ vật lý", "Thiết bị mạng", "Thiết bị lưu trữ", "Thiết bị tường lửa", "UPS – lưu trữ điện", "Tủ Rack & phụ kiện"] },
      { heading: "An ninh", items: ["Camera giám sát", "Kiểm soát ra vào (Access Control)"] },
      { heading: "Hãng cung cấp", items: ["Cisco", "Aruba", "Dell", "HP", "IBM", "Lenovo", "Apple", "Epson", "Canon", "Logitech"] },
    ],
    featured: { tag: "Doanh nghiệp", title: "Laptop & Workstation", desc: "Cấu hình mạnh cho văn phòng, kỹ thuật và đồ họa.", href: "/danh-muc/thiet-bi-van-phong" },
  },
  {
    key: "dich-vu",
    label: "DỊCH VỤ IT",
    href: "/dich-vu/dich-vu-it-co-ban",
    columns: [
      { heading: "Dịch vụ IT cơ bản", items: ["Hỗ trợ từ xa / tại văn phòng", "Bảo trì thiết bị IT", "Di dời thiết bị", "Bảo hành mở rộng", "Giám sát hệ thống", "Quản trị ủy quyền"] },
      { heading: "Cloud / Data Center", items: ["Thuê hạ tầng Data Center trên Cloud"] },
      { heading: "Dịch vụ Migrate", items: ["Email → Microsoft 365", "Server on-premise → Cloud", "Database on-premise → Cloud", "Data on local → Cloud"] },
      { heading: "Đào tạo IT", items: ["Microsoft 365 cho người dùng", "Quản trị hệ thống Microsoft 365", "Quản trị hệ thống Azure"] },
    ],
    featured: { tag: "Quy trình", title: "Dịch vụ Migrate lên Cloud", desc: "Tư vấn → Triển khai → Lắp đặt → Hỗ trợ sau bán hàng.", href: "/giai-phap/dich-vu-migrate" },
  },
  {
    key: "giai-phap",
    label: "GIẢI PHÁP",
    href: "/giai-phap/ha-tang-data-center",
    columns: [
      { heading: "Hạ tầng Data Center", items: ["Thiết kế mạng LAN/WAN", "Thi công Data Center", "Máy chủ & ảo hóa", "Hệ thống server (DNS, DHCP, Mail…)", "Lưu trữ – Backup", "Tổng đài IP Phone"] },
      { heading: "Bảo mật & ATTT", items: ["Chống thất thoát dữ liệu (DLP)", "Bảo mật hệ thống", "Bảo vệ dữ liệu", "Bảo mật môi trường ảo hóa", "Quản lý truy cập mạng"] },
      { heading: "Lưu trữ & Backup", items: ["Phần mềm backup", "Thiết bị SAN / NAS / TAPE", "Backup trên Cloud"] },
      { heading: "Phòng họp trực tuyến", items: ["Màn hình tương tác", "Microsoft Teams Rooms", "Zoom Rooms", "Google Meet", "Giải pháp cho giáo dục"] },
      { heading: "An ninh & Microsoft", items: ["Camera giám sát (CCTV)", "Kiểm soát ra vào", "Microsoft 365 / Windows 365", "Microsoft EMS", "Azure (SaaS/IaaS/PaaS)"] },
    ],
    featured: { tag: "Tiêu biểu", title: "Hạ tầng Data Center", desc: "Tư vấn – thiết kế – triển khai trọn gói cho doanh nghiệp.", href: "/giai-phap/ha-tang-data-center" },
  },
  {
    key: "tin-tuc",
    label: "TIN TỨC",
    href: "/tin-tuc",
    columns: [
      { heading: "Chuyên mục", items: ["Chia sẻ", "Tin công nghệ", "Thủ thuật", "Tin công ty"] },
      { heading: "Bài viết mới", items: ["Microsoft 365 cho SMB", "5 bước bảo mật dữ liệu", "Chọn UPS cho phòng server", "Migrate email an toàn"] },
    ],
  },
  { key: "ve-az", label: "VỀ AZ", href: "/ve-az" },
  { key: "doi-tac", label: "ĐỐI TÁC", href: "/ve-az#partners" },
  { key: "dai-ly", label: "ĐẠI LÝ", href: "/ve-az#dealer" },
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
  { label: "Phần cứng", icon: "cpu", href: "/danh-muc/thiet-bi-van-phong" },
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
  { kicker: "Microsoft 365 · Azure · Windows 365", title: ["Làm việc ", "mọi lúc", " trên nền tảng Cloud"], desc: "Triển khai và migrate lên Microsoft 365 an toàn, nhanh chóng. Đào tạo người dùng và quản trị hệ thống bài bản.", icon: "cloud", href: "/san-pham/microsoft-365", cta: "Khám phá Microsoft 365" },
  { kicker: "Bảo mật & An toàn thông tin", title: ["Bảo vệ ", "dữ liệu", " doanh nghiệp của bạn"], desc: "Giải pháp DLP, sao lưu, tường lửa và giám sát 24/7 — giữ cho hệ thống của bạn luôn an toàn và liên tục.", icon: "shield", href: "/giai-phap/bao-mat-attt", cta: "Xem giải pháp bảo mật" },
];
