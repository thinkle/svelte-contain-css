<script lang="ts">
  import { onMount } from "svelte";
  let grid: HTMLDivElement;
</script>

<div class="grid-layout">
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .grid-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /*@include box-props(grid-layout);*/
    gap: var-with-fallbacks(--gap, grid-layout, 8px);
  }
</style>
