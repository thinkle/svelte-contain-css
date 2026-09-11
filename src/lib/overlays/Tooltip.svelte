<script lang="ts">
  import { onDestroy, tick } from "svelte";

  let tooltipDiv: HTMLElement | undefined = $state();
  let targetDiv: HTMLElement | undefined = $state();
  let tooltipMeasurementDiv: HTMLElement | undefined = $state();
  interface Props {
    tooltipText?: string;
    vertical?: string;
    horizontal?: string;
    children?: import("svelte").Snippet;
    tooltip?: import("svelte").Snippet;
    block?: boolean;
  }

  let {
    tooltipText = "",
    vertical = "bottom",
    horizontal = "right",
    children,
    tooltip,
    block = false,
  }: Props = $props();
  // svelte-ignore state_referenced_locally
  let renderedVertical = $state(vertical);
  // svelte-ignore state_referenced_locally
  let renderedHorizontal = $state(horizontal);

  /**
   * Tooltip content mounts on first show, not on mount. A page with many
   * tooltips (e.g. a grid of cells each carrying a rich tooltip snippet)
   * would otherwise build every tooltip twice — popover + measurement copy —
   * before the user hovers anything. Once shown, content stays mounted.
   */
  let hasRendered = $state(false);
  /** Guards against the pointer/focus leaving while content mounts. */
  let wantsShow = false;

  function hidePopover() {
    wantsShow = false;
    unwatchViewport();
    tooltipDiv?.togglePopover(false);
  }

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
   */
  function positionTooltip(): boolean {
    if (!tooltipDiv || !tooltipMeasurementDiv) return false;
    const targetRect = resolveTargetRect();
    if (!targetRect) return false;
    let targetHeight = tooltipMeasurementDiv.getBoundingClientRect().height;
    let targetWidth = tooltipMeasurementDiv.getBoundingClientRect().width;
    renderedHorizontal = horizontal;
    renderedVertical = vertical;

    // Adjust vertical position based on position in window.
    if (
      renderedVertical === "top" &&
      //targetRect.top - window.scrollY < window.innerHeight / 3
      targetRect.top < targetHeight + 32
    ) {
      renderedVertical = "bottom";
    } else if (
      renderedVertical === "bottom" &&
      //targetRect.bottom > (window.innerHeight * 2) / 3
      targetRect.bottom + targetHeight > window.innerHeight - 32
    ) {
      renderedVertical = "top";
    }

    // Adjust horizontal position based on position in window
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
    const tooltipGap =
      Number(
        window
          .getComputedStyle(tooltipDiv)
          .getPropertyValue("--tooltip-arrow-size")
          .replace("px", ""),
      ) || 8;
    // Adjust tooltip style to match target element
    if (renderedVertical === "bottom") {
      tooltipDiv.style.bottom = "unset";
      tooltipDiv.style.top = `${targetRect.top + targetRect.height}px`;
      tooltipDiv.style.marginTop = "var(--tooltipGap, 8px)";
    } else if (renderedVertical == "top") {
      tooltipDiv.style.bottom = `${window.innerHeight - targetRect.top}px`;
      tooltipDiv.style.top = "unset";
      tooltipDiv.style.marginBottom = "var(--tooltipGap, 8px)";
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

    // Top and Left will put us OVER the element (matching top and left corner)
    // Let's use the margin to adjust positioning...

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
    wantsShow = true;
    if (!hasRendered) {
      hasRendered = true;
      // Wait for the content to exist before measuring it — positioning reads
      // the measurement element's height/width to decide flip direction.
      await tick();
      if (!wantsShow) return;
    }
    if (!positionTooltip()) return;
    watchViewport();
    tooltipDiv?.togglePopover(true);
  }
</script>

{#if block}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="tooltip-wrapper"
    onmouseenter={() => showPopover()}
    onmouseleave={() => hidePopover()}
    onfocusin={() => showPopover()}
    onfocusout={() => hidePopover()}
  >
    <div class="tooltip-target" bind:this={targetDiv}>
      {@render children?.()}
    </div>
    <div
      popover="auto"
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
    <div class="tooltip invisible measure" bind:this={tooltipMeasurementDiv}>
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
    class="tooltip-wrapper"
    onmouseenter={() => showPopover()}
    onmouseleave={() => hidePopover()}
    onfocusin={() => showPopover()}
    onfocusout={() => hidePopover()}
  >
    <span class="tooltip-target" bind:this={targetDiv}>
      {@render children?.()}
    </span>
    <span
      popover="auto"
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
    <span class="tooltip invisible measure" bind:this={tooltipMeasurementDiv}>
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
  }

  .tooltip-wrapper {
    display: contents;
    position: relative;
  }

  /* Boxless on purpose: wrapping the target must not change its layout. The
     tooltip and its measurement copy live outside this element so that
     measuring the target's contents never picks them up. */
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
  .invisible {
    visibility: hidden;
    pointer-events: none;
  }
</style>
