<script lang="ts">
  import { page } from "$app/state";
  import type { PageData } from "./$types";
  import { reviewAppScenarios } from "$lib/review/scenarios";
  import ReviewThemeStyle from "$lib/review/ReviewThemeStyle.svelte";
  import { themePreviewStyles } from "$lib/theme/themePreview";

  let { data }: { data: PageData } = $props();
  const scenario = $derived(reviewAppScenarios[data.scenario]);
  const styles = $derived(themePreviewStyles(page.url.hash));
</script>

<svelte:head><title>{scenario.title} · Custom Theme Preview</title></svelte:head>

{#each styles as css, index}
  <ReviewThemeStyle id={`theme-preview-${index}`} {css} />
{/each}

<scenario.component />
