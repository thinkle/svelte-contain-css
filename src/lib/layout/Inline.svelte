<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    BaseStyleProps,
    ContainProps,
    MarginStyleProps,
  } from "$lib/types";
  import { elementProps } from "$lib/util";

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
    BaseStyleProps & MarginStyleProps
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

  const el = $derived(
    elementProps({ justify, align, gap, wrap, ...restProps }, "inline", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
      "gap",
      "justify",
      "align",
      "wrap",
      "marginBlock",
      "marginInline",
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
