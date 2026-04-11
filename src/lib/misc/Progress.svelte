<script lang="ts">
  import { injectVars } from "$lib/util";
  import type { Snippet } from "svelte";

  // migrate props via $props() so we can pick up extra CSS var props in restProps
  let {
    state = "inprogress",
    value = 0,
    max = 100,
    bg = null,
    fg = null,
    padding = null,
    width = null,
    height = null,
    children,
    ...restProps
  }: {
    state?: "uninitiated" | "inprogress" | "complete";
    value?: number | "indeterminate";
    max?: number;
    bg?: string | null;
    fg?: string | null;
    padding?: string | null;
    width?: string | null;
    height?: string | null;
    children?: Snippet;
  } & Record<string, unknown> = $props();

  const cssKeys = ["bg", "fg", "padding", "width", "height"];
  const style = $derived(injectVars(restProps, "progress", cssKeys));

  // Compute filled fraction (0..1). 'indeterminate' treats as 1 for the visual bar,
  // but the native <progress> should omit the value attribute for indeterminate.
  let fillFraction = $derived(
    value === "indeterminate"
      ? 1
      : max <= 0
        ? 0
        : Math.min(Math.max(typeof value === "number" ? value : 0, 0), max) /
          max,
  );

  let animateTrack = $derived(!["uninitiated", "complete"].includes(state));
  let halfFull = $derived(fillFraction > 0.5);
</script>

<!-- 
    1) Hidden native <progress> for a11y. 
       If 'indeterminate', omit the value attribute entirely.
  -->
<div class="progress-container" data-state={state} {style}>
  {#if value === "indeterminate"}
    <progress aria-label="Progress" {max} hidden></progress>
  {:else}
    <progress aria-label="Progress" {max} value={Number(value)} hidden></progress>
  {/if}

  <!-- 2) Custom track with diagonal stripes (scrolling) when animateTrack=true -->
  <div
    class="progress-track"
    data-animate={animateTrack}
    class:half-full={halfFull}
  >
    <!-- 3) The progress bar expands in width from 0..100%. -->
    <div
      class="progress-bar"
      style={`width: ${fillFraction * 100}%;`}
      data-indeterminate={value === "indeterminate"}
    ></div>

    <!-- 4) Overlaid text or content -->
    <div class="progress-text">
      <div>{@render children?.()}</div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  // Diagonal stripes: subtle variation on track color
  $track-stripes: repeating-linear-gradient(
    135deg,
    var(--progress-track-bg, var(--secondary-bg, #dfdfdf)) 0,
    var(--progress-track-bg, var(--secondary-bg, #dfdfdf)) 20px,
    var(
        --progress-track-stripe-bg,
        color-mix(
          in srgb,
          var(--secondary-bg, #fff) 85%,
          var(--surface-bg, #dfdfdf) 15%
        )
      )
      20px,
    var(
        --progress-track-stripe-bg,
        color-mix(
          in srgb,
          var(--secondary-bg, #fff) 85%,
          var(--surface-bg, #dfdfdf) 15%
        )
      )
      40px
  );

  @keyframes track-stripes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 57px 0;
    }
  }

  .progress-container {
    @include color-props(progress, surface, control, secondary);
    @include box-props(progress, surface, control, secondary);
    @include typography-container-props(progress, ui);
    width: var(--progress-width, var(--width, 100%));
    display: inline-block;
    position: relative;

    &[data-state="uninitiated"] {
      @include color-props(progress-uninitiated, surface, control, secondary);
    }
    &[data-state="inprogress"] {
      @include color-props(progress-inprogress, surface, control, secondary);
    }
    &[data-state="complete"] {
      @include color-props(progress-complete, surface, control, secondary);
    }

    /* Hidden UI, but read by screen readers. */
    progress {
      display: none;
    }

    .progress-track {
      position: relative;
      @include box-props(progress-track, progress, control);
      height: var(--progress-track-height, var(--progress-height, 2em));
      background: var(--progress-track-bg, var(--secondary-bg, var(--white)));
      overflow: hidden;

      /* If animate => scrolling stripes in offwhite->white */
      &[data-animate="true"] {
        background: $track-stripes;
        background-size: 3000px;
        background-position: center;
        animation: track-stripes 1s linear infinite;
      }
    }

    .progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0%;
      transition: width 0.3s ease;

      /* 
          The bar color: 
          You can override with --progress-bar-color or 
          fallback to var(--primary-bg). We then do opacity 0.8. 
        */
      background-color: var(--progress-bar-color, var(--primary-bg));
      mix-blend-mode: multiply;
    }

    .progress-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--progress-fg, var(--secondary-fg, var(--white)));
      /* Outline color defaults to track background so text is readable over unfilled area */
      --_progress-outline-color: var(
        --progress-outline-color,
        var(--progress-track-bg, var(--secondary-bg, #dfdfdf))
      );
      -webkit-text-stroke: var(--progress-outline-width, 1px)
        var(--_progress-outline-color);
      paint-order: stroke fill;
      text-shadow: none;

      @supports not (-webkit-text-stroke: 1px black) {
        text-shadow: var(
          --progress-text-shadow,
          1px 0px var(--_progress-outline-color),
          -1px 0px var(--_progress-outline-color),
          0px -1px var(--_progress-outline-color),
          0px 1px var(--_progress-outline-color)
        );
      }
    }
    .half-full .progress-text {
      color: var(--progress-half-fg, var(--primary-fg, var(--white)));
      /* Outline color defaults to bar color so text is readable over the unfilled track edge */
      --_progress-outline-color: var(
        --progress-half-outline-color,
        var(
          --progress-outline-color,
          var(--progress-bar-color, var(--primary-bg))
        )
      );

      @supports not (-webkit-text-stroke: 1px black) {
        text-shadow: var(
          --progress-half-text-shadow,
          var(
            --progress-text-shadow,
            1px 0px var(--_progress-outline-color),
            -1px 0px var(--_progress-outline-color),
            0px -1px var(--_progress-outline-color),
            0px 1px var(--_progress-outline-color)
          )
        );
      }
    }
  }
</style>
