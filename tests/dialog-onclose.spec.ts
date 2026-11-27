import { expect, test } from "@playwright/test";

/**
 * `onclose` must report a closure exactly once, however the dialog was
 * closed, and must not report one for a dialog that was never open.
 *
 * To debug: npm run dev, then
 *   http://localhost:5173/svelte-contain-css/tests/dialog-onclose
 */
const open = async (page) => {
  await page.getByTestId("open-dialog").click();
  await expect(page.locator("dialog[open]")).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/dialog-onclose");
  await page.waitForLoadState("networkidle");
});

test("a dialog that was never open does not report a close on mount", async ({ page }) => {
  await expect(page.getByTestId("never-open-closes")).toHaveText("0");
});

test("Escape reports one close", async ({ page }) => {
  await open(page);
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.getByTestId("closes")).toHaveText("1");
});

test("the close button reports one close", async ({ page }) => {
  await open(page);
  await page.locator("dialog[open] .close-button button").click();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.getByTestId("closes")).toHaveText("1");
});

test("a backdrop click reports one close", async ({ page }) => {
  await open(page);
  const box = (await page.locator("dialog[open]").boundingBox())!;
  await page.mouse.click(Math.max(2, box.x / 2), Math.max(2, box.y / 2));
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.getByTestId("closes")).toHaveText("1");
});

test("closing by setting open=false reports one close", async ({ page }) => {
  await open(page);
  // The modal blocks the page, so reach the outside button by script: what
  // matters here is the caller setting `open` false, not how it was asked.
  await page.getByTestId("close-from-outside").evaluate((el: HTMLElement) => el.click());
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.getByTestId("closes")).toHaveText("1");
});

test("a button inside that sets open=false reports one close", async ({ page }) => {
  await open(page);
  await page.getByTestId("close-from-inside").click();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.getByTestId("closes")).toHaveText("1");
});

test("a non-modal dialog reports one close from its close button", async ({ page }) => {
  const dialog = page.locator("dialog[data-testid=non-modal-dialog]");
  await page.getByTestId("open-non-modal").click();
  await expect(dialog).toBeVisible();
  // Shown with show(), so the page behind it is still live.
  expect(await dialog.evaluate((d: HTMLDialogElement) => d.matches(":modal"))).toBe(false);
  await dialog.locator(".close-button button").click();
  await expect(dialog).toBeHidden();
  await expect(page.getByTestId("non-modal-closes")).toHaveText("1");
});

test("Escape does not close a non-modal dialog, which is the browser's doing", async ({ page }) => {
  const dialog = page.locator("dialog[data-testid=non-modal-dialog]");
  await page.getByTestId("open-non-modal").click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeVisible();
  await expect(page.getByTestId("non-modal-closes")).toHaveText("0");
});

test("the close button works on a dialog given no onClose at all", async ({ page }) => {
  const dialog = page.locator("dialog[data-testid=plain-dialog]");
  await page.getByTestId("open-plain").click();
  await expect(dialog).toBeVisible();
  await dialog.locator(".close-button button").click();
  await expect(dialog).toBeHidden();
});

test("a dialog closed and opened again reopens", async ({ page }) => {
  await open(page);
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await open(page);
  await expect(page.getByTestId("closes")).toHaveText("1");
});
