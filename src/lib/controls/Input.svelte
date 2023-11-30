<script lang="ts">
  export let value: string;
  export let placeholder: string = "";
  import "../vars/globalInputs.css";
</script>

<input {placeholder} bind:value on:input on:change on:blur on:focus />

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  input {
    @include typography-props(input, ui);
    @include box-props(input, ui);
    width: var(--input-width);
  }
</style>
