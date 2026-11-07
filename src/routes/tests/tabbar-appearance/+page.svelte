<script lang="ts">
  // Tabs should take their strip and selected fill from the local surface,
  // even on raised, role-colored, or consumer-defined backgrounds.
  import { TabBar, Container, Card, Bar } from "$lib";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";
  import quiet from "$lib/vars/themes/quiet.css?raw";
  import underlinedTabs from "$lib/vars/underlined-tabs.css?raw";

  let palette = $state("light");
  let underlined = $state(false);
  let active = $state<string | { label: string; value: string } | null>("Demo");
</script>

<ThemeStyle id="tabbar-appearance-theme" css={palette === "quiet" ? quiet : palette === "dark" ? dark : light} />
<ThemeStyle id="tabbar-appearance-addon" css={underlined ? underlinedTabs : ""} />
<Container maxWidth="60rem">
  <h1>Tabs follow their surface</h1>
  <label>Palette
    <select aria-label="Palette" bind:value={palette}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="quiet">Quiet</option>
    </select>
  </label>
  <label><input type="checkbox" bind:checked={underlined} /> Underlined Tabs</label>
  <Container data-testid="surface">
    <h2>Surface</h2>
    <div data-testid="tabs"><TabBar items={["Demo", "Source", "Side by Side"]} bind:active /></div>
    <p>{active} panel</p>
  </Container>
  <Card data-testid="raised">
    <h2>Raised surface</h2>
    <TabBar items={["Demo", "Source", "Side by Side"]} bind:active />
    <p>{active} panel</p>
  </Card>
  <Container data-testid="custom" bg="rgb(32, 64, 48)" fg="rgb(240, 248, 244)">
    <h2>Custom surface</h2>
    <TabBar items={["Demo", "Source", "Side by Side"]} bind:active />
    <p>{active} panel</p>
  </Container>
  <Bar primary data-testid="role">
    <TabBar style="width: 100%" items={["Demo", "Source", "Side by Side"]} bind:active />
  </Bar>
</Container>
