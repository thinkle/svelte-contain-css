<script lang="ts">
  // Fixtures for tests/surface-ladder.spec.ts: with only a page pair, the
  // tiers step off the surface in lightness, at the component.
  import "$lib/vars/defaults.css";
  import { Card, Container, Sidebar } from "$lib";
</script>

{#each [["dark", "--bg: rgb(0, 0, 0); --fg: rgb(255, 255, 255);"], ["light", "--bg: rgb(250, 250, 250); --fg: rgb(20, 20, 20);"]] as [id, pair]}
  <!-- --surface-bg is var(--bg) at :root; restate it here so this pair is the
       surface, as a theme that sets only --bg/--fg on :root would get. -->
  <div data-testid={id} style="{pair} --surface-bg: var(--bg); --surface-fg: var(--fg);">
    <Container data-testid="{id}-surface">
      <Card data-testid="{id}-card">card</Card>
      <div style="display: flex; height: 4rem; container-type: inline-size;">
        <Sidebar><span data-testid="{id}-sidebar">sidebar</span></Sidebar>
      </div>
    </Container>
  </div>
{/each}

<!-- A local surface override flows up to the cards inside it. -->
<Container data-testid="local" style="--surface-bg: rgb(0, 0, 120);">
  <Card data-testid="local-card">card</Card>
</Container>

<!-- A pinned tier wins over the step. -->
<Container style="--surface-raised-bg: rgb(255, 0, 0);">
  <Card data-testid="pinned-card">card</Card>
</Container>

<!-- A depth of 0 makes every tier the surface. -->
<Container data-testid="flat" style="--surface-depth: 0;">
  <Card data-testid="flat-card">card</Card>
</Container>
