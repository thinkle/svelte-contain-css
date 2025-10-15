<script lang="ts">
  let {
    value = $bindable(""),
    placeholder = "",
  } = $props<{ value?: string; placeholder?: string }>();
  const restProps = $restProps();
</script>

<input
  bind:value
  placeholder={placeholder}
  {...restProps}
/>

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
