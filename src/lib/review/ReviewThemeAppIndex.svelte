<script lang="ts">
  import { reviewAppScenarios } from "$lib/review/scenarios";
  import type { ReviewThemeName } from "$lib/review/themes";

  interface Props {
    theme: ReviewThemeName;
    themeLabel: string;
  }

  let { theme, themeLabel }: Props = $props();
</script>

<svelte:head>
  <title>{themeLabel} App Review Routes</title>
</svelte:head>

<h1>{themeLabel} App Review Routes</h1>
<p>Available app scenarios for this theme.</p>

<ul>
  {#each Object.entries(reviewAppScenarios) as [scenario, entry]}
    <li>
      <a href={`/svelte-contain-css/review/${theme}/app/${scenario}`}>
        {entry.title}
      </a>
    </li>
  {/each}
</ul>
