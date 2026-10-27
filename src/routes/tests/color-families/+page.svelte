<script lang="ts">
  // Deterministic fixtures for tests/color-families.spec.ts: exact colors
  // keyed by color family, mixing everywhere else. Plain rgb() values so the
  // spec can check pins exactly and mixes by hand.
  import { Bar, Button, Card, Container, TextLayout, Tile, Text, surfaceVars } from "$lib";

  const pins = [
    "--surface-bg: rgb(245, 245, 245)",
    "--surface-fg: rgb(20, 20, 20)",
    "--primary-bg: rgb(0, 51, 160)",
    "--primary-fg: rgb(255, 255, 255)",
    "--primary-color: rgb(0, 51, 160)",
    "--danger-color: rgb(200, 0, 0)",
    "--link-color: rgb(0, 0, 200)",
    "--heading-tint: rgb(200, 0, 0)",
    "--heading-tint-amount: 50%",
    // On the app's surface: exact.
    "--on-surface-link-text-fg: rgb(0, 51, 160)",
    "--on-surface-danger-text-fg: rgb(150, 0, 30)",
    "--on-surface-heading-2-fg: rgb(0, 51, 160)",
    // On primary: exact, written once.
    "--on-primary-link-text-fg: rgb(255, 255, 0)",
    "--on-primary-heading-fg: rgb(255, 255, 255)",
  ].join("; ");
</script>

<div style={pins}>
  <!-- A surface in its compiled family: pinned. -->
  <Container data-testid="surface">
    <h2>Heading</h2>
    <p><a href="#x">link</a> <Text danger>danger</Text></p>
  </Container>

  <!-- A raw background: no family, mixes under the same theme. -->
  <Container data-testid="raw" bg="rgb(40, 40, 40)" fg="rgb(240, 240, 240)">
    <h2>Heading</h2>
    <p><a href="#x">link</a> <Text danger>danger</Text></p>
  </Container>

  <!-- A context that sets the component background by hand: also no family. -->
  <div data-testid="context-raw" style="--container-bg: rgb(40, 40, 40); --container-fg: rgb(240, 240, 240);">
    <Container>
      <h2>Heading</h2>
      <p><a href="#x">link</a> <Text danger>danger</Text></p>
    </Container>
  </div>

  <!-- A raw surface inside a pinned one resets; a pinned one inside a raw one restores. -->
  <Container data-testid="nested" bg="rgb(40, 40, 40)" fg="rgb(240, 240, 240)">
    <p class="outer"><a href="#x">raw link</a></p>
    <Card>
      <h2>Card heading</h2>
      <p class="inner"><a href="#x">card link</a> <Text danger>danger</Text></p>
    </Card>
  </Container>

  <!-- The ladder: a Card (surface-raised) with no raised pin uses the surface pin... -->
  <Card data-testid="raised"><p><a href="#x">link</a></p></Card>
  <!-- ...and a raised pin beats it. -->
  <div style="--on-surface-raised-link-text-fg: rgb(0, 128, 0);">
    <Card data-testid="raised-pinned"><p><a href="#x">link</a></p></Card>
  </div>

  <!-- A role: the sugar and a context with the same helper resolve alike. -->
  <Bar primary data-testid="sugar"><a href="#x">link</a> <Text danger>danger</Text></Bar>
  <div style={surfaceVars("primary", "bar")}>
    <Bar data-testid="context-role"><a href="#x">link</a> <Text danger>danger</Text></Bar>
  </div>
  <div style={surfaceVars("primary", "tile")}>
    <Tile data-testid="role-tile"><h2>Role heading</h2><h3>Role h3</h3></Tile>
  </div>
  <!-- A role with no pins mixes; its headings take the surface foreground. -->
  <div style="{surfaceVars('success', 'tile')} --success-bg: rgb(0, 100, 0); --success-fg: rgb(255, 255, 255); --success-color: rgb(0, 100, 0);">
    <Tile data-testid="role-unpinned"><h2>Unpinned role</h2><p><a href="#x">link</a></p></Tile>
  </div>
  <!-- A raw background on top of a role context: no family. -->
  <div style={surfaceVars("primary", "tile")}>
    <Tile data-testid="role-raw" bg="rgb(40, 40, 40)" fg="rgb(240, 240, 240)"><p><a href="#x">link</a></p></Tile>
  </div>

  <!-- A band that owns its headings keeps them, even inside a TextLayout
       whose own headings are pinned. -->
  <Container data-testid="band-in-prose">
    <TextLayout>
      <h2 class="prose">Prose heading</h2>
      <Card --card-header-bg="rgb(200, 0, 0)" --card-header-fg="rgb(255, 255, 255)">
        {#snippet header()}<h3>Card header</h3>{/snippet}
        <p>Body</p>
      </Card>
      <Bar bg="rgb(40, 40, 40)" fg="rgb(240, 240, 240)"><h3 class="bar">Bar heading</h3></Bar>
    </TextLayout>
  </Container>

  <!-- --current-bg/-fg: the nearest colored element's own pair, controls
       included, for an icon inside a button. -->
  <Container data-testid="current-button">
    <Button primary>
      <span class="bg" style="color: var(--current-bg)">bg</span>
      <span class="fg" style="color: var(--current-fg)">fg</span>
    </Button>
  </Container>
  <!-- A button that blends into its bar by taking the bar's actual colors
       (on a wrapper), so what is inside it reads them too. -->
  <Bar data-testid="current-blend" bg="rgb(40, 40, 40)" fg="rgb(240, 240, 240)">
    <div style="--button-bg: var(--current-bg); --button-fg: var(--current-fg);">
      <Button><span class="bg" style="color: var(--current-bg)">bg</span></Button>
    </div>
  </Bar>
</div>
