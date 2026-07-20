import { test, expect } from "@playwright/test";

/**
 * E2E — Logo từ CMS (task-slug `logo-cms`).
 *
 * Nguồn spec: agents-report/logo-cms/agent-lead/feature-spec.md (AC2-AC5)
 *             + agents-report/logo-cms/backend-dev/data-contract.md.
 *
 * Cover TC1-TC7 (test-cases.md). TC8/TC9 (fallback lockup + dùng chéo khi
 * thiếu 1 trong 2 ảnh) CHỦ Ý để ngoài E2E ở vòng này — cần set
 * site-setting.logo/logoDark = null trên Strapi thật (đụng DB), ngoài phạm
 * vi cho phép của vòng verify này. Đã verify các case đó bằng đọc code +
 * bằng chứng browser thật của frontend-dev (xem test-report.md).
 *
 * Các test tự set viewport cần thiết qua `page.setViewportSize` thay vì dựa
 * vào `projects` device preset, để đảm bảo hành vi xác định (deterministic)
 * bất kể project nào chạy — nên chỉ cần chạy 1 lần trên project `chromium`
 * (skip trên `mobile-375` để tránh chạy trùng lặp vô ích).
 */

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const LOGO_HEIGHT = 44;
const LOGO_ALT = "AZ Technology";

type SiteSettingLogos = {
  logoHash: string;
  logoDarkHash: string;
  logoAspectRatio?: string;
  logoAspectRatioCustom?: string;
};

/** Mirrors `parseLogoRatio` in src/components/Cards.tsx — parses "W:H" into a numeric ratio. */
function parseLogoRatio(ratio?: string): number {
  if (ratio) {
    const [wRaw, hRaw] = ratio.split(":");
    const w = parseFloat(wRaw);
    const h = hRaw !== undefined ? parseFloat(hRaw) : 1;
    if (Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0) return w / h;
  }
  return 4;
}

async function fetchSiteSettingLogos(): Promise<SiteSettingLogos> {
  const res = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`);
  if (!res.ok) {
    throw new Error(`Không lấy được /api/site-setting từ Strapi (${res.status}). TC1/TC2/TC3/TC7 cần Strapi :1337 đang chạy với data logo/logoDark đã upload.`);
  }
  const json = await res.json();
  const data = json.data;
  return {
    logoHash: data?.logo?.hash,
    logoDarkHash: data?.logoDark?.hash,
    logoAspectRatio: data?.logoAspectRatio,
    logoAspectRatioCustom: data?.logoAspectRatioCustom,
  };
}

test.describe("Logo CMS — Header / Footer / Mobile drawer", () => {
  test.beforeEach(async ({}, testInfo) => {
    // Mỗi test tự set viewport cần thiết → chỉ cần chạy trên 1 project để tránh
    // trùng lặp vô ích (project `mobile-375` sẽ cho kết quả giống hệt).
    test.skip(testInfo.project.name !== "chromium", "Viewport được set tường minh trong từng test — bỏ qua project mobile-375 để tránh chạy trùng.");
  });

  test("TC1 — Header desktop hiển thị đúng logo CMS (ảnh nền sáng) + preload above-the-fold", async ({ page }) => {
    const { logoHash } = await fetchSiteSettingLogos();
    expect(logoHash, "Strapi site-setting.logo chưa upload — cần data để chạy TC1").toBeTruthy();

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const headerLogo = page.locator(`header a[href="/"] img[alt="${LOGO_ALT}"]`).first();
    await expect(headerLogo).toBeVisible();
    const src = await headerLogo.getAttribute("src");
    expect(src).toContain(logoHash);

    const preload = page.locator('link[rel="preload"][as="image"]');
    await expect(preload).toHaveCount(1);
    const preloadSrcset = await preload.getAttribute("imagesrcset");
    expect(preloadSrcset).toContain(logoHash);
  });

  test("TC2 — Footer hiển thị đúng logo CMS (ảnh nền tối), lazy-loaded", async ({ page }) => {
    const { logoDarkHash } = await fetchSiteSettingLogos();
    expect(logoDarkHash, "Strapi site-setting.logoDark chưa upload — cần data để chạy TC2").toBeTruthy();

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const footerLogo = page.locator(`footer a[href="/"] img[alt="${LOGO_ALT}"]`).first();
    await footerLogo.scrollIntoViewIfNeeded();
    await expect(footerLogo).toBeVisible();

    const src = await footerLogo.getAttribute("src");
    expect(src).toContain(logoDarkHash);
    await expect(footerLogo).toHaveAttribute("loading", "lazy");

    const box = await footerLogo.boundingBox();
    expect(box?.width).toBeCloseTo(194, 0);
    expect(box?.height).toBeCloseTo(LOGO_HEIGHT, 0);
  });

  test("TC3 — Mobile drawer hiển thị đúng logo CMS (ảnh nền tối) ở viewport hẹp", async ({ page }) => {
    const { logoDarkHash } = await fetchSiteSettingLogos();
    expect(logoDarkHash, "Strapi site-setting.logoDark chưa upload — cần data để chạy TC3").toBeTruthy();

    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByRole("button", { name: /mở menu/i }).click();

    // Nút "Đóng" chỉ nhận được click khi drawer thực sự mở (overlay cha bỏ
    // pointer-events-none) — dùng chính assertion "mở đóng được" này để xác
    // nhận drawer đã mở đúng, thay vì chỉ dựa vào `toBeVisible()` (không đủ
    // để phân biệt trạng thái vì DOM luôn mount 2 logo, drawer đóng chỉ bị
    // translate ra ngoài khung nhìn chứ không display:none).
    const drawerLogo = page.locator(`img[alt="${LOGO_ALT}"]`).last();
    const src = await drawerLogo.getAttribute("src");
    expect(src).toContain(logoDarkHash);
    const box = await drawerLogo.boundingBox();
    expect(box?.width).toBeCloseTo(194, 0);
    expect(box?.height).toBeCloseTo(LOGO_HEIGHT, 0);

    await page.getByRole("button", { name: /đóng/i }).click();
  });

  test("TC4 — Logo không méo (object-contain), width/height pin đúng ở cả 3 vị trí", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const headerLogo = page.locator(`header a[href="/"] img[alt="${LOGO_ALT}"]`).first();
    const headerBox = await headerLogo.boundingBox();
    expect(headerBox?.width).toBeCloseTo(194, 0);
    expect(headerBox?.height).toBeCloseTo(LOGO_HEIGHT, 0);

    const footerLogo = page.locator(`footer a[href="/"] img[alt="${LOGO_ALT}"]`).first();
    await footerLogo.scrollIntoViewIfNeeded();
    const footerBox = await footerLogo.boundingBox();
    expect(footerBox?.width).toBeCloseTo(194, 0);
    expect(footerBox?.height).toBeCloseTo(LOGO_HEIGHT, 0);

    await page.setViewportSize({ width: 375, height: 800 });
    await page.getByRole("button", { name: /mở menu/i }).click();
    const drawerLogo = page.locator(`img[alt="${LOGO_ALT}"]`).last();
    const drawerBox = await drawerLogo.boundingBox();
    expect(drawerBox?.width).toBeCloseTo(194, 0);
    expect(drawerBox?.height).toBeCloseTo(LOGO_HEIGHT, 0);
  });

  test("TC5 — Logo header main bar giữ nguyên 194x44 và không tràn ngang ở MỌI viewport (320-1280px)", async ({ page }) => {
    await page.goto("/");

    const viewports = [320, 360, 375, 390, 414, 1280];
    const headerLogo = page.locator(`header a[href="/"] img[alt="${LOGO_ALT}"]`).first();

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      await expect(headerLogo).toBeVisible();

      const box = await headerLogo.boundingBox();
      expect(box?.width, `logo header main bar bị co width ở viewport ${width}px`).toBeCloseTo(194, 0);
      expect(box?.height, `logo header main bar bị co height ở viewport ${width}px`).toBeCloseTo(LOGO_HEIGHT, 0);

      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth, `trang bị tràn ngang ở viewport ${width}px`).toBeLessThanOrEqual(innerWidth);
    }
  });

  test("TC6 — Preload chỉ áp dụng cho logo header main bar (above-the-fold); footer/drawer lazy", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(1);

    const footerLogo = page.locator(`footer a[href="/"] img[alt="${LOGO_ALT}"]`).first();
    await expect(footerLogo).toHaveAttribute("loading", "lazy");

    await page.setViewportSize({ width: 375, height: 800 });
    await page.getByRole("button", { name: /mở menu/i }).click();
    const drawerLogo = page.locator(`img[alt="${LOGO_ALT}"]`).last();
    await expect(drawerLogo).toHaveAttribute("loading", "lazy");
  });

  test("TC7 — Custom ratio (logoAspectRatioCustom) render đúng width = height x ratio", async ({ page }) => {
    const { logoAspectRatio, logoAspectRatioCustom } = await fetchSiteSettingLogos();
    test.skip(
      logoAspectRatio !== "Tuỳ chỉnh" || !logoAspectRatioCustom,
      "CMS hiện không ở chế độ ratio tuỳ chỉnh (logoAspectRatio !== 'Tuỳ chỉnh') — bỏ qua TC7."
    );

    const expectedWidth = Math.round(LOGO_HEIGHT * parseLogoRatio(logoAspectRatioCustom));

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const headerLogo = page.locator(`header a[href="/"] img[alt="${LOGO_ALT}"]`).first();
    const box = await headerLogo.boundingBox();
    expect(box?.width).toBeCloseTo(expectedWidth, 0);
    expect(box?.height).toBeCloseTo(LOGO_HEIGHT, 0);
  });
});
