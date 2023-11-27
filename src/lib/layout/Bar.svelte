<div class="bar">
  <slot />
</div>

<style>
  :root {
    --bar-align: center; /* Align items vertically */
    --bar-justify: space-between; /* Distribute items along the line */
    --bar-pad: var(--pad); /* Padding inside the bar */
    --bar-gap: var(--gap);
    --bar-border-bottom: var(--border-width) var(--border-style)
      var(--border-color);
    --bar-border-top: none;
    --bar-margin-bottom: var(--gap);
    --bar-height: 3rem;
    --bar-min-height: var(--bar-height);
    --bar-bg: var(--bg, inherit);
    --bar-fg: var(--fg, inherit);
  }

  .bar {
    display: flex;
    align-items: var(--bar-align);
    justify-content: var(--bar-justify);
    padding: var(--bar-pad);
    border-top: var(--bar-border-top);
    border-bottom: var(--bar-border-bottom);
    margin-bottom: var(--bar-margin-bottom);
    min-height: var(--bar-min-height);
    height: var(--bar-height);
    max-height: var(--bar-max-height);
    background-color: var(--bar-bg);
    color: var(--bar-fg);
    gap: var(--bar-gap);
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
