<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  /**
   * Purely a layout wrapper around one or more `GroupedToggleItem`s (an
   * independent, multi-select boolean each) or `GroupedRadioItem`s
   * (mutually-exclusive, like a compact inline alternative to `TabBar`) --
   * like `TabBar` is to `TabItem`, it carries no selection state of its own.
   * Each item is independently controlled by the consumer (a `checked` prop
   * plus an `onclick` handler), the same pattern `TabItem`/`Checkbox` already
   * use, rather than this component coordinating children through context.
   * That keeps "which of these is on" answerable by reading the consumer's
   * own state, not by reaching into this component.
   *
   * Pass `role="radiogroup"` when wrapping `GroupedRadioItem`s -- the default
   * `role="group"` suits independent toggles (`GroupedToggleItem`), but a
   * mutually-exclusive row needs the ARIA radiogroup role for assistive tech
   * to announce it correctly.
   */
  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    { children?: Snippet },
    BaseStyleProps & StyleProps<typeof GROUPED_TOGGLE_VARS>
  >;

  const GROUPED_TOGGLE_VARS = [
    ...COLOR_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  let { children, class: className, role = "group", ...restProps }: Props =
    $props();

  const el = $derived(
    elementProps(restProps, "grouped-toggle", [
      ...GROUPED_TOGGLE_VARS,
      "padding",
      "width",
      "height",
    ]),
  );
</script>

<div class={["grouped-toggle", className]} {role} {...el}>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .grouped-toggle {
    display: inline-flex;
    align-items: stretch;
    /* A grid or flex parent stretches a block-level item to fill its track
       by default (DemoWithCode's own layout does exactly this) -- `inline-
       flex` alone doesn't protect against that, since being a grid/flex
       *item* is a separate question from this element's own `display`.
       Without this, the row ends up wider than its children, which leaves
       dead space after the last segment and strands the rounded corner out
       past it, with the last segment itself still square. A segmented
       control is sized to its content, like TabBar/a button group, not
       full-bleed by default. */
    width: fit-content;
    border-radius: var-with-fallbacks(
      --border-radius,
      grouped-toggle,
      var(--border-radius, 4px)
    );
    overflow: hidden;
    border: var-with-fallbacks(
      --border,
      grouped-toggle,
      1px solid var(--border-color, rgba(127, 127, 127, 0.4))
    );
  }
</style>
