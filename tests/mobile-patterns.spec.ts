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

  test("a wide dialog is capped at --dialog-max-width, not the viewport", async ({ page }) => {
    await page.getByTestId("open-wide-dialog").click();
    const d = page.locator("dialog[open]");
    await expect(d).toBeVisible();
    expect((await d.boundingBox())!.width).toBeLessThanOrEqual(800);
  });
});
