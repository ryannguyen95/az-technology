# -*- coding: utf-8 -*-
"""Generate cms/src/seed/data.ts: THREE content shapes —
Danh mục cha (parent-category), Danh mục con (category) and Sản phẩm (product).

Tree: Danh mục cha (Phần mềm / Phần cứng / Dịch vụ IT / Giải pháp)
        └─ Danh mục con (Microsoft, Máy tính, Data Center, …)
             └─ Sản phẩm

EVERY catalog item is a product — software, hardware, services and solutions are
treated identically. They just fall under a level-1 (cha) and level-2 (con)
category. So Dịch vụ IT and Giải pháp are real 2-level trees too: each solution/
service is a Danh mục con, and its individual offerings are products beneath it.
Breadcrumb is always cha › con › sản phẩm."""
import csv, json, re, unicodedata, collections

CSV = "/Users/hotrongtin/Documents/playground/az-technology/az-technology-backup/AZTechnology_Content_V2(Sheet1).csv"
OUT = "/Users/hotrongtin/Documents/playground/az-technology/az-technology-backup/az-technology/cms/src/seed/data.ts"

def slugify(s):
    s = unicodedata.normalize("NFKD", s).replace("đ", "d").replace("Đ", "d")
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"-{2,}", "-", re.sub(r"[^a-z0-9]+", "-", s).strip("-"))

TONES = ["blue", "cyan", "green", "navy", "red"]
BRANDS = ["Microsoft","Adobe","Cisco","Dell","HP","Lenovo","VMware","Veeam","Kaspersky",
  "Symantec","Aruba","IBM","Apple","Epson","Canon","Logitech","Oracle","ESET","Bitdefender",
  "PRTG","Zoom","AutoDesk","SketchUp","Veritas","SolarWinds","Minitab","TeamViewer","McAfee",
  "BKAV","Trend Micro","Fortinet"]
BRAND_KW = {
  "dell":"Dell","hp ":"HP","prodesk":"HP","lenovo":"Lenovo","apple":"Apple","macbook":"Apple",
  "microsoft":"Microsoft","windows":"Microsoft","azure":"Microsoft","sharepoint":"Microsoft",
  "power bi":"Microsoft","defender":"Microsoft","intune":"Microsoft","entra":"Microsoft",
  "sql server":"Microsoft","exchange":"Microsoft","teams":"Microsoft","office":"Microsoft",
  "adobe":"Adobe","acrobat":"Adobe","photoshop":"Adobe","illustrator":"Adobe","premiere":"Adobe",
  "after effect":"Adobe","creative cloud":"Adobe","autocad":"AutoDesk","autodesk":"AutoDesk",
  "revit":"AutoDesk","3ds max":"AutoDesk","bim":"AutoDesk","aec":"AutoDesk","sketchup":"SketchUp",
  "zoom":"Zoom","kaspersky":"Kaspersky","eset":"ESET","bitdefender":"Bitdefender",
  "trend micro":"Trend Micro","forti":"Fortinet","bkav":"BKAV","veeam":"Veeam","cisco":"Cisco",
  "aruba":"Aruba","epson":"Epson","canon":"Canon","logitech":"Logitech","ibm":"IBM","vmware":"VMware",
  "oracle":"Oracle","prtg":"PRTG","solarwinds":"SolarWinds","veritas":"Veritas","symantec":"Symantec",
  "mcafee":"McAfee","teamviewer":"TeamViewer","minitab":"Minitab",
}
CAT_DEFAULT_BRAND = {"Microsoft":"Microsoft","Adobe":"Adobe","Autodesk & Thiết kế":"AutoDesk"}
BRAND_ICON = {"Microsoft":"microsoft","Adobe":"adobe","AutoDesk":"autodesk","SketchUp":"autodesk",
  "Zoom":"zoom","Kaspersky":"kaspersky","ESET":"eset","Veeam":"veeam","PRTG":"prtg"}
CAT_ICON = {
  "Máy tính":"laptop","Màn hình & Hiển thị":"monitor","Máy in & Scan":"printer",
  "Họp trực tuyến":"video","Thiết bị mạng":"server","Lưu trữ":"backup","Bảo mật":"shield",
  "Data Center":"server","Microsoft":"microsoft","Adobe":"adobe","Autodesk & Thiết kế":"autodesk",
  "Backup & Monitoring":"backup",
}
MENU_SLUG = {"PHẦN CỨNG":"phan-cung","PHẦN MỀM":"phan-mem"}
MENU_TITLE = {"PHẦN CỨNG":"Phần cứng","PHẦN MỀM":"Phần mềm"}
MENU_ORDER = {"PHẦN MỀM":1,"PHẦN CỨNG":2}
MENU_ICON = {"PHẦN CỨNG":"cpu","PHẦN MỀM":"code"}

AZ_COMMIT = ("<h3>Cam kết từ AZ Technology</h3><ul>"
  "<li>Hàng chính hãng / bản quyền 100%, xuất hóa đơn VAT đầy đủ.</li>"
  "<li>Tư vấn giải pháp tối ưu theo đúng nhu cầu và quy mô doanh nghiệp.</li>"
  "<li>Triển khai nhanh, hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.</li></ul>")
AZ_CONTACT = ("<p>Liên hệ AZ Technology qua hotline <strong>0703 594 402</strong> hoặc email "
  "<strong>nhu.trang@az-technology.vn</strong> để được tư vấn và nhận báo giá chính xác nhất.</p>")
GENERIC_HL = [
  "Hàng chính hãng / bản quyền 100%, đầy đủ hóa đơn VAT.",
  "Tư vấn cấu hình tối ưu theo nhu cầu doanh nghiệp.",
  "Triển khai, bảo hành và hỗ trợ kỹ thuật trên toàn quốc.",
]

def esc(s): return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

def find_brands(name, cat):
    low = " " + name.lower() + " "
    found = [b for kw, b in BRAND_KW.items() if kw in low]
    found = list(dict.fromkeys(found))
    if not found and cat in CAT_DEFAULT_BRAND:
        found.append(CAT_DEFAULT_BRAND[cat])
    return found

def product_icon(brands, cat):
    for b in brands:
        if b in BRAND_ICON: return BRAND_ICON[b]
    return CAT_ICON.get(cat, "cpu")

def bullets_of(row):
    return [ln.strip().lstrip("✓").strip() for ln in row[4].splitlines() if ln.strip().startswith("✓")]

def desc_html(row):
    para = row[6].strip()
    return (("<p>%s</p>" % esc(para)) if para else "") + AZ_COMMIT + AZ_CONTACT

def specs_for(kind, name):
    n = esc(name)
    if kind == "software":
        return ("<h3>Yêu cầu hệ thống</h3><ul><li>Hệ điều hành Windows 10/11 hoặc macOS phiên bản mới.</li>"
          "<li>Kết nối Internet ổn định để kích hoạt và đồng bộ dữ liệu.</li>"
          "<li>Tài khoản email doanh nghiệp để quản lý cấp phép.</li></ul>"
          "<h3>Cấp phép</h3><p><strong>%s</strong> được cấp phép theo người dùng/năm. "
          "Liên hệ AZ Technology để được tư vấn gói phù hợp.</p>" % n)
    if kind == "service":
        return ("<h3>Phạm vi &amp; yêu cầu triển khai</h3><p>Phạm vi triển khai <strong>%s</strong> được khảo "
          "sát theo thực tế hệ thống của doanh nghiệp. AZ Technology tư vấn quy trình, nhân sự và yêu cầu hạ "
          "tầng phù hợp.</p>" % n)
    if kind == "solution":
        return ("<h3>Yêu cầu hệ thống</h3><p>Giải pháp <strong>%s</strong> được thiết kế theo hiện trạng và quy "
          "mô doanh nghiệp. Liên hệ AZ Technology để khảo sát yêu cầu hạ tầng, thiết bị và phần mềm cần "
          "thiết.</p>" % n)
    return ("<h3>Thông số kỹ thuật</h3><p>Cấu hình chi tiết của <strong>%s</strong> được cập nhật theo "
      "từng model. Liên hệ AZ Technology để nhận thông số đầy đủ và tư vấn lựa chọn phù hợp nhu cầu doanh "
      "nghiệp.</p><ul><li>Bảo hành chính hãng theo nhà sản xuất.</li>"
      "<li>Hỗ trợ lắp đặt, cấu hình và bàn giao tận nơi.</li></ul>" % n)

# Generic content for a service/solution offering product (the former bullets).
OFFERING_HL = [
  "Khảo sát hiện trạng và tư vấn giải pháp phù hợp nhu cầu doanh nghiệp.",
  "Triển khai bài bản, đúng tiến độ, hạn chế gián đoạn vận hành.",
  "Hỗ trợ kỹ thuật toàn quốc và đồng hành lâu dài.",
]
def offering_desc(kind, title, parent_title):
    word = "Dịch vụ" if kind == "service" else "Giải pháp"
    verb = ("được AZ Technology tư vấn và triển khai theo nhu cầu thực tế của doanh nghiệp."
            if kind == "service" else
            "được AZ Technology khảo sát, thiết kế và triển khai trọn gói cho doanh nghiệp.")
    return ("<p>%s <strong>%s</strong> thuộc nhóm <strong>%s</strong>, %s</p>"
            % (word, esc(title), esc(parent_title), verb)) + AZ_COMMIT + AZ_CONTACT

# ---- parse CSV ----
with open(CSV, encoding="utf-8-sig", newline="") as f:
    rows = [r for r in list(csv.reader(f))[1:] if any(c.strip() for c in r)]

parents = []      # Danh mục cha: {title, slug, icon, order, summary}
categories = []   # Danh mục con: {title, slug, parentSlug, icon, order, summary, description?}
products = []      # Sản phẩm: {title, slug, headline, categorySlug, icon, tone, badge, summary, highlights, description, specs, brandSlugs, order}
parent_slugs = set()
cat_slugs = set()
prod_slugs = set()
def uniq(slug, seen):
    base, i = slug, 2
    while slug in seen: slug = "%s-%d" % (base, i); i += 1
    seen.add(slug); return slug

# ---- Danh mục cha (parents) ----
# top-level menus from the CSV (Phần mềm, Phần cứng) + two fixed (Dịch vụ IT, Giải pháp)
menus = []
for r in rows:
    if r[0].strip() not in menus: menus.append(r[0].strip())
menu_slug = {}
for m in menus:
    s = MENU_SLUG.get(m, slugify(m)); parent_slugs.add(s); menu_slug[m] = s
    title = MENU_TITLE.get(m, m)
    parents.append({"title": title, "slug": s, "icon": MENU_ICON.get(m, "cpu"),
      "order": MENU_ORDER.get(m, 9),
      "summary": "%s chính hãng cho doanh nghiệp — tư vấn, báo giá và triển khai bởi AZ Technology." % title})
parents.append({"title": "Dịch vụ IT", "slug": "dich-vu-it", "icon": "wrench", "order": 3,
  "summary": "Dịch vụ IT, bảo trì, triển khai và đào tạo cho doanh nghiệp."})
parents.append({"title": "Giải pháp", "slug": "giai-phap", "icon": "layers", "order": 4,
  "summary": "Giải pháp hạ tầng, bảo mật, lưu trữ và phòng họp trực tuyến trọn gói."})
parent_slugs.update(["dich-vu-it", "giai-phap"])

# ---- Danh mục con under Phần mềm / Phần cứng (from the CSV) ----
sub_slug = {}
ci = 0
for r in rows:
    m, cat = r[0].strip(), r[1].strip()
    if (m, cat) in sub_slug: continue
    base = slugify(cat)
    s = base if base not in cat_slugs else "%s-%s" % (base, "pc" if m == "PHẦN CỨNG" else "pm")
    s = uniq(s, cat_slugs)
    sub_slug[(m, cat)] = s
    ci += 1
    categories.append({"title": cat, "slug": s, "parentSlug": menu_slug[m], "icon": CAT_ICON.get(cat, "cpu"),
      "order": ci, "summary": "%s chính hãng, bảo hành đầy đủ, tư vấn cấu hình theo nhu cầu doanh nghiệp." % cat})

# ---- Danh mục con under Dịch vụ IT (cons) + offering products beneath each ----
services_raw = [
  ("Dịch vụ IT cơ bản", "wrench", ["Hỗ trợ từ xa / tại văn phòng khách hàng", "Bảo trì thiết bị IT", "Di dời thiết bị", "Bảo hành mở rộng", "Giám sát hệ thống", "Quản trị ủy quyền"]),
  ("Đào tạo IT", "cap", ["Sử dụng Microsoft 365 cho người dùng văn phòng", "Quản trị hệ thống Microsoft 365", "Quản trị hệ thống Azure"]),
]
# ---- Danh mục con under Giải pháp (cons) + offering products beneath each ----
solutions_raw = [
  ("Giải pháp hạ tầng Data Center", "server", ["Tư vấn, thiết kế, triển khai hạ tầng mạng LAN, WAN", "Thiết kế, thi công trung tâm dữ liệu – Data Center", "Bảo mật mạng máy tính & Internet", "Hệ tầng máy chủ, ảo hóa", "Hệ thống máy chủ: Domain, DNS, DHCP, File, Web, Mail, Database server", "Lưu trữ, backup dữ liệu", "Phân quyền, bảo mật dữ liệu", "Hệ thống tổng đài IP Phone"]),
  ("Giải pháp bảo mật & An toàn thông tin", "shield", ["Chống thất thoát dữ liệu (DLP)", "Bảo mật hệ thống", "Bảo vệ dữ liệu", "Bảo mật trong môi trường ảo hóa", "Quản lý truy cập mạng"]),
  ("Giải pháp lưu trữ dữ liệu", "backup", ["Phần mềm backup", "Lưu trữ trên thiết bị chuyên dụng: SAN, NAS, TAPE", "Lưu trữ dữ liệu trên Cloud"]),
  ("Giải pháp phòng họp trực tuyến", "video", ["Màn hình tương tác", "Microsoft Teams Rooms", "Zoom Rooms", "Google Meet", "Giải pháp dành cho giáo dục"]),
  ("Giải pháp An ninh (CCTV, Access Control)", "shield", ["Camera giám sát an ninh", "Thiết bị kiểm soát ra vào văn phòng, tòa nhà"]),
  ("Giải pháp của Microsoft", "windows", ["Microsoft 365: Email, Office, Teams, OneDrive, Power BI, SharePoint", "Windows 365: Cloud PC, Business, Enterprise", "Microsoft EMS: Azure AD Premium, Intune, Azure Rights Management, ATA, DLP", "Azure: SaaS, IaaS, PaaS"]),
  ("Dịch vụ Migrate", "cloud", ["Email từ nền tảng khác → Microsoft 365", "Server on premise → Server on Cloud", "Database on premise → Database on Cloud", "Data on local → Data on Cloud"]),
]

def add_offering_cons(raw, parent_slug, kind):
    """Each entry becomes a Danh mục con; its bullets become products underneath."""
    cat_slug_list = []
    for ci2, (title, icon, items) in enumerate(raw):
        cslug = uniq(slugify(title), cat_slugs)
        cat_slug_list.append(cslug)
        categories.append({"title": title, "slug": cslug, "parentSlug": parent_slug, "icon": icon,
          "order": ci2 + 1, "summary": "%s — tư vấn, thiết kế và triển khai bởi AZ Technology." % title})
        for k, it in enumerate(items):
            pslug = uniq(slugify(it), prod_slugs)
            products.append({"title": it, "slug": pslug, "headline": it, "categorySlug": cslug,
              "icon": icon, "tone": TONES[k % 5],
              "summary": "%s — tư vấn và triển khai bởi AZ Technology." % it,
              "highlights": list(OFFERING_HL), "description": offering_desc(kind, it, title),
              "specs": specs_for(kind, it), "order": k + 1})
    return cat_slug_list

service_cat_slugs = add_offering_cons(services_raw, "dich-vu-it", "service")
solution_cat_slugs = add_offering_cons(solutions_raw, "giai-phap", "solution")

# ---- Sản phẩm: software/hardware from the CSV (under their Phần mềm/Phần cứng con) ----
MENU_TYPE = {"PHẦN CỨNG": "product", "PHẦN MỀM": "software"}
order_in_cat = collections.Counter()
pi = 0
for r in rows:
    m, cat, name, headline = r[0].strip(), r[1].strip(), r[2].strip(), r[3].strip()
    brands = find_brands(name, cat)
    s = uniq(slugify(name), prod_slugs)
    order_in_cat[(m, cat)] += 1
    featured = order_in_cat[(m, cat)] <= 2
    products.append({"title": name, "slug": s, "headline": headline or name,
      "categorySlug": sub_slug[(m, cat)], "icon": product_icon(brands, cat), "tone": TONES[pi % 5],
      "badge": "Bán chạy" if featured else None,
      "summary": "%s — chính hãng, tư vấn cấu hình, báo giá và triển khai bởi AZ Technology." % name,
      "highlights": bullets_of(r) or list(GENERIC_HL), "description": desc_html(r),
      "specs": specs_for(MENU_TYPE[m], name), "brandSlugs": [slugify(b) for b in brands], "order": pi + 1})
    pi += 1

for p in products:
    if p.get("badge") is None: p.pop("badge", None)

def slugs_of_parent(top, n=None):
    # product slugs whose category's parent (cha) is `top`
    cat_parent = {c["slug"]: c.get("parentSlug") for c in categories}
    out = [p["slug"] for p in products if cat_parent.get(p["categorySlug"]) == top]
    return out[:n] if n else out

HOME_SECTIONS = [
  {"title": "SẢN PHẨM NỔI BẬT", "order": 1, "subsections": [
      {"title": "Phần mềm", "productSlugs": slugs_of_parent("phan-mem", 12)},
      {"title": "Phần cứng", "productSlugs": slugs_of_parent("phan-cung", 12)}]},
  {"title": "GIẢI PHÁP DOANH NGHIỆP", "order": 2, "categorySlugs": solution_cat_slugs},
  {"title": "DỊCH VỤ IT", "order": 3, "categorySlugs": service_cat_slugs},
]

HEROES = [
  {"title": "Hạ tầng số vững chắc", "ctaLabel": "Xem giải pháp Data Center", "ctaHref": "/danh-muc/giai-phap", "order": 1, "active": True},
  {"title": "Bản quyền phần mềm", "ctaLabel": "Xem danh mục phần mềm", "ctaHref": "/danh-muc/phan-mem", "order": 2, "active": True},
  {"title": "Vận hành IT", "ctaLabel": "Khám phá dịch vụ IT", "ctaHref": "/danh-muc/dich-vu-it", "order": 3, "active": True},
]
SETTINGS = {
  "company": "AZ IT Solutions & Services", "shortName": "AZ Technology", "slogan": "Software · Hardware · Cloud Services",
  "hotline": "0703 594 402", "email": "nhu.trang@az-technology.vn",
  "address": "1/46/28 Đặng Thùy Trâm, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh, Việt Nam",
  "zaloUrl": "https://zalo.me/0703594402", "mapUrl": "https://maps.google.com/?q=AZ+Technology+Ho+Chi+Minh",
}

def j(o): return json.dumps(o, ensure_ascii=False, indent=2)
ts = '''/* AUTO-GENERATED from AZTechnology CSV (regenerate via scripts/gen_seed.py).
   Three shapes: Danh mục cha (parent-category) + Danh mục con (category) + Sản phẩm (product). */

export const BRANDS = %s;

const slugify = (s: string) =>
  s.normalize("NFKD").replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[\\u0300-\\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export interface SeedParentCategory { title: string; slug: string; icon?: string; order?: number; summary?: string; }
export interface SeedCategory { title: string; slug: string; parentSlug: string; icon?: string; order?: number; summary?: string; description?: string; }
export interface SeedProduct {
  title: string; slug: string; headline?: string; categorySlug: string;
  icon?: string; tone?: string; badge?: string; summary?: string;
  highlights?: string[]; description?: string; specs?: string;
  brandSlugs?: string[]; order?: number;
}
export interface SeedSubsection { title: string; productSlugs?: string[]; categorySlugs?: string[]; }
export interface SeedHomeSection { title: string; order: number; productSlugs?: string[]; categorySlugs?: string[]; subsections?: SeedSubsection[]; }

export const PARENT_CATEGORIES: SeedParentCategory[] = %s;
export const CATEGORIES: SeedCategory[] = %s;
export const PRODUCTS: SeedProduct[] = %s;
export const HOME_SECTIONS: SeedHomeSection[] = %s;
export const HEROES = %s;
export const SETTINGS = %s;

export { slugify };
''' % (j(BRANDS), j(parents), j(categories), j(products), j(HOME_SECTIONS), j(HEROES), j(SETTINGS))

with open(OUT, "w", encoding="utf-8") as f: f.write(ts)
print("parents:", len(parents), "| categories(con):", len(categories), "| products:", len(products))
print("  service cons:", service_cat_slugs)
print("  solution cons:", solution_cat_slugs)
from collections import Counter as _C
_pp = _C()
_cp = {c["slug"]: c.get("parentSlug") for c in categories}
for p in products: _pp[_cp.get(p["categorySlug"])] += 1
print("  products per cha:", dict(_pp))
