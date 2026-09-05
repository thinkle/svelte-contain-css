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

  /* Escape hatch for the things in a grid that are not items in the run: a
     section heading, or a note explaining why the grid is empty. Both want the
     whole row rather than one item-width column with tiles beside them.

     Declared here so it travels with the component, and matched as a descendant
     rather than a child on purpose -- a component handed a CSS custom property
     is wrapped in a `<svelte-css-wrapper>`, so it is a grandchild of the grid
     even though it is still the grid item. `grid-column` is inert on anything
     that is not a grid item, so the looser match costs nothing. */
  .grid-layout :global(.grid-full-row) {
    grid-column: 1 / -1;
  }

  .card-grid {
    --item-width: var(--card-width, 400px);
  }
  .tile-grid {
    --item-width: var(--tile-width, 200px);

    /* Fixed tracks, not `1fr` ones.

       A Tile is a fixed width by design, so a stretch track cannot make it any
       wider -- it just pads the track and leaves the extra space *between* the
       tiles. At 900px with 200px tiles and an 8px gap that reads as a 23px gutter
       between columns and nothing at the edges: the run looks sprung apart and
       shoved left, rather than like a row of cards.

       Sizing the track to the item instead gives the gap you actually asked for,
       and lets `justify-content: center` above finally do its job and centre the
       whole run -- with `1fr` tracks it never had any slack to work with. Same
       arithmetic at every width: at 900px the four tiles sit 8px apart with 30px
       either side; at 375px one tile centres itself with 80px either side.

       Only tile grids. Cards and the default grid hold things that genuinely can
       use the width, so they keep stretching. */
    grid-template-columns: repeat(auto-fill, min(100%, var(--item-width)));

    /* Belt and braces: the track now matches `--item-width`, so this only bites
       when a Tile is narrower than the track it was given. */
    --justify-items: center;
  }
</style>
