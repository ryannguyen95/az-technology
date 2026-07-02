/* AUTO-GENERATED from AZTechnology CSV (regenerate via scripts/gen_seed.py).
   Three shapes: Danh mục cha (parent-category) + Danh mục con (category) + Sản phẩm (product). */

export const BRANDS = [
  "Microsoft",
  "Adobe",
  "Cisco",
  "Dell",
  "HP",
  "Lenovo",
  "VMware",
  "Veeam",
  "Kaspersky",
  "Symantec",
  "Aruba",
  "IBM",
  "Apple",
  "Epson",
  "Canon",
  "Logitech",
  "Oracle",
  "ESET",
  "Bitdefender",
  "PRTG",
  "Zoom",
  "AutoDesk",
  "SketchUp",
  "Veritas",
  "SolarWinds",
  "Minitab",
  "TeamViewer",
  "McAfee",
  "BKAV",
  "Trend Micro",
  "Fortinet"
];

const slugify = (s: string) =>
  s.normalize("NFKD").replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export interface SeedParentCategory { title: string; slug: string; icon?: string; order?: number; summary?: string; }
export interface SeedCategory { title: string; slug: string; parentSlug: string; icon?: string; order?: number; summary?: string; description?: string; }
export interface SeedProduct {
  title: string; slug: string; headline?: string; categorySlug: string;
  icon?: string; tone?: string; badge?: string; summary?: string;
  highlights?: string[]; description?: string; specs?: string;
  brandSlugs?: string[]; order?: number;
}
export interface SeedSubsection { title: string; productSlugs?: string[]; parentCategorySlug?: string; }
export interface SeedHomeSection { title: string; order: number; productSlugs?: string[]; parentCategorySlug?: string; subsections?: SeedSubsection[]; }

export const PARENT_CATEGORIES: SeedParentCategory[] = [
  {
    "title": "Phần cứng",
    "slug": "phan-cung",
    "icon": "cpu",
    "order": 2,
    "summary": "Phần cứng chính hãng cho doanh nghiệp — tư vấn, báo giá và triển khai bởi AZ Technology."
  },
  {
    "title": "Phần mềm",
    "slug": "phan-mem",
    "icon": "code",
    "order": 1,
    "summary": "Phần mềm chính hãng cho doanh nghiệp — tư vấn, báo giá và triển khai bởi AZ Technology."
  },
  {
    "title": "Dịch vụ IT",
    "slug": "dich-vu-it",
    "icon": "wrench",
    "order": 3,
    "summary": "Dịch vụ IT, bảo trì, triển khai và đào tạo cho doanh nghiệp."
  },
  {
    "title": "Giải pháp",
    "slug": "giai-phap",
    "icon": "layers",
    "order": 4,
    "summary": "Giải pháp hạ tầng, bảo mật, lưu trữ và phòng họp trực tuyến trọn gói."
  }
];
export const CATEGORIES: SeedCategory[] = [
  {
    "title": "Máy tính",
    "slug": "may-tinh",
    "parentSlug": "phan-cung",
    "icon": "laptop",
    "order": 1,
    "summary": "Máy tính chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Màn hình & Hiển thị",
    "slug": "man-hinh-hien-thi",
    "parentSlug": "phan-cung",
    "icon": "monitor",
    "order": 2,
    "summary": "Màn hình & Hiển thị chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Máy in & Scan",
    "slug": "may-in-scan",
    "parentSlug": "phan-cung",
    "icon": "printer",
    "order": 3,
    "summary": "Máy in & Scan chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Họp trực tuyến",
    "slug": "hop-truc-tuyen",
    "parentSlug": "phan-cung",
    "icon": "video",
    "order": 4,
    "summary": "Họp trực tuyến chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Thiết bị mạng",
    "slug": "thiet-bi-mang",
    "parentSlug": "phan-cung",
    "icon": "server",
    "order": 5,
    "summary": "Thiết bị mạng chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Lưu trữ",
    "slug": "luu-tru",
    "parentSlug": "phan-cung",
    "icon": "backup",
    "order": 6,
    "summary": "Lưu trữ chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Bảo mật",
    "slug": "bao-mat",
    "parentSlug": "phan-cung",
    "icon": "shield",
    "order": 7,
    "summary": "Bảo mật chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Data Center",
    "slug": "data-center",
    "parentSlug": "phan-cung",
    "icon": "server",
    "order": 8,
    "summary": "Data Center chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Microsoft",
    "slug": "microsoft",
    "parentSlug": "phan-mem",
    "icon": "microsoft",
    "order": 9,
    "summary": "Microsoft chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Adobe",
    "slug": "adobe",
    "parentSlug": "phan-mem",
    "icon": "adobe",
    "order": 10,
    "summary": "Adobe chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Autodesk & Thiết kế",
    "slug": "autodesk-thiet-ke",
    "parentSlug": "phan-mem",
    "icon": "autodesk",
    "order": 11,
    "summary": "Autodesk & Thiết kế chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Họp trực tuyến",
    "slug": "hop-truc-tuyen-pm",
    "parentSlug": "phan-mem",
    "icon": "video",
    "order": 12,
    "summary": "Họp trực tuyến chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Bảo mật",
    "slug": "bao-mat-pm",
    "parentSlug": "phan-mem",
    "icon": "shield",
    "order": 13,
    "summary": "Bảo mật chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Backup & Monitoring",
    "slug": "backup-monitoring",
    "parentSlug": "phan-mem",
    "icon": "backup",
    "order": 14,
    "summary": "Backup & Monitoring chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp."
  },
  {
    "title": "Dịch vụ IT cơ bản",
    "slug": "dich-vu-it-co-ban",
    "parentSlug": "dich-vu-it",
    "icon": "wrench",
    "order": 1,
    "summary": "Dịch vụ IT cơ bản — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Đào tạo IT",
    "slug": "dao-tao-it",
    "parentSlug": "dich-vu-it",
    "icon": "cap",
    "order": 2,
    "summary": "Đào tạo IT — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Giải pháp hạ tầng Data Center",
    "slug": "giai-phap-ha-tang-data-center",
    "parentSlug": "giai-phap",
    "icon": "server",
    "order": 1,
    "summary": "Giải pháp hạ tầng Data Center — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Giải pháp bảo mật & An toàn thông tin",
    "slug": "giai-phap-bao-mat-an-toan-thong-tin",
    "parentSlug": "giai-phap",
    "icon": "shield",
    "order": 2,
    "summary": "Giải pháp bảo mật & An toàn thông tin — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Giải pháp lưu trữ dữ liệu",
    "slug": "giai-phap-luu-tru-du-lieu",
    "parentSlug": "giai-phap",
    "icon": "backup",
    "order": 3,
    "summary": "Giải pháp lưu trữ dữ liệu — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Giải pháp phòng họp trực tuyến",
    "slug": "giai-phap-phong-hop-truc-tuyen",
    "parentSlug": "giai-phap",
    "icon": "video",
    "order": 4,
    "summary": "Giải pháp phòng họp trực tuyến — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Giải pháp An ninh (CCTV, Access Control)",
    "slug": "giai-phap-an-ninh-cctv-access-control",
    "parentSlug": "giai-phap",
    "icon": "shield",
    "order": 5,
    "summary": "Giải pháp An ninh (CCTV, Access Control) — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Giải pháp của Microsoft",
    "slug": "giai-phap-cua-microsoft",
    "parentSlug": "giai-phap",
    "icon": "windows",
    "order": 6,
    "summary": "Giải pháp của Microsoft — tư vấn, thiết kế và triển khai bởi AZ Technology."
  },
  {
    "title": "Dịch vụ Migrate",
    "slug": "dich-vu-migrate",
    "parentSlug": "giai-phap",
    "icon": "cloud",
    "order": 7,
    "summary": "Dịch vụ Migrate — tư vấn, thiết kế và triển khai bởi AZ Technology."
  }
];
export const PRODUCTS: SeedProduct[] = [
  {
    "title": "Hỗ trợ từ xa / tại văn phòng khách hàng",
    "slug": "ho-tro-tu-xa-tai-van-phong-khach-hang",
    "headline": "Hỗ trợ từ xa / tại văn phòng khách hàng",
    "categorySlug": "dich-vu-it-co-ban",
    "icon": "wrench",
    "tone": "blue",
    "summary": "Hỗ trợ từ xa / tại văn phòng khách hàng — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Hỗ trợ từ xa / tại văn phòng khách hàng</strong> thuộc nhóm <strong>Dịch vụ IT cơ bản</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Hỗ trợ từ xa / tại văn phòng khách hàng</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 1
  },
  {
    "title": "Bảo trì thiết bị IT",
    "slug": "bao-tri-thiet-bi-it",
    "headline": "Bảo trì thiết bị IT",
    "categorySlug": "dich-vu-it-co-ban",
    "icon": "wrench",
    "tone": "cyan",
    "summary": "Bảo trì thiết bị IT — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Bảo trì thiết bị IT</strong> thuộc nhóm <strong>Dịch vụ IT cơ bản</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Bảo trì thiết bị IT</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 2
  },
  {
    "title": "Di dời thiết bị",
    "slug": "di-doi-thiet-bi",
    "headline": "Di dời thiết bị",
    "categorySlug": "dich-vu-it-co-ban",
    "icon": "wrench",
    "tone": "green",
    "summary": "Di dời thiết bị — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Di dời thiết bị</strong> thuộc nhóm <strong>Dịch vụ IT cơ bản</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Di dời thiết bị</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 3
  },
  {
    "title": "Bảo hành mở rộng",
    "slug": "bao-hanh-mo-rong",
    "headline": "Bảo hành mở rộng",
    "categorySlug": "dich-vu-it-co-ban",
    "icon": "wrench",
    "tone": "navy",
    "summary": "Bảo hành mở rộng — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Bảo hành mở rộng</strong> thuộc nhóm <strong>Dịch vụ IT cơ bản</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Bảo hành mở rộng</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 4
  },
  {
    "title": "Giám sát hệ thống",
    "slug": "giam-sat-he-thong",
    "headline": "Giám sát hệ thống",
    "categorySlug": "dich-vu-it-co-ban",
    "icon": "wrench",
    "tone": "red",
    "summary": "Giám sát hệ thống — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Giám sát hệ thống</strong> thuộc nhóm <strong>Dịch vụ IT cơ bản</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Giám sát hệ thống</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 5
  },
  {
    "title": "Quản trị ủy quyền",
    "slug": "quan-tri-uy-quyen",
    "headline": "Quản trị ủy quyền",
    "categorySlug": "dich-vu-it-co-ban",
    "icon": "wrench",
    "tone": "blue",
    "summary": "Quản trị ủy quyền — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Quản trị ủy quyền</strong> thuộc nhóm <strong>Dịch vụ IT cơ bản</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Quản trị ủy quyền</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 6
  },
  {
    "title": "Sử dụng Microsoft 365 cho người dùng văn phòng",
    "slug": "su-dung-microsoft-365-cho-nguoi-dung-van-phong",
    "headline": "Sử dụng Microsoft 365 cho người dùng văn phòng",
    "categorySlug": "dao-tao-it",
    "icon": "cap",
    "tone": "blue",
    "summary": "Sử dụng Microsoft 365 cho người dùng văn phòng — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Sử dụng Microsoft 365 cho người dùng văn phòng</strong> thuộc nhóm <strong>Đào tạo IT</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Sử dụng Microsoft 365 cho người dùng văn phòng</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 1
  },
  {
    "title": "Quản trị hệ thống Microsoft 365",
    "slug": "quan-tri-he-thong-microsoft-365",
    "headline": "Quản trị hệ thống Microsoft 365",
    "categorySlug": "dao-tao-it",
    "icon": "cap",
    "tone": "cyan",
    "summary": "Quản trị hệ thống Microsoft 365 — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Quản trị hệ thống Microsoft 365</strong> thuộc nhóm <strong>Đào tạo IT</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Quản trị hệ thống Microsoft 365</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 2
  },
  {
    "title": "Quản trị hệ thống Azure",
    "slug": "quan-tri-he-thong-azure",
    "headline": "Quản trị hệ thống Azure",
    "categorySlug": "dao-tao-it",
    "icon": "cap",
    "tone": "green",
    "summary": "Quản trị hệ thống Azure — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Dịch vụ <strong>Quản trị hệ thống Azure</strong> thuộc nhóm <strong>Đào tạo IT</strong>, được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>Quản trị hệ thống Azure</strong> được khảo sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ tầng phù hợp.</p>",
    "order": 3
  },
  {
    "title": "Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN",
    "slug": "tu-van-thiet-ke-trien-khai-ha-tang-mang-lan-wan",
    "headline": "Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "blue",
    "summary": "Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Thiết kế, thi công trung tâm dữ liệu – Data Center",
    "slug": "thiet-ke-thi-cong-trung-tam-du-lieu-data-center",
    "headline": "Thiết kế, thi công trung tâm dữ liệu – Data Center",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "cyan",
    "summary": "Thiết kế, thi công trung tâm dữ liệu – Data Center — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Thiết kế, thi công trung tâm dữ liệu – Data Center</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Thiết kế, thi công trung tâm dữ liệu – Data Center</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Bảo mật mạng máy tính & Internet",
    "slug": "bao-mat-mang-may-tinh-internet",
    "headline": "Bảo mật mạng máy tính & Internet",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "green",
    "summary": "Bảo mật mạng máy tính & Internet — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Bảo mật mạng máy tính &amp; Internet</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Bảo mật mạng máy tính &amp; Internet</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 3
  },
  {
    "title": "Hệ tầng máy chủ, ảo hóa",
    "slug": "he-tang-may-chu-ao-hoa",
    "headline": "Hệ tầng máy chủ, ảo hóa",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "navy",
    "summary": "Hệ tầng máy chủ, ảo hóa — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Hệ tầng máy chủ, ảo hóa</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Hệ tầng máy chủ, ảo hóa</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 4
  },
  {
    "title": "Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server",
    "slug": "he-thong-may-chu-domain-dns-dhcp-file-web-mail-database-server",
    "headline": "Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "red",
    "summary": "Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 5
  },
  {
    "title": "Lưu trữ, backup dữ liệu",
    "slug": "luu-tru-backup-du-lieu",
    "headline": "Lưu trữ, backup dữ liệu",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "blue",
    "summary": "Lưu trữ, backup dữ liệu — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Lưu trữ, backup dữ liệu</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Lưu trữ, backup dữ liệu</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 6
  },
  {
    "title": "Phân quyền, bảo mật dữ liệu",
    "slug": "phan-quyen-bao-mat-du-lieu",
    "headline": "Phân quyền, bảo mật dữ liệu",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "cyan",
    "summary": "Phân quyền, bảo mật dữ liệu — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Phân quyền, bảo mật dữ liệu</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Phân quyền, bảo mật dữ liệu</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 7
  },
  {
    "title": "Hệ thống tổng đài IP Phone",
    "slug": "he-thong-tong-dai-ip-phone",
    "headline": "Hệ thống tổng đài IP Phone",
    "categorySlug": "giai-phap-ha-tang-data-center",
    "icon": "server",
    "tone": "green",
    "summary": "Hệ thống tổng đài IP Phone — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Hệ thống tổng đài IP Phone</strong> thuộc nhóm <strong>Giải pháp hạ tầng Data Center</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Hệ thống tổng đài IP Phone</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 8
  },
  {
    "title": "Chống thất thoát dữ liệu (DLP)",
    "slug": "chong-that-thoat-du-lieu-dlp",
    "headline": "Chống thất thoát dữ liệu (DLP)",
    "categorySlug": "giai-phap-bao-mat-an-toan-thong-tin",
    "icon": "shield",
    "tone": "blue",
    "summary": "Chống thất thoát dữ liệu (DLP) — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Chống thất thoát dữ liệu (DLP)</strong> thuộc nhóm <strong>Giải pháp bảo mật &amp; An toàn thông tin</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Chống thất thoát dữ liệu (DLP)</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Bảo mật hệ thống",
    "slug": "bao-mat-he-thong",
    "headline": "Bảo mật hệ thống",
    "categorySlug": "giai-phap-bao-mat-an-toan-thong-tin",
    "icon": "shield",
    "tone": "cyan",
    "summary": "Bảo mật hệ thống — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Bảo mật hệ thống</strong> thuộc nhóm <strong>Giải pháp bảo mật &amp; An toàn thông tin</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Bảo mật hệ thống</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Bảo vệ dữ liệu",
    "slug": "bao-ve-du-lieu",
    "headline": "Bảo vệ dữ liệu",
    "categorySlug": "giai-phap-bao-mat-an-toan-thong-tin",
    "icon": "shield",
    "tone": "green",
    "summary": "Bảo vệ dữ liệu — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Bảo vệ dữ liệu</strong> thuộc nhóm <strong>Giải pháp bảo mật &amp; An toàn thông tin</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Bảo vệ dữ liệu</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 3
  },
  {
    "title": "Bảo mật trong môi trường ảo hóa",
    "slug": "bao-mat-trong-moi-truong-ao-hoa",
    "headline": "Bảo mật trong môi trường ảo hóa",
    "categorySlug": "giai-phap-bao-mat-an-toan-thong-tin",
    "icon": "shield",
    "tone": "navy",
    "summary": "Bảo mật trong môi trường ảo hóa — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Bảo mật trong môi trường ảo hóa</strong> thuộc nhóm <strong>Giải pháp bảo mật &amp; An toàn thông tin</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Bảo mật trong môi trường ảo hóa</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 4
  },
  {
    "title": "Quản lý truy cập mạng",
    "slug": "quan-ly-truy-cap-mang",
    "headline": "Quản lý truy cập mạng",
    "categorySlug": "giai-phap-bao-mat-an-toan-thong-tin",
    "icon": "shield",
    "tone": "red",
    "summary": "Quản lý truy cập mạng — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Quản lý truy cập mạng</strong> thuộc nhóm <strong>Giải pháp bảo mật &amp; An toàn thông tin</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Quản lý truy cập mạng</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 5
  },
  {
    "title": "Phần mềm backup",
    "slug": "phan-mem-backup",
    "headline": "Phần mềm backup",
    "categorySlug": "giai-phap-luu-tru-du-lieu",
    "icon": "backup",
    "tone": "blue",
    "summary": "Phần mềm backup — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Phần mềm backup</strong> thuộc nhóm <strong>Giải pháp lưu trữ dữ liệu</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Phần mềm backup</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE",
    "slug": "luu-tru-tren-thiet-bi-chuyen-dung-san-nas-tape",
    "headline": "Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE",
    "categorySlug": "giai-phap-luu-tru-du-lieu",
    "icon": "backup",
    "tone": "cyan",
    "summary": "Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE</strong> thuộc nhóm <strong>Giải pháp lưu trữ dữ liệu</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Lưu trữ dữ liệu trên Cloud",
    "slug": "luu-tru-du-lieu-tren-cloud",
    "headline": "Lưu trữ dữ liệu trên Cloud",
    "categorySlug": "giai-phap-luu-tru-du-lieu",
    "icon": "backup",
    "tone": "green",
    "summary": "Lưu trữ dữ liệu trên Cloud — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Lưu trữ dữ liệu trên Cloud</strong> thuộc nhóm <strong>Giải pháp lưu trữ dữ liệu</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Lưu trữ dữ liệu trên Cloud</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 3
  },
  {
    "title": "Màn hình tương tác",
    "slug": "man-hinh-tuong-tac",
    "headline": "Màn hình tương tác",
    "categorySlug": "giai-phap-phong-hop-truc-tuyen",
    "icon": "video",
    "tone": "blue",
    "summary": "Màn hình tương tác — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Màn hình tương tác</strong> thuộc nhóm <strong>Giải pháp phòng họp trực tuyến</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Màn hình tương tác</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Microsoft Teams Rooms",
    "slug": "microsoft-teams-rooms",
    "headline": "Microsoft Teams Rooms",
    "categorySlug": "giai-phap-phong-hop-truc-tuyen",
    "icon": "video",
    "tone": "cyan",
    "summary": "Microsoft Teams Rooms — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Microsoft Teams Rooms</strong> thuộc nhóm <strong>Giải pháp phòng họp trực tuyến</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Microsoft Teams Rooms</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Zoom Rooms",
    "slug": "zoom-rooms",
    "headline": "Zoom Rooms",
    "categorySlug": "giai-phap-phong-hop-truc-tuyen",
    "icon": "video",
    "tone": "green",
    "summary": "Zoom Rooms — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Zoom Rooms</strong> thuộc nhóm <strong>Giải pháp phòng họp trực tuyến</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Zoom Rooms</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 3
  },
  {
    "title": "Google Meet",
    "slug": "google-meet",
    "headline": "Google Meet",
    "categorySlug": "giai-phap-phong-hop-truc-tuyen",
    "icon": "video",
    "tone": "navy",
    "summary": "Google Meet — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Google Meet</strong> thuộc nhóm <strong>Giải pháp phòng họp trực tuyến</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Google Meet</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 4
  },
  {
    "title": "Giải pháp dành cho giáo dục",
    "slug": "giai-phap-danh-cho-giao-duc",
    "headline": "Giải pháp dành cho giáo dục",
    "categorySlug": "giai-phap-phong-hop-truc-tuyen",
    "icon": "video",
    "tone": "red",
    "summary": "Giải pháp dành cho giáo dục — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Giải pháp dành cho giáo dục</strong> thuộc nhóm <strong>Giải pháp phòng họp trực tuyến</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Giải pháp dành cho giáo dục</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 5
  },
  {
    "title": "Camera giám sát an ninh",
    "slug": "camera-giam-sat-an-ninh",
    "headline": "Camera giám sát an ninh",
    "categorySlug": "giai-phap-an-ninh-cctv-access-control",
    "icon": "shield",
    "tone": "blue",
    "summary": "Camera giám sát an ninh — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Camera giám sát an ninh</strong> thuộc nhóm <strong>Giải pháp An ninh (CCTV, Access Control)</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Camera giám sát an ninh</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Thiết bị kiểm soát ra vào văn phòng, tòa nhà",
    "slug": "thiet-bi-kiem-soat-ra-vao-van-phong-toa-nha",
    "headline": "Thiết bị kiểm soát ra vào văn phòng, tòa nhà",
    "categorySlug": "giai-phap-an-ninh-cctv-access-control",
    "icon": "shield",
    "tone": "cyan",
    "summary": "Thiết bị kiểm soát ra vào văn phòng, tòa nhà — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Thiết bị kiểm soát ra vào văn phòng, tòa nhà</strong> thuộc nhóm <strong>Giải pháp An ninh (CCTV, Access Control)</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Thiết bị kiểm soát ra vào văn phòng, tòa nhà</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint",
    "slug": "microsoft-365-email-office-teams-onedrive-power-bi-sharepoint",
    "headline": "Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint",
    "categorySlug": "giai-phap-cua-microsoft",
    "icon": "windows",
    "tone": "blue",
    "summary": "Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint</strong> thuộc nhóm <strong>Giải pháp của Microsoft</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Windows 365: Cloud PC, Business, Enterprise",
    "slug": "windows-365-cloud-pc-business-enterprise",
    "headline": "Windows 365: Cloud PC, Business, Enterprise",
    "categorySlug": "giai-phap-cua-microsoft",
    "icon": "windows",
    "tone": "cyan",
    "summary": "Windows 365: Cloud PC, Business, Enterprise — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Windows 365: Cloud PC, Business, Enterprise</strong> thuộc nhóm <strong>Giải pháp của Microsoft</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Windows 365: Cloud PC, Business, Enterprise</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP",
    "slug": "microsoft-ems-azure-ad-premium-intune-azure-rights-management-ata-dlp",
    "headline": "Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP",
    "categorySlug": "giai-phap-cua-microsoft",
    "icon": "windows",
    "tone": "green",
    "summary": "Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP</strong> thuộc nhóm <strong>Giải pháp của Microsoft</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 3
  },
  {
    "title": "Azure: SaaS, IaaS, PaaS",
    "slug": "azure-saas-iaas-paas",
    "headline": "Azure: SaaS, IaaS, PaaS",
    "categorySlug": "giai-phap-cua-microsoft",
    "icon": "windows",
    "tone": "navy",
    "summary": "Azure: SaaS, IaaS, PaaS — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Azure: SaaS, IaaS, PaaS</strong> thuộc nhóm <strong>Giải pháp của Microsoft</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Azure: SaaS, IaaS, PaaS</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 4
  },
  {
    "title": "Email từ nền tảng khác → Microsoft 365",
    "slug": "email-tu-nen-tang-khac-microsoft-365",
    "headline": "Email từ nền tảng khác → Microsoft 365",
    "categorySlug": "dich-vu-migrate",
    "icon": "cloud",
    "tone": "blue",
    "summary": "Email từ nền tảng khác → Microsoft 365 — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Email từ nền tảng khác → Microsoft 365</strong> thuộc nhóm <strong>Dịch vụ Migrate</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Email từ nền tảng khác → Microsoft 365</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 1
  },
  {
    "title": "Server on premise → Server on Cloud",
    "slug": "server-on-premise-server-on-cloud",
    "headline": "Server on premise → Server on Cloud",
    "categorySlug": "dich-vu-migrate",
    "icon": "cloud",
    "tone": "cyan",
    "summary": "Server on premise → Server on Cloud — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Server on premise → Server on Cloud</strong> thuộc nhóm <strong>Dịch vụ Migrate</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Server on premise → Server on Cloud</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 2
  },
  {
    "title": "Database on premise → Database on Cloud",
    "slug": "database-on-premise-database-on-cloud",
    "headline": "Database on premise → Database on Cloud",
    "categorySlug": "dich-vu-migrate",
    "icon": "cloud",
    "tone": "green",
    "summary": "Database on premise → Database on Cloud — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Database on premise → Database on Cloud</strong> thuộc nhóm <strong>Dịch vụ Migrate</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Database on premise → Database on Cloud</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 3
  },
  {
    "title": "Data on local → Data on Cloud",
    "slug": "data-on-local-data-on-cloud",
    "headline": "Data on local → Data on Cloud",
    "categorySlug": "dich-vu-migrate",
    "icon": "cloud",
    "tone": "navy",
    "summary": "Data on local → Data on Cloud — tư vấn và triển khai bởi AZ Technology.",
    "highlights": [
      "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
      "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
      "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài."
    ],
    "description": "<p>Giải pháp <strong>Data on local → Data on Cloud</strong> thuộc nhóm <strong>Dịch vụ Migrate</strong>, được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>Data on local → Data on Cloud</strong> được thiết kế theo hiện trạng và quy mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần thiết.</p>",
    "order": 4
  },
  {
    "title": "Dell PC Văn Phòng Chính Hãng",
    "slug": "dell-pc-van-phong-chinh-hang",
    "headline": "Dell PC Văn Phòng Chính Hãng – Lựa Chọn An Tâm Cho Kế Toán, Văn Phòng Và Quản Lý",
    "categorySlug": "may-tinh",
    "icon": "laptop",
    "tone": "blue",
    "badge": "Bán chạy",
    "summary": "Dell PC Văn Phòng Chính Hãng — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Dell OptiPlex dành cho doanh nghiệp vừa và nhỏ.",
      "Sử dụng Intel Core thế hệ mới, đáp ứng tốt Office, ERP và kế toán.",
      "Hỗ trợ nâng cấp RAM DDR5 và SSD NVMe theo nhu cầu sử dụng.",
      "Thiết kế tối ưu không gian làm việc và vận hành ổn định 24/7.",
      "Tích hợp nhiều cổng USB, HDMI/DisplayPort phục vụ đa màn hình.",
      "AZ Technology hỗ trợ tư vấn cấu hình, cài đặt và bàn giao tận nơi."
    ],
    "description": "<p>Dell PC Văn Phòng Chính Hãng là giải pháp máy tính để bàn được nhiều doanh nghiệp lựa chọn nhờ khả năng vận hành ổn định và độ bền cao. Sản phẩm được trang bị bộ vi xử lý Intel® Core™ thế hệ mới, RAM từ 8GB–32GB, ổ cứng SSD 256GB–1TB, hỗ trợ xuất hình ảnh lên 02 màn hình cùng lúc, đáp ứng hiệu quả các tác vụ kế toán, bán hàng, quản lý dữ liệu và làm việc trực tuyến. Với thiết kế nhỏ gọn, khả năng nâng cấp linh hoạt cùng chế độ bảo hành chính hãng, Dell PC giúp doanh nghiệp tối ưu chi phí đầu tư và nâng cao năng suất làm việc lâu dài.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Dell PC Văn Phòng Chính Hãng</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [
      "dell"
    ],
    "order": 1
  },
  {
    "title": "Mini PC Chính Hãng",
    "slug": "mini-pc-chinh-hang",
    "headline": "Mini PC Chính Hãng – Nhỏ Gọn Trong Thiết Kế, Mạnh Mẽ Trong Hiệu Năng",
    "categorySlug": "may-tinh",
    "icon": "laptop",
    "tone": "cyan",
    "badge": "Bán chạy",
    "summary": "Mini PC Chính Hãng — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng HP ProDesk dành cho doanh nghiệp vừa và nhỏ.",
      "Sử dụng Intel Core thế hệ mới, đáp ứng tốt Office, ERP và kế toán.",
      "Hỗ trợ nâng cấp RAM DDR5 và SSD NVMe theo nhu cầu sử dụng.",
      "Thiết kế tối ưu không gian làm việc và vận hành ổn định 24/7.",
      "Tích hợp nhiều cổng USB, HDMI/DisplayPort phục vụ đa màn hình.",
      "AZ Technology hỗ trợ tư vấn cấu hình, cài đặt và bàn giao tận nơi."
    ],
    "description": "<p>Trang bị bộ vi xử lý Intel® Core™ thế hệ mới, RAM từ 8GB–16GB, ổ cứng SSD 256GB–512GB và khả năng xuất đồng thời 02 màn hình 4K, Mini PC đáp ứng tốt nhu cầu làm việc văn phòng, trình chiếu, quản lý bán hàng, họp trực tuyến và vận hành hệ thống doanh nghiệp. Thiết bị vận hành êm ái, tiêu thụ điện năng thấp và được bảo hành chính hãng, giúp doanh nghiệp tối ưu chi phí đầu tư và sử dụng lâu dài.</p><h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Mini PC Chính Hãng</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 2
  },
  {
    "title": "Laptop doanh nghiệp",
    "slug": "laptop-doanh-nghiep",
    "headline": "Laptop doanh nghiệp",
    "categorySlug": "may-tinh",
    "icon": "laptop",
    "tone": "green",
    "summary": "Laptop doanh nghiệp — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Gợi ý dòng Lenovo ThinkPad chuyên dùng cho doanh nghiệp và nhân sự di động.",
      "Màn hình chống chói giúp làm việc lâu dài thoải mái hơn.",
      "SSD tốc độ cao giúp khởi động máy và ứng dụng nhanh chóng.",
      "WiFi 6/6E tăng độ ổn định khi họp trực tuyến và làm việc từ xa.",
      "Bảo hành chính hãng và hỗ trợ triển khai bởi AZ Technology.",
      "Phù hợp nhân viên văn phòng, quản lý và đội ngũ kinh doanh."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Laptop doanh nghiệp</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 3
  },
  {
    "title": "Laptop đồ họa",
    "slug": "laptop-do-hoa",
    "headline": "Laptop đồ họa",
    "categorySlug": "may-tinh",
    "icon": "laptop",
    "tone": "navy",
    "summary": "Laptop đồ họa — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Gợi ý dòng Dell Latitude chuyên dùng cho doanh nghiệp và nhân sự di động.",
      "Màn hình chống chói giúp làm việc lâu dài thoải mái hơn.",
      "SSD tốc độ cao giúp khởi động máy và ứng dụng nhanh chóng.",
      "WiFi 6/6E tăng độ ổn định khi họp trực tuyến và làm việc từ xa.",
      "Bảo hành chính hãng và hỗ trợ triển khai bởi AZ Technology.",
      "Phù hợp nhân viên văn phòng, quản lý và đội ngũ kinh doanh."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Laptop đồ họa</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 4
  },
  {
    "title": "Workstation Mobile",
    "slug": "workstation-mobile",
    "headline": "Workstation Mobile",
    "categorySlug": "may-tinh",
    "icon": "laptop",
    "tone": "red",
    "summary": "Workstation Mobile — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng HP ProDesk dành cho doanh nghiệp vừa và nhỏ.",
      "Sử dụng Intel Core thế hệ mới, đáp ứng tốt Office, ERP và kế toán.",
      "Hỗ trợ nâng cấp RAM DDR5 và SSD NVMe theo nhu cầu sử dụng.",
      "Thiết kế tối ưu không gian làm việc và vận hành ổn định 24/7.",
      "Tích hợp nhiều cổng USB, HDMI/DisplayPort phục vụ đa màn hình.",
      "AZ Technology hỗ trợ tư vấn cấu hình, cài đặt và bàn giao tận nơi."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Workstation Mobile</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 5
  },
  {
    "title": "Workstation Tower",
    "slug": "workstation-tower",
    "headline": "Workstation Tower",
    "categorySlug": "may-tinh",
    "icon": "laptop",
    "tone": "blue",
    "summary": "Workstation Tower — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Lenovo ThinkCentre dành cho doanh nghiệp vừa và nhỏ.",
      "Sử dụng Intel Core thế hệ mới, đáp ứng tốt Office, ERP và kế toán.",
      "Hỗ trợ nâng cấp RAM DDR5 và SSD NVMe theo nhu cầu sử dụng.",
      "Thiết kế tối ưu không gian làm việc và vận hành ổn định 24/7.",
      "Tích hợp nhiều cổng USB, HDMI/DisplayPort phục vụ đa màn hình.",
      "AZ Technology hỗ trợ tư vấn cấu hình, cài đặt và bàn giao tận nơi."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Workstation Tower</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 6
  },
  {
    "title": "Màn hình văn phòng",
    "slug": "man-hinh-van-phong",
    "headline": "Màn hình văn phòng",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "cyan",
    "badge": "Bán chạy",
    "summary": "Màn hình văn phòng — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Màn hình văn phòng</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 7
  },
  {
    "title": "Màn hình đồ họa",
    "slug": "man-hinh-do-hoa",
    "headline": "Màn hình đồ họa",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "green",
    "badge": "Bán chạy",
    "summary": "Màn hình đồ họa — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Màn hình đồ họa</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 8
  },
  {
    "title": "Màn hình cong",
    "slug": "man-hinh-cong",
    "headline": "Màn hình cong",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "navy",
    "summary": "Màn hình cong — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Màn hình cong</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 9
  },
  {
    "title": "Màn hình tương tác",
    "slug": "man-hinh-tuong-tac-2",
    "headline": "Màn hình tương tác",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "red",
    "summary": "Màn hình tương tác — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Màn hình tương tác</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 10
  },
  {
    "title": "TV doanh nghiệp",
    "slug": "tv-doanh-nghiep",
    "headline": "TV doanh nghiệp",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "blue",
    "summary": "TV doanh nghiệp — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>TV doanh nghiệp</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 11
  },
  {
    "title": "Máy chiếu",
    "slug": "may-chieu",
    "headline": "Máy chiếu",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "cyan",
    "summary": "Máy chiếu — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy chiếu</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 12
  },
  {
    "title": "Máy chiếu Laser",
    "slug": "may-chieu-laser",
    "headline": "Máy chiếu Laser",
    "categorySlug": "man-hinh-hien-thi",
    "icon": "monitor",
    "tone": "green",
    "summary": "Máy chiếu Laser — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Màn hình & Hiển thị được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy chiếu Laser</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 13
  },
  {
    "title": "Máy in Laser",
    "slug": "may-in-laser",
    "headline": "Máy in Laser",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "navy",
    "badge": "Bán chạy",
    "summary": "Máy in Laser — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy in Laser</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 14
  },
  {
    "title": "Máy in màu",
    "slug": "may-in-mau",
    "headline": "Máy in màu",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "red",
    "badge": "Bán chạy",
    "summary": "Máy in màu — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy in màu</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 15
  },
  {
    "title": "Máy in đa năng",
    "slug": "may-in-da-nang",
    "headline": "Máy in đa năng",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "blue",
    "summary": "Máy in đa năng — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy in đa năng</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 16
  },
  {
    "title": "Máy in tem nhãn",
    "slug": "may-in-tem-nhan",
    "headline": "Máy in tem nhãn",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "cyan",
    "summary": "Máy in tem nhãn — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy in tem nhãn</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 17
  },
  {
    "title": "Máy scan tài liệu",
    "slug": "may-scan-tai-lieu",
    "headline": "Máy scan tài liệu",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "green",
    "summary": "Máy scan tài liệu — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy scan tài liệu</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 18
  },
  {
    "title": "Máy scan hóa đơn",
    "slug": "may-scan-hoa-don",
    "headline": "Máy scan hóa đơn",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "navy",
    "summary": "Máy scan hóa đơn — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy scan hóa đơn</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 19
  },
  {
    "title": "Máy scan tốc độ cao",
    "slug": "may-scan-toc-do-cao",
    "headline": "Máy scan tốc độ cao",
    "categorySlug": "may-in-scan",
    "icon": "printer",
    "tone": "red",
    "summary": "Máy scan tốc độ cao — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Máy in & Scan được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Máy scan tốc độ cao</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 20
  },
  {
    "title": "Camera hội nghị",
    "slug": "camera-hoi-nghi",
    "headline": "Camera hội nghị",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "blue",
    "badge": "Bán chạy",
    "summary": "Camera hội nghị — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Camera hội nghị</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 21
  },
  {
    "title": "Webcam",
    "slug": "webcam",
    "headline": "Webcam",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "cyan",
    "badge": "Bán chạy",
    "summary": "Webcam — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Webcam</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 22
  },
  {
    "title": "Micro hội nghị",
    "slug": "micro-hoi-nghi",
    "headline": "Micro hội nghị",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "green",
    "summary": "Micro hội nghị — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Micro hội nghị</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 23
  },
  {
    "title": "Loa hội nghị",
    "slug": "loa-hoi-nghi",
    "headline": "Loa hội nghị",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "navy",
    "summary": "Loa hội nghị — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Loa hội nghị</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 24
  },
  {
    "title": "Video Bar",
    "slug": "video-bar",
    "headline": "Video Bar",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "red",
    "summary": "Video Bar — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Video Bar</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 25
  },
  {
    "title": "Zoom Room System",
    "slug": "zoom-room-system",
    "headline": "Zoom Room System",
    "categorySlug": "hop-truc-tuyen",
    "icon": "zoom",
    "tone": "blue",
    "summary": "Zoom Room System — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Zoom Room System</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [
      "zoom"
    ],
    "order": 26
  },
  {
    "title": "Microsoft Teams Room",
    "slug": "microsoft-teams-room",
    "headline": "Microsoft Teams Room",
    "categorySlug": "hop-truc-tuyen",
    "icon": "microsoft",
    "tone": "cyan",
    "summary": "Microsoft Teams Room — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Microsoft Teams Room</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 27
  },
  {
    "title": "IP Phone",
    "slug": "ip-phone",
    "headline": "IP Phone",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "green",
    "summary": "IP Phone — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>IP Phone</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 28
  },
  {
    "title": "Headset USB",
    "slug": "headset-usb",
    "headline": "Headset USB",
    "categorySlug": "hop-truc-tuyen",
    "icon": "video",
    "tone": "navy",
    "summary": "Headset USB — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Headset USB</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 29
  },
  {
    "title": "Router",
    "slug": "router",
    "headline": "Router",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "red",
    "badge": "Bán chạy",
    "summary": "Router — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Router</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 30
  },
  {
    "title": "Switch Layer 2",
    "slug": "switch-layer-2",
    "headline": "Switch Layer 2",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "blue",
    "badge": "Bán chạy",
    "summary": "Switch Layer 2 — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Switch Layer 2</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 31
  },
  {
    "title": "Switch Layer 3",
    "slug": "switch-layer-3",
    "headline": "Switch Layer 3",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "cyan",
    "summary": "Switch Layer 3 — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Switch Layer 3</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 32
  },
  {
    "title": "PoE Switch",
    "slug": "poe-switch",
    "headline": "PoE Switch",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "green",
    "summary": "PoE Switch — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>PoE Switch</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 33
  },
  {
    "title": "Access Point WiFi",
    "slug": "access-point-wifi",
    "headline": "Access Point WiFi",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "navy",
    "summary": "Access Point WiFi — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Access Point WiFi</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 34
  },
  {
    "title": "Gateway",
    "slug": "gateway",
    "headline": "Gateway",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "red",
    "summary": "Gateway — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Gateway</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 35
  },
  {
    "title": "SFP Module",
    "slug": "sfp-module",
    "headline": "SFP Module",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "blue",
    "summary": "SFP Module — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>SFP Module</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 36
  },
  {
    "title": "Media Converter",
    "slug": "media-converter",
    "headline": "Media Converter",
    "categorySlug": "thiet-bi-mang",
    "icon": "server",
    "tone": "cyan",
    "summary": "Media Converter — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Thiết bị mạng được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Media Converter</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 37
  },
  {
    "title": "NAS",
    "slug": "nas",
    "headline": "NAS",
    "categorySlug": "luu-tru",
    "icon": "backup",
    "tone": "green",
    "badge": "Bán chạy",
    "summary": "NAS — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Lưu trữ được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>NAS</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 38
  },
  {
    "title": "SAN",
    "slug": "san",
    "headline": "SAN",
    "categorySlug": "luu-tru",
    "icon": "backup",
    "tone": "navy",
    "badge": "Bán chạy",
    "summary": "SAN — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Lưu trữ được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>SAN</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 39
  },
  {
    "title": "DAS",
    "slug": "das",
    "headline": "DAS",
    "categorySlug": "luu-tru",
    "icon": "backup",
    "tone": "red",
    "summary": "DAS — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Lưu trữ được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>DAS</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 40
  },
  {
    "title": "Ổ cứng HDD Enterprise",
    "slug": "o-cung-hdd-enterprise",
    "headline": "Ổ cứng HDD Enterprise",
    "categorySlug": "luu-tru",
    "icon": "backup",
    "tone": "blue",
    "summary": "Ổ cứng HDD Enterprise — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Lưu trữ được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Ổ cứng HDD Enterprise</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 41
  },
  {
    "title": "Ổ cứng SSD Enterprise",
    "slug": "o-cung-ssd-enterprise",
    "headline": "Ổ cứng SSD Enterprise",
    "categorySlug": "luu-tru",
    "icon": "backup",
    "tone": "cyan",
    "summary": "Ổ cứng SSD Enterprise — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Lưu trữ được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Ổ cứng SSD Enterprise</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 42
  },
  {
    "title": "Backup Appliance",
    "slug": "backup-appliance",
    "headline": "Backup Appliance",
    "categorySlug": "luu-tru",
    "icon": "backup",
    "tone": "green",
    "summary": "Backup Appliance — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Lưu trữ được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Backup Appliance</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 43
  },
  {
    "title": "Firewall",
    "slug": "firewall",
    "headline": "Firewall",
    "categorySlug": "bao-mat",
    "icon": "shield",
    "tone": "navy",
    "badge": "Bán chạy",
    "summary": "Firewall — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Định hướng giải pháp Sophos bảo vệ hệ thống mạng doanh nghiệp.",
      "Tích hợp IPS, Web Filtering và Application Control.",
      "Hỗ trợ SSL VPN/IPsec cho nhân viên làm việc từ xa.",
      "Quản trị tập trung, theo dõi nhật ký truy cập chi tiết.",
      "Tối ưu nhiều đường truyền Internet với SD-WAN.",
      "Hỗ trợ cấu hình và bàn giao bởi AZ Technology."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Firewall</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 44
  },
  {
    "title": "UTM Firewall",
    "slug": "utm-firewall",
    "headline": "UTM Firewall",
    "categorySlug": "bao-mat",
    "icon": "shield",
    "tone": "red",
    "badge": "Bán chạy",
    "summary": "UTM Firewall — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Định hướng giải pháp SonicWall bảo vệ hệ thống mạng doanh nghiệp.",
      "Tích hợp IPS, Web Filtering và Application Control.",
      "Hỗ trợ SSL VPN/IPsec cho nhân viên làm việc từ xa.",
      "Quản trị tập trung, theo dõi nhật ký truy cập chi tiết.",
      "Tối ưu nhiều đường truyền Internet với SD-WAN.",
      "Hỗ trợ cấu hình và bàn giao bởi AZ Technology."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>UTM Firewall</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 45
  },
  {
    "title": "VPN Gateway",
    "slug": "vpn-gateway",
    "headline": "VPN Gateway",
    "categorySlug": "bao-mat",
    "icon": "shield",
    "tone": "blue",
    "summary": "VPN Gateway — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>VPN Gateway</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 46
  },
  {
    "title": "Secure Web Gateway",
    "slug": "secure-web-gateway",
    "headline": "Secure Web Gateway",
    "categorySlug": "bao-mat",
    "icon": "shield",
    "tone": "cyan",
    "summary": "Secure Web Gateway — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Secure Web Gateway</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 47
  },
  {
    "title": "Email Security Gateway",
    "slug": "email-security-gateway",
    "headline": "Email Security Gateway",
    "categorySlug": "bao-mat",
    "icon": "shield",
    "tone": "green",
    "summary": "Email Security Gateway — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Email Security Gateway</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 48
  },
  {
    "title": "Rack Server",
    "slug": "rack-server",
    "headline": "Rack Server",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "navy",
    "badge": "Bán chạy",
    "summary": "Rack Server — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Dell PowerEdge dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Rack Server</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 49
  },
  {
    "title": "Tower Server",
    "slug": "tower-server",
    "headline": "Tower Server",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "red",
    "badge": "Bán chạy",
    "summary": "Tower Server — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng HPE ProLiant dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Tower Server</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 50
  },
  {
    "title": "GPU Server",
    "slug": "gpu-server",
    "headline": "GPU Server",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "blue",
    "summary": "GPU Server — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Lenovo ThinkSystem dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>GPU Server</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 51
  },
  {
    "title": "Tủ Rack",
    "slug": "tu-rack",
    "headline": "Tủ Rack",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "cyan",
    "summary": "Tủ Rack — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Data Center được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Tủ Rack</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 52
  },
  {
    "title": "PDU",
    "slug": "pdu",
    "headline": "PDU",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "green",
    "summary": "PDU — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Data Center được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>PDU</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 53
  },
  {
    "title": "UPS Online",
    "slug": "ups-online",
    "headline": "UPS Online",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "navy",
    "summary": "UPS Online — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Data Center được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>UPS Online</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 54
  },
  {
    "title": "KVM Switch",
    "slug": "kvm-switch",
    "headline": "KVM Switch",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "red",
    "summary": "KVM Switch — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Data Center được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>KVM Switch</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 55
  },
  {
    "title": "Rack Accessories",
    "slug": "rack-accessories",
    "headline": "Rack Accessories",
    "categorySlug": "data-center",
    "icon": "server",
    "tone": "blue",
    "summary": "Rack Accessories — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Data Center được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>Rack Accessories</strong> được cập nhật theo từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li><li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>",
    "brandSlugs": [],
    "order": 56
  },
  {
    "title": "Microsoft 365 Business Basic",
    "slug": "microsoft-365-business-basic",
    "headline": "Microsoft 365 Business Basic",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "cyan",
    "badge": "Bán chạy",
    "summary": "Microsoft 365 Business Basic — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft 365 Business Basic</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 57
  },
  {
    "title": "Microsoft 365 Business Standard",
    "slug": "microsoft-365-business-standard",
    "headline": "Microsoft 365 Business Standard",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "green",
    "badge": "Bán chạy",
    "summary": "Microsoft 365 Business Standard — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft 365 Business Standard</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 58
  },
  {
    "title": "Microsoft 365 Apps",
    "slug": "microsoft-365-apps",
    "headline": "Microsoft 365 Apps",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "navy",
    "summary": "Microsoft 365 Apps — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft 365 Apps</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 59
  },
  {
    "title": "Windows 11 Pro",
    "slug": "windows-11-pro",
    "headline": "Windows 11 Pro",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "red",
    "summary": "Windows 11 Pro — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Windows 11 Pro</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 60
  },
  {
    "title": "Windows 11 Enterprise",
    "slug": "windows-11-enterprise",
    "headline": "Windows 11 Enterprise",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "blue",
    "summary": "Windows 11 Enterprise — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Windows 11 Enterprise</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 61
  },
  {
    "title": "Windows 365",
    "slug": "windows-365",
    "headline": "Windows 365",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "cyan",
    "summary": "Windows 365 — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Windows 365</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 62
  },
  {
    "title": "Azure",
    "slug": "azure",
    "headline": "Azure",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "green",
    "summary": "Azure — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Azure</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 63
  },
  {
    "title": "Windows Server Standard",
    "slug": "windows-server-standard",
    "headline": "Windows Server Standard",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "navy",
    "summary": "Windows Server Standard — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Dell PowerEdge dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Windows Server Standard</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 64
  },
  {
    "title": "Windows Server Datacenter",
    "slug": "windows-server-datacenter",
    "headline": "Windows Server Datacenter",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "red",
    "summary": "Windows Server Datacenter — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng HPE ProLiant dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Windows Server Datacenter</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 65
  },
  {
    "title": "SQL Server Standard",
    "slug": "sql-server-standard",
    "headline": "SQL Server Standard",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "blue",
    "summary": "SQL Server Standard — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Lenovo ThinkSystem dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>SQL Server Standard</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 66
  },
  {
    "title": "SQL Server Enterprise",
    "slug": "sql-server-enterprise",
    "headline": "SQL Server Enterprise",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "cyan",
    "summary": "SQL Server Enterprise — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Đề xuất nền tảng Dell PowerEdge dành cho hệ thống doanh nghiệp.",
      "Hỗ trợ CPU Xeon hiệu năng cao cho ứng dụng ảo hóa và cơ sở dữ liệu.",
      "RAID phần cứng giúp bảo vệ dữ liệu quan trọng.",
      "Khả năng mở rộng RAM và lưu trữ linh hoạt theo tăng trưởng doanh nghiệp.",
      "Tương thích VMware, Hyper-V và Proxmox.",
      "AZ Technology hỗ trợ triển khai, di trú và bảo trì định kỳ."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>SQL Server Enterprise</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 67
  },
  {
    "title": "SharePoint Online",
    "slug": "sharepoint-online",
    "headline": "SharePoint Online",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "green",
    "summary": "SharePoint Online — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>SharePoint Online</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 68
  },
  {
    "title": "Power BI Pro",
    "slug": "power-bi-pro",
    "headline": "Power BI Pro",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "navy",
    "summary": "Power BI Pro — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Power BI Pro</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 69
  },
  {
    "title": "Microsoft Defender for Business",
    "slug": "microsoft-defender-for-business",
    "headline": "Microsoft Defender for Business",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "red",
    "summary": "Microsoft Defender for Business — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft Defender for Business</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 70
  },
  {
    "title": "Microsoft Intune",
    "slug": "microsoft-intune",
    "headline": "Microsoft Intune",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "blue",
    "summary": "Microsoft Intune — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft Intune</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 71
  },
  {
    "title": "Microsoft Entra ID",
    "slug": "microsoft-entra-id",
    "headline": "Microsoft Entra ID",
    "categorySlug": "microsoft",
    "icon": "microsoft",
    "tone": "cyan",
    "summary": "Microsoft Entra ID — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Microsoft được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft Entra ID</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 72
  },
  {
    "title": "Adobe Acrobat Standard",
    "slug": "adobe-acrobat-standard",
    "headline": "Adobe Acrobat Standard",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "green",
    "badge": "Bán chạy",
    "summary": "Adobe Acrobat Standard — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe Acrobat Standard</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 73
  },
  {
    "title": "Adobe Acrobat Pro",
    "slug": "adobe-acrobat-pro",
    "headline": "Adobe Acrobat Pro",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "navy",
    "badge": "Bán chạy",
    "summary": "Adobe Acrobat Pro — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe Acrobat Pro</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 74
  },
  {
    "title": "Adobe Photoshop",
    "slug": "adobe-photoshop",
    "headline": "Adobe Photoshop",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "red",
    "summary": "Adobe Photoshop — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe Photoshop</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 75
  },
  {
    "title": "Adobe Illustrator",
    "slug": "adobe-illustrator",
    "headline": "Adobe Illustrator",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "blue",
    "summary": "Adobe Illustrator — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe Illustrator</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 76
  },
  {
    "title": "Adobe Premiere Pro",
    "slug": "adobe-premiere-pro",
    "headline": "Adobe Premiere Pro",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "cyan",
    "summary": "Adobe Premiere Pro — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe Premiere Pro</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 77
  },
  {
    "title": "Adobe After Effects",
    "slug": "adobe-after-effects",
    "headline": "Adobe After Effects",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "green",
    "summary": "Adobe After Effects — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe After Effects</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 78
  },
  {
    "title": "Adobe Creative Cloud",
    "slug": "adobe-creative-cloud",
    "headline": "Adobe Creative Cloud",
    "categorySlug": "adobe",
    "icon": "adobe",
    "tone": "navy",
    "summary": "Adobe Creative Cloud — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Adobe được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Adobe Creative Cloud</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "adobe"
    ],
    "order": 79
  },
  {
    "title": "AutoCAD",
    "slug": "autocad",
    "headline": "AutoCAD",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "red",
    "badge": "Bán chạy",
    "summary": "AutoCAD — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>AutoCAD</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "autodesk"
    ],
    "order": 80
  },
  {
    "title": "AutoCAD LT",
    "slug": "autocad-lt",
    "headline": "AutoCAD LT",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "blue",
    "badge": "Bán chạy",
    "summary": "AutoCAD LT — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>AutoCAD LT</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "autodesk"
    ],
    "order": 81
  },
  {
    "title": "Autodesk AEC Collection",
    "slug": "autodesk-aec-collection",
    "headline": "Autodesk AEC Collection",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "cyan",
    "summary": "Autodesk AEC Collection — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Autodesk AEC Collection</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "autodesk"
    ],
    "order": 82
  },
  {
    "title": "Autodesk BIM Collaborate",
    "slug": "autodesk-bim-collaborate",
    "headline": "Autodesk BIM Collaborate",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "green",
    "summary": "Autodesk BIM Collaborate — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Autodesk BIM Collaborate</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "autodesk"
    ],
    "order": 83
  },
  {
    "title": "Revit",
    "slug": "revit",
    "headline": "Revit",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "navy",
    "summary": "Revit — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Revit</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "autodesk"
    ],
    "order": 84
  },
  {
    "title": "3ds Max",
    "slug": "3ds-max",
    "headline": "3ds Max",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "red",
    "summary": "3ds Max — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>3ds Max</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "autodesk"
    ],
    "order": 85
  },
  {
    "title": "SketchUp Pro",
    "slug": "sketchup-pro",
    "headline": "SketchUp Pro",
    "categorySlug": "autodesk-thiet-ke",
    "icon": "autodesk",
    "tone": "blue",
    "summary": "SketchUp Pro — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Autodesk & Thiết kế được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>SketchUp Pro</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "sketchup"
    ],
    "order": 86
  },
  {
    "title": "Zoom Pro",
    "slug": "zoom-pro",
    "headline": "Zoom Pro",
    "categorySlug": "hop-truc-tuyen-pm",
    "icon": "zoom",
    "tone": "cyan",
    "badge": "Bán chạy",
    "summary": "Zoom Pro — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Zoom Pro</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "zoom"
    ],
    "order": 87
  },
  {
    "title": "Zoom Business",
    "slug": "zoom-business",
    "headline": "Zoom Business",
    "categorySlug": "hop-truc-tuyen-pm",
    "icon": "zoom",
    "tone": "green",
    "badge": "Bán chạy",
    "summary": "Zoom Business — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Zoom Business</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "zoom"
    ],
    "order": 88
  },
  {
    "title": "Zoom Enterprise",
    "slug": "zoom-enterprise",
    "headline": "Zoom Enterprise",
    "categorySlug": "hop-truc-tuyen-pm",
    "icon": "zoom",
    "tone": "navy",
    "summary": "Zoom Enterprise — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Zoom Enterprise</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "zoom"
    ],
    "order": 89
  },
  {
    "title": "Microsoft Teams",
    "slug": "microsoft-teams",
    "headline": "Microsoft Teams",
    "categorySlug": "hop-truc-tuyen-pm",
    "icon": "microsoft",
    "tone": "red",
    "summary": "Microsoft Teams — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Microsoft Teams</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft"
    ],
    "order": 90
  },
  {
    "title": "Google Meet",
    "slug": "google-meet-2",
    "headline": "Google Meet",
    "categorySlug": "hop-truc-tuyen-pm",
    "icon": "video",
    "tone": "blue",
    "summary": "Google Meet — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Họp trực tuyến được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Google Meet</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [],
    "order": 91
  },
  {
    "title": "Kaspersky Standard",
    "slug": "kaspersky-standard",
    "headline": "Kaspersky Standard",
    "categorySlug": "bao-mat-pm",
    "icon": "kaspersky",
    "tone": "cyan",
    "badge": "Bán chạy",
    "summary": "Kaspersky Standard — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Kaspersky Standard</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "kaspersky"
    ],
    "order": 92
  },
  {
    "title": "Kaspersky Plus",
    "slug": "kaspersky-plus",
    "headline": "Kaspersky Plus",
    "categorySlug": "bao-mat-pm",
    "icon": "kaspersky",
    "tone": "green",
    "badge": "Bán chạy",
    "summary": "Kaspersky Plus — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Kaspersky Plus</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "kaspersky"
    ],
    "order": 93
  },
  {
    "title": "Kaspersky Endpoint Security",
    "slug": "kaspersky-endpoint-security",
    "headline": "Kaspersky Endpoint Security",
    "categorySlug": "bao-mat-pm",
    "icon": "kaspersky",
    "tone": "navy",
    "summary": "Kaspersky Endpoint Security — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Kaspersky Endpoint Security</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "kaspersky"
    ],
    "order": 94
  },
  {
    "title": "ESET Protect",
    "slug": "eset-protect",
    "headline": "ESET Protect",
    "categorySlug": "bao-mat-pm",
    "icon": "eset",
    "tone": "red",
    "summary": "ESET Protect — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>ESET Protect</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "eset"
    ],
    "order": 95
  },
  {
    "title": "Bitdefender GravityZone",
    "slug": "bitdefender-gravityzone",
    "headline": "Bitdefender GravityZone",
    "categorySlug": "bao-mat-pm",
    "icon": "microsoft",
    "tone": "blue",
    "summary": "Bitdefender GravityZone — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Bitdefender GravityZone</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "microsoft",
      "bitdefender"
    ],
    "order": 96
  },
  {
    "title": "Trend Micro Apex One",
    "slug": "trend-micro-apex-one",
    "headline": "Trend Micro Apex One",
    "categorySlug": "bao-mat-pm",
    "icon": "shield",
    "tone": "cyan",
    "summary": "Trend Micro Apex One — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Trend Micro Apex One</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "trend-micro"
    ],
    "order": 97
  },
  {
    "title": "FortiClient EMS",
    "slug": "forticlient-ems",
    "headline": "FortiClient EMS",
    "categorySlug": "bao-mat-pm",
    "icon": "shield",
    "tone": "green",
    "summary": "FortiClient EMS — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>FortiClient EMS</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "fortinet"
    ],
    "order": 98
  },
  {
    "title": "BKAV Endpoint",
    "slug": "bkav-endpoint",
    "headline": "BKAV Endpoint",
    "categorySlug": "bao-mat-pm",
    "icon": "shield",
    "tone": "navy",
    "summary": "BKAV Endpoint — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Bảo mật được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>BKAV Endpoint</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "bkav"
    ],
    "order": 99
  },
  {
    "title": "Veeam Backup & Replication",
    "slug": "veeam-backup-replication",
    "headline": "Veeam Backup & Replication",
    "categorySlug": "backup-monitoring",
    "icon": "veeam",
    "tone": "red",
    "badge": "Bán chạy",
    "summary": "Veeam Backup & Replication — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology.",
    "highlights": [
      "Giải pháp thuộc nhóm Backup & Monitoring được lựa chọn cho doanh nghiệp hiện đại.",
      "Thiết kế hướng đến tính ổn định và khả năng mở rộng lâu dài.",
      "Tương thích tốt với hạ tầng CNTT đang vận hành.",
      "Chính hãng, nguồn gốc rõ ràng và bảo hành theo tiêu chuẩn nhà sản xuất.",
      "Đội ngũ AZ Technology hỗ trợ khảo sát, tư vấn và triển khai.",
      "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp."
    ],
    "description": "<h3>Cam kết từ AZ Technology</h3><ul><li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li><li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li><li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul><p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email <strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>",
    "specs": "<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li><li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li><li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul><h3>Cấp phép</h3><p><strong>Veeam Backup &amp; Replication</strong> được cấp phép theo người dùng/năm. Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>",
    "brandSlugs": [
      "veeam"
    ],
    "order": 100
  }
];
export const HOME_SECTIONS: SeedHomeSection[] = [
  {
    "title": "SẢN PHẨM NỔI BẬT",
    "order": 1,
    "subsections": [
      {
        "title": "Phần mềm",
        "parentCategorySlug": "phan-mem",
        "productSlugs": [
          "microsoft-365-business-basic",
          "microsoft-365-business-standard",
          "microsoft-365-apps",
          "windows-11-pro",
          "windows-11-enterprise",
          "windows-365",
          "azure",
          "windows-server-standard",
          "windows-server-datacenter",
          "sql-server-standard",
          "sql-server-enterprise",
          "sharepoint-online"
        ]
      },
      {
        "title": "Phần cứng",
        "parentCategorySlug": "phan-cung",
        "productSlugs": [
          "dell-pc-van-phong-chinh-hang",
          "mini-pc-chinh-hang",
          "laptop-doanh-nghiep",
          "laptop-do-hoa",
          "workstation-mobile",
          "workstation-tower",
          "man-hinh-van-phong",
          "man-hinh-do-hoa",
          "man-hinh-cong",
          "man-hinh-tuong-tac-2",
          "tv-doanh-nghiep",
          "may-chieu"
        ]
      }
    ]
  },
  {
    "title": "GIẢI PHÁP DOANH NGHIỆP",
    "order": 2,
    "parentCategorySlug": "giai-phap",
    "productSlugs": [
      "tu-van-thiet-ke-trien-khai-ha-tang-mang-lan-wan",
      "thiet-ke-thi-cong-trung-tam-du-lieu-data-center",
      "bao-mat-mang-may-tinh-internet",
      "he-tang-may-chu-ao-hoa",
      "he-thong-may-chu-domain-dns-dhcp-file-web-mail-database-server",
      "luu-tru-backup-du-lieu",
      "phan-quyen-bao-mat-du-lieu",
      "he-thong-tong-dai-ip-phone",
      "chong-that-thoat-du-lieu-dlp",
      "bao-mat-he-thong",
      "bao-ve-du-lieu",
      "bao-mat-trong-moi-truong-ao-hoa",
      "quan-ly-truy-cap-mang",
      "phan-mem-backup",
      "luu-tru-tren-thiet-bi-chuyen-dung-san-nas-tape",
      "luu-tru-du-lieu-tren-cloud",
      "man-hinh-tuong-tac",
      "microsoft-teams-rooms",
      "zoom-rooms",
      "google-meet",
      "giai-phap-danh-cho-giao-duc",
      "camera-giam-sat-an-ninh",
      "thiet-bi-kiem-soat-ra-vao-van-phong-toa-nha",
      "microsoft-365-email-office-teams-onedrive-power-bi-sharepoint",
      "windows-365-cloud-pc-business-enterprise",
      "microsoft-ems-azure-ad-premium-intune-azure-rights-management-ata-dlp",
      "azure-saas-iaas-paas",
      "email-tu-nen-tang-khac-microsoft-365",
      "server-on-premise-server-on-cloud",
      "database-on-premise-database-on-cloud",
      "data-on-local-data-on-cloud"
    ]
  },
  {
    "title": "DỊCH VỤ IT",
    "order": 3,
    "parentCategorySlug": "dich-vu-it",
    "productSlugs": [
      "ho-tro-tu-xa-tai-van-phong-khach-hang",
      "bao-tri-thiet-bi-it",
      "di-doi-thiet-bi",
      "bao-hanh-mo-rong",
      "giam-sat-he-thong",
      "quan-tri-uy-quyen",
      "su-dung-microsoft-365-cho-nguoi-dung-van-phong",
      "quan-tri-he-thong-microsoft-365",
      "quan-tri-he-thong-azure"
    ]
  }
];
export const HEROES = [
  {
    "title": "Hạ tầng số vững chắc",
    "ctaLabel": "Xem giải pháp Data Center",
    "ctaHref": "/danh-muc/giai-phap",
    "order": 1,
    "active": true
  },
  {
    "title": "Bản quyền phần mềm",
    "ctaLabel": "Xem danh mục phần mềm",
    "ctaHref": "/danh-muc/phan-mem",
    "order": 2,
    "active": true
  },
  {
    "title": "Vận hành IT",
    "ctaLabel": "Khám phá dịch vụ IT",
    "ctaHref": "/danh-muc/dich-vu-it",
    "order": 3,
    "active": true
  }
];
export const SETTINGS = {
  "company": "AZ IT Solutions & Services",
  "shortName": "AZ Technology",
  "slogan": "Software · Hardware · Cloud Services",
  "hotline": "0703 594 402",
  "email": "nhu.trang@az-technology.vn",
  "address": "1/46/28 Đặng Thùy Trâm, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh, Việt Nam",
  "zaloUrl": "https://zalo.me/0703594402",
  "mapUrl": "https://maps.google.com/?q=AZ+Technology+Ho+Chi+Minh"
};

export { slugify };
