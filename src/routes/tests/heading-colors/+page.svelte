<script lang="ts">
  // Deterministic fixtures for tests/heading-colors.spec.ts. Plain rgb()
  // values everywhere so the spec can compute expected mixes by hand.
  import Card from "$lib/Card.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Text from "$lib/typography/Text.svelte";

  const light = "--tile-bg: rgb(250, 250, 250); --tile-fg: rgb(20, 20, 20);";
  const dark = "--tile-bg: rgb(20, 30, 40); --tile-fg: rgb(240, 240, 240);";
  const red = "--heading-tint: rgb(200, 0, 0);";
</script>

<!-- Library default: shared tint toward --primary-color at 60%. -->
<div data-testid="default">
  <Tile style={light}><h2>Default</h2></Tile>
</div>

<!-- No treatment: plain inheritance. -->
<div data-testid="untinted" style="--heading-tint: currentColor;">
  <Tile style={light}><h2>Untinted</h2></Tile>
</div>

<!-- Amount endpoints and midpoint. -->
<div data-testid="amount-0" style="{red} --heading-tint-amount: 0%;">
  <Tile style={light}><h2>0%</h2></Tile>
</div>
<div data-testid="amount-50" style="{red} --heading-tint-amount: 50%;">
  <Tile style={light}><h2>50%</h2></Tile>
</div>
<div data-testid="amount-100" style="{red} --heading-tint-amount: 100%;">
  <Tile style={light}><h2>100%</h2></Tile>
</div>
<!-- A tint with no amount anywhere reaches its target. -->
<div data-testid="amount-unset" style="{red} --heading-tint-amount: initial;">
  <Tile style={light}><h2>unset</h2></Tile>
</div>

<!-- The same tint follows the surface it lands on. -->
<div data-testid="surfaces" style="{red} --heading-tint-amount: 50%;">
  <Tile class="light" style={light}><h2>Light</h2></Tile>
  <Tile class="dark" style={dark}><h2>Dark</h2></Tile>
  <Tile
    class="remapped"
    style="{light} --tile-bg-mix-color: black; --tile-bg-mix-amount: 80%; --tile-fg-mix-color: white; --tile-fg-mix-amount: 100%;"
    ><h2>Remapped</h2></Tile
  >
  <Card>
    <div class="wrapper" style="color: rgb(0, 0, 200);"><h2>Wrapped</h2></div>
  </Card>
</div>

<!-- Precedence: level/group beat shared; at one step exact fg beats tint. -->
<div
  data-testid="precedence"
  style="--heading-fg: rgb(0, 128, 0); --heading-2-tint: rgb(200, 0, 0); --heading-2-tint-amount: 100%; --heading-minor-tint: rgb(0, 0, 200); --heading-minor-tint-amount: 100%; --heading-6-fg: rgb(128, 0, 128);"
>
  <Tile style={light}>
    <h1>shared exact</h1>
    <h2>level tint</h2>
    <h5>group tint</h5>
    <h6>level exact</h6>
  </Tile>
</div>
<div
  data-testid="exact-over-tint"
  style="{red} --heading-tint-amount: 100%; --heading-3-fg: rgb(0, 128, 0); --heading-3-tint: rgb(0, 0, 200);"
>
  <Tile style={light}><h3>exact wins at its step</h3></Tile>
</div>
<!-- Component-scoped vars still beat global level vars. -->
<div
  data-testid="component-scope"
  style="--heading-2-fg: rgb(0, 128, 0); --tile-heading-tint: rgb(200, 0, 0); --tile-heading-tint-amount: 100%;"
>
  <Tile style={light}><h2>tile-scoped</h2></Tile>
</div>

<!-- Declining tints: scale 0 on a surface. Exact colors and surface mixing
     are untouched. -->
<div
  data-testid="scale"
  style="{red} --heading-tint-amount: 100%; --heading-1-fg: rgb(0, 128, 0);"
>
  <Tile
    style="{light} --heading-tint-scale: 0; --tile-bg-mix-color: black; --tile-bg-mix-amount: 50%;"
  >
    <h1>exact</h1>
    <h2>declined</h2>
  </Tile>
  <Tile class="half" style="{light} --heading-tint-scale: 0.5;"
    ><h2>half</h2></Tile
  >
</div>

<!-- Ingredient changes on a nested surface are honoured there. -->
<div data-testid="nested" style="{red} --heading-tint-amount: 100%;">
  <Card>
    <h2 class="outer">Outer</h2>
    <Tile style="{light} --heading-tint: rgb(0, 0, 200);">
      <h2 class="inner">Inner</h2>
    </Tile>
  </Card>
</div>

<!-- Filled and transparent headings with Text inside, plus an independently
     colored decoration. -->
<div
  data-testid="text"
  style="--heading-tint: currentColor; --heading-1-bg: rgb(0, 0, 120); --heading-1-fg: rgb(255, 255, 255); --heading-2-border-width: 0 0 3px; --heading-2-border-style: solid; --heading-2-border-color: rgb(0, 160, 0); --danger-color: rgb(200, 0, 0); --muted-text-amount: 20%;"
>
  <Tile style={light}>
    <h1>Filled <Text danger>danger</Text> <Text muted>muted</Text></h1>
    <h2>Clear <Text danger>danger</Text> <Text muted>muted</Text></h2>
    <p><Text danger>danger</Text> <Text muted>muted</Text></p>
  </Tile>
</div>
