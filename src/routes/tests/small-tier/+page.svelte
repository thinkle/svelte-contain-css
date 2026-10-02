<script lang="ts">
  /*
    Fixtures for tests/small-tier.spec.ts.

    Each case is a box of a fixed width that is a size container, so the
    component inside sees a "small" (<= 600px) or a wide space regardless of
    the test's viewport -- which is the point of container queries.
  */
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import "$lib/vars/defaults.css";
</script>

<div class="box wide" data-testid="wide">
  <GridLayout tile>
    {#each [1, 2, 3, 4] as n}<Tile>{n}</Tile>{/each}
  </GridLayout>
</div>

<div class="box small" data-testid="small">
  <GridLayout tile>
    {#each [1, 2, 3, 4] as n}<Tile>{n}</Tile>{/each}
  </GridLayout>
</div>

<!-- A size the consumer chose on purpose is kept in the small tier. -->
<div class="box small" data-testid="small-explicit" style="--tile-width: 120px;">
  <GridLayout tile>
    {#each [1, 2, 3] as n}<Tile>{n}</Tile>{/each}
  </GridLayout>
</div>

<!-- ...unless they also say what they want there. -->
<div
  class="box small"
  data-testid="small-override"
  style="--tile-width: 120px; --tile-width-small: 100px;"
>
  <GridLayout tile>
    {#each [1, 2, 3] as n}<Tile>{n}</Tile>{/each}
  </GridLayout>
</div>

<div class="box wide" data-testid="pinned">
  <Tile --tile-height="100px">pinned</Tile>
</div>

<div class="box wide" data-testid="grows">
  <Tile>
    {#each { length: 30 } as _}<p>more content than the shape holds</p>{/each}
  </Tile>
</div>

<div class="box small" data-testid="bar-small" style="--bar-padding-small: 2px;">
  <Bar><span>a</span><span>b</span></Bar>
</div>
<div class="box wide" data-testid="bar-wide" style="--bar-padding-small: 2px;">
  <Bar><span>a</span><span>b</span></Bar>
</div>

<div
  class="box small"
  data-testid="container-small"
  style="--container-padding-small: 3px;"
>
  <Container>text</Container>
</div>

<style>
  .box {
    container-type: inline-size;
    margin-bottom: 24px;
  }
  .wide {
    width: 1000px;
  }
  .small {
    width: 360px;
  }
</style>
