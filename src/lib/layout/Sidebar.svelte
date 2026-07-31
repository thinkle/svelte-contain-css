<script lang="ts">
  import { injectVars } from "$lib/util";
  import type { Snippet } from "svelte";
  import type { SidebarStyleProps } from "$lib/types";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    left?: boolean;
    right?: boolean;
    children?: Snippet;
  } & SidebarStyleProps &
    HTMLAttributes<HTMLElement>;

  let { left, right, children, ...restProps }: Props = $props();

  const style = $derived(
    injectVars(restProps, "sidebar", ["bg", "fg", "width"]),
  );

  let expandedHamburger = $state(false);
  let expandedBar = $state(true);
</script>

<aside
  class="sidebar"
  class:right
  class:left
  class:expandedHamburger
  class:expandedBar
  {style}
>
  <button
    class:expander={!expandedHamburger}
    class:close={expandedHamburger}
    aria-label={expandedHamburger ? "Collapse sidebar" : "Expand sidebar"}
    data-audit-action="toggle-sidebar-sheet"
    onclick={() => (expandedHamburger = !expandedHamburger)}
  ></button>
  <div class="content">
    {@render children?.()}
  </div>
  <label class="edge-bar">
    <button
      onclick={() => (expandedBar = !expandedBar)}
      class="expander"
      class:expander={!expandedBar}
      class:close={expandedBar}
      aria-label={expandedBar ? "Collapse sidebar" : "Expand sidebar"}
      data-audit-action="toggle-sidebar-rail"
    ></button>
  </label>
</aside>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  aside {
    @include color-props(sidebar, surface);
    @include typography-props-bare(sidebar, surface);
    height: 100%;
    width: calc(var(--sidebar-width) + var(--grab-bar-width));
    box-sizing: border-box;
    overflow: hidden;
  }
  aside .content {
    @include color-props(sidebar, surface);
    width: var(--sidebar-width);
    height: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    @include custom-scrollbar(sidebar, surface);
  }
  .right {
    border-left: var-with-fallbacks(--border, sidebar, none);
  }
  .left {
    border-right: var-with-fallbacks(--border, sidebar, none);
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
      @include color-props(grab-bar, sidebar, surface);
      background: var(--grab-bar-bg, var(--sidebar-bg, var(--surface-bg)));
      box-shadow: var(--grab-bar-box-shadow, none);
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: var(--grab-bar-width);
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
      color: var(--grab-bar-fg, var(--sidebar-fg, var(--fg, currentColor)));
      width: var(--grab-bar-width);
      box-sizing: border-box;
      padding: 0;
      border: none;
      @include focusable();
    }

    /* Affordances */
    .edge-bar:hover {
      box-shadow: var(--grab-bar-hover-box-shadow, none);
      background: var(--grab-bar-hover-bg);
    }
    aside .content,
    .edge-bar {
      transition:
        background-color var(--transition),
        box-shadow var(--transition);
    }
    .edge-bar:has(button:active) {
      box-shadow: var(--grab-bar-active-box-shadow, none);
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
      padding: var(--padding);
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
      @include color-props(sidebar, surface);
    }

    aside > button {
      --_sidebar-expander-width: max(
        var(--sidebar-icon-width, 0.65rem),
        var(--icon-size, 32px)
      );
      --_sidebar-expander-height: max(
        var(--sidebar-icon-height, 1rem),
        var(--icon-size, 32px)
      );
      transition: left var(--sidebar-transition);
      transform: translateX(0);
      z-index: 3;
      position: absolute;
      opacity: 1;
      pointer-events: all;
      display: block;
      position: absolute;
      top: var(--padding);
      left: 0;

      border-radius: var-with-fallbacks(--radius, mini-button, button, 50%);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: var(--mini-button-border);
      width: var(--_sidebar-expander-width);
      height: var(--_sidebar-expander-height);
      @include color-props(mini-button, button, control, secondary);
      @include clickable(mini-button, button, control);
      @include focusable();
    }
    aside > button::after {
      color: var(--mini-button-fg, currentColor);
      filter: var(--sidebar-mobile-icon-filter, none);
    }
    aside > button.close {
      left: calc(
        var(--sidebar-width) - var(--_sidebar-expander-width) + var(--padding)
      );
      border-radius: var-with-fallbacks(--radius, mini-button, button, 50%);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* aside > button:hover {
      background: var(--mini-button-hover-bg);
      color: var(--mini-button-hover-fg);
    } */

    aside {
      width: calc(
        var(--gap) +
          max(var(--sidebar-icon-width, 0.65rem), var(--icon-size, 32px))
      );
      flex: 0 0 auto;
    }
    aside .content {
      position: absolute;
      --top: calc(
        var(--padding) +
          max(var(--sidebar-icon-height, 1rem), var(--icon-size, 32px))
      );
      left: 0;
      width: var(--sidebar-width);
      z-index: 2;
    }
  }
  button::after {
    color: var(--sidebar-icon-fg, var(--fg, currentColor));
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-grid;
    place-content: center;
    width: var(--sidebar-icon-width, 0.65rem);
    height: var(--sidebar-icon-height, 1rem);
    font-size: var(--sidebar-icon-font-size, 1.1rem);
    line-height: 1;
  }
  button.expander::after {
    content: var(--sidebar-expand, "›");
    background-image: var(--sidebar-expand-image, none);
  }
  button.close::after {
    content: var(--sidebar-collapse, "‹");
    background-image: var(--sidebar-collapse-image, none);
  }
  .right button::after {
    display: inline-block;
    transform: var(--mirror-sidebar-icons, scaleX(-1));
  }
</style>
