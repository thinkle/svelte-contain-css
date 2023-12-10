<script>
</script>

<div class="columns">
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .columns {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var_with_fallbacks(--gap, columns, container, 8px);
    justify-content: center;
  }
</style>
