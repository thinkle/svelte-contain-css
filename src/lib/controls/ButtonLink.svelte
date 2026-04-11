<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
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
  } & BaseStyleProps &
    HTMLAnchorAttributes;

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
    ...restProps
  }: Props = $props();

  const { style: inlineStyle, ...elementProps } = restProps as {
    style?: string;
  } & Record<string, unknown>;

  const style = $derived(
    `${injectVars(elementProps, "button", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
    ])}${inlineStyle ?? ""}`,
  );

  const iconSlotted = $derived(Boolean(icon));
</script>

<a
  role="button"
  {style}
  {href}
  id={id ?? undefined}
  class:primary
  class:secondary
  class:warning
  class:danger
  class:success
  class:info
  class:has-icon={iconSlotted}
  {...elementProps}
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
