import { expect, test } from "@playwright/test";

/*
  Style shorthands must reach COMPUTED CSS, not merely become a variable.

  Each component's prop list is built from the SCSS mixins its own CSS
  includes (see src/lib/styleProps.ts), so the thing worth asserting is that
  the mixin really does consume the variable. `--button-font-weight` being
  emitted proves nothing on its own; `font-weight: 900` on the rendered
  button does.

  This is the check that stops a group being applied to a component whose CSS
  does not actually include that mixin -- the "typed but never read" bug that
  MarginStyleProps was introduced to stop repeating, which this change would
  otherwise have made much easier to commit at scale.
*/

type Expected = Record<string, string>;

const CASES: Record<string, Expected> = {
  Button: {
    fontWeight: "900",
    fontSize: "29px",
    letterSpacing: "3px",
    textAlign: "right",
    paddingTop: "7px",
  },
  Tag: {
    fontWeight: "800",
    fontSize: "27px",
    letterSpacing: "2px",
    paddingTop: "6px",
  },
  Container: {
    fontWeight: "700",
    fontSize: "25px",
    letterSpacing: "4px",
    paddingTop: "9px",
  },
  Stack: { paddingTop: "13px", marginBlockStart: "17px" },
};

test("style shorthands reach computed CSS", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/passthrough");

  const broken: string[] = [];
  for (const [name, expected] of Object.entries(CASES)) {
    const el = page.locator(`[data-testid="shorthand-${name}"]`);
    await expect(el, `${name} fixture missing`).toBeAttached();

    const got = await el.evaluate((node, keys) => {
      const c = getComputedStyle(node as Element);
      return Object.fromEntries(
        keys.map((k) => [k, c[k as keyof CSSStyleDeclaration] as string]),
      );
    }, Object.keys(expected));

    for (const [prop, want] of Object.entries(expected)) {
      if (got[prop] !== want) {
        broken.push(`${name}.${prop}: expected ${want}, got ${got[prop]}`);
      }
    }
  }

  expect(broken, "shorthands not reaching CSS").toEqual([]);
});
