# Agent Instructions for Using Contain CSS Svelte

This document provides guidance for AI agents helping developers **consume and use** the Contain CSS Svelte component library. For internal development of the library itself, see [AGENTS-INTERNAL.md](AGENTS-INTERNAL.md).

## Overview

Contain CSS is a Svelte 5 component library built on three core principles:

1. **CSS Variables for Everything** - Style any aspect of components through cascading CSS custom properties
2. **Container Queries** - Components respond to their container size, not viewport
3. **Native HTML Elements and Modern APIs** - Uses semantic HTML (`<dialog>`, `<details>`, `popover`) for accessibility, uses simplified modern APIs like color-mix etc.

---

## What a good Contain app looks like

**The ideal Contain project contains almost no custom styling.** You pick the right
component, write plain semantic HTML inside it, and if something doesn't look right
you _change the theme_ rather than patching the markup.

The whole point of the library is that a `<Button>` already knows what a button
looks like in this app. If you find yourself giving every element its own colors,
padding and radius, you have thrown away the design system and reinvented utility
CSS by hand.

```svelte
<!-- ✅ This is the goal: structure + semantics, no styling -->
<Container>
  <TextLayout>
    <h2>Weekly report</h2>
    <p>Attendance improved in three of five sections.</p>
  </TextLayout>
  <Bar>
    <h3>Sections</h3>
    <Button primary>Add section</Button>
  </Bar>
  <Table>...</Table>
</Container>
```

The escalation ladder, in order. Stop at the first rung that works:

1. **Use the right component and plain HTML.** No props at all.
2. **Use a semantic prop** — `primary`, `danger`, `success`, `muted`.
3. **Set a CSS variable on the nearest sensible ancestor** — one declaration that
   themes everything beneath it.
4. **Set a variable in your app's theme/CSS file** if the change should be app-wide.
   This is the _preferred_ fix for anything you'd otherwise repeat.
5. **A style prop on one component** — genuinely one-off adjustments only.

If you reach step 5 more than occasionally, the theme is wrong. Fix the theme.

### Anti-patterns

```svelte
<!-- ❌ Utility-CSS-by-hand: every element individually dressed.
     This is what the library exists to prevent. -->
<Container bg="#f5f5f5" fg="#222" padding="2rem" maxWidth="1200px">
  <Card bg="white" padding="1rem" --card-border-radius="8px">
    <h2 style="font-size: 1.25rem; margin-bottom: 0.5rem">Title</h2>
    <Button bg="#0066cc" fg="white" padding="0.5rem 1rem">Save</Button>
  </Card>
</Container>

<!-- ✅ Same UI, themed instead of decorated -->
<Container>
  <Card>
    <h2>Title</h2>
    <Button primary>Save</Button>
  </Card>
</Container>
```

```svelte
<!-- ❌ Repeating the same override on siblings -->
<Button --button-bg="purple" --button-fg="white">One</Button>
<Button --button-bg="purple" --button-fg="white">Two</Button>

<!-- ✅ Declare it once, above -->
<Container --primary-bg="purple" --primary-fg="white">
  <Button primary>One</Button>
  <Button primary>Two</Button>
</Container>
```

Other things to avoid:

- `style="background: …; color: …"` directly on a Contain component. The rendered
  color diverges from the variables used for hover, focus and derived text.
- Reaching for `<Stack>`/`<Inline>` to lay out prose. See
  [Text is HTML's job](#text-is-htmls-job).
- Setting `--bg` and expecting it to win everywhere. See
  [Understand the cascade](#understand-the-cascade-before-overriding-it).

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

- `Button`, `ButtonLink`, `CircleButton` - Buttons and link-styled buttons
- `MiniButton` - Backwards-compatible alias for `CircleButton`
- `Input`, `Select`, `Option` - Form inputs
- `Checkbox`, `RadioButton`, `Toggle` - Selection controls
- `Slider` - Range input
- `TabItem` - Tab navigation items

**Layout — structural surfaces (see [Choosing a layout component](#choosing-a-layout-component)):**

- `Page` - Full-viewport app shell with header/sidebar/footer regions
- `Container` - Centered, max-width content region (a "section" of a page)
- `Card` - A notecard: a small, deliberately width-capped surface
- `Bar` - Full-width horizontal bar for a section's title/actions
- `Sidebar`, `SplitPane` - App-shell furniture
- `Hero` - Hero section with animations

**Layout — generic flex helpers:**

- `Inline`, `Stack` - The default choice for generic horizontal/vertical grouping
- `Row`, `Column`, `Columns` - Older flexbox helpers
- `GridLayout` - CSS Grid wrapper
- `RowContainer`, `ColumnContainer` - Specialized sized lanes/rails for predictable tile regions

**Layout — content structures:**

- `TextLayout` - Typography container for prose; **caps width at a reading measure**
- `Form`, `FormItem`, `FormProvider`, `Fieldset` - Form layout
- `Table` - Styled tables
- `DataList`, `DataListItem` - Rich feed/list rows with start/content/end regions
- `Tile` - Card-like tiles
- `MenuList` - Vertical menu list
- `TabBar` - Tab strip
- `Accordion` - Collapsible sections (uses `<details>`)
- `ResponsiveText` - Container-query responsive text sizing

**Overlays:**

- `Dialog` - Modal/non-modal dialog (uses `<dialog>`)
- `Tooltip` - Tooltips (uses `popover`)
- `DropdownMenu` - Dropdown menus

**Misc:**

- `Code` - Syntax-highlighted code blocks
- `Progress` - Progress bar
- `Tag` - Label/tag pills
- `Text` - Inline text tones on the current surface (see [Coloring text](#coloring-text-with-text))

---

## Choosing a layout component

Most confusion with Contain is picking the wrong box. These components are not
interchangeable: each has an opinion about width, borders and spacing.

| Component          | What it is                                                    | Use it for                                        |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------- |
| `Page`             | Full-viewport app shell (100vh, own scrolling content region) | The outermost frame, once per route               |
| `Container`        | Centered content region, max-width ~900px, its own surface    | A section of a page                               |
| `Card`             | A notecard — **width-capped at ~420px by default**            | One discrete item: a record, a summary, a note    |
| `Bar`              | Full-width bar, border above/below, `space-between`           | A section header with a title and actions         |
| `Inline` / `Stack` | Bare flex row / column with a gap. No surface, no border.     | Everything else                                   |
| `TextLayout`       | Prose container capped at a reading measure                   | Article-length prose (other surfaces typeset too) |

### Page

`Page` is the app shell. It is `100vh`, establishes a size container, and gives you
`header`, `sidebar` and `footer` snippet regions around a scrolling content area.
Use one per route — don't nest Pages, and don't reach for it as a generic wrapper.

```svelte
<Page>
  {#snippet header()}
    <Bar><h1>Attendance</h1></Bar>
  {/snippet}
  {#snippet sidebar()}
    <Sidebar>...</Sidebar>
  {/snippet}

  <Container>...</Container>
</Page>
```

### Container

`Container` is the workhorse section wrapper: full width of its parent, capped at
`--container-max-width` (900px default), centered, with its own surface colors and
padding. Nest freely; use several down a page to separate sections.

**Size a Container with `maxWidth`, not a width.** `maxWidth` is the prop, and it's
almost always the one you want:

```svelte
<Container maxWidth="40rem">Centered, capped at 40rem, still fluid below that</Container>
```

A max-width lets the Container shrink to fit a phone, a sidebar, or a SplitPane
panel; a fixed width does not, and will push horizontal scrolling onto any viewport
narrower than the number you picked. Reach for `--container-width` only when you
genuinely need a fixed-size region and you've thought about the narrow case:

```svelte
<!-- ⚠️ overflows any viewport under 24rem -->
<Container --container-width="24rem" maxWidth="100%">Explicit width</Container>
```

Other sizing details:

- It fills available width with `width: var(--container-width, 100%)`, then caps it
  with the `maxWidth` prop / `--container-max-width` fallback chain.
- Box-sizing is border-box, so padding is included, and automatic horizontal margins
  center it when capped.
- `margin="0"` controls top/bottom spacing only; horizontal margins remain automatic.
- Keep the 100% width default in column flex contexts such as SplitPane panels.
  Without it, inline-size containment plus automatic side margins can collapse the
  content width to zero. A horizontal flex row with siblings may need an explicit
  sizing choice; additional fixed side margins are outside the width.

### Card — **gotcha: Card is already sized**

`Card` is meant to feel like a notecard. It ships with `--card-width: 420px`
(250px in a narrow parent, 600px in a very wide one) and adapts its own typography
via container queries. **It is not a generic panel and it will not fill its parent.**

If a Card looks mysteriously narrow, that's the design — not a bug to patch with
`width: 100%` on the wrapper.

```svelte
<!-- ✅ A card of a thing -->
<Card>
  {#snippet header()}<h3>Ada Lovelace</h3>{/snippet}
  <p>Grade 9 · Homeroom 12</p>
  {#snippet footer()}<Button>Open</Button>{/snippet}
</Card>

<!-- ✅ Need a full-width panel instead? That's a Container. -->
<Container>...</Container>

<!-- ⚠️ Only if you really want a wide card -->
<Card width="100%">...</Card>
```

### Bar — **gotcha: Bar is not a generic inline container**

`Bar` is a full-width horizontal bar with a border above and below, a minimum height
of ~3em, `justify-content: space-between`, and a bottom margin. It's a piece of page
furniture — a section header, a toolbar, an action strip.

It is **not** the way to put two things next to each other. That's `Inline`.

```svelte
<!-- ✅ A section header bar -->
<Bar>
  <h2>Students</h2>
  <Button primary>Add student</Button>
</Bar>

<!-- ❌ Don't use Bar to group a couple of controls -->
<Bar>
  <Button>Save</Button>
  <Button>Cancel</Button>
</Bar>

<!-- ✅ Use Inline -->
<Inline>
  <Button primary>Save</Button>
  <Button>Cancel</Button>
</Inline>
```

### Inline and Stack — the generic flex helpers

`Inline` (row) and `Stack` (column) are unopinionated: display flex, a gap, no
surface, no border, no margins. When you just need things beside or below each
other, these are the answer.

```svelte
<Stack gap="1rem">
  <Inline split>
    <Tag info>Draft</Tag>
    <Button primary>Publish</Button>
  </Inline>
  <Table>...</Table>
</Stack>
```

- `Inline` supports `wrap`, `split`, `fill`, and `stretch`.
- `Stack` supports `split`, `justify`, `center`, `fill`, and `stretch`.
- `Stack` zeroes the block margins of its direct children — spacing comes from `gap`.
  That's exactly why it's wrong for prose (see below).

### RowContainer and ColumnContainer

Specialized, sized container-query regions for predictable tile lanes/rails. Avoid
using them as generic flex wrappers — reach for them only when you explicitly need
fixed-size tile lanes or rails with predictable slot sizing. Otherwise `Inline` and
`Stack`.

### DataList vs Table

Use `DataList` when each row is a mini-layout with leading content, rich center
content, and trailing actions. Use `Table` for genuinely tabular data.

```svelte
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

---

## Text is HTML's job

**HTML was designed for text. Use it.** Headings are `<h2>`, paragraphs are `<p>`,
lists are `<ul>`. Wrap prose in `TextLayout` and it is typeset for you — measure,
line height, heading rhythm, first-heading margin collapse, link styling.

```svelte
<!-- ✅ Prose is prose -->
<TextLayout>
  <h2>How interventions work</h2>
  <p>Every plan has one or more measurements attached to it.</p>
  <ul>
    <li>Pick a measurement type</li>
    <li>Log data weekly</li>
  </ul>
</TextLayout>
```

```svelte
<!-- ❌ Don't rebuild typography out of flexbox -->
<Stack gap="0.5rem">
  <h2>How interventions work</h2>
  <p>Every plan has one or more measurements attached to it.</p>
</Stack>
```

`Stack` is a flex column: it strips the block margins off its children and replaces
them with a single uniform gap. That destroys the vertical rhythm — the space before
an `<h2>` should not equal the space between two `<p>`s. `Stack` is for **UI
elements**; `TextLayout` is for **text**.

### The TextLayout gotcha: it caps your width

`TextLayout` constrains its content to a comfortable reading measure
(`--line-width`, 42rem by default). That's the feature — and the trap.

**Anything wide must live outside the TextLayout.** Close it, emit the wide element,
and open a new one:

```svelte
<!-- ✅ Prose, then a full-width table, then more prose -->
<Container>
  <TextLayout>
    <h2>Term results</h2>
    <p>Scores are aggregated across all sections.</p>
  </TextLayout>

  <Table>
    <!-- full width of the Container, not squeezed to 42rem -->
  </Table>

  <TextLayout>
    <p>Students below the threshold are flagged for follow-up.</p>
  </TextLayout>
</Container>
```

```svelte
<!-- ❌ The table, bar and grid are now 42rem wide and you'll wonder why -->
<TextLayout>
  <h2>Term results</h2>
  <p>Scores are aggregated across all sections.</p>
  <Table>...</Table>
  <Bar>...</Bar>
</TextLayout>
```

Rule of thumb: **`TextLayout` wraps runs of prose, not whole pages.** If a UI
element (a `Bar`, `Table`, `GridLayout`, `DataList`, a row of cards) is inside a
`TextLayout`, it is almost certainly a mistake.

To deliberately widen or narrow the measure, set `--line-width` (or `--text-width`
for the box itself) rather than restructuring:

```svelte
<TextLayout --line-width="60rem">...</TextLayout>
```

### You often don't need TextLayout at all

`TextLayout` is not the only component that typesets its contents. Many Contain
components already style the HTML you put inside them — headings get their scale
and rhythm, paragraphs and lists get a line height and a capped measure, links get
their treatment:

| Component      | Prose inside it is typeset, capped at                        |
| -------------- | ------------------------------------------------------------ |
| `Container`    | ~900px for the box; `<p>`/`<ul>` still capped at the measure |
| `Card`         | the card's own width, with container-query-scaled type       |
| `Dialog`       | the dialog's width                                           |
| `Tile`         | the tile                                                     |
| `Hero`         | the hero                                                     |
| `Table`        | cell contents                                                |
| `DataListItem` | the row's content region                                     |
| `Form`         | text between fields                                          |
| `Tooltip`      | the tooltip bubble                                           |
| `TextLayout`   | `--line-width` (42rem) — the tightest, prose-first option    |

So this is already fine, with no `TextLayout` in sight:

```svelte
<Card>
  <h3>Ada Lovelace</h3>
  <p>Grade 9 · Homeroom 12</p>
</Card>
```

Reach for `TextLayout` when the content is genuinely **an article** — a long run of
prose that wants a strict reading measure of its own, narrower than whatever
surface it's sitting on. For a paragraph or two inside a `Card`, `Dialog` or
`Container`, just write the HTML.

---

## The "Contain Way" - Styling with CSS Variables

Contain puts styling decisions at the scope where they belong. Choose a component
for structure/behavior, use its supported props for a one-off adjustment, and set
CSS custom properties on a common ancestor for shared styling.

The general philosophy is to define things at as high a level as possible and let them
cascade as they're meant to in CSS, rather than littering elements with inline styling.
As a rule, the goal should be to _lift style up_ as high as possible. You can tweak any
of the components by tweaking the CSS variables that define its layout: if it's an app-wide
tweak, those tweaks go in your base CSS file and will filter down.

If, on the other hand, you have just one _part_ of your App where you want to make changes, you
can do that there, so for example, you could have...

```svelte
<div class="some-custom-panel" style="--button-border-radius: 0">
  <!-- For some legitimate reason, I'd like all buttons to be
       square inside this div: I can declare that once here
       and every Contain <Button> inside will respect it -->
  ...
</div>
```

### Understand the cascade before overriding it

Custom properties inherit down the DOM, but a component decides which names it
reads. Setting `--bg` is a fallback, not a command that overrides every descendant's
more specific surface or semantic color. For example, the current Container reads
`--container-bg` → `--surface-bg` → `--block-bg` → `--bg`; the matching foreground
follows the same prefixes. A danger Button reads `--danger-bg` before `--button-bg`
and `--control-bg`. The exact chain is component/variant-specific: inspect its
props and stylesheet rather than guessing a variable name.

A theme may already define a more specific token, so changing `--bg` alone may
appear ineffective. Set the token the component actually reads:

```svelte
<Container --container-bg="#18212f" --container-fg="#eef2f8">
  Content on an explicitly dark surface
</Container>
```

### Direct Props → CSS Variables

Many components accept style-related props like `bg`, `fg`, `padding`. These become inline **custom-property declarations**, not direct `background` or `padding` declarations. The component's stylesheet reads those variables through its fallback chain:

```svelte
<Button bg="blue" fg="white" padding="1rem 2rem">Styled Button</Button>
<!-- Generates: style="--button-bg: blue; --button-fg: white; --button-padding: 1rem 2rem;" -->
```

This matters because the component's internal styles reference these variables with
fallback chains, maintaining the cascade. It also means these props are a _last
resort_, not a styling API to reach for by default — see
[What a good Contain app looks like](#what-a-good-contain-app-looks-like).

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

Use props for convenience, or explicit `--var` syntax when you need to set variables
that aren't exposed as props.

### Wrapper/Container Theming

Set variables on a parent element to theme all children:

```svelte
<div style="--primary-bg: darkblue; --primary-fg: white; --padding: 1rem;">
  <Button primary>Themed Primary</Button>
  <Button primary>Also Themed</Button>
</div>
```

### CSS Class Theming

Define themes in your stylesheets — **this is where most styling should live**:

```css
.dark-theme {
  --bg: #1a1a1a;
  --fg: #ffffff;
  --primary-bg: #4a90d9;
  --primary-fg: #ffffff;
  --secondary-bg: #2d2d2d;
  --secondary-fg: #ffffff;
  --border-color: #444;
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

## Semantic Variants

For common use cases like actions and status, use the built-in semantic props
rather than colors:

```svelte
<Button primary>Save</Button>
<Button danger>Delete</Button>
<Button success>Confirm</Button>
<Button warning>Caution</Button>
<Button info>Learn More</Button>

<Tag success>Active</Tag>
<Tag danger>Error</Tag>
<CircleButton danger>×</CircleButton>
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

- `Button`, `ButtonLink`, `CircleButton`
- `Tag`
- `Text` (also `muted`; colors text on its surrounding surface)

### Customize Semantic Colors Globally

Override the semantic color variables in your app's CSS:

```css
:root {
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

These surface pairs style filled variants such as `<Button danger>`. Also define
`--primary-color`, `--danger-color`, `--success-color`, `--warning-color`, and
`--info-color` when their Text ingredients should change; they are independent
inputs, not inferred from the bg/fg pairs.

### Component Category Variables

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

Always bind (`bind:checked`, `bind:group`, `bind:value`) rather than wiring
`onchange` handlers and casting events.

**Styling Checkboxes:**

```svelte
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
<Accordion>
  {#snippet summary()}Click to expand{/snippet}
  <p>Expanded content here</p>
</Accordion>
```

### Tooltips

Uses the native `popover` attribute. **The trigger is the child**; the tip text is
the `tooltipText` prop.

```svelte
<Tooltip tooltipText="Save this record">
  <Button>Save</Button>
</Tooltip>
```

Position defaults to bottom/right and auto-flips near a screen edge. Override with
`vertical="top|bottom"` and `horizontal="left|right"`:

```svelte
<Tooltip tooltipText="Careful!" vertical="top" horizontal="left">
  <CircleButton danger>×</CircleButton>
</Tooltip>
```

**Markup inside a tooltip** uses the `tooltip` snippet instead of `tooltipText`.
Add `block` when that markup contains block elements — it switches the wrapper from
a `<span>` to a `<div>` so you aren't nesting `<p>`/`<ul>` inside inline elements:

```svelte
<Tooltip block>
  <Button>Fancy Tooltip Button</Button>
  {#snippet tooltip()}
    <p>This button is <i>extra fancy</i>:</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  {/snippet}
</Tooltip>
```

Tooltips show on hover _and_ on focus, and are escape-dismissable, so keyboard
users get them for free. Tooltip content mounts lazily on first show — a grid of
hundreds of rich tooltips costs nothing until hovered — and an open tooltip keeps
up with its target when the page scrolls.

The child can be anything: an element, bare text (`<Tooltip tooltipText="Raw
score">{student.score}</Tooltip>`), or a component you've passed custom
properties to.

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

## Coloring text with `Text`

Most text needs no component at all — plain HTML inside `TextLayout` or a
`Container` is already styled. Reach for `Text` only when a **run of text needs a
tone** on the surface it already sits on.

### Color roles: surfaces, ingredients, and text

`--danger-fg` means foreground **on --danger-bg**. It does not mean red text.
The theme may choose white-on-red or pink-on-black; neither half alone describes
the intended danger text on an unrelated surface. Choose background/foreground
pairs together whenever establishing a surface. A border or semantic ingredient
is a different role and is not itself a surface pair.

| Intent                             | Use                                                |
| ---------------------------------- | -------------------------------------------------- |
| Filled danger control              | `<Button danger>Delete</Button>`                   |
| Filled status badge                | `<Tag success>Saved</Tag>`                         |
| Danger text on the current surface | `<Text danger>Could not save</Text>`               |
| Quieter supporting text            | `<Text muted>Updated yesterday</Text>`             |
| A custom text tint                 | `<Text color="#c6093b" amount="50%">Accent</Text>` |

Text's background partner is the existing local surface. It renders a span and
adds no background, padding, or new color context. Keep native semantics:
`<td><Text danger>Overdue</Text></td>` and
`<small><Text muted>Optional</Text></small>`. Do not reverse danger-bg/danger-fg
on a cell to get colored text. Keep intentional badges and heatmap surfaces paired.

Themes explicitly choose `--danger-color` as a mixing ingredient independently
of `--danger-bg` / `--danger-fg`. Define all three when changing the danger palette;
changing a surface pair alone does not redefine its text ingredient. This applies
to primary, secondary, info, success, warning and danger. Muted's ingredient is
computed from the local surface background.

Text also supports `bold` and `italic`, independently of its tone:

```svelte
<Text danger bold>Needs attention</Text>
<Text muted italic>Optional note</Text>
```

These are visual styles on a span, not semantic strong/emphasis markup. Use
`<strong>` or `<em>` when that meaning matters. `amount` without a color or tone
has no target and leaves the foreground inherited.

### Text tone properties (all seven slugs)

The slugs are `primary`, `secondary`, `info`, `success`, `warning`, `danger`, and
`muted`. Each follows the same component and shortcut convention:

| Property                  | Role                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| `--slug-color`            | Mixing target; semantic ingredient, or resolved background for muted    |
| `--slug-text-amount`      | Percentage of target mixed into the foreground                          |
| `--slug-text-fg`          | Computed text foreground for this surface, including `--muted-text-fg`  |
| `--slug-text-fg-override` | Explicit result override that can inherit through nested color contexts |
| `--text-amount`           | Default target share when no slug-specific amount exists; fallback 50%  |

Defaults: semantic/custom text uses 50%; `--muted-text-amount` is 20%. At 0% the
foreground is unchanged, at 100% it reaches the target. Muted has its own explicit
default, so set `--muted-text-amount` to change it even if `--text-amount` is set.
`--muted-color` is recalculated at each color surface; use `--muted-color-override`
if a deliberate alternate target must travel across nested surfaces.

```svelte
<Container --danger-color="#c6093b" --danger-text-amount="35%">
  <Text danger>Uses this surface's --danger-text-fg</Text>
  <Text muted>Uses this surface's --muted-text-fg</Text>
  <Text danger amount="25%">Mixes explicitly at 25%</Text>
  <span style="color: var(--info-text-fg)">The plain-CSS equivalent</span>
</Container>
```

Prefer Text in application markup. The plain span shows the public CSS API for
places where a component is unsuitable. With no flag/color Text inherits. An
explicit `color` wins over flags; an explicit color or amount mixes from the
inherited foreground instead of reading the computed shortcut. Use one flag; if
multiple are supplied, priority is danger, warning, success, info, primary,
secondary, muted.

Derived properties resolve where they are declared, before inheritance. Set
ingredients and amounts on or above the surface that computes them. A plain
child's `--danger-text-amount` does not recalculate an already inherited
`--danger-text-fg`; use Text's `amount` prop there. A nested color surface computes
fresh shortcuts. Override `--danger-text-fg` locally for one context, or use
`--danger-text-fg-override` to carry an explicit result through nested contexts.
Avoid defining a derived output in terms of itself (a custom-property cycle).

Color mixing is a useful default, not a contrast guarantee. Check light, dark,
and nested surfaces. Muted reduces contrast intentionally; transparent backgrounds
need care because their token does not describe the composited backdrop.

### Mixing a filled surface

Background/foreground mixing is independent of Text mixing. Use
`--tag-bg-mix-color` / `--tag-bg-mix-amount` to tint Tag backgrounds, and the
corresponding `fg` properties for foregrounds. These follow component/variant
prefixes, with a bare `--bg-mix-amount` affecting every color-props component.
Defaults are 0%. Prefer a narrow prefix; check the resulting pair together.

---

## CSS Variable Reference

### Global Variables

These affect all components unless overridden:

| Variable          | Purpose                             | Default |
| ----------------- | ----------------------------------- | ------- |
| `--bg`            | Background color                    | -       |
| `--fg`            | Foreground/text color               | -       |
| `--primary-bg`    | Primary action background           | -       |
| `--primary-fg`    | Primary action foreground           | -       |
| `--secondary-bg`  | Secondary background                | -       |
| `--padding`       | Default padding                     | -       |
| `--gap`           | Default gap/spacing                 | -       |
| `--border-radius` | Default border radius               | -       |
| `--border-color`  | Default border color                | -       |
| `--border-width`  | Default border width                | `1px`   |
| `--font-family`   | Base font family                    | -       |
| `--font-size`     | Base font size                      | -       |
| `--line-width`    | Reading measure for text containers | `42rem` |

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

- `--container-height`, `--container-max-width` (default: 900px)
- `--container-width`, `--container-padding`, `--container-bg`

**Card:**

- `--card-width` (default: 420px), `--card-width-small` (250px),
  `--card-height` (fixed-height cards only)

**Bar:**

- `--bar-height`, `--bar-min-height` (default: 3em), `--bar-justify`,
  `--bar-align`, `--bar-margin-bottom`, `--bar-border-top`, `--bar-border-bottom`

**TextLayout:**

- `--line-width` (the measure), `--text-width` (the box), `--text-padding`

**Form/FormItem:**

- `--form-label-width` (default: 12em)
- `--form-label-align`, `--form-label-justify`
- `--form-input-width`

See [css_variables.txt](css_variables.txt) for complete list.

---

## Svelte 5 Snippet Syntax

This library uses Svelte 5's snippet syntax for slots:

```svelte
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

<Tooltip block>
  <Button>Hover target</Button>
  {#snippet tooltip()}
    <p>Rich tooltip content</p>
  {/snippet}
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

Writing semantic HTML inside Contain components (real headings, real lists, real
table markup) is the other half of this — see [Text is HTML's job](#text-is-htmls-job).

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

### Decision cheat-sheet

- Whole route → `Page`
- Section of a page → `Container`
- One discrete item, notecard-sized → `Card`
- Section header with actions → `Bar`
- Two things side by side → `Inline`
- Things stacked vertically → `Stack`
- Prose → plain `<h2>` / `<p>` / `<ul>`; `Container`, `Card`, `Dialog` etc. already
  typeset them. Add `TextLayout` only for article-length runs
- Something wide (table, grid, bar) → **outside** any `TextLayout`
- Need a color → a semantic prop, or a variable on an ancestor. Not inline styles.

### Import Everything

```svelte
<script>
  import {
    // Controls
    Button, ButtonLink, CircleButton,
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
    TextLayout, ResponsiveText,

    // Overlays
    Dialog, Tooltip, DropdownMenu,

    // Misc
    Card, Code, Progress, Tag, Text
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
  --secondary-fg: #222222;
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
  --line-width: 42rem;

  /* Borders */
  --border-radius: 4px;
  --border-color: #ddd;
}
```
