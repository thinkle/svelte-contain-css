<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLInputAttributes,
    {
      value?: string | number;
      placeholder?: string;
    },
    StyleProps<typeof INPUT_VARS>
  >;

  let {
    value = $bindable(""),
    placeholder = "",
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands this component's own CSS backs, one group per mixin
     it includes. The Props type is derived from this same array, so what
     the component accepts and what it emits cannot drift apart. */
  const INPUT_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(elementProps(restProps, "input", INPUT_VARS));
</script>

<input bind:value {placeholder} class={className} {...el} />

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  input {
    @include typography-props(input, ui);
    @include box-props(input, ui);
    @include color-props(input, ui);
    width: var(--input-width);
    @include focusable();
  }
</style>
