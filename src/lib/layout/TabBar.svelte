<script lang="ts">
  export let sticky: boolean = false;
  import Bar from "$lib/layout/Bar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import { createEventDispatcher } from "svelte";
  type Item = { label: string; value: string };
  export let active: string | Item | null = null;
  export let items: (string | Item)[] = [];

  // dispatch a change event whenever active changes
  const dispatch = createEventDispatcher();
  function setValue(value: any) {
    active = value;
    dispatch("change", { value });
  }
</script>

<div class="tabs" class:sticky>
  <Bar
    padding="0"
    borderTop="none"
    --button-height="var(--tab-bar-height, 3em)"
  >
    {#each items as item}
      {@const value = item.value || item}
      {@const label = item.label || item}
      <TabItem active={value === active} on:click={() => setValue(value)}>
        {label}
      </TabItem>
    {/each}
    <slot />
  </Bar>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div > :global(.bar),
  /* Account for display: contents div inserted by
  svelte to inject css variables */
  div > :global(div > .bar) {
    @include color-props(tab-bar, bar, container);
    justify-content: var-with-fallbacks(--justify, tab-bar, flex-start);
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
