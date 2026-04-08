<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { injectVars } from "$lib/util";
  import FormProvider from "./FormProvider.svelte";

  let {
    children,
    // FormProvider props
    layout,
    collapseSide,
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
    // Form-specific props
    action,
    method,
    onsubmit,
    ...restProps
  }: {
    children?: Snippet;
    // FormProvider context props
    layout?: "side" | "above" | "below";
    collapseSide?: boolean;
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
    // Form attributes
    action?: string;
    method?: "get" | "post" | "dialog";
    onsubmit?: (event: SubmitEvent) => void;
  } & HTMLAttributes<HTMLFormElement> = $props();

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
      "form",
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

<FormProvider
  {layout}
  {collapseSide}
  {fullWidth}
  {globalInputStyles}
  {multiline}
>
  <form {style} {action} {method} {onsubmit} {...restProps}>
    {@render children?.()}
  </form>
</FormProvider>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  form {
    @include color-props(form, surface);
    @include box-props(form, surface);

    border: var-with-fallbacks(--border, form, surface, none);
    border-radius: var-with-fallbacks(--border-radius, form, surface, 0);
    padding: var-with-fallbacks(--padding, form, surface, 0);
    margin: var-with-fallbacks(--margin, form, 0);

    max-width: var(--form-max-width, var(--surface-max-width, 100%));
    min-width: var(--form-min-width, var(--surface-min-width, auto));
    width: var(--form-width, var(--surface-width, auto));

    box-sizing: border-box;
  }
</style>
