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
    /* Tracks sized to the item, not `1fr`.

       `1fr` splits the leftover width between the tracks, which turns it into
       gutter *between* the items while the edges of the run stay tight -- three
       cards in a 900px container end up sprung apart and pushed left. That is
       rarely what anyone means by declaring an item width: they mean "lay these
       out at this size", and the leftover belongs at the edges.

       Sizing the track to the item gives exactly the `gap` that was asked for
       between items, and hands the remainder to `justify-content: center` below,
       which centres the whole run. That declaration has been here all along and
       could never fire, because `1fr` tracks always consume the full width.

       `min(100%, …)` keeps a track from outgrowing a narrow screen.

       `auto-fit`, not `auto-fill`, and the difference is the whole ballgame for
       centring. Both lay down as many tracks as fit the container; `auto-fill`
       keeps the empty ones at full width, so three cards in a wide container
       leave `justify-content` no slack to work with and pack against the left.
       `auto-fit` collapses the tracks nothing landed in, so the run shrinks to
       the items and centres. Three 200px items in a 1400px container: 72px left
       and 696px right under `auto-fill`, 384px either side under `auto-fit`.

       One caveat worth knowing, because it is not a bug we can fix here: an item
       spanning `1 / -1` -- a `GridRow`, a heading -- occupies every track, so
       there is nothing left for `auto-fit` to collapse and the run goes back to
       full width and left-packed. A grid with full-width rows in it is a
       full-width grid. Headings kept outside the grid, one grid per section,
       keep the centring. */
    grid-template-columns: repeat(
      auto-fit,
      min(100%, var-with-fallbacks(--item-width, grid-layout, 250px))
    );
    gap: var-with-fallbacks(--gap, grid-layout, 8px);
    justify-content: var(--grid-justify-content, center);
    place-content: var(--grid-place-content, center);
    /* Where an item sits *inside* its track -- a separate question from where
       the tracks sit in the grid, which is `justify-content` above.

       Mostly moot now that a track is sized to the item: there is usually no
       room inside a track to sit anywhere. It still matters when a child is
       narrower than the track it was handed, which happens whenever a component
       carries its own width -- a `Tile` with a `--tile-width` smaller than the
       grid's `--item-width`. The default stays `stretch` so anything that can
       use its whole track still gets it. */
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

    /* Spanning is only half of it. How an item fills the tracks it spans is
       `justify-items` on the grid, which a tile grid sets to `center` -- and a
       centred block with no width of its own shrinks to fit its content, so the
       row it spans renders as a short centred blob rather than a full-width
       heading. Saying `stretch` here makes the class mean the same thing in
       every grid, whatever the container prefers for ordinary items.

       A consumer spanning their own item -- `grid-column: span 2` -- owns this
       decision themselves and will want `justify-self` alongside it. */
    justify-self: stretch;
  }

  .card-grid {
    --item-width: var(--card-width, 400px);
  }
  .tile-grid {
    --item-width: var(--tile-width, 200px);

    /* The track now matches `--item-width`, so this only bites when a Tile is
       narrower than the track it was handed -- a `--tile-width` set smaller than
       the grid's item width, say. */
    --justify-items: center;
  }
</style>
