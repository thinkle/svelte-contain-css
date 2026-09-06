<script>
  import Card from "$lib/Card.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Container from "$lib/layout/Container.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
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
    code={`<Card>
  {#snippet header()}
    <h3>Card</h3>
  {/snippet}
  <Tile>One Tile</Tile>
  <Tile>Two Tile</Tile>
</Card>`}
  >
    {#snippet header()}
      <h2>Tiles in Cards</h2>
    {/snippet}
    <Card>
      {#snippet header()}
        <h3>Card</h3>
      {/snippet}
      <Tile>One Tile</Tile>
      <Tile>Two Tile</Tile>
    </Card>
  </DemoWithCode>

  <DemoWithCode
    code={`<SplitPane leftWidth="3fr">
  {#snippet left()}
    <Tile>
      <h3>Tiles on my Left</h3>
      <p>Look, a tile!</p>
      <Checkbox>Check me</Checkbox>
      <Checkbox>And me!</Checkbox>
    </Tile>
  {/snippet}
  {#snippet right()}
    <Tile>
      <h3>Tiles on my right</h3>
      <p>Look, a tile!</p>
    </Tile>
  {/snippet}
</SplitPane>`}
  >
    {#snippet header()}
      <h2>Tiles in a Split Pane</h2>
    {/snippet}
    {#snippet blurb()}
      <p>Use a split pane when one side should stay visible as the layout changes.</p>
    {/snippet}
    <SplitPane leftWidth="3fr">
      {#snippet left()}
        <Tile>
          <h3>Tiles on my Left</h3>
          <p>Look, a tile!</p>
          <Checkbox>Check me</Checkbox>
          <Checkbox>And me!</Checkbox>
        </Tile>
      {/snippet}
      {#snippet right()}
        <Tile>
          <h3>Tiles on my right</h3>
          <p>Look, a tile!</p>
        </Tile>
      {/snippet}
    </SplitPane>
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
