<script lang="ts">
  import { injectVars } from "$lib/util";
  const {
    children,
    border = false,
    ...props
  } = $props<{
    bg?: string | null;
    fg?: string | null;
    margin?: string | null;
    maxWidth?: string | null;
    padding?: string | null;
    height?: string | null;
    border?: boolean;
    paddingTop?: string | null;
    borderTop?: string | null;
    children?: import("svelte").Snippet;
  }>();

  const style = $derived(
    injectVars(props, "container", [
      "bg",
      "fg",
      "margin",
      "maxWidth",
      "padding",
      "height",
      "paddingTop",
      "borderTop",
    ])
  );
</script>

<section class:border {style}>
  {@render children?.()}
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  section {
    margin: auto;

    box-sizing: border-box;
    padding: var-with-fallbacks(--padding, container, 8px);
    @include color-props(container, block);
    @include box-props(container, block);
    @include typography-container-props(container, block);
    /* Override typography max-width */
    max-width: var-with-fallbacks(--max-width, container, block, 900px);
    margin-top: var-with-fallbacks(--margin, container, block, var(--gap));
    margin-bottom: var-with-fallbacks(--margin, container, block, var(--gap));
    /* Why is this suddenly causing a scroll? */
    container-type: inline-size;
    overflow-x: hidden;
    height: var(--container-height, 100%);
    overflow-y: auto;
    @include custom-scrollbar(container);
  }
  .border {
    border: var-with-fallbacks(
      --border,
      container,
      var(--border-width) var(--border-style) var(--border-color)
    );
  }
</style>
