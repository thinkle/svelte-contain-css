import { expect, test } from "@playwright/test";

test("unmounting the editor restores defaults and removes all its style elements", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/theme-style-lifecycle");
  await page.waitForLoadState("networkidle");
  const tokens = () => page.locator("html").evaluate(el => {
    const css = getComputedStyle(el);
    return ["--primary-bg", "--menu-item-active-bg", "--heading-1-bg"].map(name => css.getPropertyValue(name));
  });
  const baseline = await tokens();
  await page.getByRole("button", { name: "Mount editor theme", exact: true }).click();
  await expect.poll(tokens).not.toEqual(baseline);
  await expect(page.locator("#full-injected-style")).toHaveCount(1);
  await page.getByRole("button", { name: "Unmount editor theme", exact: true }).click();
  await expect.poll(tokens).toEqual(baseline);
  await expect(page.locator('style[id$="-injected-style"]')).toHaveCount(0);
});
