# Backport Tracking

Tracks fixes made on `svelte5` that should be reviewed for backporting to `main` (legacy Svelte 3/4 branch, developed in the `legacy/` worktree).

---

## svelte5 v1.1.6 — warnings-cleanup (2026-06-23)

Branch: `warnings-cleanup` → merged to `svelte5`
Legacy branch: `legacy-warning-cleanup`

### Portable to legacy

| Fix | File(s) | Legacy status |
|-----|---------|---------------|
| `CSSVariable.defaultValue` made optional | `src/routes/demos/types.ts` | ✅ done |
| `tableWidth` typed explicitly (`number \| null`) | `src/lib/layout/Table.svelte` | ✅ done |
| `optionButtons` typed as `HTMLLIElement[]` | `src/lib/controls/Select.svelte` | ✅ done |
| `Parameter 'e'` given explicit `: Event` type | `src/routes/demos/CheckboxDemo.svelte` | ✅ done |
| `DynamicComponent` typed as `Component \| undefined` | `src/routes/demos/DynamicComponent.svelte` | ✅ done |
| `VariableDemo` modes typed as literal array | `src/routes/demos/VariableDemo.svelte` | ✅ done |
| `cssVariableDefs` accordion vars — missing `type` fields | `src/routes/demos/cssVariableDefs.ts` | ✅ done |
| `Tile` — `vertical-align: top` alignment fix | `src/lib/layout/Tile.svelte` | ✅ done |
| `Dialog` — `onclose?.()` optional chaining | `src/lib/overlays/Dialog.svelte` | n/a (legacy Dialog uses `onClose`, no null type) |
| `colors.css` — double-wrapped CSS var bug | `src/lib/vars/colors.css` | ⬜ verify |

### Svelte 5–specific (not applicable to legacy)

- `$state()` / `$derived` / `$effect` / `$props()` typing fixes
- `bind:this` typed as `HTMLElement | undefined` (Svelte 5 semantics)
- `state_referenced_locally` svelte-ignore comments
- `restProps` replaced with `$derived.by` pattern
- `ResponsiveText` snippet prop rename (Svelte 5 snippet API)

### Legacy-only work (not in svelte5)

| Fix | Status |
|-----|--------|
| Sass deprecation warnings | ✅ done (9c0a1b3) |
| Unused CSS selector warnings | ✅ done (03d51b3) |
| `DropdownMenu` focus, popover attr, event types | ✅ done (fc36981) |
| `Code.svelte` dynamic component type (Svelte 3 compat) | ✅ done (fc36981) |
| `CssVariables.svelte` undefined group index | ✅ done (fc36981) |
| `Select` onMount async + value optional | ✅ done (fc36981) |
| `unused export property` warnings — CSS-var props via `$$props` not seen as "used" by Svelte 3 | ⬜ todo (67 warnings, cosmetic — fix requires changing `injectVars($$props,...)` to reference each var explicitly) |
| `TabDemo` parse cascade (same svelte-check quirk as svelte5) | ⬜ known issue |

---

## How to update this file

When making fixes to `svelte5`, add a row to the next version's table.  
When backporting to `legacy/`, check the box and note the legacy commit if useful.
