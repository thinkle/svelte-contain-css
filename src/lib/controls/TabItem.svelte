<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { splitProps } from "$lib/util";
  import Button from "./Button.svelte";

  type Props = ContainProps<
    HTMLAttributes<HTMLButtonElement>,
    {
      active?: boolean;
      icon?: Snippet;
      children?: Snippet;
    },
    BaseStyleProps
  >;

  const {
    active = false,
    icon,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The wrapper is `display: contents` and exists only to scope the tab's CSS
     onto the Button inside it, so the variables belong on it while every
     attribute is forwarded to the Button. */
  const el = $derived(
    splitProps(restProps, "tab", ["bg", "fg", "padding", "width", "height"]),
  );
</script>

<div class="tab" class:active style={el.style}>
  <Button primary={active} {icon} class={className} {...el.attrs}>
    {@render children?.()}
  </Button>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  .tab {
    display: contents;
  }
  .tab > :global(button),
  .tab > :global(div > button) {
    @include color-props(tab, button, control, secondary);
    @include box-props(tab, button, control, secondary);
    @include typography-props(tab, button, ui, control, secondary);
    // Tab bar clips overflow, so the standard outer focus ring would be cut
    // off -- use the inset ring instead. See _affordances.scss.
    @include focusable-inset(tab);
    border-radius: var(
      --tab-border-radius,
      var(--border-radius) var(--border-radius) 0 0
    );
    margin: 0;
  }
  .tab.active > :global(button),
  .tab.active > :global(div > button) {
    @include color-props(tab-active, primary, tab, button, control, secondary);
    @include typography-props(
      tab-active,
      tab,
      button,
      ui,
      control,
      secondary
    );
  }
</style>
