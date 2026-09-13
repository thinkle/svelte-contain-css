import { expect, test } from "@playwright/test";

/*
  `var()` is not `var-with-fallbacks()`.

  CSS `var()` takes a name and ONE fallback, and everything after the first
  comma is that fallback. So `var(--padding, form-item, 8px)` reads as
  "`--padding`, or else the value `form-item, 8px`" -- which is not a length,
  so with `--padding` unset the declaration is invalid at computed-value time
  and the property falls back to its initial value. The prefixed variable the
  author meant to reach for, `--form-item-padding`, is never consulted.

  Three declarations in the library were written that way. These assertions
  pin the corrected chains: the component's own prefixed name wins, the
  generic name is next, and the literal is a real fallback rather than an
  accident.
*/

test("prefixed names in fallback chains are actually consulted", async ({
  page,
}) => {
  await page.goto("/svelte-contain-css/tests/var-fallbacks");

  const style = (testid: string, selector: string, prop: string) =>
    page
      .locator(`[data-testid="${testid}"] ${selector}`)
      .first()
      .evaluate(
        (node, p) =>
          getComputedStyle(node as Element)[
            p as keyof CSSStyleDeclaration
          ] as string,
        prop,
      );

  // --form-item-padding was silently ignored; --padding won instead.
  expect(await style("form-item-prefixed", ".form-item", "paddingTop")).toBe(
    "21px",
  );
  expect(await style("form-item-prefixed", ".form-item", "paddingBottom")).toBe(
    "21px",
  );

  // With nothing set, the literal 8px applies rather than collapsing to 0.
  expect(await style("form-item-literal", ".form-item", "paddingTop")).toBe(
    "8px",
  );

  // --button-border was the skipped middle name.
  expect(
    await style("circle-button-button-border", "button", "borderTopWidth"),
  ).toBe("3px");

  // The component's own name still beats it.
  expect(
    await style("circle-button-own-border", "button", "borderTopWidth"),
  ).toBe("5px");

  // And with nothing set there is still no border -- the bug produced that by
  // accident (invalid value -> initial), the fix produces it on purpose.
  expect(
    await style("circle-button-no-border", "button", "borderTopStyle"),
  ).toBe("none");
});
