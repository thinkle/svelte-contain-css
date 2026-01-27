<script lang="ts">
  import { injectVars } from "$lib/util";
  export let primary = false;
  export let secondary = false;
  export let warning = false;
  export let danger = false;
  export let success = false;
  export let info = false;
  let iconSlotted = $$slots.icon;
  /* svelte-ignore unused-export-let */
  export let bg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let fg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let padding: string | null = null;
  /* svelte-ignore unused-export-let */
  export let width: string | null = null;
  /* svelte-ignore unused-export-let */
  export let height: string | null = null;

  let cssVars = injectVars($$props, "button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
  export let href: string = "#";
  export let id: string | null = null;
</script>

<a
  role="button"
  style={cssVars}
  on:click
  {href}
  {id}
  class:primary
  class:secondary
  class:warning
  class:danger
  class:success
  class:info
  class:has-icon={iconSlotted}
  {...$$restProps}
>
  <span class="content"><slot /></span>
  <span class:hidden={!iconSlotted} class="icon"><slot name="icon" /></span>
</a>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  a.has-icon {
    display: inline-flex;
    align-items: center;
    gap: var(--a-icon-gap, var(--space));
  }
  a[role="button"] {
    display: inline-block;
    width: var(--button-width);
    height: var(--button-height);
    @include box-props(button, control, secondary);
    @include border-props-none(button);
    @include color-props(button, control, secondary);
    @include box-shadow(button, control);
    @include typography-props-bare(button, control);
    @include clickable(button, clickable);
    @include focusable();
    text-decoration: none;
    margin: var-with-fallbacks(--margin, button, control, var(--space));
  }
  a[role="button"]:hover {
    text-decoration: none;
    /* Override other link styles that may be outside us */
    @include color-props(button, control, secondary);
  }
  a.primary[role="button"]:hover {
    @include color-props(primary, button, control, secondary);
  }
  a.primary {
    @include color-props(primary, button, control, secondary);
    @include typography-props-bare(primary, a);
  }
  a.warning {
    @include color-props(warning, button, control, secondary);
    @include typography-props-bare(warning, a);
  }
  a.danger {
    @include color-props(danger, button, control);
    @include typography-props-bare(danger, a);
  }
  a.success {
    @include color-props(success, button, control);
    @include typography-props-bare(success, a);
  }
  a.info {
    @include color-props(info, button, control);
    @include typography-props-bare(info, a);
  }
</style>
