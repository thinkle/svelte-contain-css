import { expect, test, type Page } from "@playwright/test";

/**
 * Exact colors keyed by color family (--on-<family>-*), mixing everywhere
 * else. See docs/color-families.md.
 * Fixtures: /svelte-contain-css/tests/color-families
 */

async function rgb(page: Page, testid: string, selector: string): Promise<number[]> {
  return page.evaluate(
    ([id, sel]) => {
      const scope = document.querySelector(`[data-testid="${id}"]`);
      const el = sel ? scope?.querySelector(sel) : scope;
      if (!el) throw new Error(`not found: ${id} ${sel}`);
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = getComputedStyle(el).color;
      ctx.fillRect(0, 0, 1, 1);
      return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    },
    [testid, selector] as const,
  );
}

const mix = (a: number[], b: number[], share: number) =>
  a.map((v, i) => v + (b[i] - v) * share);

function near(actual: number[], expected: number[], tol = 2) {
  const ok = actual.every((v, i) => Math.abs(v - expected[i]) <= tol);
  expect(ok, `${actual} ≈ ${expected.map(Math.round)}`).toBe(true);
}

const SURFACE_FG = [20, 20, 20];
const DARK_FG = [240, 240, 240];
const WHITE = [255, 255, 255];
const BRAND = [0, 51, 160];
const RED = [200, 0, 0];
const LINK = [0, 0, 200];

test.describe("color families", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/color-families");
    await page.waitForLoadState("networkidle");
  });

  test("a surface in its compiled family uses that family's pins", async ({ page }) => {
    near(await rgb(page, "surface", "a"), BRAND);
    near(await rgb(page, "surface", "span"), [150, 0, 30]);
    near(await rgb(page, "surface", "h2"), BRAND);
  });

  test("a raw background belongs to no family and mixes", async ({ page }) => {
    for (const id of ["raw", "context-raw"]) {
      near(await rgb(page, id, "a"), mix(DARK_FG, LINK, 0.1));
      near(await rgb(page, id, "span"), mix(DARK_FG, RED, 0.5));
      near(await rgb(page, id, "h2"), mix(DARK_FG, RED, 0.5));
    }
  });

  test("nested surfaces reset and restore", async ({ page }) => {
    near(await rgb(page, "nested", ".outer a"), mix(DARK_FG, LINK, 0.1));
    near(await rgb(page, "nested", ".inner a"), BRAND);
    near(await rgb(page, "nested", ".inner span"), [150, 0, 30]);
    near(await rgb(page, "nested", ".card h2"), BRAND);
  });

  test("pins fall back down the neutral ladder", async ({ page }) => {
    near(await rgb(page, "raised", "a"), BRAND);
    near(await rgb(page, "raised-pinned", "a"), [0, 128, 0]);
  });

  test("role sugar and a role context resolve alike", async ({ page }) => {
    for (const id of ["sugar", "context-role"]) {
      near(await rgb(page, id, "a"), [255, 255, 0]);
      // no on-primary danger pin: mixes from the bar's own foreground
      near(await rgb(page, id, "span"), mix(WHITE, RED, 0.5));
    }
    near(await rgb(page, "role-tile", "h2"), WHITE);
    near(await rgb(page, "role-tile", "h3"), WHITE);
  });

  test("an unpinned role mixes, and its headings decline the tint", async ({ page }) => {
    near(await rgb(page, "role-unpinned", "a"), mix(WHITE, LINK, 0.1));
    near(await rgb(page, "role-unpinned", "h2"), WHITE);
  });

  test("a raw background on top of a role context mixes", async ({ page }) => {
    near(await rgb(page, "role-raw", "a"), mix(DARK_FG, LINK, 0.1));
  });

  test("a band's headings take the band's foreground inside a TextLayout", async ({ page }) => {
    near(await rgb(page, "band-in-prose", "h2.prose"), BRAND);
    near(await rgb(page, "band-in-prose", "header h3"), WHITE);
    near(await rgb(page, "band-in-prose", "h3.bar"), DARK_FG);
  });

  test("--current-bg/-fg are the nearest colored element's pair, controls included", async ({ page }) => {
    near(await rgb(page, "current-button", ".bg"), BRAND);
    near(await rgb(page, "current-button", ".fg"), WHITE);
  });

  test("a button given the bar's --current-* blends in, and passes them on", async ({ page }) => {
    const button = await page.getByTestId("current-blend").locator("button").evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(button).toMatch(/^(rgb\(40, 40, 40\)|color\(srgb 0\.156\d* 0\.156\d* 0\.156\d*\))$/);
    near(await rgb(page, "current-blend", ".bg"), [40, 40, 40]);
  });
});
