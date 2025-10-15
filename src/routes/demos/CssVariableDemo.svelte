<script lang="ts">
  import { onMount } from "svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import type { CSSVariable } from "./types";

  let cssValues: { [key: string]: string } = $state({});

  function handleSetVariables(updatedVariables: { [key: string]: string }) {
    cssValues = updatedVariables;
  }

  import Dialog from "$lib/overlays/Dialog.svelte";
  import Button from "$lib/controls/Button.svelte";
  interface Props {
    variables?: CSSVariable[];
    children?: import("svelte").Snippet;
  }

  let { variables = [], children }: Props = $props();

  let modalIsOpen = $state(false);
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

<Button onclick={() => (modalIsOpen = true)}>Set CSS Variables</Button>
<CssWrapper variables={cssValues}>
  {@render children?.()}
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
