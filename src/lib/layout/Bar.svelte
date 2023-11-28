<div class="bar">
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  :root {
    --bar-align: center; /* Align items vertically */
    --bar-justify: space-between; /* Distribute items along the line */

    --bar-margin-bottom: var(--gap);
    --bar-height: 3rem;
    --bar-min-height: var(--bar-height);
    --bar-bg: var(--bg, inherit);
    --bar-fg: var(--fg, inherit);
  }

  .bar {
    display: flex;
    align-items: var(--bar-align, center);
    justify-content: var(--bar-justify, space-between);
    padding: var-with-fallbacks(--pad, bar, 8px);
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
    margin-bottom: var(--bar-margin-bottom);
    min-height: var(--bar-min-height);
    height: var(--bar-height);
    max-height: var(--bar-max-height);
    @include color-props(bar, container);
    gap: var-with-fallbacks(--gap, bar, 8px);
    /* Add other styles like background, border, etc., as needed */
  }

  .bar :global(h1),
  .bar :global(h2),
  .bar :global(h3),
  .bar :global(h4),
  .bar :global(h5),
  .bar :global(h6) {
    margin: 0;
  }
</style>
