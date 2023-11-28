<script>
  export let right = false;
</script>

<section class="page" class:right>
  <div class="aside">
    <slot name="sidebar" />
  </div>
  <div class="content">
    <slot />
  </div>
</section>

<style>
  .content {
    overflow-y: scroll;
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
    height: var(--height, 100vh);
    box-sizing: border-box;
    gap: var(--column-gap);
    padding: var(--pad);
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
