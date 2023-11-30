<script lang="ts">
  import { injectVars } from "$lib/util";
  import Button from "./Button.svelte";
  export let primary = false;
  export let warning = false;
  let iconSlotted = $$slots.icon;
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;
  export let active: boolean;

  let style = injectVars($$props, "button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
</script>

<div class="tab" class:active {style}>
  <Button on:click primary={active}>
    <span slot="icon"><slot name="icon" /></span>
    <span><slot /></span>
  </Button>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div.active {
    --button-border-bottom: var(--tab-border-bottom-active, 0);
  }
  div {
    --button-border-bottom: var(--tab-border-bottom, var(--border));
    --button-border-bottom-right-radius: var(
      --tab-border-bottom-right-radius,
      0
    );
    --button-border-bottom-left-radius: var(--tab-border-bottom-left-radius, 0);
    --button-border-top-right-radius: var(
      --tab-border-bottom-left-radius,
      var(--border-radius)
    );
    --button-border-top-left-radius: var(
      --tab-border-bottom-left-radius,
      var(--border-radius)
    );
    background-color: var-with-fallbacks(--bg, tab, button, control, secondary);
    --button-margin: var(--tab-margin, 0);
    --button-bg: var(--tab-bg, var(--button-bg));
    --button-fg: var(--tab-fg, var(--button-fg));
    --button-padding: var(--tab-padding, var(--button-padding));
  }
  div,
  span {
    display: contents;
  }
</style>
