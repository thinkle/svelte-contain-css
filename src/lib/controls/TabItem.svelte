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
      /**
       * When set, the tab shows a close button beside its own button (a
       * sibling, never nested inside it), like a browser or editor tab. The
       * Delete key on the focused tab and a middle-click on it call this
       * too. Clicking the close button does not activate the tab.
       */
      onclose?: (() => void) | null;
      /**
       * Accessible name for the close button.
       *
       * The default describes the widget ("close a tab"), which does not tell
       * a screen-reader user WHICH tab: name the thing, as in
       * `closeLabel="Close Brandy Balls"`. Several closable tabs in a row all
       * announcing "Close tab" are indistinguishable.
       */
      closeLabel?: string;
    },
    BaseStyleProps &
      StyleProps<typeof TAB_ITEM_VARS>
  >;

  const {
    active = false,
    icon,
    children,
    onclose = null,
    closeLabel = "Close tab",
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

  /* Delete and middle-click close a closable tab. They compose with a
     caller's own handlers rather than replacing them: the caller's runs
     first and can veto by calling preventDefault(). */
  function onkeydown(e: KeyboardEvent) {
    (restProps as any).onkeydown?.(e);
    if (!e.defaultPrevented && e.key === "Delete" && onclose) {
      e.preventDefault();
      onclose();
    }
  }
  function onauxclick(e: MouseEvent) {
    (restProps as any).onauxclick?.(e);
    if (!e.defaultPrevented && e.button === 1 && onclose) {
      e.preventDefault();
      onclose();
    }
  }
  /* Middle-press starts autoscroll on some platforms; the tab owns it. */
  function onmousedown(e: MouseEvent) {
    (restProps as any).onmousedown?.(e);
    if (e.button === 1 && onclose) e.preventDefault();
  }
</script>

{#if onclose}
  <!-- Two sibling buttons in a real box, so the pair reads as one tab. -->
  <div class="tab closable" class:active>
    <Button
      primary={active}
      {icon}
      class={className}
      {...el}
      {onkeydown}
      {onauxclick}
      {onmousedown}
    >
      {@render children?.()}
    </Button>
    <Button
      primary={active}
      class="tab-close-button"
      style={el.style as string | undefined}
      aria-label={closeLabel}
      onclick={() => onclose?.()}
    >
      <span class="x" aria-hidden="true">&times;</span>
    </Button>
  </div>
{:else}
  <div class="tab" class:active>
    <Button primary={active} {icon} class={className} {...el}>
      {@render children?.()}
    </Button>
  </div>
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  .tab {
    display: contents;
    /* Recess the inactive tab from the actual strip, not the page's fixed
       control palette. Resolve on this wrapper before Button replaces the
       public --current-* pair with its own. */
    --_tab-recessed-bg: color-mix(
      in oklab,
      var(--current-bg),
      var(--current-fg) var(--tab-recess-amount, 6%)
    );
    /* Equal border space in both states keeps the label and tab width
       steady. The selected fill joins the panel; its edge preserves the
       rounded tab silhouette against an otherwise identical strip. */
    --_tab-shape-border: 1px solid transparent;
    --_tab-selected-border: 1px solid color-mix(
      in oklab, var(--current-fg) 25%, transparent
    );
    --_tab-selected-border-bottom: 1px solid transparent;
  }
  .tab > :global(button),
  .tab > :global(div > button) {
    @include color-props(tab, _tab-recessed, ground);
    @include box-props(tab, button, control);
    @include border-props-borderless(tab, _tab-shape, button, control);
    @include typography-props(tab, button, ui);
    // Border width and style snap on selection. Match their timing so a
    // border becoming visible can't briefly paint the previous state's color.
    --_border-color-transition: 0s;
    // Tab bar clips overflow, so the standard outer focus ring would be cut
    // off -- use the inset ring instead. See _affordances.scss.
    @include focusable-inset(tab);
    border-radius: var(
      --tab-border-radius,
      var(--border-radius) var(--border-radius) 0 0
    );
    margin: 0;
    /* In a TabBar that scrolls, a tab keeps its label on one line and its
       full width; squeezing the labels is what made them wrap. */
    flex-shrink: 0;
    white-space: nowrap;
  }
  /* An inactive tab answers the pointer like any button; --tab-hover-bg and
     --tab-hover-fg change how (a text-only hover keeps --tab-bg). */
  .tab:not(.active) > :global(button),
  .tab:not(.active) > :global(div > button) {
    @include clickable(tab, button, control);
  }
  .tab.active > :global(button),
  .tab.active > :global(div > button) {
    /* The selected tab joins its panel's surface. Explicit theme colors
       still win, but there is no implicit white fill or primary surface. */
    @include color-props(tab-active, tab, ground);
    @include border-props-borderless(tab-active, tab, _tab-selected, button, control);
    @include typography-props(tab-active, tab, button, ui);
  }

  /* ---- Closable tab ----------------------------------------------------
     Two sibling buttons share one box. Both take the tab's own color rules
     above (each is a direct button child of .tab), so inactive/active fills,
     text and borders match by construction; what remains is making the pair
     one silhouette and one hover. */
  .tab.closable {
    display: flex;
    align-items: stretch;
    /* Like the tab button: never squeezed in a scrolling TabBar. */
    flex-shrink: 0;
  }
  .tab.closable > :global(button:first-child) {
    padding-inline-end: var(--tab-close-button-gap, 0.25em);
    border-inline-end-width: 0;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  .tab.closable > :global(button.tab-close-button) {
    position: relative;
    padding-inline: var(--tab-close-button-gap, 0.25em);
    /* WCAG 2.5.8 / Tag: at least a 24px target. */
    min-inline-size: 24px;
    border-inline-start-width: 0;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    @include clickable-cursor(tab-close-button, button);
  }
  /* One hover for the pair: hovering either half lights both, with the same
     declarations each button's own :hover/:active uses. */
  .tab.closable:not(.active):hover > :global(button) {
    @include clickable-hover-affordance(tab, button, control);
  }
  .tab.closable:not(.active):active > :global(button) {
    @include clickable-active-affordance(tab, button, control);
  }
  .tab.closable.active:hover > :global(button) {
    @include clickable-hover-affordance(primary, button, clickable);
  }
  .tab.closable.active:active > :global(button) {
    @include clickable-active-affordance(primary, button, clickable);
  }
  .tab.closable > :global(button.tab-close-button .x) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: var(--tab-close-button-size, 1.25em);
    block-size: var(--tab-close-button-size, 1.25em);
    line-height: 1;
  }
  /* The affordance is a scrim mixed from the tab's own foreground, as in
     Tag, so it inverts correctly on any tab color. */
  .tab.closable > :global(button.tab-close-button)::before {
    content: "";
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    translate: -50% -50%;
    inline-size: var(--tab-close-button-size, 1.25em);
    block-size: var(--tab-close-button-size, 1.25em);
    border-radius: var(--tab-close-button-border-radius, 50%);
    background-color: transparent;
    transition: background-color
      var(--tab-close-button-transition, var(--transition, 150ms));
  }
  .tab.closable > :global(button.tab-close-button:hover)::before,
  .tab.closable > :global(button.tab-close-button:focus-visible)::before {
    background-color: var(
      --tab-close-button-hover-bg,
      color-mix(in oklab, transparent, currentColor 18%)
    );
  }
  .tab.closable > :global(button.tab-close-button:active)::before {
    background-color: var(
      --tab-close-button-active-bg,
      color-mix(in oklab, transparent, currentColor 30%)
    );
  }
  /* The TabBar clips overflow: keep the ring inside the button (inset), and
     drop Button's outer spread shadow, which the clip would cut off. */
  .tab.closable > :global(button.tab-close-button:focus-visible) {
    box-shadow: none;
  }
</style>
