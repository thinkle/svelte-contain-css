import { expect, test } from "@playwright/test";

/*
  CircleButton's variables are named `--circle-button-*`, with `--mini-button-*`
  kept behind them as a fallback.

  The component answered only to `mini-button` until now, because it was called
  MiniButton before the rename. Renaming a published variable is a breaking
  change unless the old name keeps resolving, so the compatibility cases below
  matter as much as the new ones -- and the precedence case is what makes the
  new name usable at all: if the old name won, no consumer could override a
  theme that sets it.
*/

const box = (testid: string) =>
  `[data-testid="${testid}"] button`;

test("circle-button variables, with mini-button still behind them", async ({
  page,
}) => {
  await page.goto("/svelte-contain-css/tests/circle-button-vars");

  /*
    Colours come back as `color(srgb 0.0039 …)` rather than `rgb(1, 2, 3)`,
    because `color-props` routes every colour through `color-mix()` for the
    per-channel mix knobs. Normalise to 0-255 triples so the fixture can state
    the colour it set rather than its float encoding.
  */
  const read = async (testid: string) =>
    page.locator(box(testid)).evaluate((node) => {
      const toRgb = (value: string) => {
        const nums = value.match(/[\d.]+/g)?.map(Number) ?? [];
        const channels = /^color\(/.test(value)
          ? nums.slice(0, 3).map((n) => Math.round(n * 255))
          : nums.slice(0, 3);
        return `rgb(${channels.join(", ")})`;
      };
      const c = getComputedStyle(node as Element);
      return {
        bg: toRgb(c.backgroundColor),
        fg: toRgb(c.color),
        width: c.width,
      };
    });

  // The new name as a style prop.
  expect(await read("new-prop")).toMatchObject({
    bg: "rgb(1, 2, 3)",
    fg: "rgb(4, 5, 6)",
  });

  /*
    ...and the prop must be *emitted* under the new prefix, which the computed
    colour above cannot show: `--mini-button-bg` resolves through the fallback
    chain to exactly the same paint. So assert the variable the component
    actually writes. This is the one case that fails if the prefix handed to
    elementProps is left stale.
  */
  const emitted = await page
    .locator(box("new-prop"))
    .getAttribute("style");
  expect(emitted).toContain("--circle-button-bg");
  expect(emitted).toContain("--circle-button-fg");
  expect(emitted).not.toContain("--mini-button-bg");

  // The new name as a variable on an ancestor.
  expect(await read("new-var")).toMatchObject({
    bg: "rgb(7, 8, 9)",
    fg: "rgb(10, 11, 12)",
    width: "41px",
  });

  // The old name, untouched -- an app that set it before the rename.
  expect(await read("old-var")).toMatchObject({
    bg: "rgb(13, 14, 15)",
    fg: "rgb(16, 17, 18)",
    width: "43px",
  });

  // Both set: the new name resolves first. Without this the rename would be
  // cosmetic, since every bundled theme sets the old name at :root.
  expect(await read("both-vars")).toMatchObject({
    bg: "rgb(19, 20, 21)",
    width: "47px",
  });

  // The deprecated MiniButton alias renders a CircleButton and still answers
  // to the old variable name.
  expect(await read("alias-old-var")).toMatchObject({
    bg: "rgb(22, 23, 24)",
    width: "29px",
  });
});
