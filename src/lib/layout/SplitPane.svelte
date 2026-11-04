<script lang="ts">
  import { elementProps } from "$lib/util";
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      left?: Snippet;
      right?: Snippet;
      /**
       * Accessible name for the drag handle between the panes. Name what the
       * panes hold -- `resizerLabel="Resize the preview"` -- so it is clear
       * what moving the handle does.
       */
      resizerLabel?: string;
      /** After dragging, preserve the split ratio or keep the left pane's width. */
      resizeBehavior?: "proportional" | "preserve-left";
    },
    {
      bg?: string | null;
      fg?: string | null;
      border?: string | null;
      height?: string | null;
      leftWidth?: string | null;
      rightWidth?: string | null;
    }
  >;

  let {
    left,
    right,
    resizerLabel = "Resize panes",
    resizeBehavior = "proportional",
    class: className,
    ...restProps
  }: Props = $props();
  let resizeStyle = $state("");

  /* resizeStyle is the live drag offset, so it goes in as extraVars -- after
     the prop variables and before the caller's own `style`. */
  const el = $derived(
    elementProps(
      restProps,
      "split-pane",
      ["bg", "fg", "border", "height", "leftWidth", "rightWidth"],
      resizeStyle,
    ),
  );
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
  function setSize(newLeftWidth: number, _newRightWidth: number) {
    const MIN_SIZE = 32;
    const style = getComputedStyle(splitPaneContainer!);
    const gap = Number.parseFloat(style.columnGap) || 0;
    const padding = (Number.parseFloat(style.paddingLeft) || 0) +
      (Number.parseFloat(style.paddingRight) || 0);
    const resizer = resizerDiv!.getBoundingClientRect().width;
    const available = splitPaneContainer!.clientWidth - padding - gap * 2 - resizer;
    if (available < MIN_SIZE * 2) return;
    const width = Math.max(MIN_SIZE, Math.min(newLeftWidth, available - MIN_SIZE));
    // Keep flexible tracks, rather than repeatedly measuring fixed pixel tracks
    // on resize. The browser accounts for gaps/borders without accumulating drift.
    if (resizeBehavior === "preserve-left") {
      const reserved = resizer + gap * 2 + MIN_SIZE;
      resizeStyle = `grid-template-columns: minmax(${MIN_SIZE}px, min(${width}px, calc(100% - ${reserved}px))) ${resizer}px minmax(${MIN_SIZE}px, 1fr);`;
    } else {
      const ratio = width / available;
      resizeStyle = `grid-template-columns: minmax(${MIN_SIZE}px, ${ratio}fr) ${resizer}px minmax(${MIN_SIZE}px, ${1 - ratio}fr);`;
    }
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    // Optionally, you can convert the sizes back to 'fr' units or leave them as 'px'
  }

  function onKeyUp(event: KeyboardEvent) {
    const STEP_SIZE = 10; // Number of pixels to resize for each key press

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const delta = event.key === "ArrowLeft" ? -STEP_SIZE : STEP_SIZE;
      // Adjust the widths of the panes
      startWidthLeft = leftPane!.getBoundingClientRect().width;
      startWidthRight = rightPane!.getBoundingClientRect().width;
      let newLeftWidth = startWidthLeft + delta;
      let newRightWidth = startWidthRight - delta;
      setSize(newLeftWidth, newRightWidth);
    }
  }

  onMount(() => () => onMouseUp());

</script>

<div
  class={["split-pane", className]}
  bind:this={splitPaneContainer}
  {...el}
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
    aria-label={resizerLabel}
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
