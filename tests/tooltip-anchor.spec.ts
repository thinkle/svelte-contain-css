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
  const tip = wrapper.locator(".tooltip");

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

async function ready(page: Page) {
  await page.goto("/svelte-contain-css/tests/tooltip-anchor");
  await page.waitForFunction(() =>
    document.querySelector(".tooltip-wrapper")?.isConnected,
  );
  await page.waitForTimeout(500);
}

/** Open a tooltip by keyboard focus -- no pointer involved. */
async function focusTooltip(page: Page, testid: string): Promise<Locator> {
  const tip = page.getByTestId(testid).locator(".tooltip");
  await page.getByTestId(testid).getByRole("button").focus();
  await expect
    .poll(() => tip.evaluate((el) => el.matches(":popover-open")))
    .toBe(true);
  return tip;
}

// Opened by focus, not hover: scrolling the page slides the target out from
// under a stationary pointer, which fires mouseleave and rightly closes a
// hover tooltip. A focused one has to stay open and follow.
test("an open tooltip follows its target when the page scrolls", async ({
  page,
}) => {
  await ready(page);
  const tip = await focusTooltip(page, "anchor-plain");

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

/**
 * The tooltip measures itself rather than an offscreen copy: it opens, is
 * measured and is placed in one synchronous run. So in the very next frame --
 * read in requestAnimationFrame, which runs just before that frame paints --
 * it must already be open AND beside its target. A tooltip that opened first
 * and moved later would be caught here at the viewport origin.
 */
test("a tooltip is already in place in the first frame it paints", async ({
  page,
}) => {
  await ready(page);
  const frame = await page.evaluate(
    () =>
      new Promise<{
        open: boolean;
        tip: { x: number; y: number };
        target: { x: number; y: number; bottom: number };
      }>((resolve) => {
        const wrap = document.querySelector('[data-testid="anchor-plain"]')!;
        const tip = wrap.querySelector(".tooltip")!;
        const button = wrap.querySelector("button")!;
        button.focus();
        requestAnimationFrame(() => {
          const t = tip.getBoundingClientRect();
          const b = button.getBoundingClientRect();
          resolve({
            open: tip.matches(":popover-open"),
            tip: { x: t.x, y: t.y },
            target: { x: b.x, y: b.y, bottom: b.bottom },
          });
        });
      }),
  );
  expect(frame.open).toBe(true);
  expect(frame.tip.x).toBeGreaterThan(frame.target.x - 40);
  expect(Math.abs(frame.tip.y - frame.target.bottom)).toBeLessThan(40);
});

test("tooltip content is in the DOM once, and not before first show", async ({
  page,
}) => {
  await ready(page);
  const body = page.getByText("rich tooltip body");
  await expect(body).toHaveCount(0);
  await focusTooltip(page, "anchor-rich");
  await expect(body).toHaveCount(1);
  // Still once after it closes: content stays mounted, but only one copy.
  await page.getByTestId("anchor-rich").getByRole("button").blur();
  await expect(body).toHaveCount(1);
});

test("a tooltip at the bottom edge flips above its target", async ({
  page,
}) => {
  await ready(page);
  const tip = await focusTooltip(page, "anchor-bottom");
  const t = (await tip.boundingBox())!;
  const target = (await page.getByTestId("anchor-bottom").boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(t.y + t.height).toBeLessThanOrEqual(target.y + 1);
  expect(t.y).toBeGreaterThanOrEqual(0);
  expect(t.y + t.height).toBeLessThanOrEqual(viewport.height);
});

test("a tooltip at the right edge flips to the left and stays on screen", async ({
  page,
}) => {
  await ready(page);
  const tip = await focusTooltip(page, "anchor-right");
  const t = (await tip.boundingBox())!;
  const target = (await page.getByTestId("anchor-right").boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(t.x).toBeLessThan(target.x);
  expect(t.x + t.width).toBeLessThanOrEqual(viewport.width);
});
