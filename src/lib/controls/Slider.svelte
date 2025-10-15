<script lang="ts">
  let { value = $bindable(0), ...restProps } = $props<{
    value?: number;
  }>();
</script>

<input type="range" bind:value {...restProps} />

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  :root {
    --slider-button-color: var(--primary-bg);
    --slider-button-radius: 50%;
    --slider-line-color: var(--fg);
    /* Add more variables and styles as needed */
  }

  input[type="range"] {
    /* Apply your custom styles here */
    background: transparent;
    @include focusable();
  }

  /* Slider Thumb */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: var(--slider-button-color);
    border-radius: 3px;
    width: 18px;
    /* More styles for the thumb */
  }

  input[type="range"]::-moz-range-thumb {
    /* Styles for Firefox */
  }

  /* Slider Track */
  input[type="range"]::-webkit-slider-runnable-track {
    background: var(--slider-line-color);
    /* More styles for the track */
  }

  input[type="range"]::-moz-range-track {
    /* Styles for Firefox */
  }
</style>
