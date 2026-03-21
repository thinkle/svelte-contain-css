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
  <title>{themeLabel} Review Routes</title>
</svelte:head>

<h1>{themeLabel} Review Routes</h1>
<p>Available review endpoints for this theme.</p>

<h2>Groups</h2>
<ul>
  <li>
    <a href={`/svelte-contain-css/review/${theme}/app/`}>App scenarios</a>
  </li>
</ul>

<h2>Direct Endpoints</h2>
<ul>
  {#each Object.entries(reviewAppScenarios) as [scenario, entry]}
    <li>
      <a href={`/svelte-contain-css/review/${theme}/app/${scenario}`}>
        {entry.title}
      </a>
    </li>
  {/each}
</ul>
