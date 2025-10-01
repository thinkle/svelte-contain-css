<script lang="ts">
  export let tooltipText = "";
  let tooltipDiv: HTMLElement;
  let targetDiv: HTMLElement;
  let tooltipMeasurementDiv: HTMLElement;
  export let vertical = "bottom";
  export let horizontal = "right";
  let renderedVertical = vertical;
  let renderedHorizontal = horizontal;

  function showPopover() {
    // Get the position of the target element
    // with respect to our screen

    const targetRect = targetDiv.children[0].getBoundingClientRect();
    let targetHeight = tooltipMeasurementDiv.getBoundingClientRect().height;
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
      tooltipDiv.style.left = `${targetRect.left + targetRect.width / 2}px`;
      tooltipDiv.style.right = "unset";
    } else {
      tooltipDiv.style.right = `${window.innerWidth - (targetRect.left + targetRect.width / 2)}px`;
      tooltipDiv.style.left = "unset";
    }

    // Top and Left will put us OVER the element (matching top and left corner)
    // Let's use the margin to adjust positioning...

    tooltipDiv.togglePopover(true);
  }
</script>

<div
  class="tooltip-wrapper"
  on:mouseenter={() => showPopover()}
  on:mouseleave={() => tooltipDiv.togglePopover(false)}
  on:focusin={() => showPopover()}
  on:focusout={() => tooltipDiv.togglePopover(false)}
  bind:this={targetDiv}
>
  <slot />
  <div
    popover="auto"
    class="tooltip"
    bind:this={tooltipDiv}
    class:bottom={renderedVertical === "bottom"}
    class:top={renderedVertical === "top"}
    class:left={renderedHorizontal === "left"}
    class:right={renderedHorizontal === "right"}
  >
    <slot name="tooltip">
      {tooltipText}
    </slot>
  </div>
  <div class="tooltip invisible measure" bind:this={tooltipMeasurementDiv}>
    <slot name="tooltip">
      {tooltipText}
    </slot>
  </div>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .tooltip {
    position: fixed;
    margin: 0;
    overflow: visible;
    @include color-props(tooltip, secondary);
    @include box-props-square-border(tooltip);
    @include box-shadow(tooltip, container);
    @include typography-container-props(tooltip, ui);
  }

  .tooltip-wrapper {
    display: contents;
    position: relative;
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
