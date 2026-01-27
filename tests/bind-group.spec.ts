import { expect, test } from "@playwright/test";

/**
 * Tests for bind:group functionality with Checkbox and RadioButton components.
 *
 * If this test fails, debug by running:
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/bind-group
 */

test.describe("Checkbox bind:group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/bind-group");
    await page.waitForLoadState("networkidle");
  });

  test("starts with empty selection", async ({ page }) => {
    const output = page.getByTestId("checkbox-output");
    await expect(output).toHaveText("[]");
  });

  test("clicking checkbox adds value to group", async ({ page }) => {
    const output = page.getByTestId("checkbox-output");
    const checkboxGroup = page.getByTestId("checkbox-group");

    // Use first() because there's an invisible duplicate for sizing
    await checkboxGroup.getByLabel("Apple").first().click({ force: true });
    await expect(output).toHaveText('["apple"]');

    await checkboxGroup.getByLabel("Banana").first().click({ force: true });
    await expect(output).toHaveText('["apple","banana"]');
  });

  test("clicking checked checkbox removes value from group", async ({ page }) => {
    const output = page.getByTestId("checkbox-output");
    const checkboxGroup = page.getByTestId("checkbox-group");

    await checkboxGroup.getByLabel("Apple").first().click({ force: true });
    await checkboxGroup.getByLabel("Banana").first().click({ force: true });
    await expect(output).toHaveText('["apple","banana"]');

    // Uncheck Apple
    await checkboxGroup.getByLabel("Apple").first().click({ force: true });
    await expect(output).toHaveText('["banana"]');
  });

  test("multiple checkboxes can be selected", async ({ page }) => {
    const output = page.getByTestId("checkbox-output");
    const checkboxGroup = page.getByTestId("checkbox-group");

    await checkboxGroup.getByLabel("Apple").first().click({ force: true });
    await checkboxGroup.getByLabel("Cherry").first().click({ force: true });
    await checkboxGroup.getByLabel("Date").first().click({ force: true });

    await expect(output).toHaveText('["apple","cherry","date"]');
  });

  test("checkbox visual state reflects checked state", async ({ page }) => {
    const checkboxGroup = page.getByTestId("checkbox-group");
    const appleCheckbox = checkboxGroup.getByRole("checkbox", { name: "Apple" }).first();

    // Initially unchecked
    await expect(appleCheckbox).not.toBeChecked();

    // Click label to check
    await checkboxGroup.getByLabel("Apple").first().click({ force: true });
    await expect(appleCheckbox).toBeChecked();

    // Click label to uncheck
    await checkboxGroup.getByLabel("Apple").first().click({ force: true });
    await expect(appleCheckbox).not.toBeChecked();
  });
});

test.describe("RadioButton bind:group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/bind-group");
    await page.waitForLoadState("networkidle");
  });

  test("starts with no selection", async ({ page }) => {
    const output = page.getByTestId("radio-output");
    await expect(output).toHaveText("");
  });

  test("clicking radio sets group to that value", async ({ page }) => {
    const output = page.getByTestId("radio-output");
    const radioGroup = page.getByTestId("radio-group");

    await radioGroup.getByLabel("Red").first().click({ force: true });
    await expect(output).toHaveText("red");

    await radioGroup.getByLabel("Blue").first().click({ force: true });
    await expect(output).toHaveText("blue");
  });

  test("only one radio can be selected at a time", async ({ page }) => {
    const radioGroup = page.getByTestId("radio-group");
    const output = page.getByTestId("radio-output");

    await radioGroup.getByLabel("Red").first().click({ force: true });
    await expect(output).toHaveText("red");

    await radioGroup.getByLabel("Green").first().click({ force: true });
    await expect(output).toHaveText("green");

    // Verify only Green is checked
    await expect(radioGroup.getByRole("radio", { name: "Red" }).first()).not.toBeChecked();
    await expect(radioGroup.getByRole("radio", { name: "Green" }).first()).toBeChecked();
  });

  test("radio visual state reflects selection", async ({ page }) => {
    const radioGroup = page.getByTestId("radio-group");
    const blueRadio = radioGroup.getByRole("radio", { name: "Blue" }).first();

    await expect(blueRadio).not.toBeChecked();

    await radioGroup.getByLabel("Blue").first().click({ force: true });
    await expect(blueRadio).toBeChecked();
  });
});

test.describe("Pre-selected values", () => {
  test("checkbox group initializes with preset values", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/bind-group");
    await page.waitForLoadState("networkidle");

    const output = page.getByTestId("preset-checkbox-output");
    await expect(output).toHaveText('["apple","cherry"]');

    const presetGroup = page.getByTestId("preset-checkbox-group");

    await expect(presetGroup.getByRole("checkbox", { name: "Apple" }).first()).toBeChecked();
    await expect(presetGroup.getByRole("checkbox", { name: "Banana" }).first()).not.toBeChecked();
    await expect(presetGroup.getByRole("checkbox", { name: "Cherry" }).first()).toBeChecked();
  });
});

test.describe("Accessibility", () => {
  test("checkbox labels are properly associated with inputs", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/bind-group");
    await page.waitForLoadState("networkidle");

    const checkboxGroup = page.getByTestId("checkbox-group");

    // The real checkbox label should be visible (not aria-hidden)
    const appleLabel = checkboxGroup.locator("label.checkbox-item").filter({ hasText: "Apple" });
    await expect(appleLabel).toBeVisible();

    // The input should be inside the label
    const inputInLabel = appleLabel.locator("input[type='checkbox']");
    await expect(inputInLabel).toHaveCount(1);

    // Invisible duplicates should have aria-hidden
    const invisibleLabel = checkboxGroup.locator("label.invisible[aria-hidden='true']").first();
    await expect(invisibleLabel).toBeAttached();
  });

  test("radio buttons are properly associated with labels", async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/bind-group");
    await page.waitForLoadState("networkidle");

    const radioGroup = page.getByTestId("radio-group");

    // The real radio label should be visible
    const redLabel = radioGroup.locator("label.radio-item").filter({ hasText: "Red" }).first();
    await expect(redLabel).toBeVisible();

    // The input should be inside the label
    const inputInLabel = redLabel.locator("input[type='radio']");
    await expect(inputInLabel).toHaveCount(1);
  });
});
