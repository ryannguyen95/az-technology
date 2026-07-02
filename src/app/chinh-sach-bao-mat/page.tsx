import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Chính sách bảo mật", description: "Chính sách bảo mật thông tin của AZ Technology." };

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <div className="az-container max-w-3xl py-10">
      <h1 className="text-3xl font-extrabold text-navy">Chính sách bảo mật</h1>
      <div className="mt-6 space-y-5 text-ink/75">
        <p>AZ Technology ({settings.company}) tôn trọng và cam kết bảo vệ thông tin cá nhân của Quý khách, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.</p>
        <section>
          <h2 className="text-lg font-bold text-navy">Thông tin chúng tôi thu thập</h2>
          <p className="mt-1">Khi Quý khách gửi yêu cầu tư vấn/báo giá, chúng tôi thu thập: họ tên, số điện thoại, email, tên công ty và nội dung yêu cầu — chỉ nhằm mục đích liên hệ và tư vấn.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy">Mục đích & cơ sở xử lý</h2>
          <p className="mt-1">Thông tin được dùng để phản hồi yêu cầu của Quý khách. Chúng tôi chỉ xử lý dữ liệu khi có sự đồng ý của Quý khách qua ô xác nhận trên biểu mẫu.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy">Lưu trữ & thời hạn</h2>
          <p className="mt-1">Dữ liệu được lưu trữ an toàn và chỉ trong thời gian cần thiết cho mục đích tư vấn, sau đó được xóa theo yêu cầu hoặc theo chính sách lưu trữ nội bộ.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy">Quyền của Quý khách</h2>
          <p className="mt-1">Quý khách có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân bằng cách liên hệ {settings.email} hoặc {settings.hotline}.</p>
        </section>
      </div>
    </div>
  );
}
