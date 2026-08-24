# ContainCSS for Svelte — legacy (Svelte 3 & 4)

**A small Svelte component library that gets out of your way.** Every component is
styled through CSS custom properties, sized by container queries, and built on
native HTML elements — so you can theme it from the outside, drop it into any
layout, and keep the accessibility you get for free from `<dialog>` and
`<details>`.

### 📖 [Browse the docs & live demos →](https://thinkle.github.io/svelte-contain-css/)

[![npm](https://img.shields.io/npm/v/contain-css-svelte.svg)](https://www.npmjs.com/package/contain-css-svelte)

---

## ⚠️ You are looking at the legacy branch

> **Starting a new project? You almost certainly want [the `svelte5` branch](https://github.com/thinkle/svelte-contain-css/tree/svelte5) and version `1.x` instead.**

| | Branch | npm version | Svelte | Docs |
| --- | --- | --- | --- | --- |
| **👉 Start here** | [`svelte5`](https://github.com/thinkle/svelte-contain-css/tree/svelte5) | `1.x` | Svelte 5 | [svelte5 docs](https://thinkle.github.io/svelte-contain-css/svelte5/) |
| Legacy *(this branch)* | `main` | `0.0.x` | Svelte 3 & 4 | [legacy docs](https://thinkle.github.io/svelte-contain-css/legacy/) |

`main` exists for projects still on Svelte 3 or 4. It is maintained but frozen
in scope: bug fixes and the occasional backport land here, new feature work
happens on `svelte5`. Despite the branch name, **`main` is not the active
development branch** — `svelte5` is.

## Install

```bash
npm install contain-css-svelte@^0.0.19
```

Plain `npm install contain-css-svelte` gets you `1.x`, which requires Svelte 5.
Pin the `0.0.x` range if you're on Svelte 3 or 4.

Import the default variables once, at the root of your app:

```svelte
<!-- +layout.svelte or App.svelte -->
<script>
  import "contain-css-svelte/vars/defaults.css";
</script>
```

Then use components anywhere:

```svelte
<script>
  import { Container, Button, Card } from "contain-css-svelte";
</script>

<Container>
  <Card>
    <h2>Hello</h2>
    <Button primary>Do the thing</Button>
  </Card>
</Container>
```

## The idea

**1. Style props are CSS variables, not inline styles.**

```svelte
<Button bg="green" fg="white" height="64px">Wow</Button>
<!-- becomes style="--button-bg: green; --button-fg: white; --button-height: 64px" -->
```

Because they're variables rather than hard-coded styles, the cascade still
works — which means you can theme a whole subtree from above:

```svelte
<div style="--primary-bg: darkblue; --primary-fg: white; --border-radius: 0">
  <Button primary>Themed</Button>
  <Button primary>Also themed</Button>
</div>
```

...or in plain CSS, with no build step and no wrapper components:

```css
.my-app {
  --bg: #1a1a1a;
  --fg: #fff;
  --primary-bg: #4a90d9;
  --font-family: "Inter", sans-serif;
}
```

**2. Components respond to their container, not the viewport.** A `Card` in a
narrow sidebar lays itself out like a narrow card, whether or not the window is
wide. No breakpoint bookkeeping.

**3. Native elements underneath.** `Dialog` is a real `<dialog>` and `Accordion`
is `<details>`, so focus trapping, escape-to-close, and screen-reader semantics
come from the platform.

## What's in the box

- **Controls** — `Button`, `ButtonLink`, `MiniButton`, `Input`, `Select`,
  `Option`, `Checkbox`, `RadioButton`, `Toggle`, `Slider`, `TabItem`
- **Layout** — `Container`, `Page`, `Row`, `Column`, `Columns`, `GridLayout`,
  `SplitPane`, `Sidebar`, `Bar`, `TabBar`, `Table`, `Tile`, `DataList`,
  `DataListItem`, `MenuList`, `Hero`, `Accordion`, `ResponsiveText`,
  `Form`, `FormItem`, `FormProvider`, `Fieldset`
- **Overlays** — `Dialog`, `Tooltip`, `DropdownMenu`
- **Misc** — `Card`, `Code`, `Progress`, `Tag`, `TextLayout`

Plus ready-made themes (`light`, `dark`, `material`, `bootstrap`, `retro`,
`purple`, `forest`, `canyon`, and several typography-only themes) under
`contain-css-svelte/themes/`.

Note that the `svelte5` branch has components this one does not (`Stack`,
`Inline`, `RowContainer`, `ColumnContainer`, and others). Everything above is
documented with live demos in the
[legacy docs](https://thinkle.github.io/svelte-contain-css/legacy/).

## Developing this branch

```bash
npm ci
npm run dev        # docs site + live demos
npm run check      # svelte-check
npm run package    # build dist/
```

The docs site lives in `src/routes`; the library itself is `src/lib`. Pushing to
either `main` or `svelte5` rebuilds and republishes both doc versions to GitHub
Pages via the `deploy-docs.yml` workflow on the `svelte5` branch.

Fixes are generally written on `svelte5` first and backported here.

## License

MIT © [Tom Hinkle](https://tomhinkle.net)
