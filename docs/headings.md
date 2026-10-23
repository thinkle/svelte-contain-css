# Heading colors

Headings inside a typography container (`TextLayout`, `Card`, `Tile`,
`Container`, ...) take their color from theme variables. There are two kinds
of heading, and they want different color models:

- **A transparent heading** sits on the surrounding surface. Its color should
  be _relative to that surface_: it **tints** whatever foreground it inherits.
- **A filled heading** paints its own background. It is its own little surface,
  so it names an **exact** `fg`/`bg` pair, like a Tag or a Button.

Both are plain semantic HTML (`<h1>`-`<h6>`) driven by theme variables. No
heading component or per-instance prop is needed.

## Variables

Every variable exists at four levels, most specific first:
`--heading-1-*` … `--heading-6-*`, then the group (`--heading-major-*` for
h1-h2, `--heading-minor-*` for h5-h6), then the shared `--heading-*`.
Component-scoped forms (`--card-heading-2-*`, `--tile-heading-*`,
`--surface-heading-*`, ...) beat all of those inside that component.

| Variable                          | Meaning                                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `--heading-*-tint`                | Target color. The heading mixes its **inherited** foreground toward it.                                        |
| `--heading-*-tint-amount`         | Share of the target: 0% keeps the inherited foreground, 100% reaches the target. Unset anywhere: 100%.         |
| `--heading-*-fg`                  | Exact foreground. Ignores the surface. Pair it with a `bg`.                                                    |
| `--heading-*-bg`                  | Background. Makes the heading a color context for `Text` inside it.                                            |
| `--heading-tint-scale`            | Multiplier on every tint amount below it (default `1`). `0` declines all heading tints.                         |
| `--heading-*-border-*`, `-box-shadow`, `-text-decoration`, `-padding`, ... | Decoration. Colored independently of the heading's text. |

The library default (`typography.css`) is:

```css
:root {
  --heading-tint: var(--primary-color);
  --heading-tint-amount: 60%;
}
```

## Precedence

The heading walks its prefix chain from most to least specific. **The first
step that sets either an exact `fg` or a `tint` wins; at the same step, `fg`
beats `tint`.** If no step sets either, the heading simply inherits.

```css
:root {
  --heading-fg: #333; /* shared exact */
  --heading-2-tint: var(--danger-color); /* h2: level tint beats shared exact */
  --heading-tint: var(--primary-color);  /* ignored: shared fg wins at that step */
}
```

`tint-amount` resolves along the same chain independently, so
`--heading-2-tint` with no `--heading-2-tint-amount` uses the shared amount
(60% by default). Set the level's amount when you want something else.

`--heading-tint-scale` multiplies the resolved amount. It never touches exact
colors, backgrounds, decoration, or the surface's own `--*-bg-mix-*` controls.

## Recipes

```css
/* Untinted: headings use the surface foreground. */
:root { --heading-tint: currentColor; }

/* "Headings are our brand color", surface-aware. */
:root { --heading-tint: var(--primary-color); --heading-tint-amount: 70%; }

/* Subdued h3-h6 on any surface: transparent lets the real backdrop through. */
:root { --heading-tint: transparent; --heading-tint-amount: 30%; }

/* A filled h1: exact pair. */
:root {
  --heading-1-bg: var(--primary-bg);
  --heading-1-fg: var(--primary-fg);
  --heading-1-padding: 0.25em 0.45em;
}

/* An accent h2 with an independently colored rule. */
:root {
  --heading-2-tint: var(--danger-color);
  --heading-2-tint-amount: 70%;
  --heading-2-border-width: 0 0 3px;
  --heading-2-border-style: solid;
  --heading-2-border-color: var(--warning-color);
}
```

Ready-made add-ons: `restrained-headings.css`, `editorial-headings.css`,
`expressive-headings.css`, and the existing `solid-headings.css`.

## Surfaces

The tint is mixed against `currentColor` in the heading's own `color`
declaration, which is the color the heading inherits. So the same theme gives
an indigo-leaning heading on a light Card, a pale-indigo one on a dark Tile, and
follows a surface remapped with `--tile-fg-mix-*` or a plain wrapper that sets
`color`. Nothing needs to be recomputed per surface.

Ingredients (`tint`, `amount`, `scale`) resolve at each typography container,
like every other heading variable. Set them on or above the container
(`<Tile style="--heading-tint: ...">`, a theme, a wrapper around the
container). A plain `<div>` inside a Card that sets `--heading-tint` does not
reach headings in that Card.

### What tinting cannot do

**Mixing is not a contrast guarantee.** The big gap: when a surface's
background *is* the tint target (a Tile filled with `--primary-bg` under a
primary tint), every amount moves the heading toward the background. In the
light theme a 60% primary tint on a primary Tile measures 2.6:1, and even
40% only reaches 3.9:1. Decline the tint on such surfaces:

```svelte
<Tile style="--tile-bg: var(--primary-bg); --tile-fg: var(--primary-fg); --heading-tint-scale: 0;">
```

or retarget it there (`--tile-heading-tint: var(--warning-color)`).
`--heading-tint-scale: 0` also turns off `transparent` (subdue) tints, because
those are tints too.

A filled heading that sets `bg` but no `fg` keeps the inherited, tinted
foreground on its new background. That is rarely what you want: set both.

Higher amounts look more like the brand color on the page and less legible on
dark or saturated surfaces. 60% is the library's compromise: about 10:1 on the
light page and about 4.6:1 on a dark tile.

## Text inside headings

`<Text>` tones inside a heading are grounded on the right context:

- **Transparent heading**: tones mix from the surrounding surface's
  foreground, exactly as they do in a paragraph next to it. A heading's own
  tint does not leak into `Text danger`.
- **Filled heading** (any `--heading-*-bg` set): tones mix from the heading's
  foreground, and `Text muted` targets the heading's background.

`--<tone>-text-fg-override` still wins everywhere. A direct `--danger-text-fg`
set on a wrapper is recomputed inside headings, the same way a nested color
surface recomputes it. Mixing a tone into a filled heading's foreground can be
muddy (amber into indigo gives brown). If it matters, set
`--warning-text-fg-override` or `--warning-text-amount` for that context.

## Migrating from 1.6

- **`--heading-fg` is still an exact color**, unchanged in meaning. Nothing is
  reinterpreted as a tint.
- The library default changed from `--heading-fg: var(--primary-bg)` (exact)
  to a 60% `--heading-tint` toward `--primary-color`. On a light page headings
  are a deeper shade of the primary color; on dark or remapped surfaces they
  stay legible instead of disappearing.
- If you set `--heading-fg` to your page foreground to get untinted headings,
  prefer `--heading-tint: currentColor`. The exact value still works on the
  page, but it stays dark on dark surfaces. The bundled Bootstrap, Material,
  Retro, Forest and Canyon themes made this switch.
- If you want the old look exactly, `--heading-fg: var(--primary-bg)` still
  produces it. It is fixed, so it disappears on primary surfaces as before.
- `--heading-bg: transparent` is no longer declared by default. Declaring it
  yourself marks headings as filled for the `Text` rule above. Leave it unset.

Specimen: `/svelte-contain-css/review/headings?theme=light&preset=editorial`
(presets `default`, `restrained`, `editorial`, `expressive`, `solid`; any review
theme). Tests: `tests/heading-colors.spec.ts`.
