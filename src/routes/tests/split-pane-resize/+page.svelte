<script lang="ts">
 import { onMount } from "svelte";
 let ready = $state(false);
 onMount(() => {ready = true;});
  import SplitPane from "$lib/layout/SplitPane.svelte";
</script>

<!-- Resizing must neither accumulate divider/gap space nor freeze the right pane. -->
<div data-testid="host" data-ready={ready} style="width: 100%; container-type: inline-size;">
  <SplitPane resizeBehavior="preserve-left" leftWidth="320px" resizerLabel="Resize fixed sidebar" data-testid="fixed">
    {#snippet left()}<p>Fixed sidebar</p>{/snippet}
    {#snippet right()}<p>Flexible editor</p>{/snippet}
  </SplitPane>
  <SplitPane leftWidth="320px" resizerLabel="Resize proportional panes" data-testid="ratio">
    {#snippet left()}<p>Proportional left</p>{/snippet}
    {#snippet right()}<p>Proportional right</p>{/snippet}
  </SplitPane>
</div>
