<script lang="ts">
  import { getPageScroller } from "$lib";
  let { id }: { id: string } = $props();
  const scroller = getPageScroller();
  const found = $derived(scroller());
</script>

<p data-testid={id} data-found={found ? found.className : "none"}>
  <button onclick={() => scroller()?.scrollTo({ top: 0, behavior: "instant" })}>
    Back to top ({id})
  </button>
</p>
