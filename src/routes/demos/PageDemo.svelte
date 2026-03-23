<script lang="ts">
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let hasHeader = $state(true);
  let hasFooter = $state(true);
  let side = $state("left");

  let code = $derived(`
<Page${side === "right" ? " right" : ""}>
  ${hasHeader ? `{#snippet header()}\n    <Bar>...</Bar>\n  {/snippet}\n` : ""}${hasFooter ? `{#snippet footer()}\n    <Bar marginBottom="0">...</Bar>\n  {/snippet}\n` : ""}${side !== "none" ? `{#snippet sidebar()}\n    <Sidebar${side === "right" ? " right" : ""}>...</Sidebar>\n  {/snippet}\n` : ""}  <div>Page content here</div>
</Page>`);
</script>

<Container>
  <TextLayout>
    <h2>Page</h2>
    <p>
      <code>&lt;Page&gt;</code> gives you a full-screen shell with optional
      header, footer, and sidebar slots.
    </p>
  </TextLayout>

  <DemoWithCode code={code}>
    {#snippet inputArea()}
      <MenuList>
        <li>
          <Checkbox bind:checked={hasHeader}>Header</Checkbox>
        </li>
        <li>
          <Checkbox bind:checked={hasFooter}>Footer</Checkbox>
        </li>
        <li>
          <RadioButton bind:group={side} value="left">Left Sidebar</RadioButton>
        </li>
        <li>
          <RadioButton bind:group={side} value="right">Right Sidebar</RadioButton>
        </li>
        <li>
          <RadioButton bind:group={side} value="none">No Sidebar</RadioButton>
        </li>
      </MenuList>
    {/snippet}

    <Page
      --page-border="3px solid #eee"
      right={side === "right"}
      hideHeader={!hasHeader}
      hideFooter={!hasFooter}
      hideSidebar={side === "none"}
      width="100%"
      height="800px"
    >
      {#snippet header()}
        <Bar>
          <div>Header</div>
          <div>Header</div>
          <div>Header</div>
        </Bar>
      {/snippet}

      {#snippet footer()}
        <Bar marginBottom="0">
          <div>Footer</div>
          <div>Footer</div>
          <div>Footer</div>
        </Bar>
      {/snippet}

      {#snippet sidebar()}
        <Sidebar right={side === "right"}>
          <div>Sidebar</div>
          <div>Sidebar</div>
          <div>Sidebar</div>
        </Sidebar>
      {/snippet}

      <main>
        <Container>
          <p>Page content goes here.</p>
        </Container>
      </main>
    </Page>
  </DemoWithCode>
</Container>
