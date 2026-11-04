import { test, expect } from "@playwright/test";

const widths = (pane: import("@playwright/test").Locator) =>
  pane.evaluate((el) => ({
    left: el.querySelector(".left")!.getBoundingClientRect().width,
    right: el.querySelector(".right")!.getBoundingClientRect().width,
    outer: el.getBoundingClientRect().width,
    scroll: el.scrollWidth,
  }));

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/svelte-contain-css/tests/split-pane-resize");
  await expect(page.getByTestId("host")).toHaveAttribute("data-ready", "true");
  await expect(page.getByTestId("fixed").getByRole("separator")).toBeVisible();
});

test("fixed sidebar survives repeated resizes, redundant events, and mobile round trip", async ({ page }) => {
  const pane = page.getByTestId("fixed");
  await pane.getByRole("separator").focus();
  await pane.getByRole("separator").press("ArrowRight");
  await expect(pane).toHaveAttribute("style", /grid-template-columns/);
  const initial = await widths(pane);
  for (const width of [1400, 1000, 1300, 1200]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(async () => Math.abs((await widths(pane)).left - initial.left)).toBeLessThan(1);
  }
  await page.evaluate(() => {
    for (let i = 0; i < 20; i++) window.dispatchEvent(new Event("resize"));
  });
  expect(Math.abs((await widths(pane)).left - initial.left)).toBeLessThan(1);
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(pane.getByRole("separator")).toBeHidden();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect.poll(async () => Math.abs((await widths(pane)).left - initial.left)).toBeLessThan(1);
});

test("default preserves the dragged ratio as the window changes", async ({ page }) => {
  const pane = page.getByTestId("ratio");
  await pane.getByRole("separator").focus();
  await pane.getByRole("separator").press("ArrowRight");
  await expect(pane).toHaveAttribute("style", /grid-template-columns/);
  const initial = await widths(pane);
  const ratio = initial.left / (initial.left + initial.right);
  for (const width of [1400, 1000, 1200]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(async () => {
      const w = await widths(pane);
      return Math.abs(w.left / (w.left + w.right) - ratio);
    }).toBeLessThan(0.002);
  }
});

test("container-only resize gives the extra room to the right pane", async ({ page }) => {
  const pane = page.getByTestId("fixed");
  await pane.getByRole("separator").focus();
  await pane.getByRole("separator").press("ArrowRight");
  await page.getByTestId("host").evaluate((el) => { el.style.width = "800px"; });
  const small = await widths(pane);
  await page.getByTestId("host").evaluate((el) => { el.style.width = "1000px"; });
  await expect.poll(async () => (await widths(pane)).right - small.right).toBeCloseTo(200, 0);
  expect(Math.abs((await widths(pane)).left - small.left)).toBeLessThan(1);
  expect((await widths(pane)).scroll).toBeLessThanOrEqual((await widths(pane)).outer);
});
