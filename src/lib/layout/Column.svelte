<script lang="ts">
  export let size: "small" | "medium" | "large" = "medium";
  export let customWidth: string | null = null;
</script>

<section
  class="column"
  class:small={size == "small"}
  class:medium={size == "medium"}
  class:large={size == "large"}
  style:--custom-width={customWidth}
>
  <slot />
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .small {
    --w: #{$xxsmall};
  }
  .medium {
    --w: #{$xsmall};
  }
  .large {
    --w: #{$small};
  }

  section {
    display: flex;
    flex-direction: column;
    width: var(--custom-width, var(--w, 200px));
    gap: var_with_fallbacks(--gap, column, container, 8px);
    container-type: inline-size;
    overflow: auto;
    justify-content: start;
    align-items: center;
  }
</style>
