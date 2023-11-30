<script lang="ts">
  import { injectVars } from "$lib/util";
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let margin: string | null = null;
  export let maxWidth: string | null = null;
  export let padding: string | null = null;

  export let border: boolean = false;

  const style = injectVars($$props, "container", [
    "bg",
    "fg",
    "margin",
    "maxWidth",
    "padding",
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
    container-type: inline-size;
    overflow-x: hidden;
  }
  .border {
    border: var-with-fallbacks(
      --border,
      container,
      var(--border-width) var(--border-style) var(--border-color)
    );
  }
</style>
