import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * A tooltip must be positioned next to its target, even when the target's
 * direct child has no layout box: a <svelte-css-wrapper> (added whenever a
 * component is given --custom-property props), a consumer's own
 * `display: contents` element, or a bare text node.
 */

const CASES = [
  "anchor-plain",
  "anchor-cssprop",
  "anchor-contents",
  "anchor-text",
  "anchor-interpolation",
] as const;

async function showTooltip(page: Page, testid: string): Promise<Locator> {
  const wrapper = page.getByTestId(testid);
  const tip = wrapper.locator(".tooltip:not(.measure)");

  // Drive the pointer by hand: the tooltip opens on mouseenter, so the pointer
  // has to actually cross into the target rather than be placed on it. Retry
  // the crossing — on a cold dev server the first page can still be hydrating,
  // and a pointer that is already inside the target never enters it again.
  await expect
    .poll(
      async () => {
        const box = await wrapper.boundingBox();
        if (!box) return false;
        await page.mouse.move(2, 2);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
          steps: 5,
        });
        await page.waitForTimeout(150);
        return tip.evaluate((el) => el.matches(":popover-open"));
      },
      { timeout: 10_000 },
    )
    .toBe(true);

  return tip;
}

for (const testid of CASES) {
  test(`tooltip is anchored to its target: ${testid}`, async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/tooltip-anchor");
    // The tooltip opens on mouseenter, and the pointer only enters once. If we
    // move it before hydration attaches the handler, no later event arrives.
    await page.waitForFunction(() =>
      document.querySelector(".tooltip-wrapper")?.isConnected,
    );
    await page.waitForTimeout(500);

    const tip = await showTooltip(page, testid);

    const tipBox = await tip.boundingBox();
    const targetBox = await page.getByTestId(testid).boundingBox();
    expect(tipBox).not.toBeNull();
    expect(targetBox).not.toBeNull();

    // The bug renders the tooltip at the viewport origin; a correctly
    // anchored tooltip overlaps its target horizontally and sits near it
    // vertically.
    const horizontallyOverlaps =
      tipBox!.x < targetBox!.x + targetBox!.width &&
      targetBox!.x < tipBox!.x + tipBox!.width;
    expect(
      horizontallyOverlaps,
      `tooltip x=${tipBox!.x} does not overlap target x=${targetBox!.x}..${targetBox!.x + targetBox!.width}`,
    ).toBe(true);

    const verticalGap = tipBox!.y - (targetBox!.y + targetBox!.height);
    expect(
      Math.abs(verticalGap),
      `tooltip is ${verticalGap}px from the bottom of its target`,
    ).toBeLessThan(40);
  });
}

test("an open tooltip follows its target when the page scrolls", async ({
  page,
}) => {
  await page.goto("/svelte-contain-css/tests/tooltip-anchor");
  await page.waitForFunction(() =>
    document.querySelector(".tooltip-wrapper")?.isConnected,
  );
  await page.waitForTimeout(500);

  const tip = await showTooltip(page, "anchor-plain");

  const before = await tip.boundingBox();
  const targetBefore = await page.getByTestId("anchor-plain").boundingBox();

  await page.evaluate(() => window.scrollBy(0, 120));
  await page.waitForTimeout(200);

  const after = await tip.boundingBox();
  const targetAfter = await page.getByTestId("anchor-plain").boundingBox();

  // The target moved up with the scroll; the tooltip must move with it rather
  // than staying pinned to stale viewport coordinates.
  const targetShift = targetAfter!.y - targetBefore!.y;
  const tipShift = after!.y - before!.y;
  expect(Math.abs(targetShift)).toBeGreaterThan(50);
  expect(
    Math.abs(tipShift - targetShift),
    `target moved ${targetShift}px but tooltip moved ${tipShift}px`,
  ).toBeLessThan(8);
});
