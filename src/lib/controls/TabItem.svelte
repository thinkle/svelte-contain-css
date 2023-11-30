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

  let style = injectVars($$props, "tab", [
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
  div,
  span {
    display: contents;
  }
  div > :global(button) {
    @include color-props(tab, button, control, secondary);
    @include box-props(tab, button, control, secondary);
    border-radius: var(
      --tab-border-radius,
      var(--border-radius) var(--border-radius) 0 0
    );
    margin: 0;
  }
  div.active > :global(button) {
    @include color-props(tab-active, primary, tab, button, control, secondary);
  }
</style>
