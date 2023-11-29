<script>
  export let right = false;
  let hasSidebar = $$slots.sidebar;
  let hasHeader = $$slots.header;
</script>

<section class="page" class:right class:hasHeader class:hasSidebar>
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
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

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
  .page.right {
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
