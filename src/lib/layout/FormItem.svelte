<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";

  let {
    fullWidth = false,
    globalInputStyles = true,
    before,
    label,
    after,
    children,
    multiline = false,
    layout = "side",
    above = false,
    below = false,
    ...restProps
  }: {
    fullWidth?: boolean;
    globalInputStyles?: boolean;
    before?: Snippet;
    label?: Snippet;
    after?: Snippet;
    children?: Snippet;
    multiline?: boolean;
    layout?: "side" | "above" | "below";
    above?: boolean;
    below?: boolean;
  } & Record<string, unknown> = $props();

  const cssKeys = ["fullWidth", "globalInputStyles", "multiline"];

  const style = $derived(injectVars(restProps, "form-item", cssKeys));

  const effectiveLayout = $derived<"side" | "above" | "below">(
    above ? "above" : below ? "below" : layout
  );
</script>

<div
  {style}
  class="form-item"
  class:fullWidth
  class:globalInputStyles
  class:multiline
  class:layout-side={effectiveLayout === "side"}
  class:layout-above={effectiveLayout === "above"}
  class:layout-below={effectiveLayout === "below"}
  {...restProps}
>
  {@render before?.()}
  <label>
    <span class="label">
      {@render label?.()}
    </span>
    <span class="input">
      {@render children?.()}
    </span>
  </label>
  {@render after?.()}
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
  .form-item.layout-above {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--form-label-vertical-gap, var(--space));
    --form-label-width: auto;
    --form-label-text-align: left;
    --form-label-align: flex-start;
    --form-label-justify: flex-start;
    font-size: var(--form-item-above-font-size, var(--font-size-small));
  }
  .form-item.layout-below {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: var(--form-label-vertical-gap, var(--space));
    --form-label-width: auto;
    --form-label-text-align: left;
    --form-label-align: flex-start;
    --form-label-justify: flex-start;
    font-size: var(--form-item-below-font-size, var(--font-size-small));
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
