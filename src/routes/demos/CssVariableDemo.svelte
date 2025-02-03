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

  import Dialog from "$lib/overlays/Dialog.svelte";
  import Button from "$lib/controls/Button.svelte";

  let modalIsOpen = false;
</script>

<div class="popup-wrap" class:visible={modalIsOpen}>
  <Dialog
    --dialog-underlay-filter="none"
    --dialog-underlay-color="transparent"
    modal={false}
    onClose={() => (modalIsOpen = false)}
  >
    <CssVariables {variables} onSetVariables={handleSetVariables} />
  </Dialog>
</div>

<Button on:click={() => (modalIsOpen = true)}>Set CSS Variables</Button>
<CssWrapper variables={cssValues}>
  <slot />
</CssWrapper>

<style>
  .popup-wrap {
    position: fixed;
    width: 100vw;
    right: var(--padding);
    top: var(--padding);
    visibility: hidden;
    pointer-events: none;
    z-index: 2;
  }
  .popup-wrap.visible {
    visibility: visible;
    pointer-events: auto;
  }
</style>
