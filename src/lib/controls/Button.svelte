<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
  import { injectVars } from "$lib/util";
  export let primary = false;
  export let warning = false;
  let iconSlotted = $$slots.icon;
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;

  let cssVars = injectVars($$props, "button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
</script>

<button
  style={cssVars}
  on:click
  class:primary
  class:warning
  class:has-icon={iconSlotted}
  {...$$restProps}
>
  <span class="content"><slot /></span>
  <span class:hidden={!iconSlotted} class="icon"><slot name="icon" /></span>
</button>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  button.has-icon {
    display: flex;
    align-items: center;
    gap: var(--button-icon-gap, var(--space));
  }
  button {
    width: var(--button-width);
    height: var(--button-height);
    @include box-props(button, control, secondary);
    @include border-props-none(button);
    @include color-props(button, control, secondary);
    @include box-shadow(button, control);
    @include typography-props-bare(button, control);
    @include clickable(button, clickable);
    @include focusable();
    margin: var-with-fallbacks(--margin, button, control, var(--space));
  }
  button.primary {
    @include color-props(primary, button, control);
    @include typography-props-bare(primary, button);
  }
  button.warning {
    @include color-props(warning, button, control);
    @include typography-props-bare(warning, button);
  }
</style>
