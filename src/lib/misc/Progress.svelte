<script lang="ts">
  import { injectVars } from "$lib/util";

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
    children?: any;
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
          max
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
    <progress aria-label="Progress" {max} hidden />
  {:else}
    <progress aria-label="Progress" {max} value={Number(value)} hidden />
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
      <div><slot /></div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  // Diagonal stripes from off-white to white
  $track-stripes: repeating-linear-gradient(
    135deg,
    var(--progress-track-bg, var(--secondary-bg, #dfdfdf)) 0,
    var(--progress-track-bg, var(--secondary-bg, #dfdfdf)) 20px,
    var(--progress-track-stripe-bg, var(--white, #fff)) 20px,
    var(--progress-track-stripe-bg, var(--white, #fff)) 40px
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
    @include color-props(progress, container, control, secondary);
    @include box-props(progress, container, control, secondary);
    @include typography-container-props(progress, ui);
    width: var(--progress-width, var(--width, 100%));
    display: inline-block;
    position: relative;

    &[data-state="uninitiated"] {
      @include color-props(progress-uninitiated, container, control, secondary);
    }
    &[data-state="inprogress"] {
      @include color-props(progress-inprogress, container, control, secondary);
    }
    &[data-state="complete"] {
      @include color-props(progress-complete, container, control, secondary);
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
      text-shadow: 1px 1px
        var(--progress-half-fg, var(--primary-fg, var(--white)));
    }
    .half-full .progress-text {
      color: var(--progress-half-fg, var(--primary-fg, var(--white)));
      text-shadow: 1px 1px var(--progress-fg, var(--secondary-fg, var(--white)));
    }
  }
</style>
