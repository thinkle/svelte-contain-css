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

// The synced colgroup now lives only on the sticky header table; the body
// table is a plain auto-layout table that sizes itself.
async function colWidths(section: Locator): Promise<number[]> {
  return section
    .locator(".scrolling-table > table.fixed-table-head > colgroup > col")
    .evaluateAll((cols) =>
      cols.map((c) => parseFloat(getComputedStyle(c).width)),
    );
}

// Real body cells only: the body table also carries the collapsed header copy
// and the zero-height ruler row, neither of which is what we are checking.
const BODY_CELLS =
  ".scrolling-table > table.scrolling-table-body > tbody:not(.column-ruler) > tr:first-child > td";
const HEAD_CELLS =
  ".scrolling-table > table.fixed-table-head > thead > tr:last-child > th";

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
    test(`${name}: the two tables are the same width`, async ({ page }) => {
      const section = page.getByTestId(name);
      const width = (sel: string) =>
        section
          .locator(`.scrolling-table > table.${sel}`)
          .evaluate((el) => el.getBoundingClientRect().width);

      const head = await width("fixed-table-head");
      const body = await width("scrolling-table-body");
      expect(Math.abs(head - body)).toBeLessThanOrEqual(1);
    });

    test(`${name}: header cells line up with body cells`, async ({ page }) => {
      const section = page.getByTestId(name);
      const headCells = await cellWidths(section, HEAD_CELLS);
      const bodyCells = await cellWidths(section, BODY_CELLS);

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
      const sticky = await colWidths(page.getByTestId(name));
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
    const widths = await colWidths(section);
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

  test("re-syncs when columns are reordered without changing size", async ({
    page,
  }) => {
    /* The case a ResizeObserver on the table cannot see: the reorder leaves the
       table exactly as wide as before, so only the per-column widths move.
       Consumers used to work around this by remounting on a column-set key;
       this fixture deliberately does not. */
    const section = page.getByTestId("reorder");
    const headCells = () => cellWidths(section, HEAD_CELLS);
    const bodyCells = () => cellWidths(section, BODY_CELLS);
    const tableWidth = () =>
      section
        .locator(".scrolling-table > table.scrolling-table-body")
        .evaluate((el) => el.getBoundingClientRect().width);

    const before = await headCells();
    const widthBefore = await tableWidth();
    expect(before[0]).toBeGreaterThan(before[1]);

    await section.getByTestId("swap").click();

    // The widths must actually swap...
    await expect
      .poll(async () => (await headCells())[0] < (await headCells())[1])
      .toBe(true);

    // ...the table must not have changed size (otherwise this proves nothing)...
    expect(Math.abs((await tableWidth()) - widthBefore)).toBeLessThanOrEqual(1);

    // ...and the header must still line up with the body.
    const head = await headCells();
    const body = await bodyCells();
    expect(head.length).toBe(body.length);
    head.forEach((w, i) => {
      expect(Math.abs(w - body[i])).toBeLessThanOrEqual(1);
    });
  });

  test("the body is rendered once, the header twice", async ({ page }) => {
    // The point of the collapsed-header layout: only the header is duplicated.
    // The old measuring clone re-rendered every row, doubling the whole table.
    const section = page.getByTestId("narrow");
    await expect(section.getByText("Ada", { exact: true })).toHaveCount(1);
    await expect(
      section.locator(
        "table.scrolling-table-body > tbody:not(.column-ruler) > tr",
      ),
    ).toHaveCount(3);
    // Header twice: once visible and sticky, once collapsed inside the body table.
    await expect(section.locator("thead")).toHaveCount(2);
  });

  test("the collapsed header copy costs no vertical space", async ({
    page,
  }) => {
    const section = page.getByTestId("narrow");
    const headH = await section
      .locator("table.scrolling-table-body > thead")
      .evaluate((el) => el.getBoundingClientRect().height);
    expect(headH).toBe(0);

    // ...and the ruler row likewise.
    const rulerH = await section
      .locator("tbody.column-ruler")
      .evaluate((el) => el.getBoundingClientRect().height);
    expect(rulerH).toBe(0);
  });

  test("controls in the collapsed header copy are not focusable", async ({
    page,
  }) => {
    const section = page.getByTestId("interactive");
    const buttons = section.locator("table.scrolling-table-body thead button");
    await expect(buttons).toHaveCount(5); // they exist in the DOM...

    // ...but tabbing lands on the visible sticky header's buttons, never the
    // collapsed copy. visibility: collapse takes them out of the tab order.
    await section
      .locator("table.fixed-table-head thead button")
      .first()
      .focus();
    await page.keyboard.press("Tab");
    const inCollapsed = await page.evaluate(() => {
      const el = document.activeElement;
      return !!el?.closest("table.scrolling-table-body");
    });
    expect(inCollapsed).toBe(false);
  });

  test("column widths are proportional to content, not evenly divided", async ({
    page,
  }) => {
    // Guards the colspan case: a full-width toolbar row must not be used as
    // the ruler, which would hand every column an identical width.
    const widths = await colWidths(page.getByTestId("colspan"));
    const unique = new Set(widths.map((w) => Math.round(w)));
    expect(unique.size).toBeGreaterThan(1);
  });
});
