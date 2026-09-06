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
    /* Where the run of tracks sits in the grid box. Both axes as longhands,
       because `place-content` is a shorthand and was declared after
       `justify-content` here -- so it quietly overwrote it and
       `--grid-justify-content` never did anything at all. Only
       `--grid-place-content` worked, and it moves both axes at once.

       Named `--grid-layout-*` like everything else, with the old spellings kept
       as fallbacks so anything already setting them keeps working -- and
       `--grid-justify-content` starts working for the first time. */
    justify-content: var-with-fallbacks(
      --justify-content,
      grid-layout,
      var(--grid-justify-content, var(--grid-place-content, center))
    );
    align-content: var-with-fallbacks(
      --align-content,
      grid-layout,
      var(--grid-place-content, center)
    );
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
    justify-self: var-with-fallbacks(--justify, grid-row, stretch);

    /* And the typography has to be let go of too, which is the part that took a
       while to see. A heading inside a typographic container gets a readable
       measure and auto side margins -- `max-width: var(--line-width)`, 42rem by
       default, with `margin-inline: auto` -- so it sits as a centred column of
       text. Sensible for prose, wrong for a band that is supposed to run the
       width of a grid.

       Worse, an auto inline margin makes `justify-self: stretch` do nothing at
       all: the spec only stretches a box whose inline margins are both
       non-auto, so the heading fell back to shrink-to-fit. "Sections" measured
       74px in a 1064px row, and computed style reports the *used* margin as
       `0px`, so it does not look like margins are the culprit until you set them
       and watch the width jump. */
    max-width: none;
    margin-inline: 0;
  }

  .card-grid {
    --item-width: var(--card-width, 400px);
  }
  .tile-grid {
    /* Has to be the width a Tile actually defaults to, not a round number near
       it. Tile says `calc(var(--space-lg) * 24)`, which is 192px; this said
       200px, so every tile sat 4px inside its own track and a full-width row
       did not line up with the tiles under it. */
    --item-width: var(--tile-width, calc(var(--space-lg) * 24));

    /* The track now matches `--item-width`, so this only bites when a Tile is
       narrower than the track it was handed -- a `--tile-width` set smaller than
       the grid's item width, say. */
    --justify-items: center;
  }
</style>
