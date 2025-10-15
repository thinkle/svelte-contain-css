<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";

  let {
    primary = false,
    warning = false,
    bg = null,
    fg = null,
    padding = null,
    width = null,
    height = null,
    href = "#",
    id = null,
    icon,
    children,
    ...restProps
  }: {
    primary?: boolean;
    warning?: boolean;
    bg?: string | null;
    fg?: string | null;
    padding?: string | null;
    width?: string | null;
    height?: string | null;
    href?: string;
    id?: string | null;
    icon?: Snippet;
    children?: Snippet;
  } = $props();

  const iconSlotted = $derived(Boolean(icon));
  const style = $derived(
    injectVars({ bg, fg, padding, width, height, ...restProps }, "button", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
    ])
  );
</script>

<a
  role="button"
  {style}
  {href}
  id={id ?? undefined}
  class:primary
  class:warning
  class:has-icon={iconSlotted}
  {...restProps}
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
  a {
    width: var(--a-width);
    height: var(--a-height);
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
  a.primary {
    @include color-props(primary, a, control);
    @include typography-props-bare(primary, a);
  }
  a.warning {
    @include color-props(warning, a, control);
    @include typography-props-bare(warning, a);
  }
</style>
