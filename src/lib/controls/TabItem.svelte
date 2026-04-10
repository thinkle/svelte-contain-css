<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";
  import Button from "./Button.svelte";

  type Props = {
    active?: boolean;
    icon?: Snippet;
    children?: Snippet;
  } & BaseStyleProps &
    HTMLAttributes<HTMLButtonElement>;

  const { active = false, icon, children, ...restProps }: Props = $props();

  const style = $derived(
    injectVars(restProps, "tab", ["bg", "fg", "padding", "width", "height"]),
  );
</script>

<div class="tab" class:active {style}>
  <Button primary={active} {icon} {...restProps}>
    {@render children?.()}
  </Button>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  div,
  span {
    display: contents;
  }
  div > :global(button),
  div > :global(div > button) {
    @include color-props(tab, button, control, secondary);
    @include box-props(tab, button, control, secondary);
    @include typography-props(tab, button, ui, control, secondary);
    @include focusable();
    border-radius: var(
      --tab-border-radius,
      var(--border-radius) var(--border-radius) 0 0
    );
    margin: 0;
  }
  div.active > :global(button),
  div.active > :global(div > button) {
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
