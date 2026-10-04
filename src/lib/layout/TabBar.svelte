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
      /**
       * Controls that belong to the tab row but aren't tabs -- a Refresh
       * button, a "New..." action. They sit at the end of the row when there
       * is room, and on their own row above the tabs in the small tier (see
       * the -small variables), so they never squeeze the tabs or stack into
       * a tall column beside them on a phone.
       */
      actions?: import("svelte").Snippet;
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
    actions,
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

{#snippet strip()}
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
    --bar-border-bottom={actions
      ? "none"
      : "var(--tab-bar-border-bottom, var(--border-width) var(--border-style) var(--border-color))"}
    --bar-margin-block={actions ? "0" : undefined}
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
{/snippet}

<div
  class={["tabs", className]}
  class:sticky
  class:wrap-tabs={wrap}
  class:has-actions={!!actions}
  {...el}
>
  {#if actions}
    <!-- The strip and the actions share the row; the underline moves to
         the whole row so it runs under both. -->
    <div class="tab-strip">{@render strip()}</div>
    <div class="tab-actions">{@render actions()}</div>
  {:else}
    {@render strip()}
  {/if}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  div > :global(.bar),
  /* The Bar is handed CSS variables, so Svelte 5 wraps it in a
     display: contents <svelte-css-wrapper> (Svelte 4 used a <div>, which is
     all this used to match -- so none of it applied after the migration). */
  div > :global(svelte-css-wrapper > .bar) {
    @include color-props(tab-bar, bar, surface);
    @include typography-props-bare(tab-bar, bar, surface);

    align-items: var-with-fallbacks(--align, tab-bar, flex-end);
    border-bottom: var(
      --tab-bar-border-bottom,
      var(--border-width) var(--border-style) var(--border-color)
    );
    border-left: var(--tab-bar-border-left, none);
    border-right: var(--tab-bar-border-right, none);
    border-top: var(--tab-bar-border-top, none);
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
  /* The scroll also goes in through --bar-overflow on the Bar itself (x
     scrolls, y clipped), so it holds even where a consumer's own CSS beats
     the rule above. */
  .wrap-tabs {
    --tab-bar-wrap: wrap;
  }

  .has-actions {
    display: flex;
    align-items: flex-end;
    gap: var-with-fallbacks(--gap, tab-bar, var(--space-md, 8px));
    border-bottom: var(
      --tab-bar-border-bottom,
      var(--border-width) var(--border-style) var(--border-color)
    );
    margin-block: var(--tab-bar-margin-block, 0 1em);
  }
  /* The strip takes the room and gives way first: min-width 0 lets it
     shrink below its tabs' width, at which point it scrolls (above). */
  .tab-strip {
    flex: 1 1 auto;
    min-width: 0;
  }
  /* The row carries the underline; the strip's own (from the rule above)
     would double it and stop short of the actions. */
  .tab-strip > :global(svelte-css-wrapper > .bar),
  .tab-strip > :global(.bar) {
    border-bottom: none;
  }
  .tab-actions {
    flex: 0 1 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: var-with-fallbacks(--gap, tab-bar-actions, var(--space-md, 8px));
    padding-block-end: var-with-fallbacks(
      --padding,
      tab-bar-actions,
      var(--space-sm, 4px)
    );
  }
  /* Small tier: actions get their own row, above the tabs, so the tabs stay
     attached to the panel they switch. */
  @include when-small {
    .has-actions {
      flex-direction: column-reverse;
      align-items: stretch;
    }
    .tab-actions {
      justify-content: flex-start;
    }
  }
  .sticky {
    position: sticky;
    top: calc(-1 * var-with-fallbacks(--padding, surface, block, 8px));
    background-color: var-with-fallbacks(--bg, tab-bar, white);
  }
</style>
