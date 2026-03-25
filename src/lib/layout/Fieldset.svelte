<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";
  import FormProvider from "./FormProvider.svelte";

  let {
    legend,
    children,
    // FormProvider props
    layout,
    fullWidth,
    globalInputStyles,
    multiline,
    // Container-like props
    bg,
    fg,
    padding,
    border,
    borderRadius,
    margin,
    maxWidth,
    minWidth,
    width,
    ...restProps
  }: {
    legend?: Snippet;
    children?: Snippet;
    // FormProvider context props
    layout?: "side" | "above" | "below";
    fullWidth?: boolean;
    globalInputStyles?: boolean;
    multiline?: boolean;
    // Container styling props
    bg?: string;
    fg?: string;
    padding?: string;
    border?: string | boolean;
    borderRadius?: string;
    margin?: string;
    maxWidth?: string;
    minWidth?: string;
    width?: string;
  } & Record<string, unknown> = $props();

  const style = $derived(
    injectVars(
      {
        bg,
        fg,
        padding,
        border,
        borderRadius,
        margin,
        maxWidth,
        minWidth,
        width,
        ...restProps,
      },
      "fieldset",
      [
        "bg",
        "fg",
        "padding",
        "border",
        "borderRadius",
        "margin",
        "maxWidth",
        "minWidth",
        "width",
      ]
    )
  );
</script>

<FormProvider {layout} {fullWidth} {globalInputStyles} {multiline}>
  <fieldset {style} {...restProps}>
    {#if legend}
      <legend>
        {@render legend()}
      </legend>
    {/if}
    {@render children?.()}
  </fieldset>
</FormProvider>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  fieldset {
    @include color-props(fieldset, surface);
    @include box-props(fieldset, surface);

    border: var-with-fallbacks(
      --border,
      fieldset,
      surface,
      1px solid var(--border-color)
    );
    border-radius: var-with-fallbacks(--border-radius, fieldset, surface, 0);
    padding: var-with-fallbacks(--padding, fieldset, surface, var(--space));
    margin: var-with-fallbacks(--margin, fieldset, 0);

    max-width: var(--fieldset-max-width, var(--surface-max-width, 100%));
    min-width: var(--fieldset-min-width, var(--surface-min-width, auto));
    width: var(--fieldset-width, var(--surface-width, auto));

    box-sizing: border-box;
  }

  legend {
    @include typography-props(legend, fieldset, ui);
    @include color-props(legend, fieldset);

    padding: var-with-fallbacks(--padding, legend, 0 var(--space-sm));
    font-weight: var-with-fallbacks(--weight, legend, var(--bold));
  }
</style>
