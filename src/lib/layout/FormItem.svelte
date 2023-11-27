<script>
  import "../vars/globalInputs.css";
  export let fullWidth = false;
  export let globalInputStyles = true;
</script>

<label class:fullWidth class:globalInputStyles>
  <span class="label">
    <slot name="label" />
  </span>
  <span class="input">
    <slot />
  </span>
</label>

<style>
  :root {
    --form-label-width: 22em;
    --form-input-width: auto;
    --form-item-pad: var(--pad);
    --form-item-pad: var(--pad);
    --form-label-horizontal-gap: var(--pad);
    --form-label-vertical-gap: var(--space);
  }

  label {
    display: flex;
    align-items: baseline;
    gap: var(--form-label-horizontal-gap);
    padding-top: var(--form-item-pad);
    padding-bottom: var(--form-item-pad);
    font-family: var(--ui-font);
    box-sizing: border-box;
  }
  .label {
    box-sizing: border-box;
    width: var(--form-label-width);
    text-align: right;
  }
  .input {
    box-sizing: border-box;
    width: var(--form-input-fixed-width, var(--form-input-width));
  }
  :global(.fullWidth) .input {
    box-sizing: border-box;
    width: var(--form-input-fixed-width, 100%);
  }
  :global(.fullWidth) .input :global(input) {
    box-sizing: border-box;
    width: 100%;
  }

  @container (max-width: 400px) {
    label {
      flex-direction: column;
      gap: var(--form-label-vertical-gap);
    }
    .label {
      width: auto;
      text-align: left;
      font-size: var(--font-size-small);
    }
    .input {
      width: var(--form-input-fixed-width, var(--form-input-width));
    }
  }

  /* Global Input Styles */
  .globalInputStyles :global(input),
  .globalInputStyles :global(button) {
    font-family: var(--ui-font);
    width: var(--input-width);
    padding: var(--input-padding);
    border: var(--input-border);
    border-radius: var(--input-radius);
  }
</style>
