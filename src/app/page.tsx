import { Hero } from "@/components/Hero";
import { CategoryTilesSection, SubBanners, HomeProductSection } from "@/components/HomeSections";
import { WhyAZ, PartnerMarquee } from "@/components/HomeStrips";
import { CTAStrip } from "@/components/CTAStrip";
import { getEntriesByKind, getFeatured, getChildren, getBanners } from "@/lib/data";
import { toCard } from "@/lib/card";

export default async function HomePage() {
  const [banners, featured, software, solutions, services, hardware] = await Promise.all([
    getBanners(),
    getFeatured(),
    getEntriesByKind("software"),
    getEntriesByKind("solution"),
    getEntriesByKind("service"),
    getChildren("thiet-bi-van-phong"),
  ]);
  const cards = (list: Awaited<ReturnType<typeof getFeatured>>) => list.slice(0, 5).map(toCard);

  return (
    <>
      <Hero banners={banners} />
      <CategoryTilesSection />
      <SubBanners />

      <HomeProductSection kicker="Hot" title="SẢN PHẨM NỔI BẬT" viewAll="/danh-muc/phan-mem" products={cards(featured.length ? featured : software)} />
      <div className="bg-white">
        <HomeProductSection kicker="Doanh nghiệp" title="GIẢI PHÁP DOANH NGHIỆP" viewAll="/giai-phap/ha-tang-data-center" products={cards(solutions)} />
      </div>
      <HomeProductSection kicker="Bản quyền" title="PHẦN MỀM BẢN QUYỀN" viewAll="/danh-muc/phan-mem" products={cards(software)} />
      <div className="bg-white">
        <HomeProductSection kicker="Dịch vụ" title="DỊCH VỤ IT & DATA CENTER" viewAll="/dich-vu/dich-vu-it-co-ban" products={cards(services)} />
      </div>
      <HomeProductSection kicker="Văn phòng" title="PHẦN CỨNG VĂN PHÒNG" viewAll="/danh-muc/thiet-bi-van-phong" products={cards(hardware)} />

      <WhyAZ />
      <PartnerMarquee />
      <CTAStrip />
    </>
  );
}
