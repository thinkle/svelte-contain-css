<script lang="ts">
  import { injectVars } from "$lib/util";
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    left?: Snippet;
    right?: Snippet;
  } & HTMLAttributes<HTMLElement> &
    Record<string, unknown>;

  let { left, right, ...restProps }: Props = $props();
  const style = $derived(
    injectVars(restProps, "split-pane", [
      "bg",
      "fg",
      "border",
      "height",
      "leftWidth",
      "rightWidth",
    ])
  );
  let resizeStyle = $state("");
  let startWidthLeft = $state(0);
  let startWidthRight = $state(0);
  let startX = $state(0);
  let splitPaneContainer: HTMLElement | undefined = $state();
  let resizerDiv: HTMLElement | undefined = $state();
  let leftPane: HTMLElement | undefined = $state();
  let rightPane: HTMLElement | undefined = $state();

  function onMouseDown(event: MouseEvent) {
    startX = event.clientX;
    startWidthLeft = leftPane!.getBoundingClientRect().width;
    startWidthRight = rightPane!.getBoundingClientRect().width;
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
    const containerStyle = getComputedStyle(splitPaneContainer!);
    const columnGap = Number.parseFloat(containerStyle.columnGap || "0") || 0;
    const totalGap = columnGap * 2; // 3 columns => 2 gaps
    const resizerWidth = resizerDiv!.getBoundingClientRect().width;
    const availableWidth = splitPaneContainer!.clientWidth - totalGap;
    const minRequired = resizerWidth + MIN_SIZE * 2;

    if (availableWidth <= minRequired) {
      return;
    }

    if (newLeftWidth + newRightWidth + resizerWidth > availableWidth) {
      // Don't allow panes to overflow the available grid track width.
      // Keep the left and shrink the right.
      newRightWidth = availableWidth - newLeftWidth - resizerWidth;
    }

    if (newRightWidth < MIN_SIZE) {
      // If right becomes too small after clamping, keep both panes usable.
      newRightWidth = MIN_SIZE;
      newLeftWidth = availableWidth - resizerWidth - newRightWidth;
    }

    if (newLeftWidth < MIN_SIZE) {
      newLeftWidth = MIN_SIZE;
      newRightWidth = availableWidth - resizerWidth - newLeftWidth;
    }
    resizeStyle = `grid-template-columns: ${newLeftWidth}px ${resizerWidth}px ${newRightWidth}px`;
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
      startWidthLeft = leftPane!.getBoundingClientRect().width;
      startWidthRight = rightPane!.getBoundingClientRect().width;
      let newLeftWidth = startWidthLeft + delta;
      let newRightWidth = startWidthRight - delta;
      setSize(newLeftWidth, newRightWidth);
    }
  }

  function handleWindowResize() {
    if (!resizeStyle) return;
    const existingLeftWidth = leftPane!.getBoundingClientRect().width;
    const existingRightWidth = rightPane!.getBoundingClientRect().width;
    let w = splitPaneContainer!.getBoundingClientRect().width;
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

<div
  class="split-pane"
  style={style + resizeStyle}
  bind:this={splitPaneContainer}
  {...restProps}
>
  <div class="left" bind:this={leftPane}>
    {@render left?.()}
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    bind:this={resizerDiv}
    class="resizer"
    tabindex="0"
    role="separator"
    aria-orientation="vertical"
    aria-label="Resize Pane"
    onpointerdown={onMouseDown}
    onkeydown={onKeyUp}
  ></div>
  <div class="right" bind:this={rightPane}>
    {@render right?.()}
  </div>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .split-pane {
    display: grid;
    grid-template-columns: var(
      --split-pane-columns,
      var(--split-pane-left-width, 1fr)
        var-with-fallbacks(--resizer-width, split-pane, 4px)
        var(--split-pane-right-width, 1fr)
    );
    justify-content: stretch;
    height: var(--split-pane-height, auto);
    width: var(--split-pane-width, 100%);
    box-sizing: border-box;
    gap: var-with-fallbacks(--gap, split-pane, 0.5rem);
    border: var-with-fallbacks(--border, split-pane, surface, 1px solid #ccc);
  }
  .split-pane > div {
    padding: var-with-fallbacks(--padding, split-pane-content, split-pane, 8px);
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* Resizer */
  .split-pane > .resizer {
    padding: 0;
    width: var(--resizer-grab-width, 12px);
    cursor: col-resize;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: stretch;
    @include focusable();
  }
  .split-pane > .resizer::before {
    content: " ";
    width: var(--resizer-width, var(--border-width, 1px));
    background-color: var-with-fallbacks(
      --resizer-color,
      split-pane,
      var(--fg)
    );
    height: 100%;
    display: block;
  }
  .split-pane > .resizer::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    height: var(--resizer-grab-height, 1em);
    width: var(--resizer-grab-width, 8px);
    color: var(--fg);
    transform: translateY(-50%);
    background: var(
      --resizer-background,
      repeating-linear-gradient(
        90deg,
        var(--resizer-color, var(--fg)) 0px,
        var(--resizer-color, var(--fg)) 1px,
        transparent 1px,
        transparent 3px
      )
    );
  }

  @container (max-width: 600px) {
    .split-pane {
      display: flex;
      flex-direction: column;
      gap: var(--gap, 4px);
    }
    .split-pane > div:first-child {
      border-bottom: var(--resizer-border, var(--border, 1px solid #ccc));
    }
    .split-pane > .resizer {
      display: none;
    }
  }
</style>
