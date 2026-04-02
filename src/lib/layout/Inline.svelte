<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    fill?: boolean;
    stretch?: boolean;
    split?: boolean;
    justify?: string | null;
    align?: string | null;
    gap?: string | null;
    wrap?: string | null;
    children?: Snippet;
  } & BaseStyleProps &
    HTMLAttributes<HTMLDivElement>;

  let {
    fill = false,
    stretch = false,
    split = false,
    justify = null,
    align = null,
    gap = null,
    wrap = null,
    children,
    ...restProps
  }: Props = $props();

  const { style: inlineStyle, ...elementProps } = restProps as {
    style?: string;
  } & Record<string, unknown>;

  const style = $derived(
    injectVars({ justify, align, gap, wrap, ...elementProps }, "inline", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
      "gap",
      "justify",
      "align",
      "wrap",
    ]) + (inlineStyle ?? ""),
  );
</script>

<div
  class="inline"
  class:fill
  class:stretch
  class:split
  {style}
  {...elementProps}
>
  {@render children?.()}
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .inline {
    @include box-props(inline);
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
