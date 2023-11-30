<script lang="ts">
  import { injectVars } from "$lib/util";
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let margin: string | null = null;
  export let maxWidth: string | null = null;
  export let padding: string | null = null;
  export let height: string | null = null;
  export let border: boolean = false;
  export let paddingTop: string | null = null;
  export let borderTop: string | null = null;

  const style = injectVars($$props, "container", [
    "bg",
    "fg",
    "margin",
    "maxWidth",
    "padding",
    "height",
    "paddingTop",
    "borderTop",
  ]);
</script>

<section class:border {style}>
  <slot />
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  section {
    margin: auto;
    max-width: var-with-fallbacks(--max-width, container, block, 900px);
    box-sizing: border-box;
    padding: var-with-fallbacks(--padding, container, 8px);
    @include color-props(container, block);
    @include box-props(container, block);
    @include typography-props(container, block);
    margin-top: var-with-fallbacks(--margin, container, block, var(--gap));
    margin-bottom: var-with-fallbacks(--margin, container, block, var(--gap));
    /* Why is this suddenly causing a scroll? */
    /* container-type: inline-size; */
    overflow-x: hidden;
    height: var(--container-height);
    overflow-y: auto;
  }
  .border {
    border: var-with-fallbacks(
      --border,
      container,
      var(--border-width) var(--border-style) var(--border-color)
    );
  }
</style>
