<script lang="ts">
  export let value: string;
  export let placeholder: string = "";
</script>

<input
  {placeholder}
  bind:value
  on:input
  on:change
  on:blur
  on:focus
  {...$$restProps}
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
