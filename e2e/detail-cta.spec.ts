import { test, expect } from "@playwright/test";

// Một slug sản phẩm có thật trong Strapi. Đổi nếu catalog thay đổi.
// Lưu ý: "/san-pham/microsoft-365" (dùng trước đây) không còn tồn tại sau khi
// catalog Strapi được reseed với dữ liệu thật (140 sản phẩm, slug đầy đủ hơn
// như "microsoft-365-business-basic") — xác nhận qua Task 11 (404 khi verify
// thủ công). Sản phẩm dưới đây có thật, đã verify tay đủ 3 CTA + không còn
// badge cũ trước khi đổi field này.
const PRODUCT_PATH = "/san-pham/microsoft-365-business-basic";

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
