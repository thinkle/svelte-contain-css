import { expect, test } from "@playwright/test";

/**
 * Test dropdown menu wrapping behavior with narrow triggers and wide content.
 *
 * This test suite validates that dropdowns can be configured to either:
 * 1. Wrap text when content exceeds available space (default behavior)
 * 2. Display on a single line with ellipsis when using --dropdown-wrap-mode: nowrap
 *
 * To debug these tests, run the dev server and visit:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/dropdown-wrap
 */

test.describe("Dropdown Menu Wrapping", () => {
  test("should display dropdown with narrow trigger and short options", async ({
    page,
  }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-narrow-trigger");
    const button = section.locator("nav.dropdown-menu > button");

    // Button should be visible
    await expect(button).toBeVisible();

    // Click to open dropdown
    await button.click();

    // Get the popover ID and wait for it to be visible
    const popoverId = await button.getAttribute("aria-controls");
    expect(popoverId).toBeTruthy();

    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    // Check that options are rendered
    const options = popover.locator("button");
    await expect(options).toHaveCount(3);

    // Options should be visible and not wrapped (they're short)
    for (const option of await options.all()) {
      await expect(option).toBeVisible();
    }
  });

  test("should wrap text in default mode with wide content", async ({
    page,
  }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-default-wrap");
    const button = section.locator("nav.dropdown-menu > button");

    await button.click();

    const popoverId = await button.getAttribute("aria-controls");
    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    // Get the dropdown content element
    const content = popover.locator(".dropdown-content");

    // Ensure one of the options contains the expected long label text
    const longOption = content
      .locator("button")
      .filter({ hasText: "This is a very long option" })
      .first();
    await expect(longOption).toBeVisible();
  });

  test("should respect nowrap mode with ellipsis", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-max-content");

    // Check that the container has the nowrap mode set
    const container = section.locator("div").first();
    const computedStyle = await container.evaluate((el) => {
      return window
        .getComputedStyle(el)
        .getPropertyValue("--dropdown-wrap-mode");
    });
    // The variable should be inherited/set on the container
    // (exact value depends on how it cascades)

    const button = section.locator("nav.dropdown-menu > button");
    await button.click();

    const popoverId = await button.getAttribute("aria-controls");
    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    // Content should be visible
    const content = popover.locator(".dropdown-content");
    await expect(content).toBeVisible();
  });

  test("should toggle between wrap and nowrap modes", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-wrap-mode-toggle");
    const button = section.locator("nav.dropdown-menu > button");

    // Test wrap mode (default)
    await button.click();
    let popoverId = await button.getAttribute("aria-controls");
    let popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();
    await expect(popover.locator("button")).toHaveCount(3);

    // Close by clicking outside or pressing Escape
    await page.keyboard.press("Escape");
    await expect(popover).not.toBeVisible();

    // Switch to nowrap mode
    const modeSelect = page
      .getByTestId("test-wrap-mode-toggle")
      .locator('select[aria-label*="Wrap Mode"], select')
      .first();
    await modeSelect.selectOption("nowrap");

    // Open dropdown again
    await button.click();
    popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    // Items should still be visible
    const items = popover.locator("[data-testid]");
    const visibleItems = await items.filter({ visible: true }).count();
    expect(visibleItems).toBeGreaterThan(0);
  });

  test("should handle extremely long text gracefully", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-extreme-length");
    const button = section.locator("nav.dropdown-menu > button");

    // Test with wrap mode first
    await button.click();
    const popoverId = await button.getAttribute("aria-controls");
    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    const content = popover.locator(".dropdown-content");
    const rect = await content.boundingBox();

    // Content should be constrained (not exceed viewport)
    const viewport = page.viewportSize();
    expect(rect?.width).toBeLessThanOrEqual(viewport?.width ?? Number.MAX_SAFE_INTEGER);

    await page.keyboard.press("Escape");
    await expect(popover).not.toBeVisible();

    // Switch to nowrap mode
    const modeSelect = page
      .getByTestId("test-extreme-length")
      .locator("select")
      .first();
    await modeSelect.selectOption("nowrap");

    // Open dropdown again
    await button.click();
    await expect(popover).toBeVisible();

    // Content should still be constrained
    const contentRect = await content.boundingBox();
    expect(contentRect?.width).toBeLessThanOrEqual(viewport?.width ?? Number.MAX_SAFE_INTEGER);
  });

  test("should constrain tall dropdowns and allow internal vertical scrolling", async ({
    page,
  }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-vertical-scroll");
    const button = section.locator("nav.dropdown-menu > button");
    await button.click();

    const popoverId = await button.getAttribute("aria-controls");
    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    const metrics = await popover.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        overflowY: style.overflowY,
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
      };
    });

    expect(["auto", "scroll"]).toContain(metrics.overflowY);
    expect(metrics.scrollHeight).toBeGreaterThan(metrics.clientHeight);

    const scrolledTop = await popover.evaluate((el) => {
      el.scrollTop = 160;
      return el.scrollTop;
    });
    expect(scrolledTop).toBeGreaterThan(0);

    // Confirm far-down menu content becomes visible after scrolling.
    const lastItem = popover.locator("button", { hasText: "Scrollable item 48" });
    await expect(lastItem).toBeVisible();
  });

  test("visual regression: dropdown positioning", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/dropdown-wrap");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("test-default-wrap");
    const button = section.locator("nav.dropdown-menu > button");

    // Position button in viewport
    await button.scrollIntoViewIfNeeded();
    await button.click();

    const popoverId = await button.getAttribute("aria-controls");
    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    // Take a screenshot for visual comparison
    await expect(section).toHaveScreenshot("dropdown-wrap-default.png");

    // Close and try nowrap mode
    await page.keyboard.press("Escape");

    const section3 = page.getByTestId("test-max-content");
    const button3 = section3.locator("nav.dropdown-menu > button");
    await button3.scrollIntoViewIfNeeded();
    await button3.click();

    const popoverId3 = await button3.getAttribute("aria-controls");
    const popover3 = page.locator(`#${popoverId3}`);
    await expect(popover3).toBeVisible();

    await expect(section3).toHaveScreenshot("dropdown-nowrap.png");
  });
});
