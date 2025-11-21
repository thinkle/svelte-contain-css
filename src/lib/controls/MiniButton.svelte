<script lang="ts">
  import { injectVars } from "$lib/util";

  let {
    primary = false,
    warning = false,
    type = "button",
    children,
    ...restProps
  }: {
    primary?: boolean;
    warning?: boolean;
    type?: "button" | "submit" | "reset";
    children?: import("svelte").Snippet;
  } & Record<string, unknown> = $props();

  const style = $derived(
    injectVars(restProps, "mini-button", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
    ])
  );
</script>

<button {style} {type} class:primary class:warning {...restProps}>
  {@render children?.()}
</button>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  button.primary {
    @include color-props(primary, button, control);
  }
  button {
    @include typography-props(button, control);
    @include color-props(mini-button, button, control, secondary);
    font-family: var(--button-font);
    @include clickable(mini-button, button, clickable);
    @include box-shadow(mini-button, button, control);
    @include focusable();
    margin: var-with-fallbacks(--margin, button, control, var(--space));
    width: var(--mini-button-size, var(--icon-size, 1em));
    height: var(--mini-button-size, var(--icon-size, 1em));
    /* Make sure we don't shrink in a flex container */
    min-width: var(--mini-button-size, var(--icon-size, 1em));
    min-height: var(--mini-button-size, var(--icon-size, 1em));
    border-radius: var(--mini-button-radius, 50%);
    border: var(--mini-button-border, button-border, none);
    display: inline-grid;
    place-content: center;
    flex-shrink: 0; /* Don't shrink any more */
  }
  button.primary {
    @include color-props(primary, button, control);
  }
  button.warning {
    @include color-props(warning, button, control);
  }
</style>
