<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { dialogVars } from "./cssVariableDefs";

  let modalIsOpen = $state(false);
  let nonModalIsOpen = $state(false);
  let dismissibleModalIsOpen = $state(false);
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
      <Button onclick={() => (modalIsOpen = !modalIsOpen)}
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
        <p>
          Here is a button that we should be able to click without closing the
          dialog :)
        </p>
        <Button>Test Button</Button>
        <div style="height: 5rem"></div>

        <p>
          Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Cats are
          great! They play with balls of yarn and chase laser pointers. Some
          cats enjoy climbing trees and others prefer lounging in sunny spots.
        </p>
        <div style="height: 5rem"></div>

        <p>
          Dogs are great too! They love to play fetch and go for long walks.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <br />
          Puppies are especially adorable with their playful antics and boundless
          energy.
        </p>
        <div style="height: 5rem"></div>
        <p>
          Sometimes there is space in a document apparently for the sole purpose
          of demonstrating overflow scrolling.
        </p>
        <p>
          Birds are fascinating creatures with their ability to fly and sing
          melodious tunes. They come in various colors and sizes, adding beauty
          to our surroundings.
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
      <Button onclick={() => (nonModalIsOpen = !nonModalIsOpen)}
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

      <h3>Light-Dismissible Modal</h3>
      <p>
        By default, modal dialogs require explicit closure. You can enable
        "light dismissal" with the <code>dismissible</code> prop to allow users to
        close by clicking outside the dialog content.
      </p>
      <Button onclick={() => (dismissibleModalIsOpen = !dismissibleModalIsOpen)}
        >Open Dismissible Modal Dialog</Button
      >
      <Dialog
        modal={true}
        dismissible={true}
        onClose={() => (dismissibleModalIsOpen = false)}
        open={dismissibleModalIsOpen}
      >
        <h3>Light-Dismissible Modal Dialog</h3>
        <p>
          Click outside this dialog (on the backdrop area) to close it, or use
          the close button.
        </p>
        <p>
          This is useful for non-critical information or confirmations where you
          want to provide an easy escape route for the user.
        </p>
      </Dialog>
      <Code
        language="svelte"
        code={`
<!-- Standard modal - must explicitly close -->
<Dialog
  modal={true}
  onClose={() => (modalIsOpen = false)}
  open={modalIsOpen}
>
  ...content
</Dialog>

<!-- Light-dismissible modal - click backdrop to close -->
<Dialog
  modal={true}
  dismissible={true}
  onClose={() => (dismissibleModalIsOpen = false)}
  open={dismissibleModalIsOpen}
>
  ...content
</Dialog>
`}
      />
    </TextLayout>
  </CssVariableDemo>
</Container>
