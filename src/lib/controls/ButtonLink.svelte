<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";

  let {
    primary = false,
    secondary = false,
    warning = false,
    href = "#",
    id = null,
    icon,
    children,
    ...restProps
  }: {
    primary?: boolean;
    secondary?: boolean;
    warning?: boolean;
    href?: string;
    id?: string | null;
    icon?: Snippet;
    children?: Snippet;
  } & Record<string, unknown> = $props();

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
    ])}${inlineStyle ?? ""}`
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
  class:has-icon={iconSlotted}
  {...elementProps}
>
  <span class="content">{@render children?.()}</span>
  <span class:hidden={!iconSlotted} class="icon">
    {@render icon?.()}
  </span>
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
    /* Override other link styles that may be outside
    us */
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
    @include color-props(warning, a, control);
    @include typography-props-bare(warning, a);
  }
</style>
