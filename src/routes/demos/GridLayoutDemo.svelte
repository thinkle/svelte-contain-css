<script lang="ts">
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Card from "$lib/Card.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
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
      items. In most cases, use the built-in <code>tile</code> and
      <code>card</code> shorthands so the grid follows the library's default
      widths. Use <code>--item-width</code> or
      <code>--grid-layout-item-width</code> only when you need a custom size.
    </p>

    <h2>Basic Grid with Tiles</h2>

    <p>
      Tiles already have a default width, so the simplest version is just
      <code>&lt;GridLayout tile&gt;</code>:
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<GridLayout tile>
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
</GridLayout>`}
  >
    <GridLayout tile>
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
  </DemoWithCode>
  <TextLayout>
    <h2>Grid with Cards</h2>

    <p>
      Cards work the same way. Use <code>card</code> to inherit the framework's default
      card width:
    </p>

    <p>
      If you need a nonstandard layout, you can still override the item width
      directly with <code>--item-width</code>.
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<GridLayout card>
  <Card fixedHeight>
    {#snippet header()}
      <div>Card 1</div>
    {/snippet}
    <p>This is a card in a grid layout.</p>
  </Card>
  <Card fixedHeight>
    {#snippet header()}
      <div>Card 2</div>
    {/snippet}
    <p>GridLayout centers all items.</p>
  </Card>
</GridLayout>`}
  >
    <GridLayout card>
      <Card fixedHeight>
        {#snippet header()}
          <div>Card 1</div>
        {/snippet}
        <p>This is a card in a grid layout.</p>
        <p>Cards automatically size themselves.</p>
      </Card>
      <Card fixedHeight>
        {#snippet header()}
          <div>Card 2</div>
        {/snippet}
        <p>GridLayout centers all items.</p>
      </Card>
      <Card fixedHeight>
        {#snippet header()}
          <div>Card 3</div>
        {/snippet}
        <p>Items wrap to new lines as needed.</p>
      </Card>
    </GridLayout>
  </DemoWithCode>

  <TextLayout>
    <h2>Custom Item Width: Image Gallery</h2>
    <p>
      For arbitrary content like images, set <code>--item-width</code> directly.
      Here each item is 175px wide and the grid fills the available space:
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<GridLayout --item-width="175px">
  <img src="https://picsum.photos/seed/1/175/175" alt="Photo 1" />
  <img src="https://picsum.photos/seed/2/175/175" alt="Photo 2" />
  <img src="https://picsum.photos/seed/3/175/175" alt="Photo 3" />
  <img src="https://picsum.photos/seed/4/175/175" alt="Photo 4" />
  <img src="https://picsum.photos/seed/5/175/175" alt="Photo 5" />
  <img src="https://picsum.photos/seed/6/175/175" alt="Photo 6" />
  <img src="https://picsum.photos/seed/7/175/175" alt="Photo 7" />
  <img src="https://picsum.photos/seed/8/175/175" alt="Photo 8" />
</GridLayout>`}
  >
    <GridLayout --item-width="175px">
      <img src="https://picsum.photos/seed/1/175/175" alt="Photo 1" />
      <img src="https://picsum.photos/seed/2/175/175" alt="Photo 2" />
      <img src="https://picsum.photos/seed/3/175/175" alt="Photo 3" />
      <img src="https://picsum.photos/seed/4/175/175" alt="Photo 4" />
      <img src="https://picsum.photos/seed/5/175/175" alt="Photo 5" />
      <img src="https://picsum.photos/seed/6/175/175" alt="Photo 6" />
      <img src="https://picsum.photos/seed/7/175/175" alt="Photo 7" />
      <img src="https://picsum.photos/seed/8/175/175" alt="Photo 8" />
    </GridLayout>
  </DemoWithCode>
</CssVariableDemo>
