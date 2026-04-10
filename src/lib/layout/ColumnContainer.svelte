<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    size?: "small" | "medium" | "large";
    customWidth?: string | null;
    children?: Snippet;
  } & HTMLAttributes<HTMLElement>;

  let {
    size = "medium",
    customWidth = null,
    children,
    ...restProps
  }: Props = $props();
</script>

<section
  class="column-container"
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  style:--custom-width={customWidth}
  {...restProps}
>
  {@render children?.()}
</section>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .small {
    --w: #{$xxsmall};
  }
  .medium {
    --w: #{$xsmall};
  }
  .large {
    --w: #{$small};
  }

  .column-container {
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
