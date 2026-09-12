# Internal Agent Instructions for Contain CSS Svelte

This is a Svelte 5 component library that uses modern CSS features (CSS variables, container queries) and follows specific patterns. This document outlines the conventions and patterns for **developing and contributing to** this codebase.

> **For consuming this library**, see [AGENTS-EXTERNAL.md](AGENTS-EXTERNAL.md).

## Core Philosophy

Contain CSS is built on three key principles:

1. **CSS Variables for Everything** - All styling is controlled through cascading CSS variables, enabling powerful theming and customization without JavaScript.
2. **Container Queries Over Media Queries** - Components respond to their container size, not viewport size, enabling truly responsive component design.
3. **Native HTML Elements** - Prefer semantic HTML with built-in accessibility (`<dialog>`, `<details>`, `popover`) over custom implementations.

### What those principles are _for_

Read [What a good Contain app looks like](AGENTS-EXTERNAL.md#what-a-good-contain-app-looks-like)
before designing a component API. The goal on the consumer side is an app with
almost no custom styling: pick the right component, write plain semantic HTML
inside it, and change the _theme_ when something looks wrong. Every internal
decision should serve that.

In practice, when you add or change a component:

- **Defaults are the product.** A component that only looks right once the
  consumer passes five props has failed. Tune the defaults and the theme vars
  instead of expecting props at the call site.
- **Prefer a variable over a prop.** A variable set on an ancestor themes a whole
  subtree; a prop dresses one element. Style props exist as an escape hatch for
  genuine one-offs — they are not the styling API.
- **Don't grow a utility-prop surface.** If a component is accumulating props
  that map one-to-one onto CSS declarations, that's the library drifting toward
  hand-rolled Tailwind. Expose the variable and document it.
- **Structure and semantics belong to HTML.** Components that hold content should
  typeset real `<h2>`/`<p>`/`<ul>` (see `typography-container-props`) rather than
  asking consumers to assemble text out of layout primitives.

---

## Svelte 5 Patterns

### Component Props Declaration

Always use the Svelte 5 runes syntax for component props:

```svelte
<script lang="ts">
  // Correct: Use $props() rune
  let {
    primary = false,
    bg = null,
    fg = null,
    padding = null
  }: {
    primary?: boolean;
    bg?: string | null;
    fg?: string | null;
    padding?: string | null;
  } = $props();

  // NOT: export let primary = false;
</script>
```

### State Management

Use `$state()` for reactive state:

```svelte
<script lang="ts">
  let isOpen = $state(false);
  let value = $state(0);

  // NOT: let isOpen = false;
</script>
```

### Derived Values

Use `$derived()` for computed values:

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  // NOT: $: doubled = count * 2;
</script>
```

### Effects

Use `$effect()` for side effects:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  // Prefer $effect when possible
  $effect(() => {
    console.log('Value changed:', value);
  });

  // Use onMount for browser-only initialization
  onMount(() => {
    // Browser-specific code
  });
</script>
```

### Slots and Snippets

Use the new `Snippet` type and `@render` syntax:

```svelte
<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
    header?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
  }

  let { children, header, footer }: Props = $props();
</script>

{#if header}
  {@render header()}
{/if}

{@render children?.()}

{#if footer}
  {@render footer()}
{/if}
```

### Event Handling

Svelte 5 uses inline event handlers:

```svelte
<!-- Correct: Inline handlers -->
<button onclick={() => handleClick()}>Click</button>
<button onmouseenter={() => showTooltip()}>Hover</button>

<!-- NOT: on:click={handleClick} -->
```

---

## CSS Variable System

### The prop contract: `elementProps` and `ContainProps`

Every component's props are three things at once, and one helper handles all
three so each component does not re-solve it:

1. **Style shorthands** (`bg`, `padding`, `fontSize`) → CSS custom properties.
2. **Native attributes** (`id`, `aria-*`, `data-*`, event handlers) → forwarded
   to the element, so consumers can label, test and hook into components.
3. **`class` and `style`** → merged with the component's own, never replacing
   them.

Use `elementProps` from `$lib/util`. It returns the attributes to spread, with
the CSS variables and the caller's own `style` already merged into one `style`
attribute:

```svelte
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  const WIDGET_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    { primary?: boolean; children?: Snippet },
    StyleProps<typeof WIDGET_VARS>
  >;

  let { primary, children, class: className, ...restProps }: Props = $props();

  const el = $derived(elementProps(restProps, "widget", WIDGET_VARS));
</script>

<div class={["widget", className]} class:primary {...el}>
  {@render children?.()}
</div>
```

Five rules, each of which was a real bug before the helper existed:

**Spread LAST.** `{...el}` goes after the component's own attributes so a
consumer can override them. Attributes the component genuinely owns are
guarded at the type level instead, via `ContainProps`' fourth parameter
(`"type"` on Slider's range input), not by attribute ordering — a type error
is visible, an ordering convention is not.

**Never write `{style}` next to the spread.** `style` is inside `el` already.
Writing `{style} {...restProps}` let a consumer's `style="margin:0"` wipe out
every injected variable, and writing them the other way round lost the
consumer's style instead. `elementProps` concatenates: variables first, the
caller's declarations last, so theirs win per-declaration without erasing.

**Merge `class`, don't spread it.** Destructure `class: className` and write
`class={["widget", className]}`. Verified against Svelte 5: a spread `class`
*replaces* a static one — `<div class="widget" {...rest}>` with `class="mine"`
renders `class="mine svelte-hash"`, and `.widget` is gone along with all its
styling. Keeping the literal in the template is also what lets the compiler's
CSS pruning see that `.widget` is used.

**Hand destructured style props back.** `elementProps(restProps, ...)` cannot
see a prop you destructured. `Progress` destructured `bg`/`fg`/`padding` and
then passed only `restProps`, so `<Progress bg="red">` emitted nothing at all
for months. If you destructure one, pass it explicitly:
`elementProps({ bg, fg, ...restProps }, "progress", PROGRESS_VARS)`.

**Do not declare `class` in your own props.** The element attribute types
already type it as `ClassValue | null | undefined`. Redeclaring it as
`ClassValue` narrows it and breaks forwarding between components.

#### `splitProps` for wrapper + control components

When a component renders a wrapper around a control (Toggle, RadioButton,
Checkbox, Dialog, Tile), the two halves want different things: the CSS
variables belong on the wrapper the stylesheet targets, while `aria-*`,
`name`, `required` and `data-*` belong on the control the consumer is
describing. `splitProps` returns them separately:

```svelte
const el = $derived(splitProps(restProps, "toggle", TOGGLE_VARS));
...
<label class={["toggle", className]} style={el.style}>
  <input type="checkbox" bind:checked {...el.attrs} />
</label>
```

One caution learned the hard way: do not put a caller's `style` on a
`display: contents` wrapper. It generates no box, so the style is inert.
TabItem does this — its wrapper exists only to scope CSS onto the Button
inside — so everything goes to the Button, and the variables still work
because a custom property resolves on the element it is declared on.

#### Components that deliberately take no attributes

Not every component can pass attributes through, and each exception carries
its reason in the source rather than being an oversight:

- **FormProvider, Code** — render no element of their own.
- **ResponsiveText** — renders one span per breakpoint, so there is no single
  root an `id` could go on without being wrong at every other breakpoint.
- **Table** — the sticky variant renders a visually-hidden clone of its
  tables, so a spread `id` would be emitted twice.

### Style shorthands are derived, not chosen

`src/lib/styleProps.ts` names one constant per SCSS mixin. A component's
shorthand list is the union of the groups for the mixins **its own CSS
includes** — it is a consequence, not a decision:

| Constant | Backed by | Props |
| --- | --- | --- |
| `COLOR_VARS` | `@include color-props` | `bg`, `fg` |
| `PADDING_VARS` | `@include padding-props` / `box-props` family | `padding` |
| `RADIUS_VARS` | the `box-props` family | `borderRadius` |
| `MARGIN_VARS` | `@include margin-props` | `marginBlock`, `marginInline` |
| `GAP_VARS` | `@include gap-props` | `gap` |
| `TYPOGRAPHY_VARS` | `@include typography-props` and its variants | `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `textDecoration`, `fontFamily`, `fontVariant` |
| `TYPOGRAPHY_CONTAINER_VARS` | `@include typography-container-props` | the above plus `lineWidth` |
| `SIZE_VARS` | `@include box-size-props` | `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight` |

The Props type comes from the same array via `StyleProps<typeof X_VARS>`, so
what a component accepts and what it emits cannot drift apart. Adding a name
to the array is what adds the prop.

Three rules when adding a group to a component:

**The mixin's FIRST prefix must be the component's own.**
`@include color-props(primary, button, control)` inside `.button.primary` is
a variant rule; it does not make `--button-bg` readable.

**A commented-out include does not count.** MenuList's `padding-props` line is
commented out with `padding: 0` hardcoded below it, so MenuList takes `COLOR`
only. A `--menu-padding` would go nowhere.

**Prove it in the browser.** `tests/style-shorthands.spec.ts` asserts the value
reaches *computed CSS*, not that a variable was emitted. Emitting
`--button-font-weight` proves nothing if no rule consumes it. This is the
guard against the "typed but never read" bug that `MarginStyleProps` exists to
stop repeating.

`SIZE_VARS` is deliberately applied per component rather than folded into
another group. `width` and `height` are real HTML attributes on `<input>`,
`<img>`, `<canvas>` and `<iframe>`, and `ContainProps` resolves such a clash by
dropping the attribute — correct for a deprecated one, wrong for a semantic
one. The general rule:

> A style shorthand is safe only when the element the component renders has no
> HTML attribute of that name.

This is also why Progress's accessible-name prop is `progressLabel` and not
`label`: `label` is a real attribute on `<option>`, `<optgroup>` and `<track>`.

### Accessible names belong to the consumer

Any string a component puts in an `aria-label` needs a prop, because the
component cannot know what the control means in an app. Tag's close button
said "Close tag" — which names the widget, not the action — and was
unreachable: `aria-label` in rest props lands on the outer span, never on the
button.

```svelte
closeLabel?: string;   // Tag           default "Remove"
progressLabel?: string; // Progress     default "Progress"
resizerLabel?: string;  // SplitPane    default "Resize panes"
expandLabel?: string;   // Sidebar      default "Expand sidebar"
```

Defaults should describe the action, and the doc comment should tell a
consumer to replace it: `closeLabel="Stop searching by author"` is what makes
a list of close buttons distinguishable to a screen reader.

### `injectVars` (legacy)

Still exported for the rare case with no element to spread onto. Prefer
`elementProps`, which handles the attribute hygiene `injectVars` alone does
not: on its own it leaves style props (`<button bg="red">`) and spread custom
properties (`--tag-bg="red"`) to render as invalid attributes.

Note that `<Tag --tag-bg="red">` in a template never reaches your props at
all — Svelte intercepts `--*` attributes on components and renders
`<svelte-css-wrapper style="display: contents; --tag-bg: red;">` around them.
The `--*` handling in these helpers covers only the object-spread path, which
Svelte cannot detect statically.

### Variable Naming Convention & Fallback Cascade

Variables follow a hierarchical fallback pattern:

1. `--component-property` (most specific, e.g., `--button-bg`)
2. `--category-property` (e.g., `--control-bg`)
3. `--global-property` (least specific, e.g., `--primary-bg`)

Example from Button component:

- `--button-bg` falls back to `--control-bg` falls back to `--secondary-bg`

### Semantic Color Variants

The design system includes semantic color variables that components can use via boolean props:

**CSS Variables (defined in `src/lib/vars/colors.css`):**

```css
--primary-bg / --primary-fg     /* Main actions - Blue */
--secondary-bg / --secondary-fg /* Less emphasis - Gray */
--warning-bg / --warning-fg     /* Caution - Orange */
--danger-bg / --danger-fg       /* Destructive - Red */
--success-bg / --success-fg     /* Positive - Green */
--info-bg / --info-fg           /* Informational - Light Blue */
```

**Implementing semantic variants in a component:**

1. Add boolean props:

```svelte
let {
  primary = false,
  danger = false,
  success = false,
  // ...
}: Props = $props();
```

2. Add class bindings:

```svelte
<button class:primary class:danger class:success>
```

3. Add SCSS rules using the semantic prefix:

```scss
button.primary {
  @include color-props(primary, button, control);
}
button.danger {
  @include color-props(danger, button, control);
}
button.success {
  @include color-props(success, button, control);
}
```

**Components currently supporting semantic variants:**

- `Button`, `ButtonLink` - all six variants
- `CircleButton` - five (no `secondary`; its default already reads as secondary)
- `Tag` - primary, warning, danger, success, info (default styling uses secondary)
- `Bar` - primary and secondary only; it is page furniture, not a status surface
- `Text` - all six variants plus muted; consumes text tones instead of establishing a surface

When adding a variant, add it to the component that genuinely needs it rather
than to every component for symmetry. A `danger` Bar has no meaning.

### Surface colors and inline text are different roles

Read [the consumer color contract](AGENTS-EXTERNAL.md#color-roles-surfaces-ingredients-and-text)
before adding color APIs. `--danger-fg` is text on `--danger-bg`, not a universal
red text token. Choose surface pairs together. A theme may put the meaningful
color in either channel; define `--danger-color` independently as its text-mixing
ingredient. Do the same for primary, secondary, info, success and warning.

`color-props` resolves both surface channels, including their independent mix
controls, into `--_color` and `--_background-color`. Hover/active affordances and
text shortcuts must derive from these resolved values, not the unmixed bases.
Consumers should not set these private variables. The mix controls follow the
same prefix chain as their channel; bare global knobs have broad effects.

The mixin computes `--<slug>-text-fg` for all seven slugs: primary, secondary,
info, success, warning, danger, muted. It mixes the foreground toward
`--<slug>-color` by `--<slug>-text-amount`, falling back to `--text-amount`, then
50%. `colors.css` defines `--muted-text-amount: 20%`; each surface derives
`--muted-color` from its resolved background (or `--muted-color-override`).
Amount always means target share, not foreground retention.

`--<slug>-text-fg-override` supplies an explicit result across nested contexts.
Derived properties resolve before inheritance: recompute them at color boundaries,
not only at :root. Do not create self-referencing custom-property cycles. Keep
surface pairs and text ingredients independent when authoring themes. Mixing does
not guarantee contrast; inspect light, dark, nested and remapped surfaces.

### Text implementation contract

`typography/Text.svelte` renders a span and must not call `color-props` or paint
a background. It consumes `--<slug>-text-fg` uniformly, including
`--muted-text-fg`; do not reintroduce the earlier `--muted-fg` / `--muted-amount`
names. The same target/amount path handles muted and every semantic flag.

- Without a tone or explicit color, inherit (amount alone has no target).
- Explicit color wins over flags. Explicit color or amount bypasses the shortcut
  and mixes from `currentColor` (the inherited foreground in the color property).
- Otherwise consume the surface shortcut, preserving explicit theme overrides.
- Prefer one flag; current conflict order is danger, warning, success, info,
  primary, secondary, muted.
- `bold` and `italic` are independent visual span styles, not strong/em semantics.
- Forward native span attributes, events, and supplied custom properties without
  leaking tone/amount/color props into HTML attributes.

The normal styled-surface template below is not a template for Text: adding
background/layout props indiscriminately would defeat its purpose.

### Using SCSS Mixins

Use the provided mixins from `$lib/sass/_mixins.scss` for consistent styling:

```scss
<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .my-component {
    // Color properties (bg, fg)
    @include color-props(my-component, container);

    // Typography (font-size, font-family, line-height, text-align, etc.)
    // Does NOT set max-width.
    @include typography-props(my-component, ui);

    // Prose container typography: sets max-width via --line-width, applies
    // typography-props, and styles descendant p/h1-h6/ul/ol elements.
    // Use ONLY on content containers (e.g. TextLayout), never on layout
    // primitives like Stack or Inline — it will impose a max-width on them.
    @include typography-container-props(my-component, container);

    // Box properties (padding, border, border-radius). Despite the name,
    // does NOT include margin -- that's the separate mixin below.
    @include box-props(my-component);

    // margin-block/margin-inline, both defaulting to 0. Opt-in only: add
    // this to a component deliberately, not as a matter of course -- most
    // layout primitives (Stack, Inline) should stay margin-free by default.
    @include margin-props(my-component);

    // Box shadow
    @include box-shadow(my-component, container);

    // Interactive states (hover, active, disabled)
    @include clickable(my-component);

    // Focus states
    @include focusable();
  }
</style>
```

### The `var-with-fallbacks` Function

For manual fallback chains in SCSS:

```scss
.element {
  padding: var-with-fallbacks(--padding, my-component, container, 8px);
  // Tries: --my-component-padding, then --container-padding, then 8px
}
```

---

## Component Structure Template

Standard component file structure:

```svelte
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  // 1. Shorthands, one group per mixin the <style> block below includes.
  //    The Props type is derived from this array, so the two cannot drift.
  const COMPONENT_NAME_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
  ] as const;

  // 2. Props: element attributes, the component's own props, the shorthands.
  //    Never declare `class` -- HTMLAttributes already types it.
  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      primary?: boolean;
      disabled?: boolean;
      children?: Snippet;
    },
    StyleProps<typeof COMPONENT_NAME_VARS>
  >;

  // 3. Destructure your own props and `class`; everything else is rest props.
  let {
    primary = false,
    disabled = false,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  // 4. One derived: attributes to spread, with the variables and the caller's
  //    own `style` already merged into a single style attribute.
  const el = $derived(
    elementProps(restProps, "component-name", COMPONENT_NAME_VARS),
  );
</script>

<!-- 5. Template: merge class, spread LAST so consumers can override. -->
<div class={["component-name", className]} class:primary class:disabled {...el}>
  {@render children?.()}
</div>

<!-- 6. Styles -->
<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .component-name {
    /* These includes are what justify COLOR_VARS / PADDING_VARS / RADIUS_VARS
       above. Remove an include and you must remove its group too. */
    @include color-props(component-name, category);
    @include box-props(component-name, category);
    @include focusable();
    // ... other styles
  }

  .component-name.primary {
    /* A variant rule: the first prefix is `primary`, not `component-name`,
       so this does NOT make --component-name-bg readable and does not
       justify a shorthand group. */
    @include color-props(primary, component-name);
  }
</style>
```

Before you finish, add the component to
`src/routes/tests/passthrough/+page.svelte`. That fixture drives
`tests/attribute-passthrough.spec.ts`, which reads its cases off the DOM, so a
component added there is covered by every assertion without touching the
spec.

---

## Container Queries

This library uses container queries extensively. Components should be container-aware:

```scss
.responsive-component {
  container-type: inline-size;

  // Mobile-first styles

  @container (min-width: 400px) {
    // Tablet styles
  }

  @container (min-width: 800px) {
    // Desktop styles
  }
}
```

Example: FormItem switches from stacked to side-by-side layout based on container width.

---

### Container must establish its inline size

Container uses `width: var(--container-width, 100%)`, `box-sizing: border-box`,
a max-width constraint, and automatic horizontal margins. Keep that width rule:
inside a column flex parent, auto side margins prevent cross-axis stretching,
and inline-size containment removes content's intrinsic width contribution.
Without a width, the content box can collapse to zero and the side margins absorb
all remaining space. This is not solved by adding align-items: stretch to SplitPane.

Do not hide this regression with extra wrapper divs or by removing containment.
Check Container directly inside a SplitPane panel, a column flex layout, a normal
block, and a horizontal flex row; verify capped maxWidth still centers.
`marginInline` (default `auto`) is what performs the centering; `marginBlock`
(default `var(--gap)`) is unrelated vertical rhythm. These are hand-written in
Container's own `<style>` rather than routed through the generic `margin-props`
mixin in `_box.scss`, specifically because their defaults (`auto` / `var(--gap)`)
differ from every other component's (`0`) — see margin-props' own comment for why
a single mixin can't parameterize that in Sass.

`maxWidth` is the friendly prop and the one consumers should reach for — it caps
without preventing the Container from shrinking. `--container-width` is the fixed
width override, and it is deliberately _not_ exposed as a prop. Note it is only
dangerous unpaired: `max-width` always wins over `width` when the two conflict, so
`--container-width` alongside `maxWidth="100%"` (or any cap ≤ the fixed value)
still shrinks fine on a narrow parent — the actual size is
`min(--container-width, max-width)`. It forces horizontal scrolling only when
nothing constrains `max-width` down to the parent (omitted, or set larger than
`--container-width`). Keep `--container-width` off the props list unless there's
a strong reason regardless — it's easy to reach for without the `maxWidth` pairing
that makes it safe.

## Layout Context Variables

Some CSS variables only make sense in certain layout contexts. Horizontal layout containers should reset variables that assume vertical stacking:

```scss
.horizontal-container {
  display: flex;
  flex-direction: row;

  /* Reset form label width - fixed widths don't make sense in horizontal layouts */
  --form-label-width: auto;
}
```

**Components that reset `--form-label-width: auto`:**

- `Bar` - always horizontal flex
- `RowContainer` - sized horizontal lane

**Why:** `FormItem` has a default `--form-label-width: 12em` for nice vertical form alignment, but fixed label widths cause awkward layouts in horizontal contexts.

**The cascade still works:** Users can override with `<Bar --form-label-width="8em">` if they specifically want fixed widths.

---

## Accessibility (a11y)

### Focus Management

Always use the focus mixins from `$lib/sass/_affordances.scss`:

```scss
button {
  @include focusable();
  // Adds :focus-visible styles with outline and box-shadow
}

.interactive-element {
  @include clickable();
  // Adds hover brightness, active state, and disabled cursor
}
```

### Semantic HTML First

Always prefer native elements with built-in accessibility:

```svelte
<!-- ✅ Good: Use native elements -->
<button onclick={handler}>Action</button>
<dialog bind:this={dialogEl}>Modal content</dialog>
<details>
  <summary>Toggle</summary>
  <p>Content</p>
</details>

<!-- ❌ Avoid: DIVs with click handlers -->
<div onclick={handler} role="button" tabindex="0">Action</div>
```

### Built-in Accessible Elements Used

- `<dialog>` for modals (Dialog.svelte)
- `<details>` for accordions (Accordion.svelte)
- Native `<progress>` for progress bars (Progress.svelte)
- `popover` attribute for tooltips (Tooltip.svelte)

---

## Overlay positioning contract

Anything that measures a consumer's markup to position itself (currently Tooltip)
must not assume that markup has a layout box.

**Never measure `wrapper.children[0]`.** The target wrapper is `display: contents`
by design — wrapping a consumer's element must not change its layout — and so are
several things that routinely land inside it:

- `<svelte-css-wrapper>`, which Svelte injects around _any_ component handed
  `--custom-property` props: `<Tooltip><Button --button-bg="red" /></Tooltip>`
- a consumer's own `display: contents` element
- bare text or an interpolation (`<Tooltip>{score}</Tooltip>`), where there is no
  element to measure at all

A boxless element measures as a 0x0 rect at the viewport origin, which parks the
overlay in the corner of the screen; no element at all used to mean no tooltip.
Tooltip's `resolveTargetRect()` is the reference implementation: drill _down_
through boxless elements, measure text with a `Range`, and fall back to drilling
_up_ to the nearest ancestor with a box. Keep that shape if you add another
positioned overlay, and keep the target wrapper boxless.

**Fixed-position overlays must survive scrolling.** Coordinates written from
`getBoundingClientRect()` are viewport coordinates and go stale the moment
anything scrolls. Keep positioning in its own function so it can re-run, attach
`scroll` (capture phase — scroll events from a scrolling ancestor don't bubble)
and `resize` listeners while open, throttle with `requestAnimationFrame`, and
remove them on hide and on destroy.

---

## File Organization

```
/src/lib/
├── Card.svelte     # Card lives at the root, not in misc/
├── controls/       # Interactive controls (Button, Input, Checkbox, etc.)
├── layout/         # Layout components (Page, Container, Bar, Stack, Inline, …)
├── overlays/       # Overlay components (Dialog, Tooltip)
├── dropdowns/      # Dropdown components (DropdownMenu)
├── misc/           # Utility components (Code, Progress, Tag)
├── typography/     # Text (inline tones) and TextLayout (prose container)
├── theme/          # Theme injection and theme state
├── review/         # Visual-review harness: scenarios and theme wrappers
├── types/          # Shared style-prop types (re-exported from types.ts)
├── sass/           # SCSS mixins and functions
│   ├── _mixins.scss      # Main mixin imports — `@use "$lib/sass/_mixins.scss" as *`
│   ├── _affordances.scss # Focus, clickable, scrollbar mixins
│   ├── _box.scss         # Box model mixins
│   ├── _color.scss       # Color property mixins
│   ├── _containers.scss  # Container-query helpers
│   ├── _responsive.scss  # Responsive helpers
│   ├── _typography.scss  # Typography mixins (incl. typography-container-props)
│   └── _functions.scss   # SCSS helper functions (var-with-fallbacks)
├── vars/           # CSS variable definitions
│   ├── defaults.css      # Base imports — the one file consumers must import
│   ├── colors.css        # Color variables, incl. text-mix amounts
│   ├── layout.css        # Layout sizing (e.g. --card-width)
│   ├── typography.css    # Font variables and --line-width
│   └── themes/           # Theme files, including typography-only themes
├── util.ts         # elementProps, splitProps, copyCSSVariables
├── styleProps.ts   # shorthand groups mirroring the SCSS mixins
├── cssprops.ts     # The known custom-property list
└── index.ts        # Public API exports
```

---

## Exporting Components

All public components **must** be exported from `src/lib/index.ts`:

```typescript
import MyComponent from "./components/MyComponent.svelte";
export { MyComponent };
```

---

## Common Mistakes to Avoid

### ❌ DON'T use old Svelte syntax:

```svelte
export let value;           // Old
on:click={handler}          // Old
$: derived = value * 2;     // Old
<slot />                    // Old
```

### ✅ DO use Svelte 5 runes:

```svelte
let { value } = $props();   // New
onclick={handler}           // New
let derived = $derived(value * 2); // New
{@render children?.()}      // New
```

### ❌ DON'T hardcode styles:

```svelte
<button style="background: blue; padding: 8px;">
```

### ✅ DO use CSS variables and mixins:

```svelte
<button {style} class="button">
<style lang="scss">
  .button {
    @include color-props(button, control);
    @include box-props(button);
  }
</style>
```

### ❌ DON'T use viewport-based media queries:

```scss
@media (min-width: 600px) {
  /* viewport-based */
}
```

### ✅ DO use container queries for responsive components:

```scss
@container (min-width: 600px) {
  /* container-based */
}
```

---

## Testing & Development

### Component demos are small usage examples

Use one `DemoWithCode` per concept/blurb, not one around an entire showcase.
Give each example a short heading, explanation, and minimal readable usage snippet.
Demo controls belong in `inputArea`; they normally do not belong in source.

For a tint slider, show `<Text danger amount="35%">Needs attention</Text>` when
35% is selected. Interpolate the selected literal into the source string; omit
`$state`, handlers, slider setup and unrelated wrappers. Show container markup
when containment/theming is the concept being taught. Do not import the complete
showcase source with `?raw` as the teaching example.

Verify Demo, Source, and Side by Side, including direct Container children in
SplitPane. Check that source changes while Source/Side by Side is already open.
DemoWithCode currently keys its Code instances by resolvedCode to refresh the
highlighted output on changes; preserve that behavior unless an equivalent
reactive update is verified. Also inspect light/dark and narrow layouts visually.

### End-to-end tests

Playwright specs live in `tests/*.spec.ts`; each one drives a dedicated route
under `src/routes/tests/<name>/+page.svelte`. Keep test pages minimal and
self-describing — a comment at the top saying what would break and how it looks
when it does is worth more than the assertions.

```bash
npm run check             # svelte-check
npm run test:e2e          # all playwright specs
npm run audit:components  # the component audit sweep
npx playwright test <name>
```

Add a regression route + spec when fixing a layout or positioning bug: those are
the failures that silently come back. `tests/tooltip-anchor.spec.ts` covers the
boxless-child and scroll cases described in the overlay contract above.

Two traps when testing hover-driven UI:

- **Wait for hydration before moving the pointer.** These components open on
  `mouseenter`, and the pointer only enters once. Move it before the handler is
  attached and no later event ever arrives — the test fails looking exactly like
  a broken component.
- **Park the pointer away from the target first**, then move onto it. Placing the
  pointer where it already is generates no `mouseenter`.

### Development Server

```bash
npm run dev
```

### Building the Library

```bash
npm run package
```

### Building Demo Site

```bash
npm run build
```

---

## Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- CSS Variables Reference: [css_variables.txt](css_variables.txt)
- Component Demos: `src/routes/demos/`
