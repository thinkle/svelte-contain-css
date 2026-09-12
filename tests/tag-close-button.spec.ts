import { expect, test } from "@playwright/test";

/*
  Tag's close button affordance.

  Three things were wrong, all of them because the button borrowed affordances
  built for a standalone button sitting on a page rather than a transparent
  control sitting on a coloured chip:

  1. `clickable()` derives its hover fill from --_background-color, which the
     button inherits from the tag. On a red tag that gave 90% red + 10% white:
     a muddy circle a shade off the tag underneath it, reading as a rendering
     artifact rather than a control.
  2. `focus-ring()`'s 3px box-shadow at a 2px offset is sized for a button on a
     page. On a 15px control inside a 26px tag the ring ballooned well outside
     the tag.
  3. The glyph is sized in `em` so it tracks a deliberately tiny tag font,
     which left a 15x15 pointer target -- under the 24x24 WCAG 2.5.8 minimum.
*/

const TAG_PAGE = "/svelte-contain-css/tests/passthrough";

test.describe("Tag close button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TAG_PAGE);
    await expect(page.locator("[data-closable-tag] .tag.closable")).toBeAttached();
  });

  test("pointer target meets the 24px minimum without resizing the glyph", async ({
    page,
  }) => {
    const btn = page.locator("[data-closable-tag] .close-button");

    const target = await btn.evaluate((n) => {
      const after = getComputedStyle(n, "::after");
      return {
        width: parseFloat(after.width),
        height: parseFloat(after.height),
      };
    });
    expect(target.width).toBeGreaterThanOrEqual(24);
    expect(target.height).toBeGreaterThanOrEqual(24);

    // The visual glyph stays small -- the target is expanded, not the button,
    // so the tag's own height is unchanged.
    const visual = (await btn.boundingBox())!;
    expect(visual.width).toBeLessThan(24);

    /* ...and the expanded area really belongs to the button, rather than
       being painted and inert. Asserted by hit-testing rather than by
       clicking: a click would only prove the handler is wired, which is
       already covered elsewhere, and would make this spec depend on the page
       having hydrated. */
    const hits = await btn.evaluate((n) => {
      const r = (n as Element).getBoundingClientRect();
      const probe = (dx: number, dy: number) =>
        document.elementFromPoint(r.left + dx, r.top + dy) === n;
      return {
        centre: probe(r.width / 2, r.height / 2),
        // Outside the 15px glyph, inside the 24px target.
        aboveLeft: probe(-3, -3),
        belowRight: probe(r.width + 3, r.height + 3),
        // Well outside the target: must NOT be the button.
        farAway: probe(-40, -40),
      };
    });
    expect(hits.centre, "glyph itself").toBe(true);
    expect(hits.aboveLeft, "expanded target, top-left").toBe(true);
    expect(hits.belowRight, "expanded target, bottom-right").toBe(true);
    expect(hits.farAway, "target must not swallow the whole tag").toBe(false);
  });

  test("the hover affordance contrasts with the tag instead of matching it", async ({
    page,
  }) => {
    const tag = page.locator("[data-closable-tag] .tag.closable");
    const btn = tag.locator(".close-button");

    const atRest = await btn.evaluate(
      (n) => getComputedStyle(n, "::before").backgroundColor,
    );
    expect(atRest, "no fill at rest").toMatch(/rgba?\(0, 0, 0, 0\)|transparent/);

    await btn.hover();
    await expect
      .poll(async () =>
        btn.evaluate((n) => getComputedStyle(n, "::before").backgroundColor),
      )
      .not.toMatch(/rgba?\(0, 0, 0, 0\)|transparent/);

    // The scrim is mixed from the tag's FOREGROUND, so it lands on the far
    // side of the tag's background rather than a shade away from it. The old
    // fill was mixed from the background itself, which is what made it muddy.
    const [tagLum, scrimLum] = await Promise.all([
      tag.evaluate((n) => relLum(getComputedStyle(n).backgroundColor)),
      btn.evaluate((n) => relLum(getComputedStyle(n).color)),
    ]);
    expect(
      Math.abs(tagLum - scrimLum),
      "scrim colour must contrast with the tag it sits on",
    ).toBeGreaterThan(0.2);
  });

  test("the focus ring is tight enough to clear the tag's edge", async ({
    page,
  }) => {
    const tag = page.locator("[data-closable-tag] .tag.closable");
    const btn = tag.locator(".close-button");
    await btn.focus();

    const ring = await btn.evaluate((n) => {
      const c = getComputedStyle(n);
      return {
        shadow: c.boxShadow,
        width: parseFloat(c.outlineWidth) || 0,
        offset: parseFloat(c.outlineOffset) || 0,
      };
    });

    // The 3px spread shadow is what escaped the tag; the tight outline stays.
    expect(ring.shadow).toMatch(/none|rgba?\(0, 0, 0, 0\)/);

    /* Asserted as a budget rather than by measuring containment, because the
       room available IS the tag's padding-block: the button is as tall as the
       tag's line box, so a caller setting `padding="0"` leaves no space at any
       ring size. What this pins down is that the ring stays within the default
       padding (0.2em, ~2.4px) instead of the 5px the shared mixin produced. */
    const extent = ring.width + ring.offset;
    expect(extent, "focus ring extends past the tag's padding").toBeLessThanOrEqual(2);
    expect(ring.width, "focus ring must still be visible").toBeGreaterThan(0);

    const tagPad = await tag.evaluate((n) =>
      parseFloat(getComputedStyle(n).paddingTop),
    );
    expect(extent).toBeLessThanOrEqual(tagPad + 0.5);
  });
});

/* Injected into the page context by the evaluate calls above. */
declare function relLum(color: string): number;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).relLum = (color: string) => {
      const m = color.match(/[\d.]+/g)!.map(Number);
      let [r, g, b] = m;
      // getComputedStyle can hand back color(srgb 0..1) as well as rgb(0..255)
      if (r <= 1 && g <= 1 && b <= 1) [r, g, b] = [r * 255, g * 255, b * 255];
      const lin = (v: number) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };
  });
});
