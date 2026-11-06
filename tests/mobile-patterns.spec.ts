import { test, expect, devices, type Page } from "@playwright/test";

/**
 * Phone-sized checks of the layouts an app is built from, written the way a
 * consumer would write them (see src/routes/tests/mobile-patterns): no
 * breakpoints of their own, so whatever adapts is the library doing it.
 */

const URL = "/svelte-contain-css/tests/mobile-patterns";

const phone = devices["iPhone 13"];

async function box(page: Page, id: string) {
  const b = await page.getByTestId(id).first().boundingBox();
  if (!b) throw new Error(`no box for ${id}`);
  return b;
}

test.describe("on a phone", () => {
  test.use({
    viewport: phone.viewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState("networkidle");
  });

  test("a right-hand sidebar's closed sheet does not widen the page", async ({ page }) => {
    const { scroll, width } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      width: document.documentElement.clientWidth,
    }));
    expect(scroll).toBe(width);
  });

  test("the right-hand sheet still opens on screen", async ({ page }) => {
    await page.getByRole("button", { name: "Expand sidebar" }).click();
    const inbox = page.getByRole("button", { name: "Inbox" });
    await expect(inbox).toBeVisible();
    // The sheet slides in; wait for it to land.
    await expect
      .poll(async () => {
        const b = (await inbox.boundingBox())!;
        return b.x >= 0 && b.x + b.width <= phone.viewport.width;
      })
      .toBe(true);
  });

  test("Inline collapse stacks its children at full width", async ({ page }) => {
    const row = await box(page, "switcher");
    const a = await box(page, "switcher-a");
    const b = await box(page, "switcher-b");
    expect(b.y).toBeGreaterThan(a.y);
    expect(Math.round(a.width)).toBe(Math.round(row.width));
    expect(Math.round(b.width)).toBe(Math.round(row.width));
  });

  test("a plain Inline is unchanged: children keep their own width", async ({ page }) => {
    const row = await box(page, "plain-row");
    const a = await box(page, "plain-a");
    expect(a.width).toBeLessThan(row.width / 2);
  });

  test("buttons in a collapsed Inline go full width", async ({ page }) => {
    const row = await box(page, "actions");
    const cancel = await box(page, "cancel");
    // Within the button's own margin of the row's width.
    expect(cancel.width).toBeGreaterThan(row.width - 12);
  });

  test("buttons are a finger-sized 44px on a touch screen", async ({ page }) => {
    expect((await box(page, "cancel")).height).toBeGreaterThanOrEqual(44);
  });

  test("a dialog fits the screen", async ({ page }) => {
    await page.getByTestId("open-dialog").click();
    const d = page.locator("dialog[open]");
    await expect(d).toBeVisible();
    const b = (await d.boundingBox())!;
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width).toBeLessThanOrEqual(phone.viewport.width);
  });

  test("a dialog with content wider than the screen still fits it", async ({ page }) => {
    await page.getByTestId("open-wide-dialog").click();
    const d = page.locator("dialog[open]");
    await expect(d).toBeVisible();
    const b = (await d.boundingBox())!;
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width).toBeLessThanOrEqual(phone.viewport.width);
  });

  // Headless Chromium has no collapsing toolbar (100vh == 100dvh there), so
  // this guards the footer staying on screen, not the vh -> dvh switch itself.
  test("Page fills the viewport and its footer is on screen", async ({ page }) => {
    const height = await page.getByTestId("page").evaluate((el) => el.getBoundingClientRect().height);
    const dvh = await page.evaluate(() => {
      const probe = document.createElement("div");
      probe.style.height = "100dvh";
      document.body.append(probe);
      const h = probe.getBoundingClientRect().height;
      probe.remove();
      return h;
    });
    expect(Math.round(height)).toBe(Math.round(dvh));
    const footer = await box(page, "app-footer");
    expect(footer.y + footer.height).toBeLessThanOrEqual(dvh + 1);
  });

  test("a sticky table scrolls in its own box, not the page", async ({ page }) => {
    const pane = page.locator(".page > .side-by-side > .content");
    const sizes = await pane.evaluate((c) => ({ scroll: c.scrollWidth, width: c.clientWidth }));
    expect(sizes.scroll).toBe(sizes.width);
    const box = page.getByTestId("sticky-table").locator(".scrolling-table");
    const inner = await box.evaluate((b) => ({
      sw: b.scrollWidth, cw: b.clientWidth, sh: b.scrollHeight, ch: b.clientHeight,
    }));
    expect(inner.sw).toBeGreaterThan(inner.cw);
    expect(inner.sh).toBeGreaterThan(inner.ch);
  });

  test("the sticky header stays at the top of the table's box", async ({ page }) => {
    const box = page.getByTestId("sticky-table").locator(".scrolling-table");
    await box.scrollIntoViewIfNeeded();
    await box.evaluate((b) => (b.scrollTop = 400));
    const head = page.getByTestId("sticky-table").locator(".fixed-table-head");
    await expect
      .poll(async () => {
        const [h, b] = [(await head.boundingBox())!, (await box.boundingBox())!];
        return Math.round(h.y - b.y);
      })
      .toBe(0);
  });

  test("a lone grid column fills the row", async ({ page }) => {
    const grid = await box(page, "panel-grid");
    const panel = await box(page, "panel");
    expect(Math.round(panel.width)).toBe(Math.round(grid.width));
  });

  test("a grid of small items keeps their width", async ({ page }) => {
    const chips = page.getByTestId("chip");
    const first = (await chips.first().boundingBox())!;
    expect(Math.round(first.width)).toBe(100);
    const second = (await chips.nth(1).boundingBox())!;
    expect(Math.round(second.y)).toBe(Math.round(first.y));
  });

  test("a card has no side margin on a phone, unless it sets one", async ({ page }) => {
    const margin = (id: string) =>
      page.getByTestId(id).first().evaluate((e) => getComputedStyle(e).marginLeft);
    expect(await margin("card")).toBe("0px");
    expect(await margin("card-margin")).toBe("12px");
  });

  test("the dropdown trigger and the sheet button are finger-sized", async ({ page }) => {
    const trigger = page.getByTestId("more").locator("button").first();
    expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const sheet = (await page.getByRole("button", { name: "Expand sidebar" }).boundingBox())!;
    expect(sheet.height).toBeGreaterThanOrEqual(44);
    expect(sheet.width).toBeGreaterThanOrEqual(44);
  });

  test("checkbox, radio and toggle rows are at least 36px", async ({ page }) => {
    const heights = await page.evaluate(() =>
      [...document.querySelectorAll(".checkbox-item, label.radio-item:not(.invisible), .toggle")]
        .map((e) => e.getBoundingClientRect().height),
    );
    expect(heights.length).toBeGreaterThan(3);
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(36);
  });
});

test.describe("on an edge-to-edge phone (viewport-fit=cover)", () => {
  test.use({
    viewport: phone.viewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });

  const TOP = 47;
  const BOTTOM = 34;

  test.beforeEach(async ({ page, context }) => {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setSafeAreaInsetsOverride", {
      insets: { top: TOP, bottom: BOTTOM, left: 0, right: 0 },
    });
    await page.goto(URL);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      document.querySelector('meta[name="viewport"]')!.setAttribute(
        "content",
        "width=device-width, initial-scale=1, viewport-fit=cover",
      );
    });
  });

  test("the header bar's content clears the notch, its colour runs behind it", async ({ page }) => {
    const bar = await box(page, "app-bar");
    expect(Math.round(bar.y)).toBe(TOP);
    const strip = await page.getByTestId("app-bar").evaluate((el) => {
      const before = getComputedStyle(el, "::before");
      return { bg: before.backgroundColor, h: before.height, own: getComputedStyle(el).backgroundColor };
    });
    expect(strip.h).toBe(`${TOP}px`);
    expect(strip.bg).toBe(strip.own);
  });

  test("the footer's content clears the home indicator", async ({ page }) => {
    const footer = await box(page, "app-footer");
    const vh = await page.evaluate(() => innerHeight);
    expect(Math.round(footer.y + footer.height)).toBeLessThanOrEqual(vh - BOTTOM);
  });

  test("the sheet button sits in the header row, below the notch", async ({ page }) => {
    const sheet = (await page.getByRole("button", { name: "Expand sidebar" }).boundingBox())!;
    expect(sheet.y).toBeGreaterThanOrEqual(TOP);
  });
});

test.describe("on an ordinary phone (no safe-area insets)", () => {
  test.use({ viewport: phone.viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });

  test("Page adds no padding of its own", async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState("networkidle");
    const pads = await page.evaluate(() => {
      const p = document.querySelector(".page")!;
      const h = p.querySelector(":scope > header")!;
      const f = p.querySelector(":scope > footer")!;
      return [getComputedStyle(p).padding, getComputedStyle(h).paddingTop, getComputedStyle(f).paddingBottom];
    });
    expect(pads).toEqual(["0px", "0px", "0px"]);
    expect(Math.round((await box(page, "app-bar")).y)).toBe(0);
  });
});

test.describe("on a desktop", () => {
  test.use({ viewport: { width: 1200, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState("networkidle");
  });

  test("Inline collapse is an ordinary row", async ({ page }) => {
    const a = await box(page, "switcher-a");
    const b = await box(page, "switcher-b");
    expect(Math.round(b.y)).toBe(Math.round(a.y));
    expect(b.x).toBeGreaterThan(a.x + a.width - 1);
  });

  test("buttons keep their desktop height under a mouse", async ({ page }) => {
    expect((await box(page, "cancel")).height).toBeLessThan(44);
  });

  test("touch-only sizes stay off under a mouse", async ({ page }) => {
    const trigger = page.getByTestId("more").locator("button").first();
    expect((await trigger.boundingBox())!.height).toBeLessThan(44);
    const row = (await page.locator(".checkbox-item").first().boundingBox())!;
    expect(row.height).toBeLessThan(36);
  });

  test("a sticky table on a wide screen does not get a scroll box", async ({ page }) => {
    const overflow = await page
      .getByTestId("sticky-table")
      .locator(".scrolling-table")
      .evaluate((b) => getComputedStyle(b).overflowX);
    expect(overflow).toBe("visible");
  });

  test("a wide dialog is capped at --dialog-max-width, not the viewport", async ({ page }) => {
    await page.getByTestId("open-wide-dialog").click();
    const d = page.locator("dialog[open]");
    await expect(d).toBeVisible();
    expect((await d.boundingBox())!.width).toBeLessThanOrEqual(800);
  });
});
