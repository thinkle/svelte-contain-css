<script>
  export let right = false;
  export let left = true;
  let expanded = false;
</script>

<aside class="sidebar" class:right class:left class:expanded>
  <button
    class:expander={!expanded}
    class:close={expanded}
    on:click={() => (expanded = !expanded)}
  ></button>
  <div class="content">
    <slot />
  </div>
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100%;
    background-color: var(--sidebar-bg);
    color: var(--sidebar-fg);
    width: var(--sidebar-width);
  }

  .right {
    border-left: var(--border-width) var(--border-style) var(--border-color);
  }
  .left {
    border-right: var(--border-width) var(--border-style) var(--border-color);
  }

  /* Responsive sidebar... */
  @container (min-width: 800px) {
    /* Hide expander when not in
    hamburger mode */
    button {
      display: none;
    }
  }
  @container (max-width: 799px) {
    .sidebar {
      background-color: transparent;
    }
    .right,
    .left {
      border-left: none;
      border-right: none;
    }
    aside > .content {
      transform: translateX(-100%);
      opacity: 0;
      background-color: transparent;
      pointer-events: none;
      transition: transform var(--sidebar-transition) ease-in-out;
      padding: var(--pad);
    }
    aside.left > .content {
      border-right: var(--border-width) var(--border-style) var(--border-color);
    }
    aside.right > .content {
      border-left: var(--border-width) var(--border-style) var(--border-color);
    }
    aside.expanded > .content {
      transform: translateX(0);
      height: 100%;
      opacity: 1;
      pointer-events: all;
    }
    aside > button {
      transition: left var(--sidebar-transition);
      transform: translateX(0);
      z-index: 3;
      position: absolute;
      opacity: 1;
      pointer-events: all;
      display: block;
      position: absolute;
      top: var(--pad);
      left: var(--pad);
      background-color: var(--mini-button-bg);
      color: var(--mini-button-fg);
      border-radius: var(--mini-button-radius);
      border: var(--mini-button-border);
      width: var(--icon-size);
      height: var(--icon-size);
    }
    aside > button.close {
      left: calc(var(--sidebar-width) - 2 * var(--pad));
      --mini-button-hover-bg: #3333;
      --mini-button-hover-fg: #222;
    }

    aside > button:hover {
      background-color: var(--mini-button-hover-bg);
      color: var(--mini-button-hover-fg);
    }
    button.expander::after {
      content: "☰";
    }
    button.close::after {
      content: "x";
    }
    aside {
      width: calc(var(--gap) + var(--icon-size));
      flex: 0 0 auto;
    }
    aside .content {
      position: absolute;
      --top: calc(var(--pad) + var(--icon-size));
      left: var(--pad);
      width: var(--sidebar-width);
      background-color: var(--sidebar-bg);
      color: var(--sidebar-fg);
      z-index: 2;
    }
  }
</style>
