# Color families: design decisions and handoff

Status: implemented (Oct 2026). The contract as built is
[color-families.md](color-families.md); this page keeps the reasoning. The
open questions below are answered at the end, in "Decisions taken".

Original status: design agreed in discussion (Oct 2026), not implemented. This brief is
for an agent working on `contain` and a large consuming app (updraft) together.
Settle the open questions at the end against the app's real usage before
freezing names.

Read first: `AGENTS.md`, `AGENTS-INTERNAL.md`, `docs/text.md`,
`docs/headings.md`, `docs/contextual-accents.md`, `docs/heading-colors-plan.md`.

## The problem

A real app's primary heading/link color on white was `rgb(0, 51, 160)`. No
partial mix of the theme's `--fg` toward any target produces it: with `--fg`
near `#212121`, a 60% sRGB mix would need a target with a negative red
channel. A 100% tint reaches it, but is then a fixed color that ignores the
surface, which is the bug the tint model exists to avoid.

What designers want is: **exact colors on the surfaces they tuned, computed
colors everywhere else**. Today the only hooks for exact colors are keyed by
component (`--bar-link-fg`, `--card-heading-1-fg`, `--surface-link-fg` via a
category prefix, plain `--link-fg` via an `inherit` fallback). Those leak:

- a theme's `--bar-link-fg` lands on `<Bar bg="#c6093b">` and on `<Bar danger>`;
- a theme's `--surface-link-fg` or `--link-fg` lands on every Bar, because the
  Bar's chain is `--bar-link-fg → --surface-link-fg → inherit`;
- an exact `--heading-1-fg` applies on every surface, including primary ones.

Switching themes can make an instance unreadable without the instance changing.

## The principle

**Color is relational; typography is not.** A font size is legible whatever is
around it, so resolving it through component → category → global chains is
safe. A foreground, link color, text tone or heading color only has meaning
against the background behind it. Component chains resolve each variable
independently, so they can pair a background from one place with a tone from
another.

So color gets its own semantics, keyed by **color family**, not by component.
Apps are built on families ("blue link on white, white link on blue"), not on
component surfaces ("orange links on cards, green on tiles"). Typography,
spacing, borders and the rest keep their existing component chains.

## The contract

### Families

A family is a background, its foreground, and optional pins for what sits on it.

- The neutral surface ladder (below): `background`, `surface`, and higher
  tiers. `surface` is the app's reading surface (`--surface-bg` /
  `--surface-fg`); in dark mode, the deep grey on near-black. These are real
  color families, not the category prefix of the same name.
- Semantic roles: `primary`, `secondary`, `info`, `success`, `warning`,
  `danger`, plus any app-defined roles (see open questions).
- **Unknown**: a surface given a raw background (`<Bar bg="#323232">`, or a
  context that sets `--tile-bg` by hand) belongs to no family.

`--<role>-bg` / `--<role>-fg` already define the pairs.

### The surface ladder (proposed; confirm against updraft)

`surface` is really an ordered ladder of neutral families, separate from the
roles:

| Tier | Typical use |
| --- | --- |
| `background` | behind everything (`--bg` / `--body-bg` today) |
| `surface` | prose regions: Container, TextLayout |
| `surface-raised` | Card, Tile, Form: stands out (shadow, maybe a different color) |
| `surface-overlay` | menus, popovers, dialogs |
| `inverse` | opposite lightness: tooltip, snackbar |

- **Pins fall back down the neutral ladder:** `--on-surface-raised-X` →
  `--on-surface-X` → `--on-background-X` → mix. Neutral tiers are usually
  close in lightness, so a surface pin also suits cards unless the theme says
  otherwise. Roles never fall back to each other, and `inverse` never falls back
  to the ladder.
- **Each component compiles a default tier.** Themes recolor tiers, not
  components. Flattening is aliasing a tier's color, e.g.
  `--surface-raised-bg: var(--surface-bg)`. Aliasing a tier's color is safe:
  the family stays known. Aliasing a component's background (`--card-bg`) is
  not.
- **Per-component reassignment** across the whole theme (flat tiles but raised
  cards) needs a mapping hook. Per instance or context, the role helper does it
  (`surfaceVars("surface", "tile")`). A theme-wide selector such as
  `--tile-surface-level: 1` is possible in plain CSS (color-mix weights plus
  step pairing) but adds weight; style queries would be cleaner once support is
  broad. Start with compiled defaults plus tier aliasing; add a hook only if
  updraft needs it.

### `secondary` has been doing two jobs

In components, `secondary` is mostly the fallback for quiet UI chrome, not an
accent: `color-props(card-header, secondary)`, `card-footer`, Tooltip, Button,
ButtonLink, TabItem, Toggle, Checkbox, RadioButton, the grouped toggles,
CircleButton and Progress all end their chains in `secondary`. Its default
`--secondary-color` (indigo-50) fits that history. Yet Text treats `secondary`
as a tone, where mixing toward indigo-50 only lightens text, a second muted.
Decide whether it is an accent role or a neutral tier. If tiers exist, the
chrome likely moves onto one (raised/overlay, or a `control` family), and
`secondary` becomes a real accent.

### Public pin names

The only public exact-color hooks:

```
--on-<family>-<tone>-text-fg     tone ∈ primary secondary info success warning danger muted link
--on-<family>-heading-<level>-fg level ∈ 1..6 | major (h1-h2) | minor (h5-h6); also --on-<family>-heading-fg
--on-<family>-heading-<level>-bg same levels; a filled heading on that family
```

Pins are sparse. A theme writes only the pairs a designer tuned; there is no
matrix to fill and the library never curates "likely" pairs. Within a family,
heading pins walk level → group → shared (`-heading-1-fg`, `-heading-major-fg`,
`-heading-fg`).

**Removed:** component-keyed colors for tones, links and headings
(`--bar-link-fg`, `--container-link-fg`, `--surface-link-fg`,
`--card-heading-1-fg`, `--tile-heading-*-fg/-bg`, `--surface-heading-*`). They
are the foot gun. Component typography variables (`--card-heading-1-font-size`)
stay.

### Resolution, on every color surface

1. **Which family am I in?**
   - compiled default per component (Card, Tile, Bar, Container: `surface`);
   - a role applied by sugar or by the helper (below);
   - unknown, when the surface's background came from a component-level
     variable without a role.
2. **That family's pin**, if the theme set one.
3. **Otherwise the mix rule**, computed from the surface's own resolved pair.
   Mix rules are unchanged:
   - Text tones: `--<tone>-color`, `--<tone>-text-amount`, `--text-amount`;
   - links: `--link-color`, `--link-text-amount` (10% default);
   - headings: `--heading-*-tint`, `--heading-*-tint-amount`,
     `--heading-tint-scale`; `transparent` at ~30% subdues on any surface.
4. With no pin and no mix rule, inherit.

An unknown family always mixes, under every theme. That is the property that
makes "set a background and the tones just work" true.

### Sugar is still variables

`<Bar primary>` is, and stays, sugar for variables. Applying a role sets the
pair plus private transport variables pointing at that role's pins, for
example:

```css
--bar-bg: var(--primary-bg);
--bar-fg: var(--primary-fg);
--_on-link-text-fg:   var(--on-primary-link-text-fg);   /* invalid if unpinned -> mix */
--_on-danger-text-fg: var(--on-primary-danger-text-fg);
--_on-heading-1-fg:   var(--on-primary-heading-1-fg);
/* ...one line per tone and heading level */
```

Generate this from one helper (something like `surfaceVars(role, prefix)`) so
`<Bar primary>`, a context `div`, and an app-defined role all produce
identical results. The transport names are private (`--_*`), undocumented, and
never set by themes. The count grows with roles × tones, not roles × roles.

### Examples

```css
:root {
  /* On the app's surface: exact. */
  --on-surface-heading-1-fg: var(--primary-color);
  --on-surface-heading-2-fg: var(--secondary-color);
  --on-surface-link-text-fg: rgb(0, 51, 160);

  /* On primary surfaces: exact, written once for the whole app. */
  --on-primary-heading-1-fg: white;
  --on-primary-heading-2-fg: white;
  --on-primary-link-text-fg: white;

  /* Everywhere else: mix rules. */
  --heading-1-tint: var(--primary-color);
  --heading-2-tint: var(--secondary-color);
  --heading-minor-tint: transparent;
  --heading-minor-tint-amount: 35%;
}
```

```svelte
<Container>…</Container>                 <!-- surface: pinned colors -->
<Bar primary>…</Bar>                     <!-- primary: on-primary pins, else mix -->
<Bar bg="#323232" fg="#fff">…</Bar>      <!-- unknown: mixes, under any theme -->
```

A filled heading on a family is a pair of pins, e.g. an inverted block on
primary: `--on-primary-heading-1-bg: var(--primary-fg)` and
`--on-primary-heading-1-fg: var(--primary-bg)`. This replaces the per-instance
overrides shown in the `/review/headings` specimen.

`<Button danger>`, Tag and other filled controls are their own surfaces with
their own pair. Nothing here changes them.

## Mechanisms already verified (Chromium)

- **`initial` opt-out.** A variable set to `initial` is guaranteed-invalid, so a
  fallback chain skips an inherited value. Exact at `:root`, mix where a surface
  sets `--x: initial`. This works today, but per instance.
- **Step pairing.** `color-mix(in srgb, <value> 100%, var(--<step>-bg) 0%)`
  equals `<value>`, but is invalid when `--<step>-bg` is unset, which makes
  that step drop out of a `var()` chain. `--_hN-bg-set` / `--_hN-filled-ground`
  in `sass/_typography.scss` use the same trick (shipped, tested). It lets a
  surface honor a pin only when its background came from the matching step.
  Tested for links with five cases: no pins; surface pin; surface pin plus a
  `--container-bg` alias (misfires: see traps); role pin via the bundle; role
  bundle with no pin defined (mixes).
- **`currentColor` in custom properties** stays a token until the consuming
  `color` declaration, where it means the inherited foreground. Headings,
  links, first letters and Text explicit amounts all depend on this.

## Traps found so far

- **A `var()` in a custom property freezes where it is declared.**
  `--heading-minor-fg: var(--muted-text-fg)` at `:root` resolves once, against
  the page; it does not follow surfaces. Mix rules (tint, `transparent` subdue)
  are the relative tool.
- **Theme aliases look like "set".** `light.css` writes `--container-bg:
  var(--surface-bg)`. Under step pairing that makes a vanilla Container an
  unknown family (it mixes instead of using `--on-surface-*` pins). Remove
  aliases; Container's chain already falls through to `--surface-bg`.
- **Themes set component backgrounds today** (`light.css`: `--sidebar-bg`,
  `--menu-bg`, `--tab-bg`, `--tab-active-bg`, `--code-bg`, `--container-bg`).
  Under the contract these become unknown families and mix. That's a safe
  failure, but it loses designer pins, which is why surface families (open
  question 1) are needed.
- **The link chain ends in `inherit` today**, so a theme-level `--link-fg` or
  `--surface-link-fg` already pins every Bar, including custom-colored ones.
- **The bundled light theme's `--secondary-color` is indigo-50** (very pale). As
  an exact heading or text color on the surface it is about 1.1:1.
- **Tinting toward a surface's own background can't reach contrast.** A primary
  tint on a primary surface measured 2.6:1 at 60% and 3.9:1 at 40%. The family
  pins exist for exactly this.

## Open questions

1. **The surface ladder.** How many tiers (proposal: background, surface,
   raised, overlay, plus inverse), what to call them (named vs numbered), and
   which component defaults to which. Whether controls get their own family.
   Themes would recolor sidebars and menus through tiers instead of
   `--sidebar-bg`. Decide from updraft's real surfaces.
1b. **`secondary`: accent role or neutral tier?** See "`secondary` has been
   doing two jobs". Changes the default chains of a dozen components.
2. **App-defined slugs.** updraft has its own semantic slugs mixed in with
   contain's. For each, decide whether it is:
   - a **family** (a surface: needs `--<slug>-bg/-fg`, works with the helper
     and `--on-<slug>-…` pins by name, no library change);
   - a **tone** (text on surfaces: today the seven tones are compiled into
     `color-props`, so new tones need an extensible list or a different
     mechanism, and Text's boolean flags are fixed);
   - or both.

   This is the decision most likely to reshape the API.
3. **`--heading-*-fg` / `--heading-*-bg` migration.** Proposal: one release as
   documented aliases for the `--on-surface-…` pins, then deprecate. That's a
   behavior change: they would stop applying on primary and unknown surfaces.
4. **Mix rules per family.** Allow `--on-<family>-text-amount` /
   `--on-<family>-link-color` (carried by the same bundle), or keep mix rules
   global?
5. **CSS weight.** Each color surface gains one private property per tone and
   heading level per step. Measure against updraft's bundle.
6. **Structural guard.** Nothing stops a theme from writing a component-level
   color. Under the contract that only makes the surface an unknown family
   (readable, unpinned). Decide whether a dev-mode warning is worth it.

## Suggested order

1. Write the contract into `AGENTS-INTERNAL.md` and the color section of
   `AGENTS-EXTERNAL.md` first, so new components follow it.
2. Survey updraft: its surfaces, its slugs, where it overrides colors today.
   Answer questions 1-2.
3. **PR: tone mechanism.**
   - family pins with step pairing in `color-props` (tones, links, headings);
   - compiled default family per component;
   - the role helper, used by existing `primary`/`secondary` sugar;
   - remove the `--container-bg` alias;
   - tests: plain surface pinned; context `div` remapping a background mixes;
     context `div` equals the role sugar; raw `bg` mixes under every theme;
     headings on surface/primary/unknown.
4. **PR: surface families.** Define the families, assign component defaults,
   migrate bundled themes off component-level backgrounds, retire
   component-keyed color names.
5. Port updraft's theme to `--on-*` pins and remove its per-surface overrides.

Keep the existing tests green (`tests/heading-colors.spec.ts`,
`tests/contextual-accents.spec.ts`, `tests/color-mix.spec.ts`) or update them
deliberately. Use `/review/headings` (with `&recipes=off`) and its capture
script for before/after review.

## Decisions taken (implementation, Oct 2026)

Settled against updraft's real surfaces while porting it:

1. **Ladder**: `background`, `surface`, `surface-raised`, `surface-sunken`,
   `surface-overlay`, plus `inverse`. Named, not numbered. Sunken was added
   for sidebars and card headers, which every bundled theme already colored
   a step back from the surface. Card and Tile are raised; menus and Dialog
   overlay; Tooltip inverse. Input and Select paint `background` (the 1.6
   behavior; 1.7 had moved them onto control by accident). No theme-wide
   mapping hook: tier aliasing covered updraft.
1b. **`secondary` is an accent.** Chrome moved to a `control` family
   (`--control-bg/-fg`, default a step off the surface). Toggles fall back to
   `inactive`.
2. **App slugs**: families need no library change (`surfaceVars("report-filter",
   "tile")` + `--on-report-filter-*`). Tones stay compiled to the seven;
   updraft's `excel` etc. keep their `.status-text` class. Revisit if a second
   app needs custom tones.
3. **`--heading-*-fg/-bg`** stay exact everywhere for this release
   (documented as deprecated in favor of `--on-surface-heading-*`).
4. **Mix rules per family**: not added; global mix rules plus pins were
   enough. Role surfaces decline heading tints by default instead.
5. **Weight**: about 3.5 KB of uncompressed CSS per family-aware surface
   rule; tones dedupe their mix through `--_<tone>-mix`.
6. **Structural guard**: none. A component-level color is a safe failure
   (unknown family, mixes).

Mechanism change from the plan: step pairing could not express "stop when a
component background is set" (a `var()` chain can only test "set"). The
flags are turned into registered `<number>`s and selected with `color-mix`;
see "How it works" in color-families.md.
