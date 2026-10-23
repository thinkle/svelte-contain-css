# Heading colors and surface-relative typography

## Cloud agent handoff

Implement this plan in `thinkle/svelte-contain-css`, starting from the remote
branch `codex/heading-colors` (based on `svelte5` at `0b8e9a1`, version 1.7.0).
Read `AGENTS.md`, `AGENTS-INTERNAL.md`, and the relevant consumer contracts in
`AGENTS-EXTERNAL.md` before changing components. This document is the implementation
brief, not a request to produce another plan. Carry the work through implementation,
visual verification, documentation, and a reviewable PR targeting `svelte5`.
Do not merge, publish, or deploy. Do the implementation and testing in the cloud;
the local handoff branch contains only this plan.

There is no urgent release deadline. This can be a separate PR and still ship with
the pending 1.7.0 changes. Do not bump the version again solely for this work.

## Purpose and decisions already made

Contain's heading colors and `Text` tones currently use different models. Heading
foregrounds are independently specified, while `Text` derives semantic tones from
the resolved surface foreground and color ingredients. A fixed heading color can
become invisible when a containing Tile or Card gets a different background.

Bring these paths into a coherent color model without losing editorial typography.
The user explicitly wants different colors and treatments by heading level. Do not
reduce the API to one compulsory heading color for all six levels, or remove
heading backgrounds, borders, decoration, and padding simply to reduce CSS size.

The order of work matters: first demonstrate expressive themes with the existing
system, then refine the color model, then compare the same designs. Avoid choosing
the final variable API before the examples establish its requirements.

The desired consumer experience remains plain semantic HTML with theme variables,
not a new Heading component or per-instance styling props. Illustrative requests
such as `h1 bg=blue fg=white` describe a theme's visual result, not literal new HTML
attributes. Keep existing level and major/minor grouping capabilities where useful.

## Phase 1: Make the visual requirements concrete

- Extend the existing typography showcase and make the specimen easy to reach
  from the theming page. Reuse its existing shared, grouped, six-level, and fixed
  heading modes rather than introducing an unrelated configuration system.
- Create restrained, editorial, and expressive compositions using the current
  implementation. The editorial composition should have a large filled h1 with
  a paired foreground/background, an h2 tinted toward a different accent with
  an independently colored underline or rule, and subdued h3-h6. The expressive
  composition should demonstrate distinct treatment for all six levels.
- Use purposeful heading and body copy so hierarchy reads like an actual page.
  Keep examples small and show minimal usable theme/markup source.
- Extend selected themes or introduce clearly identified typography presets;
  do not turn every existing theme into the same loud specimen. Preserve a
  restrained reference with little or no tint.
- Capture a baseline before changing color resolution. Record both successful
  treatments and failures when their surrounding surface changes. Store durable
  review images or reference their PR attachments; do not commit bulky generated
  artifacts without following the repository's conventions.

## Phase 2: Exercise real color contexts

Use the same content and themes in TextLayout, Card, and Tile. Include light,
dark, saturated, and nested surfaces, with deliberately chosen foreground/background
pairs. Include semantic `Text` inside and next to headings, plain nested wrappers,
and a surface whose background has been remapped through the existing mix controls.
Check desktop and narrow/mobile layouts.

Distinguish a transparent heading, which consumes the surrounding surface's color
context, from a heading that paints its own background and establishes its own
foreground/background context. Decorations should be independently expressible.

## Phase 3: Prototype and implement coherent heading colors

- Reuse the principles and, where appropriate, implementation of the `Text` color
  pipeline. Keep semantic color ingredients separate from surface bg/fg pairs.
- Preserve heading-level and group-specific choices of tint target, amount, exact
  foreground, and decorative treatment. Naming and final API are implementation
  decisions to settle against the specimens, not frozen by this plan.
- Specify and document precedence among ambient foreground inheritance, tint
  target/amount, explicit foreground overrides, and an explicit heading background.
- Follow the existing meaning of tint amount: 0% preserves the base foreground;
  100% reaches the target. Provide a clear way to disable heading tinting broadly,
  without accidentally disabling or changing unrelated surface-mixing controls.
- With no requested treatment, allow normal foreground inheritance. A tint is
  optional, not a compulsory source of color for every heading.
- Recompute context-dependent derived colors at the appropriate surface boundaries.
  CSS var references resolve before inheritance; aliases defined only at `:root`
  do not automatically respond to ingredient overrides on descendants.
- Be careful with relative units and transparent backgrounds. Color mixing does
  not guarantee contrast, and a transparent token is not a composited backdrop.
  Do not promise automatic foreground selection when consumers change only bg.
- Ensure `Text` inside a heading uses the intended foreground/context, including
  when that heading has a background of its own. Avoid breaking existing Text
  override and amount behavior as a side effect.
- Preserve existing APIs where feasible; explicitly document intentional changes
  and migrations. Do not silently reinterpret existing exact foreground values
  as tint ingredients. Audit existing theme declarations so they do not mask the
  new default behavior unintentionally.

## Phase 4: Visual comparison and validation

Compare against Phase 1 using the same content and intended designs. The revised
system must express the same or better designs through themes, while handling
surface changes more coherently. Inspect the actual mixtures for muddiness and
readability; a numerically correct mix is not sufficient evidence of good design.

Add focused regression fixtures and browser assertions for:

- level/group-specific treatments and override precedence;
- tint-off, endpoint amounts, and no-treatment inheritance;
- exact foreground/background treatments and independent decoration colors;
- nested surfaces, local ingredient changes, and background remapping;
- semantic Text within transparent and filled headings;
- representative light/dark and narrow layouts.

Use the existing review harness for screenshots and inspect them. Passing smoke
tests or merely generating captures is not visual verification. Run appropriate
type checks, browser tests, and package/build validation. Do not run the production
build concurrently with tests using the same generated SvelteKit files/dev server.

## Phase 5: Documentation and PR

Update typography controls, theme examples, and internal/consumer guidance. Explain
exact color versus tint intent, precedence, surface boundaries, and migration from
old heading color behavior. Update this plan with the chosen contract and results.

The PR should show the representative before/after images, explain intentional
visual changes and compatibility choices, and report the tests actually run and
any limitations. Target `svelte5`; do not merge or release.

## Starting points

- `src/routes/Themes.svelte`: theme picker and extra-variable controls.
- `src/routes/demos/TypographyDemo.svelte`: existing heading specimens and modes.
- `src/routes/demos/TypographyThemeControls.svelte`: typography controls.
- `src/routes/review/typography/+page.svelte`: existing prose specimen.
- `src/lib/review/`: scenario/theme wrappers and visual review infrastructure.
- `src/lib/sass/_typography.scss`: generated heading and prose context variables.
- `src/lib/vars/typography-context.css`: global consumers of typography variables.
- `src/lib/sass/_color.scss`: surface colors and semantic text-tone derivation.
- `src/lib/typography/Text.svelte` and `docs/text.md`: Text's existing contract.
- `src/lib/typography/TextLayout.svelte`, `src/lib/Card.svelte`, and
  `src/lib/layout/Tile.svelte`: relevant surface/content components.
- `src/lib/vars/themes/`: current color and typography theme declarations.

## Baseline observations, not automatic scope expansion

The previous local review found type checking successful with one fixture href
warning, and the production build successful with a packaging warning for
SvelteKit imports in the shipped review harness. Of 275 Chromium tests, four
development-request failures passed on rerun; a dropdown screenshot comparison
remained different (656px baseline versus 1136px actual width), consistent with
the existing TextLayout breakout change. Recheck the cloud baseline rather than
assuming all failures are introduced here. Do not blindly update image snapshots.

A separate reproduced issue exists in nested TextLayouts: the outer descendant
reset in `TextLayout.svelte` overrides the inner direct-child figure spacing,
changing a Table's block margins from 32px to 0. Address only if needed for this
work's nested specimens, with its own regression, or explicitly report it separately.

## Out of scope and completion criteria

General fallback-chain trimming, typography tree shaking, Vite optimization plugins,
and unrelated component fixes are separate work. An extra category fallback is
not by itself a demonstrated problem. Do not remove `surface` fallback support or
editorial features just to make chains shorter.

Done means the editorial specimen is expressible in a theme, per-level differences
remain available, surface changes and semantic Text interact predictably, tinting
can be declined, and the behavior is demonstrated, tested, documented, and ready
for PR review. No further planning-only handoff is needed.

## Outcome (implemented on this branch)

Full contract: [headings.md](headings.md). Specimen:
`/review/headings?theme=<review theme>&preset=default|restrained|editorial|expressive|solid`.
Captures: `node scripts/capture-headings.mjs <outDir>` (needs a dev server on
4173; set `CHROMIUM_PATH` if Playwright's bundled browser is unavailable).
Before/after comparisons: [heading-colors/](heading-colors/).

### Chosen contract

- Two kinds of heading. **Transparent** headings tint the foreground they
  inherit: `--heading-*-tint` (target) and `--heading-*-tint-amount` (0% keeps
  the inherited fg, 100% reaches the target, unset = 100%). **Filled** headings
  name an exact `--heading-*-fg` / `--heading-*-bg` pair, unchanged from 1.6.
- The mix is `color-mix(in srgb, currentColor, <tint> <amount>)`, with
  `currentColor` left as a token until the heading's own `color` declaration.
  The heading follows whatever surface it lands on, including plain wrappers
  and mix-remapped surfaces, with no per-surface recomputation.
- Precedence walks the existing prefix chain. The first step that sets `fg`
  or `tint` wins, and `fg` beats `tint` within a step. Amount resolves along
  the chain independently.
- `--heading-tint-scale` (default 1, component-prefixable) multiplies every
  amount. `0` declines heading tints; exact colors and surface mix controls
  are untouched.
- Library default: `--heading-tint: var(--primary-color); --heading-tint-amount: 60%`
  (was an exact `--heading-fg: var(--primary-bg)`).
- `transparent` as a tint target subdues against the real composited
  backdrop. This is the recipe for quiet h3-h6.
- Text in a transparent heading keeps the surface's tones. Text in a filled
  heading is grounded on the heading's fg/bg, and muted targets the heading bg.
- No new component. Filled headings were already the robust case in Phase 1
  (an exact pair survives every surface); the fragile case was transparent
  headings with exact colors.

### Phase 1 findings (baseline, current API)

- Default theme: headings were fixed `--primary-bg`, so they vanished on a
  primary Tile (1.0:1) and sat at 1.6-1.9:1 on dark and remapped Tiles.
- Editorial/expressive written naively (exact colors) failed on every dark or
  saturated surface. Subdued h3-h6 via `color-mix(var(--fg), var(--bg))`
  resolved at `:root` and stayed dark-on-dark (1.2-2.2:1).
- Text inside a filled heading was mixed from the surface foreground, not the
  heading's. In forest, both Text spans inside the Card's filled h1 were
  near-invisible.
- The old API could already express surface-relative tints via
  `--heading-fg: color-mix(in srgb, currentColor, X N%)`, but nothing
  documented it, the mix target resolved at `:root`, and there was no way to
  decline it.

### Limits (not papered over)

- **A tint cannot rescue a surface whose background is the tint color.** Light
  theme, primary Tile: 60% primary tint measures 2.6:1, and 40% still only
  3.9:1. Surfaces like that need `--heading-tint-scale: 0` or a different
  target. The specimen shows both states.
- **A light foreground on a mid-luminance surface mixes badly.** Forest's
  warning Tile has a light fg on orange. The editorial h2's 70% danger tint
  turns light pink there and is less legible than the old fixed dark red.
  This regression is a theme pair choice meeting a tint; no amount fixes it.
- Mixing hues into a filled heading's fg can be muddy (amber into indigo gives
  brown) and is not always legible. Light theme: `Text warning` in the filled h1
  is 6.2:1. Dark theme (dark-indigo fg on a pale-indigo h1): only 2.2:1. Before,
  it mixed from the surface fg instead and was worse on most surfaces. Use
  `--warning-text-fg-override` where it matters.
- On a light page, the new default is a deeper navy than the old vivid
  indigo (60% vs. effectively 100%). That is the cost of legibility on dark
  surfaces; `--heading-tint-amount` is the knob.
- Ingredients resolve at typography containers, like every heading variable.
  A plain `<div>` inside a Card that sets `--heading-tint` does not affect
  headings in that Card.
- Surfaces have no semantic variants (`<Tile warning>` doesn't exist), so a
  theme can't say "in warning surfaces, headings use X". Adding variants with
  `warning` in the prefix chain would make `--warning-heading-tint` work for
  free; that is a separate API decision.
- Pre-existing, outside this work: the dark theme's warning pair (light fg on
  amber) fails for body text too.

### Colored-surface follow-up

Every surface in the specimen now carries the overrides its preset needs
(shown as code under it; `&recipes=off` removes them). With them on, an
alpha-composited audit of light, dark and forest-editorial-rounded × all five
presets found 1 problem, down from 352 with recipes off and the old theme
pairs. That 1 is `Text warning` in a transparent h3 on the light page (2.9:1).
The light theme's warning ingredient is amber-400, which is weak on any light
surface, heading or not. Retro was left out: its Text tones are yellow on a
teal page, a pre-existing theme issue.

Changes this needed beyond the specimen:

- `--heading-*-text-amount`: Text tone share inside a level. The filled levels
  of the editorial, expressive and solid presets use 25-30%. Without it,
  `Text warning` in the dark theme's filled h1 was 2.2:1 everywhere.
- Dark theme: `--warning-fg` is dark (white on orange was 1.9:1) and
  `--secondary-fg` is blue-grey-900 (800 on 300 was about 4:1). Forest:
  `--warning-fg` is dark (2.8:1 before). Separate commit. These also change
  warning/secondary Buttons and Tags in those themes.
- Solid preset: minor blocks are a shade of the secondary pair, not mixed with
  `--bg` (they vanished on a light Card).
- Expressive h6 subdue is 30%, down from 40%.

The ergonomics are as expected: a page-level heading design needs explicit
overrides on surfaces that reuse its colors, and those overrides are
per preset.

### Validation

- `tests/heading-colors.spec.ts` (10 tests) covers default, untinted, amount
  endpoints, surface following, precedence, scale, nested ingredients, Text in
  filled and transparent headings, and decoration. Against the previous
  implementation, 9 of 10 fail.
- Visual review: before/after captures of all presets x {light, dark, retro,
  forest-editorial-rounded} x {1280px, 390px}, inspected, plus a computed
  contrast audit per heading per surface.
