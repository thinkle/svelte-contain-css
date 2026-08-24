# ContainCSS for Svelte

**A small Svelte component library that gets out of your way.** Every component is
styled through CSS custom properties, sized by container queries, and built on
native HTML elements — so you can theme it from the outside, drop it into any
layout, and keep the accessibility you get for free from `<dialog>`, `<details>`,
and `popover`.

### 📖 [Browse the docs & live demos →](https://thinkle.github.io/svelte-contain-css/)

[![npm](https://img.shields.io/npm/v/contain-css-svelte.svg)](https://www.npmjs.com/package/contain-css-svelte)

---

## Which version do I want?

| | Branch | npm version | Svelte | Docs |
| --- | --- | --- | --- | --- |
| **👉 Start here** | [`svelte5`](https://github.com/thinkle/svelte-contain-css/tree/svelte5) | `1.x` | Svelte 5 | [svelte5 docs](https://thinkle.github.io/svelte-contain-css/svelte5/) |
| Legacy | [`main`](https://github.com/thinkle/svelte-contain-css/tree/main) | `0.0.x` | Svelte 3 & 4 | [legacy docs](https://thinkle.github.io/svelte-contain-css/legacy/) |

**`svelte5` is the active development branch** and where all new work lands.
`main` is frozen for existing Svelte 4 and earlier projects; it gets fixes
backported when they're worth it, but no new features. If you're starting
something new, use `svelte5` / `1.x`.

## Install

```bash
npm install contain-css-svelte
```

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

**3. Native elements underneath.** `Dialog` is a real `<dialog>`, `Accordion` is
`<details>`, `Tooltip` uses the `popover` API. Focus trapping, escape-to-close,
and screen-reader semantics come from the platform.

## What's in the box

- **Controls** — `Button`, `ButtonLink`, `MiniButton`, `Input`, `Select`,
  `Checkbox`, `RadioButton`, `Toggle`, `Slider`
- **Layout** — `Container`, `Page`, `Row`/`Column`/`Columns`, `Stack`, `Inline`,
  `GridLayout`, `SplitPane`, `Sidebar`, `Bar`, `TabBar`, `Table`, `Tile`,
  `DataList`, `Hero`, `Accordion`, `Form`/`FormItem`/`Fieldset`
- **Overlays** — `Dialog`, `Tooltip`, `DropdownMenu`
- **Misc** — `Card`, `Code`, `Progress`, `Tag`, `TextLayout`, `ResponsiveText`

Plus a set of ready-made themes (`light`, `dark`, `material`, `bootstrap`,
`retro`, `purple`, `forest`, `canyon`, and several typography-only themes) under
`contain-css-svelte/themes/`.

Every component and every CSS variable is documented with a live, editable demo
in [the docs site](https://thinkle.github.io/svelte-contain-css/svelte5/).

## Using this with an AI assistant

[`AGENTS-EXTERNAL.md`](AGENTS-EXTERNAL.md) is a complete reference written for
coding agents — component list, prop-to-variable conventions, and the full CSS
variable table. Point your assistant at it (or drop it in your project) and it
will write idiomatic ContainCSS code.

## Developing the library

```bash
npm install
npm run dev        # docs site + live demos at localhost:5173
npm run check      # svelte-check
npm run test:e2e   # playwright
npm run package    # build dist/
```

The docs site lives in `src/routes`; the library itself is `src/lib`. Pushing to
`svelte5` or `main` rebuilds and publishes both doc versions to GitHub Pages via
[`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml).

See [AGENTS-INTERNAL.md](AGENTS-INTERNAL.md) for library-development conventions
and [BACKPORT.md](BACKPORT.md) for moving fixes to the legacy branch.

## License

MIT © [Tom Hinkle](https://tomhinkle.net)
