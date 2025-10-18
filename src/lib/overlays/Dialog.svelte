<script lang="ts">
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import { copyCSSVariables, injectVars } from "$lib/util";
  import type { Snippet } from "svelte";

  type PropsType = {
    open?: boolean;
    modal?: boolean;
    children?: Snippet;
    onclose?: () => void;
    onClose?: () => void;
  } & Record<string, unknown>;

  let {
    open = true,
    modal = true,
    children,
    onclose = () => {},
    onClose = onclose,
    ...restProps
  }: PropsType = $props();

  if (onClose && !onclose) {
    onclose = onClose; // backward compatibility
  }

  let style = injectVars(restProps, "dialog", []);
  $effect(() => {
    if (dialogElement) {
      if (open) {
        if (modal) {
          copyCSSVariables(ref, dialogElement);
          dialogElement.showModal();
        } else {
          copyCSSVariables(ref, dialogElement);
          dialogElement.show();
        }
      } else if (dialogElement) {
        dialogElement.close();
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
    {@render children?.()}
    <div class="close-button">
      <MiniButton onclick={onclose}>&times;</MiniButton>
    </div>
  </dialog>
</section>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .variable-placeholder {
    display: none;
  }
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
