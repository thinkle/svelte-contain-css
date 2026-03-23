<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import ColumnContainer from "$lib/layout/ColumnContainer.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let items = ["Inbox", "Approvals", "Alerts", "Drafts"];
</script>

<Container>
  <TextLayout>
    <h2>ColumnContainer</h2>
    <p>
      A <code>&lt;ColumnContainer&gt;</code> is a sized vertical rail for stacked tiles.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<ColumnContainer size="medium" --tile-width="100%">
  <Tile>Inbox</Tile>
  <Tile>Approvals</Tile>
  <Tile>Alerts</Tile>
</ColumnContainer>`}
  >
    <ColumnContainer size="medium" --tile-width="100%">
      {#each items as item}
        <Tile>
          <h3>{item}</h3>
          <p>Rail content stacks inside a predictable width.</p>
        </Tile>
      {/each}
    </ColumnContainer>
  </DemoWithCode>
</Container>
