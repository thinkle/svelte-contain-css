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
   * One segment of a `GroupedToggle` row -- an independent boolean, not a
   * mutually-exclusive choice. Several segments in the same row can be
   * `checked` at once (that's the whole point: a thing can be filtered *and*
   * grouped by at the same time), so this is built on the same semantics as
   * `Checkbox`, not `RadioButton` -- it renders a real `aria-pressed` toggle
   * button rather than a radio input, since there's no single form value
   * being submitted here, just live UI state (the same reasoning a text
   * editor's Bold/Italic/Underline toggle buttons use). For a mutually-
   * exclusive row with the same look, use `GroupedRadioItem` instead -- the
   * keyboard contract genuinely differs (roving-tabindex arrow-key
   * navigation vs. each segment being its own Tab stop), so it's a separate
   * component rather than a mode flag on this one.
   */
  const GROUPED_TOGGLE_ITEM_VARS = [...COLOR_VARS, ...TYPOGRAPHY_VARS] as const;

  type Props = ContainProps<
    HTMLButtonAttributes,
    {
      /** Two-way bindable, like `Toggle`/`Checkbox` -- unlike `TabItem`'s
       *  `active`, this segment's checked-ness is its own independent fact,
       *  not something computed by comparing against sibling state, so
       *  `bind:checked` is the natural fit rather than a manual
       *  `checked={} onclick={}` pair. A consumer can still pass `onclick`
       *  for a side effect (analytics, closing a menu, ...); it fires after
       *  the internal toggle, same order `bind:checked` + `onchange`
       *  compose on a native input. */
      checked?: boolean;
      disabled?: boolean;
      /** Shown in a tooltip on hover/focus when disabled, instead of the
       *  segment just silently doing nothing -- e.g. "This can't be grouped
       *  by; it has no performance bands." A disabled segment with no reason
       *  given just stays inert, same as a native disabled control. */
      disabledReason?: string;
      children?: Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof GROUPED_TOGGLE_ITEM_VARS> & {
        /** Override just the checked-state fill/text colour, independent of
         *  the unchecked styling above -- this is what lets three instances
         *  in the same row (e.g. Filter / Group / Show) each have their own
         *  checked colour while sharing one unchecked appearance. */
        checkedBg?: string | null;
        checkedFg?: string | null;
      },
    "type"
  >;

  let {
    checked = $bindable(false),
    disabled = false,
    disabledReason = "",
    children,
    class: className,
    onclick,
    ...restProps
  }: Props = $props();

  const el = $derived(
    elementProps(restProps, "grouped-toggle-item", [
      ...GROUPED_TOGGLE_ITEM_VARS,
      "padding",
      "width",
      "height",
      "checkedBg",
      "checkedFg",
    ]),
  );

  const showTooltip = $derived(disabled && disabledReason.length > 0);

  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    checked = !checked;
    onclick?.(event);
  }
</script>

{#snippet toggleButton()}
  <button
    type="button"
    class={["grouped-toggle-item", className]}
    class:checked
    {disabled}
    aria-pressed={checked}
    onclick={handleClick}
    {...el}
  >
    {@render children?.()}
  </button>
{/snippet}

{#if showTooltip}
  <Tooltip tooltipText={disabledReason}>
    {@render toggleButton()}
  </Tooltip>
{:else}
  {@render toggleButton()}
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

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
    @include clickable-affordance-transition(
      grouped-toggle-item,
      clickable,
      control,
      120ms ease
    );
  }

  .grouped-toggle-item:first-child {
    border-inline-start: none;
  }

  .grouped-toggle-item:hover:not(:disabled) {
    @include clickable-hover-affordance(grouped-toggle-item, clickable);
  }

  .grouped-toggle-item:active:not(:disabled) {
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

  .grouped-toggle-item:disabled {
    cursor: not-allowed;
    opacity: var(--grouped-toggle-item-disabled-opacity, 0.5);
  }
</style>
