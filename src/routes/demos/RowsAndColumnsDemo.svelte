<script>
  import Row from "$lib/layout/Row.svelte";
  import Column from "$lib/layout/Column.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Columns from "$lib/layout/Columns.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  let tiles = [1, 2, 3, 4, 5];
</script>

<Container>
  <TextLayout>
    <h2>Columns</h2>
    <p>
      Use <code>&lt;Columns&gt;</code> and <code>&lt;Column&gt;</code> to create
      multi-column layouts. Columns can be sized as small, medium, or large.
    </p>
    <Code
      code={`<Columns>
  <Column size="small">
    <h3>Small Column</h3>
    <Tile>Content</Tile>
  </Column>
  <Column size="medium">
    <h3>Medium Column</h3>
    <Tile>Content</Tile>
  </Column>
  <Column size="large">
    <h3>Large Column</h3>
    <Tile>Content</Tile>
  </Column>
</Columns>`}
    />
  </TextLayout>

  <Columns>
    <Column size="small" --tile-width="80px">
      <h3>Small Column</h3>
      {#each tiles as tile}
        <Tile>
          Tile {tile}
        </Tile>
      {/each}
    </Column>
    <Column size="medium" --tile-width="120px">
      <h3>Medium Column</h3>
      {#each tiles as tile}
        <Tile>
          Tile {tile}
        </Tile>
      {/each}
    </Column>
    <Column size="large" --tile-width="180px">
      <h3>Large Column</h3>
      {#each tiles as tile}
        <Tile>
          Tile {tile}
        </Tile>
      {/each}
    </Column>
  </Columns>

  <TextLayout>
    <h2>Rows</h2>
    <p>
      Use <code>&lt;Row&gt;</code> to create horizontal scrolling layouts. Rows
      can also be sized as small, medium, or large.
    </p>
    <Code
      code={`<Row size="medium" --tile-width="120px">
  <Tile>Tile 1</Tile>
  <Tile>Tile 2</Tile>
  <Tile>Tile 3</Tile>
</Row>`}
    />
  </TextLayout>

  <h3>Small Row</h3>
  <Row size="small" --tile-width="80px">
    {#each tiles as tile}
      <Tile>
        Tile {tile}
      </Tile>
    {/each}
  </Row>
  <h3>Medium Row</h3>
  <Row size="medium" --tile-width="120px">
    {#each tiles as tile}
      <Tile>
        Tile {tile}
      </Tile>
    {/each}
  </Row>
  <h3>Large Row</h3>
  <Row size="large" --tile-width="160px">
    {#each tiles as tile}
      <Tile>
        Tile {tile}
      </Tile>
    {/each}
  </Row>
</Container>
