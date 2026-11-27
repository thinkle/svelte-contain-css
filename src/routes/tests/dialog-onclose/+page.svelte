<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let dialogOpen = $state(false);
  let closes = $state(0);
  // A dialog that is never opened: mounting one must not report a close.
  let neverOpenCloses = $state(0);
</script>

<Page>
  <TextLayout>
    <h2>Dialog onclose (Regression)</h2>
    <p>onclose must be called exactly once per closure, and never on mount.</p>

    <Button data-testid="open-dialog" onclick={() => (dialogOpen = true)}>Open</Button>
    <Button data-testid="close-from-outside" onclick={() => (dialogOpen = false)}>
      Close from outside
    </Button>
    <p>closes: <span data-testid="closes">{closes}</span></p>
    <p>never-open closes: <span data-testid="never-open-closes">{neverOpenCloses}</span></p>

    <Dialog
      open={dialogOpen}
      modal={true}
      dismissible={true}
      onClose={() => {
        closes += 1;
        dialogOpen = false;
      }}
    >
      <h3>Counting Dialog</h3>
      <Button data-testid="close-from-inside" onclick={() => (dialogOpen = false)}>
        Close from inside
      </Button>
    </Dialog>

    <Dialog open={false} modal={true} onClose={() => (neverOpenCloses += 1)}>
      <h3>Never opened</h3>
    </Dialog>
  </TextLayout>
</Page>
