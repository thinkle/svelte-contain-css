import { expect, test, type Page } from "@playwright/test";

/**
 * Heading foreground contract: exact fg vs. tint of the inherited
 * foreground, precedence, amount, --heading-tint-scale, surface following,
 * and Text inside transparent/filled headings. See docs/headings.md.
 * Fixtures: /svelte-contain-css/tests/heading-colors
 */

type Prop = "color" | "backgroundColor" | "borderBottomColor";

// Rasterize any computed color (color-mix() comes back as color(srgb ...))
// to 0-255 rgb.
async function rgb(
  page: Page,
  testid: string,
  selector: string,
  prop: Prop = "color",
): Promise<number[]> {
  return page.evaluate(
    ([id, sel, p]) => {
      const scope = document.querySelector(`[data-testid="${id}"]`);
      const el = scope?.querySelector(sel);
      if (!el) throw new Error(`not found: ${id} ${sel}`);
      const value = getComputedStyle(el)[p as "color"];
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    },
    [testid, selector, prop] as const,
  );
}

const mix = (a: number[], b: number[], share: number) =>
  a.map((v, i) => v + (b[i] - v) * share);

function expectNear(actual: number[], expected: number[], tol = 2) {
  const ok = actual.every((v, i) => Math.abs(v - expected[i]) <= tol);
  expect(ok, `${actual} ≈ ${expected.map(Math.round)}`).toBe(true);
}

const TILE_FG = [20, 20, 20];
const DARK_FG = [240, 240, 240];
const RED = [200, 0, 0];
const GREEN = [0, 128, 0];
const BLUE = [0, 0, 200];
const WHITE = [255, 255, 255];
const INDIGO_600 = [57, 73, 171]; // default --primary-color

test.describe("heading colors", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/heading-colors");
    await page.waitForLoadState("networkidle");
  });

  test("default theme tints 60% toward --primary-color from the surface fg", async ({
    page,
  }) => {
    expectNear(await rgb(page, "default", "h2"), mix(TILE_FG, INDIGO_600, 0.6));
  });

  test("no tint inherits the surface foreground", async ({ page }) => {
    expectNear(await rgb(page, "untinted", "h2"), TILE_FG);
  });

  test("amount: 0% keeps fg, 100% reaches target, unset reaches target", async ({
    page,
  }) => {
    expectNear(await rgb(page, "amount-0", "h2"), TILE_FG);
    expectNear(await rgb(page, "amount-50", "h2"), mix(TILE_FG, RED, 0.5));
    expectNear(await rgb(page, "amount-100", "h2"), RED);
    expectNear(await rgb(page, "amount-unset", "h2"), RED);
  });

  test("one tint follows light, dark, remapped and wrapped foregrounds", async ({
    page,
  }) => {
    expectNear(await rgb(page, "surfaces", ".light h2"), mix(TILE_FG, RED, 0.5));
    expectNear(await rgb(page, "surfaces", ".dark h2"), mix(DARK_FG, RED, 0.5));
    // fg remapped 100% to white by the surface's own mix controls
    expectNear(await rgb(page, "surfaces", ".remapped h2"), mix(WHITE, RED, 0.5));
    // a plain wrapper that only sets `color`
    expectNear(await rgb(page, "surfaces", ".wrapper h2"), mix(BLUE, RED, 0.5));
  });

  test("precedence: most specific step wins; exact beats tint within a step", async ({
    page,
  }) => {
    expectNear(await rgb(page, "precedence", "h1"), GREEN); // shared exact
    expectNear(await rgb(page, "precedence", "h2"), RED); // level tint > shared exact
    expectNear(await rgb(page, "precedence", "h5"), BLUE); // group tint > shared exact
    expectNear(await rgb(page, "precedence", "h6"), [128, 0, 128]); // level exact
    expectNear(await rgb(page, "exact-over-tint", "h3"), GREEN);
    // --tile-heading-tint beats the global --heading-2-fg, as before
    expectNear(await rgb(page, "component-scope", "h2"), RED);
  });

  test("--heading-tint-scale declines tints only", async ({ page }) => {
    expectNear(await rgb(page, "scale", "h1"), GREEN); // exact untouched
    expectNear(await rgb(page, "scale", "h2"), TILE_FG); // tint declined
    // the surface's own bg mix still applies
    expectNear(
      await rgb(page, "scale", ".tile", "backgroundColor"),
      [125, 125, 125],
    );
    expectNear(await rgb(page, "scale", ".half h2"), mix(TILE_FG, RED, 0.5));
  });

  test("a nested surface honours its own ingredients", async ({ page }) => {
    expectNear(await rgb(page, "nested", "h2.outer"), RED);
    expectNear(await rgb(page, "nested", "h2.inner"), BLUE);
  });

  test("Text in a filled heading is grounded on that heading", async ({
    page,
  }) => {
    expectNear(await rgb(page, "text", "h1"), WHITE);
    const spans = "h1 span";
    const [danger, muted] = await Promise.all([
      rgb(page, "text", `${spans}:nth-of-type(1)`),
      rgb(page, "text", `${spans}:nth-of-type(2)`),
    ]);
    expectNear(danger, mix(WHITE, RED, 0.5));
    expectNear(muted, mix(WHITE, [0, 0, 120], 0.2));
  });

  test("Text in a transparent heading matches Text in the surface", async ({
    page,
  }) => {
    for (const n of [1, 2]) {
      expectNear(
        await rgb(page, "text", `h2 span:nth-of-type(${n})`),
        await rgb(page, "text", `p span:nth-of-type(${n})`),
      );
    }
    expectNear(
      await rgb(page, "text", "h2 span:nth-of-type(1)"),
      mix(TILE_FG, RED, 0.5),
    );
  });

  test("--heading-*-text-amount softens tones in that level only", async ({
    page,
  }) => {
    expectNear(await rgb(page, "text-amount", "h1 span"), mix(WHITE, RED, 0.2));
    expectNear(await rgb(page, "text-amount", "h2 span"), mix(TILE_FG, RED, 0.5));
  });

  test("decoration color is independent of the heading color", async ({
    page,
  }) => {
    expectNear(await rgb(page, "text", "h2"), TILE_FG);
    expectNear(await rgb(page, "text", "h2", "borderBottomColor"), [0, 160, 0]);
  });
});
