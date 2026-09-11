<script lang="ts">
  import { injectVars } from "$lib/util";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    bg?: string | null;
    fg?: string | null;
    marginBlock?: string | null;
    marginInline?: string | null;
    maxWidth?: string | null;
    padding?: string | null;
    height?: string | null;
    border?: boolean;
    paddingTop?: string | null;
    borderTop?: string | null;
    children?: Snippet;
  } & HTMLAttributes<HTMLElement>;

  const { children, border = false, ...props }: Props = $props();

  const style = $derived(
    injectVars(props, "container", [
      "bg",
      "fg",
      "marginBlock",
      "marginInline",
      "maxWidth",
      "padding",
      "height",
      "paddingTop",
      "borderTop",
    ]),
  );
</script>

<section class:border {style}>
  {@render children?.()}
</section>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  section {
    box-sizing: border-box;
    padding: var-with-fallbacks(--padding, container, surface, 8px);
    @include color-props(container, surface, block);
    @include box-props(container, surface, block);
    @include typography-container-props(container, surface, block);
    /* Override typography max-width */
    max-width: var-with-fallbacks(
      --max-width,
      container,
      surface,
      block,
      900px
    );
    /* Not the generic margin-props() mixin (_box.scss): that defaults to 0,
       but a Container has always centred itself horizontally and kept a
       gap's worth of vertical rhythm above/below by default. Same defaults,
       same var-with-fallbacks() prefix chain as everything else here --
       just block/inline now instead of one `margin` prop, so a caller can
       set only one axis (a Container flush against a footer, say) instead
       of fighting a single shared value for both. */
    margin-inline: var-with-fallbacks(
      --margin-inline,
      container,
      surface,
      block,
      auto
    );
    margin-block: var-with-fallbacks(
      --margin-block,
      container,
      surface,
      block,
      var(--gap)
    );
    /* Why is this suddenly causing a scroll? */
    container-type: inline-size;
    overflow-x: hidden;
    height: var(--container-height, 100%);
    overflow-y: auto;
    @include custom-scrollbar(container, surface);
    /* Make container take up its width if possible: this fixes a bug where container would
    shrink enormously if it ended up nested inside e.g. a <SplitPane> */
    width: var(--container-width, 100%);
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
