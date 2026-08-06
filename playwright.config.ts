import { defineConfig, devices } from "@playwright/test";

// Minimal Playwright setup for AZ Technology E2E tests.
// Web dev server chuẩn của AZ chạy ở :3004 (`bun run dev` đã pin sẵn `-p 3004`).
// Override qua PLAYWRIGHT_BASE_URL nếu chạy port khác locally.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3004",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-375", use: { ...devices["iPhone SE"] } },
  ],
});
