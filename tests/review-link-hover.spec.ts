import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark", "bootstrap", "light-airy-solid"]) {
  for (const suffix of ["", "/app", "/app/blog-mockup"]) {
    test(`${theme}${suffix}: the active theme link keeps its foreground on hover and focus`, async ({ page }) => {
      await page.goto(`/svelte-contain-css/review/${theme}${suffix}`);
      await page.waitForLoadState("networkidle");
      const active = page.locator(".review-theme-switcher a[aria-current=page]");
      // Park away first: this test must compare a real rest state with hover.
      await page.mouse.move(0, 0);
      const rest = await active.evaluate(el => ({
        color: getComputedStyle(el).color,
        background: getComputedStyle(el).backgroundColor,
      }));
      expect(rest.color).not.toBe(rest.background);
      await active.hover();
      await expect(active).toHaveCSS("color", rest.color);
      await page.mouse.move(0, 0);
      await active.focus();
      await expect(active).toHaveCSS("color", rest.color);
    });
  }
}
