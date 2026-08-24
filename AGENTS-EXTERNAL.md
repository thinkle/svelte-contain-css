# Agent Instructions for Using Contain CSS Svelte

This document provides guidance for AI agents helping developers **consume and use** the Contain CSS Svelte component library. For internal development of the library itself, see [AGENTS-INTERNAL.md](AGENTS-INTERNAL.md).

## Overview

Contain CSS is a Svelte 5 component library built on three core principles:

1. **CSS Variables for Everything** - Style any aspect of components through cascading CSS custom properties
2. **Container Queries** - Components respond to their container size, not viewport
3. **Native HTML Elements** - Uses semantic HTML (`<dialog>`, `<details>`, `popover`) for accessibility

---

## Installation

```bash
npm install contain-css-svelte
```

### Import CSS Variables (Required)

Add to your app's root layout or entry point:

```svelte
<!-- +layout.svelte or App.svelte -->
<script>
  import "contain-css-svelte/vars/defaults.css";
</script>
```

Or import in your CSS:

```css
@import "contain-css-svelte/vars/defaults.css";
```

---

## Using Components

### Basic Import Pattern

```svelte
<script>
  import { Button, Container, FormItem, Input, Dialog } from "contain-css-svelte";
</script>
```

### Available Components

**Controls:**

- `Button`, `ButtonLink`, `MiniButton` - Buttons and link-styled buttons
- `Input`, `Select`, `Option` - Form inputs
- `Checkbox`, `RadioButton`, `Toggle` - Selection controls
- `Slider` - Range input
- `TabItem` - Tab navigation items

**Layout:**

- `Container` - Centered, max-width container with padding
- `Page` - Full-page layout wrapper
- `Row`, `Column`, `Columns` - Flexbox layout helpers
- `Inline`, `Stack` - Preferred generic flex helpers (horizontal/vertical)
- `GridLayout` - CSS Grid wrapper
- `SplitPane` - Resizable split panels
- `Sidebar` - Collapsible sidebar
- `Bar`, `TabBar` - Horizontal bars for navigation/actions
- `Form`, `FormItem`, `FormProvider`, `Fieldset` - Form layout
- `Accordion` - Collapsible sections (uses `<details>`)
- `Table` - Styled tables
- `Tile` - Card-like tiles
- `DataList`, `DataListItem` - Rich feed/list rows with start/content/end regions
- `Hero` - Hero section with animations
- `MenuList` - Vertical menu list
- `ResponsiveText` - Container-query responsive text
- `RowContainer`, `ColumnContainer` - Specialized sized lanes/rails for predictable tile regions

**Overlays:**

- `Dialog` - Modal/non-modal dialog (uses `<dialog>`)
- `Tooltip` - Tooltips (uses `popover`)
- `DropdownMenu` - Dropdown menus

**Misc:**

- `Card` - Card container
- `Code` - Syntax-highlighted code blocks
- `Progress` - Progress bar
- `Tag` - Label/tag pills
- `TextLayout` - Typography-optimized text container: Note, this is designed for putting readable text in, so it constrains the width to the width of a comfortable paragraph -- don't put e.g. UI Bars inside a text layout unless you want them unusually narrow).

---

## The "Contain Way" - Styling with CSS Variables

### Direct Props → CSS Variables

Many components accept style-related props like `bg`, `fg`, `padding`. These are **not** applied as inline styles—they're converted to CSS custom properties with the component's prefix:

```svelte
<Button bg="blue" fg="white" padding="1rem 2rem">
  Styled Button
</Button>
<!-- Generates: style="--button-bg: blue; --button-fg: white; --button-padding: 1rem 2rem;" -->

<Container maxWidth="1200px" padding="2rem" bg="#f5f5f5">
  Content here
</Container>
<!-- Generates: style="--container-max-width: 1200px; --container-padding: 2rem; --container-bg: #f5f5f5;" -->
```

This matters because the component's internal styles reference these variables with fallback chains, maintaining the cascade.

### Inline CSS Variables

You can also pass CSS variables directly using `--variable-name` syntax. These are passed through as-is:

```svelte
<Button --button-bg="navy" --button-fg="white" --button-padding="1rem">
  Custom Button
</Button>
<!-- Same effect as bg="navy" fg="white" padding="1rem" -->

<Dialog --dialog-min-width="600px" --dialog-underlay-color="rgba(0,0,0,0.5)">
  Dialog content
</Dialog>
```

Both approaches work—use props for convenience, or explicit `--var` syntax when you need to set variables that aren't exposed as props.

### Wrapper/Container Theming

Set variables on a parent element to theme all children:

```svelte
<div style="--primary-bg: darkblue; --primary-fg: white; --padding: 1rem;">
  <Button primary>Themed Primary</Button>
  <Button primary>Also Themed</Button>
</div>
```

### CSS Class Theming

Define themes in your stylesheets:

```css
.dark-theme {
  --bg: #1a1a1a;
  --fg: #ffffff;
  --primary-bg: #4a90d9;
  --primary-fg: #ffffff;
  --secondary-bg: #2d2d2d;
  --border-color: #444;
}

.light-theme {
  --bg: #ffffff;
  --fg: #333333;
  --primary-bg: #0066cc;
  --primary-fg: #ffffff;
  --secondary-bg: #f5f5f5;
  --border-color: #ddd;
}
```

```svelte
<div class="dark-theme">
  <Container>
    <Button primary>Dark Theme Button</Button>
  </Container>
</div>
```

---

## CSS Variable Reference

### Global Variables

These affect all components unless overridden:

| Variable          | Purpose                   | Default |
| ----------------- | ------------------------- | ------- |
| `--bg`            | Background color          | -       |
| `--fg`            | Foreground/text color     | -       |
| `--primary-bg`    | Primary action background | -       |
| `--primary-fg`    | Primary action foreground | -       |
| `--secondary-bg`  | Secondary background      | -       |
| `--padding`       | Default padding           | -       |
| `--gap`           | Default gap/spacing       | -       |
| `--border-radius` | Default border radius     | -       |
| `--border-color`  | Default border color      | -       |
| `--border-width`  | Default border width      | `1px`   |
| `--font-family`   | Base font family          | -       |
| `--font-size`     | Base font size            | -       |

### Component-Specific Variables

Components cascade through category variables. For example, `Button`:

```
--button-bg → --control-bg → --secondary-bg
--button-fg → --control-fg → --fg
--button-padding → --control-padding → --padding
```

**Button:**

- `--button-bg`, `--button-fg`, `--button-padding`
- `--button-width`, `--button-height`
- `--button-hover-filter`, `--button-hover-transform`

**Dialog:**

- `--dialog-min-width`, `--dialog-max-width` (default: 400px, 800px)
- `--dialog-min-height`, `--dialog-max-height` (default: 300px, 800px)
- `--dialog-underlay-color` (backdrop color)
- `--dialog-underlay-filter` (backdrop blur, default: `blur(2px)`)

**Container:**

- `--container-height`, `--container-max-width`
- `--container-padding`, `--container-bg`

**Form/FormItem:**

- `--form-label-width` (default: 12em)
- `--form-label-align`, `--form-label-justify`
- `--form-input-width`

See [css_variables.txt](css_variables.txt) for complete list.

---

## Common Patterns

### Forms with FormItem

FormItem provides responsive label/input layouts:

```svelte
<script>
  import { Form, FormItem, Input, Button } from "contain-css-svelte";
</script>

<Form>
  <FormItem>
    {#snippet label()}Username{/snippet}
    <Input type="text" placeholder="Enter username" />
  </FormItem>

  <FormItem>
    {#snippet label()}Password{/snippet}
    <Input type="password" />
  </FormItem>

  <FormItem>
    {#snippet label()}&nbsp;{/snippet}
    <Button primary>Submit</Button>
  </FormItem>
</Form>
```

Use `FormProvider` to set defaults for all FormItems:

```svelte
<FormProvider layout="above" fullWidth>
  <FormItem>
    {#snippet label()}Stacked Label{/snippet}
    <Input />
  </FormItem>
</FormProvider>
```

If you want `layout="side"` to stay horizontal in a narrow container, disable
the built-in collapse:

```svelte
<FormProvider layout="side" collapseSide={false} --form-label-width="8em">
  <FormItem fullWidth>
    {#snippet label()}Status{/snippet}
    <Input />
  </FormItem>
</FormProvider>
```

### Checkboxes and RadioButtons

**Single Checkbox with `bind:checked`:**

```svelte
<script>
  import { Checkbox } from "contain-css-svelte";

  let agreeToTerms = $state(false);
</script>

<Checkbox bind:checked={agreeToTerms}>
  I agree to the terms and conditions
</Checkbox>
```

**Checkbox Groups with `bind:group`:**

Use `value` and `bind:group` to create a group where multiple items can be selected. The `group` will be an array of selected values:

```svelte
<script>
  import { Checkbox } from "contain-css-svelte";

  let toppings = ['Lettuce', 'Tomato', 'Onion', 'Pickles', 'Cheese'];
  let selectedToppings = $state(['Tomato']); // Pre-select Tomato
</script>

{#each toppings as topping}
  <Checkbox bind:group={selectedToppings} value={topping}>
    {topping}
  </Checkbox>
{/each}

<p>Selected: {selectedToppings.join(', ')}</p>
```

**RadioButton Groups:**

RadioButtons work similarly but only allow one selection. The `group` will be a single value:

```svelte
<script>
  import { RadioButton } from "contain-css-svelte";

  let sizes = ['Small', 'Medium', 'Large'];
  let selectedSize = $state('Medium');
</script>

{#each sizes as size}
  <RadioButton bind:group={selectedSize} value={size}>
    {size}
  </RadioButton>
{/each}

<p>Selected size: {selectedSize}</p>
```

**Styling Checkboxes:**

```svelte
<!-- Custom colors -->
<Checkbox --checkbox-checked-bg="green" bind:checked={val}>
  Custom checked color
</Checkbox>

<!-- Key CSS variables -->
<!-- --checkbox-bg, --checkbox-fg (unchecked state) -->
<!-- --checkbox-checked-bg, --checkbox-checked-fg (checked state) -->
<!-- --checkbox-size (defaults to font-size) -->
```

### Toggle

`Toggle` is checkbox-backed and best for binary on/off settings.

```svelte
<script>
  import { Toggle } from "contain-css-svelte";

  let notifications = $state(true);
  let wifi = $state(false);
</script>

<Toggle bind:checked={notifications}>
  {#snippet onLabel()}Notifications{/snippet}
</Toggle>

<Toggle bind:checked={wifi}>
  {#snippet offLabel()}Off{/snippet}
  {#snippet onLabel()}Wi-Fi{/snippet}
</Toggle>
```

Useful variables: `--toggle-width`, `--toggle-height`, `--toggle-bg`,
`--toggle-on-bg`, `--toggle-thumb-bg`.

### Inline and Stack (Preferred Generic Layout)

Use `Inline` for simple horizontal grouping and `Stack` for simple vertical rhythm.
These are the default choices for generic flex layout.

```svelte
<script>
  import { Inline, Stack, Button, Tag } from "contain-css-svelte";
</script>

<Stack gap="1rem">
  <h3>Release Notes</h3>
  <p>Stack keeps related content in vertical rhythm.</p>
  <Inline>
    <Tag info>Draft</Tag>
    <Button primary>Publish</Button>
  </Inline>
</Stack>
```

- `Inline` supports wrapping, `split`, `fill`, and `stretch`.
- `Stack` supports `split`, `justify`, `fill`, and `stretch`.

### When to Use RowContainer and ColumnContainer

`RowContainer` and `ColumnContainer` are specialized, sized container-query regions
for predictable tile lanes/rails. Avoid using them as generic flex wrappers.

- Prefer `Inline` when you need a normal horizontal row of controls/content.
- Prefer `Stack` when you need a normal vertical grouping.
- Reach for `RowContainer`/`ColumnContainer` when you explicitly need fixed-size
  tile lanes or rails with predictable slot sizing.

### DataList for Rich Row Layouts

Use `DataList` when each row is a mini-layout with leading content, rich center
content, and trailing actions.

```svelte
<script>
  import { DataList, DataListItem, Button } from "contain-css-svelte";
</script>

<DataList iconSize="3rem" maxWidth="800px">
  <DataListItem>
    {#snippet start()}
      <img src="https://loremflickr.com/120/120/cat?lock=1" alt="Cat with yarn" />
    {/snippet}
    <h4>Cats And Yarn</h4>
    <p>Why cats love string toys and safer alternatives for play time.</p>
    {#snippet end()}
      <span>4 min read</span>
      <Button>Read</Button>
    {/snippet}
  </DataListItem>
</DataList>
```

Choose `DataList` over `Table` when rows are content-rich, variable height, or need
chips/actions/media per row.

### Modal Dialogs

```svelte
<script>
  import { Dialog, Button } from "contain-css-svelte";

  let showDialog = $state(false);
</script>

<Button onclick={() => showDialog = true}>Open Dialog</Button>

<Dialog
  open={showDialog}
  modal={true}
  dismissible={true}
  onclose={() => showDialog = false}
>
  <h2>Dialog Title</h2>
  <p>Dialog content goes here.</p>
  <Button onclick={() => showDialog = false}>Close</Button>
</Dialog>
```

### Responsive Layouts with Container Queries

Components respond to their container, not viewport:

```svelte
<Container style="width: 300px;">
  <FormItem>
    {#snippet label()}Stacks on narrow{/snippet}
    <Input />
  </FormItem>
</Container>

<Container style="width: 600px;">
  <FormItem>
    {#snippet label()}Side-by-side on wide{/snippet}
    <Input />
  </FormItem>
</Container>
```

### Accordions

Uses native `<details>` for accessibility:

```svelte
<script>
  import { Accordion } from "contain-css-svelte";
</script>

<Accordion>
  {#snippet summary()}Click to expand{/snippet}
  <p>Expanded content here</p>
</Accordion>
```

### Tooltips

Uses native `popover` attribute:

```svelte
<script>
  import { Tooltip, Button } from "contain-css-svelte";
</script>

<Tooltip>
  {#snippet trigger()}
    <Button>Hover me</Button>
  {/snippet}
  Tooltip content appears here
</Tooltip>
```

### Tab Navigation

```svelte
<script>
  import { TabBar, TabItem } from "contain-css-svelte";

  let activeTab = $state("home");
</script>

<TabBar>
  <TabItem active={activeTab === "home"} onclick={() => activeTab = "home"}>
    Home
  </TabItem>
  <TabItem active={activeTab === "about"} onclick={() => activeTab = "about"}>
    About
  </TabItem>
</TabBar>
```

### Split Panes

```svelte
<script>
  import { SplitPane } from "contain-css-svelte";
</script>

<SplitPane>
  {#snippet left()}
    <p>Left panel content</p>
  {/snippet}
  {#snippet right()}
    <p>Right panel content</p>
  {/snippet}
</SplitPane>
```

---

## Theming Best Practices

### 1. Use Semantic Variant Props

For common use cases like actions and status, use the built-in semantic props:

```svelte
<!-- ✅ Good: Use semantic props -->
<Button primary>Save</Button>
<Button danger>Delete</Button>
<Button success>Confirm</Button>
<Button warning>Caution</Button>
<Button info>Learn More</Button>

<!-- Also works on other components -->
<Tag success>Active</Tag>
<Tag danger>Error</Tag>
<MiniButton danger>×</MiniButton>
```

**Available semantic variants:**

| Prop        | Use Case              | Default Color |
| ----------- | --------------------- | ------------- |
| `primary`   | Main/important action | Blue          |
| `secondary` | Less emphasis         | Gray          |
| `warning`   | Caution needed        | Orange        |
| `danger`    | Destructive action    | Red           |
| `success`   | Positive/confirmation | Green         |
| `info`      | Informational         | Light Blue    |

**Components supporting semantic variants:**

- `Button`, `ButtonLink`, `MiniButton`
- `Tag`

### 2. Use CSS Variable Cascade for Theming

Don't override individual components—set variables at higher levels:

```svelte
<!-- ✅ Good: Theme at container level -->
<Container --primary-bg="purple" --primary-fg="white">
  <Button primary>Purple Button</Button>
  <Button primary>Also Purple</Button>
</Container>

<!-- ❌ Avoid: Repeating on each component -->
<Button --button-bg="purple" --button-fg="white">Purple</Button>
<Button --button-bg="purple" --button-fg="white">Also Purple</Button>
```

### 3. Customize Semantic Colors Globally

Override the semantic color variables in your app's CSS:

```css
:root {
  /* Customize the semantic colors for your brand */
  --primary-bg: #0066cc;
  --primary-fg: #ffffff;

  --danger-bg: #dc3545;
  --danger-fg: #ffffff;

  --success-bg: #28a745;
  --success-fg: #ffffff;

  --warning-bg: #ffc107;
  --warning-fg: #000000;

  --info-bg: #17a2b8;
  --info-fg: #ffffff;
}
```

Now all components using `<Button danger>` will use your custom danger colors.

### 4. Component Category Variables

Target component categories for broader changes:

```css
/* Style all form controls */
:root {
  --control-bg: #f0f0f0;
  --control-fg: #333;
  --control-padding: 0.5rem 1rem;
}
```

---

## Svelte 5 Snippet Syntax

This library uses Svelte 5's snippet syntax for slots:

```svelte
<!-- Named snippets for component slots -->
<FormItem>
  {#snippet label()}
    <strong>Label Text</strong>
  {/snippet}
  <Input />
</FormItem>

<Button>
  Button Text
  {#snippet icon()}
    <span>🔥</span>
  {/snippet}
</Button>

<Tooltip>
  {#snippet trigger()}
    <span>Hover target</span>
  {/snippet}
  Tooltip content
</Tooltip>
```

---

## Accessibility Notes

Contain CSS components are built with accessibility in mind:

- **Dialog** uses native `<dialog>` with automatic focus trapping
- **Accordion** uses native `<details>` with keyboard support
- **Tooltip** uses native `popover` attribute
- **All interactive elements** have proper focus states via `:focus-visible`
- **Form components** maintain proper label associations

---

## Migration from Svelte 4

If upgrading from a Svelte 4 project:

| Svelte 4                 | Svelte 5                                 |
| ------------------------ | ---------------------------------------- |
| `<slot />`               | `{@render children?.()}`                 |
| `<slot name="header" />` | `{@render header?.()}` with snippet prop |
| `on:click={handler}`     | `onclick={handler}`                      |
| `export let prop`        | `let { prop } = $props()`                |

Example transformation:

```svelte
<!-- Svelte 4 -->
<FormItem>
  <span slot="label">Username</span>
  <input type="text" />
</FormItem>

<!-- Svelte 5 -->
<FormItem>
  {#snippet label()}Username{/snippet}
  <input type="text" />
</FormItem>
```

---

## Quick Reference

### Import Everything

```svelte
<script>
  import {
    // Controls
    Button, ButtonLink, MiniButton,
    Input, Select, Option,
    Checkbox, RadioButton, Toggle, Slider,
    TabItem,

    // Layout
    Container, Page, Row, Column, Columns,
    Inline, Stack, RowContainer, ColumnContainer,
    GridLayout, SplitPane, Sidebar,
    Bar, TabBar, MenuList,
    Form, FormItem, FormProvider, Fieldset,
    Accordion, Table, Tile, Hero,
    DataList, DataListItem,
    ResponsiveText,

    // Overlays
    Dialog, Tooltip, DropdownMenu,

    // Misc
    Card, Code, Progress, Tag, TextLayout
  } from "contain-css-svelte";
</script>
```

### Essential CSS Variables

```css
:root {
  /* Base Colors */
  --bg: #ffffff;
  --fg: #333333;

  /* Semantic Colors */
  --primary-bg: #0066cc;
  --primary-fg: #ffffff;
  --secondary-bg: #f5f5f5;
  --secondary-fg: #333333;
  --danger-bg: #dc3545;
  --danger-fg: #ffffff;
  --success-bg: #28a745;
  --success-fg: #ffffff;
  --warning-bg: #ff9800;
  --warning-fg: #ffffff;
  --info-bg: #03a9f4;
  --info-fg: #ffffff;

  /* Spacing */
  --padding: 1rem;
  --gap: 0.5rem;

  /* Typography */
  --font-family: system-ui, sans-serif;
  --font-size: 16px;

  /* Borders */
  --border-radius: 4px;
  --border-color: #ddd;
}
```
