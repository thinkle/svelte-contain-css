<script lang="ts">
  import { injectVars } from "$lib/util";
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;

  let cssVars = injectVars($$props, "hero", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
</script>

<div class="hero" style={cssVars} style:--text-align="var(--hero-text-align,center)">
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .hero {
    --hero-font-size: calc(var(--font-size) * 2);
    @include color-props(hero, container);
    @include typography-container-props(hero, container);

    display: grid;
    place-content: center;
    width: var(--hero-width, 100%);
    max-width: var(--hero-width, 100%);
    height: var(--hero-height, 100vh);
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
