import { test, expect, type Page } from "@playwright/test";

/**
 * TextLayout's two widths: the prose inside it (p, headings) keeps the
 * reading measure, --line-width, while anything else placed in its flow --
 * a demo, a table, a figure -- breaks out to the wider column,
 * --text-layout-wide-width. It used to cap its whole box at --line-width,
 * which squeezed every non-prose child down to 42rem.
 */

const URL = "/svelte-contain-css/tests/text-layout-breakout";

type Box = { left: number; right: number; width: number; top: number; bottom: number };

async function box(page: Page, selector: string): Promise<Box> {
  return page.locator(selector).first().evaluate((e) => {
    const r = e.getBoundingClientRect();
    return { left: r.left, right: r.right, width: r.width, top: r.top, bottom: r.bottom };
  });
}

/** --line-width and the TextLayout's content box, in px. (A TextLayout
 *  handed --vars is itself inside a svelte-css-wrapper.) */
async function layout(page: Page, id: string) {
  const tl = page
    .getByTestId(id)
    .locator(":scope > div, :scope > svelte-css-wrapper > div");
  return tl.evaluate((tl) => {
    const cs = getComputedStyle(tl);
    const r = tl.getBoundingClientRect();
    const probe = document.createElement("div");
    probe.style.width = "var(--line-width)";
    tl.append(probe);
    const lineWidth = probe.getBoundingClientRect().width;
    probe.remove();
    return {
      lineWidth,
      contentLeft: r.left + parseFloat(cs.paddingLeft),
      contentRight: r.right - parseFloat(cs.paddingRight),
    };
  });
}

test.describe("at 1400px", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(URL);
  });

  test("p and h2 stay at --line-width, centred", async ({ page }) => {
    const { lineWidth } = await layout(page, "default");
    expect(lineWidth).toBe(672);
    const p = await box(page, '[data-testid="default"] p');
    const h2 = await box(page, '[data-testid="default"] h2');
    for (const b of [p, h2]) {
      expect(b.width).toBeCloseTo(lineWidth, 0);
      expect(b.left).toBeCloseTo((1400 - lineWidth) / 2, 0);
    }
  });

  test("a non-prose child gets the wide column", async ({ page }) => {
    const { contentLeft, contentRight, lineWidth } = await layout(page, "default");
    const fig = await box(page, '[data-testid="plain-figure"]');
    // 72rem box, minus its padding.
    expect(contentRight - contentLeft).toBeGreaterThan(lineWidth + 100);
    expect(fig.left).toBeCloseTo(contentLeft, 0);
    expect(fig.right).toBeCloseTo(contentRight, 0);
  });

  test("...including a component inside a svelte-css-wrapper", async ({ page }) => {
    const wrapped = page.getByTestId("wrapped-figure");
    // The precondition: Svelte really did wrap it.
    expect(
      await wrapped.evaluate((e) => !!e.closest("svelte-css-wrapper")),
    ).toBe(true);
    const { contentLeft, contentRight, lineWidth } = await layout(page, "default");
    const c = await wrapped.evaluate((e) => {
      const r = e.closest("svelte-css-wrapper")!.firstElementChild!.getBoundingClientRect();
      return { left: r.left, right: r.right, width: r.width };
    });
    expect(c.width).toBeGreaterThan(lineWidth + 100);
    expect(c.left).toBeCloseTo(contentLeft, 0);
    expect(c.right).toBeCloseTo(contentRight, 0);
  });

  test("a DemoWithCode gets the wide column too", async ({ page }) => {
    const { contentLeft, contentRight, lineWidth } = await layout(page, "default");
    const demo = await box(page, '[data-testid="default"] .demo-with-code');
    expect(demo.width).toBeGreaterThan(lineWidth + 100);
    expect(demo.left).toBeCloseTo(contentLeft, 0);
    expect(demo.right).toBeCloseTo(contentRight, 0);
  });

  test("there is a gap between a figure and the heading after it", async ({ page }) => {
    const demo = await box(page, '[data-testid="default"] .demo-with-code');
    const h3 = await box(page, '[data-testid="after-demo"]');
    expect(h3.top - demo.bottom).toBeGreaterThanOrEqual(24);
  });

  test("figure spacing reaches a wrapped Table", async ({ page }) => {
    const margin = await page
      .locator('[data-testid="default"] svelte-css-wrapper > .table-scroll')
      .evaluate((e) => getComputedStyle(e).marginTop);
    expect(parseFloat(margin)).toBeGreaterThanOrEqual(24);
  });

  test("an explicit margin beats the figure spacing", async ({ page }) => {
    const margin = await page
      .locator('[data-testid="default"] section:has(> .demo-with-code)')
      .nth(1)
      .evaluate((e) => getComputedStyle(e).marginTop);
    expect(margin).toBe("5px");
  });

  test("a table that is not a direct child is not spaced as a figure", async ({ page }) => {
    const margin = await page
      .locator('[data-testid="nested"] .table-scroll')
      .evaluate((e) => getComputedStyle(e).marginTop);
    expect(margin).toBe("0px");
  });

  test("a code block keeps the measure and scrolls", async ({ page }) => {
    const { lineWidth } = await layout(page, "default");
    const pre = page.getByTestId("pre");
    const { width, scroll, client } = await pre.evaluate((e) => ({
      width: e.getBoundingClientRect().width,
      scroll: e.scrollWidth,
      client: e.clientWidth,
    }));
    expect(width).toBeCloseTo(lineWidth, 0);
    expect(scroll).toBeGreaterThan(client);
  });

  test("--prose-margin-inline: 0 left-aligns the prose in the wide column", async ({ page }) => {
    const { contentLeft, lineWidth } = await layout(page, "left");
    const p = await box(page, '[data-testid="left"] p');
    const h2 = await box(page, '[data-testid="left"] h2');
    const fig = await box(page, '[data-testid="left"] .figure');
    expect(p.left).toBeCloseTo(contentLeft, 0);
    expect(h2.left).toBeCloseTo(contentLeft, 0);
    expect(p.width).toBeCloseTo(lineWidth, 0);
    expect(fig.left).toBeCloseTo(contentLeft, 0);
    expect(fig.width).toBeGreaterThan(lineWidth + 100);
  });

  test('marginInline="0 auto" start-aligns the text; the column stays centred', async ({ page }) => {
    const { contentLeft, lineWidth } = await layout(page, "margin-prop");
    const col = await box(page, '[data-testid="margin-prop"] .figure');
    const p = await box(page, '[data-testid="margin-prop"] p');
    const h2 = await box(page, '[data-testid="margin-prop"] h2');
    const host = await box(page, '[data-testid="margin-prop"]');
    expect(p.left).toBeCloseTo(contentLeft, 0);
    expect(h2.left).toBeCloseTo(contentLeft, 0);
    expect(p.width).toBeCloseTo(lineWidth, 0);
    // the wide column is still centred in its container
    expect(Math.abs((col.left - host.left) - (host.right - col.right))).toBeLessThan(2);
  });

  test("--heading-margin-inline still sets headings apart from the prose", async ({ page }) => {
    const { contentLeft } = await layout(page, "heading-apart");
    const p = await box(page, '[data-testid="heading-apart"] p');
    const h2 = await box(page, '[data-testid="heading-apart"] h2');
    expect(p.left).toBeCloseTo(contentLeft, 0);
    expect(h2.left).toBeGreaterThan(contentLeft + 100);
  });

  test("--text-layout-wide-width: 100% fills the container", async ({ page }) => {
    const fig = await box(page, '[data-testid="full"] .figure');
    const { contentLeft, contentRight } = await layout(page, "full");
    // The parent has 40px of padding each side; TextLayout its own 8px.
    expect(contentLeft).toBeCloseTo(48, 0);
    expect(contentRight).toBeCloseTo(1400 - 48, 0);
    expect(fig.left).toBeCloseTo(contentLeft, 0);
    expect(fig.right).toBeCloseTo(contentRight, 0);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(1400);
  });

  test("a very wide table grows to the wide column, then scrolls", async ({ page }) => {
    const { contentLeft, contentRight } = await layout(page, "wide-table");
    const strip = page.locator('[data-testid="wide-table"] .table-scroll');
    const m = await strip.evaluate((e) => ({
      left: e.getBoundingClientRect().left,
      right: e.getBoundingClientRect().right,
      scroll: e.scrollWidth,
      client: e.clientWidth,
    }));
    expect(m.left).toBeCloseTo(contentLeft, 0);
    expect(m.right).toBeCloseTo(contentRight, 0);
    expect(m.scroll).toBeGreaterThan(m.client);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(1400);
  });
});

test.describe("at 390px", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(URL);
  });

  test("a very wide table scrolls inside itself, not the page", async ({ page }) => {
    const strip = page.locator('[data-testid="wide-table"] .table-scroll');
    const { scroll, client } = await strip.evaluate((e) => ({
      scroll: e.scrollWidth,
      client: e.clientWidth,
    }));
    expect(scroll).toBeGreaterThan(client);
    const { doc, inner } = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      inner: window.innerWidth,
    }));
    expect(doc).toBeLessThanOrEqual(inner);
  });

  test("prose and figures share the narrow column", async ({ page }) => {
    const { contentLeft, contentRight } = await layout(page, "default");
    const p = await box(page, '[data-testid="default"] p');
    const fig = await box(page, '[data-testid="plain-figure"]');
    expect(p.left).toBeCloseTo(contentLeft, 0);
    expect(p.right).toBeCloseTo(contentRight, 0);
    expect(fig.left).toBeCloseTo(contentLeft, 0);
    expect(fig.right).toBeCloseTo(contentRight, 0);
  });
});
