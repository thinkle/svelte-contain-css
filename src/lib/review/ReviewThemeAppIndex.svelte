<script lang="ts">
  import { base } from "$app/paths";
  import ReviewScenarioList from "./ReviewScenarioList.svelte";
  import ReviewIndexShell from "$lib/review/ReviewIndexShell.svelte";
  import ReviewThemeSwitcher from "$lib/review/ReviewThemeSwitcher.svelte";
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
  description="Choose a scenario by the components and interactions you want to explore."
>
  <ReviewThemeSwitcher {theme} />

  <ReviewScenarioList {theme} />
</ReviewIndexShell>
