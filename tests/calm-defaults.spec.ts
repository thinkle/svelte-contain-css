import { test, expect } from "@playwright/test";

/**
 * vars/calm.css: the structure every theme inherits. Elevation only for
 * things that float, one border per box, outlined checkboxes. Checked on
 * the bare defaults (tests/ fixtures load defaults.css and no theme).
 */

const PATTERNS = "/svelte-contain-css/tests/mobile-patterns";

/* A shadow that draws nothing: none, or every length zero. */
const flat = (shadow: string) =>
  shadow === "none" || shadow.replace(/color\([^)]*\)|rgba?\([^)]*\)/g, "").trim().split(/\s+/).every((t) => t === "0px");
/* Fully transparent, in whichever syntax the browser reports it. */
const transparent = (color: string) =>
  color === "transparent" || /rgba\(0, 0, 0, 0\)|\/ 0\)$/.test(color);

test.describe("calm defaults", () => {
  test.use({ viewport: { width: 1200, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(PATTERNS);
    await page.waitForLoadState("networkidle");
  });

  test("buttons and cards sit flat", async ({ page }) => {
    const shadow = (sel: string) =>
      page.locator(sel).first().evaluate((e) => getComputedStyle(e).boxShadow);
    expect(flat(await shadow("button.primary"))).toBe(true);
    expect(flat(await shadow(".card"))).toBe(true);
  });

  test("a dialog still floats", async ({ page }) => {
    await page.getByTestId("open-dialog").click();
    const shadow = await page.locator("dialog[open]").evaluate((e) => getComputedStyle(e).boxShadow);
    expect(flat(shadow)).toBe(false);
  });

  test("a card's header is divided by a hairline, not a tinted band", async ({ page }) => {
    const header = page.getByTestId("card").locator("header").first();
    const style = await header.evaluate((e) => {
      const cs = getComputedStyle(e);
      return { bg: cs.backgroundColor, border: cs.borderBottomWidth };
    });
    expect(transparent(style.bg)).toBe(true);
    expect(style.border).toBe("1px");
  });

  test("checking a box does not change its label's weight", async ({ page }) => {
    const label = page.getByTestId("agree").locator("xpath=ancestor::label").first();
    const before = await label.evaluate((e) => getComputedStyle(e).fontWeight);
    await label.click();
    const after = await label.evaluate((e) => getComputedStyle(e).fontWeight);
    expect(after).toBe(before);
  });

  test("an unchecked box is outlined on its surface, not filled grey", async ({ page }) => {
    const bg = await page
      .locator(".checkbox-item")
      .first()
      .evaluate((e) => getComputedStyle(e, "::before").backgroundColor);
    expect(transparent(bg)).toBe(true);
  });
});

test.describe("boxed checkboxes and radios", () => {
  test.use({ viewport: { width: 1200, height: 900 } });

  for (const [comp, id] of [
    ["Checkbox", "boxed-checkboxes"],
    ["RadioButton", "boxed-radios"],
  ] as const) {
    test(`${comp} boxed: the label is outlined, and the checked one takes the accent edge`, async ({ page }) => {
      await page.goto(`/svelte-contain-css/component/${comp}`);
      await page.waitForLoadState("networkidle");
      const labels = page.getByTestId(id).locator("label:not(.invisible)");
      const styles = await labels.evaluateAll((ls) =>
        ls.map((l) => {
          const cs = getComputedStyle(l);
          return { border: cs.borderTopWidth, color: cs.borderTopColor, pad: cs.paddingLeft };
        }),
      );
      expect(styles).toHaveLength(2);
      for (const s of styles) {
        expect(s.border).toBe("1px");
        expect(parseFloat(s.pad)).toBeGreaterThan(0);
      }
      // First option starts checked in the demo; its edge differs from the other's.
      expect(styles[0].color).not.toBe(styles[1].color);
    });
  }

  test("a boxed checkbox's check mark sits inside its box", async ({ page }) => {
    await page.goto(`/svelte-contain-css/component/Checkbox`);
    await page.waitForLoadState("networkidle");
    const label = page.getByTestId("boxed-checkboxes").locator(".checkbox-item").first();
    const pos = await label.evaluate((l) => {
      const before = getComputedStyle(l, "::before");
      const after = getComputedStyle(l, "::after");
      return {
        padLeft: parseFloat(getComputedStyle(l).paddingLeft),
        checkLeft: parseFloat(after.left),
        boxWidth: parseFloat(before.width),
      };
    });
    expect(pos.checkLeft).toBeGreaterThanOrEqual(pos.padLeft);
    expect(pos.checkLeft).toBeLessThan(pos.padLeft + pos.boxWidth);
  });
});
