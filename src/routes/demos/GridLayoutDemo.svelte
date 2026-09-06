<script lang="ts">
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import GridRow from "$lib/layout/GridRow.svelte";
  import Card from "$lib/Card.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import type { CSSVariable } from "./types";

  let rowJustify = $state("default");

  /* `stretch` is the default, so passing it explicitly for "default" keeps the
     demo honest without special-casing the rendered markup. */
  const gridJustify = $derived(rowJustify === "default" ? "stretch" : rowJustify);

  /* The sample only spells out the variable once it differs from the default --
     which is the whole point of setting it on the grid rather than the rows. */
  const gridAttr = $derived(
    rowJustify === "default" ? "" : ` --grid-row-justify="${rowJustify}"`,
  );

  let cssVariables: CSSVariable[] = [
    {
      name: "--grid-layout-gap",
      type: "length",
      placeholder: "e.g., 16px",
      defaultValue: "16px",
      unit: "px",
    },
    {
      name: "--grid-layout-item-width",
      type: "length",
      placeholder: "e.g., 200px",
      defaultValue: "250px",
      unit: "px",
    },
  ];
</script>

<CssVariableDemo variables={cssVariables}>
  <TextLayout>
    <p>
      GridLayout creates a centered, responsive grid that automatically wraps
      items. If your layout is for a Contain <code>&lt;Card&gt;</code> or
      <code>&lt;Tile&gt;</code>, use the built-in <code>tile</code> and
      <code>card</code> shorthands so the grid follows the library's default
      widths. Use <code>--item-width</code> or
      <code>--grid-layout-item-width</code> to specify a different custom size.
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
      If you want an item to span across all the columns in a grid, we have a
      wrapper component (<code>GridRow</code>) for that <em>or</em> a
      convenience class (<code>class="grid-full-row"</code>) you can hang on any
      element.
    </p>
    <p>
      These set <code>grid-column</code> to span every track, and
      <code>justify-self</code> to decide how the row sits in that span. Rows
      fill their span by default.
    </p>
    <p>
      To move them, set <code>--grid-row-justify</code> to <code>start</code>,
      <code>center</code> or <code>end</code>. Set it on the grid and every row
      inside follows — a row only has to speak up when it differs, with
      <code>justify="start"</code> or the bare <code>center</code> shorthand.
    </p>
  </TextLayout>
  <DemoWithCode
    code={`<GridLayout tile${gridAttr}>
  <GridRow><h3>Jazz Greats</h3></GridRow>
  <Tile>Ella Fitzgerald</Tile>
  <Tile>Thelonious Monk</Tile>
  <h3 class="grid-full-row">Jazz Standards matching &ldquo;Moon&rdquo;</h3>
  <Tile>Fly Me To The Moon</Tile>
  <Tile>How High the Moon</Tile>
  <Tile>It's Only a Paper Moon</Tile>
  <GridRow justify="start">
    <strong>That's All She Wrote!</strong>
    <br />No other sections match the current filters.
  </GridRow>
</GridLayout>`}
  >
    {#snippet blurb()}
      <p>
        Set on the grid, so every row follows without repeating itself. The last
        row says <code>justify="start"</code> and keeps saying it — the point of
        the cascade being that only the exception has to speak up.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <Inline gap="var(--gap)">
        <RadioButton bind:group={rowJustify} value="default">default</RadioButton>
        <RadioButton bind:group={rowJustify} value="start">start</RadioButton>
        <RadioButton bind:group={rowJustify} value="center">center</RadioButton>
        <RadioButton bind:group={rowJustify} value="end">end</RadioButton>
      </Inline>
    {/snippet}
    <GridLayout tile --grid-row-justify={gridJustify}>
      <GridRow><h3>Jazz Greats</h3></GridRow>
      <Tile>Ella Fitzgerald</Tile>
      <Tile>Thelonious Monk</Tile>
      <h3 class="grid-full-row">Jazz Standards matching &ldquo;Moon&rdquo;</h3>
      <Tile>Fly Me To The Moon</Tile>
      <Tile>How High the Moon</Tile>
      <Tile>It's Only a Paper Moon</Tile>
      <GridRow justify="start">
        <strong>That's All She Wrote!</strong>
        <br />No other sections match the current filters.
      </GridRow>
    </GridLayout>
  </DemoWithCode>

</CssVariableDemo>
