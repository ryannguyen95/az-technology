import { Hero } from "@/components/Hero";
import { CategoryGrid, SectionRail, TrustStrip, PartnerStrip, FinalCTA } from "@/components/HomeSections";
import { heroSlides, categoryTiles, whyAZ, getBrands, getEntriesByKind } from "@/lib/data";

export default async function HomePage() {
  const [software, solutions, services, hardware] = await Promise.all([
    getEntriesByKind("software"),
    getEntriesByKind("solution"),
    getEntriesByKind("service"),
    getEntriesByKind("category"),
  ]);
  // featured solutions first
  const featuredSolutions = solutions.filter((s) => s.featured);

  return (
    <>
      <Hero slide={heroSlides[0]} />
      <CategoryGrid tiles={categoryTiles} />
      <SectionRail title="Phần mềm bản quyền" entries={software} href="/danh-muc/phan-mem" />
      <SectionRail title="Giải pháp doanh nghiệp" entries={featuredSolutions} href="/giai-phap/ha-tang-data-center" />
      <SectionRail title="Dịch vụ IT & Data Center" entries={services} href="/dich-vu/dich-vu-it-co-ban" />
      <SectionRail title="Thiết bị & phần cứng" entries={hardware.filter((c) => c.parentSlug)} href="/danh-muc/thiet-bi-van-phong" />
      <TrustStrip items={whyAZ} />
      <PartnerStrip brands={getBrands()} />
      <FinalCTA />
      <div className="h-4" />
    </>
  );
}
