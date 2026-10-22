import { test, expect, type Page } from "@playwright/test";

/**
 * Type that follows a component's width (the fluid-font-size() mixin):
 * 1.25px for every 100px either side of 420px, never under the floor for
 * its kind of text, held at its set size on a phone. Text you type into
 * stays at 16px on a touch screen, where iOS would otherwise zoom.
 */

const URL = "/svelte-contain-css/tests/fluid-type";

const px = (s: string) => parseFloat(s);

/** The font sizes of a Card's regions, and the width its type slides on. */
const card = (page: Page, id: string) =>
  page
    .getByTestId(id)
    .locator(".card")
    .evaluate((c) => {
      const fs = (sel: string) => {
        const e = c.querySelector(`:scope > ${sel}`);
        return e ? parseFloat(getComputedStyle(e).fontSize) : NaN;
      };
      return {
        width: c.clientWidth,
        root: parseFloat(getComputedStyle(c).fontSize),
        header: fs("header"),
        body: fs("section"),
        footer: fs("footer"),
      };
    });

const expected = (
  base: number,
  width: number,
  floor: number,
  maxScale: number,
  anchor = 420,
) =>
  Math.min(
    Math.max(base + (width - anchor) * 0.0125, Math.min(floor, base)),
    base * maxScale,
  );

test.describe("on a wide screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(URL);
  });

  for (const w of [250, 420, 1000]) {
    test(`a ${w}px Card's text follows its width`, async ({ page }) => {
      const c = await card(page, `card-${w}`);
      expect(c.body).toBeCloseTo(expected(c.root, c.width, 14, 1.25), 1);
      expect(c.header).toBeCloseTo(expected(c.root, c.width, 14, 1.25), 1);
      // the footer starts a step under the body: --card-footer-font-size, 0.875em
      expect(c.footer).toBeCloseTo(
        expected(c.root * 0.875, c.width, 12, 1.25),
        1,
      );
    });
  }

  test("a narrow Card stops at the floors: 14px body, 12px footer", async ({
    page,
  }) => {
    const c = await card(page, "card-250");
    expect(c.body).toBe(14);
    expect(c.footer).toBe(12);
  });

  test("a Card's footer is a step under its body at every width", async ({
    page,
  }) => {
    for (const w of [250, 420, 1000]) {
      const c = await card(page, `card-${w}`);
      expect(c.footer, `${w}px card`).toBeLessThan(c.body);
    }
  });

  test("a Tile at its 192px default keeps its text; wider reads larger, narrower smaller", async ({
    page,
  }) => {
    const tile = (id: string) =>
      page
        .getByTestId(`tile-${id}`)
        .locator(".tile")
        .evaluate((t) => ({
          width: t.clientWidth,
          root: parseFloat(getComputedStyle(t).fontSize),
          text: parseFloat(getComputedStyle(t.querySelector("p")!).fontSize),
          title: parseFloat(getComputedStyle(t.querySelector("h3")!).fontSize),
        }));
    const d = await tile("default");
    expect(d.text).toBe(d.root);
    const wide = await tile("wide");
    expect(wide.text).toBeCloseTo(
      expected(wide.root, wide.width, 14, 1.25, d.width),
      1,
    );
    expect(wide.text).toBeGreaterThan(d.text);
    expect(wide.title).toBeGreaterThan(d.title);
    const narrow = await tile("narrow");
    expect(narrow.text).toBeCloseTo(
      expected(narrow.root, narrow.width, 14, 1.25, d.width),
      1,
    );
    expect(narrow.text).toBeLessThan(d.text);
  });

  test("a wide Card grows to 1.25x at most", async ({ page }) => {
    const c = await card(page, "card-1000");
    expect(c.body).toBe(c.root * 1.25);
  });

  test("--card-font-size-slope: 0 turns the scale off", async ({ page }) => {
    const c = await card(page, "card-no-slope");
    expect(c.body).toBe(c.root);
  });

  test("text designed under the floor stays the size it was designed", async ({
    page,
  }) => {
    const c = await card(page, "card-designed-small");
    expect(c.body).toBe(11);
  });

  test("a fixed-height Card scrolls its body, not itself", async ({ page }) => {
    // fixedHeight is set from `height` once the page hydrates
    const fixed = page.getByTestId("card-fixed").locator(".card.fixedHeight");
    await expect(fixed).toBeVisible();
    const r = await fixed.evaluate((c) => {
      const box = c.getBoundingClientRect();
      const footer = c
        .querySelector(":scope > footer")!
        .getBoundingClientRect();
      const body = c.querySelector(":scope > section")!;
      return {
        cardScrolls: c.scrollHeight > c.clientHeight,
        bodyScrolls: body.scrollHeight > body.clientHeight,
        footerInside: footer.bottom <= box.bottom + 0.5,
      };
    });
    expect(r).toEqual({
      cardScrolls: false,
      bodyScrolls: true,
      footerInside: true,
    });
  });

  test("a narrow DataList tightens to its floors; a wide one doesn't grow", async ({
    page,
  }) => {
    const sizes = (id: string) =>
      page.getByTestId(id).evaluate((e) => ({
        title: parseFloat(getComputedStyle(e.querySelector("h4")!).fontSize),
        line: parseFloat(
          getComputedStyle(e.querySelector(".main p")!).fontSize,
        ),
      }));
    const wide = await sizes("list-1000");
    const narrow = await sizes("list-200");
    expect(narrow.title).toBe(14);
    expect(narrow.line).toBe(12);
    expect(wide.title).toBe(16);
    expect(wide.line).toBe(px("14.4px"));
  });
});

test("on a phone, a Card's body and header keep their size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL);
  const c = await card(page, "card-250");
  expect(c.body).toBe(c.root);
  expect(c.header).toBe(c.root);
  expect(c.footer).toBeLessThan(c.root);
});

test.describe("on a touch screen", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test("text you type into stays at 16px inside smaller text", async ({
    page,
  }) => {
    await page.goto(URL);
    const controls = page.getByTestId("small-controls");
    for (const sel of ["input", "select"]) {
      const fs = await controls
        .locator(sel)
        .first()
        .evaluate((e) => getComputedStyle(e).fontSize);
      expect(fs).toBe("16px");
    }
  });
});
