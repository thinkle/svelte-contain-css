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
    /* Where an item sits *inside* its track -- a separate question from where
       the tracks sit in the grid. `justify-content` and `place-content` above
       only distribute tracks, and the tracks are `1fr`, so they always consume
       the full width and there is never any slack for those two to distribute.

       The default stays `stretch`, so anything that wants its whole track still
       gets it. Fixed-width children are the case this exists for: `Tile` sets an
       explicit `width`, so it cannot stretch, and in a stretch track it lands
       hard against the left edge. On a wide grid that is invisible, because the
       track is about as wide as the tile. At one column -- a phone -- a 200px
       tile sits in a full-width track with every pixel of slack to its right. */
    justify-items: var-with-fallbacks(--justify-items, grid-layout, stretch);
    @include box-props(grid-layout);
  }

  .card-grid {
    --item-width: var(--card-width, 400px);
  }
  .tile-grid {
    --item-width: var(--tile-width, 200px);
    /* A tile grid holds Tiles, and a Tile is a fixed width by design, so there
       is nothing in here that wants to stretch. */
    --justify-items: center;
  }
</style>
