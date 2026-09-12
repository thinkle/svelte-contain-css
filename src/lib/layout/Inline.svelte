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
      justify?: string | null;
      align?: string | null;
      gap?: string | null;
      wrap?: string | null;
      children?: Snippet;
    },
    BaseStyleProps & MarginStyleProps &
      StyleProps<typeof INLINE_VARS>
  >;

  let {
    fill = false,
    stretch = false,
    split = false,
    justify = null,
    align = null,
    gap = null,
    wrap = null,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands inline's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const INLINE_VARS = [
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...MARGIN_VARS,
  ] as const;

  const el = $derived(
    elementProps({ justify, align, gap, wrap, ...restProps }, "inline", [
      ...INLINE_VARS,
      "bg",
      "fg",
      "width",
      "height",
      "gap",
      "justify",
      "align",
      "wrap",
    ]),
  );
</script>

<div
  class={["inline", className]}
  class:fill
  class:stretch
  class:split
  {...el}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .inline {
    @include box-props(inline);
    @include margin-props(inline);
    display: flex;
    flex-direction: row;
    flex-wrap: var(--inline-wrap, nowrap);
    gap: var(--inline-gap, var(--gap));
    justify-content: var(--inline-justify, flex-start);
    align-items: var(--inline-align, center);
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }

  .inline.fill {
    width: 100%;
  }

  .inline.stretch {
    align-self: stretch;
  }

  .inline.split {
    justify-content: var(--inline-split-justify, space-between);
  }
</style>
