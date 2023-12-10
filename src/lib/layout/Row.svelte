<script lang="ts">
  export let size: "small" | "medium" | "large" = "medium";
  export let customHeight: string | null = null;
</script>

<section
  class="row"
  class:small={size == "small"}
  class:medium={size == "medium"}
  class:large={size == "large"}
  style:--custom-height={customHeight}
>
  <slot />
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .small {
    --h: 120px;
  }
  .medium {
    --h: 240px;
  }
  .large {
    --h: 360px;
  }

  section {
    display: flex;
    flex-direction: row;
    height: var(--custom-height, var(--h, 200px));
    gap: var_with_fallbacks(--gap, column, container, 8px);
    container-type: size;
    overflow: auto;
    align-items: flex-start;
  }
</style>
