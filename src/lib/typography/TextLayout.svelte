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
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5),
  :global(h6) {
    font-family: var(--heading-font-family);
  }
  div :global(code) {
    font-family: var(--code-font-family);
    font-size: var(--code-font-size);
    text-wrap: nowrap;
  }
</style>
