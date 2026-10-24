import { expect, test, type Locator } from "@playwright/test";

async function pixels(locator: Locator, pseudo: string | null = null) {
  return locator.evaluate((el, pseudo) => {
    const context = document.createElement("canvas").getContext("2d")!;
    context.fillStyle = getComputedStyle(el, pseudo).color;
    context.fillRect(0, 0, 1, 1);
    return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
  }, pseudo);
}

function near(actual: number[], expected: number[]) {
  expect(actual.every((v, i) => Math.abs(v - expected[i]) <= 1), `${actual} ≈ ${expected}`).toBe(true);
}

test("link and drop-letter tints follow each surrounding foreground", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/contextual-accents");
  // A 10% accent leaves 90% of the local foreground, on both dark and light surfaces.
  near(await pixels(page.getByTestId("primary-bar").locator("a").first()), [235, 237, 247]);
  near(await pixels(page.getByTestId("nested-surface").locator("p").first().locator("a")), [235, 237, 247]);
  near(await pixels(page.getByTestId("inner-surface").locator("a")), [36, 38, 48]);
  near(await pixels(page.getByTestId("nested-surface").locator("p").first(), "::first-letter"), [235, 237, 247]);
  near(await pixels(page.getByTestId("inner-surface").locator("p"), "::first-letter"), [36, 38, 48]);
});

test("exact link/first-letter overrides and a custom tint target still work", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/contextual-accents");
  near(await pixels(page.getByTestId("global-exact").locator("a")), [0, 128, 0]);
  near(await pixels(page.getByTestId("component-exact").locator("a")), [255, 204, 0]);
  near(await pixels(page.getByTestId("surface-exact").locator("a")), [128, 0, 128]);
  near(await pixels(page.getByTestId("custom-target").locator("a")), [255, 191, 191]);
  near(await pixels(page.getByTestId("custom-target").locator("p"), "::first-letter"), [0, 255, 0]);
});

for (const theme of ["light", "dark", "material", "bootstrap", "retro", "purple", "canyon-modern-serif-fancy", "forest-editorial-rounded", "dark-ibm-layered", "light-airy-solid"]) {
  test(`${theme}: primary bar links stay readable`, async ({ page }) => {
    await page.goto(`/svelte-contain-css/review/${theme}/app/blog-mockup`);
    await page.waitForLoadState("networkidle");
    const link = page.locator(".page header a").first();
    const measureContrast = () => link.evaluate(el => {
      const context = document.createElement("canvas").getContext("2d")!;
      const luminance = (color: string) => {
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        const channels = Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3).map(v => {
          v /= 255;
          return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        return channels.reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
      };
      const fg = luminance(getComputedStyle(el).color);
      const bg = luminance(getComputedStyle(el.closest(".bar")!).backgroundColor);
      return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
    });
    expect(await measureContrast()).toBeGreaterThanOrEqual(4.5);
    await link.hover();
    expect(await measureContrast()).toBeGreaterThanOrEqual(4.5);
    await link.focus();
    expect(await measureContrast()).toBeGreaterThanOrEqual(4.5);
  });
}

for (const width of [1440, 390]) {
  test(`blog sidebar fills its panel without margin overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/svelte-contain-css/review/light/app/blog-mockup");
    await page.waitForLoadState("networkidle");
    const sidebar = page.locator("aside.sidebar");
    if (width === 390) {
      await expect(sidebar.locator('[data-audit-action="toggle-sidebar-sheet"]')).toHaveAttribute("aria-expanded", "false");
      await sidebar.locator('[data-audit-action="toggle-sidebar-sheet"]').click();
      await expect(sidebar.locator('[data-audit-action="toggle-sidebar-sheet"]')).toHaveAttribute("aria-expanded", "true");
    }
    const panel = sidebar.locator(":scope > .content");
    await expect.poll(() => panel.evaluate(el => el.scrollHeight - el.clientHeight)).toBeLessThanOrEqual(1);
    const gap = await panel.locator(".stack").evaluate(el => {
      const stack = el.getBoundingClientRect();
      const last = el.lastElementChild!.getBoundingClientRect();
      return stack.bottom - last.bottom;
    });
    expect(gap).toBeCloseTo(16, 0);
  });
}
