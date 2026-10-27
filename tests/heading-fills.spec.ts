import { expect, test } from "@playwright/test";

/* Block heading presets key their fill by color family. A heading that keeps
   the preset's padding but loses its fill reads as stray indentation -- what
   happened under Retro, whose cards and fieldsets pinned their own
   background and so left every family. Every bundled base theme should give
   filled headings a fill wherever they get the padding. */

const BASES = [
  "full=themes/bootstrap.css",
  "full=themes/material.css",
  "full=themes/retro.css",
  "color=themes/light.css",
  "color=themes/dark.css",
  "color=themes/purple.css",
  "color=themes/forest.css",
  "color=themes/canyon.css",
];
const HEADINGS = ["solid-headings.css", "editorial-headings.css", "expressive-headings.css"];
const SCENARIOS = ["blog-mockup", "incredible-app-shell", "layout-workbench"];

for (const base of BASES) {
  test(`padded headings are filled: ${base}`, async ({ page }) => {
    const problems: string[] = [];
    for (const heading of HEADINGS) {
      for (const scenario of SCENARIOS) {
        await page.goto(`/svelte-contain-css/preview/${scenario}#${base}&heading=${heading}`);
        await page.waitForLoadState("networkidle");
        // Fills fade in with the theme transition; read them settled.
        await page.waitForTimeout(800);
        const found = await page.evaluate(() =>
          [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")]
            .filter((h) => {
              const cs = getComputedStyle(h);
              const alpha = /\/\s*0\)$|rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor);
              // A ruled heading (Expressive's h2) pads for its rule, not a fill.
              const ruled = ["Top", "Right", "Bottom", "Left"].some(
                (side) => parseFloat(cs.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0,
              );
              return parseFloat(cs.paddingLeft) > 2 && alpha && !ruled && h.getClientRects().length > 0;
            })
            .map((h) => `${h.tagName} "${h.textContent?.trim().slice(0, 30)}" ${getComputedStyle(h).backgroundColor}`),
        );
        for (const f of found) problems.push(`${heading} @ ${scenario}: ${f}`);
      }
    }
    expect(problems).toEqual([]);
  });
}
