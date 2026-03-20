import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const host = process.env.PLAYWRIGHT_HOST ?? "127.0.0.1";
const port = Number(process.env.PLAYWRIGHT_PORT ?? "4173");
const baseURL = `http://${host}:${port}/svelte-contain-css`;
const htmlReportDir =
  process.env.PLAYWRIGHT_HTML_OUTPUT_DIR ??
  path.join("/tmp", "contain-css-playwright-report");
const outputDir =
  process.env.PLAYWRIGHT_OUTPUT_DIR ??
  path.join("/tmp", "contain-css-playwright-results");

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  outputDir,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: htmlReportDir }],
    ["./tests/reporters/debug-helper.ts"],
  ],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run dev -- --host ${host} --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
