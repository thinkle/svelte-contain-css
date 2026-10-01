import { test, expect } from "@playwright/test";

/**
 * vars/defaults.css (built from src/lib/vars/colors.css) is the one
 * stylesheet every consumer loads regardless of which theme -- or no theme
 * at all -- they pick. #18 ("Indigo default theme") threaded indigo through
 * --bg/--fg/--focus-color and the bare `a` link fallback while redesigning
 * themes/light.css, so an app that imports only defaults.css (or a theme
 * that only sets --bg/--fg) got Contain's own brand colour whether it asked
 * for one or not. This pins the fix: with no theme loaded, the structural
 * vars stay neutral or derive from whatever the app already provided
 * (--primary-bg), rather than hard-coding a hue here too.
 */

const URL = "/svelte-contain-css/tests/neutral-defaults";

/** Max channel - min channel. Near 0 reads as grey; a real hue is well above it. */
function chroma(rgb: string) {
  const nums = rgb.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
  const [r, g, b] = nums;
  return Math.max(r, g, b) - Math.min(r, g, b);
}

test("the page background and text stay neutral with no theme loaded", async ({
  page,
}) => {
  await page.goto(URL);
  const { bg, fg } = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    return { bg: cs.backgroundColor, fg: cs.color };
  });
  expect(chroma(bg), `--bg resolved to ${bg}, which is not neutral`).toBeLessThan(10);
  expect(chroma(fg), `--fg resolved to ${fg}, which is not neutral`).toBeLessThan(10);
});

test("a derived border stays neutral too, since it mixes --fg into --bg", async ({
  page,
}) => {
  await page.goto(URL);
  const border = await page
    .getByTestId("card")
    .evaluate((el) => getComputedStyle(el).borderColor);
  expect(chroma(border), `border-color resolved to ${border}, which is not neutral`).toBeLessThan(
    10,
  );
});

test("--focus-color is unset, so the browser's own focus ring applies", async ({
  page,
}) => {
  await page.goto(URL);
  const focusColor = await page
    .getByTestId("button")
    .evaluate((el) => getComputedStyle(el).getPropertyValue("--focus-color").trim());
  expect(focusColor).toBe("");
});

test("a bare link derives its color from --primary-bg, not a hard-coded hue", async ({
  page,
}) => {
  await page.goto(URL);
  const [linkColor, primaryBg] = await page.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.color = "var(--primary-bg)";
    document.body.appendChild(probe);
    const primary = getComputedStyle(probe).color;
    probe.remove();
    return [
      getComputedStyle(document.querySelector('[data-testid="link"]')!).color,
      primary,
    ];
  });
  expect(linkColor).toBe(primaryBg);
});
