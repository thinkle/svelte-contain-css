<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_CONTAINER_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import type { ContainProps, HeroStyleProps } from "$lib/types";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      children?: Snippet;
    },
    HeroStyleProps &
      StyleProps<typeof HERO_VARS>
  >;

  const { children, class: className, ...restProps }: Props = $props();

  /* The shorthands hero's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const HERO_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_CONTAINER_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "hero", [
      ...HERO_VARS,
      "padding",
      "width",
      "height",
      "headingFg",
      "headingBg",
    ]),
  );
</script>

<div
  class={["hero", className]}
  style:--text-align="var(--hero-text-align,center)"
  {...el}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  .hero {
    --hero-font-size: calc(var(--font-size) * 2);
    --hero-first-letter-fg: var(--hero-fg, var(--surface-fg, var(--fg)));
    @include color-props(hero, surface);
    @include typography-container-props(hero, surface);

    display: grid;
    place-content: center;
    width: var(--hero-width, 100%);
    max-width: var(--hero-width, 100%);
    height: var(--hero-height, 100vh);
    /* Small-viewport units where supported: on a phone, 100vh is the height
       with the browser's toolbars *hidden*, so a full-height hero's content
       sits partly under them on first load. */
    height: var(--hero-height, 100svh);
    /* Without inline padding, centred hero text runs right to the screen's
       edges the moment the viewport is narrower than its longest line. */
    padding-inline: var(--hero-padding-inline, var(--padding, 1rem));
    /* Lets hero content size itself to the hero (cqi units, @container)
       rather than to the viewport. */
    container-type: inline-size;
    /* font-size: var(--hero-font-size, 2rem); */
    box-sizing: border-box;
  }

  /* Fade the content, not the hero itself: fading the whole block makes its
     background flash in over the page on every load. */
  .hero > :global(*) {
    animation-name: fade-in;
    animation-duration: var(--hero-animation-duration, 1s);
    animation-timing-function: var(
      --hero-animation-timing-function,
      ease-in-out
    );
  }

  @media (prefers-reduced-motion: reduce) {
    .hero > :global(*) {
      animation: none;
    }
  }

  @keyframes fade-in {
    0% {
      filter: blur(3px);
      opacity: 0;
    }
    100% {
      filter: blur(0);
      opacity: 1;
    }
  }
</style>
