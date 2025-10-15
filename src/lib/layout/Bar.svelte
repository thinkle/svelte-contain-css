<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";

  const {
    children,
    ...restProps
  }: { children?: Snippet } & Record<string, unknown> = $props();

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
</script>

<div class="bar" {style} {...restProps}>
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
