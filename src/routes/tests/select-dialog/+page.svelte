<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Select from "$lib/controls/Select.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let dialogOpen = $state(false);
  let dialogValue = $state("one");
  let backgroundValue = $state("alpha");
</script>

<Page>
  {#snippet header()}
    <Bar>
      <h2>Header Bar Thing</h2>
      <DropdownMenu>
        {#snippet label()}Menu{/snippet}
        <li><a href="#">Home</a></li>
        <li><a href="#demos">Demos</a></li>
        <li><a href="#docs">Docs</a></li>
      </DropdownMenu>
    </Bar>
  {/snippet}

  <TextLayout>
    <h2>Dialog + Select (Regression)</h2>
    <p>
      This is a regression test for Select inside a Dialog. The dropdown opened
      from the dialog should not open the background DropdownMenu.
    </p>

    <!-- Background Select that should NOT open when dialog's Select is clicked -->
    <div data-testid="background-select">
      <FormItem>
        {#snippet label()}Background Select:{/snippet}
        <Select bind:value={backgroundValue}>
          <option value="alpha">Alpha</option>
          <option value="beta">Beta</option>
          <option value="gamma">Gamma</option>
        </Select>
      </FormItem>
    </div>

    <Button data-testid="open-dialog" onclick={() => (dialogOpen = true)}
      >Open Dialog</Button
    >

    <Dialog
      open={dialogOpen}
      modal={false}
      onClose={() => {
        dialogOpen = false;
      }}
    >
      <h3>Dialog Content</h3>
      <p>Open the Select below while the dialog is active.</p>
      <div class="select-block" data-testid="dialog-select">
        <FormItem>
          {#snippet label()}Dialog Select:{/snippet}
          <Select bind:value={dialogValue}>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
          </Select>
        </FormItem>
      </div>
      <Button
        onclick={() => {
          dialogOpen = false;
        }}>Close Dialog</Button
      >
    </Dialog>
  </TextLayout>
</Page>

<style>
</style>
