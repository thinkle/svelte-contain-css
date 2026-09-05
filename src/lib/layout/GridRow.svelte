<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  /**
   * A full-width band inside a GridLayout: a section heading, an explanation, a
   * note saying why the grid is empty. Anything that belongs *in* the run of
   * items without being one of them.
   *
   * Two properties, and the second is the one people forget. `grid-column`
   * spans the tracks; `justify-self` decides how the item fills the tracks it
   * spans, and a grid that centres its items -- a tile grid does -- would
   * otherwise shrink this to fit its text and float it in the middle. Stating
   * both means it reads the same in every grid.
   *
   * Equivalent to putting `class="grid-full-row"` on your own element, which is
   * the better choice when you already have one and would rather not nest a div
   * inside it.
   */
  type Props = {
    children?: Snippet;
  } & HTMLAttributes<HTMLDivElement>;

  let { children, ...restProps }: Props = $props();
</script>

<div class="grid-row" {...restProps}>
  {@render children?.()}
</div>

<style lang="scss">
  .grid-row {
    grid-column: 1 / -1;
    justify-self: stretch;
  }
</style>
