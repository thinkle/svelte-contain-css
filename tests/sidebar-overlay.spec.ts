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
 * 2. `bind:open` -- the open/closed state is one bindable prop, so a
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

test.describe("Sidebar sheet button placement", () => {
  /* The sheet button is absolutely positioned, and all of its geometry is
     naturally written from the left. On a right-hand sidebar the panel slides
     out of the RIGHT edge, so the button has to hug that edge and step
     inwards -- leftwards -- when it opens. Anchored from the left it stepped
     the other way and landed off the far side of the page, unclickable. */
  for (const [side, sectionId, sidebarId] of [
    ["left", "overlay-section", "overlay-sidebar"],
    ["right", "overlay-right-section", "overlay-right-sidebar"],
  ]) {
    test(`the ${side}-hand sheet button stays on the page, open and shut`, async ({
      page,
    }) => {
      await page.goto(ROUTE);
      await page.waitForLoadState("networkidle");

      const sidebar = page.getByTestId(sidebarId);
      const button = sidebar.locator(
        '[data-audit-action="toggle-sidebar-sheet"]',
      );
      const shell = page.getByTestId(sectionId).locator(".page").first();

      const shellBox = (await shell.boundingBox())!;
      const within = async () => {
        const b = (await button.boundingBox())!;
        return b.x >= shellBox.x - 1 && b.x + b.width <= shellBox.x + shellBox.width + 1;
      };

      expect(await within()).toBe(true);
      await button.click();
      await expect(sidebar.locator("div.content")).toHaveCSS("opacity", "1");
      expect(await within()).toBe(true);

      // Open, it sits flush against the panel's inner edge rather than
      // wandering off -- and fully inside it. Straddling the edge looks like
      // a mistake, and it desynchronises the button from the content inset
      // the panel reserves for it, leaving a dead gap before the first item.
      const b = (await button.boundingBox())!;
      const panel = (await sidebar.locator("div.content").boundingBox())!;
      const pokesOut =
        side === "left"
          ? b.x + b.width - (panel.x + panel.width)
          : panel.x - b.x;
      expect(pokesOut).toBeLessThanOrEqual(1);
      expect(pokesOut).toBeGreaterThan(-4);
    });
  }
});

test.describe("Sheet panel content", () => {
  for (const [side, sidebarId] of [
    ["left", "overlay-sidebar"],
    ["right", "overlay-right-sidebar"],
  ]) {
    test(`the ${side}-hand sheet keeps its content clear of the close button`, async ({
      page,
    }) => {
      await page.goto(ROUTE);
      await page.waitForLoadState("networkidle");

      const sidebar = page.getByTestId(sidebarId);
      const panel = sidebar.locator("div.content");
      await sidebar
        .locator('[data-audit-action="toggle-sidebar-sheet"]')
        .click();
      await expect(panel).toHaveCSS("opacity", "1");

      const r = await sidebar.evaluate((el) => {
        const p = el.querySelector("div.content")!;
        const button = el.querySelector("button")!;
        const first = p.firstElementChild!;
        const b = button.getBoundingClientRect();
        const f = first.getBoundingClientRect();
        const pr = p.getBoundingClientRect();
        return {
          overlaps: !(
            b.right <= f.left ||
            b.left >= f.right ||
            b.bottom <= f.top ||
            b.top >= f.bottom
          ),
          // Space is reserved on the inline axis, so the content still
          // starts at the top -- no blank band across a nav.
          topGap: f.top - pr.top,
        };
      });

      expect(r.overlaps).toBe(false);
      expect(r.topGap).toBeLessThan(20);
    });
  }
});

test.describe("Sidebar icons", () => {
  test("the rail and the sheet do not share a glyph by default", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const glyph = (loc: ReturnType<typeof page.locator>) =>
      loc.evaluate((el) => getComputedStyle(el, "::after").content);

    const rail = page
      .getByTestId("icons-section")
      .locator("aside.sidebar .edge-bar button");
    const sheet = page
      .getByTestId("icons-sheet-section")
      .locator("aside.sidebar > button");

    await expect(rail).toBeVisible();
    await expect(sheet).toBeVisible();

    const railGlyph = await glyph(rail);
    const sheetGlyph = await glyph(sheet);

    // A chevron says "slide out from this edge"; the menu glyph says "open a
    // panel". They are different affordances, so they must not look alike.
    expect(railGlyph).not.toBe(sheetGlyph);
    expect(sheetGlyph).toContain("\u2630");
  });

  test("rail and sheet glyphs can be set independently", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    await page.getByTestId("icons-section").evaluate((el) => {
      (el as HTMLElement).style.setProperty("--grab-bar-collapse", "'R'");
      (el as HTMLElement).style.setProperty("--sidebar-sheet-collapse", "'S'");
    });
    const rail = page
      .getByTestId("icons-section")
      .locator("aside.sidebar .edge-bar button");
    await expect
      .poll(() => rail.evaluate((el) => getComputedStyle(el, "::after").content))
      .toBe('"R"');
  });
});

test.describe("SidebarContainer", () => {
  test("lays the content beside the sidebar, not below it", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("sc").locator("aside.sidebar");
    const content = page.getByTestId("sc-content");

    const s = (await sidebar.boundingBox())!;
    const c = (await content.boundingBox())!;

    // Beside: the content starts at or after the sidebar's right edge, and
    // shares its vertical band rather than stacking under it.
    expect(c.x).toBeGreaterThanOrEqual(s.x + s.width - 2);
    expect(c.y).toBeLessThan(s.y + s.height);
  });

  test("gives the sidebar a container context and a height", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sc = page.getByTestId("sc");
    expect(await sc.evaluate((el) => getComputedStyle(el).containerType)).toBe(
      "inline-size",
    );
    expect(await sc.evaluate((el) => getComputedStyle(el).display)).toBe("flex");
    // Not clipped -- that is what makes an overlay sheet vanish in Container.
    expect(await sc.evaluate((el) => getComputedStyle(el).overflowX)).not.toBe(
      "hidden",
    );

    const box = (await sc.locator("aside.sidebar").boundingBox())!;
    expect(box.height).toBeGreaterThan(100);
  });
});

/**
 * `sticky`: the sheet follows the reader down a long page instead of
 * stretching to the height of its row, and scrolls its own content once it
 * reaches its max-height.
 */
test.describe("Sidebar sticky sheet", () => {
  const sheetButton = '[data-audit-action="toggle-sidebar-sheet"]';

  test("stays on screen while a tall row scrolls past it", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 700 });
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("sticky-right-sidebar");
    const button = sidebar.locator(sheetButton);
    const panel = sidebar.locator("div.content");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");

    // Scroll well into the 3000px row.
    await page.getByTestId("sticky-tall-content").evaluate((el) => {
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 1200);
    });

    const p = (await panel.boundingBox())!;
    const b = (await button.boundingBox())!;
    const viewport = page.viewportSize()!;
    // Resting near the viewport top, not 1200px above it.
    expect(p.y).toBeGreaterThanOrEqual(0);
    expect(p.y).toBeLessThan(40);
    // Its whole height is on screen, so whatever sits at its foot is reachable.
    expect(p.y + p.height).toBeLessThanOrEqual(viewport.height);
    // And the close button came with it.
    expect(b.y).toBeGreaterThanOrEqual(p.y);
    expect(b.y + b.height).toBeLessThan(p.y + p.height);
  });

  test("caps its height and scrolls its own content", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 700 });
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("sticky-right-sidebar");
    await sidebar.locator(sheetButton).click();
    const panel = sidebar.locator("div.content");

    const { clientHeight, scrollHeight, overflowY } = await panel.evaluate(
      (el) => ({
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        overflowY: getComputedStyle(el).overflowY,
      }),
    );
    expect(clientHeight).toBeLessThan(700);
    expect(scrollHeight).toBeGreaterThan(clientHeight);
    expect(overflowY).toBe("auto");
  });

  test("honours --sidebar-sheet-top and --sidebar-sheet-max-height", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 700 });
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("sticky-right-sidebar");
    await sidebar.evaluate((el) => {
      el.style.setProperty("--sidebar-sheet-top", "100px");
      el.style.setProperty("--sidebar-sheet-max-height", "300px");
    });
    await sidebar.locator(sheetButton).click();
    await page.getByTestId("sticky-tall-content").evaluate((el) => {
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 1200);
    });

    const p = (await sidebar.locator("div.content").boundingBox())!;
    expect(Math.round(p.y)).toBe(100);
    expect(Math.round(p.height)).toBe(300);
  });

  test("keeps the unstuck geometry: right sheet on the right, button on its inner edge", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    for (const id of ["sticky-right-sidebar", "sticky-left-sidebar"]) {
      const sidebar = page.getByTestId(id);
      const button = sidebar.locator(sheetButton);
      const panel = sidebar.locator("div.content");
      const right = id.includes("right");

      const shut = (await button.boundingBox())!;
      const aside = (await sidebar.boundingBox())!;
      // Shut, the button hugs the aside's outer edge.
      if (right) expect(Math.round(shut.x + shut.width)).toBe(Math.round(aside.x + aside.width));
      else expect(Math.round(shut.x)).toBe(Math.round(aside.x));

      await button.scrollIntoViewIfNeeded();
      await button.click();
      const p = (await panel.boundingBox())!;
      const b = (await button.boundingBox())!;

      // The sheet is anchored to the same outer edge, and spills towards the
      // content.
      if (right) {
        expect(Math.round(p.x + p.width)).toBe(Math.round(aside.x + aside.width));
        // The open button sits just inside the sheet's left (inner) edge.
        expect(Math.round(b.x)).toBe(Math.round(p.x));
      } else {
        expect(Math.round(p.x)).toBe(Math.round(aside.x));
        expect(Math.round(b.x + b.width)).toBe(Math.round(p.x + p.width));
      }
      await button.click();
    }
  });

  test("a shut sticky sheet does not hold a short row open", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const row = (await page.getByTestId("sticky-short-section").boundingBox())!;
    expect(Math.round(row.height)).toBe(60);
  });

  test("without sticky, the sheet still stretches to its row", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const sidebar = page.getByTestId("unstuck-sidebar");
    await sidebar.locator(sheetButton).click();
    const p = (await sidebar.locator("div.content").boundingBox())!;
    expect(Math.round(p.height)).toBe(1500);
  });
});

/**
 * sheetButton: "tab" (default) squares the toggle's corners on the side it
 * attaches to, so it reads as fastened to an edge. "button" rounds all four,
 * for a sheet that does not sit against one. Per-state control is by
 * --sidebar-sheet-expand-edge-radius / --sidebar-sheet-collapse-edge-radius.
 */
test.describe("Sidebar sheetButton", () => {
  // Polled: the button's own `clickable` transition animates the corners.
  const sheetButton = '[data-audit-action="toggle-sidebar-sheet"]';
  const corners = (page, testid: string) =>
    page
      .getByTestId(testid)
      .locator(sheetButton)
      .evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          tl: cs.borderTopLeftRadius,
          tr: cs.borderTopRightRadius,
          bl: cs.borderBottomLeftRadius,
          br: cs.borderBottomRightRadius,
        };
      });

  test("a right-hand tab squares its right corners shut, its left corners open", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");
    await expect.poll(() => corners(page, "sheet-button-tab")).toEqual({
      tl: "10px", bl: "10px", tr: "0px", br: "0px",
    });
    await page.getByTestId("sheet-button-tab").locator(sheetButton).click();
    await expect.poll(() => corners(page, "sheet-button-tab")).toEqual({
      tl: "0px", bl: "0px", tr: "10px", br: "10px",
    });
  });

  test('sheetButton="button" is round all round, shut and open', async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");
    const round = { tl: "10px", bl: "10px", tr: "10px", br: "10px" };
    await expect.poll(() => corners(page, "sheet-button-button")).toEqual(round);
    await page.getByTestId("sheet-button-button").locator(sheetButton).click();
    await expect.poll(() => corners(page, "sheet-button-button")).toEqual(round);
  });

  test("the per-state variable shapes one state and leaves the other", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");
    await expect.poll(() => corners(page, "sheet-button-per-state")).toEqual({
      tl: "10px", bl: "10px", tr: "10px", br: "10px",
    });
    await page.getByTestId("sheet-button-per-state").locator(sheetButton).click();
    await expect.poll(() => corners(page, "sheet-button-per-state")).toEqual({
      tl: "0px", bl: "0px", tr: "10px", br: "10px",
    });
  });
});
