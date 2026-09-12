# Backport Tracking

Tracks fixes made on `svelte5` that should be reviewed for backporting to `main` (legacy Svelte 3/4 branch, developed in the `legacy/` worktree).

---

## svelte5 — CircleButton variable rename (2026-09-12)

`CircleButton` was called `MiniButton` until the rename (a circle is not a place
to put text), but its CSS variables kept the `mini-button` prefix — so consumers
still had to name the old component to style the new one.

Its CSS now reads `--circle-button-*` **with `--mini-button-*` behind it** in
every include and every `var()`, and `elementProps` emits the new prefix, so
`<CircleButton bg="…">` writes `--circle-button-bg`.

### Portable to legacy

| Fix | Files | Legacy |
|-----|-------|--------|
| `circle-button` first, `mini-button` as fallback | `src/lib/controls/CircleButton.svelte` | ⬜ todo |
| Same treatment for the buttons that borrow the look | `src/lib/layout/Sidebar.svelte`, `src/lib/overlays/Dialog.svelte` | ⬜ todo |
| `circle-button` added to the prefix list | `src/lib/cssprops.ts` | ⬜ todo |

| Theme tokens renamed to `--circle-button-*` | `src/lib/vars/themes/*.css`, `src/lib/vars/soft-corners.css` | ⬜ todo |

### ⚠️ The one behaviour that changes

`var()` reaches its fallback only when the name is **not defined at all** —
proximity does not enter into it. So a theme defining `--circle-button-bg` at
`:root` beats an app defining `--mini-button-bg` on a wrapper:

| theme sets | app sets | winner |
|---|---|---|
| new name | old name | **theme** ← the break |
| old name | old name | app |
| old name | new name | app |

Every bundled theme now sets the new name, so **an app still on
`--mini-button-*` while loading a theme must rename.** That is the deliberate
cost of having the library's own themes teach the current name rather than the
deprecated one. Pinned by `new-beats-old-at-distance` in
`tests/circle-button-vars.spec.ts` so it stays a decision rather than a
surprise.

### Note for the legacy port

Legacy has no `elementProps`, so only the SCSS half applies there — the prop
prefix is set by `injectVars($$props, …)` instead. The fallback ordering is the
part that matters and it ports directly.

---

## svelte5 — attribute pass-through & style shorthands (2026-09-12)

Branch: `claude/component-attribute-spreading-5e0ybz`
Legacy branch: not started

### Why legacy wants this

The three silent-breakage bugs are **present on `main` too** -- verified by
compiling legacy `Tag.svelte` against Svelte 4.2.20:

| Bug | Legacy behaviour |
|-----|------------------|
| A caller's `class` replaces the component's own | `<Tag class="mine">` renders `class="mine svelte-hash"` -- `.tag` and all its styling gone. Identical to Svelte 5. |
| A caller's `style` clobbers the injected variables | `{style}` sits before `{...$$restProps}`, same as the pre-fix svelte5 code |
| Style props and `--*` leak as invalid attributes | legacy declares no `export let bg`, so `bg` stays in `$$restProps` and renders as `<span bg="red">` |
| Hardcoded `aria-label="Close tag"` | identical, and equally unreachable |
| Close button absolutely positioned with a literal `&nbsp;` | identical |

### Portable to legacy

| Fix | File(s) | Legacy status |
|-----|---------|---------------|
| `styleProps.ts` — mixin-derived shorthand groups | `src/lib/styleProps.ts` | ⬜ todo — pure TS, copies verbatim |
| `elementProps` / `splitProps` | `src/lib/util.ts` | ⬜ todo — plain functions, no runes |
| `class` merged rather than replaced | all components | ⬜ todo — **see the gotcha below** |
| `style` merged with the injected variables | all components | ⬜ todo |
| Style props / `--*` no longer leak as attributes | all components | ⬜ todo |
| Accessible-name props (`closeLabel`, `progressLabel`, `resizerLabel`, `expandLabel`/`collapseLabel`) | Tag, Progress, SplitPane, Sidebar | ⬜ todo |
| Tag close button: flex layout, currentColor scrim, tight focus ring, 24px target | `src/lib/misc/Tag.svelte` | ⬜ todo |
| Both Playwright specs | `tests/attribute-passthrough.spec.ts`, `tests/style-shorthands.spec.ts`, `tests/tag-close-button.spec.ts` | ⬜ todo — assert DOM output, so framework-agnostic |

### ⚠️ The one dangerous difference

`class={["tag", className]}` **does not work in Svelte 4 and fails silently.**
clsx support landed in Svelte 5.16. On 4.2.20 it compiles with no error or
warning and renders:

```
class="tag,mine"
```

— the array gets `toString()`'d. Every one of these must become string
interpolation instead, which is verified to merge correctly:

```svelte
<script>
  let className = "";
  export { className as class };   // `class` is a reserved word
</script>
<span class="tag {className}" {...$$restProps}>
```

### Other legacy differences

- `svelte/elements` exists in v4 with `data-${string}` index signatures, so
  `ContainProps` works. `class` is typed `string`, not `ClassValue` — fine,
  since the richer forms don't work anyway.
- Svelte 4 intercepts `--x` props on components the same way, but wraps in
  `<div style="display: contents">` rather than `<svelte-css-wrapper>`.
- `MARGIN_VARS` does **not** apply: `margin-props` does not exist on legacy.
  Six of the seven groups port; that one waits on the
  `marginBlock`/`marginInline` convention being backported first.

### Do NOT port

- The `Progress` / `FormItem` dead-style-prop fixes. Legacy calls
  `injectVars($$props, ...)` and `$$props` is the full props object, so
  destructuring cannot hide a prop. Those were **Svelte 5 migration
  regressions**, not legacy bugs. Check each individually.

### Possibly closes an existing item

The open `unused export property` row below says the fix "requires changing
`injectVars($$props,...)` to reference each var explicitly" — which is
structurally what the `X_VARS` arrays plus
`elementProps({ bg, fg, ...$$restProps }, ...)` shape does. Untested; verify
rather than assume.

### Sizing

~30 of 42 legacy components need real edits (22 use `injectVars`, 15 spread
`$$restProps`). Estimate 1–1.5 days. Worth splitting: the four
silent-breakage bugs are half a day and carry nearly all the user-visible
value; the shorthand derivation is the rest and is partly blocked anyway.

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
