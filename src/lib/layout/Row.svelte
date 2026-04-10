<script module lang="ts">
  let warned = false;
</script>

<script lang="ts">
  import { BROWSER, DEV } from "esm-env";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import RowContainer from "./RowContainer.svelte";

  type Props = {
    size?: "small" | "medium" | "large";
    customHeight?: string | null;
    children?: Snippet;
  } & HTMLAttributes<HTMLElement>;

  let {
    size = "medium",
    customHeight = null,
    children,
    ...restProps
  }: Props = $props();

  if (BROWSER && DEV && !warned) {
    warned = true;
    console.warn(
      "[ContainCSS] <Row> is deprecated. Use <RowContainer> for sized lanes or <Inline> for generic horizontal layout.",
    );
  }
</script>

<RowContainer {size} {customHeight} {...restProps}>
  {@render children?.()}
</RowContainer>
