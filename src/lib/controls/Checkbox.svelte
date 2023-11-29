<script lang="ts">
  export let checked: boolean;
  let ref;
  let labelContent;
  let labelWidth;
  $: {
    if (ref) {
      labelContent = ref.innerHTML;
    }
  }
</script>

<label>
  <input type="checkbox" bind:checked />
  <span style:--label-width="{labelWidth + 4}px" bind:this={ref}><slot /></span>
</label>
<!-- Off-screen span for measuring -->
<span class="offscreen" bind:clientWidth={labelWidth}>{@html labelContent}</span
>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  :root {
    /*   --checkbox-size: var(--font-size);
    --checkbox-bg: var(--inactive-bg);
    --checkbox-fg: var(--inactive-fg);
    --checkbox-checked-bg: var(--primary-bg);
    --checkbox-checked-fg: var(--primary-fg);
    --checkbox-border: 1px solid var(--white);
    --checkbox-checked-border: 1px solid var(--white); */
    --checkbox-check: "✓";
  }

  .offscreen,
  label {
    @include typography-props(checkbox, ui);
  }

  .offscreen {
    visibility: hidden;
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
    line-height: 1.2;
    position: relative;
    user-select: none;
    gap: var(--radio-button-space, var(--toggle-space, var(--space-md)));
  }
  label:hover {
    filter: var(--checkbox-hover-filter);
    transform: var(--checkbox-hover-transform);
  }
  label:has(:global(*:active)) {
    filter: var-with-fallbacks(--active-filter, checkbox, control);
    transform: var-with-fallbacks(--active-transform, checkbox, control);
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

  input {
    display: none;
  }
  label::before {
    transition: all var-with-fallbacks(--transition, checkbox, control);
    display: inline-grid;
    place-content: center;
    content: " ";
    width: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    height: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    @include color-props(checkbox, toggle, inactive, secondary);
    border: var-with-fallbacks(
      --border,
      checkbox,
      1px solid var(--border-color)
    );
    box-sizing: border-box;
  }
  label:has(input:checked)::before {
    @include color-props(checkbox-checked, toggle-on, primary, checkbox);
    /* background: var(--checkbox-checked-bg);
    color: var(--checkbox-checked-fg); */
    border: var-with-fallbacks(--border, checkbox-checked, toggle-on, checkbox);
    box-sizing: border-box;
    width: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    height: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
  }
  label:has(input:checked)::after {
    content: var(--checkbox-check);
    font-size: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    color: var-with-fallbacks(--fg, checkbox-checked, toggle-on, checkbox);
    position: absolute;
    left: 0;
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
