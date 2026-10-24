import { expect, test } from "@playwright/test";

// The sticky header's opaque ::before veil used to paint over the toolbar
// preceding the table, even while the header was still in its normal flow.
for (const theme of ["bootstrap", "light", "dark"]) {
  test(`${theme}: the sticky veil leaves the preceding toolbar visible and clickable`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 600 });
    await page.goto(`/svelte-contain-css/review/${theme}/app/table-workbench`);
    await page.waitForLoadState("networkidle");
    const exportButton = page.getByRole("button", { name: "Export Glossary" });
    await exportButton.scrollIntoViewIfNeeded();
    const unobscured = await exportButton.evaluate(el => {
      const r = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
    });
    expect(unobscured).toBe(true);
    await exportButton.click({ trial: true });

    // clip must not introduce a scroll container and break sticky positioning.
    const panel = page.locator(".page > .side-by-side > .content");
    await panel.evaluate(el => { el.scrollTop = el.scrollHeight; });
    await expect.poll(() => page.locator(".fixed-table-head").evaluate(el => {
      const panel = el.closest(".page")!.querySelector(":scope > .side-by-side > .content")!;
      const expected = panel.getBoundingClientRect().top
        + parseFloat(getComputedStyle(panel).paddingTop)
        + parseFloat(getComputedStyle(el).top);
      return Math.abs(el.getBoundingClientRect().top - expected);
    })).toBeLessThanOrEqual(1);
  });
}
