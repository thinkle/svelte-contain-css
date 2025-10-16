<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";

  type Item = { label: string; value: string };
  interface Props {
    sticky?: boolean;
    active?: string | Item | null;
    items?: (string | Item)[];
    onchange: (value: string | Item | null) => void;
    children?: import("svelte").Snippet;
  }

  let {
    sticky = false,
    active = $bindable(null),
    items = [],
    onchange,
    children,
  }: Props = $props();

  let lastActive = $state(active);
</script>

<div class="tabs" class:sticky>
  <Bar
    padding="0"
    borderTop="none"
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
      {@const value = item.value || item}
      {@const label = item.label || item}
      <TabItem active={value === active} onclick={() => onchange(value)}>
        {label}
      </TabItem>
    {/each}
    {@render children?.()}
  </Bar>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div > :global(.bar),
  /* Account for display: contents div inserted by
  svelte to inject css variables */
  div > :global(div > .bar) {
    @include color-props(tab-bar, bar, container);

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
    top: calc(-1 * var-with-fallbacks(--padding, container, block, 8px));
    background-color: var-with-fallbacks(--bg, tab-bar, white);
  }
</style>
