import { test, expect, type Page } from "@playwright/test";

/**
 * TabBar's `actions` snippet: non-tab controls share the tab row when there
 * is room, and move to their own row above the tabs in the small tier,
 * instead of squeezing the tabs or stacking into a column beside them.
 */

const URL = "/svelte-contain-css/tests/tabbar-actions";

async function boxes(page: Page) {
  const root = page.getByTestId("with-actions");
  const tab = await root.locator(".tab > button").first().boundingBox();
  const action = await root.locator(".tab-actions button").first().boundingBox();
  const actionTops = await root
    .locator(".tab-actions button")
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
  return { tab: tab!, action: action!, actionTops };
}

test("actions share the tab row when there is room", async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto(URL);
  const { tab, action } = await boxes(page);
  expect(action.x).toBeGreaterThan(tab.x + tab.width);
  expect(Math.abs(action.y + action.height - (tab.y + tab.height))).toBeLessThan(12);
});

test("on a phone, actions get their own row above the tabs", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(URL);
  const { tab, action } = await boxes(page);
  expect(action.y + action.height).toBeLessThanOrEqual(tab.y + 1);
  // and the tabs keep a full row, not a sliver beside the buttons
  const strip = await page.getByTestId("with-actions").locator(".tab-strip").boundingBox();
  expect(strip!.width).toBeGreaterThan(300);
});

test("a TabBar without actions is unchanged: 1em below, its own underline", async ({
  page,
}) => {
  await page.goto(URL);
  const bar = page.getByTestId("plain").locator(".bar");
  const cs = await bar.evaluate((e) => {
    const s = getComputedStyle(e);
    return { mb: s.marginBottom, fs: s.fontSize, border: s.borderBottomStyle };
  });
  expect(cs.mb).toBe(cs.fs);
  expect(cs.border).not.toBe("none");
  expect(await page.getByTestId("plain").locator(".tab-strip").count()).toBe(0);
});
