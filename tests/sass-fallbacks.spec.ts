import { test, expect } from "@playwright/test";
import { compileString } from "sass";
import postcss from "postcss";
import path from "node:path";

// These helpers have deliberately different terminal behavior. Consolidating
// their builders must not turn inherit into unset, add a global override to a
// prefixed-only chain, or turn the legacy last argument into another prefix.
test("fallback helpers retain their public terminal and precedence contracts", () => {
  const css = compileString(`
    @use "functions" as fn;
    .probe {
      --global-default: #{fn.var-with-fallbacks(--padding, button, control, 4px)};
      --global-only: #{fn.var-with-fallbacks(--padding, 4px)};
      --unset: #{fn.var-no-fallbacks(--bg, button, control)};
      --inherit: #{fn.vars(font-size, button, ui)};
      --prefixed: #{fn.vars-fallback(border, none, inline)};
      --empty: #{fn.vars-fallback(border, none)};
      --optional: #{fn.vars-optional(bg, button)};
      --missing: #{fn.prefixed-vars-optional(bg, button)};
      --legacy: #{fn.vars-suffix-fallback(first-letter-bg, body, text)};
      --duplicate: #{fn.vars-fallback(fg, inherit, card, surface, card, surface)};
    }
  `, { loadPaths: [path.resolve("src/lib/sass")] }).css;
  const declarations: Record<string, string> = {};
  postcss.parse(css).walkDecls(d => { declarations[d.prop] = d.value; });
  expect(declarations).toEqual({
    "--global-default": "var(--button-padding, var(--control-padding, var(--padding, 4px)))",
    "--global-only": "var(--padding, 4px)",
    "--unset": "var(--button-bg, var(--control-bg, var(--bg, unset)))",
    "--inherit": "var(--button-font-size, var(--ui-font-size, inherit))",
    "--prefixed": "var(--inline-border, none)",
    "--empty": "none",
    "--optional": "var(--button-bg, var(--bg))",
    "--missing": "var(--button-bg, var(--__missing-bg))",
    "--legacy": "var(--body-first-letter-bg, var(--first-letter-bg, inherit))",
    "--duplicate": "var(--card-fg, var(--surface-fg, inherit))",
  });
});
