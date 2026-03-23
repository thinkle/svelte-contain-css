<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import RowContainer from "$lib/layout/RowContainer.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let items = [1, 2, 3, 4, 5, 6];
</script>

<Container>
  <TextLayout>
    <h2>RowContainer</h2>
    <p>
      A <code>&lt;RowContainer&gt;</code> is a sized horizontal lane for tiles.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<RowContainer size="medium" --tile-width="140px">
  <Tile>Tile 1</Tile>
  <Tile>Tile 2</Tile>
  <Tile>Tile 3</Tile>
</RowContainer>`}
  >
    <RowContainer size="medium" --tile-width="140px">
      {#each items as item}
        <Tile>
          <h3>Tile {item}</h3>
          <p>Lane content adapts inside a sized row container.</p>
        </Tile>
      {/each}
    </RowContainer>
  </DemoWithCode>
</Container>
