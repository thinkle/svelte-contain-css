<section class="page">
  <div class="aside">
    <slot name="sidebar" />
  </div>
  <div class="content">
    <slot />
  </div>
</section>

<style>
  .page .content,
  .page .aside {
    overflow-y: auto;
  }
  .page .aside {
    flex: 0 0 auto;
  }

  .page {
    container-type: size;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    height: 100vh;
    box-sizing: border-box;
    gap: var(--column-gap);
    padding: var(--pad);
  }
  .page .content {
    background-color: var(--bg);
    color: var(--text);
  }
</style>
