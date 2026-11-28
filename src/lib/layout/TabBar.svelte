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

  /* ---- Sliding indicator ------------------------------------------------
     One element, inside the Bar (the scrolling box), so scrolling moves it
     with the tabs for free. It is only ever painted when
     --tab-indicator-height is above 0 (see underlined-tabs.css); otherwise
     it is a 0px-high, invisible span and nothing else changes.

     TabBar is not told which tab is active (tabs are children, and TabItem's
     `active` is its own prop), so it reads it back from the DOM: the
     `.tab.active` wrapper. Measuring uses bounding rects, converted to the
     Bar's own scroll-content coordinates, and places the indicator with
     transform + width. Those are physical (left/top) coordinates on
     purpose: in a right-to-left bar the rects, scrollLeft and the
     absolutely-positioned indicator all use the same physical axis, so one
     formula serves both directions and no dir check is needed. */
  let root = $state<HTMLElement | null>(null);
  let indicator = $state<HTMLElement | null>(null);
  let live = $state(false);

  $effect(() => {
    if (!root || !indicator) return;
    const ind = indicator;
    const bar = root.querySelector<HTMLElement>(".bar");
    if (!bar) return;

    let lastTab: Element | null = null;
    let lastY: number | null = null;
    let lastKey = "";
    let measureQueued = false;

    /* Apply a change with no transition: toggle `quiet`, flush styles, and
       restore. Used for the first placement, for tabs shifting under the
       active one (added, removed, resized), and for a hop between rows of a
       wrapped bar. */
    function quietly(fn: () => void, className = "quiet") {
      ind.classList.add(className);
      fn();
      void ind.offsetWidth;
      ind.classList.remove(className);
    }

    function measure() {
      measureQueued = false;
      const height = ind.offsetHeight;
      const tab = bar!.querySelector(".tab.active");
      /* Live = it is switched on (height > 0) and there is something to
         underline. Only then does the preset hide its static underline. */
      const isLive = height > 0;
      if (isLive !== live) live = isLive;
      const buttons = tab ? [...tab.querySelectorAll("button")] : [];
      if (!tab || !buttons.length) {
        ind.dataset.hidden = "";
        lastTab = null;
        lastY = null;
        lastKey = "";
        return;
      }
      /* The union of the tab's buttons: a closable tab spans both. The
         `.tab` wrapper itself is display: contents for a plain tab. */
      let left = Infinity,
        right = -Infinity,
        bottom = -Infinity;
      for (const b of buttons) {
        const r = b.getBoundingClientRect();
        left = Math.min(left, r.left);
        right = Math.max(right, r.right);
        bottom = Math.max(bottom, r.bottom);
      }
      const barRect = bar!.getBoundingClientRect();
      const x = left - barRect.left - bar!.clientLeft + bar!.scrollLeft;
      const y = bottom - barRect.top - bar!.clientTop + bar!.scrollTop - height;
      /* The tab's color, read off the tab and handed to the indicator. A
         bare --tab-indicator-color is taken as given; with
         --tab-indicator-tint-amount it becomes a target instead, mixed into
         the indicator's own foreground in the CSS below -- the same shape
         as a heading tint or a link, and for the same reason: a color that
         suits a tab's own fill is not necessarily readable against the bar.
         The mix is left to CSS so that currentColor resolves where the
         indicator sits, not where the tab does (an active tab may carry a
         role's foreground of its own). */
      const tabStyle = getComputedStyle(buttons[0]);
      const color = tabStyle.getPropertyValue("--tab-indicator-color").trim() || tabStyle.color;
      const amount = tabStyle.getPropertyValue("--tab-indicator-tint-amount").trim();
      const key = `${x}|${y}|${right - left}|${color}|${amount}`;
      const place = () => {
        ind.style.transform = `translate(${x}px, ${y}px)`;
        ind.style.width = `${right - left}px`;
        ind.style.setProperty("--_tab-indicator-color", color);
        /* Only when an amount was asked for: the mix is written here, on the
           indicator, so its currentColor is the foreground the indicator
           inherits. Without one the color is passed through untouched --
           not mixed with itself, which would hold a visually identical
           color but serialize it as color(srgb ...) for everyone. */
        if (amount) {
          ind.style.setProperty(
            "--_tab-indicator-mix",
            `color-mix(in srgb, currentColor, ${color} ${amount})`
          );
        } else {
          ind.style.removeProperty("--_tab-indicator-mix");
        }
        delete ind.dataset.hidden;
      };
      if (tab !== lastTab) {
        /* The active tab changed: slide, unless this is the first placement
           (or it was hidden), or it moved to another row. */
        const first = lastTab === null;
        const rowChange = lastY !== null && Math.abs(lastY - y) > 1;
        if (first) quietly(place);
        else if (rowChange) quietly(place, "jump");
        else place();
      } else if (key !== lastKey) {
        /* Same tab, new geometry: the layout moved under it. (Same geometry
           means an observer echoing a slide already under way: leave it.) */
        quietly(place);
      }
      lastTab = tab;
      lastY = y;
      lastKey = key;
    }
    /* Coalesce bursts (a MutationObserver and ResizeObserver firing for one
       change) into one measurement, but before paint where possible. */
    function queue() {
      if (measureQueued) return;
      measureQueued = true;
      queueMicrotask(measure);
    }

    const resizes = new ResizeObserver(queue);
    const observed = new Set<Element>();
    function syncObserved() {
      const now = new Set<Element>([bar!, ind, ...bar!.querySelectorAll("button")]);
      for (const el of observed) if (!now.has(el)) (resizes.unobserve(el), observed.delete(el));
      for (const el of now) if (!observed.has(el)) (resizes.observe(el), observed.add(el));
    }
    const mutations = new MutationObserver((records) => {
      /* The indicator's own inline style changes are not news. */
      if (records.every((r) => r.target === ind)) return;
      syncObserved();
      queue();
    });
    mutations.observe(bar, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    syncObserved();
    measure();

    /* A late font changes every tab's width without resizing the bar. */
    const fonts = (document as Document).fonts;
    fonts?.ready.then(queue);
    fonts?.addEventListener?.("loadingdone", queue);
    return () => {
      resizes.disconnect();
      mutations.disconnect();
      fonts?.removeEventListener?.("loadingdone", queue);
      measureQueued = true; // a pending microtask must not touch a dead node
    };
  });
</script>

{#snippet strip()}
  <Bar
    padding="0"
    --button-height="var(--tab-bar-height, 3em)"
    --bar-justify="var(--tab-bar-justify, start)"
    --bar-gap="var(--tab-bar-gap, var(--space-md))"
    --bar-fg="var(--_tab-strip-fg)"
    --bar-bg="var(--_tab-strip-bg)"
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
    <!-- Decoration only: the active tab is announced by the tab itself. -->
    <span class="tab-indicator" bind:this={indicator} aria-hidden="true"></span>
  </Bar>
{/snippet}

<div
  class={["tabs", className]}
  class:sticky
  class:wrap-tabs={wrap}
  class:has-actions={!!actions}
  class:tab-indicator-live={live}
  bind:this={root}
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
  .tabs {
    /* Snapshot the host's public pair before Bar publishes its own. These
       must inherit through the CSS wrapper: reading --current-bg on the
       colored Bar itself would make its background depend on itself. */
    --_tab-host-bg: var(--current-bg);
    --_tab-host-fg: var(--current-fg);
    --_tab-strip-bg: var(--tab-bar-bg, var(--bar-bg, var(--_tab-host-bg)));
    --_tab-strip-fg: var(--tab-bar-fg, var(--bar-fg, var(--_tab-host-fg)));
  }
  div > :global(.bar),
  /* The Bar is handed CSS variables, so Svelte 5 wraps it in a
     display: contents <svelte-css-wrapper> (Svelte 4 used a <div>, which is
     all this used to match -- so none of it applied after the migration). */
  div > :global(svelte-css-wrapper > .bar) {
    @include color-props(tab-bar, bar, surface);
    @include typography-props-bare(tab-bar, bar, ui);

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
  /* The sliding indicator (see the script). It lives in the scrolling Bar,
     which therefore has to be the box its absolute position is measured
     from. Hidden-by-size by default: --tab-indicator-height is 0 until
     vars/underlined-tabs.css (or the app) sets it. */
  :global(.tabs .bar) {
    position: relative;
  }
  .tab-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: var(--tab-indicator-height, 0);
    pointer-events: none;
    /* The color exactly as the tab gave it, unless --tab-indicator-tint-amount
       asked for a tint, in which case TabBar writes the mix above. */
    background-color: var(--_tab-indicator-mix, var(--_tab-indicator-color, currentColor));
    --_tab-indicator-transition: var(--tab-indicator-transition, 350ms ease-out);
    /* Color travels with the slide, so mid-way it is a blend of the two
       tabs' colors. */
    transition:
      transform var(--_tab-indicator-transition),
      width var(--_tab-indicator-transition),
      background-color var(--_tab-indicator-transition);
  }
  /* First placement and tabs shifting under the active one: no animation. */
  .tab-indicator:global(.quiet) {
    transition: none;
  }
  /* A hop between rows of a wrapped bar jumps, but still blends color. */
  .tab-indicator:global(.jump) {
    transition-property: background-color;
  }
  .tab-indicator[data-hidden] {
    visibility: hidden;
  }
  @media (prefers-reduced-motion: reduce) {
    .tab-indicator {
      transition: none;
    }
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
    background-color: var(--tab-bar-bg, var(--_tab-host-bg));
  }
</style>
