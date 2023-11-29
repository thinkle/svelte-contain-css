<script>
  export let right = false;
  let hasSidebar = $$slots.sidebar;
  let hasHeader = $$slots.header;
  let hasFooter = $$slots.footer;
</script>

<section
  class="page"
  class:right
  class:hasHeader
  class:hasSidebar
  class:hasFooter
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
</style>
