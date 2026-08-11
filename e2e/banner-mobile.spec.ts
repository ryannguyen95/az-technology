import { test, expect } from "@playwright/test";

// Chạy với DATA_SOURCE=strapi và ít nhất một banner có ảnh mobile.

// `srcsetOrUrl` là attribute `srcset` thô (nhiều entry "url widthw, ...") HOẶC
// `currentSrc` của <img> (một URL tuyệt đối duy nhất). Cả hai đều đi qua
// `_next/image?url=<đã percent-encode>&w=...`. Lấy entry đầu, decode đúng
// tham số `url=` rồi trả về path ảnh gốc — so path với path, không so chuỗi
// srcset thô với chuỗi đã decode (đó là bug của bản test trước: so một bên
// decode với một bên chưa decode nên `.not.toContain()` không bao giờ khớp,
// kể cả khi hai <source> trỏ cùng một ảnh).
function extractImageUrl(srcsetOrUrl: string): string {
  const firstEntry = srcsetOrUrl.trim().split(",")[0]!.trim().split(" ")[0]!;
  const parsed = new URL(firstEntry, "http://127.0.0.1");
  return decodeURIComponent(parsed.searchParams.get("url") ?? "");
}

test.describe("Banner mobile", () => {
  test("mobile lấy source riêng, desktop lấy source ngang", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const picture = page.locator("picture").first();
    await expect(picture).toBeVisible();

    // Cả hai source đều phải đi qua next/image optimizer.
    const sources = picture.locator("source");
    await expect(sources).toHaveCount(2);
    await expect(sources.nth(0)).toHaveAttribute("srcset", /_next\/image/);
    await expect(sources.nth(1)).toHaveAttribute("srcset", /_next\/image/);

    const desktopSrcSet = (await sources.nth(0).getAttribute("srcset"))!;
    const mobileSrcSet = (await sources.nth(1).getAttribute("srcset"))!;
    const currentSrc = await picture.locator("img").evaluate((el: HTMLImageElement) => el.currentSrc);

    const desktopUrl = extractImageUrl(desktopSrcSet);
    const mobileUrl = extractImageUrl(mobileSrcSet);
    const currentUrl = extractImageUrl(currentSrc);

    // Khẳng định dương: ở viewport mobile, ảnh <img> đang thật sự dùng đúng
    // được browser chọn từ <source media="(max-width: 767px)"> — trùng khớp
    // chính xác với URL ảnh mobile, không phải suy luận gián tiếp.
    expect(currentUrl).toBe(mobileUrl);
    // Khẳng định âm: và khác ảnh desktop — hai <source> không trỏ cùng 1 file.
    expect(currentUrl).not.toBe(desktopUrl);
  });
});
