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

test("in a small pane on a wide screen, a Card snaps to 250px and its text doesn't shrink", async ({ page }) => {
  const card = page.getByTestId("card-small").locator(".card");
  const { w, font } = await card.evaluate((e) => ({
    w: e.getBoundingClientRect().width,
    font: getComputedStyle(e.querySelector("section")!).fontSize,
  }));
  // 250px plus the card's 1px border either side
  expect(Math.round(w)).toBeGreaterThanOrEqual(250);
  expect(Math.round(w)).toBeLessThanOrEqual(252);
  expect(font).toBe("16px");
});

test("on a phone, a Card fills the width it's given", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const w = await page
    .getByTestId("card-small")
    .locator(".card")
    .evaluate((e) => e.getBoundingClientRect().width);
  // 360px box less the card's 16px margins either side
  expect(Math.round(w)).toBeGreaterThanOrEqual(326);
});

for (const viewport of [1200, 390]) {
  test(`a Card never gets wider as its container gets narrower (${viewport}px viewport)`, async ({ page }) => {
    await page.setViewportSize({ width: viewport, height: 900 });
    const sweep = await page
      .getByTestId("card-sweep")
      .locator(".sweep")
      .evaluateAll((els) =>
        els.map((e) => ({
          container: Number((e as HTMLElement).dataset.w),
          card: Math.round(e.querySelector(".card")!.getBoundingClientRect().width),
        })),
      );
    for (let i = 1; i < sweep.length; i++) {
      expect(sweep[i].card, `${sweep[i].container}px container vs ${sweep[i - 1].container}px`).toBeLessThanOrEqual(sweep[i - 1].card);
    }
    if (viewport === 1200) {
      // ...and the snap is a real step down, not a slide.
      const at = (c: number) => sweep.find((s) => s.container === c)!.card;
      expect(at(601) - at(600)).toBeGreaterThan(100);
    }
  });
}

test("a Card keeps --card-width in a wide container", async ({ page }) => {
  const w = await page
    .getByTestId("card-wide")
    .locator(".card")
    .evaluate((e) => Math.round(e.getBoundingClientRect().width));
  expect(w).toBeGreaterThanOrEqual(420);
  expect(w).toBeLessThanOrEqual(424);
});

test("width and height passed as props hold in the small tier", async ({ page }) => {
  // fixedHeight is set from `height` once the page hydrates
  const card = page.getByTestId("card-pinned").locator(".card.fixedHeight");
  await expect(card).toBeVisible();
  const { w, h } = await card.evaluate((e) => {
    const r = e.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  expect(w).toBeGreaterThanOrEqual(300);
  expect(w).toBeLessThanOrEqual(302);
  expect(h).toBeGreaterThanOrEqual(340);
  expect(h).toBeLessThanOrEqual(342);
});

test("a Card inside one with a width prop doesn't inherit that width", async ({ page }) => {
  const inner = page.getByTestId("card-nested").locator(".card .card");
  const w = await inner.evaluate((e) => Math.round(e.getBoundingClientRect().width));
  // Its own small-tier 250px (the outer card is a small container). Had it
  // inherited the outer 320px, max-width would hold it at ~270px instead.
  expect(w).toBeGreaterThanOrEqual(250);
  expect(w).toBeLessThanOrEqual(252);
});
