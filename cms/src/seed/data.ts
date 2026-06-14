/* Strapi-shaped seed of the real AZ taxonomy (mirrors the Next seed).
   Consumed by the idempotent bootstrap seeder (src/index.ts). */

export const BRANDS = [
  "Microsoft", "Adobe", "Cisco", "Dell", "HP", "Lenovo", "VMware", "Veeam",
  "Kaspersky", "Symantec", "Aruba", "IBM", "Apple", "Epson", "Canon", "Logitech",
  "Oracle", "ESET", "Bitdefender", "PRTG", "Zoom", "AutoDesk", "SketchUp",
  "Veritas", "SolarWinds", "Minitab", "TeamViewer", "McAfee", "BKAV",
];

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

const PROCESS = {
  __component: "blocks.process-steps",
  title: "Quy trình triển khai",
  steps: [
    { title: "Tư vấn", text: "Khảo sát nhu cầu, đề xuất giải pháp phù hợp." },
    { title: "Triển khai", text: "Lên kế hoạch và thực thi theo cam kết." },
    { title: "Lắp đặt", text: "Cài đặt, cấu hình, nghiệm thu tại chỗ." },
    { title: "Hỗ trợ sau bán hàng", text: "Bảo trì, giám sát và hỗ trợ lâu dài." },
  ],
};
const CTA = (heading: string) => ({
  __component: "blocks.cta",
  heading,
  sub: "Để lại thông tin, AZ Technology phản hồi trong vòng 24 giờ.",
});
const FEAT = (title: string, items: { title: string; text?: string }[]) => ({
  __component: "blocks.feature-list", title, items,
});

export interface SeedEntry {
  kind: string; title: string; slug: string; parentSlug?: string;
  icon?: string; tone?: string; badge?: string; summary?: string;
  featured?: boolean; priceMode?: string; brandSlugs?: string[]; body?: any[];
}

const TONES = ["blue", "cyan", "green", "navy", "red"];
const tone = (i: number) => TONES[i % TONES.length];

const groups: SeedEntry[] = [
  { kind: "category", slug: "thiet-bi-van-phong", title: "Thiết bị văn phòng", icon: "laptop", tone: "blue", summary: "PC, laptop, màn hình, máy in và thiết bị họp trực tuyến cho doanh nghiệp." },
  { kind: "category", slug: "data-center", title: "Data Center & Cloud", icon: "server", tone: "navy", summary: "Máy chủ, thiết bị mạng, lưu trữ, tường lửa, UPS và thuê hạ tầng trên Cloud." },
  { kind: "category", slug: "phan-mem", title: "Phần mềm bản quyền", icon: "windows", tone: "cyan", summary: "Microsoft, Zoom, Adobe, AutoDesk, phần mềm bảo mật, backup & giám sát." },
];

const subCats: SeedEntry[] = [
  ["PC | Mini PC | Laptop | Workstation", "pc-laptop-workstation", "laptop", ["dell", "hp", "lenovo", "apple"]],
  ["Màn hình | Màn hình tương tác | Máy chiếu", "man-hinh-may-chieu", "monitor", ["dell", "hp"]],
  ["Máy in | Máy Scan | Máy scan hóa đơn", "may-in-may-scan", "printer", ["canon", "epson"]],
  ["Thiết bị họp trực tuyến | Call Center", "thiet-bi-hop-call-center", "video", ["logitech", "cisco"]],
].map(([title, slug, icon, b], i): SeedEntry => ({
  kind: "category", title: title as string, slug: slug as string, parentSlug: "thiet-bi-van-phong",
  icon: icon as string, tone: tone(i), brandSlugs: b as string[],
  summary: `${title} chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu.`,
  body: [FEAT("Điểm nổi bật", [
    { title: "Hàng chính hãng", text: "Nhập khẩu, đầy đủ hóa đơn VAT." },
    { title: "Bảo hành tận nơi", text: "Hỗ trợ kỹ thuật toàn quốc." },
    { title: "Tư vấn cấu hình", text: "Đề xuất theo đúng nhu cầu sử dụng." },
  ]), CTA("Cần báo giá thiết bị?")],
}));

const dcCats: SeedEntry[] = [
  ["Máy chủ vật lý", "may-chu-vat-ly", "server", ["dell", "hp", "ibm"]],
  ["Thiết bị mạng", "thiet-bi-mang", "server", ["cisco", "aruba"]],
  ["Thiết bị lưu trữ", "thiet-bi-luu-tru", "backup", ["dell", "ibm"]],
  ["Thiết bị tường lửa", "thiet-bi-tuong-lua", "shield", ["cisco"]],
  ["Thiết bị lưu trữ điện (UPS)", "thiet-bi-ups", "battery", []],
  ["Phụ kiện Data Center (Tủ Rack…)", "phu-kien-data-center", "server", []],
  ["Thuê hạ tầng Data Center trên Cloud", "thue-ha-tang-cloud", "cloud", ["microsoft"]],
].map(([title, slug, icon, b], i): SeedEntry => ({
  kind: "category", title: title as string, slug: slug as string, parentSlug: "data-center",
  icon: icon as string, tone: tone(i + 1), brandSlugs: b as string[],
  summary: `${title} cho hạ tầng doanh nghiệp, tư vấn — triển khai — bảo trì trọn gói.`,
  body: [FEAT("Điểm nổi bật", [
    { title: "Chuẩn doanh nghiệp", text: "Thiết bị hiệu năng cao, độ sẵn sàng lớn." },
    { title: "Triển khai trọn gói", text: "Khảo sát, lắp đặt, cấu hình, nghiệm thu." },
  ]), CTA("Cần tư vấn hạ tầng Data Center?")],
}));

const services: SeedEntry[] = [
  ["Dịch vụ IT cơ bản", "dich-vu-it-co-ban", "wrench",
    ["Hỗ trợ từ xa / tại văn phòng khách hàng", "Bảo trì thiết bị IT", "Di dời thiết bị", "Bảo hành mở rộng", "Giám sát hệ thống", "Quản trị ủy quyền"]],
  ["Đào tạo IT", "dao-tao-it", "cap",
    ["Sử dụng Microsoft 365 cho người dùng văn phòng", "Quản trị hệ thống Microsoft 365", "Quản trị hệ thống Azure"]],
].map(([title, slug, icon, items], i): SeedEntry => ({
  kind: "service", title: title as string, slug: slug as string, icon: icon as string, tone: tone(i),
  summary: `${title}: ${(items as string[]).slice(0, 3).join(" · ")}…`,
  body: [FEAT("Phạm vi dịch vụ", (items as string[]).map((t) => ({ title: t }))), PROCESS, CTA(`Cần tư vấn ${(title as string).toLowerCase()}?`)],
}));

const solutionsRaw: [string, string, string, string, string[]][] = [
  ["Giải pháp hạ tầng Data Center", "ha-tang-data-center", "server", "navy", [
    "Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN", "Thiết kế, thi công trung tâm dữ liệu – Data Center",
    "Bảo mật mạng máy tính & Internet", "Hệ tầng máy chủ, ảo hóa",
    "Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server",
    "Lưu trữ, backup dữ liệu", "Phân quyền, bảo mật dữ liệu", "Hệ thống tổng đài IP Phone"]],
  ["Giải pháp bảo mật & An toàn thông tin", "bao-mat-attt", "shield", "blue", [
    "Chống thất thoát dữ liệu (DLP)", "Bảo mật hệ thống", "Bảo vệ dữ liệu", "Bảo mật trong môi trường ảo hóa", "Quản lý truy cập mạng"]],
  ["Giải pháp lưu trữ dữ liệu", "luu-tru-du-lieu", "backup", "green", [
    "Phần mềm backup", "Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE", "Lưu trữ dữ liệu trên Cloud"]],
  ["Giải pháp phòng họp trực tuyến", "phong-hop-truc-tuyen", "video", "cyan", [
    "Màn hình tương tác", "Microsoft Teams Rooms", "Zoom Rooms", "Google Meet", "Giải pháp dành cho giáo dục"]],
  ["Giải pháp An ninh (CCTV, Access Control)", "an-ninh-cctv", "shield", "navy", [
    "Camera giám sát an ninh", "Thiết bị kiểm soát ra vào văn phòng, tòa nhà"]],
  ["Giải pháp của Microsoft", "giai-phap-microsoft", "windows", "blue", [
    "Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint", "Windows 365: Cloud PC, Business, Enterprise",
    "Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP", "Azure: SaaS, IaaS, PaaS"]],
  ["Dịch vụ Migrate", "dich-vu-migrate", "cloud", "cyan", [
    "Email từ nền tảng khác → Microsoft 365", "Server on premise → Server on Cloud",
    "Database on premise → Database on Cloud", "Data on local → Data on Cloud"]],
];
const solutions: SeedEntry[] = solutionsRaw.map(([title, slug, icon, t, items], i): SeedEntry => ({
  kind: "solution", title, slug, icon, tone: t, featured: i < 4, badge: i === 0 ? "Tiêu biểu" : undefined,
  summary: `${(items[0] || "").slice(0, 80)}…`,
  body: [FEAT("Hạng mục giải pháp", items.map((x) => ({ title: x }))), PROCESS, CTA(`Cần tư vấn ${title.toLowerCase()}?`)],
}));

const softwareRaw: [string, string, string, string, string][] = [
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
const software: SeedEntry[] = softwareRaw.map(([title, slug, brand, icon, t]): SeedEntry => ({
  kind: "software", title, slug, icon, tone: t, brandSlugs: [brand],
  summary: `${title} — bản quyền chính hãng, tư vấn cấp phép theo quy mô doanh nghiệp.`,
  body: [
    FEAT("Vì sao chọn bản quyền", [
    { title: "Tuân thủ & an toàn", text: "Cập nhật bảo mật đầy đủ, không rủi ro pháp lý." },
    { title: "Hỗ trợ chính hãng", text: "Được hỗ trợ kỹ thuật trực tiếp từ nhà cung cấp." },
  ]), CTA(`Nhận báo giá ${title}`)],
}));

// Long-form content (softvn-style) appended as the last section of each detail page.
const AZ_COMMIT = `<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul>`;
const AZ_CONTACT = `<p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>`;

function contentHTML(kind: string, title: string): string {
  if (kind === "software") {
    return `<p><strong>${title}</strong> là phần mềm bản quyền chính hãng, được nhiều doanh nghiệp tin dùng để chuẩn hoá công cụ làm việc, bảo mật dữ liệu và tuân thủ pháp lý. AZ Technology là đối tác cung cấp, tư vấn cấp phép và triển khai ${title} cho doanh nghiệp tại Việt Nam.</p>
<h3>Vì sao nên dùng bản quyền ${title}?</h3>
<ul><li>Tuân thủ pháp lý, tránh rủi ro khi bị kiểm tra bản quyền.</li><li>Luôn nhận đầy đủ bản vá bảo mật và tính năng mới nhất.</li><li>Được nhà sản xuất hỗ trợ kỹ thuật chính thức.</li><li>Xuất hóa đơn VAT, thuận tiện cho quyết toán doanh nghiệp.</li></ul>
<h3>Các phiên bản & cấp phép</h3>
<p>${title} có nhiều phiên bản và hình thức cấp phép khác nhau theo số lượng người dùng và nhu cầu sử dụng. AZ Technology sẽ tư vấn gói phù hợp nhất để tối ưu chi phí.</p>
${AZ_COMMIT}${AZ_CONTACT}`;
  }
  if (kind === "solution") {
    return `<p><strong>${title}</strong> là giải pháp được AZ Technology tư vấn, thiết kế và triển khai trọn gói cho doanh nghiệp — từ khảo sát hiện trạng đến vận hành và bảo trì.</p>
<h3>Lợi ích cho doanh nghiệp</h3>
<ul><li>Hạ tầng ổn định, an toàn và sẵn sàng mở rộng.</li><li>Tối ưu chi phí đầu tư và vận hành.</li><li>Giảm rủi ro gián đoạn, bảo vệ dữ liệu quan trọng.</li><li>Được đội ngũ kỹ thuật giàu kinh nghiệm đồng hành.</li></ul>
<h3>Quy trình triển khai</h3>
<ol><li>Tư vấn & khảo sát hiện trạng.</li><li>Thiết kế giải pháp phù hợp.</li><li>Triển khai & lắp đặt.</li><li>Nghiệm thu & bàn giao.</li><li>Bảo trì & hỗ trợ sau triển khai.</li></ol>
${AZ_COMMIT}${AZ_CONTACT}`;
  }
  if (kind === "service") {
    return `<p><strong>${title}</strong> giúp doanh nghiệp vận hành hệ thống CNTT ổn định, giảm tải cho đội ngũ nội bộ và xử lý sự cố nhanh chóng. AZ Technology cung cấp dịch vụ linh hoạt theo nhu cầu thực tế.</p>
<h3>Vì sao chọn AZ Technology</h3>
<ul><li>Đội ngũ kỹ thuật giàu kinh nghiệm, phản hồi nhanh.</li><li>Cam kết SLA rõ ràng, minh bạch.</li><li>Phạm vi dịch vụ linh hoạt, mở rộng theo nhu cầu.</li><li>Hỗ trợ từ xa và tại chỗ trên toàn quốc.</li></ul>
${AZ_COMMIT}${AZ_CONTACT}`;
  }
  return `<p>Danh mục <strong>${title}</strong> tại AZ Technology cung cấp thiết bị, sản phẩm chính hãng cùng dịch vụ tư vấn — triển khai — bảo hành đi kèm cho doanh nghiệp.</p>
<h3>Vì sao mua tại AZ Technology</h3>
<ul><li>Sản phẩm chính hãng, đầy đủ hóa đơn VAT.</li><li>Tư vấn cấu hình đúng nhu cầu, tối ưu chi phí.</li><li>Giao hàng và lắp đặt nhanh trên toàn quốc.</li><li>Bảo hành và hỗ trợ kỹ thuật lâu dài.</li></ul>
${AZ_COMMIT}${AZ_CONTACT}`;
}

const RAW_ENTRIES: SeedEntry[] = [...groups, ...subCats, ...dcCats, ...services, ...solutions, ...software];

export const ENTRIES: SeedEntry[] = RAW_ENTRIES.map((e) => ({
  ...e,
  body: [
    ...(e.body ?? []).filter((b: any) => b.__component !== "blocks.rich-text"),
    { __component: "blocks.rich-text", heading: `Thông tin chi tiết về ${e.title}`, html: contentHTML(e.kind, e.title) },
  ],
}));

export const HERO = {
  title: "Hạ tầng số", highlight: "vững chắc", eyebrow: "Giải pháp CNTT toàn diện",
  subtitle: "Phần mềm bản quyền · Phần cứng chính hãng · Hạ tầng Data Center · Dịch vụ IT & Cloud — tất cả trong một đối tác duy nhất.",
  ctaLabel: "Xem giải pháp Data Center", ctaHref: "/giai-phap/ha-tang-data-center", gradientTone: "blue", order: 1, active: true,
};

export const SETTINGS = {
  company: "AZ IT Solutions & Services", shortName: "AZ Technology", slogan: "Software · Hardware · Cloud Services",
  hotline: "0703 594 402", email: "nhu.trang@az-technology.vn",
  address: "1/46/28 Đặng Thùy Trâm, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh, Việt Nam",
  zaloUrl: "https://zalo.me/0703594402", mapUrl: "https://maps.google.com/?q=AZ+Technology+Ho+Chi+Minh",
};

export { slugify };
