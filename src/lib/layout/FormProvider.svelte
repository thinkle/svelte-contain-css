<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext, getContext } from "svelte";

  type FormItemDefaults = {
    layout?: "side" | "above" | "below";
    collapseSide?: boolean;
    fullWidth?: boolean;
    globalInputStyles?: boolean;
    multiline?: boolean;
  };

  let {
    layout,
    collapseSide,
    fullWidth,
    globalInputStyles,
    multiline,
    children,
  }: FormItemDefaults & {
    children?: Snippet;
  } = $props();

  // Get parent context if it exists
  const parentContext = getContext<FormItemDefaults>("formItemDefaults");

  // Make context reactive using $state, merging with parent.
  // The $effect below keeps these in sync; the initial values are intentional.
  // svelte-ignore state_referenced_locally
  let contextValue = $state<FormItemDefaults>({
    layout: layout ?? parentContext?.layout,
    collapseSide: collapseSide ?? parentContext?.collapseSide,
    fullWidth: fullWidth ?? parentContext?.fullWidth,
    globalInputStyles: globalInputStyles ?? parentContext?.globalInputStyles,
    multiline: multiline ?? parentContext?.multiline,
  });

  // Update context value properties when props change, falling back to parent
  $effect(() => {
    contextValue.layout = layout ?? parentContext?.layout;
    contextValue.collapseSide = collapseSide ?? parentContext?.collapseSide;
    contextValue.fullWidth = fullWidth ?? parentContext?.fullWidth;
    contextValue.globalInputStyles =
      globalInputStyles ?? parentContext?.globalInputStyles;
    contextValue.multiline = multiline ?? parentContext?.multiline;
  });

  // Set context once with reactive state object
  setContext<FormItemDefaults>("formItemDefaults", contextValue);
</script>

{@render children?.()}
