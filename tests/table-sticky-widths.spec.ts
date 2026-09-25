import { expect, test, type Locator } from "@playwright/test";

/**
 * Column-width syncing for <Table sticky> with a thead.
 *
 * The sticky variant renders the header and the body as two separate <table>
 * elements and has to make them look like one, so it measures a hidden clone
 * and writes a shared <colgroup>. It used to clone head and body as two
 * independent tables and fold them with Math.max(), blending two unrelated
 * layouts into a column set that was wider than either -- and it measured that
 * clone with `position: fixed`, i.e. against the viewport rather than the
 * table's own container.
 *
 * To debug these tests, run the dev server and visit:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/table-sticky-widths
 */

const PATH = "/svelte-contain-css/tests/table-sticky-widths";

async function colWidths(section: Locator, table: string): Promise<number[]> {
  // Scope to .scrolling-table: the hidden measuring clone is a sibling, and
  // must never be what an assertion accidentally measures.
  return section
    .locator(`.scrolling-table > table.${table} > colgroup > col`)
    .evaluateAll((cols) =>
      cols.map((c) => parseFloat(getComputedStyle(c).width)),
    );
}

async function cellWidths(section: Locator, selector: string) {
  return section
    .locator(selector)
    .evaluateAll((cells) =>
      cells.map((c) => (c as HTMLElement).getBoundingClientRect().width),
    );
}

test.describe("Sticky table column widths", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
    await page.waitForLoadState("networkidle");
  });

  for (const name of ["narrow", "wide", "colspan"]) {
    test(`${name}: header and body colgroups agree`, async ({ page }) => {
      const section = page.getByTestId(name);
      const head = await colWidths(section, "fixed-table-head");
      const body = await colWidths(section, "scrolling-table-body");

      expect(head.length).toBeGreaterThan(0);
      expect(body.length).toBe(head.length);
      // Sub-pixel: both colgroups are written from the same array, but each
      // table resolves them against its own fixed layout.
      head.forEach((w, i) => {
        expect(Math.abs(w - body[i])).toBeLessThanOrEqual(1);
      });
    });

    test(`${name}: header cells line up with body cells`, async ({ page }) => {
      const section = page.getByTestId(name);
      const headCells = await cellWidths(
        section,
        ".scrolling-table > table.fixed-table-head > thead > tr:last-child > th",
      );
      const bodyCells = await cellWidths(
        section,
        ".scrolling-table > table.scrolling-table-body > tbody > tr:first-child > td",
      );

      expect(headCells.length).toBe(bodyCells.length);
      headCells.forEach((w, i) => {
        expect(Math.abs(w - bodyCells[i])).toBeLessThanOrEqual(1);
      });
    });
  }

  /* The contract, and the assertion that actually catches the old bug: a
     sticky table must lay out like the same table would if it weren't sticky.
     The reference sections render identical content in a plain <Table> inside
     an identical 600px frame, so the browser's own answer is the expectation.

     The old code measured a `position: fixed` clone, whose containing block is
     the viewport, so it sized these tables for 1280px and ignored the 600px
     frame entirely -- the wide table came out 1229px where the browser wants
     910px, i.e. ~320px of overflow that nothing asked for. */
  for (const name of ["narrow", "wide"]) {
    test(`${name}: matches a plain table in the same container`, async ({
      page,
    }) => {
      const sticky = await colWidths(
        page.getByTestId(name),
        "fixed-table-head",
      );
      const reference = await page
        .getByTestId(`${name}-reference`)
        .locator("table > tbody > tr:first-child > td")
        .evaluateAll((cells) =>
          cells.map((c) => (c as HTMLElement).getBoundingClientRect().width),
        );

      expect(sticky.length).toBe(reference.length);
      sticky.forEach((w, i) => {
        expect(Math.abs(w - reference[i])).toBeLessThanOrEqual(2);
      });
    });
  }

  test("a table that fits its container does not overflow it", async ({
    page,
  }) => {
    const section = page.getByTestId("narrow");
    const widths = await colWidths(section, "fixed-table-head");
    const total = widths.reduce((a, b) => a + b, 0);
    const available = await section.evaluate((el) => el.clientWidth);

    expect(total).toBeLessThanOrEqual(available);
  });

  test("a table too wide for its container is still allowed to overflow", async ({
    page,
  }) => {
    const section = page.getByTestId("wide");
    const available = await section.evaluate((el) => el.clientWidth);
    const scrollWidth = await section.evaluate((el) => el.scrollWidth);

    // Measuring in normal flow means "lay out like the browser would", which
    // includes overflowing when the content genuinely cannot be squeezed. It
    // must not silently crush columns to fit.
    expect(scrollWidth).toBeGreaterThan(available);
  });

  test("re-syncs when the container resizes", async ({ page }) => {
    // The clone lays out in normal flow, so it is the *container* it responds
    // to. The old fixed-position clone only ever saw the viewport, which meant
    // a table in a resizable pane or a collapsing sidebar never re-measured.
    const section = page.getByTestId("wide");
    const width = () =>
      section
        .locator(".scrolling-table > table.fixed-table-head")
        .evaluate((el) => (el as HTMLElement).style.width);

    const before = await width();
    await section.evaluate((el) => {
      (el as HTMLElement).style.width = "1100px";
    });
    await expect.poll(width).not.toBe(before);
    expect(parseFloat(await width())).toBeLessThanOrEqual(1100);
  });

  test("column widths are proportional to content, not evenly divided", async ({
    page,
  }) => {
    // Guards the colspan case: a full-width toolbar row must not be used as
    // the ruler, which would hand every column an identical width.
    const widths = await colWidths(
      page.getByTestId("colspan"),
      "fixed-table-head",
    );
    const unique = new Set(widths.map((w) => Math.round(w)));
    expect(unique.size).toBeGreaterThan(1);
  });
});
