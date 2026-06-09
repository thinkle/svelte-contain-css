<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    card?: boolean;
    tile?: boolean;
    children?: Snippet;
  } & HTMLAttributes<HTMLDivElement>;

  let { children, card = false, tile = false, ...restProps }: Props = $props();
</script>

<div
  class="grid-layout"
  class:card-grid={card}
  class:tile-grid={tile}
  {...restProps}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        min(100%, var-with-fallbacks(--item-width, grid-layout, 250px)),
        1fr
      )
    );
    gap: var-with-fallbacks(--gap, grid-layout, 8px);
    justify-content: var(--grid-justify-content, center);
    place-content: var(--grid-place-content, center);
    @include box-props(grid-layout);
  }

  .card-grid {
    --item-width: var(--card-width, 400px);
  }
  .tile-grid {
    --item-width: var(--tile-width, 200px);
  }
</style>
