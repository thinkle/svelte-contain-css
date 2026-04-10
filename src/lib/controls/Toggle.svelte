<script lang="ts">
  import { injectVars } from "$lib/util";

  export let checked = false;
  export let name = "";
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

  $: style = injectVars($$props, "toggle", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
  $: hasOffLabel = Boolean($$slots.offLabel);
  $: hasOnLabel = Boolean($$slots.onLabel || $$slots.default);
</script>

<label class="toggle" {style}>
  {#if hasOffLabel}
    <span class="toggle-label toggle-label-off"><slot name="offLabel" /></span>
  {/if}

  <span class="toggle-switch">
    <input
      name={name || undefined}
      type="checkbox"
      bind:checked
      on:change
      on:click
      on:blur
      on:focus
      on:focusin
      on:focusout
      {...$$restProps}
    />
    <span class="toggle-track" aria-hidden="true">
      <span class="toggle-thumb"></span>
    </span>
  </span>

  {#if hasOnLabel}
    <span class="toggle-label toggle-label-on">
      {#if $$slots.onLabel}
        <slot name="onLabel" />
      {:else}
        <slot />
      {/if}
    </span>
  {/if}
</label>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

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
