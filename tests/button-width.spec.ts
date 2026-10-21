import { test, expect, type Page } from "@playwright/test";

/**
 * A button is as wide as its label by default -- including in a flex column
 * (Stack) or a grid, which used to stretch it edge to edge. width="100%" asks
 * for a full-width one, and MenuList rows still fill their row.
 */

const URL = "/svelte-contain-css/tests/button-width";

async function widths(page: Page, id: string, selector = "button, a[role=button]") {
  return page
    .getByTestId(id)
    .locator(selector)
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().width)));
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto(URL);
});

test("a Button and a ButtonLink in a Stack keep the width of their label", async ({ page }) => {
  for (const w of await widths(page, "stack")) {
    expect(w).toBeLessThan(150);
  }
});

test("a Button in a grid cell keeps the width of its label", async ({ page }) => {
  const [w] = await widths(page, "grid");
  expect(w).toBeLessThan(150);
});

test('width="100%" spans the column without overflowing it', async ({ page }) => {
  const box = page.getByTestId("full");
  const { button, column } = await box.evaluate((e) => ({
    button: e.querySelector("button")!.getBoundingClientRect().toJSON(),
    column: e.querySelector(".stack")!.getBoundingClientRect().toJSON(),
  }));
  expect(button.width).toBeGreaterThan(column.width - 40);
  expect(button.right).toBeLessThanOrEqual(column.right + 0.5);
  expect(button.left).toBeGreaterThanOrEqual(column.left - 0.5);
});

test("MenuList rows still fill the menu", async ({ page }) => {
  const menu = await page
    .getByTestId("menu")
    .locator(".menu")
    .evaluate((e) => Math.round(e.getBoundingClientRect().width));
  for (const w of await widths(page, "menu")) {
    expect(w).toBeGreaterThan(menu - 40);
  }
});

test("--menu-item-width still sets a MenuList's button width", async ({ page }) => {
  const [w] = await widths(page, "menu-custom");
  expect(w).toBe(120);
});
