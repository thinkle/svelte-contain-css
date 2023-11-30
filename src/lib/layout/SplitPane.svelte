<script lang="ts">
  import { injectVars } from "$lib/util";
  import { onMount } from "svelte";

  const style = injectVars($$props, "split-pane", ["bg", "fg"]);
  let resizeStyle = "";
  let startWidthLeft: number;
  let startWidthRight: number;
  let startX: number;
  let leftPane: HTMLElement;
  let rightPane: HTMLElement;

  function onMouseDown(event: MouseEvent) {
    startX = event.clientX;
    startWidthLeft = leftPane.getBoundingClientRect().width;
    startWidthRight = rightPane.getBoundingClientRect().width;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(event: MouseEvent) {
    const delta = event.clientX - startX;
    const newLeftWidth = startWidthLeft + delta;
    const newRightWidth = startWidthRight - delta;
    setSize(newLeftWidth, newRightWidth);
  }
  function setSize(newLeftWidth: number, newRightWidth: number) {
    const MIN_SIZE = 32;
    if (newLeftWidth < MIN_SIZE || newRightWidth < MIN_SIZE) {
      // Don't allow too small of widths
      return;
    }
    resizeStyle = `grid-template-columns: ${newLeftWidth}px 8px ${newRightWidth}px`;
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    // Optionally, you can convert the sizes back to 'fr' units or leave them as 'px'
  }

  function onKeyUp(event: KeyboardEvent) {
    const STEP_SIZE = 10; // Number of pixels to resize for each key press

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const delta = event.key === "ArrowLeft" ? -STEP_SIZE : STEP_SIZE;
      // Adjust the widths of the panes
      startWidthLeft = leftPane.getBoundingClientRect().width;
      startWidthRight = rightPane.getBoundingClientRect().width;
      let newLeftWidth = startWidthLeft + delta;
      let newRightWidth = startWidthRight - delta;
      setSize(newLeftWidth, newRightWidth);
    }
  }

  function handleWindowResize() {
    if (!resizeStyle) return;
    const existingLeftWidth = leftPane.getBoundingClientRect().width;
    const existingRightWidth = rightPane.getBoundingClientRect().width;
    let w = window.innerWidth;
    let delta = w - existingLeftWidth - existingRightWidth;
    setSize(existingLeftWidth + delta / 2, existingRightWidth + delta / 2);
  }

  onMount(() => {
    if (window) {
      window.addEventListener("resize", handleWindowResize);
    }
    return () => window.removeEventListener("resize", handleWindowResize);
  });
</script>

<div class="split-pane" style={style + resizeStyle}>
  <div class="left" bind:this={leftPane}>
    <slot name="left" />
  </div>
  <div
    class="resizer"
    tabindex="0"
    on:mousedown={onMouseDown}
    on:keydown={onKeyUp}
  ></div>
  <div class="right" bind:this={rightPane}>
    <slot name="right" />
  </div>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .split-pane > .resizer {
    width: var-with-fallbacks(--resizer-width, split-pane, 4px);
    background-color: var-with-fallbacks(--resizer-color, split-pane, #ccc);
    padding: 0;
  }
  .split-pane {
    display: grid;
    grid-template-columns: var(--split-pane-columns, 1fr 8px 1fr);
    justify-content: stretch;
    height: var(--split-pane-height, auto);
    width: var(--split-pane-width, 100%);
    gap: var-with-fallbacks(--gap, split-pane, 0.5rem);
  }
  .split-pane > div {
    padding: var-with-fallbacks(--padding, split-pane-content, split-pane, 8px);
  }
</style>
