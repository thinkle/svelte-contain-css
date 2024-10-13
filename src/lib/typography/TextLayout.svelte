<script>
  export let id = "";
</script>
<div {id}>
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div {
    @include typography-container-props(body, text);
    @include typography-props(body, text);
    width: var(--text-width, var(--body-width, 100%));
  }

  div :global(code) {
    @include typography-props(code);
    text-wrap: nowrap;
  }
</style>
