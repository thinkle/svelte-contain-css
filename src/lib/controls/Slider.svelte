<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number | "any";
  } & BaseStyleProps &
    Omit<HTMLInputAttributes, "type" | "value" | "min" | "max" | "step">;

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    ...restProps
  }: Props = $props();

  const inlineStyle = $derived((restProps as { style?: string }).style);
  const elementProps = $derived.by(() => {
    const { style: _, ...rest } = restProps as { style?: string } & Record<string, unknown>;
    return rest;
  });

  const normalizedMin = $derived(Number.isFinite(min) ? min : 0);
  const normalizedMax = $derived(
    Number.isFinite(max) && max > normalizedMin ? max : normalizedMin + 1,
  );
  const clampedValue = $derived(
    Math.min(Math.max(Number(value) || 0, normalizedMin), normalizedMax),
  );
  const fillPercent = $derived(
    ((clampedValue - normalizedMin) / (normalizedMax - normalizedMin)) * 100,
  );

  const style = $derived(
    `${injectVars(elementProps, "slider", ["bg", "fg", "padding", "width", "height"])}--slider-percent: ${fillPercent}%;${inlineStyle ?? ""}`,
  );
</script>

<input
  class="slider"
  type="range"
  bind:value
  {min}
  {max}
  {step}
  {style}
  {...elementProps}
/>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: var(--slider-width, var(--width, 100%));
    min-width: 6rem;
    height: var(--slider-height, 1.75rem);
    padding: 0;
    margin: 0;
    border: none;
    border-radius: var(--slider-radius, 999px);
    background: transparent;
    color: var(--slider-fg, var(--fg));
    cursor: pointer;
    box-sizing: border-box;
    transition: opacity var(--slider-transition, var(--transition));

    &:disabled {
      cursor: not-allowed;
      opacity: var(--slider-disabled-opacity, 0.55);
    }

    &:focus-visible {
      @include focus-ring();
      border-radius: var(--slider-thumb-radius, 999px);
    }

    &::-webkit-slider-runnable-track {
      height: var(--slider-track-height, 0.45rem);
      border: var(--slider-track-border, none);
      border-radius: var(--slider-track-radius, 999px);
      background:
        linear-gradient(
          to right,
          var(--slider-fill-bg, var(--primary-bg)) 0,
          var(--slider-fill-bg, var(--primary-bg)) var(--slider-percent),
          var(
              --slider-track-bg,
              color-mix(
                in srgb,
                var(--input-bg, var(--surface-bg, #fff)) 72%,
                var(--border-color, currentColor) 28%
              )
            )
            var(--slider-percent),
          var(
              --slider-track-bg,
              color-mix(
                in srgb,
                var(--input-bg, var(--surface-bg, #fff)) 72%,
                var(--border-color, currentColor) 28%
              )
            )
            100%
        );
      box-shadow: var(--slider-track-shadow, none);
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: var(--slider-thumb-size, 1rem);
      height: var(--slider-thumb-size, 1rem);
      margin-top: calc(
        (
            var(--slider-track-height, 0.45rem) -
              var(--slider-thumb-size, 1rem)
          ) / 2
      );
      border: var(
        --slider-thumb-border,
        1px solid
          color-mix(
            in srgb,
            var(--slider-thumb-bg, var(--primary-bg)) 75%,
            black 25%
          )
      );
      border-radius: var(--slider-thumb-radius, 999px);
      background: var(--slider-thumb-bg, var(--primary-bg));
      box-shadow: var(--slider-thumb-shadow, 0 1px 2px rgba(0, 0, 0, 0.18));
      transition:
        transform var(--slider-transition, var(--transition)),
        box-shadow var(--slider-transition, var(--transition)),
        background var(--slider-transition, var(--transition));
    }

    &:hover::-webkit-slider-thumb {
      transform: var(--slider-thumb-hover-transform, scale(1.04));
      box-shadow: var(
        --slider-thumb-hover-shadow,
        0 2px 6px rgba(0, 0, 0, 0.22)
      );
    }

    &:active::-webkit-slider-thumb {
      transform: var(--slider-thumb-active-transform, scale(0.98));
      box-shadow: var(
        --slider-thumb-active-shadow,
        0 1px 4px rgba(0, 0, 0, 0.24)
      );
    }

    &::-moz-range-track {
      height: var(--slider-track-height, 0.45rem);
      border: var(--slider-track-border, none);
      border-radius: var(--slider-track-radius, 999px);
      background: var(
        --slider-track-bg,
        color-mix(
          in srgb,
          var(--input-bg, var(--surface-bg, #fff)) 72%,
          var(--border-color, currentColor) 28%
        )
      );
      box-shadow: var(--slider-track-shadow, none);
    }

    &::-moz-range-progress {
      height: var(--slider-track-height, 0.45rem);
      border: var(--slider-track-border, none);
      border-radius: var(--slider-track-radius, 999px);
      background: var(--slider-fill-bg, var(--primary-bg));
      box-shadow: var(--slider-track-shadow, none);
    }

    &::-moz-range-thumb {
      width: var(--slider-thumb-size, 1rem);
      height: var(--slider-thumb-size, 1rem);
      border: var(
        --slider-thumb-border,
        1px solid
          color-mix(
            in srgb,
            var(--slider-thumb-bg, var(--primary-bg)) 75%,
            black 25%
          )
      );
      border-radius: var(--slider-thumb-radius, 999px);
      background: var(--slider-thumb-bg, var(--primary-bg));
      box-shadow: var(--slider-thumb-shadow, 0 1px 2px rgba(0, 0, 0, 0.18));
      transition:
        transform var(--slider-transition, var(--transition)),
        box-shadow var(--slider-transition, var(--transition)),
        background var(--slider-transition, var(--transition));
    }

    &:hover::-moz-range-thumb {
      transform: var(--slider-thumb-hover-transform, scale(1.04));
      box-shadow: var(
        --slider-thumb-hover-shadow,
        0 2px 6px rgba(0, 0, 0, 0.22)
      );
    }

    &:active::-moz-range-thumb {
      transform: var(--slider-thumb-active-transform, scale(0.98));
      box-shadow: var(
        --slider-thumb-active-shadow,
        0 1px 4px rgba(0, 0, 0, 0.24)
      );
    }
  }
</style>
