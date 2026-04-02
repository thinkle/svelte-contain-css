# Internal Agent Instructions for Contain CSS Svelte

This is a Svelte 5 component library that uses modern CSS features (CSS variables, container queries) and follows specific patterns. This document outlines the conventions and patterns for **developing and contributing to** this codebase.

> **For consuming this library**, see [AGENTS-EXTERNAL.md](AGENTS-EXTERNAL.md).

## Core Philosophy

Contain CSS is built on three key principles:

1. **CSS Variables for Everything** - All styling is controlled through cascading CSS variables, enabling powerful theming and customization without JavaScript.
2. **Container Queries Over Media Queries** - Components respond to their container size, not viewport size, enabling truly responsive component design.
3. **Native HTML Elements** - Prefer semantic HTML with built-in accessibility (`<dialog>`, `<details>`, `popover`) over custom implementations.

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

### Variable Injection Helper

All components that accept style props **must** use the `injectVars` utility from `$lib/util`. This function converts friendly prop names into CSS custom properties, enabling the cascading variable system.

**What `injectVars` does:**

1. Takes props like `bg="red"` and converts them to CSS variable declarations: `--button-bg: red;`
2. Passes through any props that are already CSS variables (e.g., `--custom-var="value"` → `--custom-var: value;`)
3. Returns a style string to apply to the component's root element

**Example transformation:**

```svelte
<!-- User writes: -->
<Button fg="red" padding="1rem" --custom-thing="blue">

<!-- injectVars generates this style string: -->
<!-- "--button-fg: red; --button-padding: 1rem; --custom-thing: blue;" -->
```

**Implementation pattern:**

```svelte
<script lang="ts">
  import { injectVars } from "$lib/util";

  let {
    bg = null,
    fg = null,
    padding = null,
    width = null,
    height = null,
    ...restProps
  }: Props = $props();

  // Parameters:
  // 1. restProps - the props object (includes any --custom-var props passed through)
  // 2. "button" - component prefix (becomes --button-*)
  // 3. ["bg", "fg", ...] - prop names to convert to CSS variables
  const style = $derived(injectVars(restProps, "button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height"
  ]));
</script>

<button {style} class="button">
  {@render children?.()}
</button>
```

**The `injectVars` function source:**

```typescript
export function injectVars(
  props: { [key: string]: any },
  prefix: string,
  varList: string[],
) {
  let cssVars = "";
  // Convert listed props to prefixed CSS variables
  varList.forEach((v) => {
    if (props[v]) {
      const cssVarName = toKebabCase(v); // e.g., "maxWidth" → "max-width"
      cssVars += `--${prefix}-${cssVarName}: ${props[v]};`;
    }
  });
  // Pass through any explicit CSS variables (--anything)
  for (let prop in props) {
    if (prop[0] == "-" && prop[1] == "-") {
      cssVars += `${prop}: ${props[prop]};`;
    }
  }
  return cssVars;
}
```

This approach means `<Button fg="red">` sets `--button-fg: red` on the element, which the component's SCSS then references via the mixin cascade system.

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

- `Button`, `ButtonLink`, `MiniButton` - all six variants
- `Tag` - all six variants

### Using SCSS Mixins

Use the provided mixins from `$lib/sass/_mixins.scss` for consistent styling:

```scss
<style lang="scss">
  @import "$lib/sass/_mixins.scss";

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

    // Box properties (padding, margin, border-radius)
    @include box-props(my-component);

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
  import { injectVars } from "$lib/util";
  import type { Snippet } from "svelte";

  // 1. Type definitions
  interface Props {
    // Always include common style props
    bg?: string | null;
    fg?: string | null;
    padding?: string | null;
    width?: string | null;
    height?: string | null;
    // Component-specific props
    primary?: boolean;
    disabled?: boolean;
    // Snippets for content
    children?: Snippet;
  }

  // 2. Props destructuring with defaults + rest props
  let {
    bg = null,
    fg = null,
    padding = null,
    width = null,
    height = null,
    primary = false,
    disabled = false,
    children,
    ...restProps
  }: Props & Record<string, unknown> = $props();

  // 3. Style injection (use $derived for reactive updates)
  const style = $derived(injectVars(restProps, "component-name", [
    "bg", "fg", "padding", "width", "height"
  ]));

  // 4. Component logic
</script>

<!-- 5. Template -->
<div class="component-name" {style} class:primary class:disabled {...restProps}>
  {@render children?.()}
</div>

<!-- 6. Styles -->
<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .component-name {
    @include color-props(component-name, category);
    @include box-props(component-name, category);
    @include focusable();
    // ... other styles
  }

  .component-name.primary {
    @include color-props(primary, component-name);
  }
</style>
```

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
- `Row` - horizontal flex container

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

## File Organization

```
/src/lib/
├── controls/       # Interactive controls (Button, Input, Checkbox, etc.)
├── layout/         # Layout components (Container, GridLayout, FormItem, etc.)
├── overlays/       # Overlay components (Dialog, Tooltip)
├── misc/           # Utility components (Code, Progress, Tag)
├── typography/     # Text layout components
├── dropdowns/      # Dropdown components
├── sass/           # SCSS mixins and functions
│   ├── _mixins.scss      # Main mixin imports
│   ├── _affordances.scss # Focus, clickable, scrollbar mixins
│   ├── _box.scss         # Box model mixins
│   ├── _color.scss       # Color property mixins
│   ├── _typography.scss  # Typography mixins
│   └── _functions.scss   # SCSS helper functions
├── vars/           # CSS variable definitions
│   ├── defaults.css      # Base imports
│   ├── colors.css        # Color variables
│   ├── typography.css    # Font variables
│   └── themes/           # Theme files
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
