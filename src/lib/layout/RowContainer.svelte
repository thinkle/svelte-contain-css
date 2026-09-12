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
      customHeight?: string | null;
      children?: Snippet;
    },
    MarginStyleProps &
      StyleProps<typeof ROW_CONTAINER_VARS>
  >;

  let {
    size = "medium",
    customHeight = null,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands row-container's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const ROW_CONTAINER_VARS = [
    ...MARGIN_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "row-container", ROW_CONTAINER_VARS),
  );
</script>

<section
  class={["row-container", className]}
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  style:--custom-height={customHeight}
  {...el}
>
  {@render children?.()}
</section>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .small {
    --h: 120px;
  }
  .medium {
    --h: 240px;
  }
  .large {
    --h: 360px;
  }

  .row-container {
    display: flex;
    flex-direction: row;
    height: var(--custom-height, var(--h, 200px));
    gap: var_with_fallbacks(--gap, column, container, 8px);
    container-type: size;
    overflow: auto;
    align-items: flex-start;
    --form-label-width: auto;
    @include margin-props(row-container);
  }
</style>
