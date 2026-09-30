import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * An overlay (Tooltip popover, DropdownMenu popover, Dialog) is a DOM child of
 * wherever it was placed, and the top layer does not change inheritance. The
 * test page puts each one in a nowrap / centred / bold / uppercase host. The
 * overlay must reset those to its own defaults, keep honouring its own
 * --component-* vars, and still inherit custom properties for theming.
 */

const URL = "/svelte-contain-css/tests/overlay-inheritance";

const RESET = {
  whiteSpace: "normal",
  textAlign: "start",
  fontWeight: "400",
  fontStyle: "normal",
  textTransform: "none",
  letterSpacing: "normal",
  fontVariant: "normal",
  textIndent: "0px",
  wordBreak: "normal",
  cursor: "auto",
};

async function ready(page: Page) {
  await page.goto(URL);
  await page.waitForFunction(() =>
    document.querySelector(".tooltip-wrapper")?.isConnected,
  );
  await page.waitForTimeout(500);
}

async function styles(loc: Locator) {
  return loc.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      whiteSpace: cs.whiteSpace,
      textAlign: cs.textAlign,
      fontWeight: cs.fontWeight,
      fontStyle: cs.fontStyle,
      textTransform: cs.textTransform,
      letterSpacing: cs.letterSpacing,
      fontVariant: cs.fontVariant,
      textIndent: cs.textIndent,
      wordBreak: cs.wordBreak,
      cursor: cs.cursor,
      lineHeight: cs.lineHeight,
      tooltipBg: cs.getPropertyValue("--tooltip-bg").trim(),
    };
  });
}

async function openTooltip(page: Page, testid: string): Promise<Locator> {
  const tip = page.getByTestId(testid).locator(".tooltip");
  const trigger = page.getByTestId(testid).locator("[tabindex]").first();
  // Retry the focus: on a cold dev server the page may still be hydrating,
  // and a focusin before the handler is attached never arrives again.
  await expect
    .poll(
      async () => {
        await trigger.blur();
        await trigger.focus();
        await page.waitForTimeout(150);
        return tip.evaluate((el) => el.matches(":popover-open"));
      },
      { timeout: 10_000 },
    )
    .toBe(true);
  return tip;
}

test("the host really is hostile", async ({ page }) => {
  await ready(page);
  const host = await styles(page.getByTestId("host-cell"));
  expect(host.whiteSpace).toBe("nowrap");
  expect(host.fontWeight).toBe("700");
  expect(host.textTransform).toBe("uppercase");
});

test("a tooltip resets text styles inherited from its host", async ({
  page,
}) => {
  await ready(page);
  const tip = await openTooltip(page, "tip-default");
  const s = await styles(tip);
  expect(s).toMatchObject(RESET);
  // --line-height from the theme, not the host's `line-height: 3`.
  expect(parseFloat(s.lineHeight)).toBeLessThan(40);
  // Custom properties still inherit: that's how theming reaches the popover.
  expect(s.tooltipBg).toBe("rgb(255, 250, 205)");
});

test("a long tooltip wraps at its max-width and stays on screen", async ({
  page,
}) => {
  await ready(page);
  const tip = await openTooltip(page, "tip-default");
  const box = (await tip.boundingBox())!;
  const viewport = page.viewportSize()!;
  const maxWidth = await tip.evaluate((el) =>
    parseFloat(getComputedStyle(el).maxWidth),
  );
  expect(box.width).toBeLessThanOrEqual(maxWidth + 1);
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
  // More than one line: it wrapped rather than running off the edge.
  const lineHeight = await tip.evaluate((el) =>
    parseFloat(getComputedStyle(el).lineHeight),
  );
  expect(box.height).toBeGreaterThan(lineHeight * 2);
});

test("--tooltip-* vars still override the reset", async ({ page }) => {
  await ready(page);
  const tip = await openTooltip(page, "tip-themed");
  const s = await styles(tip);
  expect(s.whiteSpace).toBe("nowrap");
  expect(s.fontWeight).toBe("900");
  expect(s.textAlign).toBe("right");
  expect(s.textTransform).toBe("lowercase");
});

test("a dropdown menu's popover resets text styles from its host", async ({
  page,
}) => {
  await ready(page);
  const menu = page.getByTestId("menu");
  await menu.getByRole("button", { name: "Menu" }).click();
  const container = menu.locator(".dropdown-container");
  await expect
    .poll(() => container.evaluate((el) => el.matches(":popover-open")))
    .toBe(true);
  const s = await styles(container);
  expect(s).toMatchObject({ ...RESET, cursor: "auto" });
});

test("a dialog resets text styles from where it was declared", async ({
  page,
}) => {
  await ready(page);
  await page.getByTestId("open-dialog").click();
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();
  const s = await styles(dialog);
  expect(s).toMatchObject(RESET);
});
