<script lang="ts">
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import { reviewAppScenarios } from "./scenarios";
  import type { ReviewThemeName } from "./themes";

  let { theme }: { theme: ReviewThemeName } = $props();
</script>

<nav aria-label="App scenarios">
  <DataList>
    {#each Object.entries(reviewAppScenarios) as [scenario, entry]}
      {@const href = `${base}/review/${theme}/app/${scenario}`}
      <DataListItem
        interactive
        aria-label={`Open ${entry.title}`}
        onclick={() => goto(href)}
        data-review-scenario-summary={scenario}
      >
        <h3><a href={href}>{entry.title}</a></h3>
        <p>{entry.description}</p>
        <p>{entry.showcases}</p>
        <div><small>Components: {entry.components.join(", ")}</small></div>
      </DataListItem>
    {/each}
  </DataList>
</nav>
