<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
  import { injectVars } from "$lib/util";
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;
  export let marginBottom: string | null = null;
  export let marginTop: string | null = null;
  export let justify:
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end"
    | null = null;
  export let align: "center" | "start" | "end" | "stretch" | null = null;
  let style = injectVars($$props, "bar", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
    "justify",
    "align",
    "marginBottom",
  ]);
</script>

<div class="bar" {style}>
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .bar {
    display: flex;
    align-items: var(--bar-align, center);
    justify-content: var(--bar-justify, space-between);
    padding: var-with-fallbacks(--padding, bar, 8px);
    border-bottom: var(
      --bar-border-bottom,
      var-with-fallbacks(--border-width, bar, 1px)
        var-with-fallbacks(--border-style, bar, 1px)
        var-with-fallbacks(--border-color, bar, 1px)
    );
    border-top: var(
      --bar-border-top,
      var-with-fallbacks(--border-width, bar, 1px)
        var-with-fallbacks(--border-style, bar, 1px)
        var-with-fallbacks(--border-color, bar, 1px)
    );
    margin-bottom: var(--bar-margin-bottom, 1em);
    min-height: var(--bar-min-height);
    height: var(--bar-height, 3em);
    max-height: var(--bar-max-height);
    @include color-props(bar, container);
    gap: var-with-fallbacks(--gap, bar, 8px);
  }

  .bar :global(h1),
  .bar :global(h2),
  .bar :global(h3),
  .bar :global(h4),
  .bar :global(h5),
  .bar :global(h6) {
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
    @include color-props(bar, container);
  }
</style>
