<script lang="ts">
  import ReviewIndexShell from "$lib/review/ReviewIndexShell.svelte";
  import { reviewThemeLabels } from "$lib/review/themes";
</script>

<svelte:head>
  <title>Review Routes</title>
</svelte:head>

<ReviewIndexShell
  title="Review Routes"
  description="Available themes for the review harness."
>
  <ul>
    {#each Object.entries(reviewThemeLabels) as [theme, label]}
      <li>
        <a href={`/svelte-contain-css/review/${theme}/`}>{label}</a>
      </li>
    {/each}
  </ul>
</ReviewIndexShell>
