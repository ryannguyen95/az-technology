import type { CardProduct } from "@/lib/card";
import { CATEGORY_TILES } from "@/lib/nav";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { CategoryTile, SubBanner, CardRow } from "./Cards";

export function CategoryTilesSection() {
  return (
    <section className="py-14">
      <div className="max-w-site mx-auto px-4">
        <div className="reveal">
          <SectionHeading kicker="Danh mục" title="Khám phá theo nhóm giải pháp" />
        </div>
        <div className="reveal mt-8 grid grid-cols-3 sm:grid-cols-5 gap-4">
          {CATEGORY_TILES.map((tile) => (
            <CategoryTile key={tile.label} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SubBanners() {
  return (
    <section className="pb-4">
      <div className="max-w-site mx-auto px-4">
        <div className="reveal grid md:grid-cols-3 gap-5">
          <SubBanner kicker="Cloud · Microsoft" title="Microsoft 365 cho doanh nghiệp" desc="Email, Office & Teams bản quyền, triển khai trọn gói." cta="Tìm hiểu" href="/san-pham/microsoft-365" tone="blue" icon="m365" />
          <SubBanner kicker="Hạ tầng" title="Giải pháp Data Center" desc="Tư vấn – thiết kế – thi công hệ thống máy chủ & mạng." cta="Xem giải pháp" href="/giai-phap/ha-tang-data-center" tone="navy" icon="server" />
          <SubBanner kicker="Phòng họp" title="Zoom & Teams Rooms" desc="Thiết bị họp trực tuyến cho phòng họp hiện đại." cta="Khám phá" href="/giai-phap/ha-tang-data-center" tone="cyan" icon="video" />
        </div>
      </div>
    </section>
  );
}

export function HomeProductSection({
  kicker,
  title,
  viewAll,
  products,
}: {
  kicker: string;
  title: string;
  viewAll: string;
  products: CardProduct[];
}) {
  if (!products.length) return null;
  return (
    <section className="py-14">
      <div className="max-w-site mx-auto px-4">
        <div className="reveal">
          <SectionHeading kicker={kicker} title={title} viewAll={viewAll} />
        </div>
        <div className="reveal mt-8">
          <CardRow products={products} />
        </div>
        <div className="mt-7 sm:hidden text-center">
          <Button variant="soft" as="a" href={viewAll} iconRight="arrowRight">
            Xem tất cả
          </Button>
        </div>
      </div>
    </section>
  );
}
