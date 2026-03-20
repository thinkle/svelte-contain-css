<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BarStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    children?: Snippet;
    primary?: boolean;
    secondary?: boolean;
  } & BarStyleProps &
    HTMLAttributes<HTMLElement>;

  const { children, primary, secondary, ...restProps }: Props = $props();

  const cssKeys = [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
    "justify",
    "align",
    "marginBottom",
    "marginTop",
  ];

  const style = $derived(injectVars(restProps, "bar", cssKeys));
  let extraStyle = "";
  if (primary) {
    extraStyle += "--bar-bg: var(--primary-bg); --bar-fg: var(--primary-fg);";
  } else if (secondary) {
    extraStyle +=
      "--bar-bg: var(--secondary-bg); --bar-fg: var(--secondary-fg);";
  }
</script>

<div class="bar" style="{style}{extraStyle}">
  {@render children?.()}
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .bar {
    display: flex;
    align-items: var(--bar-align, center);
    justify-content: var(--bar-justify, space-between);
    padding: var-with-fallbacks(--padding, bar, 8px);
    border-bottom: var(
      --bar-border-bottom,
      var-with-fallbacks(--border-width, bar, 1px)
        var-with-fallbacks(--border-style, bar, 1px)
        var-with-fallbacks(--border-color, bar, 1px)
    );
    border-top: var(
      --bar-border-top,
      var-with-fallbacks(--border-width, bar, 1px)
        var-with-fallbacks(--border-style, bar, 1px)
        var-with-fallbacks(--border-color, bar, 1px)
    );
    margin-bottom: var(--bar-margin-bottom, 1em);
    min-height: var(--bar-min-height);
    height: var(--bar-height, 3em);
    max-height: var(--bar-max-height);
    @include color-props(bar, container);
    gap: var-with-fallbacks(--gap, bar, 8px);
    overflow: var(--bar-overflow, visible);

    /* Reset form label width in horizontal context */
    --form-label-width: auto;
  }

  .bar :global(h1),
  .bar :global(h2),
  .bar :global(h3),
  .bar :global(h4),
  .bar :global(h5),
  .bar :global(h6) {
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
    @include color-props(bar, container);
  }
</style>
