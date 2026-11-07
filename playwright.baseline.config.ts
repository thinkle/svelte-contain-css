// Cross-engine regression gate for native Input / custom Select alignment.
// Run: npx playwright test --config=playwright.baseline.config.ts
import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig({
  ...config,
  testMatch: "field-baseline.spec.ts",
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
});
