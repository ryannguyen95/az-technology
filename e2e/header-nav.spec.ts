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

    // Hotline phải dính sát mép phải của chính nav row (bằng chứng của `ml-auto`),
    // không chỉ đơn thuần "nằm bên phải mục Trang chủ" (vẫn đúng dù ml-auto bị xoá
    // vì các mục nav khác chen giữa).
    const navBox = await navRow.boundingBox();
    const hotlineBox = await hotline.boundingBox();
    const rightGapToNavEdge = navBox!.x + navBox!.width - (hotlineBox!.x + hotlineBox!.width);
    expect(rightGapToNavEdge).toBeLessThanOrEqual(8);

    // Phải có khoảng trống thật giữa mục nav cuối cùng (trước hotline) và hotline —
    // đó mới là dấu hiệu thực sự của `ml-auto` chứ không phải khoảng cách `gap-0.5` bình thường.
    const navLinks = navRow.getByRole("link");
    const linkCount = await navLinks.count();
    const lastCategoryBox = await navLinks.nth(linkCount - 2).boundingBox();
    const gapBeforeHotline = hotlineBox!.x - (lastCategoryBox!.x + lastCategoryBox!.width);
    expect(gapBeforeHotline).toBeGreaterThanOrEqual(40);
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

  test("mobile: drawer đóng thì nội dung bên trong không nhận được focus bằng bàn phím", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const dialogSelector = '[aria-label="Menu điều hướng"]';

    // Drawer đang đóng (DOM vẫn mount panel, chỉ translate ra ngoài khung hình).
    // Tab qua toàn trang — focus không được rơi vào bên trong dialog dù nó vẫn nằm
    // trong DOM, vì đó chính là lỗ hổng aria-modal="true" nói dối khi đóng.
    const menuButton = page.getByRole("button", { name: "Mở menu" });
    await menuButton.focus();
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const focusedInsideClosedDrawer = await page.evaluate((sel) => {
        const dialog = document.querySelector(sel);
        const active = document.activeElement;
        return !!(dialog && active && dialog !== active && dialog.contains(active));
      }, dialogSelector);
      expect(focusedInsideClosedDrawer).toBe(false);
    }

    // Mở drawer ra: link "Trang chủ" bên trong phải focus được lại bình thường.
    await menuButton.click();
    const homeLinkInDrawer = page.getByRole("dialog", { name: "Menu điều hướng" }).getByRole("link", { name: "Trang chủ", exact: true });
    await homeLinkInDrawer.focus();
    await expect(homeLinkInDrawer).toBeFocused();
  });

  test("topbar: nút Zalo mở link Zalo từ CMS, không mở modal", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Scope vào topbar (data-testid="topbar") vì trang chủ còn có nút Zalo nổi
    // (FloatingButtons, accessible name cũng là "Chat Zalo") — getByRole không
    // scope sẽ dính strict-mode violation do match cả hai.
    const topbar = page.getByTestId("topbar");
    const zalo = topbar.getByRole("link", { name: "Chat Zalo" });
    await expect(zalo).toBeVisible();
    await expect(zalo).toHaveAttribute("href", /zalo\.me/);
    await expect(zalo).toHaveAttribute("target", "_blank");
  });
});
