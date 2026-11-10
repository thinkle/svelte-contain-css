<script lang="ts">
  // getPageScroller() must hand a component inside a Page the element that
  // actually scrolls (Page's content region, not the window), and hand a
  // component outside any Page null. If it broke, consumers would go back to
  // selecting `.page .content` -- and a "back to top" here would do nothing.
  import Page from "$lib/layout/Page.svelte";
  import Probe from "./Probe.svelte";
</script>

<Probe id="outside" />
<Page --page-height="400px">
  {#snippet header()}<div>Header</div>{/snippet}
  <Probe id="top" />
  {#each Array(100) as _, i (i)}<p>Line {i}</p>{/each}
  <Probe id="bottom" />
</Page>
