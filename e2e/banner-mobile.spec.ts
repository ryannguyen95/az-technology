import { test, expect } from "@playwright/test";

// Chạy với DATA_SOURCE=strapi và ít nhất một banner có ảnh mobile.
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

    // Ảnh thực sự được chọn trên mobile phải khác ảnh desktop.
    const currentSrc = await picture.locator("img").evaluate((el: HTMLImageElement) => el.currentSrc);
    const desktopSrcSet = await sources.nth(0).getAttribute("srcset");
    expect(desktopSrcSet).not.toContain(decodeURIComponent(currentSrc.split("url=")[1]?.split("&")[0] ?? "___"));
  });
});
