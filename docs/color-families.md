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

**The neutral ladder.** Each tier falls back to the one below it, at the
component, so a theme that sets only `--surface-bg` colors every tier above
it too.

| Tier              | Pair                                      | Components that compile it          |
| ----------------- | ----------------------------------------- | ----------------------------------- |
| `background`      | `--background-bg/-fg`, else `--bg`/`--fg` | the page                            |
| `surface`         | `--surface-bg/-fg`                        | Container, Bar, Table, Form, Fieldset, Page, Hero, DataList, Accordion, TabBar |
| `surface-raised`  | `--surface-raised-bg/-fg`                 | Card, Tile                          |
| `surface-sunken`  | `--surface-sunken-bg/-fg`                 | Sidebar, a Card's header and footer |
| `surface-overlay` | `--surface-overlay-bg/-fg` (→ raised)     | DropdownMenu, MenuList, Dialog      |
| `inverse`         | `--inverse-bg/-fg`                        | Tooltip                             |

**Roles.** `primary`, `secondary`, `info`, `success`, `warning`, `danger`,
plus any your app defines with a `--<role>-bg` / `--<role>-fg` pair.

**`control`.** Quiet UI chrome: a plain Button, ButtonLink, CircleButton, an
inactive TabItem, a Tag, an Accordion summary, a Progress track. This used
to fall through to `secondary`, which made `secondary` do two jobs. It is
now its own pair (`--control-bg/-fg`), defaulting to a step off the surface
toward its foreground, and `secondary` is an accent like `primary`.

**`field`.** Text fields: Input, Select, and native inputs under a Form's
`globalInputStyles`. A field is relative to the surface it sits on, because
any fixed color matches some surface and the field disappears. Every
family-aware surface publishes its resolved pair, and by default a field is:

- filled a step off that surface toward its foreground
  (`--field-fill-amount`, 5% in oklab): a darker well on a light surface, a
  lighter one on a dark surface;
- edged with a 1px line mixed from the same pair (`--field-edge-amount`, 50%
  in oklab, about 3.5:1). Fields are the one borderless-by-default exception:
  a fill that close to its surface can't meet the 3:1 boundary contrast WCAG
  1.4.11 asks of a control on its own.

Knobs, all optional:

| Variable                                   | Effect                                              |
| ------------------------------------------ | --------------------------------------------------- |
| `--field-bg` / `--field-fg`                | An exact fill and text color for every field        |
| `--field-border-color`                     | An exact edge color                                 |
| `--field-border` (shorthand), `-width`, `-style` | The whole edge                               |
| `--field-border-top: none` + `--field-border-inline: none` | Underline-only fields               |
| `--field-square-radius`                    | Corner radius of Input and Select together          |
| `--field-fill-amount`, `--field-edge-amount` | How far the defaults step off the surface         |

`vars/underline-fields.css` is the underline preset ("Underline Fields" in
the theme picker); it combines with any theme. Component variables
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

## Theming the ladder

Recolor tiers, not components. Flattening is aliasing a tier's color
(`--surface-raised-bg: var(--surface-bg)`), which keeps the family known.
Setting `--card-bg` in a theme instead makes every card an unknown family:
readable, but unpinned.

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
- **Themes**: drop `--container-bg: var(--surface-bg)` aliases (they read as
  a component-level background); move `--sidebar-bg` → `--surface-sunken-bg`,
  `--menu-bg` → `--surface-overlay-bg`, `--card-bg` → `--surface-raised-bg`.
- `--heading-*-fg` / `-bg` (global, unprefixed) are unchanged this release:
  still exact everywhere. Prefer `--on-surface-heading-*`; the globals will
  become surface-only aliases.
