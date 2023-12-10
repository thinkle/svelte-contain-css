<script>
  import Row from "$lib/layout/Row.svelte";

  import Column from "$lib/layout/Column.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Columns from "$lib/layout/Columns.svelte";
  let tiles = [1, 2, 3, 4, 5];
</script>

<Container>
  <h2>Columns</h2>

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
  <h2>Rows</h2>
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
