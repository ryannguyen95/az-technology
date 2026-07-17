/* AZ Technology — site data (catalog, nav, products) */
(function () {
  // ---- Top-bar / company ----
  const company = {
    name: 'AZ IT Solutions & Services',
    short: 'AZ Technology',
    slogan: 'Software · Hardware · Cloud Services',
    contact: 'Trang Quỳnh Như',
    phone: '0703 594 402',
    phoneRaw: '0703594402',
    email: 'nhu.trang@az-technology.vn',
    address: '1/46/28 Đặng Thùy Trâm, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh, Việt Nam',
  };

  // ---- Mega-menu (PACISOFT-style: cấp 1 ngang, dropdown nhiều cột) ----
  const nav = [
    {
      key: 'phan-mem', label: 'PHẦN MỀM', href: 'category.html?cat=phan-mem',
      columns: [
        { heading: 'Microsoft', items: ['Microsoft 365', 'Windows 365', 'Windows', 'Office', 'Azure', 'Windows Server', 'SQL Server', 'Exchange'] },
        { heading: 'Họp trực tuyến', items: ['Zoom Pro', 'Zoom Business', 'Zoom Enterprise', 'Microsoft Teams', 'Google Meet'] },
        { heading: 'Đồ họa & Thiết kế', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Acrobat', 'Adobe Sign', 'AutoDesk', 'SketchUp'] },
        { heading: 'Bảo mật / Diệt virus', items: ['Kaspersky', 'Symantec', 'McAfee', 'Bitdefender', 'BKAV', 'ESET'] },
        { heading: 'Backup & Giám sát', items: ['Veeam', 'Veritas', 'PRTG', 'Solarwinds'] },
        { heading: 'Khác', items: ['Oracle', 'Minitab', 'TeamViewer', 'VMware'] },
      ],
      featured: { tag: 'Bán chạy', title: 'Microsoft 365 Business', desc: 'Bộ ứng dụng văn phòng + email doanh nghiệp, bản quyền chính hãng.', href: 'product-m365.html' },
    },
    {
      key: 'phan-cung', label: 'PHẦN CỨNG', href: 'category.html?cat=phan-cung',
      columns: [
        { heading: 'Thiết bị văn phòng', items: ['PC / Mini PC', 'Laptop / Workstation', 'Màn hình & Màn hình tương tác', 'Máy chiếu', 'Máy in / Máy Scan', 'Máy scan hóa đơn–chứng từ', 'Thiết bị họp trực tuyến', 'Thiết bị Call Center'] },
        { heading: 'Data Center', items: ['Máy chủ vật lý', 'Thiết bị mạng', 'Thiết bị lưu trữ', 'Thiết bị tường lửa', 'UPS – lưu trữ điện', 'Tủ Rack & phụ kiện'] },
        { heading: 'An ninh', items: ['Camera giám sát', 'Kiểm soát ra vào (Access Control)'] },
        { heading: 'Hãng cung cấp', items: ['Cisco', 'Aruba', 'Dell', 'HP', 'IBM', 'Lenovo', 'Apple', 'Epson', 'Canon', 'Logitech'] },
      ],
      featured: { tag: 'Doanh nghiệp', title: 'Laptop & Workstation', desc: 'Cấu hình mạnh cho văn phòng, kỹ thuật và đồ họa.', href: 'product-laptop.html' },
    },
    {
      key: 'dich-vu', label: 'DỊCH VỤ IT', href: 'category.html?cat=dich-vu',
      columns: [
        { heading: 'Dịch vụ IT cơ bản', items: ['Hỗ trợ từ xa / tại văn phòng', 'Bảo trì thiết bị IT', 'Di dời thiết bị', 'Bảo hành mở rộng', 'Giám sát hệ thống', 'Quản trị ủy quyền'] },
        { heading: 'Cloud / Data Center', items: ['Thuê hạ tầng Data Center trên Cloud'] },
        { heading: 'Dịch vụ Migrate', items: ['Email → Microsoft 365', 'Server on-premise → Cloud', 'Database on-premise → Cloud', 'Data on local → Cloud'] },
        { heading: 'Đào tạo IT', items: ['Microsoft 365 cho người dùng', 'Quản trị hệ thống Microsoft 365', 'Quản trị hệ thống Azure'] },
      ],
      featured: { tag: 'Quy trình', title: 'Dịch vụ Migrate lên Cloud', desc: 'Tư vấn → Triển khai → Lắp đặt → Hỗ trợ sau bán hàng.', href: 'product-migrate.html' },
    },
    {
      key: 'giai-phap', label: 'GIẢI PHÁP', href: 'category.html?cat=giai-phap',
      columns: [
        { heading: 'Hạ tầng Data Center', items: ['Thiết kế mạng LAN/WAN', 'Thi công Data Center', 'Máy chủ & ảo hóa', 'Hệ thống server (DNS, DHCP, Mail…)', 'Lưu trữ – Backup', 'Tổng đài IP Phone'] },
        { heading: 'Bảo mật & ATTT', items: ['Chống thất thoát dữ liệu (DLP)', 'Bảo mật hệ thống', 'Bảo vệ dữ liệu', 'Bảo mật môi trường ảo hóa', 'Quản lý truy cập mạng'] },
        { heading: 'Lưu trữ & Backup', items: ['Phần mềm backup', 'Thiết bị SAN / NAS / TAPE', 'Backup trên Cloud'] },
        { heading: 'Phòng họp trực tuyến', items: ['Màn hình tương tác', 'Microsoft Teams Rooms', 'Zoom Rooms', 'Google Meet', 'Giải pháp cho giáo dục'] },
        { heading: 'An ninh & Microsoft', items: ['Camera giám sát (CCTV)', 'Kiểm soát ra vào', 'Microsoft 365 / Windows 365', 'Microsoft EMS', 'Azure (SaaS/IaaS/PaaS)'] },
      ],
      featured: { tag: 'Tiêu biểu', title: 'Hạ tầng Data Center', desc: 'Tư vấn – thiết kế – triển khai trọn gói cho doanh nghiệp.', href: 'product-datacenter.html' },
    },
    { key: 've-az', label: 'VỀ AZ', href: 'about.html' },
    { key: 'doi-tac', label: 'ĐỐI TÁC', href: 'about.html#partners' },
    { key: 'lien-he', label: 'LIÊN HỆ', href: 'contact.html' },
  ];

  // ---- Partner / brand wordmarks ----
  const partners = ['Microsoft', 'Adobe', 'Cisco', 'Dell', 'HP', 'Lenovo', 'VMware', 'Veeam', 'Kaspersky', 'Symantec', 'Aruba', 'IBM', 'Apple', 'Epson', 'Canon', 'Logitech', 'Oracle', 'ESET', 'Bitdefender', 'PRTG'];

  // ---- Home category tiles ----
  const categoryTiles = [
    { label: 'Phần mềm', icon: 'code', href: 'category.html?cat=phan-mem' },
    { label: 'Phần cứng', icon: 'cpu', href: 'category.html?cat=phan-cung' },
    { label: 'Data Center', icon: 'server', href: 'product-datacenter.html' },
    { label: 'Dịch vụ IT', icon: 'wrench', href: 'category.html?cat=dich-vu' },
    { label: 'Giải pháp', icon: 'layers', href: 'category.html?cat=giai-phap' },
    { label: 'Bảo mật', icon: 'shield', href: 'category.html?cat=giai-phap' },
    { label: 'Cloud', icon: 'cloud', href: 'product-migrate.html' },
    { label: 'An ninh', icon: 'camera', href: 'category.html?cat=giai-phap' },
    { label: 'Đào tạo', icon: 'cap', href: 'category.html?cat=dich-vu' },
    { label: 'Họp trực tuyến', icon: 'video', href: 'category.html?cat=phan-mem' },
  ];

  // ---- Why AZ commitments ----
  const whyAZ = [
    { icon: 'badge', title: 'Bản quyền chính hãng 100%', desc: 'Cam kết phần mềm & thiết bị nguồn gốc rõ ràng, đầy đủ giấy tờ.' },
    { icon: 'receipt', title: 'Xuất hóa đơn VAT', desc: 'Hóa đơn điện tử hợp lệ cho mọi đơn hàng doanh nghiệp.' },
    { icon: 'truck', title: 'Triển khai nhanh toàn quốc', desc: 'Đội ngũ kỹ thuật hỗ trợ tận nơi trên khắp Việt Nam.' },
    { icon: 'headset', title: 'Hỗ trợ kỹ thuật lâu dài', desc: 'Đồng hành cùng doanh nghiệp suốt vòng đời sản phẩm.' },
  ];

  // ---- Helper to build product objects ----
  const P = (o) => Object.assign({ type: 'software', brand: '', tone: 'blue' }, o);

  // image tones map to gradient classes used by placeholder
  const products = {
    featured: [
      P({ id: 'm365-basic', name: 'Microsoft 365 Business Basic', cat: 'Cloud · Microsoft', brand: 'Microsoft', badge: 'Bán chạy', tone: 'blue', href: 'product-m365.html', icon: 'm365' }),
      P({ id: 'm365-standard', name: 'Microsoft 365 Business Standard', cat: 'Cloud · Microsoft', brand: 'Microsoft', tone: 'blue', href: 'product-m365.html', icon: 'm365' }),
      P({ id: 'zoom-pro', name: 'Zoom Workplace Pro (1 năm)', cat: 'Họp trực tuyến · Zoom', brand: 'Zoom', badge: 'Ưu đãi', tone: 'cyan', href: 'product-m365.html', icon: 'video' }),
      P({ id: 'kaspersky', name: 'Kaspersky Endpoint Security', cat: 'Bảo mật · Kaspersky', brand: 'Kaspersky', tone: 'green', href: 'product-m365.html', icon: 'shield' }),
      P({ id: 'adobe-cc', name: 'Adobe Creative Cloud All Apps', cat: 'Đồ họa · Adobe', brand: 'Adobe', badge: 'Doanh nghiệp', tone: 'red', href: 'product-m365.html', icon: 'design' }),
    ],
    software: [
      P({ id: 'win11-pro', name: 'Windows 11 Pro (bản quyền)', cat: 'Hệ điều hành · Microsoft', brand: 'Microsoft', tone: 'blue', href: 'product-m365.html', icon: 'windows' }),
      P({ id: 'win-server', name: 'Windows Server 2022 Standard', cat: 'Server · Microsoft', brand: 'Microsoft', tone: 'navy', href: 'product-m365.html', icon: 'server' }),
      P({ id: 'veeam-bk', name: 'Veeam Backup & Replication', cat: 'Backup · Veeam', brand: 'Veeam', tone: 'green', href: 'product-m365.html', icon: 'backup' }),
      P({ id: 'eset', name: 'ESET PROTECT Entry', cat: 'Bảo mật · ESET', brand: 'ESET', tone: 'cyan', href: 'product-m365.html', icon: 'shield' }),
    ],
    solutions: [
      P({ id: 'sol-dc', type: 'solution', name: 'Giải pháp Hạ tầng Data Center', cat: 'Giải pháp · Hạ tầng', badge: 'Tiêu biểu', tone: 'navy', href: 'product-datacenter.html', icon: 'server' }),
      P({ id: 'sol-sec', type: 'solution', name: 'Bảo mật & An toàn thông tin (DLP)', cat: 'Giải pháp · Bảo mật', tone: 'blue', href: 'product-datacenter.html', icon: 'shield' }),
      P({ id: 'sol-backup', type: 'solution', name: 'Lưu trữ & Backup (SAN/NAS/TAPE)', cat: 'Giải pháp · Lưu trữ', tone: 'green', href: 'product-datacenter.html', icon: 'backup' }),
      P({ id: 'sol-room', type: 'solution', name: 'Phòng họp trực tuyến (Teams/Zoom Rooms)', cat: 'Giải pháp · Phòng họp', tone: 'cyan', href: 'product-datacenter.html', icon: 'video' }),
    ],
    services: [
      P({ id: 'svc-migrate', type: 'service', name: 'Dịch vụ Migrate lên Cloud / M365', cat: 'Dịch vụ · Migrate', badge: 'Phổ biến', tone: 'cyan', href: 'product-migrate.html', icon: 'cloud' }),
      P({ id: 'svc-maintain', type: 'service', name: 'Bảo trì & Hỗ trợ IT định kỳ', cat: 'Dịch vụ · IT cơ bản', tone: 'blue', href: 'product-migrate.html', icon: 'wrench' }),
      P({ id: 'svc-monitor', type: 'service', name: 'Giám sát hệ thống 24/7', cat: 'Dịch vụ · Giám sát', tone: 'navy', href: 'product-migrate.html', icon: 'monitor' }),
      P({ id: 'svc-train', type: 'service', name: 'Đào tạo quản trị Microsoft 365 & Azure', cat: 'Dịch vụ · Đào tạo', tone: 'green', href: 'product-migrate.html', icon: 'cap' }),
    ],
    hardware: [
      P({ id: 'hw-ws', type: 'hardware', name: 'Workstation Đồ họa AZ Pro Z6', cat: 'Workstation · Dell', brand: 'Dell', badge: 'Hiệu năng cao', tone: 'navy', href: 'product-laptop.html', icon: 'cpu' }),
      P({ id: 'hw-lt', type: 'hardware', name: 'Laptop Doanh nghiệp Lenovo ThinkPad', cat: 'Laptop · Lenovo', brand: 'Lenovo', tone: 'blue', href: 'product-laptop.html', icon: 'laptop' }),
      P({ id: 'hw-mon', type: 'hardware', name: 'Màn hình tương tác 65" 4K', cat: 'Màn hình · Văn phòng', tone: 'cyan', href: 'product-laptop.html', icon: 'monitor' }),
      P({ id: 'hw-print', type: 'hardware', name: 'Máy in Laser Đa năng Canon', cat: 'Máy in · Canon', brand: 'Canon', tone: 'green', href: 'product-laptop.html', icon: 'printer' }),
      P({ id: 'hw-server', type: 'hardware', name: 'Máy chủ Rack Dell PowerEdge R760', cat: 'Server · Dell', brand: 'Dell', tone: 'navy', href: 'product-laptop.html', icon: 'server' }),
      P({ id: 'hw-ups', type: 'hardware', name: 'Bộ lưu điện UPS 3kVA Online', cat: 'UPS · Data Center', tone: 'blue', href: 'product-laptop.html', icon: 'battery' }),
    ],
  };

  window.AZ = { company, nav, partners, categoryTiles, whyAZ, products };
})();
