<script lang="ts">
  import { afterUpdate } from "svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Container from "$lib/layout/Container.svelte";
  import { injectVars } from "$lib/util";
  export let onClose = () => {};
  export let open = true;
  export let modal = true;
  let style = injectVars($$props, "dialog", []);
  afterUpdate(() => {
    if (dialogElement) {
      if (open) {
        if (modal) {
          dialogElement.showModal();
        } else {
          dialogElement.show();
        }
      } else if (dialogElement) {
        dialogElement.close();
        onClose();
      }
    }
  });
  let dialogElement: HTMLDialogElement;
</script>

<section {style}>
  <dialog bind:this={dialogElement} on:close={onClose}>
    <slot />
    <div class="close-button">
      <MiniButton on:click={onClose}>&times;</MiniButton>
    </div>
  </dialog>
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
  }
  dialog {
    @include box-props(dialog, top, container, block);
    @include color-props(dialog, top, container, block);
    @include box-shadow(dialog, top, container, block);
    min-width: min(
      calc(100vw - var(--padding) * 2),
      var(--dialog-min-width, 400px)
    );
    max-width: max(
      calc(100vw - var(--padding) * 2),
      var(--dialog-max-width, 800px)
    );
    min-height: min(
      calc(100vh - var(--padding) * 2),
      var(--dialog-min-height, 300px)
    );
    max-height: max(
      calc(100vh - var(--padding) * 2),
      var(--dialog-max-height, 800px)
    );
  }
  ::backdrop {
    transition:
      background-color,
      backdrop-filter 3s ease-in-out;
    background-color: var(--dialog-underlay-color, rgba(0, 0, 0, 0.1));
    backdrop-filter: var(--dialog-underlay-filter, blur(2px));
  }

  section {
    display: contents;
  }
</style>
