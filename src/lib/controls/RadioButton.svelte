<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    group?: any;
    value?: any;
    children?: Snippet;
  } & BaseStyleProps &
    Omit<HTMLInputAttributes, "value">;

  let {
    group = $bindable<any>(undefined),
    value = undefined,
    children,
    ...restProps
  }: Props = $props();

  let style = $derived(
    injectVars(restProps, "radio-button", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
    ]),
  );

  // Compute checked state from group comparison
  const isChecked = $derived(group === value);

  // Handle radio selection - for radio buttons, group becomes the selected value
  function handleChange() {
    group = value;
  }
</script>

<div class="label-sizing-box" {style}>
  <label class="radio-item">
    <input
      {value}
      type="radio"
      checked={isChecked}
      onchange={handleChange}
      {...restProps}
    />
    <span>{@render children?.()}</span>
  </label>
  <!-- Hidden label determines how much space we occupy -- that way we can apply e.g. bold font without 
   reflowing the UI when checked/unchecked -->
  <label class="invisible radio-item">
    <input type="radio" checked={true} />
    <span>{@render children?.()}</span>
  </label>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .label-sizing-box {
    position: relative;
    display: inline-block;
  }
  .label-sizing-box .radio-item {
    position: absolute;
    left: 0;
  }
  .label-sizing-box .invisible {
    position: static;
    pointer-events: none;
    visibility: hidden;
  }

  :root {
    /* Customize these variables for radio button styling */
    --radio-button-dot: "•";
  }

  /* Styles will be similar to the checkbox, with appropriate adjustments */
  /* ... (rest of your styles adapted for radio button) ... */
  .offscreen,
  label {
    @include typography-props(radio-button, ui);
  }

  .offscreen {
    visibility: visible;
    font-weight: var-with-fallbacks(
      --weight,
      radio-button-checked,
      checked,
      active
    );
    position: absolute;
  }

  label.radio-item {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    user-select: none;
    gap: var(--radio-button-space, var(--toggle-space, var(--space-md)));
    white-space: nowrap;
    @include clickable-cursor(radio-button, clickable);
  }

  label.radio-item span {
    width: var(--label-width);
  }

  label.radio-item:has(input:checked) {
    font-weight: var-with-fallbacks(
      --weight,
      radio-button-checked,
      checked,
      active
    );
  }

  input[type="radio"] {
    /* visually hidden but still accessible */
    @include visually-hidden();
  }

  label.radio-item:has(input:focus-visible) {
    @include focus-ring();
  }

  label.radio-item::before {
    @include clickable-affordance-transition(
      radio-button,
      clickable,
      control,
      180ms ease
    );
    display: inline-grid;
    place-content: center;
    content: " ";
    width: var-with-fallbacks(--size, radio-button, font, 1em);
    height: var-with-fallbacks(--size, radio-button, font, 1em);
    @include color-props(radio-button, toggle, inactive, secondary);
    border: var-with-fallbacks(
      --border,
      radio-button,
      1px solid var(--border-color)
    );
    box-sizing: border-box;
    border-radius: var(
      --radio-button-border-radius,
      50%
    ); // Circular border for radio button
    margin-left: var(--radio-button-padding, var(--padding));
  }

  label.radio-item:hover::before {
    @include clickable-hover-affordance(radio-button, clickable);
  }

  label.radio-item:active::before {
    @include clickable-active-affordance(radio-button, clickable);
  }

  label.radio-item:has(input:checked)::before {
    @include color-props(radio-button-checked, toggle-on, primary);
    border: var-with-fallbacks(
      --border,
      radio-button-checked,
      toggle-on,
      radio-button
    );
    box-sizing: border-box;
    width: var-with-fallbacks(--size, radio-button, toggle, font, 1em);
    height: var-with-fallbacks(--size, radio-button, toggle, font, 1em);
  }

  label.radio-item:has(input:disabled) {
    cursor: not-allowed;
    opacity: var(--radio-button-disabled-opacity, 0.6);
    filter: grayscale(0.2);
  }

  label.radio-item:has(input:disabled):hover::before,
  label.radio-item:has(input:disabled):active::before {
    filter: none;
    box-shadow: none;
  }
</style>
