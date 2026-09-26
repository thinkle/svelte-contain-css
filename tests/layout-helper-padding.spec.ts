import { expect, test } from "@playwright/test";

/*
  Inline and Stack are unopinionated layout helpers -- a flex row or column
  with a gap, and no surface. Their padding used to fall back to the
  inherited theme --padding, so every one of them carried the page's (or an
  enclosing Card's) padding unless a caller zeroed it. They now default to 0
  and take padding only from their own variable or prop.
*/

const ROUTE = "/svelte-contain-css/tests/layout-helper-padding";

async function padding(page, testid: string, cls: string) {
  return page
    .locator(`[data-testid="${testid}"] .${cls}`)
    .first()
    .evaluate((el) => getComputedStyle(el).padding);
}

test("Inline and Stack ignore the theme's --padding", async ({ page }) => {
  await page.goto(ROUTE);
  expect(await padding(page, "themed", "inline")).toBe("0px");
  expect(await padding(page, "themed", "stack")).toBe("0px");
});

test("Inline and Stack ignore an enclosing Card's padding", async ({ page }) => {
  await page.goto(ROUTE);
  expect(await padding(page, "in-card", "inline")).toBe("0px");
  expect(await padding(page, "in-card", "stack")).toBe("0px");
});

test("their own variables still apply", async ({ page }) => {
  await page.goto(ROUTE);
  expect(await padding(page, "own-var", "inline")).toBe("6px");
  expect(await padding(page, "own-var", "stack")).toBe("7px");
});

test("the padding prop still applies", async ({ page }) => {
  await page.goto(ROUTE);
  expect(await padding(page, "prop", "inline")).toBe("9px");
  expect(await padding(page, "prop", "stack")).toBe("11px");
});
