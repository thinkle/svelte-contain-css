<script>
  import RowContainer from "$lib/layout/RowContainer.svelte";
  import ColumnContainer from "$lib/layout/ColumnContainer.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Columns from "$lib/layout/Columns.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  let tiles = [1, 2, 3, 4, 5];
</script>

<Container>
  <TextLayout>
    <h2>Legacy Rows and Columns</h2>
    <p>
      <code>&lt;Row&gt;</code> and <code>&lt;Column&gt;</code> still work, but
      they are being replaced by clearer names:
      <code>&lt;RowContainer&gt;</code> and
      <code>&lt;ColumnContainer&gt;</code>.
    </p>
    <p>
      The old names were easy to misuse as generic flex wrappers. The new names
      make it clearer that these are sized container-query regions, not just
      arbitrary layout helpers.
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<Columns>
  <ColumnContainer size="small">
    <Tile>Content</Tile>
  </ColumnContainer>
  <ColumnContainer size="medium">
    <Tile>Content</Tile>
  </ColumnContainer>
  <ColumnContainer size="large">
    <Tile>Content</Tile>
  </ColumnContainer>
</Columns>`}
  >
    {#snippet header()}
      <h3>ColumnContainer sizes</h3>
    {/snippet}
    <Columns>
      <ColumnContainer size="small" --tile-width="80px">
        <h3>Small Column</h3>
        {#each tiles as tile}
          <Tile>
            Tile {tile}
          </Tile>
        {/each}
      </ColumnContainer>
      <ColumnContainer size="medium" --tile-width="120px">
        <h3>Medium Column</h3>
        {#each tiles as tile}
          <Tile>
            Tile {tile}
          </Tile>
        {/each}
      </ColumnContainer>
      <ColumnContainer size="large" --tile-width="180px">
        <h3>Large Column</h3>
        {#each tiles as tile}
          <Tile>
            Tile {tile}
          </Tile>
        {/each}
      </ColumnContainer>
    </Columns>
  </DemoWithCode>

  <TextLayout>
    <h2>RowContainer</h2>
    <p>
      Use <code>&lt;RowContainer&gt;</code> to create horizontal scrolling
      layouts with a sized container context. Use <code>&lt;Inline&gt;</code>
      instead for generic horizontal layout.
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<RowContainer size="medium" --tile-width="120px">
  <Tile>Tile 1</Tile>
  <Tile>Tile 2</Tile>
  <Tile>Tile 3</Tile>
</RowContainer>`}
  >
    {#snippet header()}
      <h3>RowContainer sizes</h3>
    {/snippet}
    <h3>Small Row</h3>
    <RowContainer size="small" --tile-width="80px">
      {#each tiles as tile}
        <Tile>
          Tile {tile}
        </Tile>
      {/each}
    </RowContainer>
    <h3>Medium Row</h3>
    <RowContainer size="medium" --tile-width="120px">
      {#each tiles as tile}
        <Tile>
          Tile {tile}
        </Tile>
      {/each}
    </RowContainer>
    <h3>Large Row</h3>
    <RowContainer size="large" --tile-width="160px">
      {#each tiles as tile}
        <Tile>
          Tile {tile}
        </Tile>
      {/each}
    </RowContainer>
  </DemoWithCode>
</Container>
