import { expect, test } from "@playwright/test";

/**
 * Regression test for Select inside Dialog.
 *
 * If this test fails, you can debug by running the dev server and visiting:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/select-dialog
 */
test("Select inside dialog should not open background select", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/select-dialog");

  // Wait for hydration to complete before interacting
  await page.waitForLoadState("networkidle");

  // Open the dialog
  await page.getByTestId("open-dialog").click();

  // Wait for dialog to be visible
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();

  // Find the Select buttons
  const dialogSelectButton = page
    .getByTestId("dialog-select")
    .locator("nav.dropdown-menu > button");
  const backgroundSelectButton = page
    .getByTestId("background-select")
    .locator("nav.dropdown-menu > button");

  // The dialog select should be visible
  await expect(dialogSelectButton).toBeVisible();

  // Click to open the dialog's Select dropdown
  await dialogSelectButton.click();

  // Get the popover IDs
  const dialogPopoverId = await dialogSelectButton.getAttribute("aria-controls");
  const backgroundPopoverId =
    await backgroundSelectButton.getAttribute("aria-controls");

  if (!dialogPopoverId || !backgroundPopoverId) {
    throw new Error("Missing aria-controls on Select dropdown button");
  }

  const dialogPopover = page.locator(`#${dialogPopoverId}`);
  const backgroundPopover = page.locator(`#${backgroundPopoverId}`);

  // The dialog's dropdown should be open
  await expect
    .poll(() => dialogPopover.evaluate((el) => el.matches(":popover-open")))
    .toBe(true);

  // The background dropdown should NOT be open (this was the regression bug)
  await expect
    .poll(() => backgroundPopover.evaluate((el) => el.matches(":popover-open")))
    .toBe(false);
});
