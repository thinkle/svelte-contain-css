<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    expand?: boolean;
    split?: boolean;
    justify?: string | null;
    align?: string | null;
    gap?: string | null;
    wrap?: string | null;
    children?: Snippet;
  } & BaseStyleProps &
    HTMLAttributes<HTMLDivElement>;

  let {
    expand = false,
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
    injectVars(
      { justify, align, gap, wrap, ...elementProps },
      "inline",
      ["bg", "fg", "padding", "width", "height", "gap", "justify", "align", "wrap"],
    ) + (inlineStyle ?? ""),
  );
</script>

<div class="inline" class:expand class:split {style} {...elementProps}>
  {@render children?.()}
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .inline {
    @include color-props(inline, container);
    @include box-props(inline, container);
    @include typography-container-props(inline, container);
    display: flex;
    flex-direction: row;
    flex-wrap: var(--inline-wrap, wrap);
    gap: var(--inline-gap, var(--gap));
    justify-content: var(--inline-justify, flex-start);
    align-items: var(--inline-align, center);
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }

  .inline.expand {
    width: 100%;
  }

  .inline.split {
    justify-content: var(--inline-split-justify, space-between);
  }
</style>
