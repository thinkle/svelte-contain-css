<script lang="ts">
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import ReviewIndexShell from "$lib/review/ReviewIndexShell.svelte";
  import { reviewThemes, reviewThemeGroups, reviewThemeDescriptions } from "$lib/review/themes";
</script>

<svelte:head><title>Theme Catalog</title></svelte:head>

<ReviewIndexShell title="Theme Catalog" description="The same themes available in the grouped theme switcher, with their ingredients explained.">
  {#each reviewThemeGroups as group}
    <section aria-label={group.label}>
      <h2>{group.label}</h2>
      <p>{group.description}</p>
      <DataList>
        {#each group.themes as theme}
          {@const href = `${base}/review/${theme}/`}
          <DataListItem interactive aria-label={`Open ${reviewThemes[theme].label} theme`} onclick={() => goto(href)}>
            <h3><a href={href}>{reviewThemes[theme].label}</a></h3>
            <p>{reviewThemeDescriptions[theme]}</p>
          </DataListItem>
        {/each}
      </DataList>
    </section>
  {/each}
</ReviewIndexShell>
