<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    checked?: boolean;
    name?: string;
    onLabel?: Snippet;
    offLabel?: Snippet;
    children?: Snippet;
  } & BaseStyleProps &
    Omit<HTMLInputAttributes, "type">;

  let {
    checked = $bindable(false),
    name = "",
    onLabel,
    offLabel,
    children,
    ...restProps
  }: Props = $props();

  const style = $derived(
    injectVars(restProps, "toggle", ["bg", "fg", "padding", "width", "height"]),
  );

  const hasOffLabel = $derived(Boolean(offLabel));
  const hasOnLabel = $derived(Boolean(onLabel || children));
  const effectiveOnLabel = $derived(onLabel || children);
</script>

<label class="toggle" {style}>
  {#if hasOffLabel}
    <span class="toggle-label toggle-label-off">{@render offLabel?.()}</span>
  {/if}

  <span class="toggle-switch">
    <input
      name={name || undefined}
      type="checkbox"
      bind:checked
      {...restProps}
    />
    <span class="toggle-track" aria-hidden="true">
      <span class="toggle-thumb"></span>
    </span>
  </span>

  {#if hasOnLabel}
    <span class="toggle-label toggle-label-on"
      >{@render effectiveOnLabel?.()}</span
    >
  {/if}
</label>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--toggle-space, var(--space-md, 0.5rem));
    user-select: none;
    @include clickable-cursor(toggle, clickable);
    @include typography-props(toggle, ui);
  }

  .toggle-switch {
    --_toggle-width: var(--toggle-width, 2.75em);
    --_toggle-height: var(--toggle-height, 1.5em);
    --_thumb-inset: var(--toggle-thumb-inset, 2px);
    --_thumb-size: var(
      --toggle-thumb-size,
      calc(var(--_toggle-height) - (2 * var(--_thumb-inset)))
    );

    position: relative;
    width: var(--_toggle-width);
    height: var(--_toggle-height);
    min-width: 2.25em;
    min-height: 1.25em;
    flex: 0 0 auto;
  }

  .toggle-track {
    @include color-props(toggle, toggle-off, inactive, secondary);

    display: block;
    width: 100%;
    height: 100%;
    border-radius: var(--toggle-track-radius, 999px);
    border: var-with-fallbacks(
      --border,
      toggle,
      1px solid var(--border-color, rgba(127, 127, 127, 0.6))
    );
    @include clickable-affordance-transition(toggle, clickable, control, 180ms ease);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .toggle-thumb {
    position: absolute;
    top: 50%;
    left: var(--_thumb-inset);
    width: var(--_thumb-size);
    height: var(--_thumb-size);
    border-radius: 50%;
    background: var(
      --toggle-thumb-bg,
      var(--surface-bg, var(--secondary-fg, rgb(240, 240, 240)))
    );
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transform: translate(0, -50%);
    transition: transform
      var-with-fallbacks(--transition, toggle, control, 180ms ease);
  }

  input[type="checkbox"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: inherit;
  }

  .toggle:hover .toggle-track {
    @include clickable-hover-affordance(toggle, clickable);
  }

  .toggle:active .toggle-track {
    @include clickable-active-affordance(toggle, clickable);
  }

  .toggle:has(input:focus-visible) {
    @include focus-ring();
  }

  .toggle:has(input:checked) .toggle-track {
    @include color-props(toggle-on, primary, toggle);
    border: var-with-fallbacks(
      --border,
      toggle-on,
      toggle,
      1px solid transparent
    );
  }

  .toggle:has(input:checked) .toggle-thumb {
    transform: translate(
      calc(
        var(--_toggle-width) - var(--_thumb-size) - (2 * var(--_thumb-inset))
      ),
      -50%
    );
  }

  .toggle:has(input:disabled) {
    cursor: not-allowed;
    opacity: var(--toggle-disabled-opacity, 0.6);
    filter: grayscale(0.2);
  }

  .toggle:has(input:disabled):hover .toggle-track,
  .toggle:has(input:disabled):active .toggle-track {
    filter: none;
    box-shadow: none;
  }

  .toggle-label {
    white-space: nowrap;
  }
</style>
