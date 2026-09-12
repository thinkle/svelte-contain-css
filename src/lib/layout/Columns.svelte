<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      children?: import("svelte").Snippet;
    },
    { gap?: string | null }
  >;

  let { children, class: className, ...restProps }: Props = $props();

  const el = $derived(elementProps(restProps, "columns", ["gap"]));
</script>

<div class={["columns", className]} {...el}>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .columns {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var_with_fallbacks(--gap, columns, container, 8px);
    justify-content: center;
  }
</style>
