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
    @include typography-props(hero, container);
    display: grid;
    place-content: center;
    width: var(--hero-width, 100%);
    height: var(--hero-height, 100vh);
    font-size: var(--hero-font-size, 2rem);
    box-sizing: border-box;

    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-align: center;
    }
  }
</style>
