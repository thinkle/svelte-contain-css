<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLButtonAttributes,
    {
      primary?: boolean;
      warning?: boolean;
      danger?: boolean;
      success?: boolean;
      info?: boolean;
      type?: "button" | "submit" | "reset";
      children?: import("svelte").Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof CIRCLE_BUTTON_VARS>
  >;

  let {
    primary = false,
    warning = false,
    danger = false,
    success = false,
    info = false,
    type = "button",
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands circle-button's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const CIRCLE_BUTTON_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "circle-button", [
      ...CIRCLE_BUTTON_VARS,
      "padding",
      "width",
      "height",
    ]),
  );
</script>

<button
  {type}
  class={className}
  class:primary
  class:warning
  class:danger
  class:success
  class:info
  {...el}
>
  {@render children?.()}
</button>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  button.primary {
    @include color-props(primary, button, control);
  }
  button {
    /* `circle-button` first, `mini-button` behind it. This component was
       called MiniButton until it was renamed to stop people putting text in a
       circle; its variables kept the old prefix. Every include and every
       var() below names both, so `--circle-button-bg` is the name to reach
       for while an existing `--mini-button-bg` -- in a theme, or in an app
       that set one years ago -- keeps working untouched. */
    @include typography-props(circle-button, mini-button, button, ui, control);
    @include color-props(circle-button, mini-button, button, control, secondary);
    @include clickable(circle-button, mini-button, button, clickable);
    @include box-shadow(circle-button, mini-button, button, control);
    @include focusable();
    margin: var-with-fallbacks(--margin, button, control, var(--space));
    width: var(--circle-button-size, var(--mini-button-size, var(--icon-size, 1em)));
    height: var(--circle-button-size, var(--mini-button-size, var(--icon-size, 1em)));
    /* Make sure we don't shrink in a flex container */
    min-width: var(--circle-button-size, var(--mini-button-size, var(--icon-size, 1em)));
    min-height: var(--circle-button-size, var(--mini-button-size, var(--icon-size, 1em)));
    border-radius: var(--circle-button-radius, var(--mini-button-radius, 50%));
    /* var-with-fallbacks, not var: this was
       `var(--mini-button-border, button-border, none)`, which reads as
       `--mini-button-border` with the fallback "button-border, none". That is
       not a valid border, so `--button-border` was never consulted and an
       unset chain produced `none` only by accident (invalid at
       computed-value time -> the initial `medium none`). */
    border: var-with-fallbacks(--border, circle-button, mini-button, button, none);
    display: inline-grid;
    place-content: center;
    line-height: 1;
    flex-shrink: 0; /* Don't shrink any more */
  }
  button.primary {
    @include color-props(primary, button, control);
  }
  button.warning {
    @include color-props(warning, button, control);
  }
  button.danger {
    @include color-props(danger, button, control);
  }
  button.success {
    @include color-props(success, button, control);
  }
  button.info {
    @include color-props(info, button, control);
  }
</style>
