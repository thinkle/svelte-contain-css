<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
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
  <a class="utility-link" href={`${base}/review/`}>All Themes</a>

  {#each themeLinks as item}
    <a
      href={item.href}
      data-sveltekit-reload
      class="theme-link"
      class:active={item.active}
      aria-current={item.active ? "page" : undefined}
    >
      {item.label}
    </a>
  {/each}
</nav>

<style>
  .review-theme-switcher {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .theme-link,
  .utility-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    border: 1px solid
      color-mix(in srgb, var(--border-color, currentColor) 60%, transparent);
    background: color-mix(in srgb, var(--surface-bg, white) 92%, transparent);
    color: inherit;
    text-decoration: none;
    line-height: 1.2;
  }

  .utility-link {
    background: color-mix(
      in srgb,
      var(--secondary-bg, var(--surface-bg, white)) 86%,
      transparent
    );
    color: var(--secondary-fg, currentColor);
  }

  .theme-link.active {
    background: var(--primary-bg, currentColor);
    color: var(--primary-fg, white);
    border-color: color-mix(in srgb, var(--primary-bg, currentColor) 80%, transparent);
  }

  .theme-link:hover,
  .utility-link:hover {
    filter: brightness(1.04);
  }
</style>
