import { test, expect } from "@playwright/test";

for (const edgeToEdge of [false, true]) {
  test(`Page preserves consumer positioning and pseudo-elements (${edgeToEdge ? "safe area" : "desktop"})`, async ({ page, context }) => {
    await page.setViewportSize({ width: edgeToEdge ? 390 : 1200, height: 900 });
    if (edgeToEdge) {
      const cdp = await context.newCDPSession(page);
      await cdp.send("Emulation.setSafeAreaInsetsOverride", {
        insets: { top: 47, bottom: 34, left: 0, right: 0 },
      });
    }
    await page.goto("/svelte-contain-css/tests/page-safe-area");
    await page.waitForLoadState("networkidle");
    for (const id of ["custom-header", "custom-footer"]) {
      const el = page.getByTestId(id);
      await expect(el).toHaveCSS("position", "sticky");
      expect(await el.evaluate(node => getComputedStyle(node, "::before").content)).toBe('"BRAND"');
      expect(await el.evaluate(node => getComputedStyle(node, "::after").content)).toBe('"END"');
    }
    if (!edgeToEdge) {
      // Consumer spacing is not a notch and must not opt into decoration.
      await page.addStyleTag({ content: ".page > header { padding-top: 16px !important; }" });
    }
    await page.getByRole("button", { name: "Replace header and footer" }).click();
    for (const [id, edge, height] of [
      ["plain-header", "start", 47], ["plain-footer", "end", 34],
    ] as const) {
      const el = page.getByTestId(id);
      if (edgeToEdge) {
        await expect(el).toHaveAttribute(`data-contain-page-safe-${edge}`, "");
        expect(await el.evaluate((node, pseudo) => getComputedStyle(node, pseudo).height, edge === "start" ? "::before" : "::after")).toBe(`${height}px`);
      } else {
        await expect(el).not.toHaveAttribute(`data-contain-page-safe-${edge}`, "");
        await expect(el).toHaveCSS("position", "static");
      }
    }
  });
}
