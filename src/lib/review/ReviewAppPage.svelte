<script lang="ts">
  import { base } from "$app/paths";
  import ReviewThemeSwitcher from "$lib/review/ReviewThemeSwitcher.svelte";
  import { reviewAppScenarios } from "$lib/review/scenarios";
  import type { ReviewThemeName } from "$lib/review/themes";

  interface Props {
    data: {
      scenario: keyof typeof reviewAppScenarios;
      theme: ReviewThemeName;
      themeLabel: string;
    };
  }

  let { data }: Props = $props();

  const scenario = $derived(reviewAppScenarios[data.scenario]);
</script>

<svelte:head>
  <title>{scenario.title} · {data.themeLabel} Review</title>
</svelte:head>

<div class="review-page-header">
  <div class="review-page-links">
    <a href={`${base}/review/${data.theme}/`}>{data.themeLabel} routes</a>
    <a href={`${base}/review/${data.theme}/app/`}>App scenarios</a>
  </div>

  <ReviewThemeSwitcher theme={data.theme} />
</div>

<div
  class="review-page"
  data-review-kind="app"
  data-review-scenario={data.scenario}
  data-review-theme={data.theme}
>
  <scenario.component />
</div>

<style>
  .review-page-header {
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    background: color-mix(in srgb, var(--surface-bg, white) 92%, transparent);
    border-bottom: 1px solid
      color-mix(in srgb, var(--border-color, currentColor) 45%, transparent);
  }

  .review-page-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .review-page-links a {
    color: var(--link-fg, var(--primary-bg, #2563eb));
    text-underline-offset: 0.18em;
  }
</style>
