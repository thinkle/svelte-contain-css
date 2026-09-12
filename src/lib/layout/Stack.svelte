<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    BaseStyleProps,
    ContainProps,
    MarginStyleProps,
  } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    MARGIN_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      fill?: boolean;
      stretch?: boolean;
      split?: boolean;
      center?: boolean;
      justify?: string | null;
      align?: string | null;
      gap?: string | null;
      children?: Snippet;
    },
    BaseStyleProps & MarginStyleProps &
      StyleProps<typeof STACK_VARS>
  >;

  let {
    fill = false,
    stretch = false,
    split = false,
    center = false,
    justify = null,
    align = null,
    gap = null,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  const resolvedAlign = $derived(align ?? (center ? "center" : null));

  /* The shorthands stack's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const STACK_VARS = [
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...MARGIN_VARS,
  ] as const;

  const el = $derived(
    elementProps(
      { justify, align: resolvedAlign, gap, ...restProps },
      "stack",
      [
      ...STACK_VARS,
      "bg",
      "fg",
      "width",
      "height",
      "gap",
      "justify",
      "align",
    ],
    ),
  );
</script>

<div
  class={["stack", className]}
  class:fill
  class:stretch
  class:split
  {...el}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .stack {
    @include box-props(stack);
    @include margin-props(stack);
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, var(--gap));
    justify-content: var(--stack-justify, flex-start);
    align-items: var(--stack-align, stretch);
    box-sizing: border-box;
    min-height: 0;
    min-width: 0;
  }

  .stack > :global(*) {
    /* Spacing done by gap/flex, so we don't
    want margins on direct children */
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
  }

  .stack.fill {
    height: 100%;
  }

  .stack.stretch {
    align-self: stretch;
  }

  .stack.split {
    justify-content: var(--stack-split-justify, space-between);
  }
</style>
