<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import { onDestroy, onMount } from "svelte";
  import { setPageScroller } from "./pageScroller";

  const {
    right = false,
    sticky = false,
    hideSidebar = false,
    hideHeader = false,
    hideFooter = false,
    compactSidebar,
    onStickyChange = () => {},
    header,
    footer,
    sidebar,
    children,
    class: className,
    ...restProps
  }: ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      right?: boolean;
      sticky?: boolean;
      hideSidebar?: boolean;
      hideHeader?: boolean;
      hideFooter?: boolean;
      /**
       * Where the sidebar's menu button goes, and what room is made for it,
       * once the page is narrow enough that the sidebar becomes a sheet:
       *
       * - `"header"` (default when there is a header): the button sits in
       *   the header row and the header's content steps aside for it. The
       *   page content keeps its ordinary, even padding.
       * - `"gutter"` (default without a header): a button-wide strip is
       *   reserved down the sidebar's side of the content.
       * - `"symmetric"`: the same strip on both sides, so the column stays
       *   centred at the cost of width on both.
       * - `"overlap"`: no room is made; the button floats over the top
       *   corner of the content. Fine when that corner is empty.
       *
       * `"header"` with no header showing falls back to `"gutter"`.
       */
      compactSidebar?: "header" | "gutter" | "symmetric" | "overlap";
      onStickyChange?: (stuck: boolean) => void;
      header?: Snippet;
      footer?: Snippet;
      sidebar?: Snippet;
      children?: Snippet;
    },
    {
      bg?: string | null;
      fg?: string | null;
      contentPadding?: string | null;
      width?: string | null;
      height?: string | null;
    } &
      StyleProps<typeof PAGE_VARS>
  > = $props();

  /* The shorthands page's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const PAGE_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "page", [
      ...PAGE_VARS,
      "contentPadding",
      "width",
      "height",
    ]),
  );

  const hasSidebar = $derived(Boolean(sidebar) && !hideSidebar);
  const hasHeader = $derived(Boolean(header) && !hideHeader);
  const hasFooter = $derived(Boolean(footer) && !hideFooter);
  const sheetSpace = $derived(
    compactSidebar === "header" || compactSidebar === undefined
      ? hasHeader
        ? "header"
        : "gutter"
      : compactSidebar,
  );

  // Start "unfrozen" so i.e. scrolling on reload
  // or hash link works properly
  let freeze = $state(false);
  /* Measured so the compact sheet button can be centred in the header row
     (see the compact block in the styles). */
  let headerHeight = $state(0);
  let pageElement: HTMLElement;

  /* Only borrow an unused pseudo-element when a real safe-area strip is
     present. Never replace a consumer's decoration or sticky positioning,
     including on ordinary desktop pages where both insets are zero. */
  function safeAreaDecoration(node: HTMLElement, edge: "start" | "end") {
    let target: HTMLElement | null = null;
    const attribute = `data-contain-page-safe-${edge}`;
    const relativeAttribute = `data-contain-page-safe-${edge}-relative`;
    const clear = () => {
      target?.removeAttribute(attribute);
      target?.removeAttribute(relativeAttribute);
      target = null;
    };
    const update = () => {
      clear();
      const inset = edge === "start" ? "--_page-safe-top" : "--_page-safe-bottom";
      if (!(parseFloat(getComputedStyle(node).getPropertyValue(inset)) > 0)) return;
      let child = edge === "start" ? node.firstElementChild : node.lastElementChild;
      while (child && getComputedStyle(child).display === "contents") {
        child = edge === "start" ? child.firstElementChild : child.lastElementChild;
      }
      if (!(child instanceof HTMLElement)) return;
      const pseudo = edge === "start" ? "::before" : "::after";
      const content = getComputedStyle(child, pseudo).content;
      if (content !== "none" && content !== "normal") return;
      target = child;
      if (getComputedStyle(target).position === "static") {
        target.setAttribute(relativeAttribute, "");
      }
      target.setAttribute(attribute, "");
    };
    const observer = new MutationObserver(update);
    observer.observe(node, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    window.addEventListener("resize", update);
    update();
    return {
      destroy() {
        observer.disconnect();
        window.removeEventListener("resize", update);
        clear();
      },
    };
  }

  function handleScroll() {
    if (sticky) {
      // Set up listener to disable scrolling until we're
      // "stuck" on the top
      // needs to work on SSR, so only reference window if
      // rendered in browser.
      const rect = pageElement.getBoundingClientRect();
      const computedTopStyle =
        getComputedStyle(pageElement).getPropertyValue("top");
      const computedTop = parseFloat(computedTopStyle);
      console.log("rect.top is ", rect.top, " computedTop is ", computedTop);
      const isSticking = rect.top <= computedTop;
      if (isSticking && freeze) {
        console.log("sticky stuck!");
        onStickyChange(true);
      } else if (!isSticking && !freeze) {
        console.log("sticky unstuck!");
        onStickyChange(false);
      }
      freeze = !isSticking;
    }
  }

  onMount(() => {
    if (sticky) {
      if (window.location.hash) {
        let el = document.querySelector(window.location.hash);
        if (el) {
          el?.scrollIntoView();
        }
      }
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (window) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  });

  let contentElement = $state<HTMLElement | null>(null);
  setPageScroller(() => contentElement);
</script>

<section
  class={["page", className]}
  class:freeze
  class:right
  class:sticky
  class:hasHeader
  class:hasSidebar
  class:hasFooter
  class:sheet-header={sheetSpace === "header"}
  class:sheet-gutter={sheetSpace === "gutter"}
  class:sheet-symmetric={sheetSpace === "symmetric"}
  class:sheet-overlap={sheetSpace === "overlap"}
  bind:this={pageElement}
  {...el}
>
  <header bind:clientHeight={headerHeight} use:safeAreaDecoration={"start"}>
    {#if hasHeader}{@render header?.()}{/if}
  </header>
  <div class="side-by-side">
    <div class="aside" style:--_page-header-height="{headerHeight}px">
      {#if hasSidebar}{@render sidebar?.()}{/if}
    </div>
    <div class="content" bind:this={contentElement}>
      {@render children?.()}
    </div>
  </div>
  <footer use:safeAreaDecoration={"end"}>
    {#if hasFooter}{@render footer?.()}{/if}
  </footer>
</section>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  header,
  .content,
  .aside,
  footer {
    /* Absolute positioning is relative to area */
    position: relative;
  }
  header {
    display: none;
  }
  .hasHeader > header {
    display: block;
  }
  footer {
    display: none;
  }
  .hasFooter > footer {
    display: block;
  }
  .aside {
    display: none;
  }
  .hasSidebar > div > .aside {
    display: flex;
  }

  .page {
    /* The frame (gutters, header and footer bands) is the page's own
       background; the content inside it is a surface. Both are families, so
       a theme sets them through --bg and --surface-bg rather than pinning
       --page-bg, which would take everything inside out of its family. */
    @include color-props(page, background);
    @include typography-props-bare(page);
    border: var(--page-border);
    height: var(--page-height, 100vh);
    width: var(--page-width, 100%);
    /* A closed right-hand sidebar sheet waits just past the right edge
       (translateX(100%)), and anything past the right edge widens the
       document: every phone page with a right sidebar scrolled sideways by
       a sheet's width, and a mobile browser zoomed the whole layout out to
       fit it -- a modal opened half off the screen. Left-hand sheets never
       showed it because overflow to the left is not scrollable. `clip`,
       not `hidden`: it creates no scroll container, so nothing sticky
       inside changes what it sticks to, and the vertical axis is left
       alone. */
    overflow-x: clip;
    container-type: size;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }
  /* 100vh on a phone is the viewport with the browser's toolbars hidden, so
     a 100vh page is taller than the screen whenever they show -- and the
     footer sits underneath them. dvh tracks the toolbars. */
  @supports (height: 100dvh) {
    .page {
      height: var(--page-height, 100dvh);
    }
  }
  .page {
    /* Containing block for the compact sidebar, which spans the whole page
       (header included) once it has a header to sit in. */
    position: relative;
  }
  .page.sticky {
    position: sticky;
    top: 0;
  }
  .header {
    flex-shrink: 1;
  }

  .content {
    /* The compact sidebar's reserved strip: at least the content's own
       padding, at least a sheet button plus a gap. Declared here, where
       --_padding (contentPadding) is set, so it resolves against it. */
    --_page-gutter: max(
      var(--_padding, var(--padding, 0px)),
      var(
        --sidebar-compact-side-padding,
        calc(
          max(
              var(--sidebar-icon-width, 0.65rem),
              var(--sidebar-icon-height, 1rem),
              var(--icon-size, 32px),
      var(--_touch-target, 0px)
            ) + var(--gap, 8px)
        )
      )
    );
    @include custom-scrollbar(page-content, page);
    @include box-props(page-content);
    @include border-props-borderless(page-content);
    @include color-props(page-content, surface);
  }
  .aside {
    flex: 0 0 auto;
  }

  .side-by-side {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
    margin: 0;
    box-sizing: border-box;
    gap: var(--column-gap);
    padding: 0;
    position: relative;
  }
  .right .side-by-side {
    flex-direction: row-reverse;
  }
  .page > div > .content {
    container-type: size;
    height: 100%;
    width: 100%;
  }
  .page.sticky.freeze :global(*) {
    overflow: hidden;
  }

  /* Must match Sidebar's own compact breakpoint exactly -- everything in
     this block exists to accommodate the sheet affordance, so switching at a
     different width than the Sidebar does leaves a band where Page has
     floated the aside but the Sidebar still shows a rail. */
  @container (max-width: #{$sidebar-compact-max}) {
    .side-by-side {
      gap: 0;
    }

    .page > div > .content {
      min-width: 0;
    }

    /* The sidebar becomes a floating sheet, summoned by a button. The aside
       holding it is a transparent strip laid over the content; only the
       Sidebar's button and open sheet catch clicks, never the strip. What
       room the content makes for the button is the `compactSidebar` mode,
       below. */
    .hasSidebar > .side-by-side > .aside {
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      z-index: 3;
      display: flex;
      pointer-events: none;
    }
    .hasSidebar.right > .side-by-side > .aside {
      inset-inline-start: auto;
      inset-inline-end: 0;
    }

    /* "gutter": a button-wide strip down the sidebar's side of the content. */
    .hasSidebar.sheet-gutter:not(.right) > .side-by-side > .content {
      padding-inline-start: var(--_page-gutter);
    }
    .hasSidebar.sheet-gutter.right > .side-by-side > .content {
      padding-inline-start: var(--_padding, var(--padding, 0px));
      padding-inline-end: var(--_page-gutter);
    }

    /* "symmetric": the same strip on both sides, so the column stays
       centred. */
    .hasSidebar.sheet-symmetric > .side-by-side > .content {
      padding-inline: var(--_page-gutter);
    }

    /* "overlap" and "header": the content keeps its ordinary, even padding.
       Under "overlap" the button simply floats over the content's corner. */
    .hasSidebar.sheet-overlap > .side-by-side > .content,
    .hasSidebar.sheet-header > .side-by-side > .content {
      padding-inline: var(--_padding, var(--padding, 0px));
    }

    /* "header": the button sits where a menu button is on every phone.
       - The aside spans the whole page, header included, instead of just
         the row beside the content, so the button can sit in the header row
         and the open sheet covers the page top to bottom, like any drawer.
       - The button is centred in the header's measured height.
       - The header's content steps aside by the button's width. */
    .hasSidebar.sheet-header > .side-by-side {
      position: static;
    }
    .hasSidebar.sheet-header > .side-by-side > .aside {
      /* Centred in the header's own row, below any safe-area strip (see
         the end of this file) -- the measured height includes that strip. */
      --sidebar-sheet-button-top: calc(
        var(--_page-safe-top) +
          (
            var(--_page-header-height, 0px) - var(--_page-safe-top) -
              var(--_page-sheet-button-size)
          ) / 2
      );
    }
    /* It's the header's own content (a Bar, usually) that makes room, not
       the header box: padding the header would leave a strip of page colour
       beside a coloured bar. Children passed CSS variables arrive wrapped in
       a display:contents <svelte-css-wrapper>, hence the second selector. */
    .hasSidebar.sheet-header:not(.right) > header > :global(*:not(svelte-css-wrapper)),
    .hasSidebar.sheet-header:not(.right) > header > :global(svelte-css-wrapper > *) {
      padding-inline-start: var(--_page-header-inset);
    }
    .hasSidebar.sheet-header.right > header > :global(*:not(svelte-css-wrapper)),
    .hasSidebar.sheet-header.right > header > :global(svelte-css-wrapper > *) {
      padding-inline-end: var(--_page-header-inset);
    }
  }

  .page {
    /* Same size the Sidebar gives its sheet button. */
    --_page-sheet-button-size: max(
      var(--sidebar-icon-height, 1rem),
      var(--icon-size, 32px),
      var(--_touch-target, 0px)
    );
    --_page-header-inset: var(
      --page-header-sidebar-inset,
      calc(
        max(
            var(--sidebar-icon-width, 0.65rem),
            var(--sidebar-icon-height, 1rem),
            var(--icon-size, 32px),
      var(--_touch-target, 0px)
          ) + 2 * var(--gap, 8px)
      )
    );
  }
  /* A finger-sized sheet button where the primary pointer is coarse (see
     --touch-target-size in vars/layout.css). Every size that has to agree
     with the button -- its own box, the strip reserved for it, the header
     inset -- takes this as one more term in its max(). */
  @media (pointer: coarse) {
    .page {
      --_touch-target: var(--touch-target-size, 44px);
    }
  }

  /* The notch and the home indicator. An app that runs edge to edge
     (viewport-fit=cover: an installed web app, most hybrid shells) is
     handed the whole screen, status bar and home bar included, and told how
     much of it is covered through env(safe-area-inset-*). Everywhere else
     those are 0 and nothing below has any effect.

     The header moves its content down by the top inset, and its first child
     -- the app's Bar, usually -- paints the strip it leaves with its own
     background (a ::before inheriting it), so the bar's colour runs up
     behind the status bar the way a native app's does. The footer mirrors
     it at the bottom. A page with no header or footer pads its frame
     instead, and the sides are padded for a phone on its side. */
  .page {
    --_page-safe-top: env(safe-area-inset-top, 0px);
    --_page-safe-bottom: env(safe-area-inset-bottom, 0px);
    box-sizing: border-box;
    padding-inline: env(safe-area-inset-left, 0px) env(safe-area-inset-right, 0px);
  }
  .page:not(.hasHeader) {
    padding-block-start: var(--_page-safe-top);
  }
  .page:not(.hasFooter) {
    padding-block-end: var(--_page-safe-bottom);
  }
  .page > header {
    padding-block-start: var(--_page-safe-top);
  }
  .page > footer {
    padding-block-end: var(--_page-safe-bottom);
  }
  .page :global([data-contain-page-safe-start-relative]),
  .page :global([data-contain-page-safe-end-relative]) {
    position: relative;
  }
  .page :global([data-contain-page-safe-start])::before {
    content: "";
    position: absolute;
    inset-inline: 0;
    bottom: 100%;
    height: var(--_page-safe-top);
    background: inherit;
    pointer-events: none;
  }
  .page :global([data-contain-page-safe-end])::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 100%;
    height: var(--_page-safe-bottom);
    background: inherit;
    pointer-events: none;
  }
</style>
