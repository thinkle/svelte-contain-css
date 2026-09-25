<script lang="ts">
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import type { Snippet } from "svelte";
  import type { ContainProps, SidebarStyleProps } from "$lib/types";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      left?: boolean;
      right?: boolean;
      children?: Snippet;
      /**
       * Float the panel *over* the page content at every width instead of
       * widening the aside and pushing the content aside. Narrow/compact
       * screens already overlay, so this only changes the wide layout.
       *
       * An overlay sidebar also takes the compact layout's affordance: a
       * button that opens a sheet, starting shut. The grab-bar rail is for a
       * panel that lives in the layout -- floating one over the content and
       * asking someone to grab it is strange, and a panel that starts open on
       * top of the content is worse.
       */
      overlay?: boolean;
      /**
       * Whether the sidebar is showing its panel. Bindable, so a caller can
       * drive the sidebar from a button of their own:
       * `<Sidebar bind:expanded />`.
       *
       * Left `undefined` (the default) the sidebar keeps its per-layout
       * defaults -- the wide rail starts open, the compact sheet starts
       * closed -- and the built-in toggles set it from there. Once it holds a
       * boolean, that boolean wins in both layouts.
       */
      expanded?: boolean | undefined;
      /**
       * Accessible name for the button that opens the sidebar on narrow
       * screens, and for the one that collapses it once open. What the sidebar
       * holds is the useful thing to say -- `expandLabel="Show filters"` beats
       * "Expand sidebar" for anyone who cannot see what it contains.
       */
      expandLabel?: string;
      collapseLabel?: string;
    },
    SidebarStyleProps &
      StyleProps<typeof SIDEBAR_VARS>
  >;

  let {
    left,
    right,
    children,
    overlay = false,
    expanded = $bindable<boolean | undefined>(undefined),
    expandLabel = "Expand sidebar",
    collapseLabel = "Collapse sidebar",
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands sidebar's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const SIDEBAR_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(elementProps(restProps, "sidebar", [
      ...SIDEBAR_VARS,
      "width",
    ]));

  /* One piece of state, two layouts. The wide rail and the compact sheet
     disagree about what "untouched" should look like -- the rail starts open,
     the sheet starts closed -- so `undefined` stands for "this layout's
     default" and each layout resolves it its own way. The moment anything
     (either built-in toggle, or a caller through `bind:expanded`) writes a
     boolean, both layouts read that same boolean, which is what keeps
     programmatic control and the internal toggles in sync. */
  const expandedBar = $derived(expanded ?? true);
  const expandedHamburger = $derived(expanded ?? false);
</script>

<aside
  class={["sidebar", className]}
  class:right
  class:left
  class:overlay
  class:expandedHamburger
  class:expandedBar
  {...el}
>
  <button
    class:expander={!expandedHamburger}
    class:close={expandedHamburger}
    aria-label={expandedHamburger ? collapseLabel : expandLabel}
    aria-expanded={expandedHamburger}
    data-audit-action="toggle-sidebar-sheet"
    onclick={() => (expanded = !expandedHamburger)}
  ></button>
  <div class="content">
    {@render children?.()}
  </div>
  <label class="edge-bar">
    <button
      onclick={() => (expanded = !expandedBar)}
      class="expander"
      class:expander={!expandedBar}
      class:close={expandedBar}
      aria-label={expandedBar ? collapseLabel : expandLabel}
      aria-expanded={expandedBar}
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

  /* The sheet affordance: a floating panel you summon with a button and
     dismiss when you are done with it.

     Used by the compact layout, and by `overlay` at any width. Overlay wants
     this rather than the rail: a panel that starts open on top of the content
     is nonsense, and a grab-bar rail floating over the content is a strange
     thing to ask anyone to grab. A button that opens a sheet is the
     affordance people already know.

     It keys on .expandedHamburger, which resolves `undefined` to false -- so
     a sheet starts shut, where the rail starts open. That falls out of the
     shared `expanded` state for free. */
  @mixin sheet-affordance {
    /* The sheet and its button are absolutely positioned, so the sidebar has
       to be their containing block. Without this they resolve against
       whatever positioned ancestor happens to be up the tree -- inside <Page>
       that is Page's own aside and it looks fine, but drop a Sidebar into a
       Card or a Container and the button escapes to the top-left of the page,
       over unrelated content.

       `overflow` has to be released in the same breath. Every child here is
       out of flow, so the aside computes to zero height -- harmless while it
       was not a containing block, but the moment it becomes one the inherited
       `overflow: hidden` clips the button and the sheet away to nothing.
       Nothing needs clipping here: the shut sheet is hidden by opacity and
       pointer-events, not by the box. */
    position: relative;
    overflow: visible;
    background: transparent;
    width: calc(
      var(--gap) +
        max(var(--sidebar-icon-width, 0.65rem), var(--icon-size, 32px))
    );
    flex: 0 0 auto;

    /* Every child is out of flow, so the aside has no content to hold it
       open and the base `height: 100%` resolves against an auto-height
       parent -- which is to say, nothing. Stretch to the row instead, so the
       aside is as tall as whatever it sits beside, and the open sheet's own
       `height: 100%` has something real to measure against. */
    height: auto;
    align-self: stretch;

    .edge-bar {
      display: none;
    }

    &.right,
    &.left {
      border-left: none;
      border-right: none;
    }

    & > .content {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--sidebar-width);
      z-index: 2;
      transform: translateX(-100%);
      opacity: 0;
      background: transparent;
      pointer-events: none;
      transition:
        transform var(--sidebar-transition) ease-in-out,
        opacity var(--sidebar-transition) ease-in-out;
      padding: var(--padding);
    }
    &.left > .content {
      border-right: var(--border-width) var(--border-style) var(--border-color);
    }
    /* A right-hand sheet slides out of the right edge, not the left. */
    &.right > .content {
      left: auto;
      right: 0;
      transform: translateX(100%);
      border-left: var(--border-width) var(--border-style) var(--border-color);
    }
    &.expandedHamburger > .content {
      transform: translateX(0);
      height: 100%;
      opacity: 1;
      pointer-events: all;
      box-shadow: var-with-fallbacks(
        --overlay-box-shadow,
        sidebar,
        0 0 var(--space, 8px) rgba(127, 127, 127, 0.4)
      );
      @include color-props(sidebar, surface);
    }

    & > button {
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
      top: var(--padding);
      left: 0;

      border-radius: var-with-fallbacks(
        --radius,
        circle-button,
        mini-button,
        button,
        50%
      );
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: var(--circle-button-border, var(--mini-button-border));
      width: var(--_sidebar-expander-width);
      height: var(--_sidebar-expander-height);
      @include color-props(circle-button, mini-button, button, control, secondary);
      @include clickable(circle-button, mini-button, button, control);
      @include focusable();
    }
    & > button::after {
      color: var(--circle-button-fg, var(--mini-button-fg, currentColor));
      filter: var(--sidebar-mobile-icon-filter, none);
    }
    & > button.close {
      left: calc(
        var(--sidebar-width) - var(--_sidebar-expander-width) + var(--padding)
      );
      border-radius: var-with-fallbacks(
        --radius,
        circle-button,
        mini-button,
        button,
        50%
      );
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  /* Responsive sidebar... */
  @container (min-width: 513px) {
    /* The rail layout. Everything here is scoped away from `overlay`, which
       uses the sheet affordance at every width instead. */
    aside:not(.overlay) {
      transition: width var(--sidebar-transition);
      position: relative;
      height: 100%;
      width: var(--grab-bar-width);
    }
    aside:not(.overlay).expandedBar {
      width: calc(var(--sidebar-width) + var(--grab-bar-width));
    }
    aside:not(.overlay) .content {
      transition: transform var(--sidebar-transition);
      transform: translateX(-110%);
    }
    aside:not(.overlay).right .content {
      transform: translateX(100%);
    }
    aside:not(.overlay).expandedBar .content {
      transform: translateX(0);
      position: absolute;
      top: 0;
      left: 0;
      width: var(--sidebar-width);
    }
    aside:not(.overlay).expandedBar.right .content {
      left: auto;
      right: 0;
    }

    aside.overlay {
      @include sheet-affordance;
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

    /* Hide the sheet button in rail mode */
    aside:not(.overlay) > button {
      display: none;
    }
  }
  @container (max-width: 512px) {
    aside {
      @include sheet-affordance;
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
