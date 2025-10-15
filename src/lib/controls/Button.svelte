<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";

  let {
    primary = false,
    secondary = false,
    warning = false,
    icon,
    children,
    ...restProps
  }: {
    primary?: boolean;
    secondary?: boolean;
    warning?: boolean;
    icon?: Snippet;
    children?: Snippet;
  } & Record<string, unknown> = $props();

  const style = $derived(
    injectVars(restProps, "button", ["bg", "fg", "padding", "width", "height"])
  );

  const iconSlotted = $derived(Boolean(icon));
</script>

<button
  {style}
  class:primary
  class:secondary
  class:warning
  class:has-icon={iconSlotted}
  {...restProps}
>
  <span class="content">{@render children?.()}</span>
  <span class:hidden={!iconSlotted} class="icon">
    {@render icon?.()}
  </span>
</button>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  button.has-icon {
    display: inline-flex;
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
