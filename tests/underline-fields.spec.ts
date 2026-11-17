import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * vars/underline-fields.css: on focus a stronger rule grows from the centre
 * of the field (a gradient painted by the field itself, so Input needs no
 * wrapper). Without the preset nothing about a field's background changes.
 */
const URL = "/svelte-contain-css/tests/underline-fields";
async function load(page: Page, query = "") {
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto(`${URL}${query}`);
  await page.waitForLoadState("networkidle");
}
/* The field that is actually drawn: Select shows a native <select> only in
   its small tier, otherwise a dropdown button. */
const fields = (page: Page): [string, Locator][] => [
  ["input", page.getByTestId("input")],
  ["textarea", page.getByTestId("textarea")],
  ["select", page.locator(".dropdown-wrapper > .dropdown-menu > button").first()],
];
const size = (l: Locator) => l.evaluate((n) => getComputedStyle(n).backgroundSize);
const bgInfo = (l: Locator) =>
  l.evaluate((n) => {
    const s = getComputedStyle(n);
    return [s.backgroundImage, s.backgroundSize, s.backgroundPosition, s.backgroundRepeat, s.backgroundOrigin, s.transitionProperty, s.transitionDuration];
  });

for (const name of ["input", "textarea", "select"]) {
  test(`${name}: the rule grows from 0 to the full width on focus and retracts on blur`, async ({ page }) => {
    await load(page);
    const f = fields(page).find(([n]) => n === name)![1];
    await expect(f).toBeVisible();
    const w = (await f.boundingBox())!.width;
    expect(await size(f)).toMatch(/^0(px|%) 2px$/);
    await f.focus();
    await expect.poll(() => size(f)).toMatch(new RegExp(`^(100%|${w}px) 2px$`));
    await f.evaluate((n) => (n as HTMLElement).blur());
    await expect.poll(() => size(f)).toMatch(/^0(px|%) 2px$/);
  });
}

test("it grows from the centre, over the resting rule, through the transition", async ({ page }) => {
  await load(page, "?dur=2000ms%20linear");
  const f = page.getByTestId("input");
  expect(await f.evaluate((n) => getComputedStyle(n).backgroundPositionX)).toBe("50%");
  expect(await f.evaluate((n) => getComputedStyle(n).backgroundOrigin)).toBe("border-box");
  await f.focus();
  await page.waitForTimeout(700);
  const w = await f.evaluate((n) => parseFloat(getComputedStyle(n).backgroundSize));
  expect(w).toBeGreaterThan(0);
  expect(w).toBeLessThan(100); // percentage in flight
  // The resting rule's transition is still there.
  expect(await f.evaluate((n) => getComputedStyle(n).transitionProperty)).toContain("border-color");
});

test("colour and origin come from the variables; default is the focus/primary colour", async ({ page }) => {
  await load(page);
  const c = page.getByTestId("colored");
  expect(await c.evaluate((n) => getComputedStyle(n).backgroundImage)).toContain("rgb(255, 0, 128)");
  expect(await c.evaluate((n) => getComputedStyle(n).backgroundPositionX)).toBe("0%");
  const plain = page.getByTestId("input");
  const img = await plain.evaluate((n) => getComputedStyle(n).backgroundImage);
  expect(img).toContain("linear-gradient");
  expect(img).not.toContain("rgb(255, 0, 128)");
});

test("the focus line appears immediately in place of the ring", async ({ page }) => {
  await load(page, "?dur=3000ms%20linear");
  for (const [, field] of fields(page)) {
    const focusStyle = await field.evaluate((element: HTMLElement) => {
      const restingFill = getComputedStyle(element).backgroundColor;
      element.focus();
      const style = getComputedStyle(element);
      return {
        fillUnchanged: style.backgroundColor === restingFill,
        bottomMatchesText: style.borderBottomColor === style.color,
        outline: style.outlineStyle,
        shadow: style.boxShadow,
      };
    });
    expect(focusStyle).toEqual({
      fillUnchanged: true,
      bottomMatchesText: true,
      outline: "none",
      shadow: "none",
    });
  }
});

test("a pointer-focused text field uses the underline", async ({ page }) => {
  await load(page);
  const f = page.getByTestId("input");
  await f.click();
  await expect(f).toBeFocused();
  await expect(f).toHaveCSS("outline-style", "none");
  await expect.poll(() => size(f)).toMatch(/^100% 2px$/);
});

test("forced colors retain an outline for keyboard focus", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await load(page);
  const f = page.getByTestId("input");
  await page.keyboard.press("Tab");
  await expect(f).toBeFocused();
  await expect(f).not.toHaveCSS("outline-style", "none");
});

test("reduced motion: no transition on the rule", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await load(page, "?dur=3000ms%20linear");
  for (const [, f] of fields(page)) {
    expect(await f.evaluate((n) => getComputedStyle(n).transitionProperty)).not.toContain("background-size");
    await f.focus();
    await expect.poll(() => size(f)).toMatch(/^(100%|[\d.]+px) 2px$/); // there at once, well inside 3s
  }
});

test("without the preset a field's background is exactly the unadorned default", async ({ page }) => {
  await load(page, "?preset=off");
  for (const [, f] of fields(page)) {
    const [image, sz, pos, repeat, origin, prop] = await bgInfo(f);
    expect(image).toBe("none");
    expect(sz).toBe("auto");
    expect(pos).toBe("0% 0%");
    expect(repeat).toBe("repeat");
    expect(origin).toBe("padding-box");
    expect(prop).toBe("border-color");
    await f.focus();
    expect(await size(f)).toBe("auto");
    await expect(f).not.toHaveCSS("outline-style", "none");
  }
});

test("non-text inputs are not given an underline", async ({ page }) => {
  await load(page);
  expect(await page.getByTestId("check").evaluate((n) => getComputedStyle(n).backgroundImage)).toBe("none");
});
