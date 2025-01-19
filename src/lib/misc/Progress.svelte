<script lang="ts">
    import { injectVars } from "$lib/util";
  
    // States for styling variations
    export let state: "uninitiated" | "inprogress" | "complete" = "inprogress";
  
    // Accept either a numeric value (0..max) or 'indeterminate'
    export let value: number | "indeterminate" = 0;
    export let max: number = 100;
  
    // Additional style props -> CSS variables
    export let bg: string | null = null;
    export let fg: string | null = null;
    export let padding: string | null = null;
    export let width: string | null = null;
    export let height: string | null = null;

  
    // Turn these props into --progress-bg, --progress-fg, etc.
    let style = injectVars($$props, "progress", ["bg", "fg", "padding", "width", "height"]);
  
    /**
     * 1) Compute fraction = (value / max) if numeric.
     *    If 'indeterminate', use 1.
     *    Also clamp to [0..1] so you don't exceed 100%.
     */
    $: fillFraction =
      value === "indeterminate"
        ? 1
        : max <= 0
        ? 0
        : Math.min(Math.max(value, 0), max) / max;
  
    /**
     * 2) The track animates stripes if we are not complete.
     */
    $: animateTrack = !['uninitiated','complete'].includes(state)
    let halfFull = false;
    $: halfFull = fillFraction > 0.5;
  </script>
  
  <!-- 
    1) Hidden native <progress> for a11y. 
       If 'indeterminate', omit the value attribute entirely.
  -->
  <div class="progress-container" data-state={state} style={style}>
    <progress
      aria-label="Progress"
      {max}
      value={Number(value) || 0.5}
      hidden
    />
  
    <!-- 2) Custom track with diagonal stripes (scrolling) when animateTrack=true -->
    <div class="progress-track" data-animate={animateTrack} class:half-full={halfFull}>
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
      0%   { background-position: 0 0; }
      100% { background-position: 57px 0; }
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
        text-shadow: 1px 1px var(--progress-half-fg, var(--primary-fg, var(--white)));
        
      }
      .half-full .progress-text {
        color: var(--progress-half-fg, var(--primary-fg, var(--white)));
        text-shadow: 1px 1px var(--progress-fg, var(--secondary-fg, var(--white)));        
      }

    }
  </style>