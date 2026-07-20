import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { WhyAZ, PartnerMarquee } from "@/components/HomeStrips";
import { CTAStrip } from "@/components/CTAStrip";
import { getBanners, getHomeSections } from "@/lib/data";

export default async function HomePage() {
  const [banners, sections] = await Promise.all([getBanners(), getHomeSections()]);

  return (
    <>
      <Hero banners={banners} />
      <HomeSections sections={sections} />
      <WhyAZ />
      <PartnerMarquee />
      <CTAStrip />
    </>
  );
}
