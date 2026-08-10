import { defineConfig, devices } from "@playwright/test";

// Minimal Playwright setup for AZ Technology E2E tests.
// WORKTREE `subcategory-items-display-3a9541`: web chạy ở :3014 = port gốc AZ (3004) + 10,
// theo mục "Dải worktree" của Port Registry — để chạy song song cây chính không đụng port.
// ⚠️ Đừng merge con số 3014 này vào main: cây chính phải là 3004.
// Override qua PLAYWRIGHT_BASE_URL nếu chạy port khác locally.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3014",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-375", use: { ...devices["iPhone SE"] } },
  ],
});
