<script lang="ts">
  export let group: string; // Radio buttons are grouped by the 'name' attribute
  export let value;

  /* Styling properties */
  import { injectVars } from "$lib/util";
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;
  let style = injectVars($$props, "radio-button", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);

  let ref;
  let labelContent;

  $: {
    if (ref) {
      labelContent = ref.innerHTML;
    }
  }
</script>

<div class="label-sizing-box">
  <label class="radio-item">
    <input {value} type="radio" bind:group {...$$restProps} />
    <span bind:this={ref}><slot /></span>
  </label>
  <!-- Hidden label determines how much space we occupy -- that way we can apply e.g. bold font without 
   reflowing the UI when checked/unchecked -->
  <label class="invisible radio-item">
    <input type="radio" checked="true" />
    <span>{@html labelContent}</span>
  </label>
</div>

<style lang="scss">
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

  @import "$lib/sass/_mixins.scss";

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

    @include clickable(radio-button, clickable);
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
    display: none;
  }

  label.radio-item::before {
    transition: all var-with-fallbacks(--transition, radio-button, control);
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
</style>
