import { test, expect } from "@playwright/test";

// Một slug sản phẩm có thật trong seed. Đổi nếu seed thay đổi.
const PRODUCT_PATH = "/san-pham/microsoft-365";

test.describe("Trang chi tiết sản phẩm", () => {
  test("không còn badge 'Vô vàn ưu đãi'", async ({ page }) => {
    await page.goto(PRODUCT_PATH);
    await expect(page.getByText("Miễn phí tư vấn")).toBeVisible();
    await expect(page.getByText("Vô vàn ưu đãi")).toHaveCount(0);
  });

  test("có đúng 3 nút CTA, không còn MUA NGAY", async ({ page }) => {
    await page.goto(PRODUCT_PATH);
    await expect(page.getByRole("button", { name: "NHẬN BÁO GIÁ" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "GỌI CHO TÔI" })).toBeVisible();
    await expect(page.getByRole("link", { name: /ZALO/i }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "MUA NGAY" })).toHaveCount(0);
  });

  test("GỌI CHO TÔI là link tel:, ZALO mở tab mới", async ({ page }) => {
    await page.goto(PRODUCT_PATH);
    const call = page.getByRole("link", { name: "GỌI CHO TÔI" });
    await expect(call).toHaveAttribute("href", /^tel:\+?[\d]+$/);

    const zalo = page.getByRole("link", { name: /ZALO/i }).first();
    await expect(zalo).toHaveAttribute("target", "_blank");
    await expect(zalo).toHaveAttribute("rel", /noopener/);
    await expect(zalo).toHaveAttribute("href", /zalo\.me/);
  });
});
