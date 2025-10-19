<script lang="ts">
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import { copyCSSVariables, injectVars } from "$lib/util";
  import type { Snippet } from "svelte";

  type PropsType = {
    open?: boolean;
    modal?: boolean;
    dismissible?: boolean;
    children?: Snippet;
    onclose?: () => void;
    onClose?: () => void;
  } & Record<string, unknown>;

  let {
    open = true,
    modal = true,
    dismissible = false,
    children,
    onClose,
    onclose: oncloseProp = null,
    ...restProps
  }: PropsType = $props();

  let onclose = $derived(oncloseProp || onClose);

  let style = injectVars(restProps, "dialog", []);

  // Handle backdrop click to close modal (click outside behavior)
  // Clicks on the dialog element itself (the backdrop) close the dialog
  function handleBackdropClick(event: MouseEvent) {
    if (!dismissible) return;

    // Don't close if the click target is a popover or other interactive element
    const target = event.target as HTMLElement;
    if (target?.hasAttribute?.("popover")) return;
    if (target?.closest?.("[popover]")) return;

    // The dialog element receives clicks on the backdrop area;
    // we want to close only when clicking the backdrop, not dialog content.
    // Check if the click's coordinates are outside the dialog's content box.
    const rect = dialogElement?.getBoundingClientRect();
    if (
      rect &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    ) {
      onclose();
    }
  }

  $effect(() => {
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
        onclose();
      }
    }
  });
  let dialogElement: HTMLDialogElement;
  let ref: HTMLDivElement;
</script>

<section {style}>
  <div class="variable-placeholder" bind:this={ref}></div>
  <dialog bind:this={dialogElement} {onclose} {...restProps}>
    <div class="close-bar">
      <div class="close-button">
        <MiniButton onclick={onclose}>&times;</MiniButton>
      </div>
    </div>
    {@render children?.()}
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
    height: var(--dialog-padding, var(--padding, 8px));
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
