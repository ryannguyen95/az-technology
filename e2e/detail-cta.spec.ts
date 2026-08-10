import { test, expect } from "@playwright/test";

// Một slug sản phẩm có thật trong seed. Đổi nếu seed thay đổi.
const PRODUCT_PATH = "/san-pham/microsoft-365";

test.describe("Trang chi tiết sản phẩm", () => {
  test("không còn badge 'Vô vàn ưu đãi'", async ({ page }) => {
    await page.goto(PRODUCT_PATH);
    await expect(page.getByText("Miễn phí tư vấn")).toBeVisible();
    await expect(page.getByText("Vô vàn ưu đãi")).toHaveCount(0);
  });
});
