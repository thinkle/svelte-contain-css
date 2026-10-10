<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import Tooltip from "../overlays/Tooltip.svelte";

  /**
   * One segment of a single-select `GroupedToggle` row -- the exclusive-
   * choice sibling of `GroupedToggleItem`. Visually identical (same CSS
   * classes), but a different behavioural contract: exactly one segment in
   * the row is ever checked, and that's the ARIA "radiogroup" pattern, not a
   * row of independent buttons -- which means real roving-tabindex keyboard
   * support (Left/Right moves *and changes* the selection; only the checked
   * segment is a normal Tab stop), not just different styling. That's the
   * reason this is its own component rather than a mode flag on
   * `GroupedToggleItem`: the keyboard contract is genuinely different, and a
   * flag that silently swaps it would be easy to get wrong.
   *
   * Wrap these in `<GroupedToggle role="radiogroup">` -- `GroupedToggle`
   * itself carries no selection logic (same as `TabBar`), so the `role`
   * override is what tells assistive tech this row is exclusive-choice.
   */
  const GROUPED_RADIO_ITEM_VARS = [...COLOR_VARS, ...TYPOGRAPHY_VARS] as const;

  type Props = ContainProps<
    HTMLButtonAttributes,
    {
      /**
       * Two ways to drive this, matching `Checkbox`'s own `group`/`value`
       * pair exactly -- just singular instead of an array, which is the
       * whole difference between a radio and a checkbox:
       *
       * 1. **`bind:group` + `value`** (preferred): every item in the row
       *    binds to the *same* `group` variable; this one computes its own
       *    `checked` as `group === value` and clicking it sets
       *    `group = value` directly. One variable for the whole row, no
       *    manual comparison to write.
       * 2. **Explicit `checked` + `onclick`**: for when the "selected" fact
       *    lives somewhere this component shouldn't own (e.g. it's derived
       *    from a prop one level up). Deliberately NOT `bind:checked` the way
       *    `GroupedToggleItem` is -- a single radio's checked-ness is
       *    relational ("am I the one that matches"), not an independent
       *    fact, so bindable here would let two siblings each think they're
       *    independently true with nothing enforcing exclusivity. Same
       *    reasoning as `TabItem`'s `active`.
       */
      checked?: boolean;
      value?: unknown;
      group?: unknown;
      disabled?: boolean;
      disabledReason?: string;
      children?: Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof GROUPED_RADIO_ITEM_VARS> & {
        checkedBg?: string | null;
        checkedFg?: string | null;
      },
    "type"
  >;

  let {
    checked = false,
    value = undefined,
    group = $bindable<unknown>(undefined),
    disabled = false,
    disabledReason = "",
    children,
    class: className,
    onclick,
    ...restProps
  }: Props = $props();

  const useGroup = $derived(group !== undefined && value !== undefined);
  const isChecked = $derived(useGroup ? group === value : checked);

  /**
   * A disabled segment WITH a reason stays a real, focusable button --
   * `aria-disabled` rather than the native `disabled` attribute, which would
   * remove it from the tab order (and from arrow-key roving below) and make
   * the reason unreachable for anyone who can't hover. See the identical
   * comment on `GroupedToggleItem` for the full reasoning.
   */
  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    if (disabled) return;
    if (useGroup) group = value;
    onclick?.(event);
  }

  const showTooltip = $derived(disabled && disabledReason.length > 0);
  const tooltipId = $props.id();

  const el = $derived(
    elementProps(restProps, "grouped-toggle-item", [
      ...GROUPED_RADIO_ITEM_VARS,
      "padding",
      "width",
      "height",
      "checkedBg",
      "checkedFg",
    ]),
  );

  let ref: HTMLButtonElement | undefined = $state();

  /**
   * Roving tabindex + arrow-key selection, per the WAI-ARIA radiogroup
   * pattern: the group is one Tab stop (only the checked segment has
   * tabindex 0), and arrow keys both move focus *and* pick the new segment --
   * unlike a checkbox row, where arrow keys do nothing special and every
   * segment is its own Tab stop.
   *
   * This walks DOM siblings rather than coordinating through Svelte state:
   * `GroupedToggle` carries no selection state, so there's nothing here to
   * subscribe to -- finding the next `[role="radio"]` sibling and clicking it
   * reuses the exact same `onclick` the consumer already wires for pointer
   * selection, rather than inventing a second code path for keyboard
   * selection.
   */
  function handleKeydown(event: KeyboardEvent) {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;
    if (!ref) return;
    event.preventDefault();

    const group = ref.closest('[role="radiogroup"]');
    if (!group) return;
    const radios = Array.from(
      group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)'),
    );
    const index = radios.indexOf(ref);
    if (index === -1 || radios.length === 0) return;
    const nextIndex = forward
      ? (index + 1) % radios.length
      : (index - 1 + radios.length) % radios.length;
    radios[nextIndex].focus();
    radios[nextIndex].click();
  }
</script>

{#snippet radioButton()}
  <button
    bind:this={ref}
    type="button"
    class={["grouped-toggle-item", className]}
    class:checked={isChecked}
    disabled={disabled && !showTooltip}
    aria-disabled={showTooltip ? "true" : undefined}
    aria-describedby={showTooltip ? tooltipId : undefined}
    role="radio"
    aria-checked={isChecked}
    tabindex={isChecked ? 0 : -1}
    onclick={handleClick}
    onkeydown={handleKeydown}
    {...el}
  >
    {@render children?.()}
  </button>
{/snippet}

{#if showTooltip}
  <Tooltip tooltipText={disabledReason} {tooltipId}>
    {@render radioButton()}
  </Tooltip>
{:else}
  {@render radioButton()}
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  /* Same visual language as GroupedToggleItem -- these sit in the same
     GroupedToggle row and should be indistinguishable by eye; only the
     role/keyboard contract differs. Duplicated rather than shared via a
     common class, matching this library's existing pattern of each
     component owning its own scoped styles (see Checkbox vs Toggle). */
  .grouped-toggle-item {
    @include color-props(grouped-toggle-item, control, secondary);
    @include typography-props-bare(grouped-toggle-item, control);
    @include clickable-cursor(grouped-toggle-item, clickable);
    @include focusable();

    border: none;
    border-inline-start: var-with-fallbacks(
      --divider,
      grouped-toggle,
      grouped-toggle-item,
      1px solid var(--border-color, rgba(127, 127, 127, 0.4))
    );
    margin: 0;
    padding: var-with-fallbacks(--padding, grouped-toggle-item, 0.35em 0.75em);
    min-width: 2em;
    /* `auto` basis, not `0%` -- see GroupedToggleItem's identical rule: only
       shares out extra space once the row is wider than its segments' own
       content, so labels of different lengths keep their natural
       proportions in the ordinary (unstretched) case. */
    flex: 1 1 auto;
    @include clickable-affordance-transition(
      grouped-toggle-item,
      clickable,
      control,
      120ms ease
    );
  }

  /* A disabled segment with a `disabledReason` wraps in <Tooltip>, which
     inserts not one but TWO boxless (display: contents) layers between this
     button and GroupedToggle in the DOM -- `.tooltip-wrapper` and, inside
     it, `.tooltip-target`. See GroupedToggleItem's identical rule for why
     every branch requires `.grouped-toggle` itself as the ancestor whose
     first/last-ness is actually being tested, drilling through both
     wrapper layers, rather than bare `:first-child`/`:last-child` on the
     button -- a wrapped item is always the only child of its own
     tooltip-target, so an unscoped selector would match it regardless of
     its true row position. */
  :global(.grouped-toggle) > .grouped-toggle-item:first-child,
  :global(.grouped-toggle)
    > :global(.tooltip-wrapper):first-child
    > :global(.tooltip-target)
    > .grouped-toggle-item {
    border-inline-start: none;
  }

  /* Rounded on the item itself -- see GroupedToggleItem's identical rule for
     why relying solely on the parent's overflow:hidden clip isn't enough. */
  :global(.grouped-toggle) > .grouped-toggle-item:first-child,
  :global(.grouped-toggle)
    > :global(.tooltip-wrapper):first-child
    > :global(.tooltip-target)
    > .grouped-toggle-item {
    border-start-start-radius: var-with-fallbacks(
      --border-radius,
      grouped-toggle,
      var(--border-radius, 4px)
    );
    border-end-start-radius: var-with-fallbacks(
      --border-radius,
      grouped-toggle,
      var(--border-radius, 4px)
    );
  }

  :global(.grouped-toggle) > .grouped-toggle-item:last-child,
  :global(.grouped-toggle)
    > :global(.tooltip-wrapper):last-child
    > :global(.tooltip-target)
    > .grouped-toggle-item {
    border-start-end-radius: var-with-fallbacks(
      --border-radius,
      grouped-toggle,
      var(--border-radius, 4px)
    );
    border-end-end-radius: var-with-fallbacks(
      --border-radius,
      grouped-toggle,
      var(--border-radius, 4px)
    );
  }

  .grouped-toggle-item:hover:not(:disabled):not([aria-disabled="true"]) {
    @include clickable-hover-affordance(grouped-toggle-item, clickable);
  }

  .grouped-toggle-item:active:not(:disabled):not([aria-disabled="true"]) {
    @include clickable-active-affordance(grouped-toggle-item, clickable);
  }

  .grouped-toggle-item.checked {
    @include color-props(
      grouped-toggle-item-checked,
      toggle-on,
      primary,
      grouped-toggle-item
    );
  }

  .grouped-toggle-item:disabled,
  .grouped-toggle-item[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: var(--grouped-toggle-item-disabled-opacity, 0.5);
  }
</style>
