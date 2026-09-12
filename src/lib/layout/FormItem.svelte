<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import { getContext } from "svelte";

  type FormItemDefaults = {
    layout?: "side" | "above" | "below";
    collapseSide?: boolean;
    fullWidth?: boolean;
    globalInputStyles?: boolean;
    multiline?: boolean;
  };

  const contextDefaults = getContext<FormItemDefaults>("formItemDefaults");

  let {
    fullWidth,
    globalInputStyles,
    label,
    after,
    children,
    multiline,
    layout,
    collapseSide,
    above = false,
    below = false,
    class: className,
    ...restProps
  }: ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      fullWidth?: boolean;
      globalInputStyles?: boolean;
      label?: Snippet;
      after?: Snippet;
      children?: Snippet;
      multiline?: boolean;
      layout?: "side" | "above" | "below";
      collapseSide?: boolean;
      above?: boolean;
      below?: boolean;
    },
    StyleProps<typeof FORM_ITEM_VARS>
  > = $props();

  /* The shorthands this component's own CSS backs, one group per mixin
     it includes. The Props type is derived from this same array, so what
     the component accepts and what it emits cannot drift apart. */
  const FORM_ITEM_VARS = [
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(elementProps(restProps, "form-item", FORM_ITEM_VARS));

  // Use $derived to reactively compute values from context
  const effectiveFullWidth = $derived(
    fullWidth ?? contextDefaults?.fullWidth ?? false
  );
  const effectiveGlobalInputStyles = $derived(
    globalInputStyles ?? contextDefaults?.globalInputStyles ?? true
  );
  const effectiveMultiline = $derived(
    multiline ?? contextDefaults?.multiline ?? false
  );
  const effectiveCollapseSide = $derived(
    collapseSide ?? contextDefaults?.collapseSide ?? true
  );
  const effectiveLayoutFromContext = $derived(
    layout ?? contextDefaults?.layout ?? "side"
  );

  const effectiveLayout = $derived<"side" | "above" | "below">(
    above ? "above" : below ? "below" : effectiveLayoutFromContext
  );
</script>

<div
  class={["form-item", className]}
  class:fullWidth={effectiveFullWidth}
  class:globalInputStyles={effectiveGlobalInputStyles}
  class:multiline={effectiveMultiline}
  class:collapse-side={effectiveCollapseSide}
  class:layout-side={effectiveLayout === "side"}
  class:layout-above={effectiveLayout === "above"}
  class:layout-below={effectiveLayout === "below"}
  {...el}
>
  <label>
    <span class="label">
      {@render label?.()}
    </span>
    <span class="input">
      {@render children?.()}
    </span>
  </label>
  <div class="after">{@render after?.()}</div>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .form-item {
    display: flex;
    align-items: var(--form-label-align, baseline);
    justify-content: var(--form-label-justify, flex-start);
    gap: var(--form-label-horizontal-gap, var(--padding));
    /* var-with-fallbacks, not var: `var(--padding, form-item, 8px)` asks for
       `--padding` with the fallback "form-item, 8px", which is not a length --
       so `--form-item-padding` was never consulted and an unset `--padding`
       collapsed the padding to 0 rather than 8px. */
    padding-top: var-with-fallbacks(--padding, form-item, 8px);
    padding-bottom: var-with-fallbacks(--padding, form-item, 8px);
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
    .form-item.layout-side.collapse-side {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--form-label-vertical-gap, var(--space));
    }
    .form-item.layout-side.collapse-side .label {
      text-align: left;
    }
    .form-item.layout-side.collapse-side {
      width: auto;
      text-align: left;
      font-size: var(--font-size-small);
    }
    .form-item.layout-side.collapse-side {
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
