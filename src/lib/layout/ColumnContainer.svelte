<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, MarginStyleProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    MARGIN_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      size?: "small" | "medium" | "large";
      customWidth?: string | null;
      children?: Snippet;
    },
    MarginStyleProps &
      StyleProps<typeof COLUMN_CONTAINER_VARS>
  >;

  let {
    size = "medium",
    customWidth = null,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands column-container's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const COLUMN_CONTAINER_VARS = [
    ...MARGIN_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "column-container", COLUMN_CONTAINER_VARS),
  );
</script>

<section
  class={["column-container", className]}
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  style:--custom-width={customWidth}
  {...el}
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
