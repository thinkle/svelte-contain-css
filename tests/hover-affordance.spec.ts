import { expect, test, type Page } from "@playwright/test";

/**
 * Hover must visibly change a control's background under the library
 * defaults. The hover mix used to default to white, which is invisible on
 * light surfaces, and color variants (CircleButton primary, ButtonLink
 * primary) re-applied their colors at a specificity that cancelled the
 * hover outright. Fixtures: /svelte-contain-css/tests/hover-affordance
 */

// Rasterize any computed color (color(srgb ...), oklab(...), rgb) to 0-255.
async function bgOf(page: Page, testid: string, selector: string) {
  return page.evaluate(
    ([id, sel]) => {
      const el = document
        .querySelector(`[data-testid="${id}"]`)
        ?.querySelector(sel);
      if (!el) throw new Error(`not found: ${id} ${sel}`);
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = getComputedStyle(el).backgroundColor;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b];
    },
    [testid, selector] as const,
  );
}

const lum = ([r, g, b]: number[]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const distance = (a: number[], b: number[]) =>
  a.reduce((sum, v, i) => sum + Math.abs(v - b[i]), 0);

async function restAndHover(page: Page, testid: string, selector: string) {
  const rest = await bgOf(page, testid, selector);
  await page.locator(`[data-testid="${testid}"] ${selector}`).first().hover();
  const hover = await bgOf(page, testid, selector);
  await page.mouse.move(0, 0);
  return { rest, hover };
}

test.describe("hover affordance under library defaults", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/hover-affordance");
    await page.waitForLoadState("networkidle");
  });

  const cases: [string, string][] = [
    ["button", "button"],
    ["button-primary", "button"],
    ["button-warning", "button"],
    ["link", "a"],
    ["link-primary", "a"],
    ["circle", "button"],
    ["circle-primary", "button"],
    ["circle-danger", "button"],
    ["menu-trigger", "nav > button"],
    ["primary-bar-trigger", "nav > button"],
  ];

  for (const [testid, selector] of cases) {
    test(`${testid}: hover changes the background`, async ({ page }) => {
      const { rest, hover } = await restAndHover(page, testid, selector);
      expect(
        distance(rest, hover),
        `rest ${rest} vs hover ${hover}`,
      ).toBeGreaterThanOrEqual(12);
    });
  }

  test("light controls darken on hover, dark ones lighten", async ({
    page,
  }) => {
    const light = await restAndHover(page, "button", "button");
    expect(lum(light.hover)).toBeLessThan(lum(light.rest));
    const dark = await restAndHover(page, "button-primary", "button");
    expect(lum(dark.hover)).toBeGreaterThan(lum(dark.rest));
  });

  test("an explicit --hover-color-mix still wins", async ({ page }) => {
    const { rest, hover } = await restAndHover(page, "forced-black", "button");
    expect(lum(hover)).toBeLessThan(lum(rest));
  });
});
