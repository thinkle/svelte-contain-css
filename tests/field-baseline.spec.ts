import { expect, test } from "@playwright/test";

/**
 * Text fields, Selects and menu triggers in an `Inline align="baseline"` row
 * line their text up, so same-height fields line up edge to edge too.
 *
 * Debug page: /svelte-contain-css/tests/field-baseline
 */
test.describe("Field baselines", () => {
  test("a Select sits level with an Input on a baseline row", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/svelte-contain-css/tests/field-baseline");
    await page.waitForLoadState("networkidle");

    const row = page.getByTestId("row");
    const input = await row.locator("input").boundingBox();
    const select = await row
      .locator(".dropdown-wrapper nav.dropdown-menu > button")
      .boundingBox();
    expect(input && select).toBeTruthy();

    // Same field geometry, so equal heights; on a shared baseline that means
    // equal tops.
    expect(Math.abs(select!.height - input!.height)).toBeLessThan(1);
    expect(Math.abs(select!.y - input!.y)).toBeLessThan(1);
  });

  test("a menu trigger's label sits on the row's text baseline", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/svelte-contain-css/tests/field-baseline");
    await page.waitForLoadState("networkidle");

    const row = page.getByTestId("row");
    // A zero-size inline-block sits with its bottom edge on the baseline of
    // the line it is in, whatever the font size.
    const baseline = (selector: string) =>
      row
        .locator(selector)
        .first()
        .evaluate((el) => {
          const marker = document.createElement("span");
          marker.style.cssText = "display:inline-block;width:0;height:0";
          el.append(marker);
          const y = marker.getBoundingClientRect().bottom;
          marker.remove();
          return y;
        });
    const text = await baseline("[data-testid=text]");
    const trigger = await baseline(
      ":scope > nav.dropdown-menu > button .trigger-label",
    );
    const select = await baseline(".select-dropdown-label");
    expect(Math.abs(trigger - text)).toBeLessThan(1);
    expect(Math.abs(select - text)).toBeLessThan(1);
  });

  test("a narrow trigger still clips its label with an ellipsis", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/svelte-contain-css/tests/field-baseline");
    await page.waitForLoadState("networkidle");

    const box = page.getByTestId("narrow");
    const label = box.locator("nav.dropdown-menu > button .trigger-label");
    const metrics = await label.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        clipped: el.scrollWidth > el.clientWidth,
        overflow: s.overflowX,
        textOverflow: s.textOverflow,
      };
    });
    expect(metrics).toEqual({
      clipped: true,
      overflow: "clip",
      textOverflow: "ellipsis",
    });
    const button = await box
      .locator("nav.dropdown-menu > button")
      .boundingBox();
    const container = await box.boundingBox();
    expect(button!.x + button!.width).toBeLessThanOrEqual(
      container!.x + container!.width + 0.5,
    );
  });
});
