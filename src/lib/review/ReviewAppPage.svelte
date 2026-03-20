<script lang="ts">
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

<div
  class="review-page"
  data-review-kind="app"
  data-review-scenario={data.scenario}
  data-review-theme={data.theme}
>
  <scenario.component />
</div>
