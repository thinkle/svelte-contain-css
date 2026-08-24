<script lang="ts">
  import { base } from "$app/paths";
  import ReviewIndexShell from "$lib/review/ReviewIndexShell.svelte";
  import ReviewThemeSwitcher from "$lib/review/ReviewThemeSwitcher.svelte";
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

<ReviewIndexShell
  title={`${themeLabel} App Review Routes`}
  description="Available app scenarios for this theme."
>
  <ReviewThemeSwitcher {theme} />

  <ul>
    {#each Object.entries(reviewAppScenarios) as [scenario, entry]}
      <li>
        <a href={`${base}/review/${theme}/app/${scenario}`}>
          {entry.title}
        </a>
      </li>
    {/each}
  </ul>
</ReviewIndexShell>
