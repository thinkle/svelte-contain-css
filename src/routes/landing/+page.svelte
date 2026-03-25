<script lang="ts">
  import ThemeInjector from "$lib/theme/ThemeInjector.svelte";
  import Hero from "$lib/layout/Hero.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import Bar from "$lib/layout/Bar.svelte";
</script>

<ThemeInjector />
<svelte:head>
  <title>ContainCSS - Svelte Component Library</title>
</svelte:head>

<div
  class="landing"
  style:--primary-bg="var(--material-color-purple-700)"
  style:--primary-fg="var(--material-color-yellow-100)"
  style:--heading-fg="var(--material-color-purple-700)"
  style:--secondary-bg="var(--material-color-yellow-600)"
  style:--secondary-fg="var(--material-color-purple-900)"
>
  <Hero
    bg="var(--material-color-yellow-100)"
    fg="var(--material-color-purple-900)"
  >
    <h1 style="text-align: center">Meet <em>ContainCSS</em></h1>
    <p>
      The Simple Svelte Component Library that uses CSS variables & container
      queries to make your life easier.
    </p>

    <div class="version-buttons">
      <ButtonLink href="./legacy/" secondary rel="external">
        Legacy: Svelte 4 & Earlier
        <span class="btn-label">v0.x - for existing Svelte 4 projects</span>
      </ButtonLink>
      <ButtonLink href="./svelte5/" primary rel="external">
        The Latest: Svelte 5
        <span class="btn-label">v1.x - for new projects</span>
      </ButtonLink>
    </div>
  </Hero>
  <Bar
    bg="var(--primary-bg)"
    fg="var(--primary-fg)"
    --bar-link-fg="var(--primary-fg)"
    --bar-justify="center"
    height="auto"
    marginBottom="0"
  >
    <a href="https://github.com/thinkle/svelte-contain-css">View on GitHub</a>
    <span style="margin: 0 0.5rem">|</span>
    <span>by <a href="https://tomhinkle.net">Tom Hinkle</a></span>
  </Bar>
</div>

<style>
  .landing {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--body-bg, var(--bg));
  }

  .landing :global(.hero) {
    flex: 1;
  }

  .version-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 400;
    opacity: 0.8;
    margin-top: 0.25rem;
  }
</style>
