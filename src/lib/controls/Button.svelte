<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    primary?: boolean;
    secondary?: boolean;
    warning?: boolean;
    danger?: boolean;
    success?: boolean;
    info?: boolean;
    icon?: Snippet;
    children?: Snippet;
  } & BaseStyleProps &
    HTMLButtonAttributes;

  let {
    primary = false,
    secondary = false,
    warning = false,
    danger = false,
    success = false,
    info = false,
    icon,
    children,
    ...restProps
  }: Props = $props();

  const style = $derived(
    injectVars(restProps, "button", ["bg", "fg", "padding", "width", "height"]),
  );


</script>

<button
  {style}
  class:primary
  class:secondary
  class:warning
  class:danger
  class:success
  class:info
  class:has-icon={icon}
  {...restProps}
>
  <span class="content">{@render children?.()}</span>
  {#if icon}
    <span class="icon">
      {@render icon()}
    </span>
  {/if}
</button>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

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
    @include typography-props-bare(button, ui, control);
    @include clickable(button, clickable);
    @include focusable();
    margin: var-with-fallbacks(--margin, button, control, var(--space));
  }
  button.primary {
    @include color-props(primary, button, control);
    @include typography-props-bare(primary, button, ui, control);
    @include clickable(primary, button, clickable);
  }
  button.warning {
    @include color-props(warning, button, control);
    @include typography-props-bare(warning, button, ui, control);
    @include clickable(warning, button, clickable);
  }
  button.danger {
    @include color-props(danger, button, control);
    @include typography-props-bare(danger, button, ui, control);
    @include clickable(danger, button, clickable);
  }
  button.success {
    @include color-props(success, button, control);
    @include typography-props-bare(success, button, ui, control);
    @include clickable(success, button, clickable);
  }
  button.info {
    @include color-props(info, button, control);
    @include typography-props-bare(info, button, ui, control);
    @include clickable(info, button, clickable);
  }
  .icon {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

</style>
