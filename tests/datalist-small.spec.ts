import { test, expect } from "@playwright/test";

/**
 * DataList on a phone: by default the `end` region (tags, buttons) moves
 * under the content instead of squeezing the main column -- before, a name
 * got ~89px and broke over three lines -- and text keeps its size.
 */

const URL = "/svelte-contain-css/tests/datalist-small";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(URL);
});

const mainWidths = (page: import("@playwright/test").Page, id: string) =>
  page
    .getByTestId(id)
    .locator(".name")
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().width)));

test("by default the end region stacks under the content on a phone", async ({ page }) => {
  for (const w of await mainWidths(page, "default")) expect(w).toBeGreaterThan(250);
});

test("stackable={false} keeps the end region beside the content", async ({ page }) => {
  for (const w of await mainWidths(page, "off")) expect(w).toBeLessThan(200);
});

test("text keeps its size in the small tier", async ({ page }) => {
  const sizes = await page
    .locator(".name")
    .evaluateAll((els) => els.map((e) => getComputedStyle(e.closest(".data-list-item")!).fontSize));
  for (const s of sizes) expect(s).toBe("16px");
});
