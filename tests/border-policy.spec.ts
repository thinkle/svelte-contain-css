import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const url = "/svelte-contain-css/tests/border-policy";
const borderless = ["inline", "stack", "nested-inline", "button", "button-link", "container"];

test("global shorthand and directional borders only reach bordered components", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--border: 3px solid blue; --border-top: 5px dashed red; --border-radius: 11px; --square-radius: 2px;"));
  for (const id of borderless) {
    for (const side of ["Top", "Right", "Bottom", "Left"]) {
      await expect(page.getByTestId(id)).toHaveCSS(`border-${side.toLowerCase()}-width`, "0px");
    }
  }
  for (const id of ["bordered-container", "tile", "fieldset"]) {
    await expect(page.getByTestId(id)).toHaveCSS("border-top-width", "5px");
    await expect(page.getByTestId(id)).toHaveCSS("border-right-width", "3px");
  }
  // A field keeps its own edge: the theme's global border doesn't reach it.
  for (const side of ["top", "right", "bottom", "left"]) {
    await expect(page.getByTestId("input")).toHaveCSS(`border-${side}-width`, "1px");
  }
  await expect(page.getByTestId("inline")).toHaveCSS("border-top-left-radius", "11px");
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-left-radius", "2px");
  await expect(page.getByTestId("inline")).toHaveCSS("padding-top", "0px");
});

test("explicit component and category borders still work", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--border: 8px solid blue; --inline-border: 2px solid green; --inline-border-bottom: 4px dashed red; --surface-border: 3px solid purple; --button-border: 1px solid black;"));
  for (const id of ["inline", "nested-inline"]) {
    await expect(page.getByTestId(id)).toHaveCSS("border-top-width", "2px");
    await expect(page.getByTestId(id)).toHaveCSS("border-bottom-width", "4px");
  }
  await expect(page.getByTestId("stack")).toHaveCSS("border-top-width", "0px");
  await expect(page.getByTestId("container")).toHaveCSS("border-top-width", "3px");
  for (const id of ["button", "button-link"]) {
    await expect(page.getByTestId(id)).toHaveCSS("border-top-width", "1px");
  }
});

for (const theme of ["bootstrap", "material", "retro"]) {
  test(`${theme} keeps layout helpers borderless`, async ({ page }) => {
    await page.goto(url);
    const css = readFileSync(`src/lib/vars/themes/${theme}.css`, "utf8").replaceAll(":root", "#theme");
    await page.addStyleTag({ content: css });
    for (const id of ["inline", "stack", "nested-inline"]) {
      await expect(page.getByTestId(id)).toHaveCSS("border-top-width", "0px");
      await expect(page.getByTestId(id)).toHaveCSS("border-bottom-width", "0px");
    }
    // Material fields are underlines; the others keep a full edge.
    await expect(page.getByTestId("input")).toHaveCSS("border-top-width", theme === "retro" ? "2px" : theme === "material" ? "0px" : "1px");
    await expect(page.getByTestId("input")).toHaveCSS("border-bottom-width", theme === "retro" ? "2px" : "1px");
  });
}

test("bordered components have a visible fallback without a global border", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-style", "solid");
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-width", "1px");
  await expect(page.getByTestId("bordered-container")).toHaveCSS("border-top-width", "1px");
});

test("buttons retain their narrower component-only border prefix chain", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--control-border: 6px solid red; --secondary-border: 7px solid blue;"));
  for (const id of ["button", "button-link"]) {
    await expect(page.getByTestId(id)).toHaveCSS("border-top-width", "0px");
  }
});

test("prefixed border longhands compose a border without global activation", async ({ page }) => {
  await page.goto(url);
  await page.locator("#theme").evaluate(el => el.setAttribute("style", "--border: 8px solid red; --border-style: dashed; --inline-border-width: 2px; --inline-border-style: solid; --inline-border-color: blue; --tile-border-width: 4px; --tile-border-style: dotted; --tile-border-color: green;"));
  await expect(page.getByTestId("inline")).toHaveCSS("border-top-width", "2px");
  await expect(page.getByTestId("inline")).toHaveCSS("border-top-color", "rgb(0, 0, 255)");
  await expect(page.getByTestId("stack")).toHaveCSS("border-top-width", "0px");
  // A complete shorthand takes precedence over the component longhands.
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-width", "8px");
  await page.locator("#theme").evaluate(el => (el as HTMLElement).style.removeProperty("--border"));
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-width", "4px");
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-style", "dotted");
  await expect(page.getByTestId("tile")).toHaveCSS("border-top-color", "rgb(0, 128, 0)");
});
