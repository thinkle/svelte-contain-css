<script module lang="ts">
  let warned = false;
</script>

<script lang="ts">
  import { BROWSER, DEV } from "esm-env";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, MarginStyleProps } from "$lib/types";
  import ColumnContainer from "./ColumnContainer.svelte";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      size?: "small" | "medium" | "large";
      customWidth?: string | null;
      children?: Snippet;
    },
    MarginStyleProps
  >;

  let {
    size = "medium",
    customWidth = null,
    children,
    ...restProps
  }: Props = $props();

  if (BROWSER && DEV && !warned) {
    warned = true;
    console.warn(
      "[ContainCSS] <Column> is deprecated. Use <ColumnContainer> for sized rails or <Stack> for generic vertical layout.",
    );
  }
</script>

<ColumnContainer {size} {customWidth} {...restProps}>
  {@render children?.()}
</ColumnContainer>
