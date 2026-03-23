<script lang="ts">
  import Card from "$lib/Card.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Container from "$lib/layout/Container.svelte";

  let fixedHeight = $state(true);
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { cardVars } from "./cssVariableDefs";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
</script>

<Container>
  <CssVariableDemo variables={cardVars}>
    <TextLayout>
      <h2>Cards</h2>
      <p>
        We provide a basic card component that can include optional header and
        footer slots.
      </p>
      <p>
        Cards usually come with some box-shadow, coloring, and so forth, and
        have responsive sizing out of the box.
      </p>
    </TextLayout>

    <DemoWithCode
      code={`<Card>
  <h1>Card Title</h1>
  <p>Card content goes here.</p>
</Card>`}
    >
      <Card>
        <h1>Card Title</h1>
        <p>Card content goes here.</p>
      </Card>
    </DemoWithCode>

    <DemoWithCode
      code={`<Card>
  {#snippet header()}
    <div>Card Header</div>
  {/snippet}
  <div>Card content here...</div>
  {#snippet footer()}
    <div>Card Footer</div>
  {/snippet}
</Card>`}
    >
      <Card>
        {#snippet header()}
          <div>Card Header</div>
        {/snippet}
        <div>Card content here...</div>
        {#snippet footer()}
          <div>Card Footer</div>
        {/snippet}
      </Card>
    </DemoWithCode>

    <DemoWithCode
      code={`<SplitPane leftWidth="7em" rightWidth="2fr">
  {#snippet left()}
    <div>Resize.</div>
  {/snippet}
  {#snippet right()}
    <Card fixedHeight={${fixedHeight}}>
      <h1>Wow, so simple</h1>
      <p>Simplest possible card</p>
    </Card>
    <Card fixedHeight={${fixedHeight}}>
      {#snippet header()}
        <div>Card Header</div>
      {/snippet}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque et mi orci.
      </div>
      {#snippet footer()}
        <div>Card foot</div>
      {/snippet}
    </Card>
  {/snippet}
</SplitPane>`}
    >
      {#snippet blurb()}
        <p>
          Toggle fixed-height mode and resize the pane to see how the card shell
          and content area respond together.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
      {/snippet}
      <SplitPane leftWidth="7em" rightWidth="2fr">
        {#snippet left()}
          <div>Resize.</div>
        {/snippet}
        {#snippet right()}
          <div>
            <Card {fixedHeight} --text-align="center">
              <h1>Wow, so simple</h1>
              <p>Simplest possible card</p>
            </Card>
            <Card {fixedHeight}>
              {#snippet header()}
                <div>Card Header</div>
              {/snippet}
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque et mi orci.
              </div>
              {#snippet footer()}
                <div>Card foot</div>
              {/snippet}
            </Card>
          </div>
        {/snippet}
      </SplitPane>
    </DemoWithCode>
  </CssVariableDemo>
</Container>
