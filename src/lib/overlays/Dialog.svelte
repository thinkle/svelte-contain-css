<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import { copyCSSVariables, injectVars } from "$lib/util";

  export let onClose = () => {};
  export let open = true;
  export let modal = true;
  export let dismissible = false;

  let style = injectVars($$props, "dialog", []);
  let dialogElement: HTMLDialogElement;
  let ref: HTMLDivElement;

  // Handle backdrop click to close modal (click outside behavior)
  function handleBackdropClick(event: MouseEvent) {
    if (!dismissible) return;

    // Don't close if the click target is a popover or other interactive element
    const target = event.target as HTMLElement;
    if (target?.hasAttribute?.("popover")) return;
    if (target?.closest?.("[popover]")) return;

    // Check if click is outside the dialog content box (on backdrop)
    const rect = dialogElement?.getBoundingClientRect();
    if (
      rect &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    ) {
      onClose();
    }
  }

  afterUpdate(() => {
    if (dialogElement) {
      if (open) {
        if (modal) {
          copyCSSVariables(ref, dialogElement);
          dialogElement.showModal();
          if (dismissible) {
            dialogElement.addEventListener("click", handleBackdropClick);
          }
        } else {
          copyCSSVariables(ref, dialogElement);
          dialogElement.show();
        }
      } else if (dialogElement) {
        dialogElement.close();
        dialogElement.removeEventListener("click", handleBackdropClick);
        onClose();
      }
    }
  });

  onDestroy(() => {
    if (dialogElement) {
      dialogElement.removeEventListener("click", handleBackdropClick);
    }
  });
</script>

<section {style}>
  <div class="variable-placeholder" bind:this={ref}></div>
  <dialog bind:this={dialogElement} on:close={onClose}>
    <div class="close-bar">
      <div class="close-button">
        <MiniButton on:click={onClose}>&times;</MiniButton>
      </div>
    </div>
    <slot />
  </dialog>
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .variable-placeholder {
    display: none;
  }
  .close-bar {
    position: sticky;
    top: var(--padding, 1rem);
    height: var(
      --dialog-padding,
      var(--mini-button-size, var(--icon-size, 32px))
    );
    display: flex;
    justify-content: flex-end;
  }
  .close-button {
    top: 1rem;
    right: 1rem;
    z-index: 2;
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
