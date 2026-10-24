<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLButtonAttributes,
    {
      primary?: boolean;
      secondary?: boolean;
      warning?: boolean;
      danger?: boolean;
      success?: boolean;
      info?: boolean;
      icon?: Snippet;
      children?: Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof BUTTON_VARS>
  >;

  let {
    primary = false,
    secondary = false,
    warning = false,
    danger = false,
    success = false,
    info = false,
    icon,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands button's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const BUTTON_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "button", [
      ...BUTTON_VARS,
      "width",
      "height",
    ]),
  );
</script>

<button
  class={className}
  class:primary
  class:secondary
  class:warning
  class:danger
  class:success
  class:info
  class:has-icon={icon}
  {...el}
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
    /* A button is as wide as its label, wherever it lands -- including a
       flex column or grid (Stack, a form grid) that would otherwise stretch
       it edge to edge. Ask for a wide one with width="100%". Contexts that
       want full-width buttons (MenuList rows) set their own width through
       their own variable, which outranks this. */
    width: var(--button-width, fit-content);
    /* ...and never wider than the space its margins leave, so
       width="100%" fits instead of overflowing by the margin. Same cap as
       Card; the prefixed lines cover browsers that only know the old
       keyword. */
    max-width: 100%;
    max-width: -moz-available;
    max-width: -webkit-fill-available;
    max-width: stretch;
    height: var(--button-height);
    @include box-props(button, control, secondary);
    @include border-props-borderless(button);
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
