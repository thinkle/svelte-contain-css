<script lang="ts">
  export let primary: boolean = false;
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;
  import { injectVars } from "$lib/util";

  let style = injectVars($$props, "mini-button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
</script>

<button
  {style}
  class:primary
  on:click
  on:blur
  on:dblclick
  on:focus
  on:keydown
  on:keyup
  {...$$restProps}
>
  <slot />
</button>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  button.primary {
    @include color-props(primary, button, control);
  }
  button {
    @include typography-props(button, control);
    @include color-props(mini-button, button, control, secondary);
    font-family: var(--button-font);
    @include clickable(mini-button, button, clickable);
    @include box-shadow(mini-button, button, control);
    margin: var-with-fallbacks(--margin, button, control, var(--space));
    width: var(--mini-button-size, var(--icon-size, 1em));
    height: var(--mini-button-size, var(--icon-size, 1em));
    border-radius: var(--mini-button-radius, 50%);
    border: var(--mini-button-border, button-border, none);
    display: inline-grid;
    place-content: center;
  }
  button.primary {
    @include color-props(primary, button, control);
  }
  button.warning {
    @include color-props(warning, button, control);
  }
</style>
