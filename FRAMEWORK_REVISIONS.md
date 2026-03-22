# Framework Revision Notes

## Row / Column / Card Composition

### Problem

`Row` and `Column` do not compose cleanly with `Card` in the way the review scenarios imply.

Current behavior:

- [`Row.svelte`](/Users/thinkle/Projects/contain-css-svelte/src/lib/layout/Row.svelte) sets a parent `height` and `container-type: size`, but it does not size or normalize its children beyond standard flex layout.
- [`Column.svelte`](/Users/thinkle/Projects/contain-css-svelte/src/lib/layout/Column.svelte) sets a wrapper width, but it does not establish a contract that children should fill that width.
- [`Card.svelte`](/Users/thinkle/Projects/contain-css-svelte/src/lib/Card.svelte) sets its own width from `--card-width`, then runs container queries against itself, not the outer layout wrapper.

Result:

- `Row size="small"` mostly behaves like "make the strip short" rather than "render small responsive cards."
- `Column` can constrain the available space, but `Card` is still self-governing enough that the parent width does not drive card behavior reliably.
- The current API suggests a stronger parent-child relationship than the components actually provide.

### Why this matters

This is not just a demo issue. It creates a misleading mental model:

- users reasonably expect a card inside a small `Column` or short `Row` to adapt
- instead, the card mostly follows its own width token system

That makes `Row` and `Column` feel tile-centric or legacy rather than general-purpose app layout primitives.

### Proposed revisions

1. Clarify intent:
   - Either document `Row` / `Column` as legacy tile helpers,
   - or make them first-class pane/layout primitives.

2. Add a parent-aware card mode:
   - Example: `fluid`, `fill`, or `responsiveToParent`
   - Behavior: `width: min(100%, var(--card-width))`
   - This would let a parent wrapper actually constrain the card before card-local container queries run.

3. Revisit card container-query ownership:
   - Today the card queries itself.
   - Consider whether some layouts should let children respond to the parent container instead.

4. Consider a clearer split of responsibilities:
   - `GridLayout` for self-sizing cards/tiles
   - `SplitPane` / `Sidebar` / `Container` for app-shell layout
   - `Row` / `Column` either upgraded or reduced in scope

5. If `Row` remains public, give it stronger child semantics:
   - optional equal-height / equal-width behavior
   - optional child fill behavior
   - explicit guidance on which components are expected to work well inside it

### Immediate recommendation

For review scenarios and app-like examples, prefer:

- `GridLayout` for card collections
- `Columns` + `Column` only when fixed wrapper widths are actually desired
- `Row` sparingly until its contract is clearer

That is why the `launch-studio` readiness state was switched away from `Row size="small"` for cards.
