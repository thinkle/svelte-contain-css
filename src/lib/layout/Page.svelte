<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";
  import { onDestroy, onMount } from "svelte";

  const {
    right = false,
    sticky = false,
    hideSidebar = false,
    hideHeader = false,
    hideFooter = false,
    onStickyChange = () => {},
    header,
    footer,
    sidebar,
    children,
    ...restProps
  }: {
    right?: boolean;
    sticky?: boolean;
    hideSidebar?: boolean;
    hideHeader?: boolean;
    hideFooter?: boolean;
    onStickyChange?: (stuck: boolean) => void;
    header?: Snippet;
    footer?: Snippet;
    sidebar?: Snippet;
    children?: Snippet;
  } & Record<string, unknown> = $props();

  const style = $derived(
    injectVars(restProps, "page", [
      "bg",
      "fg",
      "contentPadding",
      "width",
      "height",
    ])
  );

  const hasSidebar = $derived(Boolean(sidebar) && !hideSidebar);
  const hasHeader = $derived(Boolean(header) && !hideHeader);
  const hasFooter = $derived(Boolean(footer) && !hideFooter);

  // Start "unfrozen" so i.e. scrolling on reload
  // or hash link works properly
  let freeze = false;
  let pageElement: HTMLElement;

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
</script>

<section
  class="page"
  class:freeze
  class:right
  class:sticky
  class:hasHeader
  class:hasSidebar
  class:hasFooter
  bind:this={pageElement}
  {style}
  {...restProps}
>
  <header>
    {#if hasHeader}{@render header?.()}{/if}
  </header>
  <div class="side-by-side">
    <div class="aside">
      {#if hasSidebar}{@render sidebar?.()}{/if}
    </div>
    <div class="content">
      {@render children?.()}
    </div>
  </div>
  <footer>
    {#if hasFooter}{@render footer?.()}{/if}
  </footer>
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

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
    @include color-props(page, content, container);
    border: var(--page-border);
    height: var(--page-height, 100vh);
    width: var(--page-width, 100%);
    container-type: size;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }
  .page.sticky {
    position: sticky;
    top: 0;
  }
  .header {
    flex-shrink: 1;
  }

  .content {
    @include custom-scrollbar(page-content, page);
    @include box-props(page-content);
    @include color-props(page-content, page, container);
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
    padding: var(--padding);
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
</style>
