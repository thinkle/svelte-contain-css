<script lang="ts">
  export let checked: boolean;

  /* Styling properties */
  import { injectVars } from "$lib/util";
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let padding: string | null = null;
  export let width: string | null = null;
  export let height: string | null = null;
  let style = injectVars($$props, "checkbox", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);

  let ref: HTMLElement;
  let labelContent: string = "";

  $: {
    if (ref) {
      labelContent = ref.innerHTML;
    }
  }
</script>

<div class="label-sizing-box">
  <label class="checkbox-item">
    <input
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
    <span bind:this={ref}><slot /></span>
  </label>
  <label class="invisible">
    <input type="checkbox" checked={true} />
    <span>{@html labelContent}</span>
  </label>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .label-sizing-box {
    position: relative;
    display: inline-block;
  }

  .label-sizing-box .checkbox-item {
    position: absolute;
    left: 0;
  }

  .label-sizing-box .invisible {
    position: static;
    pointer-events: none;
    visibility: hidden;
  }

  :root {
    /* Customize these variables for checkbox styling */
    --checkbox-check: "✓";
  }

  .offscreen,
  label {
    @include typography-props(checkbox, ui);
  }
  label {
    margin-left: var(--checkbox-padding, var(--padding));
  }

  .offscreen {
    visibility: visible;
    font-weight: var-with-fallbacks(
      --weight,
      checkbox-checked,
      checked,
      active
    );
    position: absolute;
  }

  label {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--checkbox-space, var(--toggle-space, var(--space-md)));

    @include clickable(checkbox, clickable);
  }

  label span {
    width: var(--label-width);
  }

  label:has(input:checked) {
    font-weight: var-with-fallbacks(
      --weight,
      checkbox-checked,
      checked,
      active
    );
  }

  input[type="checkbox"] {
    //display:
    @include visually-hidden();
  }

  label:has(input:focus-visible) {
    @include focus-ring();
  }

  label::before {
    transition: all var-with-fallbacks(--transition, checkbox, control);
    display: inline-grid;
    place-content: center;
    content: " ";
    width: var-with-fallbacks(--size, checkbox, font, 1em);
    height: var-with-fallbacks(--size, checkbox, font, 1em);
    @include color-props(checkbox, toggle, inactive, secondary);
    border: var-with-fallbacks(
      --border,
      checkbox,
      1px solid var(--border-color)
    );
    box-sizing: border-box;
    border-radius: var(--checkbox-radius, 0);
  }

  label:has(input:checked)::before {
    @include color-props(checkbox-checked, toggle-on, primary, checkbox);
    border: var-with-fallbacks(--border, checkbox-checked, toggle-on, checkbox);
    box-sizing: border-box;
  }

  label:has(input:checked)::after {
    content: var(--checkbox-check, "✓");
    font-size: var-with-fallbacks(--size, checkbox-check, 0.875em);
    color: var-with-fallbacks(
      --fg,
      checkbox-checked,
      toggle-on,
      primary,
      checkbox
    );
    position: absolute;
    left: var(--checkbox-left-offset, 0.125em);
    animation: checkbox-check var(--checkbox-transition) ease-in-out;
  }

  @keyframes checkbox-check {
    0% {
      width: 0;
      overflow: hidden;
    }
    100% {
      width: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    }
  }
</style>
