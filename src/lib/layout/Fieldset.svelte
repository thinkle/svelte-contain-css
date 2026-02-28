<script lang="ts">
  import { injectVars } from "$lib/util";
  import FormProvider from "./FormProvider.svelte";

  export let layout: "side" | "above" | "below" | undefined = undefined;
  export let fullWidth: boolean | undefined = undefined;
  export let globalInputStyles: boolean | undefined = undefined;
  export let multiline: boolean | undefined = undefined;

  export let bg: string | undefined = undefined;
  export let fg: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let border: string | boolean | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let margin: string | undefined = undefined;
  export let maxWidth: string | undefined = undefined;
  export let minWidth: string | undefined = undefined;
  export let width: string | undefined = undefined;

  $: style = injectVars(
    { bg, fg, padding, border, borderRadius, margin, maxWidth, minWidth, width, ...$$restProps },
    "fieldset",
    ["bg", "fg", "padding", "border", "borderRadius", "margin", "maxWidth", "minWidth", "width"]
  );
</script>

<FormProvider {layout} {fullWidth} {globalInputStyles} {multiline}>
  <fieldset {style} {...$$restProps}>
    {#if $$slots.legend}
      <legend>
        <slot name="legend" />
      </legend>
    {/if}
    <slot />
  </fieldset>
</FormProvider>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  fieldset {
    @include color-props(fieldset, container);
    @include box-props(fieldset, container);

    border: var-with-fallbacks(
      --border,
      fieldset,
      container,
      1px solid var(--border-color)
    );
    border-radius: var-with-fallbacks(--border-radius, fieldset, container, 0);
    padding: var-with-fallbacks(--padding, fieldset, container, var(--space));
    margin: var-with-fallbacks(--margin, fieldset, 0);

    max-width: var(--fieldset-max-width, var(--container-max-width, 100%));
    min-width: var(--fieldset-min-width, var(--container-min-width, auto));
    width: var(--fieldset-width, var(--container-width, auto));

    box-sizing: border-box;
  }

  legend {
    @include typography-props(legend, fieldset, ui);
    @include color-props(legend, fieldset);

    padding: var-with-fallbacks(--padding, legend, 0 var(--space-sm));
    font-weight: var-with-fallbacks(--weight, legend, var(--bold));
  }
</style>
