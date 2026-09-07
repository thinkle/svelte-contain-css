import { expect, test } from "@playwright/test";

/**
 * Regression test for an <Option> whose content is rewritten in place.
 *
 * Renaming an option adds and removes nothing, so a childList-only
 * MutationObserver never hears about it. Both halves have to work: Option has
 * to re-extract its data-html from the rendered children, and Select has to
 * notice that the attribute changed and retake its snapshot.
 *
 * If this test fails, you can debug by running the dev server and visiting:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/select-dynamic-option
 */
test("renaming an option updates the styled dropdown", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/select-dynamic-option");
  await page.waitForLoadState("networkidle");

  const select = page.getByTestId("dynamic-select");
  const trigger = select.locator("nav.dropdown-menu > button");
  const menu = select.locator("ul.menu");

  await expect(trigger).toContainText("C Block");
  await expect(menu).toContainText("C Block");

  await page.getByTestId("rename").click();

  // The selected option is the renamed one, so both the trigger and the list
  // have to follow.
  await expect(trigger).toContainText("D Block");
  await expect(menu).toContainText("D Block");
  await expect(menu).not.toContainText("C Block");

  // The untouched option is still there, markup and all.
  await expect(menu).toContainText("A Block");
  await expect(menu.locator("b", { hasText: "A Block" })).toHaveCount(1);
});

test("the native option keeps a readable text fallback", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/select-dynamic-option");
  await page.waitForLoadState("networkidle");

  const nativeOption = page.getByTestId("dynamic-select").locator("option").nth(1);
  await expect(nativeOption).toHaveText(/C Block\s+Science/);

  await page.getByTestId("rename").click();
  await expect(nativeOption).toHaveText(/D Block\s+Science/);
});
