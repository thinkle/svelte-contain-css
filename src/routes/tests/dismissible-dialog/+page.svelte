<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let dialogOpen = $state(false);
  let count = $state(0);
  let fileInput: HTMLInputElement;
</script>

<Page>
  <TextLayout>
    <h2>Dismissible Dialog (Regression)</h2>
    <p>
      A dismissible dialog closes on a backdrop click. It must not close on a
      click that came from the keyboard or from script, both of which carry
      coordinates of 0.
    </p>

    <Button data-testid="open-dialog" onclick={() => (dialogOpen = true)}>
      Open Dialog
    </Button>
    <p>count: <span data-testid="count">{count}</span></p>

    <Dialog
      open={dialogOpen}
      modal={true}
      dismissible={true}
      onClose={() => {
        dialogOpen = false;
      }}
    >
      <h3>Dismissible Dialog</h3>
      <Button data-testid="count-button" onclick={() => (count += 1)}>
        Count up
      </Button>
      <!-- The shape that first showed this up: a button whose work is to
           click a hidden input, as a styled file picker does. -->
      <Button data-testid="script-click-button" onclick={() => fileInput.click()}>
        Click the input
      </Button>
      <input
        bind:this={fileInput}
        data-testid="inner-input"
        type="checkbox"
      />
    </Dialog>
  </TextLayout>
</Page>
