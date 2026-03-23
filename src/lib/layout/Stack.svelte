<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    expand?: boolean;
    justify?: string | null;
    align?: string | null;
    gap?: string | null;
    children?: Snippet;
  } & BaseStyleProps &
    HTMLAttributes<HTMLDivElement>;

  let {
    expand = false,
    justify = null,
    align = null,
    gap = null,
    children,
    ...restProps
  }: Props = $props();

  const { style: inlineStyle, ...elementProps } = restProps as {
    style?: string;
  } & Record<string, unknown>;

  const style = $derived(
    injectVars(
      { justify, align, gap, ...elementProps },
      "stack",
      ["bg", "fg", "padding", "width", "height", "gap", "justify", "align"],
    ) + (inlineStyle ?? ""),
  );
</script>

<div class="stack" class:expand {style} {...elementProps}>
  {@render children?.()}
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .stack {
    @include color-props(stack, container);
    @include box-props(stack, container);
    @include typography-container-props(stack, container);
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, var(--gap));
    justify-content: var(--stack-justify, flex-start);
    align-items: var(--stack-align, stretch);
    box-sizing: border-box;
    min-height: 0;
    min-width: 0;
  }

  .stack.expand {
    height: 100%;
  }
</style>
