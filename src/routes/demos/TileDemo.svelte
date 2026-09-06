<script>
  import Slider from "$lib/controls/Slider.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Container from "$lib/layout/Container.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  let tileWidth = $state(12);
  let tileHeight = $state(8);
  import TextLayout from "$lib/typography/TextLayout.svelte";
</script>

<Container>
  <TextLayout>
    <h2>Tiles</h2>
    <p>
      Tiles are flat containers for dense content. They can be static,
      selectable, or interactive.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<Tile>
  <h3>Basic Tile</h3>
  <p>Just a basic tile.</p>
</Tile>

<Tile selectable>
  <h3>Selectable Tile</h3>
  <p>Click to toggle selection.</p>
</Tile>

<Tile interactive onclick={() => alert("Tile clicked!")}>
  <h3>Interactive Tile</h3>
  <p>Click to trigger an action.</p>
</Tile>`}
  >
    {#snippet header()}
      <h2>Basic Tile States</h2>
    {/snippet}
    {#snippet blurb()}
      <p>Show the same tile with static, selectable, and interactive behavior.</p>
    {/snippet}
    <Tile>
      <h3>Basic Tile</h3>
      <p>Just a basic tile.</p>
    </Tile>

    <Tile selectable>
      <h3>Selectable Tile</h3>
      <p>Click to toggle selection.</p>
    </Tile>

    <Tile interactive onclick={() => alert("Tile clicked!")}>
      <h3>Interactive Tile</h3>
      <p>Click to trigger an action.</p>
    </Tile>
  </DemoWithCode>

  <DemoWithCode
    code={`<!-- Tiles carry their own size, so a grid of them lines up
     without any of them being measured. -->
<GridLayout tile --tile-width="{tileWidth}rem" --tile-height="{tileHeight}rem">
  <Tile>One</Tile>
  <Tile>Two</Tile>
  <Tile>Three</Tile>
  <Tile>Four</Tile>
</GridLayout>`}
  >
    {#snippet heading()}
      <h2>Sizing a Tile</h2>
    {/snippet}
    {#snippet blurb()}
      <p>
        A Tile has a width and height of its own rather than taking them from
        its content, which is what makes a row of them line up. Set
        <code>--tile-width</code> and <code>--tile-height</code> to change it —
        on the grid, as here, and every tile inside follows.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <Inline gap="var(--gap)">
        <label>width {tileWidth}rem <Slider bind:value={tileWidth} min={6} max={24} /></label>
        <label>height {tileHeight}rem <Slider bind:value={tileHeight} min={4} max={16} /></label>
      </Inline>
    {/snippet}
    <GridLayout tile --tile-width="{tileWidth}rem" --tile-height="{tileHeight}rem">
      <Tile>One</Tile>
      <Tile>Two</Tile>
      <Tile>Three</Tile>
      <Tile>Four</Tile>
    </GridLayout>
  </DemoWithCode>

  <DemoWithCode
    code={`<GridLayout>
  <Tile>
    <h3>Basic Tile</h3>
    <p>Just a basic tile.</p>
  </Tile>
  <Tile selectable>
    <h3>Selectable Tile</h3>
    <p>Just a selectable tile.</p>
  </Tile>
  <Tile interactive onclick={() => alert("Tile clicked!")}>
    <h3>Interactive Tile</h3>
    <p>Just an interactive tile.</p>
  </Tile>
</GridLayout>`}
  >
    {#snippet header()}
      <h2>Tiles in a Grid</h2>
    {/snippet}
    <GridLayout>
      <Tile>
        <h3>Basic Tile</h3>
        <p>Just a basic tile.</p>
      </Tile>
      <Tile selectable>
        <h3>Selectable Tile</h3>
        <p>Just a selectable tile.</p>
      </Tile>
      <Tile interactive onclick={() => alert("Tile clicked!")}>
        <h3>Interactive Tile</h3>
        <p>Just an interactive tile.</p>
      </Tile>
    </GridLayout>
  </DemoWithCode>

  <DemoWithCode
    code={`<!-- A Tile stacks its children in a column: \`justify\` runs down it,
     \`align\` runs across. \`center\` is shorthand for both. -->
<GridLayout tile --tile-height="8rem">
  <Tile>Default</Tile>
  <Tile center>center</Tile>
  <Tile justify="center">justify="center"</Tile>
  <Tile align="flex-start">align="flex-start"</Tile>
</GridLayout>`}
  >
    {#snippet heading()}
      <h2>Aiming a Tile's contents</h2>
    {/snippet}
    {#snippet blurb()}
      <p>
        Props set the matching <code>--tile-*</code> variables, so
        <code>--tile-justify</code> on an ancestor still works and only the tile
        that differs has to say so. A tile already centres across, so
        <code>center</code> sets both axes — setting only the cross axis would
        do nothing visible.
      </p>
    {/snippet}
    <GridLayout tile --tile-height="8rem">
      <Tile>Default</Tile>
      <Tile center>center</Tile>
      <Tile justify="center">justify="center"</Tile>
      <Tile align="flex-start">align="flex-start"</Tile>
    </GridLayout>
  </DemoWithCode>
</Container>
