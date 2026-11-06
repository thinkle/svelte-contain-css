<script lang="ts">
  /*
    Fixtures for tests/mobile-patterns.spec.ts: the layouts a phone app is
    made of, written the way a consumer would write them -- no breakpoints,
    no custom CSS -- so the spec can check what the library does on its own.
  */
  import Page from "$lib/layout/Page.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";

  let dialogOpen = $state(false);
  let wideOpen = $state(false);
  let agree = $state(false);
  let plan = $state("monthly");
</script>

<Page right data-testid="page">
  {#snippet header()}
    <Bar primary data-testid="app-bar">
      <strong>Field Notes</strong>
      <Inline>
        <a href="#a">Today</a>
        <a href="#b">Archive</a>
      </Inline>
    </Bar>
  {/snippet}
  {#snippet sidebar()}
    <Sidebar right>
      <MenuList>
        <li><Button>Inbox</Button></li>
        <li><Button>Settings</Button></li>
      </MenuList>
    </Sidebar>
  {/snippet}
  {#snippet footer()}
    <Bar data-testid="app-footer">
      <span>Synced</span>
      <Button primary>New note</Button>
    </Bar>
  {/snippet}

  <Stack>
    <h1>Today</h1>

    <!-- Two panels side by side on a desktop; on a phone each should get
         the full width (Tailwind: flex-col sm:flex-row). -->
    <Inline collapse data-testid="switcher">
      <div class="panel" data-testid="switcher-a">Weather: drizzle, mostly.</div>
      <div class="panel" data-testid="switcher-b">Tides: low at 3:12pm.</div>
    </Inline>

    <!-- The same row without `collapse`: it wraps, but nothing stretches. -->
    <Inline data-testid="plain-row">
      <div class="panel" data-testid="plain-a">Wind: west.</div>
      <div class="panel">Sun: 6:41am.</div>
    </Inline>

    <!-- Action row at the end of a form. -->
    <Inline collapse data-testid="actions">
      <Button data-testid="cancel">Cancel</Button>
      <Button primary onclick={() => (dialogOpen = true)} data-testid="open-dialog"
        >Save and share</Button
      >
      <Button onclick={() => (wideOpen = true)} data-testid="open-wide-dialog"
        >Preview export</Button
      >
    </Inline>

    <Card data-testid="card">
      {#snippet header()}<h3>Recent</h3>{/snippet}
      <p>Three notes since yesterday.</p>
    </Card>

    <FormItem>
      {#snippet label()}Title{/snippet}
      <Input data-testid="title-input" value="Low tide walk" />
    </FormItem>
    <Checkbox bind:checked={agree} data-testid="agree">Share with my team</Checkbox>
    <RadioButton bind:group={plan} value="monthly" data-testid="plan-monthly">Monthly</RadioButton>
    <RadioButton bind:group={plan} value="yearly">Yearly</RadioButton>
  </Stack>
</Page>

{#if wideOpen}
  <!-- Content wider than any phone: the dialog must still fit the screen. -->
  <Dialog open onclose={() => (wideOpen = false)} data-testid="wide-dialog">
    <div style="width: 700px">A 700px-wide export preview.</div>
  </Dialog>
{/if}

{#if dialogOpen}
  <Dialog open onclose={() => (dialogOpen = false)} data-testid="dialog">
    <h2>Share note</h2>
    <p>Anyone on your team will be able to read it.</p>
    <Button onclick={() => (dialogOpen = false)}>Done</Button>
  </Dialog>
{/if}

<style>
  .panel {
    padding: 8px;
    border: 1px solid var(--border-color);
  }
</style>
