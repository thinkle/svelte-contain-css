import { expect, test, type Page } from "@playwright/test";

/**
 * Per-channel color mixing via color-props (--bg-mix-color/-amount,
 * --fg-mix-color/-amount). Fixtures live at /svelte-contain-css/tests/color-mix.
 *
 * To debug: npm run dev, then visit
 *   http://localhost:5173/svelte-contain-css/tests/color-mix
 */

// Resolve any computed CSS color (rgb, color(srgb ...), oklab, hex, ...) to
// [r,g,b] 0-255 by rasterizing on a 1x1 canvas — getComputedStyle returns
// color-mix() results in color(srgb ...) float form, which a naive parser
// would mishandle.
async function rgbOf(
  page: Page,
  testid: string,
  selector: string,
  prop: "backgroundColor" | "color",
): Promise<[number, number, number]> {
  return page.evaluate(
    ([id, sel, p]) => {
      const el = document
        .querySelector(`[data-testid="${id}"]`)
        ?.querySelector(sel);
      if (!el) throw new Error(`not found: ${id} ${sel}`);
      const value = getComputedStyle(el)[p as "backgroundColor" | "color"];
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#000";
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b] as [number, number, number];
    },
    [testid, selector, prop] as const,
  );
}

const near = (a: number[], b: number[], tol = 2) =>
  a.every((v, i) => Math.abs(v - b[i]) <= tol);
const lum = ([r, g, b]: number[]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

test.describe("color-props color mixing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/color-mix");
    await page.waitForLoadState("networkidle");
  });

  test("0% mix is a no-op: variant colors match the un-mixed baseline", async ({
    page,
  }) => {
    // Guards the `tag` fallback added to Tag's variant chains from shifting
    // variant colors when no mix is set.
    for (const variant of [".tag.danger", ".tag.success"]) {
      const baseBg = await rgbOf(page, "baseline", variant, "backgroundColor");
      const zeroBg = await rgbOf(page, "zero-mix", variant, "backgroundColor");
      const baseFg = await rgbOf(page, "baseline", variant, "color");
      const zeroFg = await rgbOf(page, "zero-mix", variant, "color");
      expect(near(zeroBg, baseBg), `${variant} bg`).toBe(true);
      expect(near(zeroFg, baseFg), `${variant} fg`).toBe(true);
    }
  });

  test("background-only mix changes bg but leaves fg untouched", async ({
    page,
  }) => {
    const baseBg = await rgbOf(page, "baseline", ".tag.danger", "backgroundColor");
    const baseFg = await rgbOf(page, "baseline", ".tag.danger", "color");
    const mixBg = await rgbOf(page, "bg-only", ".tag.danger", "backgroundColor");
    const mixFg = await rgbOf(page, "bg-only", ".tag.danger", "color");

    expect(near(mixBg, baseBg), "bg should change").toBe(false);
    expect(lum(mixBg)).toBeLessThan(lum(baseBg)); // mixed toward black => darker
    expect(near(mixFg, baseFg), "fg should be untouched").toBe(true);
  });

  test("foreground-only mix changes fg but leaves bg untouched", async ({
    page,
  }) => {
    const baseBg = await rgbOf(page, "baseline", ".tag.danger", "backgroundColor");
    const baseFg = await rgbOf(page, "baseline", ".tag.danger", "color");
    const mixBg = await rgbOf(page, "fg-only", ".tag.danger", "backgroundColor");
    const mixFg = await rgbOf(page, "fg-only", ".tag.danger", "color");

    expect(near(mixBg, baseBg), "bg should be untouched").toBe(true);
    expect(near(mixFg, baseFg), "fg should change").toBe(false);
    expect(near(mixFg, [255, 255, 255]), "fg mixed 100% white => white").toBe(true);
  });

  test("component-level mix remaps every variant at once", async ({ page }) => {
    for (const variant of [".button.primary", ".button.danger", ".button.success"]) {
      const def = await rgbOf(page, "btn-default", variant, "backgroundColor");
      const remapped = await rgbOf(page, "btn-remapped", variant, "backgroundColor");
      const fg = await rgbOf(page, "btn-remapped", variant, "color");
      expect(near(remapped, def), `${variant} bg remapped`).toBe(false);
      expect(lum(remapped)).toBeLessThan(lum(def)); // toward black => darker
      expect(near(fg, [255, 255, 255]), `${variant} text white`).toBe(true);
    }
  });

  test("hover affordance derives from the MIXED base, not the original color", async ({
    page,
  }) => {
    // Regression for the affordance interaction: _affordances computes hover
    // bg from --_background-color. Because the mix is folded into that var,
    // hovering a remapped-dark button must stay dark (a slight brightening of
    // the mixed color) — not jump back toward the original bright hue.
    const rest = await rgbOf(page, "btn-remapped", ".button.primary", "backgroundColor");
    const original = await rgbOf(page, "btn-default", ".button.primary", "backgroundColor");

    await page
      .locator('[data-testid="btn-remapped"] .button.primary')
      .hover();
    const hover = await rgbOf(page, "btn-remapped", ".button.primary", "backgroundColor");

    // Hover should be close to the (dark) rest color, and nowhere near the
    // bright original — assert it's far closer to rest than to original.
    const distToRest = Math.abs(lum(hover) - lum(rest));
    const distToOriginal = Math.abs(lum(hover) - lum(original));
    expect(distToRest).toBeLessThan(distToOriginal);
  });
});
