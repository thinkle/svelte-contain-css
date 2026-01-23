<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = {
    value?: string;
    placeholder?: string;
  } & HTMLInputAttributes;

  let {
    value = $bindable(""),
    placeholder = "",
    ...restProps
  }: Props = $props();
</script>

<input bind:value {placeholder} {...restProps} />

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  input {
    @include typography-props(input, ui);
    @include box-props(input, ui);
    @include color-props(input, ui);
    width: var(--input-width);
    @include focusable();
  }
</style>
