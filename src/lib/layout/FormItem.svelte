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

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  label {
    display: flex;
    align-items: var(--form-label-align, baseline);
    gap: var(--form-label-horizontal-gap, var(--padding));
    padding-top: var(--padding, form-item, 8px);
    padding-bottom: var(--padding, form-item, 8px);
    @include typography-props(form-item, ui);
    box-sizing: border-box;
  }
  .label {
    box-sizing: border-box;
    width: var(--form-label-width, 22em);
    text-align: var(--form-label-text-align, right);
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
      gap: var(--form-label-vertical-gap, var(--space));
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
    @include typography-props(form-input, input, ui);
    @include box-props-square(form-input, input, ui);
  }
</style>
