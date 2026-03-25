<script lang="ts">
  import { themeState } from "$lib/theme/themeState.svelte";
  import { typographyThemes, extraThemes } from "$lib/theme/themeConfig";
  import { FormItem, RadioButton, Checkbox } from "$lib";

  const relevantExtraNames = new Set([
    "Responsive Typography",
    "Solid Headings",
    "Fancy Paragraphs",
  ]);

  const relevantExtras = extraThemes
    .map((theme, index) => ({ theme, index }))
    .filter(({ theme }) => relevantExtraNames.has(theme.name));
</script>

<div class="typography-theme-controls">
  <FormItem fullWidth>
    {#snippet label()}<span>Typography Theme</span>{/snippet}
    {#each typographyThemes as theme, i}
      <RadioButton bind:group={themeState.typographyTheme} value={i}
        >{theme.name}</RadioButton
      >
    {/each}
  </FormItem>

  <FormItem fullWidth>
    {#snippet label()}<span>Typography Add-ons</span>{/snippet}
    {#each relevantExtras as { theme, index }}
      <Checkbox bind:checked={themeState.enabledExtras[index]}
        >{theme.name}</Checkbox
      >
    {/each}
  </FormItem>
</div>

<style>
  .typography-theme-controls {
    display: grid;
    gap: var(--gap);
  }
</style>
