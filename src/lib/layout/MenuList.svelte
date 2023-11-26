<ul class="menu">
  <slot />
</ul>

<style>
  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    background: var(--menu-bg);
    color: var(--menu-fg);
  }
  .menu :global(a),
  .menu :global(button),
  .menu :global(.button),
  .menu :global(input[type="submit"]) {
    display: grid;
    width: 100%;
    box-sizing: border-box;
    padding: var(--pad);
    text-decoration: none;
    color: var(--menu-fg);
    background: var(--menu-bg);
    transition: all var(--menu-transition);
  }

  .menu :global(li:nth-child(even) a),
  .menu :global(li:nth-child(even) button),
  .menu :global(li:nth-child(even) .button),
  .menu :global(li:nth-child(even) input[type="submit"]) {
    display: grid;
    width: 100%;
    box-sizing: border-box;
    padding: var(--pad);
    text-decoration: none;
    color: var(--menu-even-fg);
    background: var(--menu-even-bg);
  }

  .menu :global(a:hover),
  .menu :global(button:hover),
  .menu :global(.button:hover),
  .menu :global(input[type="submit"]:hover) {
    filter: var(--menu-hover-filter);
    transform: var(--menu-hover-transform);
  }
  .menu :global(a:active),
  .menu :global(button:active),
  .menu :global(.button:active),
  .menu :global(input[type="submit"]:active) {
    filter: var(--menu-active-filter);
    transform: var(--menu-active-transform);
  }
</style>
