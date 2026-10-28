import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Horizontal scrolling and frozen columns for <Table sticky> with a thead.
 *
 * The regression: the sticky layout deliberately had no horizontal scroll
 * box (one would become the sticky header's scroll container), so a wide
 * table spilled into the nearest scrolling ancestor -- a Page's content
 * panel -- and the whole panel scrolled sideways instead of the table.
 * Each table now scrolls in its own strip(s), with the header's strip kept
 * in step with the body's, and `stickyColumns` freezes the leading columns.
 *
 * To debug these tests, run the dev server and visit:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/table-scroll-freeze
 */

const PATH = "/svelte-contain-css/tests/table-scroll-freeze";

const HEAD_CELLS = "table.fixed-table-head > thead > tr:last-child > th";
const BODY_CELLS =
  "table.scrolling-table-body > tbody:not(.column-ruler) > tr:first-child > *";

function lefts(section: Locator, selector: string) {
  return section
    .locator(selector)
    .evaluateAll((cells) =>
      cells.map((c) => (c as HTMLElement).getBoundingClientRect().left),
    );
}

async function addColumns(page: Page, times = 2) {
  for (let i = 0; i < times; i++) await page.getByTestId("more-columns").click();
  // The header's colgroup re-syncs a frame after the body re-lays out.
  const section = page.getByTestId("scroll");
  await expect
    .poll(async () => (await lefts(section, HEAD_CELLS)).length)
    .toBe(3 + 12 * times + 1);
}

function setScrollLeft(section: Locator, strip: string, x: number) {
  return section
    .locator(strip)
    .evaluate((el, x) => (el.scrollLeft = x), x);
}

function scrollLeftOf(section: Locator, strip: string) {
  return section.locator(strip).evaluate((el) => el.scrollLeft);
}

async function aligned(section: Locator) {
  const [head, body] = [
    await lefts(section, HEAD_CELLS),
    await lefts(section, BODY_CELLS),
  ];
  return (
    head.length === body.length &&
    head.every((x, i) => Math.abs(x - body[i]) <= 1)
  );
}

test.describe("Sticky table horizontal scroll", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.goto(PATH);
    await page.waitForLoadState("networkidle");
  });

  test("a table that fits does not scroll", async ({ page }) => {
    const strip = page.getByTestId("scroll").locator(".table-body-strip");
    const overflow = await strip.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("a wide table scrolls in its own strip, not the panel or page", async ({
    page,
  }) => {
    await addColumns(page);
    for (const id of ["scroll", "freeze"]) {
      const section = page.getByTestId(id);
      const strip = section.locator(".table-body-strip");
      expect(
        await strip.evaluate((el) => el.scrollWidth - el.clientWidth),
      ).toBeGreaterThan(100);
      // The panel (standing in for Page's content scroller) and the page
      // itself have nothing to scroll sideways.
      expect(
        await section.evaluate((el) => el.scrollWidth - el.clientWidth),
      ).toBeLessThanOrEqual(1);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
  });

  test("a wide table keeps its natural width, capping long cells", async ({
    page,
  }) => {
    await addColumns(page);
    const section = page.getByTestId("scroll");
    // Not squeezed: no header label wraps onto a second line.
    const wrapped = await section.locator(HEAD_CELLS).evaluateAll((cells) =>
      cells.filter((c) => {
        const range = document.createRange();
        range.selectNodeContents(c);
        const tops = new Set(
          Array.from(range.getClientRects()).map((r) => Math.round(r.top)),
        );
        return tops.size > 1;
      }).length,
    );
    expect(wrapped).toBe(0);
    // ...but a long note wraps at --table-cell-max-width (20em) rather than
    // stretching its column across the screen.
    const notes = await section
      .locator(`${BODY_CELLS}:last-child`)
      .evaluate((el) => el.getBoundingClientRect().width);
    expect(notes).toBeLessThanOrEqual(330);
  });

  test("scrolling the body strip carries the header with it", async ({
    page,
  }) => {
    await addColumns(page);
    const section = page.getByTestId("scroll");
    await setScrollLeft(section, ".table-body-strip", 500);
    await expect
      .poll(() => scrollLeftOf(section, ".table-head-strip"))
      .toBe(500);
    await expect.poll(() => aligned(section)).toBe(true);
    // The columns really did move: the first header cell is off to the left.
    const [first] = await lefts(section, HEAD_CELLS);
    const strip = await section
      .locator(".table-body-strip")
      .evaluate((el) => el.getBoundingClientRect().left);
    expect(first).toBeLessThan(strip - 100);
  });

  test("scrolling over the header scrolls the body too", async ({ page }) => {
    await addColumns(page);
    const section = page.getByTestId("scroll");
    const head = section.locator(".table-head-strip");
    const box = (await head.boundingBox())!;
    // A trackpad swipe / shift-wheel over the header.
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(300, 0);
    await expect
      .poll(() => scrollLeftOf(section, ".table-body-strip"))
      .toBeGreaterThan(0);
    await expect.poll(() => aligned(section)).toBe(true);
  });

  test("scrolled to the far end, header and body still line up", async ({
    page,
  }) => {
    await addColumns(page);
    const section = page.getByTestId("scroll");
    await setScrollLeft(section, ".table-body-strip", 100000);
    await expect
      .poll(async () =>
        Math.abs(
          (await scrollLeftOf(section, ".table-head-strip")) -
            (await scrollLeftOf(section, ".table-body-strip")),
        ),
      )
      .toBeLessThanOrEqual(1);
    await expect.poll(() => aligned(section)).toBe(true);
  });

  test("the header still sticks when the panel scrolls vertically", async ({
    page,
  }) => {
    await addColumns(page);
    const section = page.getByTestId("scroll");
    await setScrollLeft(section, ".table-body-strip", 300);
    await section.evaluate((el) => (el.scrollTop = 400));
    await expect
      .poll(() =>
        section.locator(".table-head-sticky").evaluate((el) => {
          const panel = el.closest("section")!;
          const expected =
            panel.getBoundingClientRect().top +
            panel.clientTop +
            parseFloat(getComputedStyle(panel).paddingTop) +
            parseFloat(getComputedStyle(el).top);
          return Math.abs(el.getBoundingClientRect().top - expected);
        }),
      )
      .toBeLessThanOrEqual(1);
    await expect.poll(() => aligned(section)).toBe(true);
  });
});

test.describe("Sticky table frozen columns", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.goto(PATH);
    await page.waitForLoadState("networkidle");
    await addColumns(page);
  });

  test("frozen columns hold still while the rest scroll", async ({ page }) => {
    const section = page.getByTestId("freeze");
    const headBefore = await lefts(section, HEAD_CELLS);
    const bodyBefore = await lefts(section, BODY_CELLS);

    await setScrollLeft(section, ".table-body-strip", 400);
    await expect
      .poll(() => scrollLeftOf(section, ".table-head-strip"))
      .toBe(400);

    const head = await lefts(section, HEAD_CELLS);
    const body = await lefts(section, BODY_CELLS);
    for (const i of [0, 1]) {
      // Within the 1px the frozen block is tucked under the strip's edge.
      expect(Math.abs(head[i] - headBefore[i])).toBeLessThanOrEqual(1.5);
      expect(Math.abs(body[i] - bodyBefore[i])).toBeLessThanOrEqual(1.5);
    }
    // An unfrozen column moved with the scroll...
    expect(head[5] - headBefore[5]).toBeCloseTo(-400, 0);
    expect(body[5] - bodyBefore[5]).toBeCloseTo(-400, 0);
    // ...and header and body agree on every column, frozen or not.
    expect(await aligned(section)).toBe(true);
  });

  test("frozen cells sit on top of the columns scrolling under them", async ({
    page,
  }) => {
    const section = page.getByTestId("freeze");
    // elementFromPoint only sees what is in the viewport.
    await section.evaluate((el) => el.scrollIntoView({ block: "start" }));
    await setScrollLeft(section, ".table-body-strip", 400);
    await expect
      .poll(() => scrollLeftOf(section, ".table-head-strip"))
      .toBe(400);
    for (const selector of [
      `${HEAD_CELLS}:nth-child(2)`,
      `${BODY_CELLS}:nth-child(2)`,
      "table.scrolling-table-body > tbody > tr:nth-child(3) > *:first-child",
    ]) {
      const onTop = await section.locator(selector).evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(
          r.left + r.width / 2,
          r.top + r.height / 2,
        );
        return el === hit || el.contains(hit);
      });
      expect(onTop, selector).toBe(true);
    }
  });

  test("a group header spanning the frozen block is frozen with it", async ({
    page,
  }) => {
    const section = page.getByTestId("freeze");
    const who = section.locator("table.fixed-table-head > thead > tr:first-child > th:first-child");
    const data = section.locator("table.fixed-table-head > thead > tr:first-child > th:nth-child(2)");
    await expect(who).toHaveAttribute("data-contain-frozen", "first edge");
    await expect(data).not.toHaveAttribute("data-contain-frozen", /.*/);
    const whoBefore = await who.evaluate((el) => el.getBoundingClientRect().left);
    await setScrollLeft(section, ".table-body-strip", 400);
    await expect
      .poll(() => scrollLeftOf(section, ".table-head-strip"))
      .toBe(400);
    const whoAfter = await who.evaluate((el) => el.getBoundingClientRect().left);
    expect(Math.abs(whoAfter - whoBefore)).toBeLessThanOrEqual(1.5);
  });

  test("frozen columns stay frozen in the sticky header on vertical scroll", async ({
    page,
  }) => {
    const section = page.getByTestId("freeze");
    await setScrollLeft(section, ".table-body-strip", 400);
    await section.evaluate((el) => (el.scrollTop = 500));
    await expect.poll(() => aligned(section)).toBe(true);
    const strip = await section
      .locator(".table-body-strip")
      .evaluate((el) => el.getBoundingClientRect().left);
    const [first] = await lefts(section, HEAD_CELLS);
    expect(Math.abs(first - strip)).toBeLessThanOrEqual(1.5);
  });

  test("rows added later are frozen too", async ({ page }) => {
    // More columns re-renders every row; the new cells must be marked.
    await page.getByTestId("more-columns").click();
    const section = page.getByTestId("freeze");
    await expect
      .poll(() =>
        section
          .locator(
            "table.scrolling-table-body > tbody:not(.column-ruler) > tr > [data-contain-frozen]",
          )
          .count(),
      )
      .toBe(40 * 2);
    // The unfrozen table is left alone.
    await expect(
      page.getByTestId("scroll").locator("[data-contain-frozen]"),
    ).toHaveCount(0);
  });
});
