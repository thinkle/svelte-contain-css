<script lang="ts">
  import { onDestroy, tick } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_CONTAINER_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  let tooltipDiv: HTMLElement | undefined = $state();
  let targetDiv: HTMLElement | undefined = $state();
  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      tooltipText?: string;
      vertical?: string;
      horizontal?: string;
      children?: import("svelte").Snippet;
      tooltip?: import("svelte").Snippet;
      block?: boolean;
      tooltipDisabled?: boolean;
      /** Applied to the popover element itself (not the boxless wrapper,
       *  which already gets the ordinary `id` via rest props) so a caller can
       *  point `aria-describedby` at the tooltip's actual content -- a
       *  keyboard or screen-reader user who can't hover never otherwise
       *  learns what the tooltip says. */
      tooltipId?: string;
    },
    StyleProps<typeof TOOLTIP_VARS>
  >;

  let {
    tooltipText = "",
    vertical = "bottom",
    horizontal = "right",
    children,
    tooltip,
    block = false,
    tooltipDisabled = false,
    tooltipId,
    class: className,
    ...restProps
  }: Props = $props();

  /* The wrapper is the element a caller is pointing at -- the tooltip itself
     is a popover the component owns and positions. */
  /* The shorthands this component's own CSS backs, one group per mixin
     it includes. The Props type is derived from this same array, so what
     the component accepts and what it emits cannot drift apart. */
  const TOOLTIP_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_CONTAINER_VARS,
  ] as const;

  /* The variables land on the wrapper and reach the popover by inheritance:
     the tooltip is a descendant of it, and custom properties inherit.
     Ordinary inherited properties (white-space, font-weight, text-align...)
     would reach it the same way from the host, which is why the popover's
     CSS resets them -- see overlay-text-reset in _typography.scss. */
  const el = $derived(elementProps(restProps, "tooltip", TOOLTIP_VARS));
  // svelte-ignore state_referenced_locally
  let renderedVertical = $state(vertical);
  // svelte-ignore state_referenced_locally
  let renderedHorizontal = $state(horizontal);

  /**
   * Tooltip content mounts on first show, not on mount. A page with many
   * tooltips (e.g. a grid of cells each carrying a rich tooltip snippet)
   * would otherwise build every tooltip's content before the user hovers
   * anything. Once shown, content stays mounted.
   */
  let hasRendered = $state(false);
  /** Guards against the pointer/focus leaving while content mounts. */
  let wantsShow = false;

  function hidePopover() {
    wantsShow = false;
    unwatchViewport();
    tooltipDiv?.togglePopover(false);
  }

  $effect(() => {
    if (tooltipDisabled) hidePopover();
  });

  /**
   * Find the rect to anchor the tooltip to.
   *
   * We can't just measure our first element child. The target wrapper is
   * `display: contents`, and so are several things that routinely end up inside
   * it — none of which generate a box of their own:
   *
   *  - `<svelte-css-wrapper>`, which Svelte injects around any component handed
   *    `--custom-property` props, e.g.
   *    `<Tooltip><Button --button-border-radius="50%" /></Tooltip>`
   *  - a consumer's own `display: contents` element
   *  - bare text or an interpolation (`<Tooltip>{score}</Tooltip>`), where there
   *    is no element to measure at all
   *
   * Measuring a boxless element yields a 0x0 rect at the viewport origin, which
   * parks the tooltip in the top-left corner of the screen; having no element at
   * all used to mean no tooltip appeared. So we drill *down* through boxless
   * wrappers, measure text with a Range, and fall back to drilling *up* to the
   * nearest ancestor with a box. A tooltip should always find an anchor.
   */
  function hasArea(rect: DOMRect) {
    return rect.width > 0 || rect.height > 0;
  }

  /** Measure an element's contents (text included) rather than the element. */
  function rectOfContents(el: Element): DOMRect | null {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rect = range.getBoundingClientRect();
    return hasArea(rect) ? rect : null;
  }

  /** An element's own box, or the first real box inside it. */
  function rectOfElement(el: Element): DOMRect | null {
    const rect = el.getBoundingClientRect();
    if (hasArea(rect)) return rect;
    for (const child of el.children) {
      const childRect = rectOfElement(child);
      if (childRect) return childRect;
    }
    return rectOfContents(el);
  }

  function resolveTargetRect(): DOMRect | null {
    if (!targetDiv) return null;
    for (const child of targetDiv.children) {
      const rect = rectOfElement(child);
      if (rect) return rect;
    }
    // No element child with a box: bare text, an interpolation, or children that
    // render to nothing. Measure the content where it sits.
    const contentRect = rectOfContents(targetDiv);
    if (contentRect) return contentRect;
    // Still nothing to measure — anchor to the nearest ancestor that has a box
    // so the tooltip lands near its target instead of not showing at all.
    let parent: HTMLElement | null = targetDiv.parentElement;
    while (parent) {
      const rect = parent.getBoundingClientRect();
      if (hasArea(rect)) return rect;
      parent = parent.parentElement;
    }
    return null;
  }

  /**
   * Place the tooltip against its target. Split out from showPopover so it can
   * re-run while the tooltip is open: the tooltip is `position: fixed` against
   * viewport coordinates, so any scroll or resize invalidates it.
   *
   * Measures the popover itself, so it must already be open -- a closed
   * popover is `display: none` and has no size. That is safe to do without a
   * flash: the popover opens, is measured and is placed in one synchronous
   * run, and the browser does not paint until it finishes. (It also measures
   * more truly than an offscreen copy could: a fixed box's width, and so its
   * wrapped height, depends on where it sits horizontally -- which is why the
   * horizontal side is placed before the height is read.)
   */
  function positionTooltip(): boolean {
    if (!tooltipDiv || !tooltipDiv.matches(":popover-open")) return false;
    const targetRect = resolveTargetRect();
    if (!targetRect) return false;
    renderedHorizontal = horizontal;
    renderedVertical = vertical;

    const tooltipGap =
      Number(
        window
          .getComputedStyle(tooltipDiv)
          .getPropertyValue("--tooltip-arrow-size")
          .replace("px", ""),
      ) || 8;

    // Horizontal first: it depends only on the target, and it decides how
    // much room the tooltip has to lay out in.
    if (
      renderedHorizontal === "left" &&
      targetRect.left < window.innerWidth / 3
    ) {
      renderedHorizontal = "right";
    } else if (
      renderedHorizontal === "right" &&
      targetRect.right > (window.innerWidth * 2) / 3
    ) {
      renderedHorizontal = "left";
    }
    if (renderedHorizontal == "right") {
      // Anchor so that the arrow center (at 2*tooltipGap from tooltip left) aligns with target center
      tooltipDiv.style.left = `${targetRect.left + targetRect.width / 2 - 2 * tooltipGap}px`;
      tooltipDiv.style.right = "unset";
    } else {
      // Anchor so that the arrow center (at 2*tooltipGap from tooltip right) aligns with target center
      tooltipDiv.style.right = `${window.innerWidth - (targetRect.left + targetRect.width / 2) - 2 * tooltipGap}px`;
      tooltipDiv.style.left = "unset";
    }

    // Now its height at the width it will actually have.
    const tooltipHeight = tooltipDiv.getBoundingClientRect().height;

    if (renderedVertical === "top" && targetRect.top < tooltipHeight + 32) {
      renderedVertical = "bottom";
    } else if (
      renderedVertical === "bottom" &&
      targetRect.bottom + tooltipHeight > window.innerHeight - 32
    ) {
      renderedVertical = "top";
    }
    // Each side clears the other's margin, or a tooltip that flips keeps a
    // stale gap on the side it left.
    if (renderedVertical === "bottom") {
      tooltipDiv.style.bottom = "unset";
      tooltipDiv.style.top = `${targetRect.top + targetRect.height}px`;
      tooltipDiv.style.marginTop = "var(--tooltipGap, 8px)";
      tooltipDiv.style.marginBottom = "";
    } else {
      tooltipDiv.style.bottom = `${window.innerHeight - targetRect.top}px`;
      tooltipDiv.style.top = "unset";
      tooltipDiv.style.marginBottom = "var(--tooltipGap, 8px)";
      tooltipDiv.style.marginTop = "";
    }
    return true;
  }

  /**
   * A fixed-position tooltip drifts away from its target the moment anything
   * scrolls, so keep re-placing it while it is open. Capture phase because
   * scroll events from a scrolling ancestor don't bubble, and rAF because a
   * scroll fires far more often than we need to move.
   */
  let repositionFrame = 0;

  function scheduleReposition() {
    if (repositionFrame) return;
    repositionFrame = requestAnimationFrame(() => {
      repositionFrame = 0;
      if (wantsShow) positionTooltip();
    });
  }

  function watchViewport() {
    window.addEventListener("scroll", scheduleReposition, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", scheduleReposition, { passive: true });
  }

  function unwatchViewport() {
    window.removeEventListener("scroll", scheduleReposition, { capture: true });
    window.removeEventListener("resize", scheduleReposition);
    if (repositionFrame) {
      cancelAnimationFrame(repositionFrame);
      repositionFrame = 0;
    }
  }

  onDestroy(() => {
    if (typeof window !== "undefined") unwatchViewport();
  });

  async function showPopover() {
    if (tooltipDisabled) return;
    wantsShow = true;
    if (!hasRendered) {
      hasRendered = true;
      // Wait for the content to exist before measuring it -- positioning
      // reads the popover's height to decide whether to flip. Still no paint
      // in between: tick() resolves in a microtask, before the browser
      // renders.
      await tick();
      if (!wantsShow || tooltipDisabled) return;
    }
    tooltipDiv?.togglePopover(true);
    if (!positionTooltip()) {
      tooltipDiv?.togglePopover(false);
      return;
    }
    watchViewport();
  }
</script>

{#if block}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={["tooltip-wrapper", className]}
    onmouseenter={() => showPopover()}
    onmouseleave={() => hidePopover()}
    onfocusin={() => showPopover()}
    onfocusout={() => hidePopover()}
    {...el}
  >
    <div class="tooltip-target" bind:this={targetDiv}>
      {@render children?.()}
    </div>
    <div
      popover="auto"
      id={tooltipId}
      class="tooltip"
      bind:this={tooltipDiv}
      class:bottom={renderedVertical === "bottom"}
      class:top={renderedVertical === "top"}
      class:left={renderedHorizontal === "left"}
      class:right={renderedHorizontal === "right"}
    >
      {#if hasRendered}
        {#if tooltip}{@render tooltip()}{:else}
          {tooltipText}
        {/if}
      {/if}
    </div>
  </div>
{:else}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span
    class={["tooltip-wrapper", className]}
    onmouseenter={() => showPopover()}
    onmouseleave={() => hidePopover()}
    onfocusin={() => showPopover()}
    onfocusout={() => hidePopover()}
    {...el}
  >
    <span class="tooltip-target" bind:this={targetDiv}>
      {@render children?.()}
    </span>
    <span
      popover="auto"
      id={tooltipId}
      class="tooltip"
      bind:this={tooltipDiv}
      class:bottom={renderedVertical === "bottom"}
      class:top={renderedVertical === "top"}
      class:left={renderedHorizontal === "left"}
      class:right={renderedHorizontal === "right"}
    >
      {#if hasRendered}
        {#if tooltip}{@render tooltip()}{:else}
          {tooltipText}
        {/if}
      {/if}
    </span>
  </span>
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .tooltip {
    position: fixed;
    margin: 0;
    overflow: visible;
    @include color-props(tooltip, secondary);
    @include box-props-square-border(tooltip);
    @include box-shadow(tooltip, surface);
    @include typography-container-props(tooltip, ui);
    /* The popover is a DOM child of wherever the Tooltip was placed, so
       without this it inherits that spot's white-space, weight, alignment
       and so on. Must follow typography-container-props. */
    @include overlay-text-reset(tooltip, ui);
  }

  .tooltip-wrapper {
    display: contents;
    position: relative;
  }

  /* Boxless on purpose: wrapping the target must not change its layout. The
     tooltip lives outside this element so that measuring the target's
     contents never picks it up. */
  .tooltip-target {
    display: contents;
  }

  .bottom::after {
    content: " ";
    position: absolute;
    top: calc(-1 * var(--tooltip-arrow-size, 8px));
    width: 0;
    height: 0;
    border-left: var(--tooltip-arrow-size, 8px) solid transparent;
    border-right: var(--tooltip-arrow-size, 8px) solid transparent;
    border-bottom: var(--tooltip-arrow-size, 8px) solid
      var(--tooltip-arrow-color, var(--secondary-bg, white));
  }
  .top::after {
    content: " ";
    position: absolute;
    bottom: calc(-1 * var(--tooltip-arrow-size, 8px));
    width: 0;
    height: 0;
    border-left: var(--tooltip-arrow-size, 8px) solid transparent;
    border-right: var(--tooltip-arrow-size, 8px) solid transparent;
    border-top: var(--tooltip-arrow-size, 8px) solid
      var(--tooltip-arrow-color, var(--secondary-bg, white));
  }
  .right::after {
    left: var(--tooltip-arrow-size, 8px);
  }
  .left::after {
    right: var(--tooltip-arrow-size, 8px);
  }
</style>
