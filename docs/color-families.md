# Color families

Color is relational: a link color, a text tone or a heading color only means
something against the background behind it. So exact colors are keyed by the
**color family** they sit on, not by component. Everywhere else, colors mix
from the surface's own pair, which keeps text readable on backgrounds nobody
tuned.

The design record is [color-families-plan.md](color-families-plan.md).
Headings: [headings.md](headings.md). Text tones: `AGENTS-EXTERNAL.md`.

## Families

A family is a background, its foreground, and optional exact colors (pins)
for what sits on it.

**The neutral ladder.** An unset tier is a step off the one below it, at
the component: raised and overlay a little lighter, sunken a little darker.
So a theme that sets only `--bg`/`--fg` (or `--surface-bg`) gets every tier,
on a light or a dark page, and a local `--surface-bg` override reaches the
cards inside it. Pin a tier with its `-bg` to use an exact color.

Each step is a small sRGB mix toward white (raised, overlay), then an oklch
lightness step: the mix does the work near black,
the lightness step near white. Hue and chroma are kept, and on pure black a
sunken tier steps lighter, since nothing is darker. On `#121212` the
defaults land within a shade of Material's dark elevations.

| Knob | Default | Effect |
| ---- | ------- | ------ |
| `--surface-depth` | `1` | Scales every step; `0` is flat (Bootstrap, Material, Retro), Layered Depth uses `1.6` |
| `--surface-raised-mix` / `-step` | `4%` / `0.03` | Toward white, then lighter |
| `--surface-overlay-mix` / `-step` | `2%` / `0.02` | Off raised, toward white, then lighter |
| `--surface-sunken-mix` / `-step` / `-chroma` | `0%` / `-0.015` / `0.8` | Darker, with a chroma lift (more on light surfaces) so it reads as a deeper tint, not grey |

Foregrounds fall back to the tier below unchanged. The docs site's Custom
Theming page has a live editor for all of this.

| Tier              | Pair                                      | Components that compile it          |
| ----------------- | ----------------------------------------- | ----------------------------------- |
| `background`      | `--background-bg/-fg`, else `--bg`/`--fg` | the page; a Page's frame            |
| `surface`         | `--surface-bg/-fg`                        | Container, Bar, Table, Form, Fieldset, a Page's content, Hero, DataList, Accordion, TabBar |
| `surface-raised`  | `--surface-raised-bg/-fg`                 | Card, Tile                          |
| `surface-sunken`  | `--surface-sunken-bg/-fg`                 | Sidebar, a Card's header and footer |
| `surface-overlay` | `--surface-overlay-bg/-fg` (steps off raised) | DropdownMenu, Dialog            |
| `inverse`         | `--inverse-bg/-fg`                        | Tooltip                             |

**Roles.** `primary`, `secondary`, `info`, `success`, `warning`, `danger`,
plus any your app defines with a `--<role>-bg` / `--<role>-fg` pair.

**`control`.** Quiet UI chrome: a plain Button, ButtonLink, CircleButton, an
inactive TabItem, a Tag, an Accordion summary, a Progress track. This used
to fall through to `secondary`, which made `secondary` do two jobs. It is
now its own pair (`--control-bg/-fg`), defaulting to a step off the surface
toward its foreground, and `secondary` is an accent like `primary`.

**`ground`.** Exactly the surface something sits on, for an element that
belongs to whatever holds it rather than being a surface of its own. A
MenuList is `ground`: in a Sidebar it is the sidebar's sunken tier, on a Card
the card, and inside a DropdownMenu the menu's overlay. `--menu-bg` still
gives one a background of its own (and so takes it out of any family).

**`field`.** Text fields: Input, Select, TextArea, and native text inputs and
textareas under a Form's `globalInputStyles` (not ranges, checkboxes, radios
or other non-text inputs). A field is relative to the surface it sits on, because
any fixed color matches some surface and the field disappears. Every
family-aware surface publishes its resolved pair, and by default a field is:

- filled a step lighter than that surface, the way a raised tier is
  (`--field-lighten`, 1): white on a light grey page, a lighter well on a
  dark one, white on a white card;
- edged with a 1px line mixed from the same pair (`--field-edge-amount`, 50%
  in oklab, about 3.5:1). Fields are the one borderless-by-default exception:
  the edge is what makes a field findable where its fill matches the
  surface (a white field on a white card), and WCAG 1.4.11 asks 3:1 of a
  control's boundary.

Knobs, all optional:

| Variable                                   | Effect                                              |
| ------------------------------------------ | --------------------------------------------------- |
| `--field-bg` / `--field-fg`                | An exact fill and text color for every field        |
| `--field-border-color`                     | An exact edge color                                 |
| `--field-border` (shorthand), `-width`, `-style` | The whole edge                               |
| `--field-border-top: none` + `--field-border-inline: none` | Underline-only fields               |
| `--field-square-radius`                    | Corner radius of every field (then `--square-radius`, then `--border-radius`) |
| `--field-lighten`                          | Scales the lighter fill; `0` is the surface itself   |
| `--field-fill-amount`                      | Mixes toward the surface's text first: with `--field-lighten: 0`, a darker well |
| `--field-edge-amount`                      | How strong the default edge is                      |
| `--field-hover-border-color`, `--field-hover-edge-amount` (80%) | The edge on hover               |
| `--field-hover-fill-amount` (3%)           | Extra fill on hover; `0%` turns it off              |

`vars/underline-fields.css` is the underline preset ("Underline Fields" in
the theme picker): a transparent fill and a rule along the bottom, on the surface
itself. It combines with any theme. Component variables
(`--input-bg`, `--input-border`, `--select-*`) still win over all of these.

**Unknown.** A surface whose background comes from a component-level
variable (`<Bar bg="#323232">`, a wrapper that sets `--tile-bg`, a theme
that sets `--card-bg`) belongs to no family. Its text, links and headings
mix from its own colors, under every theme.

## Pins

```
--on-<family>-<tone>-text-fg      tone ∈ primary secondary info success warning danger muted
--on-<family>-link-text-fg
--on-<family>-link-hover-text-fg  (falls back to the link pin)
--on-<family>-heading-<n>-fg      n ∈ 1..6; walks n → major (1-2) / minor (5-6) → shared
--on-<family>-heading-fg
--on-<family>-heading-<n>-bg      a filled heading on that family; same walk
```

Pins are sparse: write only the pairs a designer tuned. On a neutral tier,
pins walk down the ladder (`--on-surface-raised-X` → `--on-surface-X` →
`--on-background-X`), never up. So an app-wide neutral pin belongs on
`background`: it then covers the page, surfaces, cards and sidebars, and a
tier that needs something different overrides it. A role never borrows another family's pins, and
`inverse` stands alone.

```css
:root {
  /* On the page and every neutral tier above it: exact. */
  --on-background-heading-fg: var(--primary-bg);
  --on-background-link-text-fg: rgb(0, 51, 160);

  /* On primary bars and tiles: exact, written once. */
  --on-primary-heading-fg: var(--primary-fg);
  --on-primary-link-text-fg: var(--primary-fg);

  /* Everywhere else: the mix rules (unchanged). */
  --heading-tint: var(--primary-color);
  --link-color: var(--primary-color);
}
```

## Resolution

On every family-aware surface, each value (a Text tone, the link color, each
heading level) resolves in this order:

1. **A component-level background is set**: no family, mix.
2. **A role was applied** (`<Bar primary>`, `surfaceVars()`): that role's pin.
   Unpinned, text and links mix; headings take the surface foreground, since
   a heading tinted toward the role's own color can't reach contrast.
3. **The compiled family**: its pin, down the ladder.
4. **The mix rule**: `--<tone>-color` / `--<tone>-text-amount`; `--link-color` /
   `--link-text-amount` (10%); `--heading-*-tint` / `-tint-amount`.

`--<tone>-text-fg-override`, and a `--link-fg` set by hand on or around a
link, still win outright. A theme should not set `--link-fg`: it lands on
every surface, including ones with their own background.

## Roles: sugar, context, app-defined

```svelte
<script>
  import { Bar, Tile, surfaceVars } from "contain-css-svelte";
</script>

<Bar primary>…</Bar>                          <!-- sugar -->
<div style={surfaceVars("primary", "tile")}>  <!-- every Tile in here -->
  <Tile>…</Tile>
</div>
<div style={surfaceVars("report-filter", "tile")}>  <!-- an app role -->
  <Tile>…</Tile>                              <!-- --report-filter-bg/-fg, --on-report-filter-* pins -->
</div>
```

`<Bar primary>` is sugar for `surfaceVars("primary", "bar")`, so the three
resolve identically. The helper writes private transport variables
(`--_<prefix>-role-*`, `--_<prefix>-on-*`), scoped to one component prefix so
a role set for Tiles doesn't reach a Bar inside them. Themes never write
those: they write `--on-<role>-…` pins.

A raw `bg` on top of a role context (`<Tile bg="#333">` inside a primary
context) is a component-level background: no family, mix.

## Reading the current colors

Every colored element, surface or control (Bar, Card, Sidebar, Button, Tag,
Tooltip, a menu item...), publishes its own resolved pair as
`--current-bg` / `--current-fg`, and everything inside it inherits them.
`:root` holds the page's pair. So whatever sits inside an element can read
the colors actually behind it, after tiers, roles, pins and mixes:

```svelte
<!-- An icon in a filled button, a tag or a tooltip: that element's colors. -->
<span class="icon" style="background: var(--current-fg)"></span>

<!-- A tint made from the colors behind it. -->
<style>
  .badge {
    background: color-mix(in oklab, var(--current-bg), var(--current-fg) 15%);
  }
</style>

<!-- Buttons that blend into their bar: the bar's actual colors, set on a
     wrapper. They still brighten on hover, which a transparent button can't,
     and what is inside them reads the real color. -->
<Bar primary>
  <div style="--button-bg: var(--current-bg); --button-fg: var(--current-fg);">
    <Button>Back</Button>
  </div>
</Bar>
```

Three rules:

- **Read, never set.** Setting `--current-bg` recolors nothing; it only
  changes what your own children read.
- **Set it on a wrapper, not the element it describes.** On the Button
  itself, `--button-bg: var(--current-bg)` would read the button's own color
  while computing it: a cycle, and the browser drops the value. Svelte's
  `<Button --button-bg="var(--current-bg)">` puts it on a wrapper for you.
- **Mix where you use it.** A variable is resolved on the element that
  declares it, so `:root { --tint: color-mix(... var(--current-bg) ...) }`
  is frozen to the page's colors. Write the mix in the rule for the element
  that paints it.

A transparent element (`--button-bg: transparent`) publishes `transparent`:
give it the colors behind it instead, as above. Text fields read the
*surface* they sit on, not the nearest control, through a private pair of
their own.

## Theming the ladder

Recolor tiers, not components. Flattening is aliasing a tier's color
(`--surface-raised-bg: var(--surface-bg)`), which keeps the family known.
Setting `--card-bg` in a theme instead makes every card an unknown family:
readable, but unpinned. The same goes for `--page-bg` and
`--page-content-bg`: a Page's frame is `background` and its content is
`surface`, so a desktop color around a content area is `--bg` plus
`--surface-bg` (Retro's teal and grey).

The bundled `light` and `dark` themes give the ladder real steps: cards up,
sidebars and card headers back, menus floating. In the dark theme, raised
surfaces are lighter.

## How it works (for contributors)

`color-props()` in `sass/_color.scss` splits its prefix list at the first
family name: prefixes before it are component-level, the family is the
compiled default. A neutral family gets `family-vars()`:

- `--_comp-flag`: valid only when a component-level background is set;
- `--_role-flag`: valid only when a role was applied;
- the pins found for this family and role (`--_on-<value>-fam` / `-role`).

These inherit, and every family-aware surface declares them all, which
resets an ancestor's (an unset `var()` there is guaranteed-invalid).

CSS `var()` fallbacks can test "set" but never "unset", and step 1 must
*stop* the chain. So the consumer (the surface for its tones, the `<a>` in
`colors.css`, the typography container for headings) turns the flags into
numbers: `--_comp-n: var(--_comp-flag, 0)` is registered as a non-inheriting
`<number>` with initial value 1, so a flag holding a color fails the syntax
and reads 1, and an unset flag reads 0. Then
`select-pinned()` picks with `color-mix(…, <mix> calc(var(--_comp-n) * 100%))`.

`$family: false` keeps a neutral surface's pair without the machinery, for an
element that only borrows a pair (a heading inside a Bar, a menu item).

## Known limits

- A pinned **heading background** on a family still marks headings as filled
  for `Text` grounding on an unknown surface inside that family. Rare; Text
  stays readable either way.
- App-defined **tones** (text colors such as updraft's `excel`) aren't part of
  the compiled tone list. Apps keep computing them from `--_color` as before;
  app-defined **families** need no library change.
- Mixing is not a contrast guarantee. Pins are how a designer makes exact,
  checked choices; the mix keeps everything else readable.

## Migrating from 1.7

- **Removed** component-keyed colors for links and headings:
  `--bar-link-fg`, `--container-link-fg`, `--surface-link-fg`, `--body-link-fg`,
  `--text-link-fg`, `--card-heading-1-fg`, `--tile-heading-bg`, … Use
  `--on-<family>-…` pins. Component typography (`--card-heading-1-font-size`)
  and component-scoped tints (`--tile-heading-tint`) stay.
- **Chrome moved to `control`.** Components that fell back to `secondary`
  (Button, ButtonLink, CircleButton, TabItem, grouped toggles, Accordion
  summary, Tag, Progress) now fall back to `--control-bg/-fg`. If your theme
  set `--secondary-*` to style plain buttons, set `--control-*` instead.
  Checkbox, RadioButton and Toggle fall back to `inactive`.
- **`secondary` is an accent.** Library default: pink 700. Table header rules
  use `--secondary-color`; cell borders use `--border-color`.
- **Card header/footer** compile `surface-sunken` (was `secondary`). A Card's
  body now follows `--card-bg` too.
- **Tooltip** compiles `inverse`; set `--inverse-bg/-fg` rather than
  `--tooltip-bg`.
- **Input and Select** are the `field` family: a fill and a 1px edge mixed
  from the surface they sit on, so they're visible with no theme. Themes set
  `--field-bg/-fg` (was `--input-bg/-fg`, which still works per component).
  Material's fields are underlines; Bootstrap's edge is a shade darker.
- **Page** compiles `background` for its frame and `surface` for its
  content (both were `surface`, and the content fell back to `--page-bg`).
  Drop `--page-bg` / `--page-content-bg` from themes: set `--bg` and
  `--surface-bg`.
- **Themes**: drop `--container-bg: var(--surface-bg)` aliases (they read as
  a component-level background); move `--sidebar-bg` → `--surface-sunken-bg`,
  `--menu-bg` → `--surface-overlay-bg`, `--card-bg` → `--surface-raised-bg`.
- **`<Bar primary>` / `<Bar secondary>`** no longer set `--bar-bg` /
  `--bar-fg`: the bar joins the role's family instead (a set `--bar-bg` is
  what marks a hand-colored bar, which belongs to no family). Controls that
  read `var(--bar-bg)` to blend into a primary bar now get nothing; read
  `--current-bg` / `--current-fg` instead (see [Reading the current
  colors](#reading-the-current-colors)), which work on any bar or surface.
- **`--_color` / `--_background-color`** (private) have a public, supported
  form: `--current-fg` / `--current-bg`.
- **Fields** are a step *lighter* than their surface by default
  (`--field-lighten`), and every field shares one corner chain
  (`--field-square-radius` → `--square-radius` → `--border-radius`), so a
  Select now has the same corners as the Input beside it.
- **Heading presets** (Expressive, Editorial, Solid) key their filled
  levels by family (`--on-background-heading-*`, inverted on primary), so a
  primary fill no longer lands on a primary surface.
- `--heading-*-fg` / `-bg` (global, unprefixed) are unchanged this release:
  still exact everywhere. Prefer `--on-surface-heading-*`; the globals will
  become surface-only aliases.
