import { expect, test } from "@playwright/test";

/**
 * Regression tests for `Dialog dismissible`.
 *
 * A backdrop click is delivered to the <dialog> element itself; a click on
 * anything inside merely bubbles through it. Deciding by coordinates alone
 * dismissed the dialog whenever a click carried none -- which is every click
 * made by the keyboard (Enter/Space on a button inside) and every click made
 * by script, such as a styled file picker calling `input.click()`. The dialog
 * closed, its contents were removed, and the button's own work was lost.
 *
 * To debug: npm run dev, then
 *   http://localhost:5173/svelte-contain-css/tests/dismissible-dialog
 */
const open = async (page) => {
  await page.goto("/svelte-contain-css/tests/dismissible-dialog");
  await page.waitForLoadState("networkidle");
  await page.getByTestId("open-dialog").click();
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();
  return dialog;
};

test("a button inside, pressed with the keyboard, does its work and keeps the dialog", async ({ page }) => {
  const dialog = await open(page);
  await page.getByTestId("count-button").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("count")).toHaveText("1");
  await expect(dialog).toBeVisible();
});

test("a button inside that clicks an element by script keeps the dialog", async ({ page }) => {
  const dialog = await open(page);
  await page.getByTestId("script-click-button").click();
  await expect(page.getByTestId("inner-input")).toBeChecked();
  await expect(dialog).toBeVisible();
});

test("a scripted click on content inside keeps the dialog", async ({ page }) => {
  const dialog = await open(page);
  await page.getByTestId("count-button").evaluate((el: HTMLElement) => el.click());
  await expect(page.getByTestId("count")).toHaveText("1");
  await expect(dialog).toBeVisible();
});

test("clicking the backdrop still dismisses", async ({ page }) => {
  const dialog = await open(page);
  const box = (await dialog.boundingBox())!;
  await page.mouse.click(Math.max(2, box.x / 2), Math.max(2, box.y / 2));
  await expect(dialog).toHaveCount(0);
});

test("clicking the dialog's own padding does not dismiss", async ({ page }) => {
  const dialog = await open(page);
  const box = (await dialog.boundingBox())!;
  // Just inside the bottom edge, below the content: the dialog itself is the
  // target here, but the point is within its box.
  await page.mouse.click(box.x + box.width / 2, box.y + box.height - 3);
  await expect(dialog).toBeVisible();
});

test("turning dismissible off while open stops the backdrop dismissing", async ({ page }) => {
  const dialog = await open(page);
  await page.getByTestId("stop-dismissing").click();
  const box = (await dialog.boundingBox())!;
  await page.mouse.click(Math.max(2, box.x / 2), Math.max(2, box.y / 2));
  await expect(dialog).toBeVisible();
});

// `modal` is read when the dialog opens: a browser will not switch an open
// dialog between modal and non-modal, so the component does not pretend to.
test("changing modal while open leaves the dialog as it was opened", async ({ page }) => {
  const dialog = await open(page);
  expect(await dialog.evaluate((d: HTMLDialogElement) => d.matches(":modal"))).toBe(true);
  await page.getByTestId("make-non-modal").click();
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((d: HTMLDialogElement) => d.matches(":modal"))).toBe(true);
});
