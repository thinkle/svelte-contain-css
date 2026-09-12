<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
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
    HTMLAnchorAttributes,
    {
      primary?: boolean;
      secondary?: boolean;
      warning?: boolean;
      danger?: boolean;
      success?: boolean;
      info?: boolean;
      href?: string;
      id?: string | null;
      icon?: Snippet;
      children?: Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof BUTTON_LINK_VARS>
  >;

  let {
    primary = false,
    secondary = false,
    warning = false,
    danger = false,
    success = false,
    info = false,
    href = "#",
    id = null,
    icon,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands button's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const BUTTON_LINK_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "button", [
      ...BUTTON_LINK_VARS,
      "width",
      "height",
    ]),
  );

  const iconSlotted = $derived(Boolean(icon));
</script>

<a
  role="button"
  {href}
  id={id ?? undefined}
  class={className}
  class:primary
  class:secondary
  class:warning
  class:danger
  class:success
  class:info
  class:has-icon={iconSlotted}
  {...el}
>
  <span class="content">{@render children?.()}</span>
  <span class:hidden={!iconSlotted} class="icon">
    {@render icon?.()}
  </span>
</a>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

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
    @include typography-props-bare(button, ui, control);
    @include clickable(button, clickable);
    @include focusable();
    text-decoration: none;
    margin: var-with-fallbacks(--margin, button, control, var(--space));
  }
  a[role="button"]:hover {
    text-decoration: none;
    /* Override other link styles that may be outside
    us */
    /* @include color-props(button, control, secondary); */
  }

  a.primary[role="button"]:hover {
    @include color-props(primary, button, control, secondary);
  }
  a.primary {
    @include color-props(primary, button, control, secondary);
    @include typography-props-bare(primary, button, ui, control);
  }
  a.warning {
    @include color-props(warning, a, control);
    @include typography-props-bare(warning, button, ui, control);
  }
  a.danger {
    @include color-props(danger, a, control);
    @include typography-props-bare(danger, button, ui, control);
  }
  a.success {
    @include color-props(success, a, control);
    @include typography-props-bare(success, button, ui, control);
  }
  a.info {
    @include color-props(info, a, control);
    @include typography-props-bare(info, button, ui, control);
  }
</style>
