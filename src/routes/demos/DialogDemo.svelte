<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { dialogVars } from "./cssVariableDefs";

  let modalIsOpen = false;
  let nonModalIsOpen = false;
</script>

<Container>
  <CssVariableDemo variables={dialogVars}>
    <TextLayout>
      <h2>Dialogs</h2>
      <p>
        We use the new HTML dialog element in our dialog components for
        simplicity sake.
      </p>
      <h3>Modal Dialogs</h3>
      <p>
        A modal dialog is <em>not</em> "light dismissable" but must be explicitly
        closed.
      </p>
      <Button on:click={() => (modalIsOpen = !modalIsOpen)}
        >Open Modal Dialog</Button
      >
      <Dialog
        modal={true}
        onClose={() => (modalIsOpen = false)}
        open={modalIsOpen}
      >
        <h3>Modal Dialog</h3>
        <p>
          A modal dialog will display centered over the content and block the
          rest of the page.
        </p>
      </Dialog>
      <Code
        language="svelte"
        code={`
<Button 
  on:click={() => (modalIsOpen = !modalIsOpen)}
  >
  Open Modal Dialog
</Button>    
<Dialog
  modal={true}
  onClose={() => (modalIsOpen = false)}
  open={modalIsOpen}
>
  ...content
</Dialog>
`}
      />

      <h3>Non-Modal Dialog</h3>
      <p>
        A non-modal dialog looks like a dialog, but displays like any other
        block element.
      </p>
      <Button on:click={() => (nonModalIsOpen = !nonModalIsOpen)}
        >Open Non-Modal Dialog</Button
      >
      <Dialog
        modal={false}
        onClose={() => (nonModalIsOpen = false)}
        open={nonModalIsOpen}
      >
        <h3>Non-Modal Dialog</h3>
        <p>
          A non-modal dialog will display like a dialog, but will not block the
          rest of the page.
        </p>
      </Dialog>
    </TextLayout>
  </CssVariableDemo>
</Container>
