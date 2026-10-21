<script lang="ts">
  /*
    Fixtures for tests/text-layout-breakout.spec.ts.

    TextLayout has two widths: its prose (p, headings, lists) keeps the
    reading measure, --line-width, and everything else placed in its flow
    gets the wide column, --text-layout-wide-width. Each case below is one
    TextLayout; the spec measures where its children land.
  */
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Table from "$lib/layout/Table.svelte";
  import DemoWithCode from "../../demos/DemoWithCode.svelte";

  const columns = Array.from({ length: 16 }, (_, i) => `Column number ${i + 1}`);
</script>

{#snippet wideRows()}
  <thead>
    <tr>{#each columns as c}<th>{c}</th>{/each}</tr>
  </thead>
  <tbody>
    {#each [1, 2, 3] as row}
      <tr>{#each columns as c}<td>{c}, row {row}, a long cell</td>{/each}</tr>
    {/each}
  </tbody>
{/snippet}

<div data-testid="default">
  <TextLayout>
    <h2>Two widths</h2>
    <p>
      A paragraph stays at the reading measure however wide the column around
      it is allowed to grow.
    </p>
    <div class="figure" data-testid="plain-figure">A plain block</div>
    <!-- Handed a --var, so Svelte wraps it in <svelte-css-wrapper>. -->
    <Container maxWidth="none" --container-bg="#eef">
      <span data-testid="wrapped-figure">A wrapped component</span>
    </Container>
    <DemoWithCode code="<p>Demo</p>">
      <p>Demo body</p>
    </DemoWithCode>
    <h3 data-testid="after-demo">After the demo</h3>
    <p>More prose.</p>
    <!-- Wrapped too: figure spacing has to reach it through the wrapper. -->
    <Table --table-border-color="#ccc">
      <tbody><tr><td>wrapped table</td></tr></tbody>
    </Table>
    <h3 data-testid="after-table">After the table</h3>
    <!-- An explicit margin still beats the figure spacing. -->
    <DemoWithCode code="<p>Demo</p>" marginBlock="5px">
      <p>Explicit margin</p>
    </DemoWithCode>
    <div data-testid="nested">
      <Table>
        <tbody><tr><td>a table that is not a direct child</td></tr></tbody>
      </Table>
    </div>
    <pre data-testid="pre">{"const x = 1; ".repeat(40)}</pre>
  </TextLayout>
</div>

<div data-testid="left">
  <TextLayout --prose-margin-inline="0" --heading-margin-inline="0">
    <h2>Left-aligned</h2>
    <p>Prose against the leading edge, figures sticking out to the right.</p>
    <div class="figure">A plain block</div>
  </TextLayout>
</div>

<div class="padded" data-testid="full">
  <TextLayout --text-layout-wide-width="100%">
    <p>Full width means the container, not the viewport.</p>
    <div class="figure">A plain block</div>
  </TextLayout>
</div>

<div data-testid="wide-table">
  <TextLayout>
    <p>A table far wider than the page.</p>
    <Table>{@render wideRows()}</Table>
  </TextLayout>
</div>

<style>
  .figure {
    background: #fee;
  }
  .padded {
    padding: 0 40px;
  }
</style>
