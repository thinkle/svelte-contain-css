<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  /* The smallest thing a <Sidebar> needs to work, and nothing else.

     A Sidebar is just a flex/grid sibling of your content that happens to
     collapse. It needs three things from whatever it sits in, and none of
     them are <Page>:

       1. a container-query context, or neither responsive branch matches and
          you get the rail AND the sheet button at once
       2. a definite height to fill
       3. a flex (or grid) parent, so the content is laid out beside it
          rather than below it

     <Container> gives you the first but not the others, and clips overflow
     besides, so an overlay sheet disappears. Rather than make people
     rediscover that, this is a container that gets all three right and adds
     nothing else -- no header, no footer, no page chrome. */

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      /** Put the sidebar after the content in the flex row. Pair with
       *  `<Sidebar right />`, which is what draws its border and rail on the
       *  correct edge. */
      right?: boolean;
      children?: Snippet;
    },
    StyleProps<typeof SIDEBAR_CONTAINER_VARS> & {
      /** Shorthands for --sidebar-container-{width,height,gap}. Height
       *  matters: a collapsed sidebar has no in-flow content, so an auto
       *  height collapses to nothing. */
      width?: string | null;
      height?: string | null;
      gap?: string | null;
    }
  >;

  let { right = false, children, class: className, ...restProps }: Props =
    $props();

  const SIDEBAR_CONTAINER_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "sidebar-container", [
      ...SIDEBAR_CONTAINER_VARS,
      "width",
      "height",
      "gap",
    ]),
  );
</script>

<div class={["sidebar-container", className]} class:right {...el}>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .sidebar-container {
    @include color-props(sidebar-container, surface);
    @include box-props(sidebar-container);

    /* (1) so the Sidebar's container queries have something to measure */
    container-type: inline-size;
    /* (3) so the content sits beside the sidebar, not under it */
    display: flex;
    gap: var(--sidebar-container-gap, 0);
    /* so an overlay sheet anchors here rather than escaping up the tree */
    position: relative;

    box-sizing: border-box;
    width: var(--sidebar-container-width, 100%);
    /* (2) a height to fill. `auto` would collapse, because a collapsed
       sidebar has no in-flow content of its own. */
    height: var(--sidebar-container-height, 100%);
    min-height: var(--sidebar-container-min-height, 0);

    /* Deliberately NOT `overflow: hidden`: that is what makes an overlay
       sheet vanish inside a <Container>. */
  }

  .sidebar-container.right {
    flex-direction: row-reverse;
  }

  /* The content beside the sidebar takes the remaining width and scrolls on
     its own, so a long page does not stretch the sidebar past the viewport. */
  .sidebar-container > :global(:not(aside)) {
    flex: 1 1 auto;
    min-width: 0;
    overflow: auto;
  }
</style>
