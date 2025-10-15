<script lang="ts">
  interface Props {
    size?: "small" | "medium" | "large";
    customWidth?: string | null;
    children?: import('svelte').Snippet;
  }

  let { size = "medium", customWidth = null, children }: Props = $props();
</script>

<section
  class="column"
  class:small={size == "small"}
  class:medium={size == "medium"}
  class:large={size == "large"}
  style:--custom-width={customWidth}
>
  {@render children?.()}
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
    align-items: var(--column-align, center);
  }
</style>
