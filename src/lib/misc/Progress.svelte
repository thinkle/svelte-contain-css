<script lang="ts">
  import { injectVars } from "$lib/util";

  export let state: "uninitiated" | "inprogress" | "complete" = "inprogress";
  export let value: number | "indeterminate" = 0;
  export let max = 100;
  /* svelte-ignore unused-export-let */
  export let bg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let fg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let padding: string | null = null;
  /* svelte-ignore unused-export-let */
  export let width: string | null = null;
  /* svelte-ignore unused-export-let */
  export let height: string | null = null;

  $: style = injectVars($$props, "progress", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
  $: fillFraction =
    value === "indeterminate"
      ? 1
      : max <= 0
        ? 0
        : Math.min(Math.max(typeof value === "number" ? value : 0, 0), max) / max;
  $: animateTrack = !["uninitiated", "complete"].includes(state);
  $: halfFull = fillFraction > 0.5;
</script>

<div class="progress-container" data-state={state} {style}>
  {#if value === "indeterminate"}
    <progress aria-label="Progress" {max} hidden />
  {:else}
    <progress aria-label="Progress" {max} value={Number(value)} hidden />
  {/if}

  <div class="progress-track" data-animate={animateTrack} class:half-full={halfFull}>
    <div
      class="progress-bar"
      style={`width: ${fillFraction * 100}%;`}
      data-indeterminate={value === "indeterminate"}
    ></div>

    <div class="progress-text">
      <div><slot /></div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

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

    progress {
      display: none;
    }

    .progress-track {
      position: relative;
      @include box-props(progress-track, progress, control);
      height: var(--progress-track-height, var(--progress-height, 2em));
      background: var(--progress-track-bg, var(--secondary-bg, var(--white)));
      overflow: hidden;

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
