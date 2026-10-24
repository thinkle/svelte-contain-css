<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import Inline from "$lib/layout/Inline.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import {
    reviewThemeLabels,
    reviewThemeNames,
    type ReviewThemeName,
  } from "$lib/review/themes";

  interface Props {
    theme: ReviewThemeName;
  }

  let { theme }: Props = $props();

  const themeLinks = $derived.by(() => {
    const match = page.url.pathname.match(/^(.*\/review\/)([^/]+)(\/?.*)$/);
    if (!match) return [];

    const [, prefix, , suffix] = match;

    return reviewThemeNames.map((name) => ({
      active: name === theme,
      href: `${prefix}${name}${suffix}`,
      label: reviewThemeLabels[name],
      theme: name,
    }));
  });
</script>

<nav class="review-theme-switcher" aria-label="Review theme switcher">
  <Inline>
    <ButtonLink href={`${base}/review/`}>All Themes</ButtonLink>
    {#each themeLinks as item}
      <ButtonLink
        href={item.href}
        data-sveltekit-reload
        primary={item.active}
        aria-current={item.active ? "page" : undefined}
      >
        {item.label}
      </ButtonLink>
    {/each}
  </Inline>
</nav>
