<script>
  import Card from "$lib/Card.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Container from "$lib/layout/Container.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Code from "$lib/misc/Code.svelte";
</script>

<Container>
  <h2>Tiles</h2>
  <p>Tiles are flat, square containers that hold content.</p>
  <p>
    They can be selectable or clickable to be used as buttons or checkboxes.
  </p>
  <h2>Basic Tile</h2>
  <Code
    code={`<Tile>
  <h3>Basic Tile</h3>
  <p>Just a basic tile.</p>
</Tile>`}
  />

  <h2>Selectable Tile</h2>
  <p>A selectable tile acts like a checkbox - click to toggle selection.</p>
  <Code
    code={`<Tile selectable>
  <h3>Selectable Tile</h3>
  <p>Click to toggle selection.</p>
</Tile>`}
  />

  <h2>Interactive Tile</h2>
  <p>An interactive tile acts like a button - it triggers an action on click.</p>
  <Code
    code={`<Tile interactive onclick={() => alert("Tile clicked!")}>
  <h3>Interactive Tile</h3>
  <p>Click to trigger an action.</p>
</Tile>`}
  />

  <h2>Tiles in a Grid</h2>
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

  <h2>Tiles in cards</h2>
  <Card>
    {#snippet header()}
      <h3>Card</h3>
    {/snippet}
    <Tile>One Tile</Tile>
    <Tile>Two Tile</Tile>
  </Card>
  <h2>Tiles in a Split Pane</h2>
  <p>Slide the pane to see responsive tiles at work</p>
  <SplitPane leftWidth="3fr">
    {#snippet left()}
      <div>
        <Tile>
          <h3>Tiles on my Left</h3>
          <p>Look, a tile!</p>
          <Checkbox>Check me</Checkbox>
          <Checkbox>And me!</Checkbox>
        </Tile>
      </div>
    {/snippet}
    {#snippet right()}
      <div>
        <Tile>
          <h3>Tiles on my right</h3>
          <p>Look, a tile!</p>
        </Tile>
      </div>
    {/snippet}
  </SplitPane>
</Container>
