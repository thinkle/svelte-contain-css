import { expect, test } from "@playwright/test";

/**
 * Regression test for Select's option-measurement array going stale on
 * shrink.
 *
 * Select measures every rendered option's width through `optionButtons`, a
 * `bind:this` array populated by index from an unkeyed {#each}. Nothing
 * truncated that array when the option list got shorter, so once Svelte tore
 * down the removed <li>s, their slots in the array went to `null` and stayed
 * there -- the array only ever grew or went stale, never shrank to match.
 *
 * `updateOptions()` always ends by calling `updateTargetWidth()`, which loops
 * over the *whole* array, so the very next time anything re-ran it (another
 * shrink, a rename, any mutation at all) it read `button.offsetWidth` on one
 * of those stale `null` entries and crashed with "Cannot read properties of
 * null (reading 'offsetWidth')" -- reliably reproducible with two shrinks in
 * a row, no resize or timing games required.
 *
 * If this test fails, you can debug by running the dev server and visiting:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/select-shrink-resize
 */
test("shrinking the option list twice in a row does not crash", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/svelte-contain-css/tests/select-shrink-resize");
  await page.waitForLoadState("networkidle");

  const select = page.getByTestId("shrink-select");
  const trigger = select.locator("nav.dropdown-menu > button");
  const menu = select.locator("ul.menu");

  await expect(menu.locator("li")).toHaveCount(4);

  await page.getByTestId("shrink").click();

  // Wait for the first shrink to actually settle in the DOM -- this is what
  // guarantees Svelte has already torn down the removed <li>s (and nulled
  // their bind:this targets in the old code) before the second shrink below
  // runs updateOptions() -- and its unguarded updateTargetWidth() -- again.
  await expect(menu.locator("li")).toHaveCount(2);

  await page.getByTestId("shrink-more").click();
  await expect(menu.locator("li")).toHaveCount(1);

  expect(errors).toEqual([]);

  // The dropdown should still be fully usable afterward.
  await trigger.click();
  await expect(menu).toBeVisible();
  await expect(menu).toContainText("A Block");
  await expect(menu).not.toContainText("B Block");
});
