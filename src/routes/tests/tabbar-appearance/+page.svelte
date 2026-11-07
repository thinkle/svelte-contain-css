<script lang="ts">
  // Active borders used to be ignored, leaving Quiet's selected tab
  // unmarked. Default light tabs should sit flat and keep a stable size.
  import TabBar from "$lib/layout/TabBar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import light from "$lib/vars/themes/light.css?raw";
  import quiet from "$lib/vars/themes/quiet.css?raw";

  let useQuiet = $state(false);
  let active = $state<string | { label: string; value: string } | null>("Demo");
</script>

<ThemeStyle id="tabbar-appearance-theme" css={useQuiet ? quiet : light} />
<Container maxWidth="48rem">
  <h1>Tab appearance</h1>
  <button data-testid="theme" onclick={() => (useQuiet = !useQuiet)}>
    {useQuiet ? "Use Light" : "Use Quiet"}
  </button>
  <div data-testid="tabs">
    <TabBar items={["Demo", "Source", "Side by Side"]} bind:active />
  </div>
  <p>{active} panel</p>
</Container>
