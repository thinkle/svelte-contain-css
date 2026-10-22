<script lang="ts">
  // Fixture for tests/private-vars.spec.ts: a paragraph a few typography
  // containers deep, the case where DevTools' "Inherited from ..." sections
  // pile up. Static, so the counts are stable.
  import Container from "$lib/layout/Container.svelte";
  import Card from "$lib/Card.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Progress from "$lib/misc/Progress.svelte";
</script>

<Container>
  <Stack>
    <Card data-testid="card">
      {#snippet header()}<h2 data-testid="card-heading">Card heading</h2>{/snippet}
      <h3 data-testid="body-heading">Body heading</h3>
      <p data-testid="deep-paragraph">A paragraph inside a Card inside a Container.</p>
    </Card>
    <Tile data-testid="tile">
      <p data-testid="tile-paragraph">Inside a tile.</p>
    </Tile>
    <Progress value={40} max={100} />
  </Stack>
</Container>
