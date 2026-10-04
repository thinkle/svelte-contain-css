import { test, expect, type Page } from "@playwright/test";

/**
 * The small size tier ($small-max, 600px): components whose container is
 * that narrow size themselves for a phone, via `--{component}-{prop}-small`
 * with the regular variable, then a small default, as fallbacks. Tiles were
 * the case that prompted it -- one 192px tile alone in each row of a phone.
 */

const URL = "/svelte-contain-css/tests/small-tier";

async function tiles(page: Page, id: string) {
  return page
    .getByTestId(id)
    .locator(".tile")
    .evaluateAll((els) =>
      els.map((e) => {
        const r = e.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
      }),
    );
}

const perRow = (ts: { top: number }[]) => ts.filter((t) => t.top === ts[0].top).length;

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto(URL);
});

test("a tile keeps its 192px, 3:4 default in a wide container", async ({ page }) => {
  const ts = await tiles(page, "wide");
  expect(ts[0].w).toBe(192);
  expect(ts[0].h).toBe(256);
  expect(perRow(ts)).toBe(4);
});

test("in a small container, tiles go two to a row", async ({ page }) => {
  const ts = await tiles(page, "small");
  expect(ts[0].w).toBe(160);
  expect(perRow(ts)).toBe(2);
});

test("an explicit --tile-width is kept in the small tier", async ({ page }) => {
  const ts = await tiles(page, "small-explicit");
  expect(ts[0].w).toBe(120);
});

test("--tile-width-small wins in the small tier", async ({ page }) => {
  const ts = await tiles(page, "small-override");
  expect(ts[0].w).toBe(100);
  expect(perRow(ts)).toBe(3);
});

test("--tile-height still pins the height", async ({ page }) => {
  const [t] = await tiles(page, "pinned");
  expect(t.h).toBe(100);
});

test("a tile grows to fit its content instead of spilling out", async ({ page }) => {
  const tile = page.getByTestId("grows").locator(".tile");
  const { client, scroll } = await tile.evaluate((e) => ({
    client: e.clientHeight,
    scroll: e.scrollHeight,
  }));
  expect(client).toBeGreaterThan(256);
  expect(scroll).toBeLessThanOrEqual(client + 1);
});

test("--bar-padding-small applies only in a small container", async ({ page }) => {
  const pad = (id: string) =>
    page
      .getByTestId(id)
      .locator(".bar")
      .evaluate((e) => getComputedStyle(e).paddingLeft);
  expect(await pad("bar-small")).toBe("2px");
  expect(await pad("bar-wide")).toBe("8px");
});

test("--container-padding-small applies in a small container", async ({ page }) => {
  const pad = await page
    .getByTestId("container-small")
    .locator("section")
    .evaluate((e) => getComputedStyle(e).paddingLeft);
  expect(pad).toBe("3px");
});

test("a tile with no container around it still goes small on a phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/svelte-contain-css/tests/small-tier-bare");
  const w = await page
    .locator(".tile")
    .first()
    .evaluate((e) => Math.round(e.getBoundingClientRect().width));
  expect(w).toBe(160);
});

test("a Card fills a small container, and its text doesn't shrink", async ({ page }) => {
  const card = page.getByTestId("card-small").locator(".card");
  const { w, font } = await card.evaluate((e) => ({
    w: e.getBoundingClientRect().width,
    font: getComputedStyle(e.querySelector("section")!).fontSize,
  }));
  // 360px box less the card's 16px margins either side
  expect(Math.round(w)).toBeGreaterThanOrEqual(326);
  expect(font).toBe("16px");
});

test("a Card keeps --card-width in a wide container", async ({ page }) => {
  const w = await page
    .getByTestId("card-wide")
    .locator(".card")
    .evaluate((e) => Math.round(e.getBoundingClientRect().width));
  expect(w).toBeGreaterThanOrEqual(420);
  expect(w).toBeLessThanOrEqual(424);
});
