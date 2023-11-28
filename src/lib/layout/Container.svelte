<script lang="ts">
  export let border: boolean = false;
</script>

<section class:border>
  <slot />
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  :root {
    --container-max-width: 900px;
    --container-border: none;
    --container-margin: var(--gap);
  }
  section {
    margin: auto;
    max-width: var-with-fallbacks(--max-width, container, block);
    box-sizing: border-box;
    padding: var(--pad);
    @include color-props(container, block);
    @include box-props(container, block);
    margin-top: var-with-fallbacks(--margin, container, block, var(--gap));
    margin-bottom: var-with-fallbacks(--margin, container, block, var(--gap));
    container-type: inline-size;
  }
  .border {
    border: var(--border-width) var(--border-style) var(--border-color);
  }
</style>
