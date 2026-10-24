# Chaining review

This follow-up to the property-family cleanup preserves public custom-property
names, lookup order, and defaults. Its baseline is `efc0d12`.

## Reductions implemented

- **Border shorthands:** resolve the complete shorthand once into a local
  `--_border-base`. Each side retains its own component/category/global chain,
  but falls back to that local value instead of repeating the complete border
  chain. Borderless sides still ignore naked global border variables.
- **Transitions:** resolve the transition chain once into `--_transition`, then
  reuse its full value for the same five transition properties. Timing values,
  semantic clickable variants, and property order are unchanged.
- **Heading prefixes:** deduplicate names while preserving their first position.
  In particular, h3/h4 previously included the `heading` group twice, emitting
  duplicate lookups and duplicate per-step foreground variables. Repeating the
  same token cannot add an override opportunity.
- **Fallback builders:** one Sass prefix walker now backs the existing helpers.
  Their different terminal contracts remain distinct: global+default,
  global+`unset`, prefixed-only+`inherit`, and optional/guaranteed-invalid paths.
  The legacy `vars-suffix-fallback` still excludes its final argument.
- **Color variants:** Button, ButtonLink, CircleButton, Tag and TabItem variants
  change color channels without re-emitting the eight identical text-tone
  declarations already supplied by their base surface rule. Those declarations
  resolve against the final local color channels, including when a class changes.
  New descendant surfaces still establish their own tones with `color-props`.

The new border/transition intermediates are private and non-inheriting. They are
set and read on the same element. Public theme variables continue to inherit.

## Measured output

Run `node scripts/measure-component-css.mjs [checkout-root]` to reproduce the
measurement on this checkout or a baseline checkout.

All 51 `src/lib` Svelte style blocks were compiled with Sass's compressed output,
resolving `$lib` to `src/lib`. Totals include the library's review components.
This measures generated component CSS before Svelte scoping/pruning and app
bundling; it is not a claim about any particular app's downloaded bundle size.

| Metric | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| CSS bytes | 1,250,138 | 1,126,964 | 123,174 (9.85%) |
| Declarations | 8,211 | 8,031 | 180 (2.19%) |
| `var()` calls | 34,623 | 30,700 | 3,923 (11.33%) |

## Changes deliberately deferred

- Removing unused-looking public prefixes or compatibility aliases. A token
  absent from bundled themes may still be used by an app. This PR removes
  repeated lookups, not distinct customization opportunities.
- Replacing local fallback chains with `:root` aliases. An alias resolves where
  declared and can freeze an ancestor's value, losing subtree overrides.
- Unifying `inherit`, `unset`, `revert`, and guaranteed-invalid fallbacks. They
  are different behaviors, particularly for overlays and typography contexts.
- Removing the complete `border` shorthand in favor of sides alone. The
  shorthand also resets `border-image`, so that would change behavior.
- Moving all surface tones to one ancestor/global rule. Inherited custom
  properties are already resolved; nested surfaces need local declarations.
- Broad typography/property pruning. Prose-container mixins establish descendant
  heading contexts, not just a few root font declarations. A visually redundant
  include can still carry a consumer-facing heading override.

## Validation

Sass contract tests cover the public helpers' differing fallback behavior and
first-occurrence prefix precedence. Browser regression tests cover live variant
changes and nested Text tones, local versus nested borders, side overrides, and
complete transition timing values. Existing heading-color, color-mix, theme,
border-policy, and private-property tests exercise the surrounding contracts.
No production behavior or public theme override is intentionally removed.
