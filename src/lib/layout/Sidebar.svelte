<script>
  import { onMount } from "svelte";

  export let right = false;
  export let left = true;
  let expandedHamburger = false;
  let expandedBar = true;
</script>

<aside
  class="sidebar"
  class:right
  class:left
  class:expandedHamburger
  class:expandedBar
>
  <button
    class:expander={!expandedHamburger}
    class:close={expandedHamburger}
    on:click={() => (expandedHamburger = !expandedHamburger)}
  ></button>
  <div class="content">
    <slot />
  </div>
  <label class="edge-bar">
    <button
      on:click={() => (expandedBar = !expandedBar)}
      class="expander"
      class:expander={!expandedBar}
      class:close={expandedBar}
      aria-label="Expand sidebar"
    ></button>
  </label>
</aside>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  aside {
    @include color-props(sidebar, container);
    height: 100%;
    width: calc(var(--sidebar-width) + var(--grab-bar-width));
    box-sizing: border-box;
    overflow: hidden;
  }
  aside .content {
    @include color-props(sidebar, container);
    width: var(--sidebar-width);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .right {
    border-left: var-with-fallbacks(
      --border,
      sidebar,
      var(--border-width) var(--border-style) var(--border-color)
    );
  }
  .left {
    border-right: var-with-fallbacks(
      --border,
      sidebar,
      var(--border-width) var(--border-style) var(--border-color)
    );
  }

  /* Expander doo-dad */

  /* Responsive sidebar... */
  @container (min-width: 513px) {
    /* Aside is a relative container whose width
    will smoothly animate so our parent knows
    how to lay us out */
    aside {
      transition: width var(--sidebar-transition);
      position: relative;
      height: 100%;
      width: var(--grab-bar-width);
    }
    aside.expandedBar {
      width: calc(var(--sidebar-width) + var(--grab-bar-width));
    }
    aside .content {
      transition: transform var(--sidebar-transition);
      transform: translateX(-110%);
    }
    aside.right .content {
      transform: translateX(100%);
    }
    /* Positioning */
    aside.expandedBar .content {
      transform: translateX(0);
      position: absolute;
      top: 0;
      left: 0;
      width: var(--sidebar-width);
    }
    aside.expandedBar.right .content {
      left: auto;
      right: 0;
    }
    .edge-bar {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: var(--grab-bar-width);
      background: var(--body-bg);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .right .edge-bar {
      left: 0;
      right: auto;
    }
    .edge-bar button {
      display: block;
      background: transparent;
      color: var(--body-fg);
      width: var(--grab-bar-width);
      box-sizing: border-box;
      padding: 0;
      border: none;
    }

    /* Affordances */
    .edge-bar:hover {
      filter: var(--grab-bar-hover-filter);
      background: var(--grab-bar-hover-bg);
    }
    aside .content,
    .edge-bar {
      transition:
        filter,
        background var(--transition);
    }
    .edge-bar:contains(:active) {
      filter: var(--grab-bar-active-filter);
      background: var(--grab-bar-active-bg);
    }
    aside:has(.edge-bar:hover) .content {
      filter: var(--greyed-out-filter);
    }

    /* Hide hamburger expander when not in
    hamburger mode */
    button {
      display: none;
    }
  }
  @container (max-width: 512px) {
    .edge-bar {
      display: none;
    }
    .sidebar {
      background: transparent;
    }
    .right,
    .left {
      border-left: none;
      border-right: none;
    }
    aside > .content {
      transform: translateX(-100%);
      opacity: 0;
      background: transparent;
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
    aside.expandedHamburger > .content {
      transform: translateX(0);
      height: 100%;
      opacity: 1;
      pointer-events: all;
      @include color-props(sidebar, container);
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
      left: calc(-1 * var(--pad));

      border-radius: var-with-fallbacks(--radius, mini-button, button, 50%);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: var(--mini-button-border);
      width: var(--icon-size, 32px);
      height: var(--icon-size, 32px);
      @include color-props(mini-button, button, control, secondary);
      @include clickable(mini-button, button, control);
    }
    aside > button.close {
      left: calc(var(--sidebar-width) - var(--icon-size, 32px) + var(--pad));
      border-radius: var-with-fallbacks(--radius, mini-button, button, 50%);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* aside > button:hover {
      background: var(--mini-button-hover-bg);
      color: var(--mini-button-hover-fg);
    } */

    aside {
      width: calc(var(--gap) + var(--icon-size));
      flex: 0 0 auto;
    }
    aside .content {
      position: absolute;
      --top: calc(var(--pad) + var(--icon-size));
      left: var(--pad);
      width: var(--sidebar-width);
      background: var(--sidebar-bg);
      color: var(--sidebar-fg);
      z-index: 2;
    }
  }
  button.expander::after {
    content: var(--sidebar-expand, "»");
  }
  button.close::after {
    content: var(--sidebar-collapse, "«");
  }
  .right button::after {
    display: inline-block;
    transform: var(--mirror-sidebar-icons, scaleX(-1));
  }
</style>
