import { test, expect } from "@playwright/test";

const url = "/svelte-contain-css/tests/tabbar-appearance";

test("light tabs are flat and the underline follows selection without a size jump", async ({ page }) => {
  await page.goto(url);
  const tabs = page.getByTestId("tabs");
  const demo = tabs.getByRole("button", { name: "Demo", exact: true });
  const source = tabs.getByRole("button", { name: "Source", exact: true });
  await expect(demo).toHaveCSS("border-bottom-width", "2px");
  await expect(demo).not.toHaveCSS("border-bottom-color", "rgba(0, 0, 0, 0)");
  for (const button of [demo, source]) {
    await expect(button).toHaveCSS("background-color", /rgba\(0, 0, 0, 0\)|\/ 0\)$/);
    await expect(button).toHaveCSS("border-top-left-radius", "0px");
  }
  await expect(source).toHaveCSS("border-bottom-color", "rgba(0, 0, 0, 0)");
  const before = await source.boundingBox();
  await source.click();
  await expect(source).not.toHaveCSS("border-bottom-color", "rgba(0, 0, 0, 0)");
  await expect(demo).toHaveCSS("border-bottom-color", "rgba(0, 0, 0, 0)");
  expect((await source.boundingBox())!.height).toBe(before!.height);
});

test("Quiet's active-border variable reaches the selected tab and accepts overrides", async ({ page }) => {
  await page.goto(url);
  await page.getByTestId("theme").click();
  const tabs = page.getByTestId("tabs");
  const active = tabs.getByRole("button", { name: "Demo", exact: true });
  await expect(active).toHaveCSS("border-bottom-width", "2px");
  await tabs.evaluate(el => el.style.setProperty("--tab-active-border-bottom", "3px solid rgb(255, 0, 0)"));
  await expect(active).toHaveCSS("border-bottom-width", "3px");
  await expect(active).toHaveCSS("border-bottom-color", "rgb(255, 0, 0)");
});

test("a narrow tab strip scrolls without widening the page", async ({ page }) => {
  await page.setViewportSize({ width: 280, height: 800 });
  await page.goto(url);
  await page.getByTestId("tabs").evaluate(el => el.style.width = "180px");
  const bar = page.getByTestId("tabs").locator(".bar");
  await expect.poll(() => bar.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(280);
});
