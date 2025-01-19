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
  
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Container from "$lib/layout/Container.svelte";
  
</script>

  <Container height="auto">
    <CssVariables {variables} onSetVariables={handleSetVariables} />  
  </Container>
  <CssWrapper variables={cssValues} >
    <slot />
  </CssWrapper>


