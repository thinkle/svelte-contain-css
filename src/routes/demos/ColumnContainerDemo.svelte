<script lang="ts">
  import ColumnContainer from "$lib/layout/ColumnContainer.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let items = ["Inbox", "Approvals", "Alerts", "Drafts"];
</script>

<Container>
  <TextLayout>
    <h2>ColumnContainer</h2>
    <p>
      <code>&lt;ColumnContainer&gt;</code> is a sized vertical rail. Use it when
      you want a fixed-width container-query region, especially for tile or card
      stacks that should react to a constrained width.
    </p>
  </TextLayout>

  <ColumnContainer size="medium" --tile-width="100%">
    {#each items as item}
      <Tile>
        <h3>{item}</h3>
        <p>Rail content stacks inside a predictable width.</p>
      </Tile>
    {/each}
  </ColumnContainer>

  <Code
    code={`<ColumnContainer size="medium" --tile-width="100%">
  <Tile>Inbox</Tile>
  <Tile>Approvals</Tile>
  <Tile>Alerts</Tile>
</ColumnContainer>`}
  />
</Container>
