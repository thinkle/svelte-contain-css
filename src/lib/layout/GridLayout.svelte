<script lang="ts">
  import { onMount } from "svelte";
  let grid: HTMLDivElement;
  export let id="";
</script>

<div class="grid-layout" {id}>
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
