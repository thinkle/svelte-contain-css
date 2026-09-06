<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  /**
   * A full-width band inside a GridLayout: a section heading, an explanation, a
   * note saying why the grid is empty. Anything that belongs *in* the run of
   * items without being one of them.
   *
   * Carries `.grid-full-row`, which is the same thing as a class for when you
   * already have an element and would rather not nest a div inside it. The
   * difference is `--line-width`: a heading or paragraph placed inside this
   * component is meant to run the width of the band, so the readable measure
   * that typographic containers impose is lifted for its contents too. Put the
   * class on your own heading instead and the heading keeps that measure.
   */
  type Props = {
    children?: Snippet;
  } & HTMLAttributes<HTMLDivElement>;

  let { children, ...restProps }: Props = $props();
</script>

<div class="grid-full-row grid-row" {...restProps}>
  {@render children?.()}
</div>

<style lang="scss">
  .grid-row {
    /* Spanning, stretching and the margin reset all live on `.grid-full-row`,
       in GridLayout. What this adds is releasing the measure for the content:
       without it a heading in here is clamped to `--line-width` and centred by
       its own auto margins, so the band spans and the words inside it do not. */
    --line-width: none;
  }
</style>
