<script>
  import { injectVars } from "$lib/util";
  import { getContext } from "svelte";

  export let fullWidth = undefined;
  export let globalInputStyles = undefined;
  export let multiline = undefined;
  export let layout = undefined;
  export let above = false;
  export let below = false;

  const contextStore = getContext("formItemDefaults");

  $: contextDefaults = contextStore && typeof contextStore.subscribe === 'function'
    ? (() => { let val; contextStore.subscribe(v => { val = v; })(); return val; })()
    : contextStore;

  $: effectiveFullWidth = fullWidth ?? contextDefaults?.fullWidth ?? false;
  $: effectiveGlobalInputStyles = globalInputStyles ?? contextDefaults?.globalInputStyles ?? true;
  $: effectiveMultiline = multiline ?? contextDefaults?.multiline ?? false;
  $: effectiveLayoutFromContext = layout ?? contextDefaults?.layout ?? "side";
  $: effectiveLayout = above ? "above" : below ? "below" : effectiveLayoutFromContext;

  $: style = injectVars($$props, "form-item", [
    "fullWidth",
    "globalInputStyles",
    "multiline",
  ]);
</script>

<div
  {style}
  class="form-item"
  class:fullWidth={effectiveFullWidth}
  class:globalInputStyles={effectiveGlobalInputStyles}
  class:multiline={effectiveMultiline}
  class:layout-side={effectiveLayout === "side"}
  class:layout-above={effectiveLayout === "above"}
  class:layout-below={effectiveLayout === "below"}
>
  <label>
    <span class="label">
      <slot name="label" />
    </span>
    <span class="input">
      <slot />
    </span>
  </label>
  <div class="after"><slot name="after" /></div>
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

  /* For grid layouts, we just use grid-template-areas to adjust */
  .after {
    grid-area: after;
    align-self: center;
  }
  .input {
    grid-area: input;
  }
  .label {
    grid-area: label;
  }
  .form-item.layout-below {
    display: grid;
    grid-template-areas:
      "input after"
      "label .";
    /* Ensure the input column stretches while the after column sizes to content */
    align-items: flex-start;
    gap: var(--form-label-vertical-gap, var(--space));
    --form-label-width: auto;
    --form-label-text-align: left;
    --form-label-align: flex-start;
    --form-label-justify: flex-start;
    font-size: var(
      --form-item-below-font-size,
      var(--form-item-above-font-size, var(--font-size-small))
    );
  }
  .form-item.fullWidth.layout-below,
  .form-item.fullWidth.layout-above {
    grid-template-columns: 1fr auto;
  }

  .form-item.layout-below .label {
    padding-left: var(--form-item-label-below-padding-left, var(--padding));
  }

  .form-item.layout-above {
    display: grid;
    grid-template-areas:
      "label ."
      "input after";

    align-items: flex-start;
    gap: var(--form-label-vertical-gap, var(--space));
    --form-label-width: auto;
    --form-label-text-align: left;
    --form-label-align: flex-start;
    --form-label-justify: flex-start;
    font-size: var(--form-item-above-font-size, var(--font-size-small));
  }
  .form-item.multiline {
    align-items: flex-start;
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

  /* In grid layouts, make the input area stretch fully */
  .form-item.fullWidth.layout-above .input,
  .form-item.fullWidth.layout-below .input {
    width: 100%;
    min-width: 0; /* allow grid child to shrink within its track */
  }

  /* Ensure native controls fill the input area in grid layouts */
  .form-item.fullWidth.layout-above .input :global(input),
  .form-item.fullWidth.layout-above .input :global(select),
  .form-item.fullWidth.layout-above .input :global(textarea),
  .form-item.fullWidth.layout-below .input :global(input),
  .form-item.fullWidth.layout-below .input :global(select),
  .form-item.fullWidth.layout-below .input :global(textarea) {
    width: 100%;
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
    .form-item.layout-side {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--form-label-vertical-gap, var(--space));
    }
    .form-item.layout-side .label {
      text-align: left;
    }
    .form-item.layout-side {
      width: auto;
      text-align: left;
      font-size: var(--font-size-small);
    }
    .form-item.layout-side {
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
