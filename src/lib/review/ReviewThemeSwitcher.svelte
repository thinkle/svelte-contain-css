<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import Stack from "$lib/layout/Stack.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import {
    reviewThemeLabels,
    reviewThemeGroups,
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

    return reviewThemeGroups.map(group => ({
      ...group,
      links: group.themes.map((name) => ({
        active: name === theme,
        href: `${prefix}${name}${suffix}`,
        label: reviewThemeLabels[name],
        theme: name,
      })),
    }));
  });
</script>

<nav class="review-theme-switcher" aria-label="Review theme switcher">
  <Stack>
    <div><ButtonLink href={`${base}/review/`}>Theme catalog</ButtonLink></div>
    {#each themeLinks as group}
      <Fieldset>
        {#snippet legend()}{group.label}{/snippet}
        <Inline>
          {#each group.links as item}
            <ButtonLink
              href={item.href}
              primary={item.active}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </ButtonLink>
          {/each}
        </Inline>
      </Fieldset>
    {/each}
  </Stack>
</nav>
