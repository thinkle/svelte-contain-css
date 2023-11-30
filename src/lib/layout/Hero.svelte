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

<div class="hero">
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .hero {
    @include color-props(hero, container);
    @include typography-container-props(hero, container);
    display: grid;
    place-content: center;
    width: var(--hero-width, 100%);
    height: var(--hero-height, 100vh);
    font-size: var(--hero-font-size, 2rem);
    box-sizing: border-box;
    animation-name: fade-in;
    animation-duration: var(--hero-animation-duration, 1s);
    animation-timing-function: var(
      --hero-animation-timing-function,
      ease-in-out
    );
    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-align: center;
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
