import { expect, test } from "@playwright/test";

/**
 * Sidebar overlay mode and external expand/collapse control.
 *
 * Two behaviors are covered:
 *
 * 1. `overlay` -- by default the wide sidebar widens its aside as it opens,
 *    which reflows the page content. With `overlay` the panel floats above the
 *    content at every width, so the content box must not move. An overlay
 *    sidebar also swaps the grab-bar rail for the sheet button and starts
 *    shut: a panel that opens over your content unbidden, or a rail floating
 *    on top of content waiting to be grabbed, are both wrong affordances.
 * 2. `bind:expanded` -- the open/closed state is one bindable prop, so a
 *    caller's own button and the sidebar's built-in toggle must stay in
 *    sync in both directions.
 *
 * To debug these tests, run the dev server and visit:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/sidebar-overlay
 */

const ROUTE = "/svelte-contain-css/tests/sidebar-overlay";

test.describe("Sidebar overlay mode", () => {
  test("the default sidebar reflows the page content when it collapses", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const content = page.getByTestId("push-page-content");
    const rail = page
      .getByTestId("push-sidebar")
      .locator('[data-audit-action="toggle-sidebar-rail"]');

    await expect(rail).toHaveAttribute("aria-expanded", "true");
    const open = await content.boundingBox();

    await rail.click();
    await expect(rail).toHaveAttribute("aria-expanded", "false");
    const closed = await content.boundingBox();

    // The aside gave back the panel's width, so the content grew and its left
    // edge moved back towards the page edge.
    expect(closed!.width).toBeGreaterThan(open!.width + 100);
    expect(closed!.x).toBeLessThan(open!.x - 100);
  });

  test("an overlay sidebar uses the sheet button, not the rail, and starts shut", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("overlay-sidebar");
    const sheet = sidebar.locator('[data-audit-action="toggle-sidebar-sheet"]');
    const rail = sidebar.locator('[data-audit-action="toggle-sidebar-rail"]');
    const panel = sidebar.locator("div.content");

    // A rail you have to grab while it floats over the content is the wrong
    // affordance for an overlay, so overlay mode hides it.
    await expect(rail).toBeHidden();
    await expect(sheet).toBeVisible();

    // And it must not start open on top of the content.
    await expect(sheet).toHaveAttribute("aria-expanded", "false");
    expect(await panel.evaluate((el) => getComputedStyle(el).opacity)).toBe("0");
  });

  test("an overlay sidebar leaves the page content where it is", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const content = page.getByTestId("overlay-page-content");
    const sheet = page
      .getByTestId("overlay-sidebar")
      .locator('[data-audit-action="toggle-sidebar-sheet"]');

    await expect(sheet).toHaveAttribute("aria-expanded", "false");
    const shut = await content.boundingBox();

    await sheet.click();
    await expect(sheet).toHaveAttribute("aria-expanded", "true");
    const open = await content.boundingBox();

    expect(Math.abs(open!.width - shut!.width)).toBeLessThan(2);
    expect(Math.abs(open!.x - shut!.x)).toBeLessThan(2);
  });

  test("an open overlay panel covers the page content", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("overlay-sidebar");
    const panel = sidebar.locator("div.content");
    const content = page.getByTestId("overlay-page-content");

    await sidebar
      .locator('[data-audit-action="toggle-sidebar-sheet"]')
      .click();
    await expect(panel).toHaveCSS("opacity", "1");

    const panelBox = (await panel.boundingBox())!;
    const contentBox = (await content.boundingBox())!;

    // The panel is a real, laid-out box that horizontally overlaps the
    // content -- i.e. it is on top of it rather than beside it.
    expect(panelBox.width).toBeGreaterThan(100);
    expect(panelBox.x).toBeLessThan(contentBox.x + contentBox.width);
    expect(panelBox.x + panelBox.width).toBeGreaterThan(contentBox.x);

    // And it really is the topmost thing at that point.
    const hitsPanel = await panel.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const hit = document.elementFromPoint(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
      );
      return el.contains(hit);
    });
    expect(hitsPanel).toBe(true);
  });

  test("a right-hand overlay sidebar floats over the content from the right", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("overlay-right-sidebar");
    const panel = sidebar.locator("div.content");
    const content = page.getByTestId("overlay-right-page-content");
    const shell = page.getByTestId("overlay-right-section").locator(".page");

    await sidebar
      .locator('[data-audit-action="toggle-sidebar-sheet"]')
      .click();
    await expect(panel).toHaveCSS("opacity", "1");

    const panelBox = (await panel.boundingBox())!;
    const contentBox = (await content.boundingBox())!;
    const shellBox = (await shell.boundingBox())!;

    // Flush with the page's right edge...
    expect(
      Math.abs(panelBox.x + panelBox.width - (shellBox.x + shellBox.width)),
    ).toBeLessThan(4);
    // ...and overlapping the content rather than sitting beside it.
    expect(panelBox.x).toBeLessThan(contentBox.x + contentBox.width);
  });
});

test.describe("Sidebar external control", () => {
  test("a caller's button opens and closes the sidebar", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const rail = page
      .getByTestId("overlay-sidebar")
      .locator('[data-audit-action="toggle-sidebar-rail"]');
    const external = page.getByTestId("overlay-external-toggle");

    // Uncontrolled default: the wide rail starts open.
    await expect(rail).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("overlay-readout")).toHaveText("undefined");

    await external.click();
    await expect(rail).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByTestId("overlay-readout")).toHaveText("false");

    await external.click();
    await expect(rail).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("overlay-readout")).toHaveText("true");
  });

  test("the sidebar's own toggle writes back to the bound value", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const rail = page
      .getByTestId("push-sidebar")
      .locator('[data-audit-action="toggle-sidebar-rail"]');
    const readout = page.getByTestId("push-readout");

    await expect(readout).toHaveText("undefined");

    await rail.click();
    await expect(readout).toHaveText("false");

    await rail.click();
    await expect(readout).toHaveText("true");
  });

  test("the internal toggle and an external button share one state", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const rail = page
      .getByTestId("push-sidebar")
      .locator('[data-audit-action="toggle-sidebar-rail"]');
    const external = page.getByTestId("push-external-toggle");

    // Close from the outside, then reopen from the inside: the second click
    // must open rather than repeat the first, which is what would happen if
    // the two controls still had separate state.
    await external.click();
    await expect(rail).toHaveAttribute("aria-expanded", "false");

    await rail.click();
    await expect(rail).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("push-readout")).toHaveText("true");

    await external.click();
    await expect(rail).toHaveAttribute("aria-expanded", "false");
  });
});
