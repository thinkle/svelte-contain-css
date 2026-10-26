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
  await page.getByPlaceholder(/--surface-bg: lavender/).fill("--sidebar-bg: rgb(1, 2, 3);");
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
  await page.getByRole("radio", { name: "Expressive", exact: true }).locator("..").click();
  const href = await page.getByRole("link", { name: /Open .*full size/ }).getAttribute("href");
  await page.goto(href!);
  await expect.poll(() => page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--primary-bg").trim())).toBe("#0d6efd");
  await expect.poll(() => page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--heading-1-text-transform").trim())).toBe("uppercase");
});

test("custom variables retain priority when presets and add-ons change", async ({ page }) => {
  await page.getByPlaceholder(/--surface-bg: lavender/).fill("--primary-bg: rgb(1, 2, 3); --heading-1-bg: rgb(4, 5, 6);");
  const values = () => page.locator("html").evaluate(el => {
    const css = getComputedStyle(el);
    return [css.getPropertyValue("--primary-bg").trim(), css.getPropertyValue("--heading-1-bg").trim()];
  });
  for (const preset of ["Bootstrap", "Material"]) {
    await page.getByRole("radio", { name: preset, exact: true }).locator("..").click();
    await expect.poll(values).toEqual(["rgb(1, 2, 3)", "rgb(4, 5, 6)"]);
  }
  await page.getByRole("radio", { name: "Block", exact: true }).locator("..").click();
  await expect.poll(values).toEqual(["rgb(1, 2, 3)", "rgb(4, 5, 6)"]);
});


test("heading choices replace a combination's treatment and Default restores it", async ({ page }) => {
  await page.getByRole("radio", { name: "Dark + IBM Plex + Expressive Headings + Layered Depth", exact: true }).locator("..").click();
  const transform = () => page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--heading-1-text-transform").trim());
  await expect.poll(transform).toBe("uppercase");
  await page.getByRole("radio", { name: "Block", exact: true }).locator("..").click();
  await expect.poll(transform).not.toBe("uppercase");
  await expect(page.getByRole("checkbox", { name: /Headings/ })).toHaveCount(0);
  await page.getByRole("checkbox", { name: "Show code", exact: true }).locator("..").click();
  await expect(page.locator("pre")).toContainText("solid-headings.css");
  await expect(page.locator("pre")).not.toContainText("dark-ibm-layered.css");
  const href = await page.getByRole("link", { name: /Open .*full size/ }).getAttribute("href");
  const popup = await page.context().newPage();
  await popup.goto(href!);
  await expect.poll(() => popup.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--heading-1-text-transform").trim())).not.toBe("uppercase");
  await popup.close();
  await page.getByRole("radio", { name: "Default", exact: true }).locator("..").click();
  await expect.poll(transform).toBe("uppercase");
});

test("Layered Depth changes actual card shadows and provides a relevant preview", async ({ page }) => {
  await page.getByRole("button", { name: "Container Store Report", exact: true }).click();
  const card = page.getByTestId("theme-preview").locator(".card").first();
  const baseline = await card.evaluate(el => getComputedStyle(el).boxShadow);
  await page.getByRole("checkbox", { name: "Layered Depth", exact: true }).locator("..").click();
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).boxShadow)).toBe("rgba(15, 23, 42, 0.14) 4px 4px 16px 0px");
  await page.getByRole("button", { name: "The Tidy Shelf (Blog)", exact: true }).click();
  await page.getByRole("button", { name: "Preview depth on cards", exact: true }).click();
  await expect(card).toBeVisible();
  await page.getByRole("checkbox", { name: "Layered Depth", exact: true }).locator("..").click();
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).boxShadow)).toBe(baseline);
});
