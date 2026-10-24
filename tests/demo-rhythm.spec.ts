import { test, expect } from "@playwright/test";

const base = "/svelte-contain-css";

test("the main tutorial and standalone component docs both start-align their prose", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const standalone of [false, true]) {
    await page.goto(standalone ? `${base}/component/DataList` : base);
    await page.waitForLoadState("networkidle");
    if (!standalone) {
      await page.getByRole("link", { name: "Data List", exact: true }).click();
    }
    const heading = page.getByRole("heading", { name: "Data List", exact: true });
    await expect(heading).toBeVisible();
    const placement = await heading.evaluate(el => {
      const paragraph = el.parentElement!.querySelector("p")!;
      return {
        headingMargin: getComputedStyle(el).marginInlineStart,
        paragraphMargin: getComputedStyle(paragraph).marginInlineStart,
        policy: getComputedStyle(paragraph).getPropertyValue("--prose-margin-inline").trim(),
      };
    });
    expect(placement).toEqual({ headingMargin: "0px", paragraphMargin: "0px", policy: "0" });
  }
});

for (const component of ["Button", "Card", "DataList", "DropdownMenu", "GridLayout", "Sidebar", "Dialog", "Tooltip", "ColorMix"]) {
  test(`${component} examples own their headings and explanatory blurbs`, async ({ page }) => {
    await page.goto(`${base}/component/${component}`);
    const examples = page.locator(".demo-with-code");
    await expect(examples.first()).toBeVisible();
    const captions = await examples.evaluateAll(nodes => nodes.map(node => ({
      heading: node.querySelector(":scope > .demo-heading")?.textContent?.trim() ?? "",
      proseInHeading: node.querySelectorAll(":scope > .demo-heading p, :scope > .demo-heading ul").length,
      headingInBlurb: node.querySelectorAll(":scope > .demo-blurb h2, :scope > .demo-blurb h3").length,
    })));
    for (const caption of captions) {
      expect(caption.heading).not.toBe("");
      expect(caption.proseInHeading).toBe(0);
      expect(caption.headingInBlurb).toBe(0);
    }
  });
}

test("source remains live and preview prose keeps the library's default centering", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${base}/tests/demo-rhythm`);
  const source = page.locator(".source-panel");
  await expect(source).toContainText('padding="12px"');
  await page.getByRole("slider", { name: "Preview padding" }).focus();
  await page.keyboard.press("End");
  await expect(source).toContainText('padding="32px"');
  await page.getByRole("button", { name: "Side by Side", exact: true }).click();
  await expect(page.locator(".split-panel")).toContainText('padding="32px"');
  await expect(page.locator("#preview-text p")).toBeVisible();
  await expect.poll(() => page.locator("#preview-text p").evaluate(el => parseFloat(getComputedStyle(el).marginInlineStart))).toBeGreaterThan(0);
  await expect(page.locator(".demo-blurb p")).toHaveCSS("margin-inline-start", "0px");
  await page.getByRole("button", { name: "Demo", exact: true }).click();
  await expect(page.locator(".demo-panel #preview-text")).toBeVisible();
});

test("tooltip disabled-action controls update the live example and visible source", async ({ page }) => {
  await page.goto(`${base}/component/Tooltip`);
  const example = page.locator(".demo-with-code").filter({ has: page.getByRole("heading", { name: "Disabled actions", exact: true }) });
  await example.getByRole("button", { name: "Source", exact: true }).click();
  await expect(example.locator(".source-panel")).toContainText("tooltipDisabled={false}");
  await example.getByRole("checkbox", { name: "Confirm scary action" }).focus();
  await page.keyboard.press("Space");
  await expect(example.locator(".source-panel")).toContainText("tooltipDisabled={true}");
  await example.getByRole("button", { name: "Demo", exact: true }).click();
  await expect(example.getByRole("button", { name: "Do Scary Action" })).toBeEnabled();
});

test("standalone examples keep a gap and fit a narrow documentation page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/component/Tooltip`);
  const examples = page.locator(".demo-with-code");
  await expect(examples.nth(1)).toBeAttached();
  const first = await examples.nth(0).boundingBox();
  const second = await examples.nth(1).boundingBox();
  expect(second!.y - first!.y - first!.height).toBeGreaterThanOrEqual(16);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
