<script lang="ts">
  export let center: boolean = false;
  export let fixedHeight = false;
  let hasHeader = $$slots.header;
  let hasFooter = $$slots.footer;
</script>

<div class="card" class:center class:fixedHeight>
  <header class:hide={!hasHeader}>
    <slot name="header" />
  </header>
  <section>
    <slot />
  </section>
  <footer class:hide={!hasFooter}>
    <slot name="footer" />
  </footer>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .card {
    --w: var(--card-width);
    --h: var(--card-height);
    @include box-shadow(card, container);
    @include color-props(card, container);
    border-radius: var-with-fallbacks(--border-radius, card, container, 0);
    display: flex;
    flex-direction: column;
  }
  .card section {
    flex-grow: grow;
  }
  @container (max-width: 600px) {
    .card {
      --w: var(--card-width-small);
      --h: var(--card-height-small);
      --font-size: 0.8em;
      --sidebar-width: calc(var(--card-width-small) - var(--pad) * 2);
    }
  }
  @container (min-width: 1921px) {
    .card {
      --w: var(--card-width-large);
      --h: var(--card-height-large);
      --font-size: 1.2em;
    }
  }

  .card.center {
    display: grid;
    place-content: center;
  }
  .card {
    overflow-x: hidden;
    container-type: inline-size;
    width: var(--w);
    font-size: var(--font-size);
    font-family: var(--font-family);
  }
  .card section {
    line-height: var(--line-height);
    max-width: var(--line-width);
  }

  .card.fixedHeight {
    height: var(--h);
    container-type: size;
  }

  header,
  section {
    padding: var(--pad);
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    border-bottom: var(--card-header-border);
  }
  header {
    @include color-props(card-header, secondary);
    @include box-props-top(card-header, bar);
    display: flex;
    align-items: center;
    height: var-with-fallbacks(--height, card-header, bar, 2em);
  }
  footer {
    @include color-props(card-footer, secondary);
    @include box-props-bottom(card-footer, bar);
    height: var-with-fallbacks(--height, card-header, bar, 2em);
  }
  .hide {
    display: none;
  }
</style>
