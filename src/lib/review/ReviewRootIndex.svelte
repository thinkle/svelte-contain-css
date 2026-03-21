<script lang="ts">
  import { reviewThemeLabels } from "$lib/review/themes";
</script>

<svelte:head>
  <title>Review Routes</title>
</svelte:head>

<h1>Review Routes</h1>
<p>Available themes for the review harness.</p>

<ul>
  {#each Object.entries(reviewThemeLabels) as [theme, label]}
    <li>
      <a href={`/svelte-contain-css/review/${theme}/`}>{label}</a>
    </li>
  {/each}
</ul>
