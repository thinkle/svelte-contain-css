import { test, expect, type Locator } from "@playwright/test";

const url = "/svelte-contain-css/tests/tabbar-appearance";

// Normalize modern color() / color-mix() output to actual pixels, so matching
// a surface is checked independently of the CSS variable spelling.
async function rgba(el: Locator, property = "background-color") {
  return el.evaluate((node, property) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = getComputedStyle(node).getPropertyValue(property);
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data];
  }, property);
}

for (const palette of ["light", "dark"]) {
  test(`${palette}: the strip and selected tab match the local surface; inactive tabs are recessed`, async ({ page }) => {
    await page.goto(url);
  await page.waitForLoadState("networkidle");
    await page.getByLabel("Palette").selectOption(palette);
    for (const id of ["surface", "raised", "custom", "role"]) {
      const host = page.getByTestId(id);
      const surface = id === "raised" ? host.locator("section") : host;
      const strip = host.locator(".tabs .bar");
      const active = strip.getByRole("button", { name: "Demo", exact: true });
      const inactive = strip.getByRole("button", { name: "Source", exact: true });
      await expect.poll(() => rgba(strip)).toEqual(await rgba(surface));
      await expect.poll(() => rgba(active)).toEqual(await rgba(surface));
      expect(await rgba(inactive)).not.toEqual(await rgba(surface));
      expect(await rgba(active, "color")).toEqual(await rgba(surface, "color"));
      const size = await inactive.boundingBox();
      await inactive.click();
      await page.mouse.move(0, 0);
      await expect.poll(() => rgba(inactive)).toEqual(await rgba(surface));
      expect((await inactive.boundingBox())!.height).toBe(size!.height);
      // Every tab set shares this fixture's selection.
      await active.click();
      await page.mouse.move(0, 0);
    }
  });
}

test("explicit tab/strip colors and active borders still override the local defaults", async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  const tabs = page.getByTestId("tabs");
  await tabs.evaluate(el => el.style.cssText = "--tab-bar-bg: rgb(60, 70, 80); --tab-bg: rgb(90, 100, 110); --tab-active-bg: rgb(120, 130, 140); --tab-active-border-bottom: 3px solid red;");
  expect(await rgba(tabs.locator(".bar"))).toEqual([60, 70, 80, 255]);
  const active = tabs.getByRole("button", { name: "Demo", exact: true });
  await expect.poll(() => rgba(active)).toEqual([120, 130, 140, 255]);
  expect(await rgba(tabs.getByRole("button", { name: "Source", exact: true }))).toEqual([90, 100, 110, 255]);
  await expect(active).toHaveCSS("border-bottom-width", "3px");
});

test("underlined tabs are an optional preset and switching it off restores rounded recessed tabs", async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  const tabs = page.getByTestId("tabs");
  const active = tabs.getByRole("button", { name: "Demo", exact: true });
  await expect(active).not.toHaveCSS("border-top-left-radius", "0px");
  await page.getByLabel("Underlined Tabs", { exact: true }).check();
  await expect(active).toHaveCSS("border-top-left-radius", "0px");
  await expect(active).toHaveCSS("border-bottom-width", "2px");
  await expect.poll(() => rgba(tabs.getByRole("button", { name: "Source", exact: true }))).toEqual(await rgba(tabs.locator(".bar")));
  await page.getByLabel("Underlined Tabs", { exact: true }).uncheck();
  await expect(active).not.toHaveCSS("border-top-left-radius", "0px");
  await expect(active).toHaveCSS("border-bottom-width", "0px");
  // A complete theme's Button colors must not leak into tabs, including
  // the optional treatment on a consumer-defined dark surface.
  await page.getByLabel("Palette").selectOption("quiet");
  await page.getByLabel("Underlined Tabs", { exact: true }).check();
  const custom = page.getByTestId("custom");
  for (const name of ["Demo", "Source"]) {
    await expect.poll(() => rgba(custom.getByRole("button", { name, exact: true }))).toEqual(await rgba(custom));
  }
});

test("Quiet's explicit underline is honored", async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Palette").selectOption("quiet");
  await expect(page.getByTestId("tabs").getByRole("button", { name: "Demo", exact: true })).toHaveCSS("border-bottom-width", "2px");
});

test("a narrow tab strip scrolls without widening the page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  await page.getByTestId("tabs").evaluate(el => el.style.width = "180px");
  const bar = page.getByTestId("tabs").locator(".bar");
  await expect.poll(() => bar.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
