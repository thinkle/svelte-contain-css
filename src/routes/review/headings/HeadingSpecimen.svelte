<script lang="ts">
  import Text from "$lib/typography/Text.svelte";

  /* The same short "page" every surface renders, so a heading treatment can
     be compared across contexts. Copy is purposeful so hierarchy reads like a
     real page; Text tones sit both inside and next to headings. */
  let { levels = 6 }: { levels?: number } = $props();
</script>

<h1>Harbor Report <Text muted>No. 14</Text></h1>
<p>
  Fog lifted by nine and the outer channel reopened. <Text muted
    >Updated 6:40 am.</Text
  >
</p>
<h2>Tides this week</h2>
<p>Spring tides peak Thursday; expect <Text info>4.1 m</Text> at the quay.</p>
{#if levels >= 3}
  <h3>Closures <Text warning>2 active</Text></h3>
  <p>
    The north berth is <Text danger>closed to tenders</Text> until dredging ends.
  </p>
{/if}
{#if levels >= 4}
  <h4>Pilot boats</h4>
  <p>Two crews on rotation; <Text success>all certified</Text>.</p>
  <h5>Harbormaster notes</h5>
  <p>Mooring fees rise in May.</p>
  <h6>Filed by the night desk <Text muted>· draft</Text></h6>
{/if}
