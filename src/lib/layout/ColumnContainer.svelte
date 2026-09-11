<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { MarginStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    size?: "small" | "medium" | "large";
    customWidth?: string | null;
    children?: Snippet;
  } & MarginStyleProps &
    HTMLAttributes<HTMLElement>;

  let {
    size = "medium",
    customWidth = null,
    children,
    marginBlock = null,
    marginInline = null,
    style: inlineStyle,
    ...restProps
  }: Props = $props();

  const style = $derived(
    injectVars({ marginBlock, marginInline }, "column-container", [
      "marginBlock",
      "marginInline",
    ]) + (inlineStyle ?? ""),
  );
</script>

<section
  class="column-container"
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  style:--custom-width={customWidth}
  {style}
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
    @include margin-props(column-container);
  }
</style>
