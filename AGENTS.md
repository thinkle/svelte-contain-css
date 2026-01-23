# Agent Instructions for Contain CSS Svelte

This project has two agent instruction files depending on your context:

## 📦 [AGENTS-EXTERNAL.md](AGENTS-EXTERNAL.md) - For Library Consumers

Use this when **using** the Contain CSS Svelte library in your project:
- Component API reference and usage patterns
- CSS variable customization and theming
- Common patterns (forms, dialogs, layouts)
- Svelte 5 snippet syntax for slots

## 🔧 [AGENTS-INTERNAL.md](AGENTS-INTERNAL.md) - For Library Contributors

Use this when **developing or contributing to** the library itself:
- Svelte 5 runes patterns ($props, $state, $derived, $effect)
- SCSS mixin system and CSS variable architecture
- Component structure templates
- File organization and export conventions

---

## Quick Summary

Contain CSS is built on three core principles:

1. **CSS Variables for Everything** - All styling flows through cascading CSS custom properties
2. **Container Queries Over Media Queries** - Components respond to container size, not viewport
3. **Native HTML Elements** - Uses `<dialog>`, `<details>`, `popover` for built-in accessibility

---

## Original Internal Documentation

*The following is the original internal development documentation. For the full organized version, see [AGENTS-INTERNAL.md](AGENTS-INTERNAL.md).*

---

# Internal Development Guide

This is a Svelte 5 component library that uses modern CSS features (CSS variables, container queries) and follows specific patterns. This document outlines the conventions and patterns used throughout the codebase.

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

## CSS Variable Patterns

### Variable Injection Helper

All components that accept style props should use the `injectVars` utility from [`$lib/util`](src/lib/util.ts):

```svelte
<script lang="ts">
  import { injectVars } from "$lib/util";

  let {
    bg = null,
    fg = null,
    padding = null,
    width = null,
    height = null
  }: Props = $props();

  // First param: component prefix
  // Second param: array of prop names to inject as CSS variables
  let style = injectVars($$props, "button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height"
  ]);
</script>

<button {style} class="button">
  <slot />
</button>
```

This will create CSS variables like `--button-bg`, `--button-fg`, etc.

### CSS Variable Naming Convention

Variables follow this hierarchy:

1. `--component-property` (most specific, e.g., `--button-bg`)
2. `--category-property` (e.g., `--control-bg`)
3. `--global-property` (least specific, e.g., `--primary-bg`)

Example from [Button](src/lib/controls/Button.svelte):

- `--button-bg` falls back to `--control-bg` falls back to `--primary-bg`

### SCSS Mixins

Use the provided mixins from [`$lib/sass/_mixins.scss`](src/lib/sass/_mixins.scss) for consistent styling:

```scss
<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .my-component {
    // Color properties (bg, fg)
    @include color-props(my-component, container);

    // Typography (font-size, font-family, line-height, etc.)
    @include typography-props(my-component, ui);

    // Container-level typography (width, text-align, etc.)
    @include typography-container-props(my-component, container);

    // Box properties (padding, margin, border-radius)
    @include box-props(my-component);

    // Box shadow
    @include box-shadow(my-component, container);
  }
</style>
```

### Variable Fallback Pattern

Variables cascade with smart defaults using the `var-with-fallbacks` mixin:

```scss
.element {
  padding: var-with-fallbacks(--padding, my-component, container, 8px);
  // Tries: --my-component-padding, then --container-padding, then 8px
}
```

## Component Library Patterns

### Component Structure

Standard component file structure:

```svelte
<script lang="ts">
  import { injectVars } from "$lib/util";

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
  }

  // 2. Props destructuring with defaults
  let {
    bg = null,
    fg = null,
    padding = null,
    width = null,
    height = null,
    primary = false,
    disabled = false
  }: Props = $props();

  // 3. Style injection
  let style = injectVars($$props, "component-name", [
    "bg", "fg", "padding", "width", "height"
  ]);

  // 4. Component logic
</script>

<!-- 5. Template -->
<div class="component-name" {style} class:primary class:disabled>
  <slot />
</div>

<!-- 6. Styles -->
<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .component-name {
    @include color-props(component-name, category);
    // ... other styles
  }
</style>
```

### Theming Support

Components should support theming through CSS variable inheritance. See [Themes.svelte](src/routes/Themes.svelte) for examples.

Key theming files:

- [`src/lib/vars/defaults.css`](src/lib/vars/defaults.css) - Base variable definitions
- [`src/lib/vars/themes/`](src/lib/vars/themes/) - Color and typography themes

### Container Queries

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

Example: [FormItem](src/lib/layout/FormItem.svelte) switches from stacked to side-by-side layout based on container width.

### Accessible HTML Elements

Prefer modern HTML elements with built-in accessibility:

- Use `<dialog>` for modals ([Dialog](src/lib/overlays/Dialog.svelte))
- Use `<details>` for accordions ([Accordion](src/lib/layout/Accordion.svelte))
- Use native `<progress>` for accessibility, style with custom wrapper ([Progress](src/lib/misc/Progress.svelte))
- Use `popover` attribute for tooltips ([Tooltip](src/lib/overlays/Tooltip.svelte))

### Component Export Pattern

All public components must be exported from [`src/lib/index.ts`](src/lib/index.ts):

```typescript
import MyComponent from "./components/MyComponent.svelte";
export { MyComponent };
```

## Accessibility (a11y)

### Focus Management

Always use the focus mixins from [`$lib/sass/_affordances.scss`](src/lib/sass/_affordances.scss) for consistent, accessible focus states:

#### @include focusable()

Use on interactive elements to provide visible focus indicators:

```scss
<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  button {
    @include focusable();
    // Automatically adds :focus-visible styles with outline and box-shadow
  }
</style>
```

This mixin applies:

- Custom outline color via `--focus-color`
- Outline offset via `--focus-outline-offset` (default: 2px)
- Focus ring box-shadow via `--focus-ring-box-shadow`

#### @include focus-ring()

For custom focus state styling (used internally by `focusable()`):

```scss
input:focus {
  @include focus-ring();
}
```

#### @include clickable()

For clickable elements, adds cursor, hover, active, and disabled states:

```scss
.interactive-element {
  @include clickable();
  // Adds hover brightness, active state, and disabled cursor
}
```

Provides:

- `cursor: pointer` on hover
- Brightness filter on hover (1.05) and active (0.9)
- Transform effects via CSS variables
- Disabled state with `not-allowed` cursor and grayscale filter

### Visually Hidden Content

Use the `visually-hidden` mixin for screen reader-only content:

```scss
.sr-only {
  @include visually-hidden();
  // Hides visually but remains accessible to screen readers
}
```

Example use case:

```svelte
<button>
  <span class="sr-only">Close dialog</span>
  <span aria-hidden="true">×</span>
</button>
```

### Semantic HTML

Always prefer semantic HTML elements with built-in accessibility:

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

### ARIA Attributes

Add ARIA attributes when semantic HTML isn't sufficient:

```svelte
<button
  aria-label="Close dialog"
  aria-pressed={isActive}
  aria-expanded={isOpen}
>
  Close
</button>

<div role="alert" aria-live="polite">
  {statusMessage}
</div>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```svelte
<script lang="ts">
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAction();
    }
    if (e.key === 'Escape') {
      closeDialog();
    }
  }
</script>

<div
  role="button"
  tabindex="0"
  onkeydown={handleKeydown}
  onclick={handleAction}
>
  Custom Interactive Element
</div>
```

### Focus Trapping

For modals and dialogs, ensure focus is trapped within the element. The native `<dialog>` element handles this automatically:

```svelte
<script lang="ts">
  let dialog: HTMLDialogElement = $state();

  function openDialog() {
    dialog.showModal(); // Automatically traps focus
  }
</script>

<dialog bind:this={dialog}>
  <button onclick={() => dialog.close()}>Close</button>
</dialog>
```

### Color Contrast

CSS variables support theming while maintaining WCAG AA contrast ratios. When creating themes:

```css
/* Ensure sufficient contrast between fg and bg */
--primary-bg: #0066cc;
--primary-fg: #ffffff; /* 4.5:1 minimum for normal text */

--secondary-bg: #f5f5f5;
--secondary-fg: #333333; /* Ensure readability */
```

### Customizable Focus Styles

Components support custom focus styling via CSS variables:

```svelte
<Button
  style="
    --focus-color: blue;
    --focus-outline-offset: 4px;
    --focus-shadow-color: rgba(0, 100, 255, 0.5);
  "
>
  Custom Focus
</Button>
```

## Common Patterns

### Form Components

Form components should integrate with FormItem:

```svelte
<!-- FormItem provides label/input structure -->
<FormItem>
  <span slot="label">Username</span>
  <input type="text" />
</FormItem>
```

### Code Display

Use the [Code component](src/lib/misc/Code.svelte) for syntax highlighting:

```svelte
<Code
  language="html"
  code={`<Button primary>Click me</Button>`}
/>
```

### CSS Variable Demos

Use [CssVariableDemo](src/routes/demos/CssVariableDemo.svelte) for component demos with customizable variables:

```svelte
<CssVariableDemo variables={myComponentVars}>
  <MyComponent>Demo content</MyComponent>
</CssVariableDemo>
```

## File Organization

- `/src/lib/controls/` - Interactive controls (buttons, inputs, checkboxes)
- `/src/lib/layout/` - Layout components (containers, grids, pages)
- `/src/lib/overlays/` - Overlay components (dialogs, tooltips)
- `/src/lib/misc/` - Utility components (code display, progress bars)
- `/src/lib/typography/` - Text layout components
- `/src/lib/vars/` - CSS variable definitions and themes
- `/src/routes/demos/` - Component demonstrations

## TypeScript Patterns

### Type Definitions

Store shared types in component-specific or shared files:

```typescript
// src/routes/demos/types.ts
export type CSSVariable = {
  name: string;
  type: string; // 'color', 'length', 'text', or 'picklist'
  placeholder?: string;
  defaultValue: string;
  unit?: string;
  options?: string[]; // For 'picklist' type
  group?: string;
};
```

### Component Props Interface

Always define a Props interface for type safety:

```svelte
<script lang="ts">
  interface Props {
    required: string;
    optional?: number;
    withDefault?: boolean;
  }

  let {
    required,
    optional,
    withDefault = false
  }: Props = $props();
</script>
```

## Testing & Development

### Development Server

```bash
npm run dev
```

### Building

```bash
npm run build
```

### Package for Distribution

```bash
npm run package
```

## Common Mistakes to Avoid

❌ **DON'T** use old Svelte syntax:

```svelte
export let value;           // Old
on:click={handler}          // Old
$: derived = value * 2;     // Old
```

✅ **DO** use Svelte 5 runes:

```svelte
let { value } = $props();   // New
onclick={handler}           // New
let derived = $derived(value * 2); // New
```

❌ **DON'T** hardcode styles:

```svelte
<button style="background: blue; padding: 8px;">
```

✅ **DO** use CSS variables and mixins:

```svelte
<button {style} class="button">
<style>
  .button {
    @include color-props(button, control);
    @include box-props(button);
  }
</style>
```

❌ **DON'T** ignore container queries:

```scss
@media (min-width: 600px) {
  /* viewport-based */
}
```

✅ **DO** use container queries for responsive components:

```scss
@container (min-width: 600px) {
  /* container-based */
}
```

## Resources

- [Svelte 5 Documentation](https://svelte-5-preview.vercel.app/docs)
- CSS Variables Reference: [css_variables.txt](css_variables.txt)
- Component Demos: [src/routes/demos/](src/routes/demos/)
- Main Documentation: [README.md](README.md)
