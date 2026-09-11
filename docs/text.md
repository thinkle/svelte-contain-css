# Inline text tones

`Text` renders a span, without a background, padding, or a new color context.
Use one of `primary`, `secondary`, `info`, `success`, `warning`, `danger`, or
`muted`. With no tone or color it inherits the surrounding foreground.

```svelte
<Text danger>Could not save</Text>
<Text muted>Updated yesterday</Text>
<Text color="#c6093b" amount="50%">Custom tint</Text>
<Text danger amount="25%">Subtle warning</Text>
```

`bold` and `italic` add visual span styling independently of color; retain
`strong`/`em` elements when semantic emphasis is intended.

`amount` is a CSS percentage of the target color: 0% preserves the inherited
foreground and 100% reaches the target. Semantic/custom defaults are 50%; muted
mixes 20% of the resolved surface background. Explicit color beats flags;
explicit color or amount bypasses the precomputed shortcut. If several flags
are supplied, priority is danger, warning, success, info, primary, secondary,
muted. Prefer one flag.

Each theme explicitly defines `--<tone>-color` as a semantic ingredient,
independent of `--<tone>-bg` and `--<tone>-fg`. The color mixin computes
`--<tone>-text-fg` against its resolved foreground. `--muted-text-fg` mixes toward its
resolved background, including background mixing. These text foregrounds belong
to the existing surface; they are not the foregrounds of semantic filled badges.

Muted uses `--muted-color` (the resolved local background) and defaults to
`--muted-text-amount: 20%`. Use `--muted-color-override` to deliberately change
its target across nested surfaces. All seven tones use the same lookup path.

Customize `--text-amount` globally or `--<tone>-text-amount` per tone. To override
computed text across nested color contexts, set `--<tone>-text-fg-override`
(`--muted-text-fg-override` for muted). A direct `--danger-text-fg` override also
works within its context, but a nested color-props surface computes its own.
Declare ingredients and amount controls at or above the color context; inherited
computed shortcuts do not recalculate in a plain descendant span.

`--muted-text-amount` now means background share (20% gives the previous blend before
background remapping). Mixes are not a contrast guarantee. Transparent surfaces
require care because their token does not describe the composited backdrop.

Preview: `/svelte-contain-css/text`, also available as Text in the demo menu.
