import { test, expect } from "@playwright/test";

const themes = ["default", "bootstrap", "tailwind", "dark"];

for (const theme of themes) {
  test(`capture ${theme} theme screenshot`, async ({ page }) => {
    await page.goto(`./theme-showcase/${theme}`, {
      waitUntil: "networkidle",
    });
    await expect(
      page.getByRole("heading", { name: `Theme Showcase: ${theme}` })
    ).toBeVisible({ timeout: 10000 });
    await page.screenshot({
      path: `screenshots/${theme}-theme.png`,
      fullPage: true,
    });
  });
}
