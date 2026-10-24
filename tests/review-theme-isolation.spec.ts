import { expect, test, type Page } from "@playwright/test";

const base = "/svelte-contain-css";
const purple = `${base}/review/purple/app/layout-workbench`;

async function themeTokens(page: Page) {
  return page.locator("html").evaluate(el => {
    const css = getComputedStyle(el);
    return Object.fromEntries([
      "--primary-bg", "--menu-item-active-bg", "--button-bg", "--body-bg",
      "--font-family", "--control-padding", "--heading-1-bg", "--first-letter-fg",
    ].map(name => [name, css.getPropertyValue(name).trim()]));
  });
}

for (const previous of ["bootstrap", "retro", "light-airy-solid", "canyon-modern-serif-fancy"]) {
  test(`${previous} does not leave colors, geometry, or typography behind in Purple`, async ({ page }) => {
    await page.goto(purple);
    await page.waitForLoadState("networkidle");
    const clean = await themeTokens(page);
    const active = page.locator(".page aside .menu .active");
    const cleanActive = await active.evaluate(el => getComputedStyle(el).backgroundColor);

    await page.goto(`${base}/review/${previous}/app/layout-workbench`);
    await page.waitForLoadState("networkidle");
    // These are real client-side navigations; a hard reload would hide the leak.
    await page.getByRole("button", { name: "Theme catalog", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${base}/review$`));
    await page.getByRole("link", { name: "Purple", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${base}/review/purple$`));
    await page.getByRole("link", { name: "App scenarios", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${base}/review/purple/app$`));
    await page.getByRole("link", { name: "Container Store Report", exact: true }).click();
    await expect(page).toHaveURL(purple);
    await page.waitForLoadState("networkidle");

    expect(await themeTokens(page)).toEqual(clean);
    await expect(active).toHaveCSS("background-color", cleanActive);
    await expect(page.locator(`#review-theme-${previous}`)).toHaveCount(0);
    await expect(page.locator('style[id^="review-theme-"]')).toHaveCount(1);
  });
}

test("the theme catalog and switcher offer the same clearly grouped choices", async ({ page }) => {
  await page.goto(`${base}/review/purple/app`);
  await page.waitForLoadState("networkidle");
  const switcher = page.getByRole("navigation", { name: "Review theme switcher" });
  await expect(switcher.getByRole("group", { name: "Color palettes", exact: true })).toBeVisible();
  await expect(switcher.getByRole("group", { name: "Complete themes", exact: true })).toBeVisible();
  await expect(switcher.getByRole("group", { name: "Combinations", exact: true })).toBeVisible();
  await expect(switcher.getByRole("group", { name: "Color palettes", exact: true }).getByRole("button")).toHaveCount(6);
  await expect(switcher.getByRole("group", { name: "Complete themes", exact: true }).getByRole("button")).toHaveCount(3);
  await expect(switcher.getByRole("group", { name: "Combinations", exact: true }).getByRole("button")).toHaveCount(4);
  const labels = (await switcher.locator("fieldset a").allTextContents()).map(text => text.trim()).sort();
  await switcher.getByRole("button", { name: "Theme catalog" }).click();
  await expect(page.getByRole("heading", { name: "Theme Catalog", exact: true })).toBeVisible();
  expect((await page.locator(".data-list-item h3 a").allTextContents()).map(text => text.trim()).sort()).toEqual(labels);
});

test("scenario data-list rows explain their content, interactions, and components", async ({ page }) => {
  await page.goto(`${base}/review/purple/app`);
  const rows = page.locator("[data-review-scenario-summary]");
  await expect(rows).toHaveCount(6);
  const blog = page.locator('[data-review-scenario-summary="blog-mockup"]');
  await expect(blog).toContainText("An editorial blog");
  await expect(blog).toContainText("full-height sidebar");
  await expect(blog).toContainText("Components: Page, Bar, Sidebar");
  await expect(blog.getByRole("link", { name: "The Tidy Shelf (Blog)" })).toHaveAttribute("href", `${base}/review/purple/app/blog-mockup`);
  await expect(page.locator('[data-review-scenario-summary="table-workbench"]')).toContainText("Sticky table headers");
});

test("scenario rows have hover affordances and navigate from the whole row or keyboard", async ({ page }) => {
  await page.goto(`${base}/review/purple/app`);
  await page.waitForLoadState("networkidle");
  const row = page.getByRole("button", { name: "Open The Tidy Shelf (Blog)", exact: true });
  await page.mouse.move(0, 0);
  const resting = await row.evaluate(el => getComputedStyle(el).backgroundColor);
  await row.hover();
  await expect.poll(() => row.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(resting);
  // Click descriptive copy rather than the title's nested link.
  await row.getByText("An editorial blog", { exact: false }).click();
  await expect(page).toHaveURL(new RegExp(`${base}/review/purple/app/blog-mockup$`));
  await page.goBack();
  await row.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${base}/review/purple/app/blog-mockup$`));
  await page.goBack();
  await row.focus();
  await page.keyboard.press("Space");
  await expect(page).toHaveURL(new RegExp(`${base}/review/purple/app/blog-mockup$`));
});

test("theme catalog rows navigate from their descriptions", async ({ page }) => {
  await page.goto(`${base}/review`);
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open Purple theme", exact: true })
    .getByText("Pale purple surfaces", { exact: false }).click();
  await expect(page).toHaveURL(new RegExp(`${base}/review/purple$`));
});

for (const [theme, property, value] of [
  ["canyon-modern-serif-fancy", "--heading-2-border-width", "0 0 3px"],
  ["forest-editorial-rounded", "--heading-tint", "currentColor"],
  ["dark-ibm-layered", "--heading-1-text-transform", "uppercase"],
] as const) {
  test(`${theme} includes its named heading preset`, async ({ page }) => {
    await page.goto(`${base}/review/${theme}/app/blog-mockup`);
    await expect.poll(() => page.locator("html").evaluate((el, property) => getComputedStyle(el).getPropertyValue(property).trim(), property)).toBe(value);
  });
}
