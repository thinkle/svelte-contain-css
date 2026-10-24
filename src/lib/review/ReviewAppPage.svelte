<script lang="ts">
  import { base } from "$app/paths";
  import Container from "$lib/layout/Container.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
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

<header>
  <Container height="auto">
    <Stack>
      <nav aria-label="Review navigation">
        <Inline>
          <ButtonLink href={`${base}/review/${data.theme}/`}>{data.themeLabel} routes</ButtonLink>
          <ButtonLink href={`${base}/review/${data.theme}/app/`}>App scenarios</ButtonLink>
        </Inline>
      </nav>
      <ReviewThemeSwitcher theme={data.theme} />
    </Stack>
  </Container>
</header>

<div
  class="review-page"
  data-review-kind="app"
  data-review-scenario={data.scenario}
  data-review-theme={data.theme}
>
  <scenario.component />
</div>
