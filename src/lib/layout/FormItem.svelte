<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script>
  import { injectVars } from "$lib/util";

  export let fullWidth = false;
  export let globalInputStyles = true;
  let style = injectVars($$props, "form-item", [
    "fullWidth",
    "globalInputStyles",
  ]);
</script>

<div {style} class="form-item" class:fullWidth class:globalInputStyles>
  <slot name="before" />
  <label>
    <span class="label">
      <slot name="label" />
    </span>
    <span class="input">
      <slot />
    </span>
  </label>
  <slot name="after" />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .form-item {
    display: flex;
    align-items: var(--form-label-align, baseline);
    justify-content: var(--form-label-justify, flex-start);
    gap: var(--form-label-horizontal-gap, var(--padding));
    padding-top: var(--padding, form-item, 8px);
    padding-bottom: var(--padding, form-item, 8px);
    @include typography-props(form-item, ui);
    box-sizing: border-box;
  }
  label {
    display: contents;
  }
  .label {
    box-sizing: border-box;
    width: var(--form-label-width, 12em);
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
    .form-item {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--form-label-vertical-gap, var(--space));
    }
    .label {
      text-align: left;
    }
    .form-item {
      width: auto;
      text-align: left;
      font-size: var(--font-size-small);
    }
    .form-item {
      width: var(--form-input-fixed-width, var(--form-input-width));
    }
  }

  /* Global Input Styles */
  .globalInputStyles :global(input),
  .globalInputStyles :global(select),
  .globalInputStyles :global(textarea) {
    @include typography-props(form-input, input, ui);
    @include box-props-square(form-input, input, ui);
    @include focusable();
  }
</style>
