import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * Private --_* vars that are only read on the element that sets them are
 * registered with `inherits: false` (vars/private-properties.css), so they
 * stop showing up under DevTools' "Inherited from ..." on every descendant.
 * The typography context vars must keep inheriting: the global :where()
 * rules in typography-context.css read them on headings and paragraphs
 * inside a container.
 */

const URL = "/svelte-contain-css/tests/private-vars";

async function customProp(locator: Locator, name: string) {
  return locator.evaluate(
    (el, n) => getComputedStyle(el).getPropertyValue(n).trim(),
    name,
  );
}

/** Names registered with `inherits: false` in any loaded stylesheet. */
async function nonInheritingRegistrations(page: Page) {
  return page.evaluate(() => {
    const names: string[] = [];
    const walk = (rules: CSSRuleList) => {
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSPropertyRule && !rule.inherits) {
          names.push(rule.name);
        }
        if (rule instanceof CSSImportRule && rule.styleSheet) {
          walk(rule.styleSheet.cssRules);
        }
      }
    };
    for (const sheet of Array.from(document.styleSheets)) walk(sheet.cssRules);
    return names;
  });
}

/**
 * What DevTools' Styles pane lists as inherited: every --_* declaration in a
 * rule matching an ancestor, one entry per ancestor rule, minus those
 * registered non-inheriting (DevTools hides those too). `total` counts them
 * anyway, i.e. what DevTools would list without the registrations.
 */
async function inheritedPrivateDeclarations(page: Page, selector: string) {
  const skip = new Set(await nonInheritingRegistrations(page));
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeId } = await cdp.send("DOM.querySelector", {
    nodeId: root.nodeId,
    selector,
  });
  const matched = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
  let total = 0;
  let shown = 0;
  for (const entry of matched.inherited ?? []) {
    const styles = [
      entry.inlineStyle,
      ...entry.matchedCSSRules.map((m) => m.rule.style),
    ];
    for (const style of styles) {
      for (const prop of style?.cssProperties ?? []) {
        if (!prop.name.startsWith("--_") || !prop.text) continue;
        total++;
        if (!skip.has(prop.name)) shown++;
      }
    }
  }
  await cdp.detach();
  return { total, shown };
}

test.describe("private custom properties", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByTestId("deep-paragraph")).toBeVisible();
  });

  test("same-element vars are set where declared but not inherited", async ({
    page,
  }) => {
    const card = page.locator(".card").first();
    const paragraph = page.getByTestId("deep-paragraph");

    // color-props() sets these on the card...
    expect(await customProp(card, "--_bg-base")).not.toBe("");
    expect(await customProp(card, "--_bg-mix-amount")).not.toBe("");
    // ...and the paragraph inside no longer carries them.
    for (const name of [
      "--_bg-base",
      "--_fg-base",
      "--_bg-mix-color",
      "--_bg-mix-amount",
      "--_fg-mix-color",
      "--_fg-mix-amount",
      "--_margin-top",
      "--_margin-bottom",
    ]) {
      expect(await customProp(paragraph, name), name).toBe("");
    }

    const tile = page.locator(".tile").first();
    expect(await customProp(tile, "--_tile-width")).not.toBe("");
    expect(
      await customProp(page.getByTestId("tile-paragraph"), "--_tile-width"),
    ).toBe("");
  });

  test("typography context vars and surface colors still inherit", async ({
    page,
  }) => {
    const paragraph = page.getByTestId("deep-paragraph");
    const heading = page.getByTestId("body-heading");

    // Set by typography-container-props() on the card, read on the h3 by
    // typography-context.css.
    expect(await customProp(heading, "--_h3-color")).not.toBe("");
    expect(await customProp(heading, "--_h3-line-height")).not.toBe("");
    expect(await customProp(heading, "--_heading-margin-top")).not.toBe("");
    expect(await customProp(paragraph, "--_prose-max-width")).not.toBe("");
    expect(await customProp(paragraph, "--_prose-line-height")).not.toBe("");
    // Read on descendants by the clickable affordances and Card's sections.
    expect(await customProp(paragraph, "--_background-color")).not.toBe("");
    expect(await customProp(paragraph, "--_padding")).not.toBe("");
  });

  test("fewer private vars listed as inherited on a deep paragraph", async ({
    page,
  }, testInfo) => {
    const { total, shown } = await inheritedPrivateDeclarations(
      page,
      "[data-testid='deep-paragraph']",
    );
    const summary = `inherited --_* declarations on deep paragraph: ${shown} listed (${total} without registrations)`;
    testInfo.annotations.push({ type: "devtools", description: summary });
    console.log(summary);

    expect(await nonInheritingRegistrations(page)).toContain("--_bg-base");
    expect(shown).toBeLessThan(total);
  });
});
