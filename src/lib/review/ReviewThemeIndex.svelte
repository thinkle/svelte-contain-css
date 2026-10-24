<script lang="ts">
  import { base } from "$app/paths";
  import MenuList from "$lib/layout/MenuList.svelte";
  import ReviewIndexShell from "$lib/review/ReviewIndexShell.svelte";
  import ReviewThemeSwitcher from "$lib/review/ReviewThemeSwitcher.svelte";
  import { reviewAppScenarios } from "$lib/review/scenarios";
  import type { ReviewThemeName } from "$lib/review/themes";

  interface Props {
    theme: ReviewThemeName;
    themeLabel: string;
  }

  let { theme, themeLabel }: Props = $props();
</script>

<svelte:head>
  <title>{themeLabel} Review Routes</title>
</svelte:head>

<ReviewIndexShell
  title={`${themeLabel} Review Routes`}
  description="Available review endpoints for this theme."
>
  <ReviewThemeSwitcher {theme} />

  <section>
    <h2>Groups</h2>
    <nav aria-label="Review groups">
      <MenuList>
        <li>
          <a href={`${base}/review/${theme}/app/`}>App scenarios</a>
        </li>
      </MenuList>
    </nav>
  </section>

  <section>
    <h2>Direct Endpoints</h2>
    <nav aria-label="Scenario endpoints">
      <MenuList>
        {#each Object.entries(reviewAppScenarios) as [scenario, entry]}
          <li>
            <a href={`${base}/review/${theme}/app/${scenario}`}>
              {entry.title}
            </a>
          </li>
        {/each}
      </MenuList>
    </nav>
  </section>
</ReviewIndexShell>
