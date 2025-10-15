<script lang="ts">
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Card from "$lib/Card.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import type { CSSVariable } from "./types";

  let cssVariables: CSSVariable[] = [
    {
      name: "--grid-layout-gap",
      type: "length",
      placeholder: "e.g., 8px",
      defaultValue: "8px",
      unit: "px",
    },
    {
      name: "--grid-layout-item-width",
      type: "length",
      placeholder: "e.g., 200px",
      defaultValue: "auto",
      unit: "px",
    },
  ];
</script>

<CssVariableDemo variables={cssVariables}>
  <TextLayout>
    <p>
      GridLayout creates a centered, responsive grid that automatically wraps
      items. To get the best results (centered grid with left-aligned last row),
      set the
      <code>--grid-layout-item-width</code> to match your content size.
    </p>

    <h2>Basic Grid with Tiles</h2>

    <p>
      Tiles default to 200px width, so this grid uses
      <code>--grid-layout-item-width: 200px</code>:
    </p>

    <Code
      code={`<GridLayout --item-width="200px">
  <Tile>Item 1</Tile>
  <Tile>Item 2</Tile>
  <Tile>Item 3</Tile>
  <Tile>Item 4</Tile>
</GridLayout>`}
    />
  </TextLayout>
  <br />
  <GridLayout --item-width="200px">
    <Tile>
      <h3>Tile 1</h3>
      <p>First tile in the grid</p>
    </Tile>
    <Tile>
      <h3>Tile 2</h3>
      <p>Second tile in the grid</p>
    </Tile>
    <Tile>
      <h3>Tile 3</h3>
      <p>Third tile in the grid</p>
    </Tile>
    <Tile>
      <h3>Tile 4</h3>
      <p>Fourth tile in the grid</p>
    </Tile>
    <Tile>
      <h3>Tile 5</h3>
      <p>Fifth tile in the grid</p>
    </Tile>
    <Tile>
      <h3>Tile 6</h3>
      <p>Sixth tile in the grid</p>
    </Tile>
  </GridLayout>
  <TextLayout>
    <h2>Grid with Cards</h2>

    <Code
      code={`<GridLayout --item-width="var(--card-width)">    
  <Card>
    <div slot="header">Card 1</div>
    <p>Card content</p>
  </Card>
  <Card>
    <div slot="header">Card 2</div>
    <p>Card content</p>
  </Card>
</GridLayout>`}
    />
  </TextLayout>
  <GridLayout --item-width="var(--card-width)">
    <Card>
      {#snippet header()}
            <div >Card 1</div>
          {/snippet}
      <p>This is a card in a grid layout.</p>
      <p>Cards automatically size themselves.</p>
    </Card>
    <Card>
      {#snippet header()}
            <div >Card 2</div>
          {/snippet}
      <p>GridLayout centers all items.</p>
    </Card>
    <Card>
      {#snippet header()}
            <div >Card 3</div>
          {/snippet}
      <p>Items wrap to new lines as needed.</p>
    </Card>
  </GridLayout>
</CssVariableDemo>
