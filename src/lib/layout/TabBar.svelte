<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Item = { label: string; value: string };
  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      sticky?: boolean;
      active?: string | Item | null;
      items?: (string | Item)[];
      onchange?: (value: string | Item | null) => void;
      children?: import("svelte").Snippet;
    },
    StyleProps<typeof TAB_BAR_VARS>
  >;

  let {
    sticky = false,
    active = $bindable(null),
    items = [],
    onchange,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands this component's own CSS backs, one group per mixin
     it includes. The Props type is derived from this same array, so what
     the component accepts and what it emits cannot drift apart. */
  const TAB_BAR_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(elementProps(restProps, "tab-bar", TAB_BAR_VARS));

  let lastActive = $state(active);
</script>

<div class={["tabs", className]} class:sticky {...el}>
  <Bar
    padding="0"
    --button-height="var(--tab-bar-height, 3em)"
    --bar-justify="var(--tab-bar-justify, start)"
    --bar-gap="var(--tab-bar-gap, var(--space-md))"
    --bar-fg="var(--tab-bar-fg, var(--bar-fg))"
    --bar-bg="var(--tab-bar-bg, var(--bar-bg))"
    --bar-align="var(--tab-bar-align, flex-end)"
    --bar-overflow="hidden"
    --bar-border-left="var(--tab-bar-border-left, none)"
    --bar-border-right="var(--tab-bar-border-right, none)"
    --bar-border-top="var(--tab-bar-border-top, none)"
    --bar-border-bottom="var(--tab-bar-border-bottom, var(--border-width) var(--border-style) var(--border-color))"
  >
    {#each items as item}
      {@const value = typeof item === "string" ? item : item.value}
      {@const label = typeof item === "string" ? item : item.label}
      <TabItem
        active={value === active}
        onclick={() => {
          if (onchange) onchange(value);
          active = value;
        }}
      >
        {label}
      </TabItem>
    {/each}
    {@render children?.()}
  </Bar>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  div > :global(.bar),
  /* Account for display: contents div inserted by
  svelte to inject css variables */
  div > :global(div > .bar) {
    @include color-props(tab-bar, bar, surface);
    @include typography-props-bare(tab-bar, bar, surface);

    align-items: var-with-fallbacks(--align, tab-bar, flex-end);
    border-bottom: var(
      --tab-bar-border-bottom,
      var(--border-width) var(--border-style) var(--border-color)
    );
    border-left: var(--tab-bar-border-left, none);
    border-right: var(--tab-bar-border-left, none);
    border-top: var(--tab-bar-border-left, none);
    gap: var(--tab-bar-gap, var(--space-md));
    overflow: hidden;
  }
  .sticky {
    position: sticky;
    top: calc(-1 * var-with-fallbacks(--padding, surface, block, 8px));
    background-color: var-with-fallbacks(--bg, tab-bar, white);
  }
</style>
