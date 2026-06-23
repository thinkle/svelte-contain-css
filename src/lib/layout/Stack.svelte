<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    fill?: boolean;
    stretch?: boolean;
    split?: boolean;
    center?: boolean;
    justify?: string | null;
    align?: string | null;
    gap?: string | null;
    children?: Snippet;
  } & BaseStyleProps &
    HTMLAttributes<HTMLDivElement>;

  let {
    fill = false,
    stretch = false,
    split = false,
    center = false,
    justify = null,
    align = null,
    gap = null,
    children,
    ...restProps
  }: Props = $props();

  const resolvedAlign = $derived(align ?? (center ? "center" : null));

  const inlineStyle = $derived((restProps as { style?: string }).style);
  const elementProps = $derived.by(() => {
    const { style: _, ...rest } = restProps as { style?: string } & Record<string, unknown>;
    return rest;
  });

  const style = $derived(
    injectVars(
      { justify, align: resolvedAlign, gap, ...elementProps },
      "stack",
      ["bg", "fg", "padding", "width", "height", "gap", "justify", "align"],
    ) + (inlineStyle ?? ""),
  );
</script>

<div
  class="stack"
  class:fill
  class:stretch
  class:split
  {style}
  {...elementProps}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .stack {
    @include box-props(stack);
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
