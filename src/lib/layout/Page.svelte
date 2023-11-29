<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let right = false;
  export let sticky = false;
  let hasSidebar = $$slots.sidebar;
  let hasHeader = $$slots.header;
  let hasFooter = $$slots.footer;
  let freeze = sticky; // Do we "freeze" before scrolling?

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
      const isSticking = rect.top <= computedTop;
      freeze = !isSticking;
    }
  }

  onMount(() => {
    if (sticky) {
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
>
  <header>
    <slot name="header" />
  </header>
  <div class="side-by-side">
    <div class="aside">
      <slot name="sidebar" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
  <footer>
    <slot name="footer" />
  </footer>
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  header {
    display: none;
  }
  .hasHeader header {
    display: block;
  }
  footer {
    display: none;
  }
  .hasFooter footer {
    display: block;
  }
  .aside {
    display: none;
  }
  .hasSidebar .aside {
    display: flex;
  }

  .page {
    @include color-props(page);
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
  .page .content {
    container-type: size;
    height: 100%;
    width: 100%;
    background: var(--bg);
    color: var(--text);
  }
  .page.freeze :global(*) {
    overflow: hidden;
  }
</style>
