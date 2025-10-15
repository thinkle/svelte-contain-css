<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";
  import Button from "./Button.svelte";

  const {
    active = false,
    icon,
    children,
    ...restProps
  }: {
    active?: boolean;
    icon?: Snippet;
    children?: Snippet;
  } & Record<string, unknown> = $props();

  const style = $derived(
    injectVars(restProps, "tab", ["bg", "fg", "padding", "width", "height"])
  );
</script>

<div class="tab" class:active {style} {...restProps}>
  <Button primary={active} {icon}>
    {@render children?.()}
  </Button>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div,
  span {
    display: contents;
  }
  div > :global(button),
  div > :global(div > button) {
    @include color-props(tab, button, control, secondary);
    @include box-props(tab, button, control, secondary);
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
  }
</style>
