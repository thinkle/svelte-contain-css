# Svelte 5 Migration TODO

## Tooling & Config

- [x] Update `package.json` dev deps (`svelte`, `@sveltejs/kit`, `svelte-check`, `svelte-preprocess`, `@sveltejs/package`) and the peer dep to the latest 5.x-compatible ranges, then reinstall.
  - Note: Bumped to Svelte 5.40.0, Kit 2.46.5, Vite 5.4.20 with `@sveltejs/vite-plugin-svelte` 4.0.4/inspector 3.0.1 overrides; fresh install completed after pruning legacy deps.
- [x] Refresh generated config after the upgrade (`svelte-kit sync`) and verify `svelte.config.js` still needs the custom `paths.base`/`onwarn` handling.
  - Note: Ran `svelte-kit sync`; retained the existing `paths.base` override and `onwarn` filter after confirming they still apply, captured tsconfig alias warning for follow-up.
- [x] Reconfirm `tsconfig.json` settings against Svelte 5 defaults (module resolution, path aliases, snippet typings) once `.svelte-kit/tsconfig.json` regenerates.
  - Note: Dropped the custom `module`, `moduleResolution`, `baseUrl`, and `paths` overrides in `tsconfig.json` and mirrored the `$lib` alias via `kit.alias`; reran `svelte-kit sync` with a clean bill of health.
- [x] Double-check `vite.config.ts` and build scripts (`build`, `package`, `deploy`) for compatibility with the updated toolchain.
  - Note: Confirmed the Vite config continues to import `sveltekit` correctly and the script targets align with Vite 5; no changes required.

## Core Patterns

- [ ] Replace all `export let` + `$$props`/`$$restProps` usage with `$props()` destructuring and rest prop spreading (e.g. `src/lib/controls/Button.svelte`, `src/lib/layout/Bar.svelte`, `src/lib/dropdowns/DropdownMenu.svelte`).
- [ ] When using injectVars, the norm is that we accept ...restProps and pass them wholesale to injectVars. Note that injectVars already has an array of properties it looks for, so we don't need to do any extra work or filtering -- we just pass in any properties that were not explicitly destructured out of $props() and then pass the array of properties we want converted into css variables and it will do the rest (it basically takes properties like bg, height, fg and turns them into statements like --card-bg, --card-height, etc). This means we generally don't want to destructure any of those unless we have a separate use for them (e.g. in the <Card> component we set fixedHeight to true if a height prop is passed in, so we do destructure height out of $props() there). If we don't need to do anything special with a property, we can just let it be part of ...restProps and let injectVars handle it.
  - Progress: Migrated `src/lib/controls/Input.svelte`, `src/lib/controls/Slider.svelte`, `src/lib/layout/Container.svelte`, `src/lib/controls/Button.svelte`, `src/lib/controls/ButtonLink.svelte`, `src/lib/controls/Checkbox.svelte`, `src/lib/controls/MiniButton.svelte`, `src/lib/controls/RadioButton.svelte`, and `src/lib/controls/TabItem.svelte`, plus layout wrappers `src/lib/layout/Bar.svelte` and `src/lib/layout/FormItem.svelte`, to rune-based `$props` destructuring with rest prop spreading and snippet props.
- [ ] Introduce typed snippet props for every former named slot, importing `Snippet` from `svelte` and removing direct `$$slots` access (`Button`, `TabItem`, `Card`, `FormItem`, `Page`, `Table`, `ResponsiveText`, `Tooltip`, `DropdownMenu`).
- [ ] Make `injectVars` calls reactive by deriving them from the `$props()` proxy and adjust `src/lib/util.ts:3` if needed for the new prop shape.
- [ ] Convert `$:` blocks to `$derived`/`$effect` where appropriate (`src/lib/Card.svelte:19`, `src/lib/misc/Progress.svelte:27`, `src/lib/controls/Checkbox.svelte:28`, `src/lib/controls/RadioButton.svelte:23`, `src/lib/controls/Select.svelte:80`, `src/lib/layout/Table.svelte:11`, `src/lib/layout/Page.svelte:28`).
- [ ] Remove bare event forwarders and rely on rest prop spreading on host elements (`src/lib/controls/Button.svelte:23`, `src/lib/controls/Input.svelte:9`, `src/lib/controls/Checkbox.svelte:48`, `src/lib/controls/MiniButton.svelte:22`, `src/lib/layout/Tile.svelte:11`).
- [ ] Clear all `@migration-task` annotations left by `sv migrate`, completing manual conversions in:
  - `src/lib/controls/Button.svelte`, `ButtonLink.svelte`, `Checkbox.svelte`, `MiniButton.svelte`, `RadioButton.svelte`, `TabItem.svelte`
  - `src/lib/layout/Bar.svelte`, `FormItem.svelte`, `Hero.svelte`, `MenuList.svelte`, `Page.svelte`, `ResponsiveText.svelte`, `Sidebar.svelte`, `SplitPane.svelte`
  - `src/lib/Card.svelte`, `src/lib/misc/Progress.svelte`, `src/lib/overlays/Dialog.svelte`, `src/routes/demos/ProgressDemo.svelte`

## Component Follow-ups

- [ ] Controls: refactor `Button`, `ButtonLink`, `MiniButton`, `Input`, `Checkbox`, `RadioButton`, `Slider`, `Select`, `TabItem` for runes, snippets, and TypeScript typings that work with two-way bindings.
- [ ] Layout: migrate `FormItem.svelte`, `Table.svelte`, `Page.svelte`, `ResponsiveText.svelte`, `SplitPane.svelte`, `Tile.svelte`, `Columns.svelte`, `Column.svelte`, `Row.svelte` to the new prop/snippet APIs while keeping existing DOM behaviours.
- [ ] Overlays & misc: update `DropdownMenu.svelte`, `Dialog.svelte`, `Tooltip.svelte`, `Progress.svelte`, `Card.svelte`, `CodeInner.svelte`/`Code.svelte` to use runes and ensure DOM observers are driven by `$effect`.
- [ ] Shared layout wrappers (`Container.svelte`, `Bar.svelte`, `MenuList.svelte`, `Hero.svelte`, `Sidebar.svelte`, `GridLayout.svelte`) need `$props()` + `$derived` style injection and rest spreading review.
- [ ] Dynamic loader: convert `src/routes/demos/DynamicComponent.svelte` to `$props`/`$state` and keep the async import inside an `$effect`.

## Docs & Demos

- [ ] Replace every `slot="..."` usage in `src/routes/**/*` with `{#snippet ...}` blocks that match the new snippet props (`IntroOverview`, `Themes`, `FormItemDemo`, `CheckboxDemo`, `TableDemo`, `DropdownMenuDemo`, etc.).
- [ ] Update icon/label/tooltip snippets in the demos (`ButtonDemo.svelte`, `TooltipDemo.svelte`, `DropdownMenuDemo.svelte`, `TileDemo.svelte`) to align with the renamed props.
- [ ] Refactor `src/routes/component/[component]/+page.svelte` to read `data` via `$props()` and eliminate `$$props`; ensure downstream components accept snippet props.
- [ ] Refresh `README` content and in-app documentation to illustrate snippet-based usage and `$props` patterns instead of legacy `slot=`/`export let`.
- [ ] Verify `static/` assets or embedded examples don’t assume legacy slot syntax.

## Validation

- [ ] Run `npm run check`, `npm run build`, and `npm run package` after refactors to catch type or bundling regressions; rebuild CSS with `npm run build-css`.
- [ ] Manually exercise interactive pieces (`DropdownMenu`, `Tooltip`, `SplitPane`, `Dialog`) to confirm `$effect` conversions preserve keyboard/mouse behaviour.
- [ ] Inspect generated `.d.ts` output in `dist/` for correct `Snippet` typings and updated prop definitions.
- [ ] Once everything passes, regenerate `dist`/`build` artifacts and confirm the demo app renders correctly under Svelte 5 (`npm run dev`, `npm run preview`).
