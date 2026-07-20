import { defineConfig, devices } from "@playwright/test";

// Minimal Playwright setup for AZ Technology E2E tests.
// FE dev server for this repo is commonly run on :3005 (see agents-report qa-e2e progress notes);
// override via PLAYWRIGHT_BASE_URL if a different port is used locally.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3005",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-375", use: { ...devices["iPhone SE"] } },
  ],
});
