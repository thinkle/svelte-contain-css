import { expect, test, type Page } from "@playwright/test";

/**
 * The surface ladder needs only a page pair: raised and overlay step lighter,
 * sunken darker, so a theme that sets --bg/--fg (or just
 * --surface-bg) gets distinct tiers. Fixtures: /svelte-contain-css/tests/surface-ladder
 */

async function lightness(page: Page, testid: string, selector?: string) {
  return page.evaluate(
    ([id, sel]) => {
      let el = document.querySelector(`[data-testid="${id}"]`) as HTMLElement;
      if (sel) el = el.closest(sel) as HTMLElement;
      const probe = document.createElement("div");
      probe.style.color = `oklch(from ${getComputedStyle(el).backgroundColor} l c h)`;
      document.body.append(probe);
      const l = parseFloat(getComputedStyle(probe).color.match(/oklch\(([\d.]+)/)![1]);
      probe.remove();
      return l;
    },
    [testid, selector] as const,
  );
}

const bg = (page: Page, testid: string) =>
  page.getByTestId(testid).evaluate((el) => getComputedStyle(el).backgroundColor);

test.describe("surface ladder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/surface-ladder");
    await page.waitForLoadState("networkidle");
  });

  for (const id of ["dark", "light"]) {
    test(`on a ${id} pair the card and sidebar step off the surface`, async ({ page }) => {
      const surface = await lightness(page, `${id}-surface`);
      const card = await lightness(page, `${id}-card`);
      const sidebar = await lightness(page, `${id}-sidebar`, ".content");
      expect(card).toBeGreaterThan(surface);
      // Pure black has nothing darker: the sunken step reflects off it.
      if (id === "dark") expect(sidebar).toBeGreaterThan(surface);
      else expect(sidebar).toBeLessThan(surface);
    });
  }

  test("a local --surface-bg flows up to the cards inside it", async ({ page }) => {
    const card = await bg(page, "local-card");
    // Stepped off navy, not off the page: still a dark blue.
    const [r, g, b] = card.match(/[\d.]+/g)!.slice(0, 3).map(Number);
    expect(b).toBeGreaterThan(r);
    expect(b).toBeGreaterThan(g);
    expect(await lightness(page, "local-card")).toBeGreaterThan(await lightness(page, "local"));
  });

  test("a pinned tier wins", async ({ page }) => {
    expect(await bg(page, "pinned-card")).toMatch(/^(rgb\(255, 0, 0\)|color\(srgb 1 0 0\))$/);
  });

  test("a depth of 0 is the surface itself", async ({ page }) => {
    expect(await lightness(page, "flat-card")).toBeCloseTo(await lightness(page, "flat"), 3);
  });
});
