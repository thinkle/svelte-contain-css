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
      /**
       * Let tabs that don't fit wrap onto another row. By default the tab
       * strip stays one row and scrolls sideways when it runs out of room,
       * which keeps the active tab attached to its panel; wrapping suits a
       * long set of short, filter-like tabs where seeing them all at once
       * matters more. Same as setting --tab-bar-wrap: wrap.
       */
      wrap?: boolean;
      active?: string | Item | null;
      items?: (string | Item)[];
      onchange?: (value: string | Item | null) => void;
      children?: import("svelte").Snippet;
    },
    StyleProps<typeof TAB_BAR_VARS>
  >;

  let {
    sticky = false,
    wrap = false,
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

<div class={["tabs", className]} class:sticky class:wrap-tabs={wrap} {...el}>
  <Bar
    padding="0"
    --button-height="var(--tab-bar-height, 3em)"
    --bar-justify="var(--tab-bar-justify, start)"
    --bar-gap="var(--tab-bar-gap, var(--space-md))"
    --bar-fg="var(--tab-bar-fg, var(--bar-fg))"
    --bar-bg="var(--tab-bar-bg, var(--bar-bg))"
    --bar-align="var(--tab-bar-align, flex-end)"
    --bar-overflow="var(--tab-bar-overflow, auto hidden)"
    --bar-wrap="var(--tab-bar-wrap, nowrap)"
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
    /* Tabs stay one strip. When they don't all fit -- four tabs on a phone --
       the strip scrolls sideways rather than dropping the last tab onto a
       second row, which reads as a broken tab set (the second row floats
       under the active tab's baseline). `wrap` (or --tab-bar-wrap: wrap)
       brings wrapping back. */
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
  }
  /* Svelte 5 wraps a component given CSS variables in <svelte-css-wrapper>,
     not a <div>, so the selectors above don't reach the Bar here. The
     sideways scroll that matters on a phone therefore also goes in through
     --bar-overflow on the Bar itself (x scrolls, y clipped). */
  .wrap-tabs {
    --tab-bar-wrap: wrap;
  }
  .sticky {
    position: sticky;
    top: calc(-1 * var-with-fallbacks(--padding, surface, block, 8px));
    background-color: var-with-fallbacks(--bg, tab-bar, white);
  }
</style>
