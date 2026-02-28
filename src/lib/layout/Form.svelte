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

  export let action: string | undefined = undefined;
  export let method: "get" | "post" | "dialog" | undefined = undefined;

  $: style = injectVars(
    { bg, fg, padding, border, borderRadius, margin, maxWidth, minWidth, width, ...$$restProps },
    "form",
    ["bg", "fg", "padding", "border", "borderRadius", "margin", "maxWidth", "minWidth", "width"]
  );
</script>

<FormProvider {layout} {fullWidth} {globalInputStyles} {multiline}>
  <form {style} {action} {method} on:submit {...$$restProps}>
    <slot />
  </form>
</FormProvider>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  form {
    @include color-props(form, container);
    @include box-props(form, container);

    border: var-with-fallbacks(--border, form, container, none);
    border-radius: var-with-fallbacks(--border-radius, form, container, 0);
    padding: var-with-fallbacks(--padding, form, container, 0);
    margin: var-with-fallbacks(--margin, form, 0);

    max-width: var(--form-max-width, var(--container-max-width, 100%));
    min-width: var(--form-min-width, var(--container-min-width, auto));
    width: var(--form-width, var(--container-width, auto));

    box-sizing: border-box;
  }
</style>
