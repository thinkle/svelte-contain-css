# Visual Review Iteration

Date: 2026-06-09
Branch: `visual-review-iteration`
Baseline commit: `71803aa Add review visual Playwright matrix`

## Scope

This iteration built on the review Playwright matrix and focused on making the mobile captures useful for design review, rather than merely passing as smoke tests.

The visual suite currently covers these scenarios across `light`, `dark`, `bootstrap`, `material`, `retro`, and `canyon-modern-serif-fancy` themes:

- `incredible-app-shell`
- `launch-studio`
- `layout-workbench`
- `table-workbench`
- `visual-system-board`

Each scenario is captured at desktop and mobile viewport sizes. Desktop captures also exercise scenario-specific interaction states such as open menus, dialogs, selected tiles, and bulk actions.

## Scenario Coverage

Current component coverage across the review scenarios:

| Component | App Shell | Launch | Layout | Table | System Board |
| --- | --- | --- | --- | --- | --- |
| Accordion |  | x |  |  |  |
| Bar | x | x | x | x | x |
| Button | x | x | x | x | x |
| ButtonLink |  | x |  |  |  |
| Card |  | x | x |  | x |
| Checkbox | x |  |  | x | x |
| Code |  | x |  |  |  |
| Container |  | x |  |  | x |
| DataList | x |  |  |  | x |
| DataListItem | x |  |  |  | x |
| Dialog |  | x |  |  | x |
| DropdownMenu |  | x |  |  | x |
| Fieldset | x |  |  | x | x |
| Form | x |  |  | x | x |
| FormItem | x |  |  | x | x |
| GridLayout |  | x | x |  | x |
| Hero |  | x |  |  |  |
| Inline | x | x | x |  | x |
| Input | x |  |  | x | x |
| MenuList |  |  | x |  |  |
| MiniButton | x |  | x |  |  |
| Option |  | x |  |  |  |
| Page | x | x | x | x | x |
| Progress |  | x |  |  | x |
| RadioButton |  | x |  |  | x |
| ResponsiveText |  | x |  |  |  |
| Select | x | x |  | x | x |
| Sidebar |  |  | x |  |  |
| Slider | x | x |  |  | x |
| SplitPane |  | x |  |  |  |
| Stack | x | x |  |  | x |
| TabBar |  | x |  |  |  |
| TabItem |  | x |  |  |  |
| Table |  |  |  | x | x |
| Tag |  | x |  |  | x |
| TextLayout | x | x | x | x | x |
| Tile |  |  | x |  |  |
| Toggle |  |  |  |  | x |
| Tooltip |  | x |  |  |  |

Notable gaps or weaker spots:

- Accordion is covered in `LaunchStudio`, including an open accordion state capture.
- Tooltip is covered in `LaunchStudio`, including an open tooltip state capture.
- SplitPane and the lower-level Row/Column/Stack/Inline layout primitives are not strongly represented in the app scenarios.
- Fixed-height bar overflow and action collapse behavior remain architectural follow-up work.

## Component Fixes

`Bar.svelte`

- Makes `Bar` an inline-size container so child controls can respond to the real bar width.
- Allows bars to wrap by default.
- Treats `--bar-height` as an explicit fixed height, while the default bar can grow from a minimum height.
- Avoids a `--bar-compact-*` variable family. The bar owns layout context and flow, but it should not decide which child labels or actions are disposable.

`GridLayout.svelte`

- Changes auto-filled tracks to `minmax(min(100%, var(--grid-layout-item-width)), 1fr)`.
- Prevents fixed item-width tracks from forcing mobile overflow when the container is narrower than the preferred item width.

`Page.svelte` and `Sidebar.svelte`

- Adjust mobile sidebar layout so the sidebar affordance no longer reserves a clipped horizontal rail inside the page content.
- Positions the mobile sidebar as an overlay at small container sizes.
- Removes the default outer padding from `.side-by-side`; sidebar and content regions own their internal padding. The mobile sidebar safe inset uses `max()` so it only expands content padding when the sidebar affordance needs more room than the normal content padding.
- Uses the existing `--sidebar-icon-width` and `--sidebar-icon-height` variables in the mobile expander sizing chain, with `--icon-size` retained as the minimum hit target.
- Keeps the `--sidebar-expand-image` and `--sidebar-collapse-image` SVG path intact. Bootstrap uses `--sidebar-mobile-icon-filter` so its existing grey SVG remains visible on a grey mini-button.
- Keeps this as structural layout behavior instead of introducing new small-container CSS variables.

`Tooltip.svelte`

- Renders inline tooltips with `span` wrappers by default, so Tooltip can be used inside paragraph text without producing invalid `<div>` descendants.
- Adds a `block` mode for rich tooltip snippets that contain block markup.
- Updates existing tooltip examples so inline paragraph usage stays phrasing-only, while block examples opt into `block`.

## State Captures

Desktop state captures now include:

- Launch menu open.
- Tooltip open.
- Accordion item open.
- Launch readiness tab selected.
- Launch dialog open.
- Table bulk actions open.
- Table custom Select menu open.
- Layout tile selected.
- Visual system actions menu open.
- Visual system primary focus state.
- Visual system dialog open.

## Visual Results

The most visible improvements are on mobile:

- `incredible-app-shell`: the header bar no longer clips the app title and controls.
- `layout-workbench`: page content no longer starts partially off-canvas because of the sidebar rail.
- `visual-system-board`: cards and grouped surfaces fit the mobile viewport instead of forcing grid overflow.
- `table-workbench`: the action bar is usable on mobile; the table itself still needs a deliberate wide-data overflow policy.

Generated screenshots from the latest run are in:

```text
/tmp/contain-css-review-visuals
```

## Responsive Bar Direction

The better long-term model is:

- `Bar` establishes the container and flow constraints.
- Child actions decide how to degrade at smaller container widths.
- Explicit heights remain explicit. If a bar is fixed at `30px` high, arbitrary wide content cannot also be guaranteed to fit without a child-level policy such as icon-only actions, grouped overflow, clipping, or scrolling.

That suggests future work in one of these areas:

- Button or ButtonLink responsive label behavior when an icon is present.
- An ActionGroup or toolbar component that can collapse lower-priority actions into a menu.
- A documented overflow policy for fixed-height bars.

## Verification

Focused mobile check:

```bash
REVIEW_VISUAL_THEMES=light REVIEW_VISUAL_SCENARIOS=incredible-app-shell,layout-workbench,table-workbench,visual-system-board npx playwright test tests/review-visual.spec.ts --grep mobile
```

Result: `4 passed`

Full visual matrix:

```bash
npx playwright test tests/review-visual.spec.ts
```

Result: `60 passed`

The previous Tooltip/TextLayout invalid-placement warning is resolved by the inline/default and block/rich Tooltip split.
