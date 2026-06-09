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
- Keeps this as structural layout behavior instead of introducing new small-container CSS variables.

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

Known warning still emitted during the Vite server run:

- `Tooltip.svelte` renders `<div>` descendants under `TextLayout.svelte` paragraph output in at least one path. This is a markup validity issue and should be handled separately from the current layout cleanup.
