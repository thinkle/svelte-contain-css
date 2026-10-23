// Screenshot the heading color specimen (/review/headings) for every
// preset x theme, at desktop and phone widths. Needs a running dev server.
//   node scripts/capture-headings.mjs [outDir] [baseUrl]
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const outDir = process.argv[2] ?? "artifacts/headings";
const baseUrl =
  process.argv[3] ?? "http://127.0.0.1:4173/svelte-contain-css";
const presets = ["default", "restrained", "editorial", "expressive", "solid"];
const themes = ["light", "dark", "retro", "forest-editorial-rounded"];
const viewports = { desktop: 1280, phone: 390 };

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
for (const [vpName, width] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const theme of themes) {
    for (const preset of presets) {
      await page.goto(
        `${baseUrl}/review/headings?theme=${theme}&preset=${preset}`,
      );
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => document.fonts.ready);
      const dir = path.join(outDir, vpName, theme);
      await mkdir(dir, { recursive: true });
      await page.screenshot({
        path: path.join(dir, `${preset}.png`),
        fullPage: true,
      });
    }
  }
  await page.close();
}
await browser.close();
console.log(`wrote ${outDir}`);
