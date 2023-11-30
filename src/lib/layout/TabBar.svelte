<script lang="ts">
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

<div class="tabs">
  <Bar padding="0" borderTop="none">
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
  div {
    --bar-padding-bottom: 0;
    --bar-border-bottom: var(
      --tab-bar-border-bottom,
      var(--bar-border-bottom, var(--border))
    );
    --bar-border-top: var(--tab-bar-border-top, none);
    --bar-justify: start;
    --bar-align: end;
  }
</style>
