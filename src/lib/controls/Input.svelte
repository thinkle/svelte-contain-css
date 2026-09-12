<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";

  type Props = ContainProps<
    HTMLInputAttributes,
    {
      value?: string | number;
      placeholder?: string;
    }
  >;

  let {
    value = $bindable(""),
    placeholder = "",
    class: className,
    ...restProps
  }: Props = $props();

  const el = $derived(elementProps(restProps, "input"));
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
