import { test, expect } from "@playwright/test";

test("getPageScroller returns Page's scrolling content, or null outside a Page", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/page-scroller");
  await page.waitForLoadState("networkidle");

  await expect(page.getByTestId("outside")).toHaveAttribute("data-found", "none");
  const inside = page.getByTestId("bottom");
  await expect(inside).toHaveAttribute("data-found", /\bcontent\b/);

  const scrollTop = () =>
    inside.evaluate(node => {
      let el = node.parentElement;
      while (el && !["auto", "scroll"].includes(getComputedStyle(el).overflowY)) el = el.parentElement;
      return el?.scrollTop ?? -1;
    });

  await page.getByRole("button", { name: "Back to top (bottom)" }).scrollIntoViewIfNeeded();
  expect(await scrollTop()).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Back to top (bottom)" }).click();
  await expect.poll(scrollTop).toBe(0);
});
