import { test, expect, type Page } from "@playwright/test";

/**
 * DemoWithCode's defaultTab="auto" (the default): side by side when the box
 * is wide enough on first render, the demo alone otherwise -- decided once,
 * so a resize never swaps the view out from under the reader. A split is
 * as tall as its taller half, not a fixed slab.
 */

const page_ = (name: string) => `/svelte-contain-css/component/${name}`;

async function tabs(page: Page) {
  return page.locator(".demo-with-code").evaluateAll((boxes) =>
    boxes.map((b) => {
      const panel = b.querySelector(".tab-panel")!;
      return {
        kind: panel.classList.contains("split-panel")
          ? "split"
          : panel.classList.contains("source-panel")
            ? "source"
            : "demo",
        height: Math.round(panel.getBoundingClientRect().height),
      };
    }),
  );
}

test("a wide box opens side by side", async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto(page_("Tag"));
  await expect(page.locator(".split-panel").first()).toBeVisible();
  const t = await tabs(page);
  expect(t.every((x) => x.kind === "split")).toBe(true);
});

test("a split is as tall as its content, not a fixed slab", async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto(page_("Tag"));
  await expect(page.locator(".split-panel").first()).toBeVisible();
  const [first] = await tabs(page);
  // A row of tags beside three lines of code; the old fixed height was
  // min(70vh, 640px) = 630px here.
  expect(first.height).toBeLessThan(250);
});

test("a narrow box opens on the demo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(page_("Tag"));
  await expect(page.locator(".demo-panel").first()).toBeVisible();
  const t = await tabs(page);
  expect(t.every((x) => x.kind === "demo")).toBe(true);
});

test('an explicit defaultTab="demo" stays on the demo in a wide box', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto(page_("GridLayout"));
  await expect(page.locator(".demo-panel").first()).toBeVisible();
  const t = await tabs(page);
  expect(t.every((x) => x.kind === "demo")).toBe(true);
});

test("the choice is made once: resizing doesn't swap the view", async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto(page_("Tag"));
  await expect(page.locator(".split-panel").first()).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const t = await tabs(page);
  expect(t.every((x) => x.kind === "split")).toBe(true);
});
