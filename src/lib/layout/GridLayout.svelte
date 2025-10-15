<script lang="ts">
  import { onMount } from "svelte";
  let grid: HTMLDivElement;
  interface Props {
    id?: string;
    children?: import('svelte').Snippet;
  }

  let { id = "", children }: Props = $props();
</script>

<div class="grid-layout" {id}>
  {@render children?.()}
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
