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


test("a preset sets the pickers, which stay editable", async ({ page }) => {
  await page.getByRole("button", { name: "Dark, IBM Plex, Expressive Headings, Layered Depth", exact: true }).click();
  const checked = (group: string, name: string) =>
    expect(page.getByRole("group", { name: group }).getByRole("radio", { name, exact: true })).toBeChecked();
  await checked("Color", "Dark");
  await checked("Typography", "IBM Plex");
  await checked("Headings", "Expressive");
  await expect(page.getByRole("radiogroup", { name: "Depth" }).getByRole("radio", { name: "Layered Depth", exact: true })).toBeChecked();
  const transform = () => page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--heading-1-text-transform").trim());
  await expect.poll(transform).toBe("uppercase");
  // Change one piece; the rest of the preset stays.
  await page.getByRole("group", { name: "Headings" }).getByRole("radio", { name: "Block", exact: true }).locator("..").click();
  await expect.poll(transform).not.toBe("uppercase");
  await checked("Color", "Dark");
  await page.getByRole("checkbox", { name: "Show code", exact: true }).locator("..").click();
  await expect(page.locator("pre")).toContainText("solid-headings.css");
  await expect(page.locator("pre")).toContainText("themes/dark.css");
  await expect(page.locator("pre")).not.toContainText("dark-ibm-layered.css");
  const href = await page.getByRole("link", { name: /Open .*full size/ }).getAttribute("href");
  const popup = await page.context().newPage();
  await popup.goto(href!);
  await expect.poll(() => popup.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--heading-1-text-transform").trim())).not.toBe("uppercase");
  await popup.close();
});

test("Layered Depth deepens card shadows, shown in its own sample", async ({ page }) => {
  await page.getByRole("button", { name: "Container Store Report", exact: true }).click();
  const card = page.getByTestId("theme-preview").locator(".card").first();
  const sample = page.locator(".addon", { hasText: "Depth" }).locator(".card");
  const option = (name: string) => page.getByRole("radiogroup", { name: "Depth" }).getByRole("radio", { name, exact: true }).locator("..");
  const shadow = (el: Element) => getComputedStyle(el).boxShadow;
  const baseline = await card.evaluate(shadow);
  await option("Layered Depth").click();
  const layered = "rgba(15, 23, 42, 0.24) 8px 8px 24px 0px";
  await expect.poll(() => card.evaluate(shadow)).toBe(layered);
  await expect.poll(() => sample.evaluate(shadow)).toBe(layered);
  // The options are exclusive: Flat replaces Layered rather than stacking.
  await option("Flat Surfaces").click();
  await expect.poll(() => card.evaluate(shadow)).toBe("rgba(0, 0, 0, 0) 0px 0px 0px 0px");
  await option("Default").click();
  await expect.poll(() => card.evaluate(shadow)).toBe(baseline);
});

test("Flat Surfaces drops shadows for a hairline edge", async ({ page }) => {
  const sample = page.locator(".addon", { hasText: "Depth" }).locator(".card");
  await page.getByRole("radiogroup", { name: "Depth" }).getByRole("radio", { name: "Flat Surfaces", exact: true }).locator("..").click();
  await expect.poll(() => sample.evaluate(el => getComputedStyle(el).boxShadow)).toBe("rgba(0, 0, 0, 0) 0px 0px 0px 0px");
  await expect(sample).toHaveCSS("border-top-width", "1px");
});

test("accent picker recolors primary and secondary, by theme mode, and travels in the link", async ({ page }) => {
  const root = (name: string) =>
    page.locator("html").evaluate((el, n) => {
      const probe = document.createElement("div");
      probe.style.color = `var(${n})`;
      el.append(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    }, name);
  await page.getByRole("radio", { name: "Light", exact: true }).locator("..").click();
  await page.getByRole("group", { name: "Primary accent" }).getByRole("button", { name: "Teal" }).click();
  await expect.poll(() => root("--primary-bg")).toBe("rgb(0, 137, 123)"); // teal-600
  // A dark theme takes the light shade of the same hue.
  await page.getByRole("radio", { name: "Dark", exact: true }).locator("..").click();
  await expect.poll(() => root("--primary-bg")).toBe("rgb(128, 203, 196)"); // teal-200
  // A custom color is used as given; its text is automatic.
  const custom = page.getByLabel("Custom secondary color");
  await custom.evaluate((el: HTMLInputElement) => {
    el.value = "#ffeb3b";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await expect.poll(() => root("--secondary-bg")).toBe("rgb(255, 235, 59)");
  // Dark text on a pale fill: oklch lightness well under the 0.58 threshold.
  await expect.poll(async () => parseFloat((await root("--secondary-fg")).replace("oklch(", ""))).toBeLessThan(0.4);
  const href = await page.getByRole("link", { name: /Open .*full size/ }).getAttribute("href");
  expect(href).toContain("primary=teal");
  const popup = await page.context().newPage();
  await popup.goto(href!);
  await expect.poll(() => popup.locator("html").evaluate(el => {
    const probe = document.createElement("div");
    probe.style.color = "var(--primary-bg)";
    el.append(probe);
    return getComputedStyle(probe).color;
  })).toBe("rgb(128, 203, 196)");
  await popup.close();
});
