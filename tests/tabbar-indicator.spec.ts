import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * With vars/underlined-tabs.css the active tab's underline is ONE element
 * (.tab-indicator) that slides and resizes between tabs, takes its colour
 * from the active tab and blends on the way. Without the preset it paints
 * nothing.
 */
const URL = "/svelte-contain-css/tests/tabbar-indicator";

async function load(page: Page, query = "") {
  await page.setViewportSize({ width: 1000, height: 1400 });
  await page.goto(`${URL}${query}`);
  await page.waitForLoadState("networkidle");
}
const indicator = (page: Page, id: string) => page.getByTestId(id).locator(".tab-indicator");
const box = (l: Locator) =>
  l.evaluate((n) => {
    const r = n.getBoundingClientRect();
    return { left: r.left, right: r.right, bottom: r.bottom, top: r.top, width: r.width };
  });
async function activeBox(page: Page, id: string) {
  return page.getByTestId(id).locator(".tab.active").evaluate((t) => {
    const e = t.classList.contains("closable") ? t : t.querySelector("button")!;
    const r = e.getBoundingClientRect();
    return { left: r.left, right: r.right, bottom: r.bottom, width: r.width };
  });
}
async function expectUnder(page: Page, id: string) {
  await expect
    .poll(async () => {
      const i = await box(indicator(page, id));
      const t = await activeBox(page, id);
      return [i.left - t.left, i.width - t.width, i.bottom - t.bottom].every((d) => Math.abs(d) <= 1);
    })
    .toBe(true);
}
const bg = (l: Locator) => l.evaluate((n) => getComputedStyle(n).backgroundColor);
const rgb = (s: string) => s.match(/[\d.]+/g)!.slice(0, 3).map(Number);

test("default look paints nothing: height 0, no live class", async ({ page }) => {
  await load(page, "?preset=off");
  const ind = indicator(page, "main");
  await expect(ind).toHaveCount(1);
  expect(await ind.evaluate((n) => getComputedStyle(n).height)).toBe("0px");
  await expect(page.getByTestId("main").locator(".tabs")).not.toHaveClass(/tab-indicator-live/);
  await page.getByTestId("b").click();
  expect(await ind.evaluate((n) => getComputedStyle(n).height)).toBe("0px");
});

test("preset: indicator is 2px, live, and the static underline is transparent", async ({ page }) => {
  await load(page);
  const ind = indicator(page, "main");
  expect(await ind.evaluate((n) => getComputedStyle(n).height)).toBe("2px");
  await expect(page.locator('[data-testid="main"] .tabs')).toHaveClass(/tab-indicator-live/);
  const active = page.getByTestId("a");
  expect((await active.evaluate((n) => getComputedStyle(n).borderBottomColor)).replace(/\s/g, "")).toMatch(/rgba\(0,0,0,0\)|transparent/);
  await expectUnder(page, "main");
  expect(await bg(ind)).toBe("rgb(200, 0, 0)"); // the tab's own --tab-indicator-color
});

test("after switching, left/width match the new tab; mid-way it is between the two", async ({ page }) => {
  await load(page, "?dur=1500ms%20linear");
  const ind = indicator(page, "main");
  await expectUnder(page, "main");
  const from = await box(ind);
  const fromColor = rgb(await bg(ind));
  await page.getByTestId("b").click();
  await page.waitForTimeout(500);
  const mid = await box(ind);
  const midColor = rgb(await bg(ind));
  const to = await activeBox(page, "main");
  expect(mid.left).toBeGreaterThan(from.left + 1);
  expect(mid.left).toBeLessThan(to.left - 1);
  expect(mid.width).toBeGreaterThan(Math.min(from.width, to.width) + 1);
  expect(mid.width).toBeLessThan(Math.max(from.width, to.width) - 1);
  // Colour blends: red -> blue, mid-way equals neither endpoint.
  expect(midColor).not.toEqual(fromColor);
  expect(midColor).not.toEqual([0, 0, 200]);
  expect(midColor[0]).toBeLessThan(200);
  expect(midColor[2]).toBeGreaterThan(0);
  await expectUnder(page, "main");
  await expect.poll(() => bg(ind)).toBe("rgb(0, 0, 200)");
});

test("a tab without --tab-indicator-color falls back to its own text colour", async ({ page }) => {
  await load(page);
  await page.getByTestId("c").click();
  const fg = await page.getByTestId("c").evaluate((n) => getComputedStyle(n).color);
  await expect.poll(() => bg(indicator(page, "main"))).toBe(fg);
});

test("deselecting a borderless active tab does not flash an outline", async ({ page }) => {
  await load(page, "?preset=off");
  await page.getByTestId("main").locator(".tabs").evaluate((element) => {
    element.style.setProperty("--tab-active-border", "none");
    element.style.setProperty("--tab-transition", "5s linear");
  });
  const previouslyActive = page.getByTestId("a");
  await expect(previouslyActive).toHaveCSS("border-top-style", "none");
  await page.getByTestId("b").click();
  expect(await previouslyActive.evaluate((element) => getComputedStyle(element).borderTopColor))
    .toBe("rgba(0, 0, 0, 0)");
});

test("the first paint is placed without animating", async ({ page }) => {
  await load(page, "?dur=5000ms%20linear");
  // Long duration: if it had animated from 0 it would not be under the tab yet.
  await expectUnder(page, "main");
});

test("a closable active tab is spanned fully, both buttons", async ({ page }) => {
  await load(page);
  const wrap = page.getByTestId("closable").locator(".tab.closable");
  const w = await box(wrap);
  await expectUnder(page, "closable");
  const i = await box(indicator(page, "closable"));
  expect(Math.abs(i.width - w.width)).toBeLessThanOrEqual(1);
  expect(i.width).toBeGreaterThan(await page.getByTestId("closable").locator(".tab.closable > button").first().evaluate((n) => n.getBoundingClientRect().width) + 10);
  await page.getByTestId("cb").click();
  await expectUnder(page, "closable");
});

test("adding, removing and resizing tabs re-places it", async ({ page }) => {
  await load(page);
  await expectUnder(page, "dynamic");
  await page.getByRole("button", { name: "toggle first tab" }).click();
  await expectUnder(page, "dynamic");
  await page.getByRole("button", { name: "widen active tab" }).click();
  await expectUnder(page, "dynamic");
  await page.getByRole("button", { name: "toggle first tab" }).click();
  await expectUnder(page, "dynamic");
});

test("a horizontally scrolled bar keeps it under the active tab", async ({ page }) => {
  await load(page);
  const bar = page.getByTestId("scroll").locator(".bar");
  await page.getByTestId("t9").evaluate((n) => n.scrollIntoView());
  await page.getByTestId("t9").click();
  await expectUnder(page, "scroll");
  expect(await bar.evaluate((n) => n.scrollLeft)).toBeGreaterThan(0);
  await bar.evaluate((n) => (n.scrollLeft = 40));
  await expectUnder(page, "scroll");
  await bar.evaluate((n) => (n.scrollLeft = 0));
  await page.getByTestId("t0").click();
  await expectUnder(page, "scroll");
});

test("a wrapped bar puts it under the active tab on whichever row", async ({ page }) => {
  await load(page);
  const rows = await page.getByTestId("wrap").locator("button").evaluateAll((bs) => new Set(bs.map((b) => Math.round(b.getBoundingClientRect().top))).size);
  expect(rows).toBeGreaterThan(1);
  for (const t of ["w0", "w5", "w8", "w2"]) {
    await page.getByTestId(t).click();
    await expectUnder(page, "wrap");
  }
});

test("right-to-left: under the active tab, scrolled or not", async ({ page }) => {
  await load(page);
  const bar = page.getByTestId("rtl").locator(".bar");
  await page.getByTestId("r5").click();
  await expectUnder(page, "rtl");
  await bar.evaluate((n) => (n.scrollLeft = -50));
  await expectUnder(page, "rtl");
  await page.getByTestId("r1").click();
  await expectUnder(page, "rtl");
});

test("reduced motion: it moves without a transition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await load(page, "?dur=3000ms%20linear");
  const ind = indicator(page, "main");
  expect(await ind.evaluate((n) => getComputedStyle(n).transitionDuration)).toMatch(/^0s(, 0s)*$/);
  await page.getByTestId("b").click();
  await expectUnder(page, "main"); // immediately, well inside 3s
  const t = await activeBox(page, "main");
  const i = await box(ind);
  expect(Math.abs(i.left - t.left)).toBeLessThanOrEqual(1);
});

test("no active tab hides it; it returns without sliding from nowhere", async ({ page }) => {
  await load(page, "?dur=3000ms%20linear");
  const ind = indicator(page, "none");
  await expect(ind).toHaveCSS("visibility", "hidden");
  await page.getByTestId("n1").click();
  await expect(ind).toHaveCSS("visibility", "visible");
  await expectUnder(page, "none");
  await page.getByTestId("n1").click();
  await expect(ind).toHaveCSS("visibility", "hidden");
});

test("the actions area is not part of the tabs", async ({ page }) => {
  await load(page);
  await expect(page.getByTestId("actions").locator(".tab-actions .tab-indicator")).toHaveCount(0);
  await expect(page.getByTestId("actions").locator(".tab-indicator")).toHaveCount(1);
  await expectUnder(page, "actions");
  const i = await box(indicator(page, "actions"));
  const a = await box(page.getByTestId("action"));
  expect(i.right).toBeLessThan(a.left);
});

test("unmounting the TabBar cleans up without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await load(page);
  await page.getByRole("button", { name: "toggle unmount" }).click();
  await expect(page.getByTestId("unmount")).toHaveCount(0);
  await page.getByTestId("b").click();
  await page.getByRole("button", { name: "toggle unmount" }).click();
  await expect(page.getByTestId("unmount").locator(".tab-indicator")).toHaveCount(1);
  expect(errors).toEqual([]);
});
