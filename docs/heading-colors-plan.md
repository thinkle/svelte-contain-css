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
