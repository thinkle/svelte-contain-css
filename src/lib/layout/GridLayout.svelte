<script lang="ts">
  import { onMount } from "svelte";
  let grid: HTMLDivElement;
</script>

<div class="grid-layout">
  <slot />
</div>

<style>
  .grid-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--gap);
  }
</style>
