import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { WhyAZ } from "@/components/HomeStrips";
import { CTAStrip } from "@/components/CTAStrip";

export const metadata: Metadata = { title: "Về AZ Technology", description: "Giới thiệu AZ IT Solutions & Services." };

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <>
      <div className="az-container py-10">
        <div className="rounded-xl2 az-grad p-10 text-white">
          <h1 className="text-3xl font-extrabold">{settings.company}</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            AZ Technology là đơn vị cung cấp giải pháp CNTT B2B tại Việt Nam: phần mềm bản quyền,
            thiết bị văn phòng, hạ tầng Data Center, dịch vụ IT và giải pháp doanh nghiệp.
            Chúng tôi đồng hành cùng doanh nghiệp từ tư vấn, triển khai đến hỗ trợ lâu dài.
          </p>
          <p className="mt-3 font-semibold text-cyan-200">{settings.slogan}</p>
        </div>
      </div>
      <WhyAZ />
      <CTAStrip />
    </>
  );
}
