import Link from "next/link";

export default function NotFound() {
  return (
    <div className="az-container flex flex-col items-center justify-center py-28 text-center">
      <div className="az-text-grad text-7xl font-extrabold">404</div>
      <h1 className="mt-3 text-2xl font-extrabold text-navy">Không tìm thấy trang</h1>
      <p className="mt-2 text-ink/60">Trang bạn tìm có thể đã được di chuyển hoặc không tồn tại.</p>
      <Link href="/" className="mt-6 rounded-lg az-grad px-6 py-3 font-bold text-white shadow-cardHover hover:opacity-95">
        Về trang chủ
      </Link>
    </div>
  );
}
