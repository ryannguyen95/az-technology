import { test, expect } from "@playwright/test";

test.describe("Thanh nav danh mục", () => {
  test("desktop: có mục Trang chủ và hotline sát mép phải", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const navRow = page.getByRole("navigation", { name: "Danh mục" });
    await expect(navRow.getByRole("link", { name: "Trang chủ" })).toBeVisible();

    const hotline = navRow.getByRole("link", { name: /Hotline/i });
    await expect(hotline).toBeVisible();
    await expect(hotline).toHaveAttribute("href", /^tel:/);

    // Hotline phải nằm bên phải mục nav cuối cùng.
    const hotlineBox = await hotline.boundingBox();
    const homeBox = await navRow.getByRole("link", { name: "Trang chủ" }).boundingBox();
    expect(hotlineBox!.x).toBeGreaterThan(homeBox!.x + homeBox!.width);
  });

  test("mobile: menu trượt có Trang chủ và khối hotline", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByRole("button", { name: "Mở menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Menu điều hướng" });

    await expect(drawer.getByRole("link", { name: "Trang chủ", exact: true })).toBeVisible();
    const hotline = drawer.getByRole("link", { name: /Hotline/i });
    await expect(hotline).toBeVisible();
    await expect(hotline).toHaveAttribute("href", /^tel:/);
  });
});
