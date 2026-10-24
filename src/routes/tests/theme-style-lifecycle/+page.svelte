<script lang="ts">
  // The theme editor must remove its preset, extras, and custom variables
  // when its owner unmounts, rather than leaving them on unrelated pages.
  import ThemeInjector from "$lib/theme/ThemeInjector.svelte";
  import { themeState } from "$lib/theme/themeState.svelte";
  let mounted = $state(false);
</script>

<button onclick={() => {
  themeState.fullTheme = 1;
  themeState.headingTheme = 2;
  themeState.rawCss = "--menu-item-active-bg: rgb(1, 2, 3);";
  mounted = true;
}}>Mount editor theme</button>
<button onclick={() => { mounted = false; }}>Unmount editor theme</button>
{#if mounted}<ThemeInjector />{/if}
