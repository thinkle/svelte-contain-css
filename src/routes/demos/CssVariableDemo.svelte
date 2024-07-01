<script lang="ts">
  import { onMount } from "svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import type { CSSVariable } from "./types";

  export let variables: CSSVariable[] = [];
  let cssValues: { [key: string]: string } = {};

  function handleSetVariables(updatedVariables: { [key: string]: string }) {
    cssValues = updatedVariables;
  }
</script>

<CssVariables {variables} onSetVariables={handleSetVariables} />

<CssWrapper variables={cssValues}>
  <slot />
</CssWrapper>
