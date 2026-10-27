import { expect, test, type Page } from "@playwright/test";

/**
 * Text fields are findable on any surface by default: the fill is a step
 * lighter than the local surface (white on white, where the edge does the
 * work) and the edge is mixed from the local pair to at least 3:1
 * (WCAG 1.4.11). Fixtures: /svelte-contain-css/tests/fields
 */

type Probe = { field: number[]; ground: number[]; edge: number[]; widths: string[]; styles: string[] };

async function probe(page: Page, testid: string, selector = "input"): Promise<Probe> {
  return page.evaluate(
    ([id, sel]) => {
      const scope = document.querySelector(`[data-testid="${id}"]`)!;
      const field = scope.querySelector(sel) as HTMLElement;
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d")!;
      const px = (color: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
      };
      // The nearest ancestor that paints an opaque background.
      let el: HTMLElement | null = field.parentElement;
      let ground = "rgb(255, 255, 255)";
      while (el) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && !bg.endsWith(", 0)") && bg !== "transparent") { ground = bg; break; }
        el = el.parentElement;
      }
      const s = getComputedStyle(field);
      return {
        field: px(s.backgroundColor),
        ground: px(ground),
        edge: px(s.borderBottomColor),
        widths: [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth],
        styles: [s.borderTopStyle, s.borderRightStyle, s.borderBottomStyle, s.borderLeftStyle],
      };
    },
    [testid, selector] as const,
  );
}

const lum = (rgb: number[]) =>
  rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a: number[], b: number[]) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const same = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]) <= 1);

test.describe("fields", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/fields");
    await page.waitForLoadState("networkidle");
  });

  for (const id of ["page", "container", "card", "dark", "bar"]) {
    test(`a field on the ${id} is findable with no theme`, async ({ page }) => {
      const p = await probe(page, id);
      // Lighter than the surface, or white already.
      expect(lum(p.field), `fill ${p.field} on ground ${p.ground}`).toBeGreaterThanOrEqual(lum(p.ground));
      if (!same(p.ground, [255, 255, 255])) expect(same(p.field, p.ground)).toBe(false);
      expect(contrast(p.edge, p.ground)).toBeGreaterThanOrEqual(3);
      expect(p.styles).toEqual(["solid", "solid", "solid", "solid"]);
    });
  }

  test("a select is a field too", async ({ page }) => {
    const p = await probe(page, "select", "select, .dropdown-menu > button");
    expect(lum(p.field)).toBeGreaterThan(lum(p.ground));
    expect(contrast(p.edge, p.ground)).toBeGreaterThanOrEqual(3);
  });

  test("--field-bg and --field-border-color pin the field", async ({ page }) => {
    const p = await probe(page, "pinned");
    expect(p.field).toEqual([255, 255, 255]);
    expect(p.edge).toEqual([0, 0, 200]);
  });

  test("a component shorthand still wins", async ({ page }) => {
    const p = await probe(page, "shorthand");
    expect(p.widths).toEqual(["2px", "2px", "2px", "2px"]);
    expect(p.styles).toEqual(["dashed", "dashed", "dashed", "dashed"]);
    expect(p.edge).toEqual([200, 0, 0]);
  });

  test("--field-lighten: 0 with --field-fill-amount gives a darker well", async ({ page }) => {
    const p = await probe(page, "well");
    expect(lum(p.field)).toBeLessThan(lum(p.ground));
  });

  test("--field-square-radius rounds every field alike", async ({ page }) => {
    const radii = await page.evaluate(() =>
      [...document.querySelectorAll('[data-testid="radius"] :is(input, textarea, select, .dropdown-menu > button)')].map(
        (el) => getComputedStyle(el).borderTopLeftRadius,
      ),
    );
    expect(radii.length).toBeGreaterThanOrEqual(2);
    expect(new Set(radii)).toEqual(new Set(["0px"]));
  });

  test("two knobs make an underline field", async ({ page }) => {
    const p = await probe(page, "underline");
    expect(p.styles).toEqual(["none", "none", "solid", "none"]);
  });

  test("a TextArea is a field like Input", async ({ page }) => {
    const p = await probe(page, "textarea", "textarea");
    expect(lum(p.field)).toBeGreaterThan(lum(p.ground));
    expect(contrast(p.edge, p.ground)).toBeGreaterThanOrEqual(3);
  });

  test("a TextArea in a FormItem takes the row, and grows", async ({ page }) => {
    const box = () =>
      page.evaluate(() => {
        const t = document.querySelector('[data-testid="global"] textarea')!;
        const r = t.getBoundingClientRect();
        // Out to the item's (empty) `after` slot; a side-layout label still
        // sits beside it.
        const item = t.closest(".form-item")!;
        const after = item.querySelector(".after")!.getBoundingClientRect().left;
        return [after - parseFloat(getComputedStyle(item).columnGap) - r.right, r.height];
      });
    const [gap, height] = await box();
    expect(Math.abs(gap)).toBeLessThanOrEqual(1);
    await page.locator('[data-testid="global"] textarea').fill("1\n2\n3\n4\n5\n6\n7");
    const [, taller] = await box();
    expect(taller).toBeGreaterThan(height);
  });

  test("globalInputStyles styles text inputs, not a slider", async ({ page }) => {
    const text = await probe(page, "global", "input:not([type])");
    expect(text.styles).toEqual(["solid", "solid", "solid", "solid"]);
    const slider = await probe(page, "global", 'input[type="range"]');
    expect(slider.styles).toEqual(["none", "none", "none", "none"]);
  });

  test("hover firms up the edge", async ({ page }) => {
    const field = page.locator('[data-testid="container"] input');
    const rest = await probe(page, "container");
    await field.hover();
    await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
    const hovered = await probe(page, "container");
    expect(contrast(hovered.edge, hovered.ground)).toBeGreaterThan(contrast(rest.edge, rest.ground));
  });

  test("a MenuList takes the surface of the Sidebar it sits in", async ({ page }) => {
    const [menu, item, sidebar] = await page.evaluate(() => {
      const scope = document.querySelector('[data-testid="sidebar"]')!;
      const bg = (sel: string) => getComputedStyle(scope.querySelector(sel)!).backgroundColor;
      document.getAnimations().forEach((a) => a.finish());
      return [bg(".menu"), bg(".menu button"), bg("aside .content")];
    });
    expect(menu).toBe(sidebar);
    expect(item).toBe(sidebar);
  });
});
