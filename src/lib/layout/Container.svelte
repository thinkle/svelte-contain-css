<script lang="ts">
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_CONTAINER_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      border?: boolean;
      children?: Snippet;
    },
    {
      bg?: string | null;
      fg?: string | null;
      marginBlock?: string | null;
      marginInline?: string | null;
      maxWidth?: string | null;
      padding?: string | null;
      height?: string | null;
      paddingTop?: string | null;
      borderTop?: string | null;
    } &
      StyleProps<typeof CONTAINER_VARS>
  >;

  const {
    children,
    border = false,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands container's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const CONTAINER_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_CONTAINER_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "container", [
      ...CONTAINER_VARS,
      "marginBlock",
      "marginInline",
      "maxWidth",
      "height",
      "paddingTop",
      "borderTop",
    ]),
  );
</script>

<section class={className} class:border {...el}>
  {@render children?.()}
</section>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  section {
    box-sizing: border-box;
    @include color-props(container, surface, block);
    @include box-props(container, surface, block);
    /* box-props (above) already sets a padding, but its shared fallback (4px)
       is generic to every component that uses the mixin, not Container's own
       long-standing 8px default. This declaration coming AFTER box-props is
       what makes it win -- before this fix, Container had no override here
       at all and was silently rendering at box-props' 4px. Same
       var-with-fallbacks() chain as box-props' own (container/surface/block),
       just a bigger final fallback. */
    padding: var-with-fallbacks(--padding, container, surface, block, 8px);
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
