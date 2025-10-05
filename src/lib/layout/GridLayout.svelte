<script lang="ts">
  import { onMount } from "svelte";
  let grid: HTMLDivElement;
  export let id = "";
</script>

<div class="grid-layout" {id}>
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      var-with-fallbacks(--item-width, grid-layout, 250px)
    );
    gap: var-with-fallbacks(--gap, grid-layout, 8px);
    justify-content: var(--grid-justify-content, center);
    place-content: var(--grid-place-content, center);
    @include box-props(grid-layout);
  }
</style>
