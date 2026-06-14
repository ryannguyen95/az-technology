import type {
  Brand,
  CatalogEntry,
  CategoryTile,
  HeroSlide,
  NavItem,
  SiteSettings,
  Tone,
} from "@/lib/types";
import { entryHref } from "@/lib/routing";

/* ────────────────────────────────────────────────────────────────────────
   AZ Technology — real taxonomy seeded from the client's 2 sheets (2026-06-14).
   This is the local data source (DATA_SOURCE=seed). When Strapi is wired,
   src/lib/data/index.ts swaps the source; components/adapters stay unchanged.
   Note: the sheets are a TAXONOMY (no per-SKU prices) → priceMode defaults to
   "contact" everywhere.
   ──────────────────────────────────────────────────────────────────────── */

export const settings: SiteSettings = {
  company: "AZ IT Solutions & Services",
  shortName: "AZ Technology",
  slogan: "Software · Hardware · Cloud Services",
  hotline: "0703 594 402",
  email: "nhu.trang@az-technology.vn",
  address:
    "1/46/28 Đặng Thùy Trâm, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh, Việt Nam",
  zaloUrl: "https://zalo.me/0703594402",
  mapUrl: "https://maps.google.com/?q=AZ+Technology+Ho+Chi+Minh",
};

export const brands: Brand[] = [
  "Microsoft", "Adobe", "Cisco", "Dell", "HP", "Lenovo", "VMware", "Veeam",
  "Kaspersky", "Symantec", "Aruba", "IBM", "Apple", "Epson", "Canon", "Logitech",
  "Oracle", "ESET", "Bitdefender", "PRTG", "Zoom", "AutoDesk", "SketchUp",
  "Veritas", "SolarWinds", "Minitab", "TeamViewer", "McAfee", "BKAV",
].map((name) => ({
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  showInPartnerStrip: true,
}));

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    eyebrow: "Giải pháp CNTT toàn diện",
    title: "Hạ tầng số",
    highlight: "vững chắc",
    subtitle:
      "Phần mềm bản quyền · Phần cứng chính hãng · Hạ tầng Data Center · Dịch vụ IT & Cloud — tất cả trong một đối tác duy nhất.",
    ctaLabel: "Xem giải pháp Data Center",
    ctaHref: "/giai-phap/ha-tang-data-center",
    tone: "blue",
  },
];

export const categoryTiles: CategoryTile[] = [
  { label: "Phần mềm", icon: "windows", href: "/danh-muc/phan-mem" },
  { label: "Thiết bị văn phòng", icon: "laptop", href: "/danh-muc/thiet-bi-van-phong" },
  { label: "Data Center", icon: "server", href: "/danh-muc/data-center" },
  { label: "Dịch vụ IT", icon: "wrench", href: "/dich-vu/dich-vu-it-co-ban" },
  { label: "Giải pháp", icon: "shield", href: "/giai-phap/ha-tang-data-center" },
  { label: "Bảo mật", icon: "shield", href: "/giai-phap/bao-mat-attt" },
  { label: "Cloud", icon: "cloud", href: "/giai-phap/giai-phap-microsoft" },
  { label: "Đào tạo IT", icon: "cap", href: "/dich-vu/dao-tao-it" },
];

export const whyAZ = [
  { title: "Bản quyền chính hãng 100%", text: "Phần mềm & thiết bị nhập khẩu, hóa đơn rõ ràng." },
  { title: "Xuất hóa đơn VAT", text: "Đầy đủ chứng từ cho doanh nghiệp." },
  { title: "Triển khai nhanh toàn quốc", text: "Đội ngũ kỹ thuật phủ khắp các tỉnh thành." },
  { title: "Hỗ trợ kỹ thuật lâu dài", text: "Đồng hành sau bán hàng, phản hồi nhanh." },
];

const PROCESS = {
  type: "processSteps" as const,
  title: "Quy trình triển khai",
  steps: [
    { title: "Tư vấn", text: "Khảo sát nhu cầu, đề xuất giải pháp phù hợp." },
    { title: "Triển khai", text: "Lên kế hoạch và thực thi theo cam kết." },
    { title: "Lắp đặt", text: "Cài đặt, cấu hình, nghiệm thu tại chỗ." },
    { title: "Hỗ trợ sau bán hàng", text: "Bảo trì, giám sát và hỗ trợ lâu dài." },
  ],
};

const CTA = (heading: string) => ({
  type: "cta" as const,
  heading,
  sub: "Để lại thông tin, AZ Technology phản hồi trong vòng 24 giờ.",
});

// helper to build an entry
function E(e: Partial<CatalogEntry> & Pick<CatalogEntry, "kind" | "slug" | "title">): CatalogEntry {
  return { priceMode: "contact", ...e };
}

const TONES: Tone[] = ["blue", "cyan", "green", "navy", "red"];
const tone = (i: number) => TONES[i % TONES.length];

/* ── Catalog groups (kind=category, top-level) ── */
const groups: CatalogEntry[] = [
  E({ kind: "category", slug: "thiet-bi-van-phong", title: "Thiết bị văn phòng", icon: "laptop", tone: "blue", order: 1,
      summary: "PC, laptop, màn hình, máy in và thiết bị họp trực tuyến cho doanh nghiệp." }),
  E({ kind: "category", slug: "data-center", title: "Data Center & Cloud", icon: "server", tone: "navy", order: 2,
      summary: "Máy chủ, thiết bị mạng, lưu trữ, tường lửa, UPS và thuê hạ tầng trên Cloud." }),
  E({ kind: "category", slug: "phan-mem", title: "Phần mềm bản quyền", icon: "windows", tone: "cyan", order: 3,
      summary: "Microsoft, Zoom, Adobe, AutoDesk, phần mềm bảo mật, backup & giám sát." }),
];

/* ── Sub-categories (kind=category, parent = a group) ── */
const subCats: CatalogEntry[] = [
  // Thiết bị văn phòng
  ["PC | Mini PC | Laptop | Workstation", "pc-laptop-workstation", "laptop", ["Dell", "HP", "Lenovo", "Apple"]],
  ["Màn hình | Màn hình tương tác | Máy chiếu", "man-hinh-may-chieu", "monitor", ["Dell", "HP"]],
  ["Máy in | Máy Scan | Máy scan hóa đơn", "may-in-may-scan", "printer", ["Canon", "Epson"]],
  ["Thiết bị họp trực tuyến | Call Center", "thiet-bi-hop-call-center", "video", ["Logitech", "Cisco"]],
].map(([title, slug, icon, bnds], i) =>
  E({ kind: "category", slug: slug as string, title: title as string, parentSlug: "thiet-bi-van-phong",
      icon: icon as string, tone: tone(i), brandSlugs: (bnds as string[]).map((b) => b.toLowerCase()),
      summary: `${title} chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu.`,
      body: [
        { type: "featureList", title: "Điểm nổi bật", items: [
          { title: "Hàng chính hãng", text: "Nhập khẩu, đầy đủ hóa đơn VAT." },
          { title: "Bảo hành tận nơi", text: "Hỗ trợ kỹ thuật toàn quốc." },
          { title: "Tư vấn cấu hình", text: "Đề xuất theo đúng nhu cầu sử dụng." },
        ]},
        CTA("Cần báo giá thiết bị?"),
      ] }),
);

// Data Center sub-categories
const dcCats: CatalogEntry[] = [
  ["Máy chủ vật lý", "may-chu-vat-ly", "server", ["Dell", "HP", "IBM"]],
  ["Thiết bị mạng", "thiet-bi-mang", "server", ["Cisco", "Aruba"]],
  ["Thiết bị lưu trữ", "thiet-bi-luu-tru", "backup", ["Dell", "IBM"]],
  ["Thiết bị tường lửa", "thiet-bi-tuong-lua", "shield", ["Cisco"]],
  ["Thiết bị lưu trữ điện (UPS)", "thiet-bi-ups", "battery", []],
  ["Phụ kiện Data Center (Tủ Rack…)", "phu-kien-data-center", "server", []],
  ["Thuê hạ tầng Data Center trên Cloud", "thue-ha-tang-cloud", "cloud", ["Microsoft"]],
].map(([title, slug, icon, bnds], i) =>
  E({ kind: "category", slug: slug as string, title: title as string, parentSlug: "data-center",
      icon: icon as string, tone: tone(i + 1), brandSlugs: (bnds as string[]).map((b) => b.toLowerCase()),
      summary: `${title} cho hạ tầng doanh nghiệp, tư vấn — triển khai — bảo trì trọn gói.`,
      body: [
        { type: "featureList", title: "Điểm nổi bật", items: [
          { title: "Chuẩn doanh nghiệp", text: "Thiết bị hiệu năng cao, độ sẵn sàng lớn." },
          { title: "Triển khai trọn gói", text: "Khảo sát, lắp đặt, cấu hình, nghiệm thu." },
        ]},
        CTA("Cần tư vấn hạ tầng Data Center?"),
      ] }),
);

/* ── Services (kind=service) ── */
const itServices: CatalogEntry[] = [
  ["Dịch vụ IT cơ bản", "dich-vu-it-co-ban", "wrench",
    ["Hỗ trợ từ xa / tại văn phòng khách hàng", "Bảo trì thiết bị IT", "Di dời thiết bị",
     "Bảo hành mở rộng", "Giám sát hệ thống", "Quản trị ủy quyền"]],
  ["Đào tạo IT", "dao-tao-it", "cap",
    ["Sử dụng Microsoft 365 cho người dùng văn phòng", "Quản trị hệ thống Microsoft 365",
     "Quản trị hệ thống Azure"]],
].map(([title, slug, icon, items], i) =>
  E({ kind: "service", slug: slug as string, title: title as string, icon: icon as string, tone: tone(i),
      summary: `${title}: ${(items as string[]).slice(0, 3).join(" · ")}…`,
      body: [
        { type: "featureList", title: "Phạm vi dịch vụ", items: (items as string[]).map((t) => ({ title: t })) },
        PROCESS,
        CTA(`Cần tư vấn ${(title as string).toLowerCase()}?`),
      ] }),
);

/* ── Solutions (kind=solution) — 7 groups with feature bullets ── */
type Sol = [string, string, string, Tone, string[]];
const solutionsRaw: Sol[] = [
  ["Giải pháp hạ tầng Data Center", "ha-tang-data-center", "server", "navy", [
    "Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN",
    "Thiết kế, thi công trung tâm dữ liệu – Data Center",
    "Bảo mật mạng máy tính & Internet",
    "Hệ tầng máy chủ, ảo hóa",
    "Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server",
    "Lưu trữ, backup dữ liệu",
    "Phân quyền, bảo mật dữ liệu",
    "Hệ thống tổng đài IP Phone",
  ]],
  ["Giải pháp bảo mật & An toàn thông tin", "bao-mat-attt", "shield", "blue", [
    "Chống thất thoát dữ liệu (DLP)",
    "Bảo mật hệ thống",
    "Bảo vệ dữ liệu",
    "Bảo mật trong môi trường ảo hóa",
    "Quản lý truy cập mạng",
  ]],
  ["Giải pháp lưu trữ dữ liệu", "luu-tru-du-lieu", "backup", "green", [
    "Phần mềm backup",
    "Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE",
    "Lưu trữ dữ liệu trên Cloud",
  ]],
  ["Giải pháp phòng họp trực tuyến", "phong-hop-truc-tuyen", "video", "cyan", [
    "Màn hình tương tác",
    "Microsoft Teams Rooms",
    "Zoom Rooms",
    "Google Meet",
    "Giải pháp dành cho giáo dục",
  ]],
  ["Giải pháp An ninh (CCTV, Access Control)", "an-ninh-cctv", "shield", "navy", [
    "Camera giám sát an ninh",
    "Thiết bị kiểm soát ra vào văn phòng, tòa nhà",
  ]],
  ["Giải pháp của Microsoft", "giai-phap-microsoft", "windows", "blue", [
    "Microsoft 365: Email, Office (Word/Excel/PowerPoint/Outlook), Teams, OneDrive, Power BI, SharePoint",
    "Windows 365: Cloud PC, Business, Enterprise",
    "Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP",
    "Azure: SaaS, IaaS, PaaS",
  ]],
  ["Dịch vụ Migrate", "dich-vu-migrate", "cloud", "cyan", [
    "Email từ nền tảng khác (Google, Exchange on Local, Mdaemon…) → Microsoft 365",
    "Server on premise → Server on Cloud",
    "Database on premise → Database on Cloud",
    "Data on local → Data on Cloud",
  ]],
];

const solutions: CatalogEntry[] = solutionsRaw.map(([title, slug, icon, t, items], i) =>
  E({ kind: "solution", slug, title, icon, tone: t, order: i + 1, featured: i < 4,
      badge: i === 0 ? "Tiêu biểu" : undefined,
      summary: `${(items[0] || "").slice(0, 80)}…`,
      body: [
        { type: "featureList", title: "Hạng mục giải pháp", items: items.map((x) => ({ title: x })) },
        PROCESS,
        CTA(`Cần tư vấn ${title.toLowerCase()}?`),
      ] }),
);

/* ── Software (kind=software), representative vendor-grouped set ── */
type Sw = [string, string, string, string, Tone];
const softwareRaw: Sw[] = [
  ["Microsoft 365", "microsoft-365", "microsoft", "windows", "blue"],
  ["Windows 365 (Cloud PC)", "windows-365", "microsoft", "cloud", "cyan"],
  ["Windows 11 Pro", "windows-11-pro", "microsoft", "windows", "blue"],
  ["Windows Server 2022", "windows-server-2022", "microsoft", "server", "navy"],
  ["Microsoft Azure", "microsoft-azure", "microsoft", "cloud", "cyan"],
  ["Zoom Workplace (Pro/Business/Enterprise)", "zoom-workplace", "zoom", "video", "cyan"],
  ["Adobe Creative Cloud", "adobe-creative-cloud", "adobe", "design", "red"],
  ["AutoDesk", "autodesk", "autodesk", "design", "blue"],
  ["Kaspersky Endpoint Security", "kaspersky-endpoint", "kaspersky", "shield", "green"],
  ["ESET PROTECT", "eset-protect", "eset", "shield", "cyan"],
  ["Veeam Backup & Replication", "veeam-backup", "veeam", "backup", "green"],
  ["PRTG Network Monitor", "prtg", "prtg", "monitor", "navy"],
];
const software: CatalogEntry[] = softwareRaw.map(([title, slug, brand, icon, t]) =>
  E({ kind: "software", slug, title, icon, tone: t, brandSlugs: [brand],
      summary: `${title} — bản quyền chính hãng, tư vấn cấp phép theo quy mô doanh nghiệp.`,
      body: [
        { type: "featureList", title: "Vì sao chọn bản quyền", items: [
          { title: "Tuân thủ & an toàn", text: "Cập nhật bảo mật đầy đủ, không rủi ro pháp lý." },
          { title: "Hỗ trợ chính hãng", text: "Được hỗ trợ kỹ thuật trực tiếp từ nhà cung cấp." },
        ]},
        CTA(`Nhận báo giá ${title}`),
      ] }),
);

export const entries: CatalogEntry[] = [
  ...groups, ...subCats, ...dcCats, ...itServices, ...solutions, ...software,
];

// Mega-menu IA derived from the real taxonomy (design review Pass 1).
export const nav: NavItem[] = [
  {
    label: "Phần mềm",
    href: "/danh-muc/phan-mem",
    columns: [
      { heading: "Microsoft", links: software.filter((s) => s.brandSlugs?.includes("microsoft")).map((s) => ({ label: s.title, href: entryHref(s.kind, s.slug) })) },
      { heading: "Họp & Đồ họa", links: [software[5], software[6], software[7]].map((s) => ({ label: s.title, href: entryHref(s.kind, s.slug) })) },
      { heading: "Bảo mật & Backup", links: [software[8], software[9], software[10], software[11]].map((s) => ({ label: s.title, href: entryHref(s.kind, s.slug) })) },
    ],
  },
  {
    label: "Phần cứng",
    href: "/danh-muc/thiet-bi-van-phong",
    columns: [
      { heading: "Thiết bị văn phòng", links: subCats.map((c) => ({ label: c.title, href: entryHref(c.kind, c.slug) })) },
      { heading: "Data Center", links: dcCats.map((c) => ({ label: c.title, href: entryHref(c.kind, c.slug) })) },
    ],
  },
  {
    label: "Dịch vụ IT",
    href: "/dich-vu/dich-vu-it-co-ban",
    columns: [
      { heading: "Dịch vụ", links: itServices.map((s) => ({ label: s.title, href: entryHref(s.kind, s.slug) })) },
      { heading: "Migrate", links: [{ label: "Dịch vụ Migrate lên Cloud", href: "/giai-phap/dich-vu-migrate" }] },
    ],
  },
  {
    label: "Giải pháp",
    href: "/giai-phap/ha-tang-data-center",
    columns: [
      { heading: "Giải pháp doanh nghiệp", links: solutions.slice(0, 4).map((s) => ({ label: s.title, href: entryHref(s.kind, s.slug) })) },
      { heading: "Bảo mật & Cloud", links: solutions.slice(4).map((s) => ({ label: s.title, href: entryHref(s.kind, s.slug) })) },
    ],
  },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Về AZ", href: "/ve-az" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const footerLinks = {
  company: [
    { label: "Giới thiệu công ty", href: "/ve-az" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Liên hệ – góp ý", href: "/lien-he" },
    { label: "Bán hàng số lượng lớn", href: "/lien-he" },
  ],
  policy: [
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Bảo hành – bảo trì", href: "/lien-he" },
    { label: "Đổi trả", href: "/lien-he" },
  ],
  guide: [
    { label: "Hướng dẫn mua hàng", href: "/lien-he" },
    { label: "Câu hỏi thường gặp", href: "/lien-he" },
    { label: "Tài liệu kỹ thuật", href: "/lien-he" },
  ],
};
