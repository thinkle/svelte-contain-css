<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import Button from "./Button.svelte";

  type Props = ContainProps<
    HTMLAttributes<HTMLButtonElement>,
    {
      active?: boolean;
      icon?: Snippet;
      children?: Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof TAB_ITEM_VARS>
  >;

  const {
    active = false,
    icon,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* Everything goes to the Button, not to the wrapper. The wrapper is
     `display: contents`, so it generates no box -- a caller's `style` put
     there would be silently inert. The variables work on the Button too:
     `.tab > button`'s rules read --tab-bg and friends, and a custom property
     resolves on the element it is declared on. */
  /* The shorthands tab's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const TAB_ITEM_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "tab", [
      ...TAB_ITEM_VARS,
      "width",
      "height",
    ]),
  );
</script>

<div class="tab" class:active>
  <Button primary={active} {icon} class={className} {...el}>
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
