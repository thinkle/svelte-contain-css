import { expect, test } from "@playwright/test";

test("review navigation follows component theme overrides", async ({ page }) => {
  await page.goto("/svelte-contain-css/review/light/app");
  await page.waitForLoadState("networkidle");
  await page.locator("html").evaluate(el => {
    el.style.cssText = "--button-border-radius: 0px; --control-padding: 5px 9px; --button-font-weight: 700; --container-padding: 23px; --menu-item-padding: 7px;";
  });
  const switcher = page.getByRole("navigation", { name: "Review theme switcher" });
  const active = switcher.locator("a[aria-current=page]");
  await expect(active).toHaveCSS("border-top-left-radius", "0px");
  await expect(active).toHaveCSS("padding-top", "5px");
  await expect(active).toHaveCSS("padding-right", "9px");
  await expect(active).toHaveCSS("font-weight", "700");
  const scenarios = page.getByRole("navigation", { name: "App scenarios", exact: true });
  await expect(scenarios.getByRole("link", { name: "The Tidy Shelf (Blog)" })).toHaveCSS("padding-top", "7px");
  await expect(page.locator("main > section")).toHaveCSS("padding-top", "23px");
});

for (const theme of ["light", "dark", "bootstrap", "canyon-modern-serif-fancy", "forest-editorial-rounded", "light-airy-solid"]) {
  test(`${theme}: review navigation fits a narrow screen and preserves scenario links`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/svelte-contain-css/review/${theme}/app`);
    await page.waitForLoadState("networkidle");
    const switcher = page.getByRole("navigation", { name: "Review theme switcher" });
    const bounds = await switcher.locator("a").evaluateAll(links => links.map(el => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, width: r.width };
    }));
    for (const boundsOfLink of bounds) {
      expect(boundsOfLink.width).toBeGreaterThan(0);
      expect(boundsOfLink.left).toBeGreaterThanOrEqual(0);
      expect(boundsOfLink.right).toBeLessThanOrEqual(390);
    }
    await page.getByRole("navigation", { name: "App scenarios", exact: true })
      .getByRole("link", { name: "The Tidy Shelf (Blog)" }).click();
    await expect(page).toHaveURL(new RegExp(`/review/${theme}/app/blog-mockup$`));
    const dark = page.getByRole("navigation", { name: "Review theme switcher" })
      .getByRole("button", { name: "Dark", exact: true });
    await expect(dark).toHaveAttribute("href", "/svelte-contain-css/review/dark/app/blog-mockup");
    await dark.click();
    await expect(page).toHaveURL(/\/review\/dark\/app\/blog-mockup$/);
    await expect(page.getByRole("navigation", { name: "Review theme switcher" })
      .locator("a[aria-current=page]")).toHaveText("Dark");
  });
}
