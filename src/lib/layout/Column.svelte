<script module lang="ts">
  let warned = false;
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import ColumnContainer from "./ColumnContainer.svelte";

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

  if (typeof window !== "undefined" && import.meta.env.DEV && !warned) {
    warned = true;
    console.warn(
      "[ContainCSS] <Column> is deprecated. Use <ColumnContainer> for sized rails or <Stack> for generic vertical layout.",
    );
  }
</script>

<ColumnContainer {size} {customWidth} {...restProps}>
  {@render children?.()}
</ColumnContainer>
