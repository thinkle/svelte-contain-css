import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const url = "/svelte-contain-css/tests/theme-chains";

// color-mix serializes as color(srgb ...), even when the source token is rgb().
// Compare rendered RGBA values rather than browser serialization choices.
async function expectBackground(page: Page, id: string, expected: string) {
  const pixels = await page.getByTestId(id).evaluate((el, color) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d")!;
    const rgba = (value: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data);
    };
    return { actual: rgba(getComputedStyle(el).backgroundColor), expected: rgba(color) };
  }, expected);
  expect(pixels.actual).toEqual(pixels.expected);
}

test("ui typography and control geometry stay in separate families", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--ui-font-size: 23px; --ui-font-weight: 650; --control-font-size: 47px; --primary-font-size: 49px; --secondary-font-size: 51px; --ui-padding: 77px; --secondary-padding: 79px; --control-padding: 6px 12px; --control-border-radius: 9px; --secondary-border-radius: 35px; --ui-bg: red; --control-bg: rgb(10, 20, 30); --control-fg: white; --field-bg: rgb(40, 50, 60);"));
  for (const id of ["button", "primary", "link", "input", "select", "native"]) {
    await expect(page.getByTestId(id)).toHaveCSS("font-size", "23px");
    await expect(page.getByTestId(id)).toHaveCSS("padding-top", "6px");
    await expect(page.getByTestId(id)).toHaveCSS("padding-right", "12px");
  }
  await expect(page.getByTestId("tag")).toHaveCSS("font-weight", "650");
  await expect(page.getByTestId("button")).toHaveCSS("border-top-left-radius", "9px");
  // Text fields are the `field` family, not control chrome: a field must not
  // read as a button.
  await expectBackground(page, "input", "rgb(40, 50, 60)");
});

test("component and family overrides take precedence", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--control-padding: 6px; --input-padding: 10px; --select-padding: 14px; --button-padding: 8px; --ui-font-size: 23px; --button-font-size: 25px; --select-font-size: 27px;"));
  for (const [id, padding] of [["button", "8px"], ["primary", "8px"], ["link", "8px"], ["input", "10px"], ["native", "10px"], ["select", "14px"]]) {
    await expect(page.getByTestId(id)).toHaveCSS("padding-top", padding);
  }
  await expect(page.getByTestId("primary")).toHaveCSS("font-size", "25px");
  await expect(page.getByTestId("select")).toHaveCSS("font-size", "27px");
});

test("surface and field geometry ignore unrelated legacy prefixes", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--padding: 5px; --block-padding: 71px; --menu-padding: 73px; --surface-padding: 11px; --surface-square-radius: 31px; --paragraph-padding: 75px; --control-padding: 7px; --control-square-radius: 3px;"));
  await expect(page.getByTestId("container")).toHaveCSS("padding-top", "11px");
  await expect(page.getByTestId("select")).toHaveCSS("padding-top", "7px");
  await expect(page.getByTestId("select")).toHaveCSS("border-top-left-radius", "3px");
});

for (const theme of ["bootstrap", "material", "retro", "light", "forest", "canyon"]) {
  test(`${theme} preserves themed field colors and control padding`, async ({ page }) => {
    await page.goto(url);
    await page.addStyleTag({ content: readFileSync(`src/lib/vars/themes/${theme}.css`, "utf8").replaceAll(":root", "#theme") });
    const expected = await page.locator("#theme").evaluate(el => {
      const probe = document.createElement("div");
      probe.style.backgroundColor = "var(--field-bg)";
      el.append(probe);
      const bg = getComputedStyle(probe).backgroundColor;
      probe.remove();
      return bg;
    });
    for (const id of ["input", "select"]) await expectBackground(page, id, expected);
    const nativeBackground = await page.getByTestId("select").evaluate(el => getComputedStyle(el).backgroundColor);
    const trigger = page.locator("#theme .dropdown-wrapper > .dropdown-menu > button");
    await expect(trigger).toHaveCSS("background-color", nativeBackground);
    if (theme === "bootstrap") {
      for (const id of ["button", "input", "select", "native"]) {
        await expect(page.getByTestId(id)).toHaveCSS("padding-top", "6px");
        await expect(page.getByTestId(id)).toHaveCSS("padding-right", "12px");
      }
    }
  });
}
