import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/svelte-contain-css/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("link", { name: "Themes", exact: true }).click();
  await expect(page.getByTestId("theme-preview")).toBeVisible();
});

test("changing scenario tabs resets both the canvas and nested page scrolling", async ({ page }) => {
  const preview = page.getByTestId("theme-preview");
  const content = preview.locator(".page > .side-by-side > .content").first();
  await content.evaluate(el => { el.scrollTop = 300; });
  expect(await content.evaluate(el => el.scrollTop)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Containment Doctrine Studio", exact: true }).click();
  await preview.locator(".preview-scaled").evaluate(el => { el.scrollTop = 300; });
  expect(await preview.locator(".preview-scaled").evaluate(el => el.scrollTop)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "The Tidy Shelf (Blog)", exact: true }).click();
  expect(await preview.locator(".preview-scaled").evaluate(el => el.scrollTop)).toBe(0);
  expect(await content.evaluate(el => el.scrollTop)).toBe(0);
  await expect(preview.getByRole("heading", { name: "Why every drawer deserves a divider" })).toBeInViewport();
});

test("full-size preview preserves the selected palette, type, add-ons, and custom variables", async ({ page }) => {
  await page.getByRole("radio", { name: "Canyon", exact: true }).locator("..").click();
  await page.getByRole("radio", { name: "Modern Serif", exact: true }).locator("..").click();
  await page.getByRole("checkbox", { name: "Fancy Paragraphs", exact: true }).locator("..").click();
  await page.getByPlaceholder("--bg: red;").fill("--sidebar-bg: rgb(1, 2, 3);");
  const popupEvent = page.waitForEvent("popup");
  await page.getByRole("link", { name: /Open The Tidy Shelf.*full size/ }).click();
  const popup = await popupEvent;
  await popup.waitForLoadState("networkidle");
  await expect(popup).toHaveURL(/\/preview\/blog-mockup#/);
  await expect(popup.getByRole("heading", { name: "The Tidy Shelf", exact: true })).toBeVisible();
  await expect.poll(() => popup.locator("aside.sidebar").evaluate(el => getComputedStyle(el).backgroundColor)).toBe("color(srgb 0.00392157 0.00784314 0.0117647)");
  await expect.poll(() => popup.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--font-family").trim())).toBe('"Newsreader", serif');
  await expect.poll(() => popup.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--first-line-font-variant").trim())).toBe("small-caps");
  // The fragment is self-contained: reloading does not depend on the opener.
  await popup.reload();
  await expect.poll(() => popup.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--sidebar-bg").trim())).toBe("rgb(1, 2, 3)");
  await popup.close();
});

test("full presets and extras also survive the full-size link", async ({ page }) => {
  await page.getByRole("radio", { name: "Bootstrap", exact: true }).locator("..").click();
  await page.getByRole("checkbox", { name: "Expressive Headings", exact: true }).locator("..").click();
  const href = await page.getByRole("link", { name: /Open .*full size/ }).getAttribute("href");
  await page.goto(href!);
  await expect.poll(() => page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--primary-bg").trim())).toBe("#0d6efd");
  await expect.poll(() => page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--heading-1-text-transform").trim())).toBe("uppercase");
});
