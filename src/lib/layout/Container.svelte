<script lang="ts">
  import { injectVars } from "$lib/util";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    bg?: string | null;
    fg?: string | null;
    margin?: string | null;
    maxWidth?: string | null;
    padding?: string | null;
    height?: string | null;
    border?: boolean;
    paddingTop?: string | null;
    borderTop?: string | null;
    children?: Snippet;
  } & HTMLAttributes<HTMLElement>;

  const {
    children,
    border = false,
    ...props
  }: Props = $props();

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
  @use "$lib/sass/_mixins.scss" as *;
  section {
    margin: auto;

    box-sizing: border-box;
    padding: var-with-fallbacks(--padding, container, surface, 8px);
    @include color-props(container, surface, block);
    @include box-props(container, surface, block);
    @include typography-container-props(container, surface, block);
    /* Override typography max-width */
    max-width: var-with-fallbacks(--max-width, container, surface, block, 900px);
    margin-top: var-with-fallbacks(--margin, container, surface, block, var(--gap));
    margin-bottom: var-with-fallbacks(--margin, container, surface, block, var(--gap));
    /* Why is this suddenly causing a scroll? */
    container-type: inline-size;
    overflow-x: hidden;
    height: var(--container-height, 100%);
    overflow-y: auto;
    @include custom-scrollbar(container, surface);
  }
  .border {
    border: var-with-fallbacks(
      --border,
      container,
      surface,
      var(--border-width) var(--border-style) var(--border-color)
    );
  }
</style>
