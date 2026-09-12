<script lang="ts">
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import { copyCSSVariables, splitProps } from "$lib/util";
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";

  type PropsType = ContainProps<
    HTMLDialogAttributes,
    {
      open?: boolean;
      modal?: boolean;
      dismissible?: boolean;
      children?: Snippet;
      onclose?: (() => void) | null;
      onClose?: (() => void) | null;
    }
  >;

  let {
    open = true,
    modal = true,
    dismissible = false,
    children,
    onClose,
    onclose: oncloseProp = null,
    class: className,
    ...restProps
  }: PropsType = $props();

  let onclose = $derived(oncloseProp || onClose);

  /* The <section> is the variable carrier that copyCSSVariables reads through,
     so it takes the style while the <dialog> takes the attributes -- a
     caller's `aria-*` and `data-*` belong on the dialog itself. */
  const el = $derived(splitProps(restProps, "dialog"));

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
      onclose?.();
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
        onclose?.();
      }
    }
  });
  let dialogElement: HTMLDialogElement;
  let ref: HTMLDivElement;
</script>

<section style={el.style}>
  <div class="variable-placeholder" bind:this={ref}></div>
  <dialog bind:this={dialogElement} {onclose} class={className} {...el.attrs}>
    <div class="close-bar">
      <div class="close-button">
        <CircleButton onclick={onclose}>&times;</CircleButton>
      </div>
    </div>
    {@render children?.()}
  </dialog>
</section>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
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
    @include box-props(dialog, top, surface, block);
    @include color-props(dialog, top, surface, block);
    @include typography-container-props(dialog, top, surface, block);
    @include box-shadow(dialog, top, surface, block);
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
