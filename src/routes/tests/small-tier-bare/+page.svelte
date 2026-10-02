<script lang="ts">
  /* Fixture for tests/small-tier.spec.ts: a tile grid with no container
     ancestor at all, so only the viewport can tell it it's on a phone. */
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import "$lib/vars/defaults.css";
</script>

<GridLayout tile>
  {#each [1, 2, 3, 4] as n}<Tile>{n}</Tile>{/each}
</GridLayout>
