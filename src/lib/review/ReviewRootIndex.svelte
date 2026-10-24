<script lang="ts">
  import { base } from "$app/paths";
  import MenuList from "$lib/layout/MenuList.svelte";
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
  <nav aria-label="Review themes">
    <MenuList>
      {#each Object.entries(reviewThemeLabels) as [theme, label]}
        <li>
          <a href={`${base}/review/${theme}/`}>{label}</a>
        </li>
      {/each}
    </MenuList>
  </nav>
</ReviewIndexShell>
