<div>
  <slot />
</div>

<style>
  div {
    max-width: var(--line-width);
    line-height: var(--line-height);
    font-family: var(--body-font-family);
    margin: auto;
    font-size: var(--text-size);
  }
  div :global(h1),
  div :global(h2),
  div :global(h3),
  div :global(h4),
  div :global(h5),
  div :global(h6) {
    font-family: var(--heading-font-family);
    margin: var(--heading-margin);
    color: var(--heading-fg);
    background-color: var(--heading-bg);
    padding: var(--heading-pad);
  }
  div :global(h1:first-child),
  div :global(h2:first-child),
  div :global(h3:first-child),
  div :global(h4:first-child),
  div :global(h5:first-child),
  div :global(h6:first-child),
  div :global(p:first-of-type),
  div :global(h1 + p),
  div :global(h2 + p),
  div :global(h3 + p),
  div :global(h4 + p),
  div :global(h5 + p),
  div :global(h6 + p) {
    margin: var(--first-heading-margin);
  }

  div :global(code) {
    font-family: var(--code-font-family);
    font-size: var(--code-font-size);
    text-wrap: nowrap;
  }
</style>
