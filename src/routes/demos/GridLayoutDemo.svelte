<script lang="ts">
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import GridRow from "$lib/layout/GridRow.svelte";
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
  <img src="https://picsum.photos/seed/1/175/175" alt="" />
  <img src="https://picsum.photos/seed/2/175/175" alt="" />
  <img src="https://picsum.photos/seed/3/175/175" alt="" />
  <img src="https://picsum.photos/seed/4/175/175" alt="" />
  <img src="https://picsum.photos/seed/5/175/175" alt="" />
  <img src="https://picsum.photos/seed/6/175/175" alt="" />
  <img src="https://picsum.photos/seed/7/175/175" alt="" />
  <img src="https://picsum.photos/seed/8/175/175" alt="" />
</GridLayout>`}
  >
    <GridLayout --item-width="175px">
      <img src="https://picsum.photos/seed/1/175/175" alt="" />
      <img src="https://picsum.photos/seed/2/175/175" alt="" />
      <img src="https://picsum.photos/seed/3/175/175" alt="" />
      <img src="https://picsum.photos/seed/4/175/175" alt="" />
      <img src="https://picsum.photos/seed/5/175/175" alt="" />
      <img src="https://picsum.photos/seed/6/175/175" alt="" />
      <img src="https://picsum.photos/seed/7/175/175" alt="" />
      <img src="https://picsum.photos/seed/8/175/175" alt="" />
    </GridLayout>
  </DemoWithCode>

  <TextLayout>
    <h2>Full-width rows</h2>
    <p>
      Not everything in a grid is one of the items. A section heading, or a note
      explaining an empty grid, wants the whole row rather than standing in a
      single item-width column with tiles beside it. <code>GridRow</code> does
      that, and <code>class="grid-full-row"</code> does the same thing on an
      element you already have.
    </p>
    <p>
      It sets two properties, and the second is the one that is easy to miss.
      <code>grid-column</code> spans the tracks; <code>justify-self</code>
      decides how the item fills the tracks it spans. Without it, a grid that
      centres its items — a tile grid does — shrinks the row to fit its text and
      floats it in the middle.
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<GridLayout tile>
  <GridRow><h3>My Caseload</h3></GridRow>
  <Tile>Ella Fitzgerald</Tile>
  <Tile>Thelonious Monk</Tile>
  <h3 class="grid-full-row">Sections</h3>
  <Tile>Biology A</Tile>
  <Tile>Chemistry A</Tile>
  <Tile>Physics A</Tile>
  <GridRow>No other sections match the current filters.</GridRow>
</GridLayout>`}
  >
    <GridLayout tile>
      <GridRow><h3>My Caseload</h3></GridRow>
      <Tile>Ella Fitzgerald</Tile>
      <Tile>Thelonious Monk</Tile>
      <h3 class="grid-full-row">Sections</h3>
      <Tile>Biology A</Tile>
      <Tile>Chemistry A</Tile>
      <Tile>Physics A</Tile>
      <GridRow>No other sections match the current filters.</GridRow>
    </GridLayout>
  </DemoWithCode>

  <TextLayout>
    <h2>There is always an item width</h2>
    <p>
      There is no size-to-content mode, and that is a limit of CSS rather than a
      choice made here. <code>auto-fill</code> needs a <em>definite</em> track
      size to work out how many tracks fit; hand it an intrinsic one —
      <code>auto</code>, <code>max-content</code>, <code>minmax(min-content,
      max-content)</code> — and the repetition count collapses to 1, so every
      item stacks in a single column.
    </p>
    <p>
      So the grid always has an item width: 250px unless you say otherwise, or
      200px with <code>tile</code>, or 400px with <code>card</code>. If you want
      items sized to their own content and wrapping, that is a flex row
      (<code>display: flex; flex-wrap: wrap</code>), not this component.
    </p>
    <p>
      Items narrower than the track sit inside it according to
      <code>--grid-layout-justify-items</code>, which defaults to
      <code>stretch</code>. Items wider than the track overflow it, so the item
      width wants to be the widest thing you intend to put in it.
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<!-- Mixed content: the track is 250px, whatever the items would prefer -->
<GridLayout>
  <div>short</div>
  <div>a considerably longer run of text than the others</div>
  <div>middling</div>
</GridLayout>`}
  >
    <GridLayout>
      <div style="background: var(--secondary-bg); padding: var(--padding)">
        short
      </div>
      <div style="background: var(--secondary-bg); padding: var(--padding)">
        a considerably longer run of text than the others
      </div>
      <div style="background: var(--secondary-bg); padding: var(--padding)">
        middling
      </div>
    </GridLayout>
  </DemoWithCode>
</CssVariableDemo>
