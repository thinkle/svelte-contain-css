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
    /* font-size: var(--hero-font-size, 2rem); */
    box-sizing: border-box;
    animation-name: fade-in;
    animation-duration: var(--hero-animation-duration, 1s);
    animation-timing-function: var(
      --hero-animation-timing-function,
      ease-in-out
    );
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
