<script lang="ts">
  import ReviewAppPage from "$lib/review/ReviewAppPage.svelte";
  import type { ReviewThemeName } from "$lib/review/themes";
  import { reviewAppScenarios } from "$lib/review/scenarios";

  interface Props {
    data: {
      scenario: keyof typeof reviewAppScenarios;
      theme: ReviewThemeName;
      themeLabel: string;
    };
  }

  let { data }: Props = $props();
</script>

<ReviewAppPage {data} />
